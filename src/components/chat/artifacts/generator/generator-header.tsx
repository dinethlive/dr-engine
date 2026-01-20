"use client";

import { Sparkles } from "lucide-react";

export function GeneratorHeader() {
  return (
    <div className="flex items-center gap-2">
      <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
        <Sparkles className="h-4 w-4 text-white" />
      </div>
      <div>
        <div className="text-sm font-semibold">Generate Answers</div>
        <div className="text-xs text-muted-foreground">
          AI-powered research answers
        </div>
      </div>
    </div>
  );
}
