#!/usr/bin/env python3
"""Păzește conținutul activ și hotarul dintre produsul nou și engine-ul vechi."""

from __future__ import annotations

from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]


def text(path: str) -> str:
    return (ROOT / path).read_text(encoding="utf-8")


def main() -> None:
    errors: list[str] = []
    main_tsx = text("apps/web/src/main.tsx")
    overrides = text("apps/web/src/lessonOverrides.ts")
    reviewed_lesson = text("packages/shared/src/paths/neiertareBReview.ts")
    player = text("apps/web/src/LessonPlayer.tsx")
    copy = text("apps/web/src/privacy.ts")
    lesson_view = text("apps/web/src/LessonView.tsx")

    if 'import "./lessonOverrides"' not in main_tsx:
        errors.append("override-urile editoriale nu sunt instalate înainte de randare")
    if "neiertareL4Reviewed" not in overrides or "Răul lui nu spune cine ești tu" not in reviewed_lesson:
        errors.append("lecția speculativă despre agresor a redevenit activă")
    if "truthfulPrivacyCopy" not in player:
        errors.append("playerul nu mai aplică stratul editorial de adevăr")
    for marker in (
        "0800\\s*801\\s*200",
        "Iuda a facut ceva mai mic",
        "primul raspuns al lui Dumnezeu",
        "singurul loc din psalm",
    ):
        if marker not in copy:
            errors.append(f"lipsește corecția editorială pentru: {marker}")
    if "mohlerNotForMe" in lesson_view or "lesson-mohler" in lesson_view:
        errors.append("materialul Mohler cu drepturi nerezolvate a revenit în runtime")

    banned_import = re.compile(r'from\s+["\']@emanus/shared/legacy["\']')
    banned_symbols = (
        "XP_PER_LESSON",
        "levelForXp",
        "computeAxisScore",
        "GrowthRadar",
        "buildDashboard",
        "buildRecommendation",
        "getDiagnostic",
        "submitDiagnostic",
        "getDashboard",
        "getGrowth",
        "getRecommendation",
        "streakDays",
    )
    forbidden_api_import = re.compile(r'from\s+["\']\.\/?api["\']')
    for path in sorted((ROOT / "apps/web/src").rglob("*.ts*")):
        body = path.read_text(encoding="utf-8", errors="ignore")
        relative = path.relative_to(ROOT)
        if banned_import.search(body):
            errors.append(f"aplicația nouă importă engine-ul legacy: {relative}")
        if forbidden_api_import.search(body):
            errors.append(f"ecranul vechi importă clientul API eliminat: {relative}")
        found = sorted({symbol for symbol in banned_symbols if symbol in body})
        if found:
            errors.append(f"simboluri legacy {', '.join(found)} folosite în {relative}")

    audit = ROOT / "docs/40-audit-biblic-si-editorial.md"
    if not audit.exists():
        errors.append("lipsește registrul auditului biblic")

    if errors:
        for error in errors:
            print(f"EROARE: {error}", file=sys.stderr)
        raise SystemExit(1)

    print("Conținut activ: override-uri, siguranță, drepturi și hotar legacy verificate.")


if __name__ == "__main__":
    main()
