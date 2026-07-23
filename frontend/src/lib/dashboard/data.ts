import { requireAuth } from "@/lib/auth/session";
import {
  getConnectedRepository,
  toDashboardRepository,
} from "@/lib/api/repositories";
import { buildDashboardData, EMPTY_DASHBOARD_DATA } from "@/lib/dashboard/types";

export async function getDashboardData() {
  try {
    const user = await requireAuth();
    const record = await getConnectedRepository(user);
    const connectedRepository = record ? toDashboardRepository(record) : null;
    return buildDashboardData(connectedRepository);
  } catch {
    return EMPTY_DASHBOARD_DATA;
  }
}
