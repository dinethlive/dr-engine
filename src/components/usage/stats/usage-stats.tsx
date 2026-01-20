"use client";

import { Usage } from "@/lib/db";
import { useUsageStats } from "@/hooks/usage/stats/use-usage-stats";
import { StatCard } from "./stat-card";

interface UsageStatsProps {
  usageHistory: Usage[];
}

export function UsageStats({ usageHistory }: UsageStatsProps) {
  const { stats } = useUsageStats(usageHistory);

  if (!stats) return null;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          description={stat.description}
          icon={stat.icon}
          color={stat.color}
        />
      ))}
    </div>
  );
}
