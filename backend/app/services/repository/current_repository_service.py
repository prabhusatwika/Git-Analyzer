from pathlib import Path
import json


class CurrentRepositoryService:
    FILE = Path("storage/current_repository.json")

    def save(self, repository):

        self.FILE.parent.mkdir(parents=True, exist_ok=True)

        data = {
            "github_id": repository.github_id,
            "name": repository.name,
            "full_name": repository.full_name,
            "owner": repository.owner,
            "description": repository.description,
            "language": repository.language,
            "stars": repository.stars,
            "forks": repository.forks,
            "default_branch": repository.default_branch,
            "visibility": repository.visibility,
            "html_url": str(repository.html_url),
        }

        with open(self.FILE, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)

    def load(self):

        if not self.FILE.exists():
            return None

        with open(self.FILE, "r", encoding="utf-8") as f:
            return json.load(f)