from fastapi import APIRouter, Response
from backend.services.badge_service import generate_badge_svg

router = APIRouter()

@router.get("/v1/badge/{username}/{project_name}")
async def get_badge(username: str, project_name: str):
    # Simulated DB fetch for demonstration
    status = "passing"
    score = 98
    svg_content = generate_badge_svg(status, score)
    return Response(content=svg_content, media_type="image/svg+xml", headers={"Cache-Control": "no-cache"})