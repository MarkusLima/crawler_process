from sqlalchemy import Column, Integer, DateTime, ForeignKey, Text
from datetime import datetime
from app.models.base import Base

class UserProcess(Base):
    __tablename__ = "user_processes"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    process_id = Column(Integer, ForeignKey("processes.id"))
    previous_data = Column(Text(64000))
    updated_data = Column(Text(64000))
    updated_at = Column(DateTime, default=datetime.utcnow)