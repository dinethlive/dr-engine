"use client";

import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useSettings } from "@/hooks/settings/use-settings";

export function DefaultModelSelector() {
    const { settings, setDefaultModel } = useSettings();
    const [model, setModel] = useState("sonar-pro");
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (settings.defaultModel) {
            setModel(settings.defaultModel);
        }
    }, [settings.defaultModel]);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await setDefaultModel(model);
            toast.success("Settings saved successfully");
        } catch (error) {
            toast.error("Failed to save settings");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Default Model</CardTitle>
                <CardDescription>
                    Select your preferred Perplexity model for new workflows
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="model">Perplexity Model</Label>
                    <Select value={model} onValueChange={setModel}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a model" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="sonar">sonar - Budget-friendly</SelectItem>
                            <SelectItem value="sonar-pro">sonar-pro - High quality</SelectItem>
                            <SelectItem value="sonar-reasoning-pro">
                                sonar-reasoning-pro - Complex research
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-end pt-2">
                    <Button className="gap-2 w-full sm:w-auto" onClick={handleSave} disabled={isSaving}>
                        <Save className="h-4 w-4" />
                        {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
