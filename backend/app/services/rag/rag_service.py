from pathlib import Path

from app.services.search.semantic_search_service import SemanticSearchService
from app.services.llm.llm_service import LLMService


class RAGService:

    def __init__(self):
        self.search_service = SemanticSearchService()
        self.llm_service = LLMService()

    def ask(
        self,
        repository_name: str,
        question: str,
    ):

        search_results = self.search_service.search(
            repository_name=repository_name,
            query=question,
            n_results=8,
        )

        documents = search_results.get("documents", [[]])[0]
        metadatas = search_results.get("metadatas", [[]])[0]

        if not documents:
            return {
                "answer": "I couldn't find any relevant information in the repository.",
                "context_used": 0,
                "sources": [],
            }

        context_parts = []

        for i, (doc, meta) in enumerate(zip(documents, metadatas), start=1):

            file_path = meta.get("file_path", "Unknown File")
            language = meta.get("language", "")

            # Convert absolute path to repository-relative path
            try:
                path = Path(file_path)

                if "repositories" in path.parts:
                    index = path.parts.index("repositories")
                    relative_path = "/".join(path.parts[index + 2:])
                else:
                    relative_path = path.name

            except Exception:
                relative_path = file_path

            context_parts.append(
                f"""
===========================
Context {i}
===========================

File: {relative_path}
Language: {language}

{doc}
"""
            )

        context = "\n".join(context_parts)

        prompt = f"""
You are RepoMind AI, an expert software engineering assistant.

You answer questions ONLY using the repository context provided below.

Instructions:

1. Use only the repository context.
2. Never invent information.
3. If multiple contexts describe the same feature, combine them into one explanation.
4. Mention the relevant file path(s) whenever possible.
5. Ignore unrelated files.
6. If the answer cannot be determined from the repository context, reply exactly:

"I couldn't find enough information in the repository to answer this."

===========================
Repository Context
===========================

{context}

===========================
User Question
===========================

{question}

===========================
Answer
===========================
"""

        try:
            answer = self.llm_service.generate_answer(prompt)

        except Exception as e:
            answer = f"LLM Error: {str(e)}"

        sources = []
        seen = set()

        for meta in metadatas:

            file_path = meta.get("file_path", "")
            language = meta.get("language", "")

            try:
                path = Path(file_path)

                if "repositories" in path.parts:
                    index = path.parts.index("repositories")
                    relative_path = "/".join(path.parts[index + 2:])
                else:
                    relative_path = path.name

            except Exception:
                relative_path = file_path

            if relative_path not in seen:
                seen.add(relative_path)

                sources.append(
                    {
                        "file_path": relative_path,
                        "language": language,
                    }
                )

        return {
            "answer": answer,
            "context_used": len(documents),
            "sources": sources,
        }