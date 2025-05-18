from datetime import datetime
import re

def analyzeDatePublish(text):
    """Extrai a data no formato dd/mm/yyyy do início de uma string."""
    match = re.search(r"\b\d{2}/\d{2}/\d{4}\b", text)
    if not match:
        raise ValueError("Data não encontrada no formato dd/mm/yyyy.")

    data = datetime.strptime(match.group(0), "%d/%m/%Y").strftime("%Y-%m-%d")
    return data
