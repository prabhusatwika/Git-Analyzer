from datetime import datetime
from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.connected_repository import ConnectedRepository
from app.models.user import User
from app.schemas.repository import ConnectRepositoryRequest


def get_or_create_user(
    db: Session,
    *,
    github_user_id: str,
    github_username: str,
    email: str | None = None,
) -> User:
    user = db.query(User).filter(User.github_user_id == github_user_id).first()
    if user:
        user.github_username = github_username
        if email:
            user.email = email
        db.commit()
        db.refresh(user)
        return user

    user = User(
        github_user_id=github_user_id,
        github_username=github_username,
        email=email,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def get_connected_repository(db: Session, *, github_user_id: str) -> ConnectedRepository | None:
    user = db.query(User).filter(User.github_user_id == github_user_id).first()
    if not user:
        return None
    return user.connected_repository


def connect_repository(
    db: Session,
    *,
    github_user_id: str,
    github_username: str,
    email: str | None,
    payload: ConnectRepositoryRequest,
) -> ConnectedRepository:
    user = get_or_create_user(
        db,
        github_user_id=github_user_id,
        github_username=github_username,
        email=email,
    )

    if user.connected_repository:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="A repository is already connected. Disconnect it before connecting a new one.",
        )

    repo = ConnectedRepository(
        user_id=user.id,
        github_repo_id=payload.github_repo_id,
        name=payload.name,
        full_name=payload.full_name,
        description=payload.description,
        language=payload.language,
        stars=payload.stars,
        forks=payload.forks,
        is_private=payload.is_private,
        default_branch=payload.default_branch,
        html_url=payload.html_url,
        updated_at_github=payload.updated_at_github,
    )
    db.add(repo)
    db.commit()
    db.refresh(repo)
    return repo


def disconnect_repository(db: Session, *, github_user_id: str) -> None:
    user = db.query(User).filter(User.github_user_id == github_user_id).first()
    if not user or not user.connected_repository:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No connected repository found.",
        )

    db.delete(user.connected_repository)
    db.commit()


def to_response(repo: ConnectedRepository) -> dict:
    return {
        "id": str(repo.id),
        "github_repo_id": repo.github_repo_id,
        "name": repo.name,
        "full_name": repo.full_name,
        "description": repo.description,
        "language": repo.language,
        "stars": repo.stars,
        "forks": repo.forks,
        "is_private": repo.is_private,
        "default_branch": repo.default_branch,
        "html_url": repo.html_url,
        "updated_at_github": repo.updated_at_github,
        "connected_at": repo.connected_at,
    }
