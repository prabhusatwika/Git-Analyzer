class QuestionClassifier:
    REPOSITORY_KEYWORDS = [
        "repository",
        "project",
        "summary",
        "overview",
        "architecture",
        "tech stack",
        "technologies",
        "workflow",
    ]

    def classify(self, question: str) -> str:
        q = question.lower()

        if any(ext in q for ext in [".js", ".ts", ".tsx", ".py", ".java", ".cpp", ".jsx"]):
            return "file"

        if any(word in q for word in self.REPOSITORY_KEYWORDS):
            return "repository"

        return "code"
