import fitz  # PyMuPDF
import requests

def read_pdf_online(url):
    response = requests.get(url)
    response.raise_for_status()  # Garante que a requisição deu certo

    with fitz.open(stream=response.content, filetype="pdf") as doc:
        texto = ""
        for pagina in doc:
            texto += pagina.get_text()
        return texto

