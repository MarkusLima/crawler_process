from sqlalchemy.orm import Session
from app.models.scraped_data import ScrapedData
from app.schemas.scraped_data import ScrapedDataCreate

def save_scheduler(db: Session, data: ScrapedDataCreate):
    try:
        scraped_data = ScrapedData( title=data['title'])
        db.add(scraped_data)
        db.commit()
        db.refresh(scraped_data)
        return
    except Exception as e:
        raise Exception(f"Erro ao salvar dados no banco de dados: {str(e)}")