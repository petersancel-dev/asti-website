# ASTI Website — Project Overview

Comprehensive handover documentation for the Advanced Science and Technology Institute (ASTI) website project.

---

## Executive Summary

This is a corporate website for **ASTI**, a technical education institution in Trinidad & Tobago offering TVET (Technical and Vocational Education and Training) and professional certification programmes.

| Attribute | Value |
|-----------|-------|
| **Production URL** | `asti-website.vercel.app` |
| **Repository** | `github.com/petersancel-dev/asti-website` |
| **Framework** | Next.js 16.1.1 (App Router) |
| **Hosting** | Vercel (Hobby Plan, $0/month) |
| **Status** | ✅ Live and Functional |

---

## Current State

### What's Built

✅ **Complete and Functional:**

- Full responsive website with 12 primary pages
- Programme catalogue with 134 programmes
- Dynamic programme detail pages
- Search and filter functionality
- Mobile-responsive navigation
- Animations and micro-interactions
- Contact and application pages
- SEO-optimized page structure

### What's Pending

| Item | Status | Notes |
|------|--------|-------|
| Image Assets | ❌ Not Started | 23 images needed (see IMAGE_PROMPTS.md) |
| Business Admin Courses | ⏸️ Paused | 15 programmes awaiting content |
| Dedicated News Page | 💡 Suggested | Currently links to campus-life#events |
| Events Calendar | 💡 Suggested | Would enhance events section |

---

## Tech Stack

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.1.1 | React framework (App Router) |
| **React** | 19.2.3 | UI library |
| **TypeScript** | 5.9.3 | Type-safe JavaScript |
| **Tailwind CSS** | v4 | Utility-first styling |
| **Framer Motion** | 12.25 | Animations |
| **Redux Toolkit** | 2.11 | State management |
| **Lucide React** | 0.562 | Icon library |

### Development Tools

| Tool | Purpose |
|------|---------|
| **Playwright** | 1.57 | Browser automation (used for data scraping) |
| **ESLint** | 9.x | Code linting |

---

## Architecture

### File Structure

```
asti-website/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Homepage
│   │   ├── about/              # About page
│   │   ├── academics/          # Academics page
│   │   ├── admissions/         # Admissions page
│   │   ├── alumni/             # Alumni page
│   │   ├── apply/              # Application form
│   │   ├── campus-life/        # Campus life page
│   │   ├── careers/            # Careers page
│   │   ├── contact/            # Contact page
│   │   ├── programmes/         # Programme catalogue
│   │   │   ├── page.tsx        # Listing page
│   │   │   └── [id]/           # Dynamic detail pages
│   │   └── research/           # Research page
│   │
│   ├── components/             # React components (17 + UI subdirectory)
│   │   ├── Header.tsx          # Navigation header
│   │   ├── Footer.tsx          # Site footer
│   │   ├── Hero.tsx            # Homepage hero section
│   │   ├── Programmes.tsx      # Programme listing
│   │   ├── ProgrammeGalaxy.tsx # Interactive programme visualization
│   │   ├── FeaturedProgrammesAuriga.tsx  # Featured programmes section
│   │   └── ui/                 # Reusable UI primitives (12 components)
│   │
│   ├── constants/              # Static data configuration
│   │   ├── programmes.ts       # Programme listing (134 entries)
│   │   └── programme-details.ts # Detailed programme data (~110 entries)
│   │
│   ├── hooks/                  # Custom React hooks (5 files)
│   └── lib/                    # Utility functions (4 files)
│
├── public/                     # Static assets
│   ├── icons/                  # Icon assets
│   ├── images/                 # Image assets
│   └── logo.png                # ASTI logo
│
└── [Documentation files]       # .md files in root
```

### Key Components

| Component | Purpose | Lines |
|-----------|---------|-------|
| `ProgrammeGalaxy.tsx` | Interactive programme visualization | 40k |
| `ProgrammeTree.tsx` | Tree-style programme navigation | 20k |
| `Header.tsx` | Main navigation with mega-menu | 16k |
| `FeaturedProgrammesAuriga.tsx` | Featured programmes carousel | 15k |
| `Hero.tsx` | Homepage hero with animations | 13k |
| `Footer.tsx` | Site-wide footer | 14k |
| `DraggableCardStack.tsx` | Interactive card component | 13k |

---

## Content Architecture

### Programme Data

All programmes are defined in two files:

1. **`src/constants/programmes.ts`** — Basic programme listing (134 entries)
   - ID, title, level, category, duration, delivery modes

2. **`src/constants/programme-details.ts`** — Full programme details (~110 entries)
   - Complete curriculum, modules, requirements, fees, etc.

### Categories

| Category | Count | Description |
|----------|-------|-------------|
| Fiber Optics | 25 | Fiber installation, testing, design |
| Telecommunications | 16 | Communication systems |
| Computer Science | 15 | IT, networking, security |
| Security | 10 | CCTV, alarm systems |
| Solar Energy | 8 | Photovoltaic systems |
| Electric/Hybrid Vehicles | 6 | EV technology |
| Business Administration | 13 | Business programmes (paused) |
| Others | Various | See full listing |

### Pricing (TTD)

| Level | Registration | Tuition | Total |
|-------|-------------|---------|-------|
| Introductory | $300 | $2,700 | $3,000 |
| Certificate | $300 | $6,255 | $6,805 |
| Advanced Certificate | $600 | $6,480 | $7,380 |
| Diploma | $1,000 | $8,550 | $10,050 |
| Advanced Diploma | $1,200 | $10,260 | $12,060 |

---

## Infrastructure

### Hosting

| Aspect | Details |
|--------|---------|
| **Provider** | Vercel |
| **Plan** | Hobby (Free) |
| **Deploy** | Auto-deploy on push to `main` |
| **SSL** | Automatic (enforced) |
| **CDN** | Global edge network |

### Deployment

```bash
# Local development
npm run dev

# Production build
npm run build

# Push to deploy
git push origin main  # Triggers auto-deploy
```

See [HOSTING_GUIDE.md](./HOSTING_GUIDE.md) for complete deployment documentation.

---

## Outstanding Work

### High Priority

1. **Image Assets** — 23 images needed for complete UI
   - 12 icons
   - 5 portrait headshots
   - 6 gallery/lifestyle photos
   - See [IMAGE_PROMPTS.md](./IMAGE_PROMPTS.md)

### Medium Priority

1. **Business Administration Courses** — 13 programmes paused
   - Awaiting source content verification
   - See [COURSE_DATA_IMPLEMENTATION_PLAN.md](./COURSE_DATA_IMPLEMENTATION_PLAN.md)

2. **Healthcare + Legal Courses** — 2 programmes paused

### Low Priority (Enhancements)

1. **Dedicated News Page** — Currently links to campus-life#events
2. **Events Calendar Page** — Would improve event discovery
3. **Form Integration** — Online application forms with email routing

---

## Known Issues

None critical. Site is fully functional.

Minor considerations:

- Some accreditation partner logos may need higher resolution versions
- Google Maps embed on About page uses default styling

---

## Recommendations

### For Immediate Handover

1. **Generate/source the 23 missing images** — This is the primary visual gap
2. **Verify domain configuration** — If moving to custom domain, update DNS per HOSTING_GUIDE.md

### For Future Development

1. **CMS Integration** — Consider headless CMS for programme content management
2. **Analytics** — Enable Vercel Analytics or add Google Analytics
3. **Form Backend** — Implement form handling (Formspree, custom API, etc.)
4. **Search Enhancement** — Add Algolia or similar for programme search

---

## Access & Credentials

| Resource | Access |
|----------|--------|
| **GitHub Repository** | `github.com/petersancel-dev/asti-website` |
| **Vercel Dashboard** | Linked to GitHub account |
| **Production URL** | `asti-website.vercel.app` |

> **Note:** Repository push access requires GitHub credentials or Personal Access Token.

---

## Documentation Index

| Document | Purpose |
|----------|---------|
| `README.md` | Quick start and project overview |
| `PROJECT_OVERVIEW.md` | This document — comprehensive handover |
| `HOSTING_GUIDE.md` | Deployment and infrastructure |
| `IMAGE_PROMPTS.md` | Outstanding image asset requirements |
| `NAVIGATION_AUDIT.md` | Site navigation structure |
| `COURSE_DATA_IMPLEMENTATION_PLAN.md` | Programme data status |

---

## Transition Notes

This project was developed with AI-assisted development tools (Claude Code / Antigravity). The codebase follows modern React/Next.js conventions and should be maintainable by any developer familiar with:

- Next.js App Router
- TypeScript
- Tailwind CSS
- React component patterns

All programme data is stored in TypeScript constants (no database required). To add new programmes, modify the files in `src/constants/`.

---

*Prepared for handover — January 2026*
