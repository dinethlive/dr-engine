import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { api } from "@/lib/api";
import { useChat } from "../chat/use-chat";
import { useWorkflow } from "./use-workflow";
import { getWorkflowMessages } from "@/lib/workspace/workflow-transformer";

interface UseLoadWorkflowProps {
  chat: ReturnType<typeof useChat>;
  workflow: ReturnType<typeof useWorkflow>;
}

export function useLoadWorkflow({ chat, workflow }: UseLoadWorkflowProps) {
  const searchParams = useSearchParams();
  const workflowId = searchParams.get("id");
  const [isLoadingWorkflow, setIsLoadingWorkflow] = useState(false);
  const [lastLoadedId, setLastLoadedId] = useState<string | null>(null);

  useEffect(() => {
    if (!workflowId) {
      if (lastLoadedId !== null) {
        // Clear state if id is removed
        workflow.setCurrentWorkflow(null);
        workflow.setSelectedArtifact(null);
        chat.setMessages([]);
        setLastLoadedId(null);
      }
      return;
    }

    // Load if it's a new ID
    if (workflowId === lastLoadedId) return;

    const loadWorkflow = async () => {
      setIsLoadingWorkflow(true);
      try {
        const loadedWorkflow = (await api.getWorkflow(
          workflowId
        )) as unknown as any;
        if (!loadedWorkflow || !loadedWorkflow.id)
          throw new Error("Invalid workflow data");

        workflow.setCurrentWorkflow(loadedWorkflow);

        const messages = getWorkflowMessages(loadedWorkflow);

        chat.setMessages(messages);
        setLastLoadedId(workflowId);
      } catch (error) {
        console.error("Failed to load workflow:", error);
      } finally {
        setIsLoadingWorkflow(false);
      }
    };

    loadWorkflow();
  }, [workflowId, lastLoadedId]);

  return {
    isLoadingWorkflow,
    workflowId,
  };
}
