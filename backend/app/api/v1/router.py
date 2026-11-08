from fastapi import APIRouter

from app.api.v1 import (
    analysis,
    auth,
    chat,
    chunking,
    embedding,
    jobs,
    parser,
    search,
)
from app.api.v1.connected_repositories import router as connected_repositories_router
from app.api.v1.repositories import router as repositories_router
from app.api.v1.search import router as search_router

api_router = APIRouter()
api_router.include_router(connected_repositories_router)
api_router.include_router(repositories_router)
api_router.include_router(auth.router)


api_router.include_router(analysis.router)

api_router.include_router(chat.router)

api_router.include_router(search.router)

api_router.include_router(jobs.router)

api_router.include_router(parser.router)

api_router.include_router(chunking.router)

api_router.include_router(embedding.router)

api_router.include_router(search_router)


@api_router.get("/")
async def api_root() -> dict[str, str]:
    return {"message": "Git-Analyzer API v1"}
