import type { PluginContext, Tool, ToolCallResult, ToolContext } from './types.ts';

let pluginConfig: Record<string, unknown> = {};

export async function onLoad(ctx: PluginContext): Promise<void> {
  pluginConfig = await ctx.config.get();
  ctx.logger.info(`[cortex-plugin-memory-consolidation] Loaded in ${ctx.pluginDir}`);
}

export async function onUnload(ctx: PluginContext): Promise<void> {
  ctx.logger.info('[cortex-plugin-memory-consolidation] Unloading...');
}

const memoryConsolidateTool: Tool = {
  definition: {
    name: 'memory_consolidate',
    description: 'Run consolidation on recent memories',
    params: [
      {
        name: 'since',
        type: 'string',
        description: 'ISO date string for how far back to consolidate',
        required: false,
      },
      {
        name: 'max_memories',
        type: 'number',
        description: 'Maximum number of memories to process',
        required: false,
      },
      {
        name: 'strategy',
        type: 'string',
        description: 'Consolidation strategy (summarize, cluster, prune, digest)',
        required: false,
      },
    ],
    capabilities: ['memory:store'],
  },
  execute: async (args: Record<string, unknown>, _ctx: ToolContext): Promise<ToolCallResult> => {
    const start = Date.now();
    try {
      const since = (args.since as string) || '24 hours ago';
      const maxMemories = (args.max_memories as number) || 100;
      const strategy = (args.strategy as string) || 'summarize';
      const validStrategies = ['summarize', 'cluster', 'prune', 'digest'];
      if (!validStrategies.includes(strategy)) {
        return {
          toolName: 'memory_consolidate',
          success: false,
          output: '',
          error: `Invalid strategy: ${strategy}. Must be one of: ${validStrategies.join(', ')}`,
          durationMs: Date.now() - start,
        };
      }
      const result = {
        consolidated: 0,
        clusters_created: 0,
        memories_processed: 0,
        strategy,
        since,
      };
      return {
        toolName: 'memory_consolidate',
        success: true,
        output: JSON.stringify(result, null, 2),
        durationMs: Date.now() - start,
      };
    } catch (error) {
      return {
        toolName: 'memory_consolidate',
        success: false,
        output: '',
        error: `Failed to consolidate: ${error instanceof Error ? error.message : String(error)}`,
        durationMs: Date.now() - start,
      };
    }
  },
};

const memoryPruneTool: Tool = {
  definition: {
    name: 'memory_prune',
    description: 'Prune low-importance memories',
    params: [
      {
        name: 'threshold',
        type: 'number',
        description: 'Importance threshold below which memories are pruned',
        required: false,
      },
      {
        name: 'older_than_days',
        type: 'number',
        description: 'Only prune memories older than this many days',
        required: false,
      },
    ],
    capabilities: ['memory:store'],
  },
  execute: async (args: Record<string, unknown>, _ctx: ToolContext): Promise<ToolCallResult> => {
    const start = Date.now();
    try {
      const threshold = (args.threshold as number) || 0.3;
      const olderThanDays = (args.older_than_days as number) || 30;
      const result = { pruned: 0, threshold, older_than_days: olderThanDays };
      return {
        toolName: 'memory_prune',
        success: true,
        output: JSON.stringify(result, null, 2),
        durationMs: Date.now() - start,
      };
    } catch (error) {
      return {
        toolName: 'memory_prune',
        success: false,
        output: '',
        error: `Failed to prune: ${error instanceof Error ? error.message : String(error)}`,
        durationMs: Date.now() - start,
      };
    }
  },
};

const memoryClusterTool: Tool = {
  definition: {
    name: 'memory_cluster',
    description: 'Cluster related memories by topic',
    params: [
      {
        name: 'max_clusters',
        type: 'number',
        description: 'Maximum number of clusters to create',
        required: false,
      },
    ],
    capabilities: ['memory:store'],
  },
  execute: async (args: Record<string, unknown>, _ctx: ToolContext): Promise<ToolCallResult> => {
    const start = Date.now();
    try {
      const maxClusters = (args.max_clusters as number) || 10;
      const result = { clusters: [], max_clusters: maxClusters, total_memories: 0 };
      return {
        toolName: 'memory_cluster',
        success: true,
        output: JSON.stringify(result, null, 2),
        durationMs: Date.now() - start,
      };
    } catch (error) {
      return {
        toolName: 'memory_cluster',
        success: false,
        output: '',
        error: `Failed to cluster: ${error instanceof Error ? error.message : String(error)}`,
        durationMs: Date.now() - start,
      };
    }
  },
};

const memoryDigestTool: Tool = {
  definition: {
    name: 'memory_digest',
    description: 'Generate a digest of what was learned',
    params: [
      {
        name: 'period',
        type: 'string',
        description: 'Time period for the digest (daily, weekly, monthly)',
        required: false,
      },
      {
        name: 'format',
        type: 'string',
        description: 'Output format (summary, bullets, detailed)',
        required: false,
      },
    ],
    capabilities: ['memory:store'],
  },
  execute: async (args: Record<string, unknown>, _ctx: ToolContext): Promise<ToolCallResult> => {
    const start = Date.now();
    try {
      const period = (args.period as string) || 'weekly';
      const format = (args.format as string) || 'summary';
      const validPeriods = ['daily', 'weekly', 'monthly'];
      const validFormats = ['summary', 'bullets', 'detailed'];
      if (!validPeriods.includes(period)) {
        return {
          toolName: 'memory_digest',
          success: false,
          output: '',
          error: `Invalid period: ${period}. Must be one of: ${validPeriods.join(', ')}`,
          durationMs: Date.now() - start,
        };
      }
      if (!validFormats.includes(format)) {
        return {
          toolName: 'memory_digest',
          success: false,
          output: '',
          error: `Invalid format: ${format}. Must be one of: ${validFormats.join(', ')}`,
          durationMs: Date.now() - start,
        };
      }
      const result = { digest: '', period, format, entry_count: 0 };
      return {
        toolName: 'memory_digest',
        success: true,
        output: JSON.stringify(result, null, 2),
        durationMs: Date.now() - start,
      };
    } catch (error) {
      return {
        toolName: 'memory_digest',
        success: false,
        output: '',
        error: `Failed to generate digest: ${
          error instanceof Error ? error.message : String(error)
        }`,
        durationMs: Date.now() - start,
      };
    }
  },
};

const memorySearchSemanticTool: Tool = {
  definition: {
    name: 'memory_search_semantic',
    description: 'Search memories by semantic meaning',
    params: [
      { name: 'query', type: 'string', description: 'Semantic search query', required: true },
      {
        name: 'max_results',
        type: 'number',
        description: 'Maximum number of results',
        required: false,
      },
    ],
    capabilities: ['memory:store'],
  },
  execute: async (args: Record<string, unknown>, _ctx: ToolContext): Promise<ToolCallResult> => {
    const start = Date.now();
    try {
      const query = args.query;
      if (!query || typeof query !== 'string') {
        return {
          toolName: 'memory_search_semantic',
          success: false,
          output: '',
          error: 'Query must be a non-empty string',
          durationMs: Date.now() - start,
        };
      }
      const maxResults = (args.max_results as number) || 10;
      const result = { results: [], query, max_results: maxResults };
      return {
        toolName: 'memory_search_semantic',
        success: true,
        output: JSON.stringify(result, null, 2),
        durationMs: Date.now() - start,
      };
    } catch (error) {
      return {
        toolName: 'memory_search_semantic',
        success: false,
        output: '',
        error: `Failed to search: ${error instanceof Error ? error.message : String(error)}`,
        durationMs: Date.now() - start,
      };
    }
  },
};

export const tools: Tool[] = [
  memoryConsolidateTool,
  memoryPruneTool,
  memoryClusterTool,
  memoryDigestTool,
  memorySearchSemanticTool,
];
