import re


class FileDetector:

    FILE_PATTERN = r'[\w\-]+\.(js|jsx|ts|tsx|py|java|cpp|c|cs|go|rb|php|json|yaml|yml|md)'

    def detect(self, question: str):
        match = re.search(self.FILE_PATTERN, question, re.IGNORECASE)

        if match:
            return match.group(0)

        return None