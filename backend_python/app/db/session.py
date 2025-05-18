from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import SQLAlchemyError
from app.core.config import settings

# URL do banco de dados MySQL definida no arquivo config.py
SQLALCHEMY_DATABASE_URL = settings.DATABASE_URL

try:
    # Criação do engine para o MySQL
    engine = create_engine(SQLALCHEMY_DATABASE_URL)
except SQLAlchemyError as e:
    print("Erro ao criar o engine do banco de dados:", e)
    raise
except Exception as e:
    print("Erro inesperado ao criar o engine:", e)
    raise

# Configuração da sessão
try:
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
except Exception as e:
    print("Erro ao configurar o sessionmaker:", e)
    raise

def get_db():
    """Função para obter uma sessão do banco de dados."""
    db = SessionLocal()
    try:
        yield db
    except SQLAlchemyError as e:
        print("Erro durante uso da sessão com o banco de dados:", e)
        raise
    finally:
        db.close()
