import os
import shutil
import stat
import time
from pathlib import Path

from git import Repo


def remove_readonly(func, path, exc_info):
    """
    Windows marks some Git files as read-only.
    This function removes the read-only attribute
    and retries the delete operation.
    """
    os.chmod(path, stat.S_IWRITE)
    func(path)


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

    def delete_repository(self, repository_name: str):
        destination = self.STORAGE_DIRECTORY / repository_name

        if not destination.exists():
            return

        # Retry up to 3 times because Windows may temporarily
        # lock Git files.
        for attempt in range(3):
            try:
                shutil.rmtree(
                    destination,
                    onerror=remove_readonly,
                )

                print(f"Deleted repository: {repository_name}")
                return

            except PermissionError:
                print(f"Repository is locked. Retrying ({attempt + 1}/3)...")
                time.sleep(1)

        raise Exception(
            f"Unable to delete repository '{repository_name}'. "
            "It is still being used by another process."
        )
