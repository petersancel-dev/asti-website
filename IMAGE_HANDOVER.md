# ASTI Website - Image Integration Handover

> ## ⚠️ CRITICAL AUTHORITY NOTICE
>
> **You are NOT authorized to:**
>
> - Change ANY component logic, structure, or layout
> - Remove or modify ANY existing code functionality
> - Add new dependencies or packages
> - Create new components or files (except images)
> - Modify routing, state management, or API calls
>
> **You ARE authorized to:**
>
> - Add `<Image>` components where placeholders exist
> - Update `src` attributes to point to generated images
> - Replace emoji strings with icon paths in constant files
>
> **If unsure about ANY change, DO NOT make it. Ask for clarification.**

---

## PROJECT CONTEXT

- **Framework**: Next.js 16 with App Router
- **Deployment**: Vercel (auto-deploys on push)
- **Live URL**: <https://asti-website.vercel.app>
- **Image Import**: `import Image from 'next/image'`

---

## TASK 1: FIX NAVIGATION DROPDOWN TILES

### Problem

The mega-menu dropdowns show empty gray boxes instead of images.

### Location

`src/components/Header.tsx` - Lines 74-76

### Current Code (DO NOT DELETE)

```tsx
<div className="relative h-24 w-full mb-3 overflow-hidden bg-gray-100 rounded-sm">
    <div className="absolute inset-0 bg-navy/10 group-hover/item:bg-transparent transition-colors" />
</div>
```

### Required Change

Add an Image component inside the div. The current navigation constant does NOT have images, so you must:

1. **Update `src/constants/navigation.ts`** - Add image property to NavItem interface and children:

```typescript
// Line 1-5: Update interface
export interface NavItem {
  label: string;
  href: string;
  image?: string;  // ADD THIS LINE
  children?: NavItem[];
}

// Then add image to each child. Example for About:
children: [
  { label: 'About ASTI', href: '/about', image: '/images/nav/about-asti.jpg' },
  { label: 'Our Story', href: '/about#story', image: '/images/nav/our-story.jpg' },
  { label: 'Map & Directions', href: '/about#map', image: '/images/nav/map.jpg' },
  { label: 'FAQ', href: '/about#faq', image: '/images/nav/faq.jpg' },
],
```

1. **Update Header.tsx** - Replace the empty div (lines 74-76) with:

```tsx
<div className="relative h-24 w-full mb-3 overflow-hidden bg-gray-100 rounded-sm">
    {child.image && (
        <Image 
            src={child.image} 
            alt={child.label} 
            fill 
            className="object-cover group-hover/item:scale-105 transition-transform" 
        />
    )}
    <div className="absolute inset-0 bg-navy/10 group-hover/item:bg-transparent transition-colors" />
</div>
```

1. **Add Image import** at top of Header.tsx (if not present):

```tsx
import Image from 'next/image';
```

### Images Needed for Navigation (20)

Save to: `/public/images/nav/`

| Filename | Description |
|----------|-------------|
| `about-asti.jpg` | Campus aerial view, 400x200 |
| `our-story.jpg` | Historic building or milestone, 400x200 |
| `map.jpg` | Map pin or campus map view, 400x200 |
| `faq.jpg` | Question mark or help icon, 400x200 |
| `academics-overview.jpg` | Classroom setting, 400x200 |
| `academic-calendar.jpg` | Calendar with dates, 400x200 |
| `distance-learning.jpg` | Online learning/laptop, 400x200 |
| `faculty.jpg` | Group of faculty, 400x200 |
| `programs-levels.jpg` | Graduation cap, 400x200 |
| `financial-aid.jpg` | Coins/money, 400x200 |
| `how-to-apply.jpg` | Application form, 400x200 |
| `application-forms.jpg` | Documents, 400x200 |
| `campus-overview.jpg` | Campus life scene, 400x200 |
| `events.jpg` | Event gathering, 400x200 |
| `student-resources.jpg` | Students with books, 400x200 |
| `digital-library.jpg` | Book with digital overlay, 400x200 |
| `online-lms.jpg` | Computer screen, 400x200 |
| `research-guides.jpg` | Research papers, 400x200 |

---

## TASK 2: REMOVE HEADER EMOJIS

### Location

`src/components/Header.tsx` - Lines 113-118

### Current Code

```tsx
<Link href="/programmes" className="flex items-center hover:text-gold transition-colors">
    <span className="mr-2">📚</span> Programmes
</Link>
<Link href="/campus-life" className="flex items-center hover:text-gold transition-colors">
    <span className="mr-2">🎓</span> Campus Life
</Link>
```

### Required Change

Replace emojis with icon images:

```tsx
<Link href="/programmes" className="flex items-center hover:text-gold transition-colors">
    <Image src="/icons/programmes.png" alt="" width={16} height={16} className="mr-2" /> Programmes
</Link>
<Link href="/campus-life" className="flex items-center hover:text-gold transition-colors">
    <Image src="/icons/campus-life.png" alt="" width={16} height={16} className="mr-2" /> Campus Life
</Link>
```

### Icons Needed (2)

| Filename | Description |
|----------|-------------|
| `/public/icons/programmes.png` | Book/education icon, 64x64, navy color |
| `/public/icons/campus-life.png` | Graduation cap icon, 64x64, navy color |

---

## TASK 3: REMAINING ICON INTEGRATIONS

### Check These Files for Emoji/Missing Icons

| File | Check For |
|------|-----------|
| `src/constants/campus-life.ts` | Emojis that need icon paths |
| `src/constants/research.ts` | Emojis that need icon paths |
| `src/constants/landing.ts` | Emojis that need icon paths |
| `src/constants/contact.ts` | Emojis that need icon paths |

### Pattern for Replacing Emojis in Constants

When you find emoji like `icon: '🔧'`, replace with path: `icon: '/icons/workshop.png'`

### Pattern for Rendering Icons in Components

When component renders `{item.icon}` as text, update to:

```tsx
// Check if it's a path or emoji
{item.icon.startsWith('/') ? (
    <Image src={item.icon} alt="" width={48} height={48} />
) : (
    <span className="text-4xl">{item.icon}</span>
)}
```

This pattern is ALREADY implemented in:

- `src/app/admissions/page.tsx`
- `src/app/alumni/page.tsx`
- `src/app/campus-life/page.tsx`

Use those as reference.

---

## TASK 4: REMAINING IMAGES TO GENERATE

### Icons Still Needed (12)

Save to: `/public/icons/`

| Filename | Prompt |
|----------|--------|
| `equipment.png` | Flat icon, laptop and tablet, maroon color, white background |
| `workshop.png` | Flat icon, wrench and gear, gold color, white background |
| `academic-support.png` | Flat icon, book with lightbulb, maroon/gold, white background |
| `wellness.png` | Flat icon, heart with pulse line, maroon-red gradient, white background |
| `career-guidance.png` | Flat icon, target with arrow, navy/gold, white background |
| `library.png` | Flat icon, book stack with digital overlay, navy, white background |
| `lms.png` | Flat icon, screen with play button, maroon, white background |
| `research.png` | Flat icon, microscope, navy/gold, white background |
| `tuition.png` | Flat icon, coins with graduation cap, gold/navy, white background |
| `calendar.png` | Flat icon, calendar with checkmark, navy, white background |
| `map.png` | Flat icon, location pin with building, maroon, white background |
| `portal.png` | Flat icon, door with person, navy/gold, white background |

### Portraits Needed (5)

Save to: `/public/images/placeholders/`

| Filename | Description |
|----------|-------------|
| `alumni-michael.jpg` | Caribbean man, 30s, business casual, 400x400 |
| `alumni-sarah.jpg` | Caribbean woman, 30s, professional, 400x400 |
| `alumni-david.jpg` | Caribbean man, 40s, tech industry style, 400x400 |
| `faculty-jane.jpg` | Caribbean woman, 40s, academic attire, 400x400 |
| `faculty-john.jpg` | Caribbean man, 50s, distinguished, 400x400 |

### Gallery Needed (6)

Save to: `/public/images/gallery/`

| Filename | Description |
|----------|-------------|
| `reunion.jpg` | Alumni networking event, 600x600 |
| `graduation.jpg` | Diploma ceremony moment, 600x600 |
| `workshop.jpg` | Hands-on technical workshop, 600x600 |
| `campus-life.jpg` | Students outdoors on campus, 600x600 |
| `lab.jpg` | Computer lab in use, 600x600 |
| `presentation.jpg` | Student presenting, 600x600 |

---

## VERIFICATION CHECKLIST

After making changes:

- [ ] Run `npm run build` - Must pass with no errors
- [ ] Check all navigation dropdowns show images
- [ ] Check no emojis visible in Header utility bar
- [ ] Visit each page and verify no broken image placeholders

---

## BRAND COLORS (Reference)

| Color | Hex | Use |
|-------|-----|-----|
| Deep Maroon | #8B1A2D | Primary |
| Rich Navy | #1A2744 | Secondary |
| Royal Gold | #C4A52E | Accents |
| Cream White | #F8FAFC | Light |

---

## DO NOT TOUCH

These files/sections are OFF LIMITS:

- Redux store (`src/lib/`)
- Hooks (`src/hooks/`)
- Layout (`src/app/layout.tsx`)
- Any `.ts` config files
- Component logic/animations

**Your job is PURELY visual asset integration.**
