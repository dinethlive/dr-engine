"use client";

import { Usage } from "@/lib/db";
import { useUsageExport } from "@/hooks/usage/actions/use-usage-export";
import { ExportButton } from "./export-button";

interface UsageHeaderProps {
  usageHistory: Usage[] | undefined;
}

export function UsageHeader({ usageHistory }: UsageHeaderProps) {
  const { handleExport, isExportDisabled } = useUsageExport(usageHistory);

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">API Usage</h1>
        <p className="text-muted-foreground mt-1 text-sm md:text-base">
          Track your Perplexity API consumption and costs
        </p>
      </div>
      <div className="w-full md:w-auto">
        <ExportButton onClick={handleExport} disabled={isExportDisabled} />
      </div>
    </div>
  );
}
