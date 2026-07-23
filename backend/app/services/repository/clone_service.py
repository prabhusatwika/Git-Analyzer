from pathlib import Path

from git import Repo


class CloneService:
    STORAGE_DIRECTORY = Path("storage/repositories")

    def clone_repository(self, clone_url, repository_name: str) -> str:

        destination = self.STORAGE_DIRECTORY / repository_name

        print(f"Clone URL: {clone_url}")
        print(f"Destination: {destination.resolve()}")

        destination.parent.mkdir(parents=True, exist_ok=True)

        if not destination.exists():
            Repo.clone_from(
    str(clone_url),
    str(destination),
    depth=1,
    single_branch=True,
)

        return str(destination.resolve())