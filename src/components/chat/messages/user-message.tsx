"use client";

import { MessageActions } from "./message-actions";
import { toast } from "sonner";

interface UserMessageProps {
    content: string;
}

export function UserMessage({ content }: UserMessageProps) {
    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        toast.success("Copied to clipboard");
    };

    return (
        <div className="flex flex-col items-end py-4 group">
            <div className="max-w-[80%] rounded-2xl bg-muted px-4 py-2 relative">
                <p className="text-sm">{content}</p>
            </div>
            <div>
                <MessageActions onCopy={handleCopy} />
            </div>
        </div>
    );
}
