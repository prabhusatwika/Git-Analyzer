import uuid
from pathlib import Path

from app.services.parser.file_parser import FileParser


class ChunkService:
    CHUNK_SIZE = 1200
    CHUNK_OVERLAP = 250

    def __init__(self):
        self.parser = FileParser()

    def split_text(self, text: str):

        chunks = []

        start = 0

        while start < len(text):
            end = start + self.CHUNK_SIZE

            chunks.append(text[start:end])

            start += self.CHUNK_SIZE - self.CHUNK_OVERLAP

        return chunks

    def create_chunks(self, repository_path: str):

        files = self.parser.get_source_files(repository_path)

        # Limit to first 100 files for testing
        files = files[:100]

        total_chunks = 0
        chunk_data = []

        for file in files:
            content = self.parser.read_file(file)

            if not content or not content.strip():
                continue

            chunks = self.split_text(content)

            for index, chunk in enumerate(chunks):
                chunk_data.append(
                    {
                        "id": str(uuid.uuid4()),
                        "file_path": str(file),
                        "language": file.suffix,
                        "content": chunk,
                    }
                )

            total_chunks += len(chunks)

        return {
            "repository_name": Path(repository_path).name,
            "files_processed": len(files),
            "chunks_created": total_chunks,
            "chunks": chunk_data,
        }
