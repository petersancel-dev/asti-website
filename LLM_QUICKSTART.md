# 🚀 LLM Quick Start Guide: ASTI Course Implementation

**READ THIS FIRST** when resuming work on the ASTI course data implementation.

---

## ⏱️ 30-Second Orientation

You're implementing **435+ course detail pages** for the ASTI technical institute website.

### Your Mission

Convert scraped Markdown files → Structured TypeScript data objects (ProgrammeDetail)

### Key Files

```
asti-website/
├── COURSE_DATA_IMPLEMENTATION_PLAN.md  ← 📋 Master plan (READ FIRST)
├── src/constants/
│   ├── programme-details.ts            ← 🎯 Add ProgrammeDetail entries HERE
│   └── programmes.ts                   ← 📝 Also update PROGRAMMES array
├── BATCH_LOGS/
│   ├── COURSE_MANIFEST.md              ← 📂 File listing by batch
│   └── batch-XX-*.md                   ← ✅ Completion logs
└── scripts/
    └── course-data-helper.ts           ← 🛠️ Helper utilities
```

### Source Data

```
CLONEZ/asticlone1/knowledge_base/academics/
├── masters_programs/      (8 files)
├── associate_degrees/     (2 files)
├── advanced_diplomas/     (38 files)
├── diplomas/              (7 files)
├── advanced_certificates/ (72 files)
├── certificates/          (220 files)
└── introductory_programs/ (88 files)
```

---

## 🎯 Your First 3 Steps

### Step 1: Check Current Progress

Open `COURSE_DATA_IMPLEMENTATION_PLAN.md` and find the **Batch Assignment Sheet**.
Look for the first batch with status `⏳ Not Started`.

### Step 2: Claim Your Batch

Update that row's status to `🔄 In Progress`.

### Step 3: Start Processing

For each course file in your batch:

1. Read the source Markdown
2. Extract: title, level, duration, department, description, course outline
3. Create a ProgrammeDetail object
4. Add to `programme-details.ts`
5. Add a basic entry to `programmes.ts`

---

## 📝 The ProgrammeDetail Structure

Every course needs this shape:

```typescript
'course-id-slug': {
    // Identity
    id: 'course-id-slug',
    title: 'Full Course Title',
    subtitle: 'Compelling marketing tagline',
    level: 'diploma', // masters|associate|advanced-diploma|diploma|advanced-certificate|certificate|introductory
    levelLabel: 'Diploma',
    category: 'electrical-electronics',
    categoryLabel: 'Electrical & Electronics',

    // Hero
    heroImage: '/images/programmes/placeholder.png',
    tagline: 'One-liner about the course',

    // Overview
    description: `Multi-paragraph description here...`,
    highlights: ['Point 1', 'Point 2', 'Point 3', 'Point 4', 'Point 5', 'Point 6'],

    // Logistics
    duration: '12 Weeks',
    credits: 60,
    totalHours: 720,
    startDates: ['January 2026', 'May 2026', 'September 2026'],
    delivery: ['online', 'face-to-face'],
    schedule: 'Flexible schedule',

    // Curriculum
    modules: [
        {
            id: 'mod-1',
            title: 'Module 1: Foundations',
            description: 'Core concepts',
            hours: 80,
            topics: ['Topic A', 'Topic B', 'Topic C']
        },
        // ... 4-6 modules total
    ],

    // Requirements
    entryRequirements: ['Requirement 1', 'Requirement 2'],
    matureEntry: 'Policy for 21+ applicants',
    documentsRequired: ['Document 1', 'Document 2'],

    // Outcomes
    careerOutcomes: [
        {
            title: 'Job Title',
            description: 'What you do',
            averageSalary: 'TTD $X,XXX - $X,XXX/month'
        }
    ],
    certifications: ['ASTI Diploma', 'Industry Cert'],

    // Pricing (defaults by level)
    tuitionFee: 8500,
    currency: 'TTD',
    registrationFee: 500,
    paymentPlans: [...],

    // Meta
    accreditedBy: ['ACTT'],
    relatedProgrammes: ['related-course-id'],
    metaDescription: 'SEO description',
    keywords: ['keyword1', 'keyword2']
}
```

---

## 💰 Default Pricing by Level — OFFICIAL

> **Source:** `contex/20260120_162832.jpg` (Updated 2026-01-20 v2)

| Level | Registration (TTD) | Tuition (TTD) |
|-------|-------------------|---------------|
| introductory | 300 | 2,700 |
| certificate | 300 | 6,255 |
| diploma | 1,000 | 8,550 |

---

## ✅ Before Ending Your Session

1. Run `npm run build` - must pass!
2. Mark batch status as:
   - `✅ Complete` if all courses done
   - `🔶 Partial (X/Y done)` if incomplete
3. Create completion log in `BATCH_LOGS/batch-XX-*.md`
4. Save all file changes

---

## 🚫 Don't Do These

- ❌ Process more than 20 courses per session
- ❌ Skip the progress tracker update
- ❌ Use placeholder text ("TBD", "Lorem ipsum")
- ❌ Create duplicate IDs
- ❌ Commit code that doesn't build
- ❌ Forget the `programmes.ts` entry

---

## 📚 Example Reference

Study the existing `electrical-engineering-diploma` entry in `programme-details.ts` - it's the gold standard!

---

*For full details, read `COURSE_DATA_IMPLEMENTATION_PLAN.md`*
