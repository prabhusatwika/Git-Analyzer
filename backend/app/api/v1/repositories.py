from fastapi import APIRouter

from app.schemas.github_repository import PublicRepositoryRequest
from app.services.github.github_service import GitHubService
from app.services.repository.clone_service import CloneService
from app.services.repository.current_repository_service import CurrentRepositoryService
from app.services.indexing.repository_indexing_service import RepositoryIndexingService

router = APIRouter(
    prefix="/repositories",
    tags=["Repositories"],
)

github_service = GitHubService()
clone_service = CloneService()
current_repository_service = CurrentRepositoryService()
indexing_service = RepositoryIndexingService()


@router.post("/public")
async def analyze_public_repository(
    request: PublicRepositoryRequest,
):
    # Get repository details from GitHub
    repository = github_service.get_public_repository(request.url)

    # Clone repository
    local_path = clone_service.clone_repository(
        clone_url=repository.clone_url,
        repository_name=repository.name,
    )

    # Index repository into Chroma
    indexing_result = indexing_service.index_repository(local_path)

    # Save current repository
    current_repository_service.save(repository)

    return {
        "repository": repository,
        "local_path": local_path,
        "indexing": indexing_result,
    }


@router.get("/current")
async def get_current_repository():
    return current_repository_service.load()

@router.delete("/current")
async def delete_current_repository():

    repository = current_repository_service.load()

    if repository is None:
        return {
            "success": False,
            "message": "No repository connected."
        }

    repository_name = repository["name"]

    indexing_service.delete_repository_embeddings(
        repository_name
    )

    clone_service.delete_repository(
        repository_name
    )

    current_repository_service.clear()

    return {
        "success": True,
        "message": "Repository disconnected."
    }