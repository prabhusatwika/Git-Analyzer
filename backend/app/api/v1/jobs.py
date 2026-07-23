from fastapi import APIRouter

router = APIRouter(
    prefix="/jobs",
    tags=["Jobs"],
)


@router.get("/")
async def jobs_health():
    return {
        "message": "Jobs API is working"
    }