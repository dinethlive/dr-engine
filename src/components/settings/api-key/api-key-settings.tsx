'use client';

import { useState, useEffect } from 'react';
import { useSettings } from "@/hooks/settings/use-settings";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, Save, Key } from 'lucide-react';

export function ApiKeySettings() {
    const { settings, setPerplexityApiKey, isLoading } = useSettings();
    const [key, setKey] = useState('');
    const [showKey, setShowKey] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        if (settings.perplexityApiKey) {
            setKey(settings.perplexityApiKey);
        }
    }, [settings.perplexityApiKey]);

    const handleSave = async () => {
        await setPerplexityApiKey(key);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
    };

    if (isLoading) {
        return <div>Loading settings...</div>;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Key className="w-5 h-5" />
                    Perplexity API Key
                </CardTitle>
                <CardDescription>
                    Enter your Perplexity API key to enable AI features. This key is stored locally in your browser.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-1">
                        <Input
                            type={showKey ? 'text' : 'password'}
                            placeholder="pplx-..."
                            value={key}
                            onChange={(e) => setKey(e.target.value)}
                            className="pr-10"
                        />
                        <button
                            onClick={() => setShowKey(!showKey)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                            {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                    <Button className="w-full sm:w-auto" onClick={handleSave} disabled={!key || key === settings.perplexityApiKey}>
                        {isSaved ? 'Saved!' : 'Save Key'}
                        {!isSaved && <Save className="w-4 h-4 ml-2" />}
                    </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                    You can get your API key from the <a href="https://www.perplexity.ai/settings/api" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Perplexity Settings</a> page.
                </p>
            </CardContent>
        </Card>
    );
}
