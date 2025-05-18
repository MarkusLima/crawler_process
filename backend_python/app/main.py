import os
import time
from fastapi import FastAPI
from apscheduler.schedulers.background import BackgroundScheduler
from app.api.routes import users, hearth, job
from app.db.create_db import create_db_and_tables
from scheduler.action import (
    scheduled_job,
    schreduler_job_complete_infos,
    schreduler_job_details_content
)

app = FastAPI()

# Incluindo rotas
app.include_router(hearth.router)
app.include_router(job.router)
app.include_router(users.router, prefix="/users", tags=["Users"])

# Agendador global
scheduler = BackgroundScheduler()

@app.on_event("startup")
def startup_event():
    # Cria o banco de dados e tabelas (apenas se não existirem)
    create_db_and_tables()

    # Agendando tarefas
    scheduler.add_job(scheduled_job, "cron", hour=8, minute=0)   # 08:00
    scheduler.add_job(schreduler_job_details_content, "cron", hour=10, minute=0)  # 10:00
    scheduler.add_job(schreduler_job_complete_infos, "cron", hour=12, minute=0)  # 12:00

    scheduler.add_job(scheduled_job, "cron", hour=13, minute=0)  # 13:00
    scheduler.add_job(schreduler_job_details_content, "cron", hour=15, minute=0)  # 15:00
    scheduler.add_job(schreduler_job_complete_infos, "cron", hour=17, minute=0)  # 17:00

    scheduler.start()
    print("Scheduler iniciado com sucesso.")

@app.on_event("shutdown")
def shutdown_event():
    scheduler.shutdown()
    print("Scheduler encerrado com sucesso.")
