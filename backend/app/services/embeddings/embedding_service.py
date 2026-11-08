from app.services.chunking.chunk_service import ChunkService
from app.services.embeddings.local_embedding_service import LocalEmbeddingService
from app.services.vectorstore.chroma_service import ChromaService


class EmbeddingService:
    def __init__(self):

        self.chunk_service = ChunkService()

        self.embedding_model = LocalEmbeddingService()

        self.chroma = ChromaService()

    def create_embeddings(self, repository_path: str):

        result = self.chunk_service.create_chunks(repository_path)

        chunks = result["chunks"]

        stored = 0

        for chunk in chunks:
            embedding = self.embedding_model.generate_embedding(chunk["content"])

            metadata = {
                "file_path": chunk["file_path"],
                "language": chunk["language"],
                "repository": result["repository_name"],
            }

            self.chroma.add_embedding(
                chunk_id=chunk["id"],
                embedding=embedding,
                document=chunk["content"],
                metadata=metadata,
            )

            stored += 1

        return {
            "repository_name": result["repository_name"],
            "chunks_processed": len(chunks),
            "embeddings_created": stored,
            "total_vectors_in_chromadb": self.chroma.count_embeddings(),
        }
