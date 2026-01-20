"use client";

import Link from "next/link";
import { Workflow } from "./types";

interface RecentItemProps {
    workflow: Workflow;
    isMasked: boolean;
}

export function RecentItem({ workflow, isMasked }: RecentItemProps) {
    return (
        <Link
            href={`/workspace?id=${workflow.id}`}
            className="text-left px-2 py-1.5 text-sm text-foreground/80 hover:bg-accent rounded-md transition-colors w-full block overflow-hidden group"
            title={isMasked ? "Hidden" : workflow.topic}
        >
            <span
                className={`block truncate w-full transition-all duration-300 ${isMasked ? "filter blur-[3px] select-none" : ""
                    }`}
            >
                {workflow.topic}
            </span>
        </Link>
    );
}
