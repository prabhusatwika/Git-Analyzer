from app.services.embeddings.local_embedding_service import LocalEmbeddingService

model = LocalEmbeddingService()

vector = model.generate_embedding(
    "Hello World"
)

print("Embedding Dimension:", len(vector))
print("First 5 Values:", vector[:5])