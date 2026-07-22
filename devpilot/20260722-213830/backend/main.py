from fastapi import FastAPI
from backend.routes import badge_routes

app = FastAPI(title="DevPilot API")

app.include_router(badge_routes.router)

@app.get("/health")
async def health_check():
    return {"status": "online"}