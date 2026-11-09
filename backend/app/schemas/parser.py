from pydantic import BaseModel


class ScanRepositoryRequest(BaseModel):
    repository_path: str


class ScanRepositoryResponse(BaseModel):
    repository_name: str
    total_files: int
    python_files: int
    javascript_files: int
    typescript_files: int
    markdown_files: int
