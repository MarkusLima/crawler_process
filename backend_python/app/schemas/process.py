from pydantic import BaseModel
from datetime import datetime

class ProcessBase(BaseModel):
    link: str
    conteudo_publicacao: str
    data_disponibilizacao: str
    created_at: str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

class ProcessCreate(ProcessBase):
    numero_processo: str
    autores: str
    advogados: str
    valor_bruto: str
    valor_liquido: str
    juros_moratorios: str
    honorarios_advocaticios: str

class Process(ProcessBase):
    id: int

    class Config:
        from_attributes = True
