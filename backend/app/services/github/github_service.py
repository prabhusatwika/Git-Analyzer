import requests

from app.core.constants import (
    GITHUB_API_BASE_URL,
    GITHUB_REPOSITORY_API,
    REQUEST_TIMEOUT,
)
from app.schemas.github_repository import RepositoryResponse


class GitHubService:
    """
    Service for communicating with the GitHub REST API.
    """

    def parse_repository_url(self, url) -> tuple[str, str]:
        """
        Converts:
        https://github.com/vercel/next.js

        Into:
        ("vercel", "next.js")
        """

        cleaned = str(url).rstrip("/")
        parts = cleaned.split("/")

        if len(parts) < 2:
            raise ValueError("Invalid GitHub repository URL.")

        owner = parts[-2]
        repo = parts[-1]

        return owner, repo

    def get_public_repository(self, url: str) -> RepositoryResponse:
        """
        Fetch metadata for a public GitHub repository.
        """

        owner, repo = self.parse_repository_url(url)

        api_url = (
            f"{GITHUB_API_BASE_URL}"
            f"{GITHUB_REPOSITORY_API}/{owner}/{repo}"
        )

        response = requests.get(
            api_url,
            timeout=REQUEST_TIMEOUT,
        )

        response.raise_for_status()

        data = response.json()

        return RepositoryResponse(
            github_id=data["id"],
            name=data["name"],
            full_name=data["full_name"],
            owner=data["owner"]["login"],
            description=data.get("description"),
            language=data.get("language"),
            stars=data["stargazers_count"],
            forks=data["forks_count"],
            open_issues=data["open_issues_count"],
            default_branch=data["default_branch"],
            visibility=data["visibility"],
            clone_url=data["clone_url"],
            html_url=data["html_url"],
        )