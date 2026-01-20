import { db } from './db';
import { promptsApi } from './api/prompts';
import { workflowsApi } from './api/workflows';
import { sectionsApi } from './api/sections';
import { Workflow as ApiWorkflow, PerplexityResponse } from './api/types';

// Re-export types
export type { Workflow, PerplexityResponse } from './api/types';

export const api = {
    // Auth (Mock)
    getCurrentUser: async () => ({
        id: 'local-user',
        email: 'user@local.app',
        firstName: 'Local',
        lastName: 'User',
        roles: ['ADMIN'],
    }),

    // Models
    getModels: async () => [
        { id: 'sonar', name: 'sonar', displayName: 'Sonar', description: 'Fast and cheap' },
        { id: 'sonar-pro', name: 'sonar-pro', displayName: 'Sonar Pro', description: 'Balanced performance' },
        { id: 'sonar-reasoning-pro', name: 'sonar-reasoning-pro', displayName: 'Sonar Reasoning Pro', description: 'Best for complex research' },
    ],

    // Prompts
    ...promptsApi,

    // Workflows
    ...workflowsApi,

    // Sections
    ...sectionsApi,

    // Usage / Settings Stubs
    getUsageSummary: async () => ({ totalTokens: 0, totalCost: 0 }),
    getUsageHistory: async () => ({ items: [], total: 0 }),
    getDailyUsage: async () => [],
    updatePreferences: async () => ({ success: true }),
};
