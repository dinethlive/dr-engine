"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExportButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export function ExportButton({ onClick, disabled }: ExportButtonProps) {
  return (
    <Button
      variant="outline"
      className="gap-2"
      onClick={onClick}
      disabled={disabled}
    >
      <Download className="h-4 w-4" />
      Export CSV
    </Button>
  );
}
