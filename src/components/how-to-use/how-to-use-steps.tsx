"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Layout, Workflow, History } from "lucide-react";

const steps = [
    {
        title: "1. Configure your API Key",
        description:
            "Head over to the Settings page and enter your Perplexity API key. This is required to run workflows.",
        icon: Settings,
        color: "text-blue-500",
    },
    {
        title: "2. Explore Workflows",
        description:
            "Browse the available workflow templates designed for different research and analysis tasks.",
        icon: Layout,
        color: "text-green-500",
    },
    {
        title: "3. Execute & Analyze",
        description:
            "Input your parameters and run the workflow. Monitor real-time progress and view detailed results.",
        icon: Workflow,
        color: "text-purple-500",
    },
    {
        title: "4. Track History & Usage",
        description:
            "Review your previous runs in the History tab and monitor your API consumption in the Usage section.",
        icon: History,
        color: "text-orange-500",
    },
];

export function HowToUseSteps() {
    return (
        <div className="grid gap-6 md:grid-cols-2">
            {steps.map((step, index) => (
                <Card
                    key={index}
                    className="border-2 transition-colors hover:border-primary/20"
                >
                    <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                        <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800`}>
                            <step.icon className={`h-6 w-6 ${step.color}`} />
                        </div>
                        <CardTitle className="text-xl">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground leading-relaxed">
                            {step.description}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
