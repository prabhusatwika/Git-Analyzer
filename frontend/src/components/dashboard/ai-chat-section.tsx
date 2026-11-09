import { Bot, Lock, Send, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { AI_CHAT_DISABLED_MESSAGE } from "@/lib/dashboard/constants";

interface AiChatSectionProps {
  enabled: boolean;
}

export function AiChatSection({ enabled }: AiChatSectionProps) {
  return (
    <Card
      className="scroll-mt-24 overflow-hidden rounded-2xl border border-[#DEDCD1] bg-[#FFFEFA] shadow-sm"
    >
      <CardHeader className="border-b border-[#EEECE3] px-6 py-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-[#E8EADF]">
              <Bot className="size-[19px] text-[#52634D]" />
            </span>

            <div>
              <CardTitle className="text-base font-semibold text-[#303A32]">
                AI Chat
              </CardTitle>
              <p className="mt-0.5 text-xs text-[#85877D]">
                Your intelligent repository assistant
              </p>
            </div>
          </div>

          {enabled ? (
            <Badge className="gap-1.5 border border-[#C9D7C1] bg-[#E5EDDF] text-[#52634D] hover:bg-[#E5EDDF]">
              <span className="size-1.5 rounded-full bg-[#66845B]" />
              Available
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="gap-1.5 border-[#DEDCD1] bg-[#F8F7F1] text-[#85877D]"
            >
              <Lock className="size-3" />
              Locked
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-5 p-5 sm:p-6">
        {!enabled ? (
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-[#DCDDD0] bg-[#F8F7F1] px-5 py-10 text-center">
            <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-[#E8EADF]">
              <Sparkles className="size-6 text-[#52634D]" />
            </div>

            <p className="text-sm font-semibold text-[#303A32]">
              Your AI assistant is waiting
            </p>

            <p className="mt-2 max-w-md text-sm leading-6 text-[#777B72]">
              {AI_CHAT_DISABLED_MESSAGE}
            </p>
          </div>
        ) : (
          <div className="rounded-2xl border border-[#DEDCD1] bg-[#F8F7F1] p-5">
            <div className="flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#E8EADF]">
                <Bot className="size-[19px] text-[#52634D]" />
              </span>

              <div>
                <p className="text-sm font-semibold text-[#303A32]">
                  What would you like to explore?
                </p>

                <p className="mt-1.5 text-sm leading-6 text-[#777B72]">
                  Ask questions about commit history, pull request risk, code
                  ownership, or repository insights.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <Textarea
            placeholder={
              enabled
                ? "Ask about your repository..."
                : "Connect a repository to start chatting..."
            }
            disabled={!enabled}
            rows={3}
            className="min-h-28 resize-none rounded-xl border-[#DEDCD1] bg-[#FFFEFA] text-sm text-[#303A32] placeholder:text-[#A3A59A] focus-visible:ring-[#8A9A7C] disabled:cursor-not-allowed disabled:opacity-60"
          />

          <div className="flex justify-end">
            <Button
              type="button"
              disabled={!enabled}
              className="gap-2 rounded-xl bg-[#52634D] px-5 text-white hover:bg-[#3F503B] disabled:bg-[#D8D9D0] disabled:text-[#92958A]"
            >
              <Send className="size-4" />
              Send message
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}