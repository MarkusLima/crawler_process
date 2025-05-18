import os
from fastapi import FastAPI
from app.api.routes import users, hearth, job
from app.db.session import engine
from app.models.base import Base  
from app.models.user import User 
from app.models.process import Process
from app.models.user_process import UserProcess
from app.models.scraped_data import ScrapedData


app = FastAPI()

# Incluindo rotas
app.include_router(hearth.router)
app.include_router(job.router)
app.include_router(users.router, prefix="/users", tags=["Users"])

# Criação das tabelas no evento de inicialização
@app.on_event("startup")
def startup_event():
    print("Modelos registrados no Base:")
    for table in Base.metadata.tables.keys():
        print(f"- {table}")

    print("Criando tabelas no banco de dados...")
    Base.metadata.create_all(bind=engine)
    print("Tabelas criadas com sucesso!")