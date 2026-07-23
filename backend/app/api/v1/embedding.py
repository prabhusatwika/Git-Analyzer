from fastapi import APIRouter

from app.schemas.embedding import (
    EmbeddingRequest,
    EmbeddingResponse,
)

from app.services.embeddings.embedding_service import EmbeddingService

router = APIRouter(
    prefix="/embedding",
    tags=["Embedding"],
)

embedding_service = EmbeddingService()


@router.post(
    "/create",
    response_model=EmbeddingResponse,
)
async def create_embeddings(
    request: EmbeddingRequest,
):

    result = embedding_service.create_embeddings(
        request.repository_path,
    )

    return EmbeddingResponse(**result)