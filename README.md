# Ambient CFO

**Git repository root:** this folder (`ambient-cfo`). Do not initialize Git in the parent `prototyping` directory if you want a clean Vercel import—connect Vercel to a repo whose root is this project.

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

### 1. Git (repo root = `ambient-cfo`)

The remote repository should contain the contents of **`ambient-cfo`** at its root (not `prototyping/ambient-cfo` as a nested path unless you set Vercel **Root Directory** accordingly).

If you haven’t committed yet, set your identity once (or use `git config` in this repo only):

```bash
git config user.name "Your Name"
git config user.email "you@example.com"
```

```bash
cd ambient-cfo
git init   # skip if `.git` already exists
git add .
git commit -m "Initial commit"
```

Create an empty repo on GitHub/GitLab, then:

```bash
git remote add origin https://github.com/<you>/<repo>.git
git branch -M main
git push -u origin main
```

### 2. Vercel

1. [vercel.com](https://vercel.com) → **Add New… → Project** → import the repository.
2. **Framework Preset:** Vite (auto-detected).
3. **Root Directory:** leave **blank** when the connected repo’s root is this `ambient-cfo` project. Only set `ambient-cfo` if you imported a monorepo whose root is a parent folder.
4. **Build Command:** `npm run build` · **Output Directory:** `dist`.
5. Deploy — share the `*.vercel.app` URL.

[`vercel.json`](vercel.json) rewrites all routes to `index.html` for client-side routing.

**If the build log shows an old commit** (e.g. not the latest on `main`): in Vercel, **Redeploy** on an old deployment re-runs **that same commit**. Open **Deployments**, select the deployment that matches the newest GitHub commit, or push any new commit to `main` so a fresh deployment is created.

### Local build check

```bash
npm ci
npm run build
npx vite preview
```
