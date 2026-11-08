from pydantic import BaseModel


class SearchRequest(BaseModel):
    repository_name: str
    query: str


class SearchResult(BaseModel):
    file_path: str
    language: str
    content: str
    distance: float


class SearchResponse(BaseModel):
    results: list[SearchResult]
