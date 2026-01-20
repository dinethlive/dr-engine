"use client";

import { Button } from "@/components/ui/button";
import { Copy, RotateCcw, Download, Check } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";


interface MessageActionsProps {
  onCopy?: () => void;
  onRetry?: () => void;
  onDownload?: () => void;
  showRetry?: boolean;
  showDownload?: boolean;
  showCopy?: boolean;
}

export function MessageActions({
  onCopy,
  onRetry,
  onDownload,
  showRetry = false,
  showDownload = false,
  showCopy = true,
}: MessageActionsProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    if (onCopy) {
      onCopy();
    } else {
      toast.success("Copied to clipboard");
    }
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-1 mt-2">
      {showCopy && (
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={handleCopy}
        >
          {isCopied ? (
            <Check className="h-3.5 w-3.5 text-green-500" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </Button>
      )}

      {showRetry && (
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={onRetry}
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </Button>
      )}

      {showDownload && (
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={onDownload}
        >
          <Download className="h-3.5 w-3.5" />
        </Button>
      )}
    </div>
  );
}
