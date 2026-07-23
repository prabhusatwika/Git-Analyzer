import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.core.database import Base, get_db
from app.main import app

SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


@pytest.fixture
def client():
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()

    def override_get_db():
        try:
            yield db
        finally:
            pass

    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()
    Base.metadata.drop_all(bind=engine)


USER_HEADERS = {
    "X-GitHub-User-Id": "12345",
    "X-GitHub-Username": "octocat",
    "X-GitHub-Email": "octocat@github.com",
}

CONNECT_PAYLOAD = {
    "github_repo_id": 1296269,
    "name": "Hello-World",
    "full_name": "octocat/Hello-World",
    "description": "My first repository on GitHub!",
    "language": "Python",
    "stars": 100,
    "forks": 20,
    "is_private": False,
    "default_branch": "main",
    "html_url": "https://github.com/octocat/Hello-World",
    "updated_at_github": "2024-01-01T00:00:00Z",
}


def test_connect_and_get_repository(client):
    response = client.post("/api/v1/repositories/connect", json=CONNECT_PAYLOAD, headers=USER_HEADERS)
    assert response.status_code == 201
    data = response.json()
    assert data["full_name"] == "octocat/Hello-World"

    get_response = client.get("/api/v1/repositories/connected", headers=USER_HEADERS)
    assert get_response.status_code == 200
    assert get_response.json()["name"] == "Hello-World"


def test_connect_duplicate_returns_conflict(client):
    client.post("/api/v1/repositories/connect", json=CONNECT_PAYLOAD, headers=USER_HEADERS)
    response = client.post("/api/v1/repositories/connect", json=CONNECT_PAYLOAD, headers=USER_HEADERS)
    assert response.status_code == 409


def test_disconnect_repository(client):
    client.post("/api/v1/repositories/connect", json=CONNECT_PAYLOAD, headers=USER_HEADERS)
    response = client.delete("/api/v1/repositories/disconnect", headers=USER_HEADERS)
    assert response.status_code == 204

    get_response = client.get("/api/v1/repositories/connected", headers=USER_HEADERS)
    assert get_response.json() is None
