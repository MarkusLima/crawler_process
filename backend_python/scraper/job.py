import undetected_chromedriver as uc
import time
from selenium.webdriver.support.ui import WebDriverWait, Select
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options

from analysis.read_pdf_online import read_pdf_online
from analysis.transformers import process_info
from app.services.process_service import get_processes_by_status

options = uc.ChromeOptions()
options.headless = True

chrome_options = Options()
chrome_options.add_argument("--headless=new")

def scrape_data(max_paginas=None, dtInicio="13/11/2024", dtFim="13/11/2024", cdCaderno="12", pesquisaLivre='"RPV" e "pagamento pelo INSS"'):
    resultados = []
    driver = uc.Chrome(options=options)

    print("Starting...")
    driver.get("https://dje.tjsp.jus.br/cdje/consultaAvancada.do")
    print("Go to URL...")

    try:
        wait = WebDriverWait(driver, 20)
        wait.until(EC.presence_of_element_located((By.NAME, "consultaAvancadaForm")))
        print("Form loaded...")

        submit_form(driver, {
            "dtInicio": dtInicio,
            "dtFim": dtFim,
            "cdCaderno": cdCaderno,
            "pesquisaLivre": pesquisaLivre
        })

        print("Form submitted...")

        paginacao(driver, resultados, max_paginas)
        print("All data captured!")

        driver.quit()
        return resultados

    except TimeoutException as e:
        driver.quit()
        raise Exception(f"TimeoutException: não foi possível encontrar os elementos. {str(e)}")
    except Exception as e:
        driver.quit()
        raise Exception(f"Erro ao executar o trabalho: {str(e)}")

def submit_form(driver, form_data):
    print(form_data)
    try:
        # Preencher datas via JavaScript (mais confiável em campos com máscara)
        dt_inicio = driver.find_element(By.NAME, "dadosConsulta.dtInicio")
        dt_fim = driver.find_element(By.NAME, "dadosConsulta.dtFim")

        driver.execute_script("arguments[0].value = arguments[1];", dt_inicio, form_data["dtInicio"])
        driver.execute_script("arguments[0].value = arguments[1];", dt_fim, form_data["dtFim"])

        # Alternativa: limpar e digitar manualmente
        # dt_inicio.clear()
        # dt_inicio.send_keys(form_data["dtInicio"])
        # dt_fim.clear()
        # dt_fim.send_keys(form_data["dtFim"])

        # Selecionar o caderno
        select_element = Select(driver.find_element(By.NAME, "dadosConsulta.cdCaderno"))
        select_element.select_by_value(form_data["cdCaderno"])

        # Preencher campo de pesquisa livre
        pesquisa = driver.find_element(By.NAME, "dadosConsulta.pesquisaLivre")
        pesquisa.clear()
        pesquisa.send_keys(form_data["pesquisaLivre"])

        # Clicar no botão submit
        driver.find_element(By.CSS_SELECTOR, "input.spwBotaoDefault[type='submit']").click()

    except Exception as e:
        raise Exception(f"Erro ao preencher o formulário: {str(e)}")


def paginacao(driver, resultados, max_paginas=None):
    pagina_atual = 1
    while True:
        try:
            WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.ID, "divResultadosInferior"))
            )
            time.sleep(1)
            tr_elements = driver.find_elements(By.CSS_SELECTOR, "#divResultadosInferior tr.fundocinza1")
            resultados.extend(capture_data(tr_elements))
            print(f"Página {pagina_atual} capturada. Total de registros: {len(resultados)}")

            if max_paginas and pagina_atual >= max_paginas:
                print("Número máximo de páginas alcançado.")
                break

            try:
                proximo_link = driver.find_element(By.XPATH, "//a[contains(text(), 'Próximo')]")
                if proximo_link.is_displayed():
                    driver.execute_script("arguments[0].scrollIntoView(true);", proximo_link)
                    time.sleep(1)
                    proximo_link.click()
                    time.sleep(2)
                    pagina_atual += 1
                else:
                    break
            except NoSuchElementException:
                print("Última página alcançada.")
                break
        except Exception as e:
            print(f"Erro durante a paginação: {str(e)}")
            break

def capture_data(tr_elements):
    resultados = []
    for tr in tr_elements:
        try:
            linhas_internas = tr.find_elements(By.TAG_NAME, "td")
            if len(linhas_internas) >= 2:
                segunda_linha = linhas_internas[1]
                ementa_elem = segunda_linha.find_element(By.CLASS_NAME, "ementaClass")
                tag_a = ementa_elem.find_elements(By.TAG_NAME, "a")
                titulo = tag_a[0].text.strip() if tag_a else ementa_elem.text.strip()
                link = tag_a[0].get_attribute('onclick')
                if link:
                    link = link.removeprefix("return popup('/cdje/consultaSimples.do?").removesuffix("');")

                conteudo_elem = segunda_linha.find_element(By.CLASS_NAME, "ementaClass2")
                conteudo = conteudo_elem.text.strip()
                resultados.append({"titulo": titulo, "conteudo_publicacao": conteudo, "link": link})
        except Exception as e:
            print(f"Erro ao extrair item: {str(e)}")
    return resultados

def scrape_details_content(db, processes):

    try:

        print("Executando scrape_details_content.")

        for process in processes:
            link = "https://dje.tjsp.jus.br/cdje/getPaginaDoDiario.do?"+process.link
            print(f"Link: {link}")

            # Extrai o conteúdo do PDF
            content = read_pdf_online(link)
            process.conteudo_publicacao = content
            process.status = "processed"
            db.commit()


        print("Conteúdo extraídos e salvos.")

    except TimeoutException:
        print("Timeout: não foi possível encontrar o elemento.")
    except Exception as e:
        print(f"Erro ao extrair conteúdo: {str(e)}")
        

def scrape_details_info(db, processes):
    try:
        print("Executando scrape_details_info.")

        for process in processes:

            infos = process_info(process.conteudo_publicacao)
            print(infos)

            for info in infos:
                field_name = info["field"]
                value = None if info["resposta"] == "Não encontrado" else str(info["resposta"])
                setattr(process, field_name, value)

            process.status = "nova"
            db.commit()

        print("Conteúdos extraídos e salvos.")

    except TimeoutException:
        print("Timeout: não foi possível encontrar o elemento.")
    except Exception as e:
        print(f"Erro ao extrair conteúdo: {str(e)}")
        
