from pathlib import Path

from app.services.llm.llm_service import LLMService
from app.services.rag.file_detector import FileDetector
from app.services.rag.prompt_service import PromptService
from app.services.rag.question_classifier import QuestionClassifier
from app.services.search.semantic_search_service import SemanticSearchService


class RAGService:
    def __init__(self):
        self.search_service = SemanticSearchService()
        self.llm_service = LLMService()

        self.prompt_service = PromptService()
        self.question_classifier = QuestionClassifier()
        self.file_detector = FileDetector()

    def ask(
        self,
        repository_name: str,
        question: str,
    ):

        # Detect intent
        intent = self.question_classifier.classify(question)

        # Detect file name (if any)
        file_name = self.file_detector.detect(question)

        print("=" * 60)
        print("Question:", question)
        print("Intent:", intent)
        print("Detected File:", file_name)
        print("=" * 60)

        # Semantic Search
        search_results = self.search_service.search(
            repository_name=repository_name,
            query=question,
            n_results=12,
        )

        # File-specific retrieval
        if file_name:
            filtered_results = self.search_service.filter_results_by_file(
                search_results,
                file_name,
            )

            if filtered_results["documents"][0]:
                print(f"Using file-specific retrieval for {file_name}")
                search_results = filtered_results

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

            try:
                path = Path(file_path)

                if "repositories" in path.parts:
                    index = path.parts.index("repositories")
                    relative_path = "/".join(path.parts[index + 2 :])
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

        if intent == "repository":
            prompt = self.prompt_service.build_repository_prompt(
                context=context,
                question=question,
            )

        elif intent == "file":
            prompt = self.prompt_service.build_file_prompt(
                context=context,
                question=question,
            )

        else:
            prompt = self.prompt_service.build_code_prompt(
                context=context,
                question=question,
            )
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
                    relative_path = "/".join(path.parts[index + 2 :])
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

        print("=" * 60)
        print("RAG RESPONSE")
        print("Context Chunks Used:", len(documents))
        print("Source Files:", len(sources))
        print("=" * 60)

        return {
            "answer": answer,
            "context_used": len(documents),
            "sources": sources,
        }
