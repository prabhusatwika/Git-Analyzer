from pydantic import BaseModel


class ChunkRequest(BaseModel):
    repository_path: str


class ChunkResponse(BaseModel):
    repository_name: str
    files_processed: int
    chunks_created: int