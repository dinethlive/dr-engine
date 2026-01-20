"use client";

import { BookOpen } from "lucide-react";

export function HowToUseHeader() {
    return (
        <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-xl mb-2">
                <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">
                How to Use DR-Engine
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                A quick guide to help you get started with deep research and
                workflow automation.
            </p>
        </div>
    );
}
