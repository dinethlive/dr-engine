import { useState } from "react";
import { type Workflow, type Artifact } from "@/types/workspace";

export function useWorkflow() {
  const [currentWorkflow, setCurrentWorkflow] = useState<Workflow | null>(null);
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(
    null
  );

  const hasPendingSections = currentWorkflow?.sections?.some(
    (s) => s.status !== "COMPLETED"
  );

  const allSectionsComplete =
    (currentWorkflow?.sections?.length || 0) > 0 &&
    currentWorkflow?.sections?.every((s) => s.status === "COMPLETED");

  return {
    currentWorkflow,
    setCurrentWorkflow,
    selectedArtifact,
    setSelectedArtifact,
    hasPendingSections,
    allSectionsComplete,
  };
}
