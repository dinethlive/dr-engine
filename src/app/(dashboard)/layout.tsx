import { cookies } from "next/headers";
import { DashboardLayoutClient } from "@/components/layout/dashboard-layout-client";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const collapsed = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <DashboardLayoutClient defaultCollapsed={collapsed}>
      {children}
    </DashboardLayoutClient>
  );
}
