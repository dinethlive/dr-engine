"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, ShieldCheck } from "lucide-react";

export function HowToUseTips() {
    return (
        <Card className="bg-primary/5 border-none">
            <CardHeader>
                <div className="flex items-center gap-2 mb-1">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    <CardTitle>Pro Tips</CardTitle>
                </div>
                <CardDescription>
                    Make the most out of your research sessions
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex gap-3">
                    <ShieldCheck className="h-5 w-5 text-primary shrink-0" />
                    <p className="text-sm">
                        <strong>Data Privacy:</strong> Your API keys and research
                        results are stored locally in your browser (IndexedDB) and are
                        never sent to our servers.
                    </p>
                </div>
                <div className="flex gap-3">
                    <ShieldCheck className="h-5 w-5 text-primary shrink-0" />
                    <p className="text-sm">
                        <strong>Cost Management:</strong> Check the Usage tab regularly
                        to stay informed about your Perplexity API spending.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
