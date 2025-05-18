from sqlalchemy import Column, Integer, String, Text, Date, Float
from sqlalchemy.orm import Session
from database.models import Base

class Processo(Base):
    __tablename__ = "processos"

    id = Column(Integer, primary_key=True, index=True)
    numero_processo = Column(String(50), nullable=False)
    data_disponibilizacao = Column(Date)
    autores = Column(String(255))
    advogados = Column(String(255))
    conteudo_publicacao = Column(Text)
    valor_bruto = Column(Float)
    valor_liquido = Column(Float)
    juros_moratorios = Column(Float)
    honorarios_advocaticios = Column(Float)

    @staticmethod
    def create(db: Session, **kwargs):
        new_processo = Processo(**kwargs)
        db.add(new_processo)
        db.commit()
        db.refresh(new_processo)
        return new_processo

    @staticmethod
    def read_all(db: Session):
        return db.query(Processo).all()

    @staticmethod
    def read_by_id(db: Session, processo_id: int):
        return db.query(Processo).filter_by(id=processo_id).first()

    @staticmethod
    def update(db: Session, processo_id: int, **kwargs):
        processo = db.query(Processo).filter_by(id=processo_id).first()
        if processo:
            for key, value in kwargs.items():
                if hasattr(processo, key):
                    setattr(processo, key, value)
            db.commit()
            db.refresh(processo)
        return processo

    @staticmethod
    def delete(db: Session, processo_id: int):
        processo = db.query(Processo).filter_by(id=processo_id).first()
        if processo:
            db.delete(processo)
            db.commit()
        return processo
