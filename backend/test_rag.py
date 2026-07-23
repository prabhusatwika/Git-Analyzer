from app.services.rag.rag_service import RAGService

rag = RAGService()

response = rag.ask(
    repository_name="next.js",
    question="How does GitHub authentication work?"
)

print(response["answer"])