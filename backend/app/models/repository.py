from dataclasses import dataclass
from datetime import datetime

from app.models.enums import RepositoryStatus, RepositoryType


@dataclass
class Repository:
    """
    Represents a GitHub repository managed by RepoMind AI.
    """

    id: str
    owner: str
    name: str
    full_name: str

    github_url: str

    default_branch: str

    language: str | None

    description: str | None

    repository_type: RepositoryType

    status: RepositoryStatus

    is_private: bool

    created_at: datetime

    updated_at: datetime
