
export interface Model {
    id: string;
    name: string;
    displayName: string;
    isDefault?: boolean;
}

export interface Prompt {
    id: string | number;
    name: string;
    isDefault?: boolean;
}

export interface PerplexityOptions {
    search_recency_filter?: "month" | "week" | "day" | "hour";
    search_domain_filter?: string[];
}
