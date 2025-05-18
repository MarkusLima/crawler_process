from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from app.models.base import Base

class ScrapedData(Base):
    __tablename__ = "scraped_data"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255))
    created_at = Column(DateTime, default=datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
