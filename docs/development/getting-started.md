# Getting Started

## Prerequisites

- Node.js 20+
- Python 3.11+
- npm 10+
- Docker (optional, for full stack)

## Clone and Install

```bash
git clone <repository-url>
cd repomind-ai
npm install
```

## Environment Variables

Copy example env files and adjust as needed:

```bash
cp .env.example .env
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env
```

## Run Locally

### Frontend only

```bash
npm run dev:frontend
```

Open http://localhost:3000

### Backend only

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements-dev.txt
uvicorn app.main:app --reload
```

Open http://localhost:8000/docs

### Full stack with Docker

```bash
docker compose -f infrastructure/docker/docker-compose.yml up
```

## Code Quality

```bash
npm run lint
npm run format:check
```

## Project Structure

See the root [README](../README.md) for a full folder breakdown.
