# Programme Data Migrations

This folder contains scripts for migrating and correcting programme data in the ASTI website.

---

## Scripts

### `migrate-programme-durations.js`

**Purpose:** Automatically update programme durations to match the ground truth document based on programme level.

**What it does:**
1. Reads `src/constants/programme-details.ts`
2. For each programme entry, looks up the correct duration based on its `level`
3. Updates the `duration` field to match the standard
4. Generates a migration report showing all changes
5. Outputs the corrected file

**Standard Durations (from Ground Truth):**

| Level | Standard Duration |
|-------|-------------------|
| Introductory | 6 weeks |
| Certificate | 15 weeks |
| Advanced Certificate | 3 months |
| Diploma | 9 months |
| Advanced Diploma | 1 year |
| Associates Degree | 2 years |
| Bachelor Degree | 3 years |
| Post Graduate Award | 1 year |
| Post Graduate Diploma | 1 year |
| Masters | 2 years |

**EduQual Programme Levels:**

| Level | Description |
|-------|-------------|
| EduQual Award (Level 2) | Entry-level certifications |
| EduQual Certificate (Level 3) | Intermediate certifications |
| EduQual Diploma (Level 4) | Advanced certifications |
| EduQual SCQF Diploma (Level 8) | University top-up eligible |

---

## Usage

```bash
# Navigate to project root
cd asti-website

# Run the migration
node scripts/migrations/migrate-programme-durations.js

# Review the output
# - migration-report.json: Detailed log of all changes
# - programme-details.migrated.ts: The corrected file (backup before overwriting)
```

---

## Ground Truth Documents

The following documents are the source of truth for programme information:

| Document | Location | Purpose |
|----------|----------|---------|
| Programme Price List | `Contex/Programme Price List.md` | Pricing & durations by level |
| EduQual Programmes | `Contex/List of Eduqual Programmes.txt` | EduQual-endorsed courses |
| TVET Document | (OneDrive) | TVET-aligned courses |

---

## Important Notes

1. **Always backup before running:** The script creates a `.migrated.ts` file. Manually review before overwriting the original.

2. **Pricing is hidden in UI:** As of January 2026, pricing is no longer displayed on programme pages. The data remains in the constants file for internal reference.

3. **Accreditation:** The "Accredited By" section is now a standalone section (not under Pricing).

---

## History

| Date | Action | Developer |
|------|--------|-----------|
| 2026-01-24 | Created migration script | AI-assisted (Antigravity) |

---

*Last Updated: 2026-01-24*
