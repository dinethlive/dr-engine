import { Button } from "@/components/ui/button";
import { AlertCircle, KeyRound, WifiOff, RefreshCw, Settings } from "lucide-react";
import Link from "next/link";

interface ResearchErrorStateProps {
    error?: {
        type: string;
        message: string;
        title?: string;
    };
    onRetry?: () => void;
}

export function ResearchErrorState({ error, onRetry }: ResearchErrorStateProps) {
    if (!error) return null;

    const getErrorContent = () => {
        switch (error.type) {
            case "API_KEY_MISSING":
                return {
                    icon: KeyRound,
                    title: "API Key Missing",
                    description: "Please configure your Perplexity API key in settings to continue research.",
                    action: (
                        <Link href="/settings">
                            <Button variant="default" className="gap-2">
                                <Settings className="w-4 h-4" />
                                Open Settings
                            </Button>
                        </Link>
                    ),
                };
            case "NETWORK_ERROR":
                return {
                    icon: WifiOff,
                    title: "Connection Failed",
                    description: "Please check your internet connection and try again.",
                    action: (
                        <Button onClick={onRetry} variant="outline" className="gap-2">
                            <RefreshCw className="w-4 h-4" />
                            Try Again
                        </Button>
                    ),
                };
            default:
                return {
                    icon: AlertCircle,
                    title: error.title || "Research Failed",
                    description: error.message || "An unexpected error occurred while generating your research.",
                    action: (
                        <Button onClick={onRetry} variant="outline" className="gap-2">
                            <RefreshCw className="w-4 h-4" />
                            Try Again
                        </Button>
                    ),
                };
        }
    };

    const { icon: Icon, title, description, action } = getErrorContent();

    // TODO: To use custom illustrations:
    // 1. Add your .png files to public/images/errors/ (e.g., api-key-missing.png)
    // 2. Replace the Icon component below with <Image src="/images/errors/your-image.png" width={500} height={500} alt={title} />

    return (
        <div className="flex flex-col items-center justify-center p-6 border rounded-lg bg-red-50/50 border-red-100 dark:bg-red-950/10 dark:border-red-900/50 my-2">
            <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
                <Icon className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-[300px] mb-6">
                {description}
            </p>
            {action}
        </div>
    );
}
