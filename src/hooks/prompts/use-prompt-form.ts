"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { Prompt } from "@/lib/db";

interface UsePromptFormProps {
  prompt?: Prompt;
  onSuccess: () => void;
  open: boolean;
}

export function usePromptForm({ prompt, onSuccess, open }: UsePromptFormProps) {
  const [name, setName] = useState("");
  const [type, setType] = useState("question");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (prompt) {
      setName(prompt.name);
      setType(prompt.type);
      setContent(prompt.content);
    } else {
      setName("");
      setType("question");
      setContent("");
    }
  }, [prompt, open]);

  const handleSubmit = async () => {
    if (!name || !content) return;

    setIsSubmitting(true);
    try {
      if (prompt) {
        await api.updatePrompt(prompt.id!, { name, type, content });
        toast.success("Prompt updated");
      } else {
        await api.createPrompt({ name, type, content });
        toast.success("Prompt created");
      }
      onSuccess();
      if (!prompt) {
        setName("");
        setContent("");
      }
    } catch (error) {
      toast.error("Failed to save prompt");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    name,
    setName,
    type,
    setType,
    content,
    setContent,
    handleSubmit,
    isSubmitting,
    isValid: !!name && !!content,
  };
}
