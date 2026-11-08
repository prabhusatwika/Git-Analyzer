from fastapi import APIRouter

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.get("/")
async def auth_health():
    return {"message": "Authentication API is working"}
