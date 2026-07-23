from ollama import chat


class LLMService:

    def generate_answer(self, prompt: str) -> str:

        response = chat(
            model="llama3.2",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are an expert software engineer. "
                        "Answer questions only using the repository context provided. "
                        "If the answer is not present in the context, clearly say so."
                    ),
                },
                {
                    "role": "user",
                    "content": prompt,
                },
            ],
        )

        return response["message"]["content"]