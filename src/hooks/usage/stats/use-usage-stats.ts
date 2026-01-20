import { useMemo } from "react";
import { Zap, Coins, TrendingUp } from "lucide-react";
import { Usage } from "@/lib/db";

export function useUsageStats(usageHistory: Usage[]) {
  const stats = useMemo(() => {
    const totalTokens = usageHistory.reduce(
      (acc, curr) => acc + (curr.tokens || 0),
      0
    );
    const totalCost = usageHistory.reduce(
      (acc, curr) => acc + (curr.cost || 0),
      0
    );
    const uniqueWorkflows = new Set(
      usageHistory.map((h) => h.workflowId).filter(Boolean)
    );

    return [
      {
        title: "Total Tokens",
        value: totalTokens.toLocaleString(),
        description: "Input + Output tokens",
        icon: Zap,
        color: "text-blue-500",
      },
      {
        title: "Total Cost",
        value: `$${totalCost.toFixed(2)}`,
        description: "All time", // This description might need update if filtered, leaving as is for now or could be dynamic
        icon: Coins,
        color: "text-green-500",
      },
      {
        title: "Workflows",
        value: uniqueWorkflows.size.toString(),
        description: "With recorded usage",
        icon: TrendingUp,
        color: "text-purple-500",
      },
    ];
  }, [usageHistory]);

  return { stats };
}
