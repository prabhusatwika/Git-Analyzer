import type { AuthUser } from "@/auth/types";

import { backendFetch } from "./client";

export interface ChatSource {
  file_path: string;
  language: string;
}

export interface ChatResponse {
  answer: string;
  context_used: number;
  sources: ChatSource[];
}

export async function askRepositoryAI(
  user: AuthUser,
  repositoryName: string,
  question: string
) {
  return backendFetch<ChatResponse>({
    method: "POST",
    path: "/chat",
    user,
    body: {
      repository_name: repositoryName,
      question,
    },
  });
}

export async function disconnectRepository(
  user: AuthUser
) {
  return backendFetch<{
    success: boolean;
    message: string;
  }>({
    method: "DELETE",
    path: "/repositories/current",
    user,
  });
}