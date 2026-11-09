# TEMPORARY - NMC Master License Study Hub: Work-in-Progress Handoff
> **WORK IN PROGRESS / NOT READY TO MERGE OR PUBLISH.**
>
> Created 2026-11-08. This file and branch are TEMPORARY staging material. Delete this file, and eventually this branch, after its contents have been reviewed and integrated via focused PRs. No user content from proprietary Master Learning Series quizzes is republished here.

## Canonical project
- Live: https://jjdives.github.io/MasterLicense/
- GitHub: https://github.com/jjdives/MasterLicense
- Current production exam engine (from PR #1): `exams/index.html`
- Current production question bank: `exams/data/q100.json` (56 original beta items)
- Current production application checklist: `application/index.html`, browser `localStorage`
- Private personal context (only if needed): `jjdives/AI-Knowledge/projects/uscg-master-license/`

## What is staged here (NOT merged)
| Bank | Current main | This TEMP branch | Status |
|---|---:|---:|---|
| Q100 Rules of the Road | 56 beta questions | **85** original questions | 29 additional items are explicitly `reviewStatus: candidate`; full bank needs item-level review |
| Q347 Deck General | none | **31** original candidate items at `exams/data/q347-candidates.json` | **Do not enable** yet |
| Q348 Deck Safety | none | **29** original candidate items at `exams/data/q348-candidates.json` | **Do not enable** yet |
| Q349, Q350, Q352, Q356, Q357, Q358 | placeholders | placeholders | Not populated |
| Q300 Inland-only Rules | absent | catalog placeholder | Alternative with COLREGS limitation, not the preferred route by default |

**89 newly authored questions staged** (29 + 31 + 29), **145 total originals in the three JSON files** including existing 56. Counts are not counts of verified or publishable questions. Some pairs intentionally test contrasting concepts (e.g. trawling versus other fishing, set versus drift).

## Primary verification sources
- NMC Great Lakes and Inland examination codes (GLI06 Master <100; GLI07 OUPV): https://www.dco.uscg.mil/nmc/exams/great-lakes-and-inland-endorsements/
- NMC Deck and Engineering Examination Guide (tables around printed pp. 27-28). Lists Q100 50 questions, 90% passing; Q347/Q348/Q349 50 questions each, 70%; Q350 10 chart problems, 90%; Q352 50 upgrade questions, 70%; Q356/Q357 50, 70%; Q358 10, 90%. Q300 is an inland-only alternative to Q100, with a geographic COLREGS limitation: https://www.dco.uscg.mil/Portals/9/NMC/pdfs/examinations/deck_engineering_guide_as_of_3_24_14.pdf
- Official NMC **sample** exams (not the entire active question bank): https://www.dco.uscg.mil/nmc/examinations/
- Q100 sample: https://www.dco.uscg.mil/Portals/9/NMC/pdfs/examinations/q100_ror_inland-international.pdf
- Q347 sample: https://www.dco.uscg.mil/Portals/9/NMC/pdfs/examinations/q347_deck_general.pdf
- Q348 sample: https://www.dco.uscg.mil/Portals/9/NMC/pdfs/examinations/q348_deck_safety.pdf
- Current USCG NAVCEN amalgamated Rules: https://www.navcen.uscg.gov/navigation-rules-amalgamated
- NMC REC exam room rules (two 3.5-hour sessions per day, usually one module per session): https://www.dco.uscg.mil/Portals/9/NMC/pdfs/examinations/rules_of_exam_room.pdf

**Copyright safety:** USCG sample illustrations often carry 'Adapted for testing purposes only; further reproduction prohibited without permission.' Do NOT import these images. The Q347/Q348 staged items here are independently written, not copied from commercial MLS. Review regulatory updates before making final statements.

## Parallel workstreams defined in GitHub
- #2: NMC examination blueprint + full Q100 audit: https://github.com/jjdives/MasterLicense/issues/2
- #3: Expand banks to 150%-200% of exam size: https://github.com/jjdives/MasterLicense/issues/3
- #4: Exam persistence, missed-question backlog, timer + automated tests: https://github.com/jjdives/MasterLicense/issues/4
- #5: MMC application checklist research and verification: https://github.com/jjdives/MasterLicense/issues/5

Related separately staged engine implementation: **draft PR #7** https://github.com/jjdives/MasterLicense/pull/7 (resumable exams, cumulative missed-question history, automated test sources; tests and browser QA still pending).\n\nThese are GitHub issues, not autonomous agents executing in the background. They are suitable as separate agent assignments when an agent-capable development workspace is used.

## Required review before enabling candidates
1. Validate against NMC blueprint: exact module, subject area, question count and pass threshold; don't confuse GLI06 with the commercial course.
2. Confirm each question has exactly one defensible answer **under the stated Inland/International applicability**. Put jurisdiction and vessel type/size/route in the stem when needed.
3. Check each correct answer against the rule/CFR or other authoritative source. Revise generic source URLs to deep links or section citations where possible.
4. Check all distractors and explanations, eliminate duplicates by *concept*, and create a topic-coverage matrix. Some candidate questions are basic principles; they do not yet cover the entire NMC blueprint.
5. Do not score or release candidates until reviewed; preserve correct answer by stable `correctOptionId` rather than displayed letter.
6. Gate category activation on availability of a vetted bank. Target 75-100 original vetted items for a 50-item module.
7. Browser smoke-test immediate vs deferred feedback, shuffled options, missed-only retest, localStorage behavior, timing, accessibility and mobile behavior before merging.
8. Repair/update application checklist only after verifying original MMC/current NMC/TSA guidance and course substitutions.

## Cleanup
- Before publishing a feature, move vetted items to release JSON, remove candidate flags or convert to `reviewStatus: verified` with citation, and remove THIS TEMP file.
- Close temporary draft PR when all relevant changes are merged through smaller reviewed PRs.
- Delete `wip/TEMP-nmc-bank-expansion` Git branch after integration. **Do not delete any live user study assets.**
