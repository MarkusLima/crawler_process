from pydantic import BaseModel
from sqlalchemy import DateTime

class ProcessCreate(BaseModel):
    previous_data = str
    updated_data = str
    updated_at: str = DateTime.now().isoformat()

class Process(BaseModel):
    id: int
    user_id: int
    process_id: int

    class Config:
        from_attributes = True
