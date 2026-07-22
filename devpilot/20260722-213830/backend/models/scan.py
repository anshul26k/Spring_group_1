from pydantic import BaseModel
from datetime import datetime

class ProjectScan(BaseModel):
    id: int
    username: str
    project_name: str
    status: str
    score: int
    updated_at: datetime

    class Config:
        from_attributes = True