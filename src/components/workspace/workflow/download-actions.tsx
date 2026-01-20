import { Button } from "@/components/ui/button";
import { Loader2, Download } from "lucide-react";

interface DownloadActionsProps {
  onDownload: () => void;
  disabled?: boolean;
}

export function DownloadActions({
  onDownload,
  disabled,
}: DownloadActionsProps) {
  return (
    <Button
      onClick={onDownload}
      disabled={disabled}
      size="lg"
      variant="outline"
      className="gap-2"
    >
      {disabled ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Download className="h-4 w-4" />
      )}
      Download Research Note
    </Button>
  );
}
