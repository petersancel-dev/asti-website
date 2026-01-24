# ASTI Course Data — Implementation Status

Status report on programme detail page implementation for the ASTI website.

---

## Summary

| Metric | Value |
|--------|-------|
| **Total Programmes** | 134 |
| **Completed** | ~110 |
| **Remaining** | ~24 (Business Admin batch paused) |

---

## Implementation Status by Phase

### Phase 1: ASTI Website Programmes

| Batch | Category | Count | Status |
|-------|----------|-------|--------|
| 1-12 | Various (Fiber, Telecom, Security, etc.) | 95 | ✅ Complete |
| 13 | Business Administration | 13 | ⏸️ Paused |
| 14 | Healthcare + Legal | 2 | ⏸️ Paused |

### Phase 2: ETAI Certifications

| Batch | ETAI Category | Count | Status |
|-------|---------------|-------|--------|
| 15 | Communications | 16 | ✅ Complete |
| 16 | Fiber Optics & Data Cabling | 8 | ✅ Complete |
| 17 | Information Technology | 4 | ✅ Complete |
| 18 | Renewable Energy | 4 | ✅ Complete |
| 19 | Smart Home & Security | 3 | ✅ Complete |
| 20 | Basic Electronics | 1 | ✅ Complete |
| 21 | Biomedical | 2 | ✅ Complete |
| 22 | Photonics & Precision Optics | 4 | ✅ Complete |
| 23 | Workforce Readiness | 2 | ✅ Complete |
| 24 | Specialty Certifications | 4 | ✅ Complete |

---

## Outstanding Work

### Paused Batches

**Batch 13: Business Administration** (13 programmes)

- Status: Data collection paused
- Reason: Pending source content verification
- Action: Resume when business administration programme details are confirmed

**Batch 14: Healthcare + Legal** (2 programmes)

- Status: Paused awaiting source data

---

## Source Documents (Reference)

| Document | Description |
|----------|-------------|
| TVET Programmes | Primary source for technical programmes |
| EduQual Programmes | Additional certification programmes |
| ETAI Website | External certifications (etai.org) |

---

## Data Structure

All programme entries follow the `ProgrammeDetail` interface in `src/constants/programme-details.ts`:

```typescript
{
    id: string;              // Must match programmes.ts
    title: string;
    subtitle: string;
    level: 'introductory' | 'certificate' | 'diploma';
    levelLabel: string;
    category: string;
    categoryLabel: string;
    tagline: string;
    description: string;
    highlights: string[];    // 6 items
    duration: string;
    startDates: string[];
    delivery: string[];
    modules: ProgrammeModule[];
    entryRequirements: string[];
    documentsRequired: string[];
    careerOutcomes: CareerOutcome[];
    certifications: string[];
    tuitionFee: number;
    currency: 'TTD';
    registrationFee: number;
    accreditedBy: string[];
    relatedProgrammes: string[];
    metaDescription: string;
    keywords: string[];
}
```

---

## Pricing Reference (TTD)

| Level | Registration | Tuition | Total |
|-------|-------------|---------|-------|
| Introductory | $300 | $2,700 | $3,000 |
| Certificate | $300 | $6,255 | $6,805 |
| Advanced Certificate | $600 | $6,480 | $7,380 |
| Diploma | $1,000 | $8,550 | $10,050 |
| Advanced Diploma | $1,200 | $10,260 | $12,060 |

---

## Files to Modify (For Continuation)

| File | Action |
|------|--------|
| `src/constants/programmes.ts` | Add new programme IDs |
| `src/constants/programme-details.ts` | Add detailed entries |

---

## Notes for Continuation

If resuming work on paused batches:

1. Verify source content is available
2. Add programme IDs to `programmes.ts` if not present
3. Add `ProgrammeDetail` entries to `programme-details.ts`
4. Run `npm run build` to verify — must pass with zero errors
5. Test programme page renders correctly at `/programmes/[id]`

---

*Status as of January 2026*
