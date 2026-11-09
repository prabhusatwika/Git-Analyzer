from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field, HttpUrl


class ConnectRepositoryRequest(BaseModel):
    github_repo_id: int = Field(..., gt=0)
    name: str = Field(..., min_length=1, max_length=255)
    full_name: str = Field(..., min_length=1, max_length=512)
    description: str | None = None
    language: str | None = None
    stars: int = Field(default=0, ge=0)
    forks: int = Field(default=0, ge=0)
    is_private: bool = False
    default_branch: str = Field(default="main", max_length=255)
    html_url: str = Field(..., min_length=1, max_length=512)
    updated_at_github: datetime | None = None


class ConnectedRepositoryResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    github_repo_id: int
    name: str
    full_name: str
    description: str | None
    language: str | None
    stars: int
    forks: int
    is_private: bool
    default_branch: str
    html_url: str
    updated_at_github: datetime | None
    connected_at: datetime


class UserContextHeaders(BaseModel):
    github_user_id: str
    github_username: str
    email: str | None = None


class AnalyzePublicRepositoryRequest(BaseModel):
    url: HttpUrl


class ConnectRepositoryByNameRequest(BaseModel):
    owner: str
    repository: str


class RepositoryResponse(BaseModel):
    id: str
    owner: str
    name: str
    full_name: str
    github_url: str
    status: str
    language: str | None = None
    description: str | None = None
