# ASTI Website

Corporate website for the **Advanced Science and Technology Institute (ASTI)** — a technical education institution in Trinidad & Tobago offering TVET and professional certification programmes.

---

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.1.1 | Framework (App Router) |
| React | 19.2.3 | UI Library |
| TypeScript | 5.9.3 | Language |
| Tailwind CSS | v4 | Styling |
| Framer Motion | 12.25 | Animations |
| Redux Toolkit | 2.11 | State Management |

---

## Project Structure

```
asti-website/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # Reusable UI components
│   ├── constants/        # Programme data & configuration
│   ├── hooks/            # Custom React hooks
│   └── lib/              # Utility functions
├── public/               # Static assets (images, icons)
└── [Documentation]       # See below
```

---

## Documentation

| Document | Purpose |
|----------|---------|
| [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md) | Comprehensive project status & handover notes |
| [HOSTING_GUIDE.md](./HOSTING_GUIDE.md) | Deployment & infrastructure reference |
| [IMAGE_PROMPTS.md](./IMAGE_PROMPTS.md) | Outstanding asset requirements |
| [NAVIGATION_AUDIT.md](./NAVIGATION_AUDIT.md) | Site navigation structure & status |
| [COURSE_DATA_IMPLEMENTATION_PLAN.md](./COURSE_DATA_IMPLEMENTATION_PLAN.md) | Programme data implementation status |

---

## Hosting

- **Platform:** Vercel (Hobby Plan)
- **Auto-deploy:** Pushes to `main` branch trigger automatic deployment
- **Live URL:** `asti-website.vercel.app`

See [HOSTING_GUIDE.md](./HOSTING_GUIDE.md) for full deployment documentation.

---

## Repository

**GitHub:** `github.com/petersancel-dev/asti-website`

---

*Last Updated: January 2026*
