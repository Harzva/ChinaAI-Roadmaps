# Changelog

## v2.2 - 2026-06-11

### Added

- Added `data/more-agents.js` with additional Agent / Token Economy projects: Gemini CLI, Jules, GitHub Copilot Coding Agent, Kiro, Continue.dev, Kilo Code, smolagents, MetaGPT, AgentScope, Pydantic AI, Mem0, Letta, LiteLLM, Context7, ccusage, and Claude Code Usage Monitor.
- Added `data/sources.js` so each project has a citation source field or explicit `needs verification` fallback.
- Added in-page JSON / CSV export buttons for the current filtered dataset.
- Added `assets/agent-roadmap-preview.svg` as a GitHub Pages preview image for the README.
- Added `assets/miwork-architecture.svg` and embedded it in the MiWork section.
- Added benchmark taxonomy table to the survey paper.
- Expanded BibTeX references with benchmarks, frameworks, memory layers, middleware, and work agents.

### Improved

- Strengthened the paper Related Work section.
- Added a MiWork architecture figure to the paper.
- Added citation-source rendering in the detail panel.
- Updated README with preview image, architecture diagram, export documentation, and expanded file structure.

## v2.1 - 2026-06-11

### Added

- Added `agent-roadmap/` as an independent GitHub Pages static subpage.
- Added expanded data model in `data/agents.js`.
- Added interactive search and multi-dimensional filters.
- Added Card View and Matrix View.
- Added click-to-open detail panel.
- Added Agent Acceleration & Token Economy radar.
- Added MiWork Opportunity section.
- Added arXiv-style paper scaffold under `paper/`.
- Added root `index.html` entry planned as `Agent Map`.

### Improved

- Reworked UI with WorldRoadmap / Claude / Cursor / Linear inspired dark glass visual system.
- Improved mobile layout with bottom navigation.
- Separated complete agents from frameworks, middleware, memory layers, skills, and token tools.

### Notes

- Several rapidly moving tools are marked with `needs verification` in tags or risk notes.
- Paper scaffold is a research draft, not a ready-to-submit arXiv paper.
