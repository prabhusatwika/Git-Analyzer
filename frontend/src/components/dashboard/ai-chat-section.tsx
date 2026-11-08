"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, Lock, Loader2 } from "lucide-react";

import type { AuthUser } from "@/auth/types";

import { askRepositoryAI } from "@/lib/api/chat";
import { AI_CHAT_DISABLED_MESSAGE } from "@/lib/dashboard/constants";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface AiChatSectionProps {
  enabled: boolean;
  user: AuthUser;
  repositoryName: string;
}

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  sources?: {
    file_path: string;
    language: string;
  }[];
};

export function AiChatSection({
  enabled,
  user,
  repositoryName,
}: AiChatSectionProps) {
  const [question, setQuestion] = useState("");

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
  if (!messages.length) return;

  bottomRef.current?.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
  });
}, [messages]);

  async function handleSend() {
    if (!question.trim()) return;

    const currentQuestion = question;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: currentQuestion,
      },
    ]);

    setQuestion("");

    setLoading(true);

    setError("");

    try {
      const response = await askRepositoryAI(
        user,
        repositoryName,
        currentQuestion
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.answer,
          sources: response.sources,
        },
      ]);
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
      <CardTitle className="text-base font-semibold">
        AI Chat
      </CardTitle>

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
      <>
        <div className="rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground">
          Ask questions about commit history, pull request
          risk, code ownership, architecture or files.
        </div>

        {error && (
          <div className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`rounded-xl border shadow-sm p-5 ${
                message.role === "user"
                  ? "bg-violet-50 dark:bg-violet-950/20"
                  : "bg-background"
              }`}
            >
              {message.role === "user" ? (
                <>
                  <h4 className="mb-2 font-semibold">
                    You
                  </h4>

                  <p className="whitespace-pre-wrap text-sm">
                    {message.content}
                  </p>
                </>
              ) : (
                <>
                  <h4 className="mb-2 font-semibold">
                    AI Response
                  </h4>
                  <div className="prose prose-sm dark:prose-invert max-w-none break-words">
                  <ReactMarkdown
  remarkPlugins={[remarkGfm]}
  components={{
    code(props) {
      const { children, className, ...rest } = props;

      const match = /language-(\w+)/.exec(className || "");

      if (match) {
        return (
          <SyntaxHighlighter
  style={oneDark}
  language={match[1]}
  PreTag="div"
  customStyle={{
    borderRadius: "10px",
    padding: "16px",
    overflowX: "auto",
    fontSize: "14px",
  }}
>
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        );
      }

      return (
        <code
          className="rounded-md bg-muted px-1.5 py-1 text-[13px] font-mono"
          {...rest}
        >
          {children}
        </code>
      );
    },
        h1: ({ children }) => (
      <h1 className="text-3xl font-bold mt-6 mb-4">
        {children}
      </h1>
    ),

    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold mt-5 mb-3">
        {children}
      </h2>
    ),

    h3: ({ children }) => (
      <h3 className="text-xl font-semibold mt-4 mb-2">
        {children}
      </h3>
    ),

    p: ({ children }) => (
      <p className="leading-7 mb-3">
        {children}
      </p>
    ),

    ul: ({ children }) => (
      <ul className="list-disc pl-6 mb-3 space-y-1">
        {children}
      </ul>
    ),

    ol: ({ children }) => (
      <ol className="list-decimal pl-6 mb-3 space-y-1">
        {children}
      </ol>
    ),

    li: ({ children }) => (
      <li>
        {children}
      </li>
    ),

    strong: ({ children }) => (
      <strong className="font-semibold">
        {children}
      </strong>
    ),

    em: ({ children }) => (
      <em className="italic">
        {children}
      </em>
    ),

    blockquote: ({ children }) => (
      <blockquote className="my-4 border-l-4 border-violet-500 pl-4 italic text-muted-foreground">
        {children}
      </blockquote>
    ),

    table: ({ children }) => (
      <div className="overflow-x-auto my-4">
        <table className="min-w-full border border-border">
          {children}
        </table>
      </div>
    ),

    thead: ({ children }) => (
      <thead className="bg-muted">
        {children}
      </thead>
    ),

    tbody: ({ children }) => (
      <tbody>
        {children}
      </tbody>
    ),

    tr: ({ children }) => (
      <tr className="border-b">
        {children}
      </tr>
    ),

    th: ({ children }) => (
      <th className="border px-4 py-2 text-left font-semibold">
        {children}
      </th>
    ),

    td: ({ children }) => (
      <td className="border px-4 py-2">
        {children}
      </td>
    ),

    hr: () => (
      <hr className="my-6 border-border" />
    ),
  }}
>
  {message.content}
</ReactMarkdown>
</div>
                  {message.sources &&
                    message.sources.length > 0 && (
                      <div className="border-t pt-4 mt-4">
                        <h5 className="mb-2 text-sm font-semibold">
                          Sources
                        </h5>

                        <div className="space-y-2">
                          {message.sources.map(
                            (source, i) => (
                              <div
                                key={i}
                                className="flex items-center justify-between rounded-md border px-3 py-2 text-sm"
                              >
                                <span>
                                  📄 {source.file_path}
                                </span>

                                <span className="text-muted-foreground">
                                  {source.language}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                </>
              )}
            </div>
          ))}

          {loading && (
            <div className="rounded-lg border p-4 bg-background">
              <h4 className="mb-2 font-semibold">
                AI Response
              </h4>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Thinking...
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </>
    )}

    <div className="space-y-2">
      <Textarea
        value={question}
        onChange={(e) =>
          setQuestion(e.target.value)
        }
        placeholder={
          enabled
            ? "Ask anything about your repository..."
            : "Connect a repository first..."
        }
        disabled={!enabled || loading}
        rows={3}
        className="resize-none"
      />

      <div className="flex justify-end">
        <Button
          type="button"
          disabled={
            !enabled ||
            loading ||
            !question.trim()
          }
          onClick={handleSend}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Thinking...
            </>
          ) : (
            "Send Message"
          )}
        </Button>
      </div>
    </div>
  </CardContent>
</Card>
  );
}