import { AiChatSection } from "@/components/dashboard/ai-chat-section";
import { requireAuth } from "@/lib/auth/session";
import { getDashboardData } from "@/lib/dashboard/data";

export default async function AiChatPage() {
  const user = await requireAuth();
  const data = await getDashboardData();

  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
      <AiChatSection
        enabled={data.hasConnectedRepository}
        user={user}
        repositoryName={data.connectedRepository?.name ?? ""}
      />
    </div>
  );
}