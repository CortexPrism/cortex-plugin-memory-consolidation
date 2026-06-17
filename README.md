# cortex-plugin-memory-consolidation

Summarizes and merges episodic memories into semantic clusters.

## Installation

```bash
cortex plugin install marketplace:cortex-plugin-memory-consolidation
cortex plugin install github:CortexPrism/cortex-plugin-memory-consolidation
cortex plugin install ./manifest.json
```

## Tools

### memory_consolidate

Run consolidation on recent memories.

**Parameters:**

- `since` (string, optional, default "24 hours ago") — ISO date string
- `max_memories` (number, optional, default 100) — Max memories to process
- `strategy` (string, optional, default "summarize") — consolidate, cluster, prune, digest

### memory_prune

Prune low-importance memories.

**Parameters:**

- `threshold` (number, optional, default 0.3) — Importance threshold
- `older_than_days` (number, optional, default 30) — Age cutoff in days

### memory_cluster

Cluster related memories by topic.

**Parameters:**

- `max_clusters` (number, optional, default 10) — Max clusters

### memory_digest

Generate a digest of what was learned.

**Parameters:**

- `period` (string, optional, default "weekly") — daily, weekly, monthly
- `format` (string, optional, default "summary") — summary, bullets, detailed

### memory_search_semantic

Search memories by semantic meaning.

**Parameters:**

- `query` (string, required) — Semantic search query
- `max_results` (number, optional, default 10) — Max results

## Configuration

```json
{
  "plugins": {
    "cortex-plugin-memory-consolidation": {
      "enabled": true,
      "config": {
        "autoConsolidate": false,
        "consolidationSchedule": "daily",
        "pruneThreshold": 0.3,
        "maxClusters": 10
      }
    }
  }
}
```

## Capabilities

- `tools` — Provides tool implementations
- `memory:store` — Reads and writes to memory store

## License

MIT — See LICENSE file
