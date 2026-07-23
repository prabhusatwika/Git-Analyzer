from app.services.embeddings.local_embedding_service import LocalEmbeddingService
from app.services.vectorstore.chroma_service import ChromaService


class SemanticSearchService:

    def __init__(self):

        self.embedding_model = LocalEmbeddingService()

        self.chroma = ChromaService()

    def search(
    self,
    repository_name: str,
    query: str,
    n_results: int = 5,
):

        query_embedding = self.embedding_model.generate_embedding(
            query
        )

        results = self.chroma.collection.query(
    query_embeddings=[query_embedding],
    n_results=n_results,
    where={
        "repository": repository_name
    },
    include=[
        "documents",
        "metadatas",
        "distances",
    ],
)

        return results