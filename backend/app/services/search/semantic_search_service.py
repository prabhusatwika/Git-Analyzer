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

        print("=" * 60)
        print("SEARCH DEBUG")
        print("Repository:", repository_name)
        print("Question:", query)

        query_embedding = self.embedding_model.generate_embedding(query)

        results = self.chroma.collection.query(
            query_embeddings=[query_embedding],
            n_results=n_results,
            where={"repository": repository_name},
            include=[
                "documents",
                "metadatas",
                "distances",
            ],
        )

        documents = results.get("documents", [[]])[0]
        metadatas = results.get("metadatas", [[]])[0]
        distances = results.get("distances", [[]])[0]

        print("Documents found:", len(documents))

        if documents:
            print("\nTop Results\n")

            for i, (doc, meta, dist) in enumerate(zip(documents, metadatas, distances), start=1):
                print("-" * 60)
                print(f"Result #{i}")
                print("Distance:", dist)
                print("File:", meta.get("file_path"))
                print("Language:", meta.get("language"))
                print("Repository:", meta.get("repository"))
                print("Preview:")
                print(doc[:250])
                print()

        else:
            print("No documents found!")

        print("=" * 60)

        return results

    def filter_results_by_file(self, search_results, file_name: str):
        """
        Filter search results to include only chunks belonging to a specific file.
        """

        documents = search_results.get("documents", [[]])[0]
        metadatas = search_results.get("metadatas", [[]])[0]
        distances = search_results.get("distances", [[]])[0]

        filtered_docs = []
        filtered_meta = []
        filtered_dist = []

        for doc, meta, dist in zip(documents, metadatas, distances):
            file_path = meta.get("file_path", "")

            if file_name.lower() in file_path.lower():
                filtered_docs.append(doc)
                filtered_meta.append(meta)
                filtered_dist.append(dist)

        return {
            "documents": [filtered_docs],
            "metadatas": [filtered_meta],
            "distances": [filtered_dist],
        }
