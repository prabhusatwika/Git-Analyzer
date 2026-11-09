from pydantic import BaseModel, HttpUrl


class PublicRepositoryRequest(BaseModel):
    """
    Request schema for analyzing a public GitHub repository.
    The frontend sends only the repository URL.
    """

    url: HttpUrl


class RepositoryResponse(BaseModel):
    """
    Response schema returned after fetching repository metadata
    from the GitHub API.
    """

    github_id: int
    name: str
    full_name: str
    owner: str
    description: str | None = None
    language: str | None = None
    stars: int
    forks: int
    open_issues: int
    default_branch: str
    visibility: str
    clone_url: HttpUrl
    html_url: HttpUrl
