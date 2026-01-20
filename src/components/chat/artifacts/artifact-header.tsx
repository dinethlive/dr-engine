"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Copy, Download, Check, FileText } from "lucide-react";

interface ArtifactHeaderProps {
  title: string;
  content: string;
  rawContent?: string;
  onClose: () => void;
}

export function ArtifactHeader({
  title,
  content,
  rawContent,
  onClose,
}: ArtifactHeaderProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(rawContent || content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([rawContent || content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.replace(/\s+/g, "_").toLowerCase()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex items-center justify-between p-3 border-b flex-shrink-0">
      <div className="flex items-center gap-2 min-w-0">
        <FileText className="h-4 w-4 text-orange-500 flex-shrink-0" />
        <span className="font-medium text-sm truncate">{title}</span>
      </div>
      <div className="flex items-center gap-1 flex-shrink-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-8 px-2 text-xs"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 mr-1 text-green-500" />
          ) : (
            <Copy className="h-3.5 w-3.5 mr-1" />
          )}
          {copied ? "Copied!" : "Copy"}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDownload}
          className="h-8 px-2 text-xs"
        >
          <Download className="h-3.5 w-3.5 mr-1" />
          Download
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
