from pathlib import Path

SUPPORTED_EXTENSIONS = {
    ".py",
    ".js",
    ".jsx",
    ".ts",
    ".tsx",
    ".java",
    ".cpp",
    ".c",
    ".cs",
    ".go",
    ".rs",
    ".php",
    ".rb",
    ".swift",
    ".kt",
    ".md",
}


class FileParser:
    def get_source_files(self, repository_path: str):
        repository = Path(repository_path).resolve()

        if not repository.exists():
            print("Repository not found:", repository)
            return []

        files = []

        for file in repository.rglob("*"):
            if not file.is_file():
                continue

            if file.suffix.lower() not in SUPPORTED_EXTENSIONS:
                continue

            if ".git" in file.parts:
                continue

            if "node_modules" in file.parts:
                continue

            if "dist" in file.parts:
                continue

            if "build" in file.parts:
                continue

            files.append(file)

        print(f"Found {len(files)} files")

        return files

    def read_file(self, file_path: Path):
        try:
            return file_path.read_text(
                encoding="utf-8",
                errors="ignore",
            )
        except Exception:
            return ""