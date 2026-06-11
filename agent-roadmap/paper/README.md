# Agent Roadmap Survey Draft

This directory contains a LaTeX scaffold for a future arXiv-style survey.

## Title

```text
Agent Coding and Token Economy: A Survey of TUI Agents, IDE Agents, Work Agents, and Context Optimization Infrastructure
```

## Files

- `agent-roadmap-review.tex`: main LaTeX draft.
- `references.bib`: BibTeX references.

## Current status

This is a research draft and scaffold. It is not yet submission-ready for arXiv.

## Next improvements

- Add a stronger related-work section with peer-reviewed citations.
- Expand benchmark taxonomy with SWE-bench, WebArena, GAIA, RepoBench, HumanEval and cost-aware metrics.
- Add more rigorous definitions for agent runtime, skill, memory layer and context middleware.
- Add formal evaluation axes: task success, token cost, latency, reviewability, security, hallucination and user trust.
- Replace product notes with verified primary sources where possible.

## Compile

If a TeX distribution is available:

```bash
pdflatex agent-roadmap-review.tex
bibtex agent-roadmap-review
pdflatex agent-roadmap-review.tex
pdflatex agent-roadmap-review.tex
```
