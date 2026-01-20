import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';

export interface Settings {
    perplexityApiKey: string | null;
    defaultModel: string | null;
}

export function useSettings() {
    const settings = useLiveQuery(async () => {
        const apiKey = await db.settings.get('perplexityApiKey');
        const defaultModel = await db.settings.get('defaultModel');
        return {
            perplexityApiKey: apiKey?.value || null,
            defaultModel: defaultModel?.value || 'sonar-pro', // Default fallback
        };
    });

    const setPerplexityApiKey = async (key: string) => {
        if (!key) {
            await db.settings.delete('perplexityApiKey');
        } else {
            await db.settings.put({ key: 'perplexityApiKey', value: key });
        }
    };

    const setDefaultModel = async (model: string) => {
        if (!model) {
            await db.settings.delete('defaultModel');
        } else {
            await db.settings.put({ key: 'defaultModel', value: model });
        }
    };

    return {
        settings: settings || { perplexityApiKey: null, defaultModel: 'sonar-pro' },
        setPerplexityApiKey,
        setDefaultModel,
        isLoading: settings === undefined,
    };
}
