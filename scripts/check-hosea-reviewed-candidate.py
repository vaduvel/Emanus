#!/usr/bin/env python3
"""Validează pachetul fresh semantic review Osea 1–14.

Acest gate certifică review-urile și materializarea corecțiilor `proposedRo`.
Starea de publicare Biblia Emanus este verificată separat de
`check-biblia-emanus-book.py --book HOS`, astfel încât auditul semantic nu este
cuplat de ordinea pașilor de materializare a reader-ului.
"""

from __future__ import annotations

import json
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REAUDIT = ROOT / "docs/biblia-explicata/minor-prophets-reaudit/HOS"
REVIEWS = REAUDIT / "reviews"
SUMMARY = ROOT / "docs/biblia-explicata/minor-prophets-reaudit/HOS-SEMANTIC-REVIEW-SUMMARY.json"
RUNTIME = ROOT / "packages/shared/src/bible/generated/vtCanonicalText/oseaReviewedText.ts"

START = "// OSEA_REVIEWED_CORRECTIONS_JSON_START"
END = "// OSEA_REVIEWED_CORRECTIONS_JSON_END"
EXPECTED_CHAPTERS = 14
EXPECTED_VERSES = 197
EXPECTED_CORRECTIONS = 116
EXPECTED_APPROVED = 81
EXPECTED_SEVERITY = {"critical": 15, "material": 60, "minor": 41}


def fail(message: str) -> None:
    raise SystemExit(f"Osea reviewed candidate invalid: {message}")


def load_json(path: Path) -> dict:
    if not path.exists():
        fail(f"lipsește {path.relative_to(ROOT)}")
    return json.loads(path.read_text(encoding="utf-8"))


def runtime_corrections() -> dict[str, dict[str, str]]:
    text = RUNTIME.read_text(encoding="utf-8")
    if START not in text or END not in text:
        fail("lipsesc markerii JSON din oseaReviewedText.ts")
    block = text.split(START, 1)[1].split(END, 1)[0].strip()
    try:
        parsed = json.loads(block)
    except json.JSONDecodeError as exc:
        fail(f"blocul de corecții nu este JSON valid: {exc}")
    if not isinstance(parsed, dict):
        fail("blocul de corecții nu este obiect")
    return parsed


def describe_runtime_mismatch(
    runtime: dict[str, dict[str, str]], expected: dict[str, dict[str, str]]
) -> str:
    problems: list[str] = []
    for chapter in sorted(set(runtime) | set(expected), key=int):
        actual_chapter = runtime.get(chapter, {})
        expected_chapter = expected.get(chapter, {})
        for verse in sorted(set(actual_chapter) | set(expected_chapter), key=int):
            actual = actual_chapter.get(verse)
            wanted = expected_chapter.get(verse)
            if actual == wanted:
                continue
            ref = f"{chapter}:{verse}"
            if actual is None:
                problems.append(f"{ref} lipsește din materializare")
            elif wanted is None:
                problems.append(f"{ref} există numai în materializare")
            else:
                problems.append(f"{ref} text diferit: materializat={actual!r}; review={wanted!r}")
            if len(problems) >= 8:
                break
        if len(problems) >= 8:
            break
    return "; ".join(problems) or "structură diferită fără diferență localizată"


def main() -> None:
    expected_runtime: dict[str, dict[str, str]] = {}
    severity = Counter()
    reviewed_total = 0
    corrections_total = 0
    approved_total = 0

    for chapter in range(1, EXPECTED_CHAPTERS + 1):
        source = load_json(REAUDIT / f"{chapter:02d}.json")
        review = load_json(REVIEWS / f"{chapter:02d}.json")

        if source.get("bookId") != "HOS" or source.get("chapter") != chapter:
            fail(f"HOS/{chapter:02d}.json are identificare invalidă")
        verse_count = source.get("verseCount")
        if not isinstance(verse_count, int) or verse_count < 1:
            fail(f"HOS/{chapter:02d}.json nu are verseCount valid")

        if review.get("bookId") != "HOS" or review.get("chapter") != chapter:
            fail(f"review {chapter:02d} are identificare invalidă")
        if review.get("status") != "fresh-semantic-review-complete":
            fail(f"review {chapter:02d} nu este complet")
        if review.get("reviewedVerses") != verse_count:
            fail(
                f"review {chapter:02d}: reviewedVerses={review.get('reviewedVerses')} "
                f"dar source verseCount={verse_count}"
            )

        approved = review.get("approvedAsIs")
        changes = review.get("changes")
        if not isinstance(approved, list) or not isinstance(changes, list):
            fail(f"review {chapter:02d}: approvedAsIs/changes invalide")

        changed_verses: set[int] = set()
        chapter_runtime: dict[str, str] = {}
        for change in changes:
            verse = change.get("verse")
            sev = change.get("severity")
            issue = change.get("issue")
            proposed = change.get("proposedRo")
            if not isinstance(verse, int):
                fail(f"review {chapter:02d}: change fără verse numeric")
            if verse in changed_verses:
                fail(f"review {chapter:02d}: verset duplicat în changes: {verse}")
            if sev not in EXPECTED_SEVERITY:
                fail(f"review {chapter:02d}:{verse}: severity invalid")
            if not isinstance(issue, str) or not issue.strip():
                fail(f"review {chapter:02d}:{verse}: issue gol")
            if not isinstance(proposed, str) or not proposed.strip():
                fail(f"review {chapter:02d}:{verse}: proposedRo gol")
            changed_verses.add(verse)
            severity[sev] += 1
            chapter_runtime[str(verse)] = proposed

        approved_set = set(approved)
        if len(approved_set) != len(approved):
            fail(f"review {chapter:02d}: approvedAsIs conține duplicate")
        if approved_set & changed_verses:
            fail(f"review {chapter:02d}: un verset este și approvedAsIs și changes")

        expected_coverage = set(range(1, verse_count + 1))
        actual_coverage = approved_set | changed_verses
        if actual_coverage != expected_coverage:
            missing = sorted(expected_coverage - actual_coverage)
            extra = sorted(actual_coverage - expected_coverage)
            fail(f"review {chapter:02d}: coverage invalid; missing={missing}, extra={extra}")

        expected_runtime[str(chapter)] = chapter_runtime
        reviewed_total += verse_count
        corrections_total += len(changes)
        approved_total += len(approved)

    if reviewed_total != EXPECTED_VERSES:
        fail(f"reviewed total {reviewed_total} != {EXPECTED_VERSES}")
    if corrections_total != EXPECTED_CORRECTIONS:
        fail(f"corrections total {corrections_total} != {EXPECTED_CORRECTIONS}")
    if approved_total != EXPECTED_APPROVED:
        fail(f"approved total {approved_total} != {EXPECTED_APPROVED}")
    if dict(severity) != EXPECTED_SEVERITY:
        fail(f"severity {dict(severity)} != {EXPECTED_SEVERITY}")

    runtime = runtime_corrections()
    if runtime != expected_runtime:
        fail(
            "corecțiile materializate nu sunt identice cu proposedRo din cele 14 review-uri; "
            + describe_runtime_mismatch(runtime, expected_runtime)
        )

    summary = load_json(SUMMARY)
    totals = summary.get("totals") or {}
    if summary.get("status") != "fresh-semantic-review-complete":
        fail("summary status nu este complet")
    if totals.get("chapters") != EXPECTED_CHAPTERS or totals.get("verses") != EXPECTED_VERSES:
        fail("summary chapters/verses nu corespund")
    if totals.get("correctedVerses") != EXPECTED_CORRECTIONS or totals.get("approvedAsIs") != EXPECTED_APPROVED:
        fail("summary corrected/approved nu corespund")
    if totals.get("severity") != EXPECTED_SEVERITY:
        fail("summary severity nu corespunde")
    promotion = summary.get("promotion") or {}
    if promotion.get("candidateReady") is not True:
        fail("summary trebuie să marcheze candidateReady=true")

    print(
        "Osea fresh semantic review OK: "
        f"{EXPECTED_CHAPTERS}/{EXPECTED_CHAPTERS} capitole, "
        f"{EXPECTED_VERSES}/{EXPECTED_VERSES} versete, "
        f"{EXPECTED_CORRECTIONS} corecții, {EXPECTED_APPROVED} aprobate ca atare; "
        f"critical={EXPECTED_SEVERITY['critical']} "
        f"material={EXPECTED_SEVERITY['material']} minor={EXPECTED_SEVERITY['minor']}."
    )


if __name__ == "__main__":
    main()
