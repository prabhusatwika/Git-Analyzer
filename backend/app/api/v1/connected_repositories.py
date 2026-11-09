
from fastapi import APIRouter, Depends, Header, Response, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.repository import (
    ConnectedRepositoryResponse,
    ConnectRepositoryRequest,
)
from app.services.repository_service import (
    connect_repository,
    disconnect_repository,
    get_connected_repository,
    to_response,
)

router = APIRouter(
    prefix="/repositories",
    tags=["Connected Repositories"],
)


@router.post(
    "/connect",
    response_model=ConnectedRepositoryResponse,
    status_code=status.HTTP_201_CREATED,
)
def connect_repository_endpoint(
    payload: ConnectRepositoryRequest,
    db: Session = Depends(get_db),
    github_user_id: str = Header(alias="X-GitHub-User-Id"),
    github_username: str = Header(alias="X-GitHub-Username"),
    email: str | None = Header(default=None, alias="X-GitHub-Email"),
):
    repository = connect_repository(
        db,
        github_user_id=github_user_id,
        github_username=github_username,
        email=email,
        payload=payload,
    )
    return to_response(repository)


@router.get("/connected", response_model=ConnectedRepositoryResponse | None)
def get_connected_repository_endpoint(
    db: Session = Depends(get_db),
    github_user_id: str = Header(alias="X-GitHub-User-Id"),
):
    repository = get_connected_repository(db, github_user_id=github_user_id)
    return to_response(repository) if repository else None


@router.delete("/disconnect", status_code=status.HTTP_204_NO_CONTENT)
def disconnect_repository_endpoint(
    db: Session = Depends(get_db),
    github_user_id: str = Header(alias="X-GitHub-User-Id"),
):
    disconnect_repository(db, github_user_id=github_user_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
