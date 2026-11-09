from pydantic import BaseModel


class ChatRequest(BaseModel):
    repository_name: str
    question: str


class Source(BaseModel):
    file_path: str
    language: str


class ChatResponse(BaseModel):
    answer: str
    context_used: int
    sources: list[Source]
