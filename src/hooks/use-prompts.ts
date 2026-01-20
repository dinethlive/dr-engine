"use client";

import { useState, useEffect } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { api } from "@/lib/api";

export function usePrompts() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("all");

    // Live Query for Prompts
    const allPrompts = useLiveQuery(() => db.prompts.orderBy('createdAt').reverse().toArray());

    // Seeding logic
    useEffect(() => {
        const seedDefaults = async () => {
            const count = await db.prompts.count();
            if (count === 0) {
                const defaults = await api.getDefaultPrompts();
                await db.prompts.bulkAdd(defaults);
            }
        };
        seedDefaults();
    }, []);

    const isLoading = allPrompts === undefined;

    const filteredPrompts = allPrompts?.filter((prompt) => {
        const matchesSearch = prompt.name.toLowerCase().includes(searchQuery.toLowerCase());
        const isSystem = prompt.id && prompt.id < 0; // Negative IDs are system prompts
        const matchesTab =
            activeTab === "all" ||
            (activeTab === "system" && isSystem) ||
            (activeTab === "my" && !isSystem);
        return matchesSearch && matchesTab;
    }) || [];

    const deletePrompt = async (id: number) => {
        if (confirm("Are you sure you want to delete this prompt?")) {
            await api.deletePrompt(id);
        }
    };

    const duplicatePrompt = async (id: number) => {
        await api.duplicatePrompt(id);
    };

    return {
        prompts: filteredPrompts,
        isLoading,
        searchQuery,
        setSearchQuery,
        activeTab,
        setActiveTab,
        deletePrompt,
        duplicatePrompt,
    };
}
