# Changelog

## [Unreleased]

### Changed
- Renamed manifest file from `cortex.json` to `manifest.json` for consistency with Cortex standard
- Standardized UI section structure to `ui.settings` format
- Normalized parameter naming: `defaultValue` → `default`, `options` → `enum`
- Added `homepage` field with repository URL
- Added `dependencies` field to manifest

### Fixed
- Replaced `console.log` with `ctx.logger.info()` in lifecycle hooks

## [1.0.1] — 2026-06-15

### Added
- Initial release
## [1.0.1] — 2026-06-17

### Added

- Initial project setup

## [1.0.0] — 2026-06-15

### Added

- Initial release of cortex-plugin-memory-consolidation
- `memory_consolidate` tool — Summarizes and merges episodic memories
- `memory_prune` tool — Prunes low-importance memories
- `memory_cluster` tool — Clusters related memories by topic
- `memory_digest` tool — Generates a digest of what was learned
- `memory_search_semantic` tool — Searches memories by semantic meaning
