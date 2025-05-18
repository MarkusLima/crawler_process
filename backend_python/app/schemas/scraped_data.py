from pydantic import BaseModel
from datetime import datetime

class ScrapedDataBase(BaseModel):
    title: str
    created_at: str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

class ScrapedDataCreate(ScrapedDataBase):
    pass

class ScrapedData(ScrapedDataBase):
    id: int

    class Config:
        from_attributes = True