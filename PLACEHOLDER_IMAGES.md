# ASTI Website - Placeholder Images Documentation

> **For LLM Editors**: This document lists all placeholder images/visuals that need to be replaced with actual ASTI assets.

---

## Summary

| # | Location | Type | Current State | Recommended Replacement |
|---|----------|------|---------------|------------------------|
| 1 | Hero Background | Gradient | Navy gradient | Campus photo or video |
| 2 | Campus Map | Placeholder | Gradient + icon | Real campus photo or Google Maps embed |
| 3 | Accreditation Badges | Text-only | Gold circles with acronyms | Official logos (ACTT, EduQual, SCQF, ETA) |
| 4 | Programme Cards | None | No images | Programme-specific photos or icons |
| 5 | Learning Mode Cards | Emoji | 💻 🏫 🔄 emojis | Custom icons or photos |
| 6 | About Page Header | Logo only | Just logo.png | Campus hero image |

---

## Detailed Placeholders

### 1. Hero Section Background
**File**: `src/components/Hero.tsx` (lines 29-33)
**Current**: Navy gradient background
```tsx
style={{
  background: 'linear-gradient(135deg, #1A2744 0%, #0F1A2E 50%, #1A2744 100%)',
}}
```
**Replace with**: Full-width campus image or video
**Suggested path**: `/public/images/hero-bg.jpg` or `/public/videos/hero-bg.mp4`
**Dimensions**: 1920x1080px minimum

---

### 2. Campus Map Placeholder
**File**: `src/components/Campus.tsx` (lines 42-61)
**Current**: Navy box with location icon and gradient overlay
```tsx
<div className="relative rounded-2xl overflow-hidden shadow-xl aspect-video bg-navy">
  {/* Location icon and text overlay */}
</div>
```
**Replace with**: 
- Option A: Actual photo of 46 Boundary Road campus
- Option B: Google Maps embed iframe
**Suggested path**: `/public/images/campus-exterior.jpg`
**Dimensions**: 800x450px (16:9 aspect ratio)

---

### 3. Accreditation Badges (4 needed)
**File**: `src/components/Hero.tsx` (lines 113-125) and `src/components/Accreditations.tsx` (lines 43-56)
**Current**: Gold circles with text acronyms (ACTT, EduQual, SCQF, ETA)
```tsx
<div className="w-10 h-10 rounded-full" style={{ background: 'linear-gradient(135deg, #C4A52E, #D4B94A)' }}>
  {acc.name}
</div>
```
**Replace with**: Official logos from accrediting bodies
**Suggested paths**:
- `/public/images/accreditations/actt-logo.png`
- `/public/images/accreditations/eduqual-logo.png`
- `/public/images/accreditations/scqf-logo.png`
- `/public/images/accreditations/eta-logo.png`
**Dimensions**: 80x80px (square, transparent PNG)

---

### 4. Programme Cards (optional enhancement)
**File**: `src/components/Programmes.tsx` (lines 11-64)
**Current**: No images, text-only cards
**Add to**: Each programme card could have a header image
**Suggested paths**: `/public/images/programmes/{programme-id}.jpg`
- `/public/images/programmes/uav-operations.jpg`
- `/public/images/programmes/electrical-engineering.jpg`
- `/public/images/programmes/security-management.jpg`
- etc.
**Dimensions**: 400x200px (2:1 aspect ratio)

---

### 5. Learning Mode Icons
**File**: `src/constants/contact.ts` (lines 31-45)
**Current**: Unicode emojis (💻 🏫 🔄)
```ts
export const LEARNING_MODES = [
  { id: 'online', icon: '💻', ... },
  { id: 'face-to-face', icon: '🏫', ... },
  { id: 'hybrid', icon: '🔄', ... },
];
```
**Replace with**: Custom SVG icons or image paths
**Suggested paths**:
- `/public/icons/online-learning.svg`
- `/public/icons/in-person.svg`
- `/public/icons/hybrid.svg`
**Dimensions**: 64x64px SVG or PNG with transparency

---

### 6. About Page Header
**File**: `src/app/about/page.tsx` (lines 17-24)
**Current**: Just the ASTI logo on gradient background
**Add**: Campus photo or team photo behind/beside the logo
**Suggested path**: `/public/images/about-hero.jpg`
**Dimensions**: 1200x400px

---

## File Structure for Images

Create this folder structure in `/public`:

```
public/
├── logo.png                    ✓ EXISTS
├── images/
│   ├── hero-bg.jpg            ○ NEEDED
│   ├── campus-exterior.jpg    ○ NEEDED
│   ├── about-hero.jpg         ○ NEEDED
│   ├── accreditations/
│   │   ├── actt-logo.png      ○ NEEDED
│   │   ├── eduqual-logo.png   ○ NEEDED
│   │   ├── scqf-logo.png      ○ NEEDED
│   │   └── eta-logo.png       ○ NEEDED
│   └── programmes/
│       ├── uav-operations.jpg     ○ OPTIONAL
│       ├── electrical-engineering.jpg ○ OPTIONAL
│       └── ...
└── icons/
    ├── online-learning.svg    ○ OPTIONAL
    ├── in-person.svg          ○ OPTIONAL
    └── hybrid.svg             ○ OPTIONAL
```

---

## Code Changes Required

After adding images, update these files:

### Hero.tsx - Add background image
```tsx
// Line 29-33: Replace gradient with image
<section
  className="relative min-h-screen flex items-center justify-center overflow-hidden"
  style={{
    backgroundImage: 'url(/images/hero-bg.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
  {/* Add dark overlay for text readability */}
  <div className="absolute inset-0 bg-navy/80" />
```

### Campus.tsx - Replace placeholder with real image
```tsx
// Line 43: Replace the div with an Image component
import Image from 'next/image';

<div className="relative rounded-2xl overflow-hidden shadow-xl aspect-video">
  <Image
    src="/images/campus-exterior.jpg"
    alt="ASTI Campus at 46 Boundary Road, San Juan"
    fill
    className="object-cover"
  />
  {/* Keep the gradient overlay for branding */}
</div>
```

### contact.ts - Replace emojis with icons
```ts
export const LEARNING_MODES = [
  { id: 'online', icon: '/icons/online-learning.svg', ... },
  { id: 'face-to-face', icon: '/icons/in-person.svg', ... },
  { id: 'hybrid', icon: '/icons/hybrid.svg', ... },
];
```

---

## Priority Order

1. **HIGH**: Hero background image (most visible)
2. **HIGH**: Campus exterior photo (builds credibility)  
3. **MEDIUM**: Accreditation logos (official branding)
4. **LOW**: Learning mode icons (emojis work fine)
5. **LOW**: Programme images (optional enhancement)
