from sqlalchemy.orm import Session
from app.models.process import Process
from app.schemas.process import ProcessBase

def create_process(db: Session, process: ProcessBase):

    try:
        # Deve verificar se o processo já existe no banco de dados
        existing_process = db.query(Process).filter(Process.link == process['link']).first()
        if existing_process:
            return existing_process
        
        # Se não existir, cria um novo processo
        db_process = Process(
            link=process['link'], 
            conteudo_publicacao=process['conteudo_publicacao'], 
            data_disponibilizacao=process['data_disponibilizacao'],
            reu="Instituto Nacional do Seguro Social - INSS",
            status="captured",
        )

        db.add(db_process)
        db.commit()
        db.refresh(db_process)
        return db_process
    except Exception as e:
        raise Exception(f"Erro ao criar processo: {str(e)}")
    
def get_processes_by_status(db: Session, status: str):
    try:
        processes = db.query(Process).filter(Process.status == status).all()
        if not processes:
            raise Exception("Nenhum processo encontrado com o status fornecido.")
        return processes
    except Exception as e:
        raise Exception(f"Erro ao obter processos: {str(e)}")