# Git Analyzer

Production-ready monorepo for **RepoMind AI** — an AI-powered SaaS platform with a Next.js frontend and FastAPI backend.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 15, TypeScript, Tailwind CSS, shadcn/ui |
| Backend | FastAPI, Pydantic Settings, Uvicorn |
| Shared | TypeScript types and contracts |
| Infrastructure | Docker, Docker Compose, GitHub Actions |

## Project Structure

```
repomind-ai/
├── frontend/          # Next.js 15 web application
├── backend/           # FastAPI REST API
├── shared/            # Shared TypeScript types
├── docs/              # Documentation
├── infrastructure/    # Docker, K8s, Terraform
├── .github/           # CI/CD workflows
└── package.json       # Root npm workspace
```

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment files
cp .env.example .env
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env

# Run frontend (http://localhost:3000)
npm run dev:frontend

# Run backend (http://localhost:8000)
npm run dev:backend
```

See [docs/development/getting-started.md](./docs/development/getting-started.md) for full setup instructions.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev:frontend` | Start Next.js dev server |
| `npm run dev:backend` | Start FastAPI with hot reload |
| `npm run build` | Build frontend for production |
| `npm run lint` | Lint all JS/TS workspaces |
| `npm run format` | Format code with Prettier |
| `npm run test:backend` | Run backend pytest suite |

## License

Private — All rights reserved.
