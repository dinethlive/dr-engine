"use client";

import { Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GeneratorSubmitButtonProps {
  onClick?: () => void;
  disabled: boolean;
  isGenerating: boolean;
  label?: string;
}

export function GeneratorSubmitButton({
  onClick,
  disabled,
  isGenerating,
  label = "Generate Answers",
}: GeneratorSubmitButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className="w-full gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-md"
    >
      {isGenerating ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Sparkles className="h-4 w-4" />
      )}
      {isGenerating ? "Generating..." : label}
    </Button>
  );
}
