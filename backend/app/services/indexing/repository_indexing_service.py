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
        print("=" * 60)
        print("CHUNK SUMMARY")

        seen = set()

        for chunk in chunks:
            fp = chunk["file_path"]

            if fp in seen:
                print("Duplicate file:", fp)

            seen.add(fp)

        print("Unique files:", len(seen))
        print("Total chunks:", len(chunks))
        print("=" * 60)

        print(f"Found {len(chunks)} chunks")

        # -----------------------------
        # Remove previous embeddings
        # -----------------------------
        try:
            self.chroma_service.collection.delete(
                where={
                    "repository": repository_name
                }
            )
            print(f"Deleted previous embeddings for {repository_name}")
        except Exception as e:
            print(f"No previous embeddings to delete: {e}")

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
    
    def delete_repository_embeddings(self, repository_name: str):
        try:
            self.chroma_service.collection.delete(
                where={
                    "repository": repository_name
                }
            )

            print(f"Deleted embeddings for {repository_name}")

        except Exception as e:
            print(e)