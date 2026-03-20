# Ambient CFO

Clio Accounting–style financial dashboard with **Ambient CFO**: search, natural-language queries, strategic modeling, reports, and recovery-plan flows.

Original design reference: [Figma – Ambient CFO](https://www.figma.com/design/Op5jvZRSleVpduRQWkDwK3/Ambient-CFO).

## Setup

```bash
cd ambient-cfo
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Scripts

- `npm run dev` — development server  
- `npm run build` — production build  

## Deploy to Vercel

### 1. Git (this folder as repo root)

```bash
cd ambient-cfo
git init
git add .
git commit -m "Initial commit"
```

Create an empty repo on GitHub/GitLab, then:

```bash
git remote add origin https://github.com/<you>/<repo>.git
git branch -M main
git push -u origin main
```

If your Git repo root is a parent folder (e.g. `prototyping`), set **Root Directory** to `ambient-cfo` in Vercel (step 2).

### 2. Vercel

1. [vercel.com](https://vercel.com) → **Add New… → Project** → import the repository.
2. **Framework Preset:** Vite (auto-detected).
3. **Root Directory:** leave blank if this repo is only `ambient-cfo`; otherwise set `ambient-cfo`.
4. **Build Command:** `npm run build` · **Output Directory:** `dist`.
5. Deploy — share the `*.vercel.app` URL.

[`vercel.json`](vercel.json) rewrites all routes to `index.html` for client-side routing.

### Local build check

```bash
npm ci
npm run build
npx vite preview
```
