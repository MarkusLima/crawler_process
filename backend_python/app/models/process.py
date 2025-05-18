from sqlalchemy import Column, Integer, String, Date, DateTime
from app.models.base import Base
from sqlalchemy.dialects.mysql import LONGTEXT
from datetime import datetime

class Process(Base):
    __tablename__ = "processes"
    id = Column(Integer, primary_key=True, index=True)
    numero_processo = Column(String(50), nullable=True)
    data_disponibilizacao = Column(Date, nullable=True)
    autores = Column(String(255), nullable=True)
    advogados = Column(String(255), nullable=True)
    conteudo_publicacao = Column(LONGTEXT, nullable=True)
    valor_bruto = Column(String(50), nullable=True)
    valor_liquido = Column(String(50), nullable=True)
    juros_moratorios = Column(String(50), nullable=True)
    honorarios_advocaticios = Column(String(50), nullable=True)
    reu = Column(String(255))
    status = Column(String(10))
    link = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.now().strftime("%Y-%m-%d %H:%M:%S"))

