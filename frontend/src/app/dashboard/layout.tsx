import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { getDashboardData } from "@/lib/dashboard/data";
import { requireAuth } from "@/lib/auth/session";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAuth();
  const data = await getDashboardData();

  return (
    <DashboardShell user={user} hasConnectedRepository={data.hasConnectedRepository}>
      {children}
    </DashboardShell>
  );
}
