// Shared API types
import { Workflow as DbWorkflow, Section as DbSection } from '../db';

export interface Workflow extends DbWorkflow {
    sections?: DbSection[];
}

export interface PerplexityOptions {
    search_domain_filter?: string[];
    return_images?: boolean;
    return_related_questions?: boolean;
    search_recency_filter?: 'month' | 'week' | 'day' | 'hour';
    top_k?: number;
    stream?: boolean;
    presence_penalty?: number;
    frequency_penalty?: number;
}

export interface PerplexityResponse {
    choices: {
        message: { content: string };
    }[];
    usage: {
        prompt_tokens: number;
        completion_tokens: number;
    };
    citations?: string[];
}
