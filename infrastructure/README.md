# Infrastructure

Deployment and infrastructure configuration for RepoMind AI.

## Contents

| Directory | Purpose |
|-----------|---------|
| [docker/](./docker/) | Dockerfiles and Docker Compose for local and containerized deployments |
| [kubernetes/](./kubernetes/) | Kubernetes manifests (future) |
| [terraform/](./terraform/) | Infrastructure-as-Code for cloud provisioning (future) |

## Quick Start

From the repository root:

```bash
docker compose -f infrastructure/docker/docker-compose.yml up --build
```

This starts:

- Frontend at http://localhost:3000
- Backend at http://localhost:8000
- PostgreSQL at localhost:5432
- Redis at localhost:6379

## Environment

Ensure `backend/.env` exists (copy from `backend/.env.example`) before running Docker Compose.
