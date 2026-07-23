from app.services.llm.llm_service import LLMService

service = LLMService()

answer = service.generate_answer(
    """
Repository Context:

FastAPI application exposes a /search endpoint.

Question:
How do I search the repository?
"""
)

print(answer)