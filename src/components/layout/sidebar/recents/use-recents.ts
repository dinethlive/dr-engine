"use client";

import { useState, useCallback, useEffect } from "react";
import { api } from "@/lib/api";
import { Workflow } from "./types";

export function useRecents() {
    const [workflows, setWorkflows] = useState<Workflow[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isMasked, setIsMasked] = useState(false);

    // Initialize masked state from local storage
    useEffect(() => {
        const storedMask = localStorage.getItem("sidebar-privacy-mask");
        if (storedMask) {
            setIsMasked(storedMask === "true");
        }
    }, []);

    const toggleMask = () => {
        const newState = !isMasked;
        setIsMasked(newState);
        localStorage.setItem("sidebar-privacy-mask", String(newState));
    };

    const fetchRecents = useCallback(async () => {
        try {
            const data = await api.getWorkflows({ limit: 20 });
            const workflowsData = data as unknown as Workflow[];
            setWorkflows(workflowsData);
        } catch (error) {
            console.error("Failed to fetch recent workflows:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchRecents();

        const handleResearchUpdate = () => {
            fetchRecents();
        };

        window.addEventListener("research-created", handleResearchUpdate);
        window.addEventListener("research-deleted", handleResearchUpdate);

        return () => {
            window.removeEventListener("research-created", handleResearchUpdate);
            window.removeEventListener("research-deleted", handleResearchUpdate);
        };
    }, [fetchRecents]);

    return {
        workflows,
        isLoading,
        isMasked,
        toggleMask,
    };
}
