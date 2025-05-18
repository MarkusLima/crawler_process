from database.models import Base
from database.session import engine

# Importa os modelos para que sejam registrados no metadata
import database.Processo
import database.ScrapedData

def create_tables():
    print("Criando tabelas no banco de dados...")
    Base.metadata.create_all(bind=engine)
    print("Tabelas criadas com sucesso.")

if __name__ == "__main__":
    create_tables()
