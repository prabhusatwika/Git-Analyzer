from pathlib import Path

from fastapi import APIRouter

from app.schemas.parser import (
    ScanRepositoryRequest,
    ScanRepositoryResponse,
)
from app.services.parser.file_parser import FileParser

router = APIRouter(
    prefix="/parser",
    tags=["Parser"],
)

parser = FileParser()


@router.get("/")
async def parser_health():
    return {
        "message": "Parser Ready"
    }


@router.post(
    "/scan",
    response_model=ScanRepositoryResponse,
)
async def scan_repository(
    request: ScanRepositoryRequest,
):
    files = parser.get_source_files(request.repository_path)

    python_files = 0
    javascript_files = 0
    typescript_files = 0
    markdown_files = 0

    for file in files:

        suffix = file.suffix.lower()

        if suffix == ".py":
            python_files += 1

        elif suffix == ".js":
            javascript_files += 1

        elif suffix in [".ts", ".tsx"]:
            typescript_files += 1

        elif suffix == ".md":
            markdown_files += 1

    return ScanRepositoryResponse(
        repository_name=Path(request.repository_path).name,
        total_files=len(files),
        python_files=python_files,
        javascript_files=javascript_files,
        typescript_files=typescript_files,
        markdown_files=markdown_files,
    )