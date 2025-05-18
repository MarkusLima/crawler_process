from transformers import pipeline
from analysis.read_pdf_online import read_pdf_online

# Carrega o modelo
qa_model = pipeline("question-answering", model="pierreguillou/bert-base-cased-squad-v1.1-portuguese")

def extrair_info(texto, perguntas, modelo):
    respostas = {}
    for item in perguntas:
        pergunta = item["pergunta"]
        field = item["field"]
        try:
            resultado = modelo(question=pergunta, context=texto)
            respostas[field] = resultado['answer']
        except:
            respostas[field] = None
    return respostas

# Processamento
def process_info(texto):
    infos = []

    perguntas = [
        {"pergunta": "Levando em conta que o padrão de resposta esperada é xxxxxxx-xx.xxxx.x.xx.xxxx. Qual é o número do processo?", "field": "numero_processo"},
        {"pergunta": "Quem é o autor?", "field": "autores"},
        {"pergunta": "Quem é o advogado?", "field": "advogados"},
        {"pergunta": "Levando em conta que o padrão de resposta esperada é R$ xxxxxxx,xx. Qual é o valor líquido?", "field": "valor_liquido"},
        {"pergunta": "Levando em conta que o padrão de resposta esperada é R$ xxxxxxx,xx. Qual é o valor bruto?", "field": "valor_bruto"},
        {"pergunta": "Levando em conta que o padrão de resposta esperada é R$ xxxxxxx,xx. Quais são os honorários advocatícios?", "field": "honorarios_advocaticios"},
        {"pergunta": "Levando em conta que o padrão de resposta esperada é R$ xxxxxxx,xx. Qual o valor dos juros moratórios?", "field": "juros_moratorios"}
    ]

    respostas = extrair_info(texto, perguntas, qa_model)
    for field, resposta in respostas.items():
        infos.append({"field": field, "resposta": resposta if resposta else "Não encontrado"})

    return infos
