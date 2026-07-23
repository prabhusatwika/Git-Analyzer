def test_health_check(client):
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_api_v1_root(client):
    response = client.get("/api/v1/")
    assert response.status_code == 200
    assert response.json() == {"message": "RepoMind AI API v1"}
