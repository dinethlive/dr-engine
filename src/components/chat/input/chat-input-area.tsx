"use client";

import React from "react";
import { ArrowUp, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputAreaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  placeholder?: string;
  disabled?: boolean;
  isLoading?: boolean;
  onSubmit: () => void;
  canSubmit: boolean;
}

const PLACEHOLDERS = [
  "Enter your research topic...",
  "e.g., The Future of Renewable Energy...",
  "e.g., Impact of AI on Modern Healthcare...",
  "e.g., Sustainable Urban Planning Strategies...",
  "e.g., History of Roman Architecture...",
];

export const ChatInputArea = React.forwardRef<
  HTMLTextAreaElement,
  ChatInputAreaProps
>(
  (
    { value, onChange, onKeyDown, disabled, isLoading, onSubmit, canSubmit },
    ref
  ) => {
    const [placeholderIndex, setPlaceholderIndex] = React.useState(0);

    React.useEffect(() => {
      const interval = setInterval(() => {
        setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
      }, 3000);
      return () => clearInterval(interval);
    }, []);

    return (
      <div className="relative rounded-xl border bg-background shadow-sm focus-within:ring-2 focus-within:ring-orange-500/20 focus-within:border-orange-500/50 transition-all duration-300">
        <div className="relative overflow-hidden">
          {!value && (
            <div className="absolute top-1/2 -translate-y-1/2 left-3 right-12 pointer-events-none z-10 overflow-hidden h-6">
              <AnimatePresence initial={false}>
                <motion.span
                  key={placeholderIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute inset-0 text-muted-foreground truncate text-base md:text-sm"
                >
                  {PLACEHOLDERS[placeholderIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          )}
          <Textarea
            ref={ref}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder=""
            disabled={isLoading || disabled}
            className="min-h-[48px] max-h-[200px] resize-none border-0 pr-12 py-3 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent relative z-20"
            rows={1}
          />
        </div>
        <Button
          size="icon"
          onClick={onSubmit}
          disabled={!canSubmit}
          className="absolute right-2 bottom-2 h-8 w-8 rounded-lg z-30"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ArrowUp className="h-4 w-4" />
          )}
        </Button>
      </div>
    );
  }
);
ChatInputArea.displayName = "ChatInputArea";
