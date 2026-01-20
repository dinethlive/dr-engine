"use client";

import { Usage } from "@/lib/db";

export function useUsageExport(usageHistory: Usage[] | undefined) {
  const handleExport = () => {
    if (!usageHistory || usageHistory.length === 0) return;

    const headers = [
      "Date",
      "Workflow",
      "Model",
      "Input Tokens",
      "Output Tokens",
      "Cost ($)",
    ];

    const csvContent = [
      headers.join(","),
      ...usageHistory.map((item) =>
        [
          `"${item.date}"`,
          `"${(item.workflowName || "").replace(/"/g, '""')}"`,
          `"${item.model}"`,
          item.inputTokens || 0,
          item.outputTokens || 0,
          (item.cost || 0).toFixed(4),
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `usage_export_${new Date().toISOString().split("T")[0]}.csv`
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const isExportDisabled = !usageHistory || usageHistory.length === 0;

  return { handleExport, isExportDisabled };
}
