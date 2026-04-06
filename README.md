# IdeaGen — AI Business Idea Generator

A full-stack SaaS application that generates AI-powered business ideas in real time using streaming. Built with Next.js 16, Clerk authentication, and OpenAI.

## Features

- **Authentication** — Sign in / sign up via Clerk (modal or dedicated pages)
- **Protected routes** — Unauthenticated users are redirected to sign-in
- **Real-time streaming** — Business ideas stream token by token using Server-Sent Events (SSE)
- **Markdown rendering** — Streamed output rendered with headings, bullet points, and formatting
- **Deployed on Vercel** — Production-ready with environment variable management

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Auth | Clerk |
| AI | OpenAI GPT-4o-mini |
| Streaming | Server-Sent Events via `@microsoft/fetch-event-source` |
| Styling | Tailwind CSS |
| Deployment | Vercel |

## Project Structure

```
app/
├── page.tsx               # Landing page (public)
├── layout.tsx             # Root layout with ClerkProvider
├── product/
│   └── page.tsx           # Idea generator (protected)
├── api/
│   └── route.ts           # SSE streaming API route
├── sign-in/[[...sign-in]]/
│   └── page.tsx           # Clerk sign-in page
└── sign-up/[[...sign-up]]/
    └── page.tsx           # Clerk sign-up page
proxy.ts                   # Auth middleware (protects all non-public routes)
```

## How It Works

1. User visits the landing page and clicks **Get Started**
2. Clerk handles authentication via a modal or dedicated sign-in page
3. Once signed in, the user is redirected to `/product`
4. The product page calls `/api` with a Clerk JWT in the `Authorization` header
5. The API route verifies the JWT, then streams a business idea from OpenAI as SSE
6. The frontend progressively renders the streamed markdown as it arrives

## Getting Started

### 1. Clone the repo

```bash
git clone <repo-url>
cd saas
npm install
```

### 2. Set up environment variables

Create a `.env.local` file in the project root:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
OPENAI_API_KEY=sk-proj-...
```

Get your Clerk keys from [dashboard.clerk.com](https://dashboard.clerk.com) and your OpenAI key from [platform.openai.com/api-keys](https://platform.openai.com/api-keys).

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment

This project is deployed on Vercel. To deploy your own:

```bash
vercel --prod
```

Make sure to add your environment variables via:

```bash
vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
vercel env add CLERK_SECRET_KEY
vercel env add OPENAI_API_KEY
```
