"use client";

import { Workflow } from "./types";
import { RecentItem } from "./recent-item";

interface RecentsListProps {
    workflows: Workflow[];
    isMasked: boolean;
}

export function RecentsList({ workflows, isMasked }: RecentsListProps) {
    if (workflows.length === 0) {
        return (
            <p className="px-2 text-sm text-muted-foreground/60">No research yet</p>
        );
    }

    return (
        <div className="flex flex-col gap-1 w-full">
            {workflows.map((workflow) => (
                <RecentItem key={workflow.id} workflow={workflow} isMasked={isMasked} />
            ))}
        </div>
    );
}
