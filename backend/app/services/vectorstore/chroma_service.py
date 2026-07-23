import chromadb


class ChromaService:

    def __init__(self):

        self.client = chromadb.PersistentClient(
            path="storage/chroma"
        )

        self.collection = self.client.get_or_create_collection(
            name="repository_chunks"
        )

    def add_embedding(
        self,
        chunk_id: str,
        embedding: list,
        document: str,
        metadata: dict,
    ):

        try:

            self.collection.add(
                ids=[chunk_id],
                embeddings=[embedding],
                documents=[document],
                metadatas=[metadata],
            )

        except Exception as e:

            print(f"Error storing {chunk_id}: {e}")

    def count_embeddings(self):

        return self.collection.count()

    def get_collection(self):

        return self.collection