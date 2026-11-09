from pydantic import BaseModel


class EmbeddingRequest(BaseModel):
    repository_path: str


class EmbeddingResponse(BaseModel):
    repository_name: str
    chunks_processed: int
    embeddings_created: int
    total_vectors_in_chromadb: int
