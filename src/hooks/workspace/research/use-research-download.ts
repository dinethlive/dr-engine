import { useState } from "react";
import { api } from "@/lib/api";
import { type Workflow } from "@/types/workspace";
import { useChat } from "../chat/use-chat";
import { useWorkflow } from "../state/use-workflow";

interface UseResearchDownloadProps {
  chat: ReturnType<typeof useChat>;
  workflow: ReturnType<typeof useWorkflow>;
}

export function useResearchDownload({
  chat,
  workflow,
}: UseResearchDownloadProps) {
  const [isLoading, setIsLoading] = useState(false);

  const downloadResearch = async () => {
    if (!workflow.currentWorkflow) return;
    setIsLoading(true);
    try {
      await api.mergeWorkflow(workflow.currentWorkflow.id);
      const updated = (await api.getWorkflow(
        workflow.currentWorkflow.id
      )) as any;
      if (!updated.id) throw new Error("Invalid workflow data");
      workflow.setCurrentWorkflow(updated);

      const blob = new Blob([updated.mergedContent || ""], {
        type: "text/markdown",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `research_note_${updated.topic.slice(0, 30)}.md`;
      a.click();
      URL.revokeObjectURL(url);

      chat.addMessage({
        id: `ai - dl - ${Date.now()} `,
        role: "ai",
        content: "Research note downloaded successfully!",
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    downloadResearch,
  };
}
