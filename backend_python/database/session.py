import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import OperationalError

DATABASE_URL = os.getenv("DATABASE_URL", "mysql+pymysql://crawler:crawlerpass@db:3306/crawlerdb")
print("DATABASE_URL:", DATABASE_URL)

try:
    engine = create_engine(DATABASE_URL)
    # Testa a conexão imediatamente
    with engine.connect() as connection:
        print("Conexão com o banco de dados estabelecida com sucesso!")
except OperationalError as e:
    print("Erro ao conectar ao banco de dados:", e)

SessionLocal = sessionmaker(bind=engine)





