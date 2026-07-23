from fastapi import APIRouter

router = APIRouter(
    prefix="/analysis",
    tags=["Analysis"],
)


@router.get("/")
async def analysis_health():
    return {
        "message": "Analysis API is working"
    }