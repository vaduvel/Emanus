#!/usr/bin/env python3
"""Pazeste continutul activ si hotarul dintre produsul nou si engine-ul vechi."""

from __future__ import annotations

from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]


def fail(message: str) -> None:
    print(f"EROARE: {message}", file=sys.stderr)
    raise SystemExit(1)


def text(path: str) -> str:
    return (ROOT / path).read_text(encoding="utf-8")


def main() -> None:
    main_tsx = text("apps/web/src/main.tsx")
    overrides = text("apps/web/src/lessonOverrides.ts")
    reviewed_lesson = text("packages/shared/src/paths/neiertareBReview.ts")
    player = text("apps/web/src/LessonPlayer.tsx")
    copy = text("apps/web/src/privacy.ts")
    lesson_view = text("apps/web/src/LessonView.tsx")

    if 'import "./lessonOverrides"' not in main_tsx:
        fail("override-urile editoriale nu sunt instalate inainte de randare")
    if "neiertareL4Reviewed" not in overrides or "Răul lui nu spune cine ești tu" not in reviewed_lesson:
        fail("lectia speculativa despre agresor a redevenit activa")
    if "truthfulPrivacyCopy" not in player:
        fail("playerul nu mai aplica stratul editorial de adevar")
    for marker in (
        "0800\\s*801\\s*200",
        "Iuda a facut ceva mai mic",
        "primul raspuns al lui Dumnezeu",
        "singurul loc din psalm",
    ):
        if marker not in copy:
            fail(f"lipseste corectia editoriala pentru: {marker}")
    if "mohlerNotForMe" in lesson_view or "lesson-mohler" in lesson_view:
        fail("materialul Mohler cu drepturi nerezolvate a revenit in runtime")

    banned_import = re.compile(r'from\s+["\']@emanus/shared/legacy["\']')
    banned_symbols = (
        "XP_PER_LESSON",
        "levelForXp",
        "computeAxisScore",
        "GrowthRadar",
        "buildDashboard",
        "buildRecommendation",
        "getDiagnostic",
        "streakDays",
    )
    for path in (ROOT / "apps/web/src").rglob("*.ts*"):
        body = path.read_text(encoding="utf-8", errors="ignore")
        if banned_import.search(body):
            fail(f"aplicatia noua importa engine-ul legacy: {path.relative_to(ROOT)}")
        for symbol in banned_symbols:
            if symbol in body:
                fail(f"simbol legacy {symbol} folosit in {path.relative_to(ROOT)}")

    audit = ROOT / "docs/40-audit-biblic-si-editorial.md"
    if not audit.exists():
        fail("lipseste registrul auditului biblic")

    print("Continut activ: override-uri, siguranta, drepturi si hotar legacy verificate.")


if __name__ == "__main__":
    main()
