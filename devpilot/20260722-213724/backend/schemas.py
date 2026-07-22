from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class DevPilotEventBase(BaseModel):
    event_type: str
    payload: str

class DevPilotEventCreate(DevPilotEventBase):
    pass

class DevPilotEvent(DevPilotEventBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True