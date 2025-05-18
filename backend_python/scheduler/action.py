from analysis.analyzer import analyzeDatePublish
from app.services.process_service import create_process, get_processes_by_status
from app.services.scheduler_service import save_scheduler
from app.db.conector import get_connection
from scraper.job import scrape_data, scrape_details_content, scrape_details_info
from app.db.session import get_db

def scheduled_job(flag: int = 1):

    try:
        data = scrape_data()

        titles = {
            1: "Ação automática",
            2: "Ação manual",
        }

        title = titles.get(flag, "Default")

        con = get_connection()

        save_scheduler(con, {"title": title})

        for item in data:
            item['data_disponibilizacao'] = analyzeDatePublish(item['titulo'])
            create_process(con, item)
            
        print("Dados salvos com sucesso")

    except Exception as e:
        print(f"Erro ao executar o trabalho: {str(e)}")


def schreduler_job_details_content():

    try:
        con = get_connection()

        processes_status_captured = get_processes_by_status(con, "captured")

        if not processes_status_captured:
            print("Nenhum processo encontrado com o status 'captured'.")
            return
        
        scrape_details_content(con, processes_status_captured)

    except Exception as e:
        print(f"Erro ao executar o trabalho: {str(e)}")

def schreduler_job_complete_infos():
    try:

        con = get_connection()

        processes_status_captured = get_processes_by_status(con, "processed")

        if not processes_status_captured:
            print("Nenhum processo encontrado com o status 'processed'.")
            return
        
        scrape_details_info(con, processes_status_captured)

    except Exception as e:
        print(f"Erro ao executar o trabalho: {str(e)}")