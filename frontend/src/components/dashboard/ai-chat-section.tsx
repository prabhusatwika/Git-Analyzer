"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

import { askRepositoryAI } from "@/lib/api/chat";

import type { AuthUser } from "@/auth/types";
import { Bot, Lock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { AI_CHAT_DISABLED_MESSAGE } from "@/lib/dashboard/constants";

interface AiChatSectionProps {
  enabled: boolean;
  user: AuthUser;
  repositoryName: string;
}

export function AiChatSection({
  
  enabled,
  user,
  repositoryName,
}: AiChatSectionProps) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSend() {
  if (!question.trim()) return;

  setLoading(true);
  setError("");

  try {
    const response = await askRepositoryAI(
      user,
      repositoryName,
      question
    );

    setAnswer(response.answer);
  } catch (err) {
    setError("Failed to contact AI.");
  } finally {
    setLoading(false);
  }
}
  return (
    <Card id="ai-chat" className="border-border/60 scroll-mt-20">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-2">
          <CardTitle className="text-base font-semibold">AI Chat</CardTitle>

          {!enabled && (
            <Badge variant="secondary" className="gap-1">
              <Lock className="size-3" />
              Locked
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {!enabled ? (
          <div className="flex flex-col items-center rounded-xl border border-dashed bg-muted/30 px-6 py-10 text-center">
            <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-violet-500/10">
              <Bot className="size-6 text-violet-600 dark:text-violet-400" />
            </div>

            <p className="text-sm font-medium">
              AI Chat is not available yet
            </p>

            <p className="mt-1 max-w-md text-sm text-muted-foreground">
              {AI_CHAT_DISABLED_MESSAGE}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="space-y-3">
  <div className="rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground">
    Ask questions about commit history, pull request risk, or code ownership.
  </div>

  {error && (
    <div className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-600">
      {error}
    </div>
  )}

  {answer && (
    <div className="rounded-lg border bg-background p-4">
      <h4 className="mb-2 font-semibold">AI Response</h4>
      <p className="whitespace-pre-wrap text-sm">{answer}</p>
    </div>
  )}
</div>
          </div>
        )}

        <div className="space-y-2">
          <Textarea
  value={question}
  onChange={(e) => setQuestion(e.target.value)}
  placeholder={
    enabled
      ? "Ask about your repository..."
      : "Connect a repository to start chatting..."
  }
  disabled={!enabled || loading}
  rows={3}
  className="resize-none"
/>

          <div className="flex justify-end">
            <Button
  type="button"
  disabled={!enabled || loading || !question.trim()}
  onClick={handleSend}
>
  {loading ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Thinking...
    </>
  ) : (
    "Send message"
  )}
</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}