from fastapi import APIRouter

from app.schemas.chat import ChatRequest, ChatResponse
from app.services.rag.rag_service import RAGService

router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
)

rag_service = RAGService()


@router.get("/")
async def chat_health():
    return {"message": "Chat API is working"}


@router.post(
    "",
    response_model=ChatResponse,
)
async def chat(request: ChatRequest):

    result = rag_service.ask(
        repository_name=request.repository_name,
        question=request.question,
    )

    return ChatResponse(
        answer=result["answer"],
        context_used=result["context_used"],
        sources=result["sources"],
    )
