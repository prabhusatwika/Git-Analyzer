# RepoMind AI Frontend

Next.js 15 application with TypeScript, Tailwind CSS v4, and shadcn/ui.

## Structure

```
src/
├── app/              # Next.js App Router pages and layouts
├── components/
│   ├── ui/           # shadcn/ui primitives
│   └── layout/       # Layout components (header, sidebar, etc.)
├── hooks/            # Custom React hooks
├── lib/              # Utilities and env config
└── types/            # Frontend-specific types
```

## Setup

```bash
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000

## Adding shadcn/ui Components

```bash
npx shadcn@latest add <component-name>
```
