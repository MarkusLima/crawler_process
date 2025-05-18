from fastapi import APIRouter

from scheduler.action import scheduled_job, schreduler_job_complete_infos, schreduler_job_details_content

router = APIRouter()

@router.get("/scheduled_job")
def run_scheduled_job():
    print("Executando o trabalho manual... (scheduled_job)")
    scheduled_job(2)
    return {"message": "Scheduled job executed successfully"}

@router.get("/schreduler_job_details_content")
def run_schreduler_job_details_content():
    print("Executando o trabalho manual... (schreduler_job_details_content)")
    schreduler_job_details_content()
    return {"message": "Scheduled job details content executed successfully"}

@router.get("/schreduler_job_complete_infos")
def run_schreduler_job_complete_infos():
    print("Executando o trabalho manual... (schreduler_job_complete_infos)")
    schreduler_job_complete_infos()
    return {"message": "Scheduled job details content executed successfully"}