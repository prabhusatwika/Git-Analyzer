# Architecture

RepoMind AI is organized as a monorepo with a Next.js frontend, FastAPI backend, and shared TypeScript contracts.

## High-Level Overview

```
┌─────────────┐     HTTP/REST      ┌─────────────┐
│   Frontend  │ ◄───────────────► │   Backend   │
│  (Next.js)  │                    │  (FastAPI)  │
└─────────────┘                    └──────┬──────┘
                                          │
                                   ┌──────▼──────┐
                                   │  PostgreSQL │
                                   │    Redis    │
                                   └─────────────┘
```

## Design Principles

- **Separation of concerns** — UI, API, and infrastructure live in distinct packages
- **Shared contracts** — Common types live in `shared/` to prevent drift
- **Environment parity** — Docker Compose mirrors production topology locally

## Future Sections

- Authentication and authorization flow
- AI/LLM pipeline architecture
- Data model and persistence layer
