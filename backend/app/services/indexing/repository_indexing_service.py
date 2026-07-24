from app.services.chunking.chunk_service import ChunkService
from app.services.embeddings.local_embedding_service import LocalEmbeddingService
from app.services.vectorstore.chroma_service import ChromaService


class RepositoryIndexingService:

    def __init__(self):
        self.chunk_service = ChunkService()
        self.embedding_service = LocalEmbeddingService()
        self.chroma_service = ChromaService()

    def index_repository(self, repository_path: str):

        result = self.chunk_service.create_chunks(repository_path)

        repository_name = result["repository_name"]
        chunks = result["chunks"]

        print(f"Found {len(chunks)} chunks")

        stored = 0

        for chunk in chunks:

            try:

                embedding = self.embedding_service.generate_embedding(
                    chunk["content"]
                )

                self.chroma_service.add_embedding(
                    chunk_id=chunk["id"],
                    embedding=embedding,
                    document=chunk["content"],
                    metadata={
                        "repository": repository_name,
                        "file_path": chunk["file_path"],
                        "language": chunk["language"],
                    },
                )

                stored += 1

            except Exception as e:
                print(e)

        print(f"Stored {stored} embeddings")

        return {
            "repository": repository_name,
            "chunks": len(chunks),
            "stored": stored,
        }