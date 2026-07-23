from fastapi import APIRouter

from app.schemas.github_repository import PublicRepositoryRequest
from app.services.github.github_service import GitHubService
from app.services.repository.clone_service import CloneService

router = APIRouter(
    prefix="/repositories",
    tags=["Repositories"],
)

github_service = GitHubService()
clone_service = CloneService()


@router.post("/public")
async def analyze_public_repository(
    request: PublicRepositoryRequest,
):
    repository = github_service.get_public_repository(request.url)

    local_path = clone_service.clone_repository(
        clone_url=repository.clone_url,
        repository_name=repository.name,
    )

    return {
        "repository": repository,
        "local_path": local_path,
    }