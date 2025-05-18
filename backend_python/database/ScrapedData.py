from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import Session
from datetime import datetime
from database.models import Base

class ScrapedData(Base):
    __tablename__ = "scraped_data"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255))
    created_at = Column(DateTime, default=datetime.utcnow)

    @staticmethod
    def create(db: Session, title: str):
        new_data = ScrapedData(title=title)
        db.add(new_data)
        db.commit()
        db.refresh(new_data)
        return new_data

    @staticmethod
    def read_all(db: Session):
        return db.query(ScrapedData).all()

    @staticmethod
    def read_by_id(db: Session, item_id: int):
        return db.query(ScrapedData).filter_by(id=item_id).first()

    @staticmethod
    def update(db: Session, item_id: int, title: str):
        item = db.query(ScrapedData).filter_by(id=item_id).first()
        if item:
            item.title = title
            db.commit()
            db.refresh(item)
        return item

    @staticmethod
    def delete(db: Session, item_id: int):
        item = db.query(ScrapedData).filter_by(id=item_id).first()
        if item:
            db.delete(item)
            db.commit()
        return item
