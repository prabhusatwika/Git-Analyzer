from fastapi import APIRouter

from app.schemas.chunk import (
    ChunkRequest,
    ChunkResponse,
)

from app.services.chunking.chunk_service import ChunkService

router = APIRouter(
    prefix="/chunking",
    tags=["Chunking"],
)

chunk_service = ChunkService()


@router.post(
    "/create",
    response_model=ChunkResponse,
)
async def create_chunks(
    request: ChunkRequest,
):

    result = chunk_service.create_chunks(
        request.repository_path,
    )

    return ChunkResponse(**result)