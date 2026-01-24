# ASTI Website — Hosting & Deployment Reference

Technical documentation for the ASTI website infrastructure, deployment pipeline, and operational procedures.

---

## Project Overview

| Attribute | Value |
|-----------|-------|
| **Repository** | `github.com/petersancel-dev/asti-website` |
| **Framework** | Next.js 16.1.1 (App Router) |
| **Runtime** | React 19.2.3, Node.js 20+ |
| **Styling** | Tailwind CSS v4 |
| **Hosting** | Vercel (Hobby Plan) |
| **Branch Strategy** | `main` → Production |

---

## Tech Stack

```
Next.js 16.1.1          # Framework
React 19.2.3            # UI Library
TypeScript 5.9.3        # Language
Tailwind CSS v4         # Styling
Framer Motion 12.25     # Animations
Redux Toolkit 2.11      # State Management
Lucide React            # Icons
```

---

## Deployment Architecture

```
Local Development
       │
       ▼
   git push main
       │
       ▼
┌─────────────────┐
│     GitHub      │  ← Source of Truth
│  petersancel-dev│
│  /asti-website  │
└────────┬────────┘
         │
         │ Webhook Trigger
         ▼
┌─────────────────┐
│     Vercel      │  ← Build & Deploy
│   Auto-Deploy   │
│   on push       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Production    │
│ asti-website    │
│ .vercel.app     │
└─────────────────┘
```

---

## Deployment Commands

### Push to Production

```bash
# Stage all changes
git add -A

# Commit with conventional message
git commit -m "feat: Description of changes"

# Push to main (triggers auto-deploy)
git push origin main
```

### Push with Personal Access Token

```bash
git push https://<GITHUB_PAT>@github.com/petersancel-dev/asti-website.git main
```

> Generate PAT at: GitHub → Settings → Developer settings → Personal access tokens

---

## Build Configuration

### Local Development

```bash
npm run dev     # Start dev server (localhost:3000)
npm run build   # Production build
npm run start   # Serve production build locally
npm run lint    # ESLint check
```

### Vercel Build Settings

| Setting | Value |
|---------|-------|
| Framework Preset | Next.js |
| Build Command | `next build` |
| Output Directory | `.next` |
| Install Command | `npm install` |
| Node.js Version | 20.x |

---

## Environment Variables

Currently, this project uses **no environment variables**. All configuration is static.

If environment variables are added in the future:

1. Add to `.env.local` for local development
2. Add to Vercel Dashboard → Project → Settings → Environment Variables
3. Prefix client-side variables with `NEXT_PUBLIC_`

---

## Domain Configuration

| Type | Domain |
|------|--------|
| **Vercel Default** | `asti-website.vercel.app` |
| **Custom (Optional)** | Configure in Vercel → Settings → Domains |

### Custom Domain Setup

1. Add domain in Vercel Dashboard
2. Update DNS records at registrar:
   - `A` record → `76.76.21.21`
   - `CNAME` for `www` → `cname.vercel-dns.com`
3. SSL/TLS provisioned automatically

---

## CI/CD Pipeline

**Automated via Vercel:**

1. Push to `main` triggers webhook
2. Vercel pulls latest code
3. Runs `npm install`
4. Runs `next build`
5. Deploys to edge network
6. Available globally in ~60 seconds

### Build Failure Troubleshooting

```bash
# Verify build passes locally before pushing
npm run build

# Check for TypeScript errors
npx tsc --noEmit

# Check for lint errors
npm run lint
```

---

## Rollback Procedure

1. Go to Vercel Dashboard → Deployments
2. Find previous successful deployment
3. Click "..." menu → "Promote to Production"
4. Deployment instant (no rebuild required)

---

## Monitoring & Logs

| Resource | Location |
|----------|----------|
| Build Logs | Vercel Dashboard → Deployments → Select build |
| Runtime Logs | Vercel Dashboard → Logs |
| Analytics | Vercel Dashboard → Analytics (if enabled) |

---

## Cost Structure

| Service | Plan | Cost |
|---------|------|------|
| GitHub | Free | $0 |
| Vercel | Hobby | $0 |
| Custom Domain | Optional | ~$10-15/year |

**Current Total: $0/month**

---

## Security Considerations

- **PAT Tokens**: Rotate regularly, never commit to repo
- **Branch Protection**: Consider enabling for `main`
- **HTTPS**: Enforced by Vercel automatically
- **Headers**: CSP and security headers configurable in `next.config.js`

---

## Key Files

| File | Purpose |
|------|---------|
| `package.json` | Dependencies and scripts |
| `next.config.ts` | Next.js configuration |
| `tailwind.config.ts` | Tailwind CSS configuration |
| `tsconfig.json` | TypeScript configuration |
| `src/app/` | App Router pages and layouts |
| `src/constants/` | Programme data and configuration |

---

## Contact & Ownership

| Role | Contact |
|------|---------|
| Repository Owner | petersancel-dev |
| Hosting Account | Vercel (linked to GitHub) |
