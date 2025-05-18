from apscheduler.schedulers.background import BackgroundScheduler
from scheduler.action import scheduled_job, schreduler_job_complete_infos, schreduler_job_details_content

scheduler = BackgroundScheduler()

scheduler.add_job(scheduled_job, "cron", hour=8, minute=0)   # 08:00
scheduler.add_job(schreduler_job_details_content, "cron", hour=10, minute=0)  # 10:00
scheduler.add_job(schreduler_job_complete_infos, "cron", hour=12, minute=0)  # 12:00


scheduler.add_job(scheduled_job, "cron", hour=13, minute=0)  # 13:00
scheduler.add_job(schreduler_job_details_content, "cron", hour=15, minute=0)  # 15:00
scheduler.add_job(schreduler_job_complete_infos, "cron", hour=17, minute=0)  # 17:00

scheduler.start()

# Mantenha a aplicação rodando
import time
try:
    while True:
        time.sleep(1)
except (KeyboardInterrupt, SystemExit):
    scheduler.shutdown()
