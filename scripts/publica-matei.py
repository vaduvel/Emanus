#!/usr/bin/env python3
"""Publică numai capitolele din Matei aprobate în registrul uman."""

from __future__ import annotations

import argparse
import re
import sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REGISTRY = ROOT / "docs" / "36-matei-revizia-umana.md"
STATUSES = ROOT / "packages" / "shared" / "src" / "bible" / "mateiPublication.ts"

APPROVAL_RE = re.compile(
    r"^- \[x\] Matei (?P<chapter>\d{1,2}) — aprobat de: (?P<name>.+?); data: (?P<date>\d{4}-\d{2}-\d{2})\s*$",
    re.MULTILINE,
)
STATUS_RE = re.compile(
    r'^(?P<prefix>\s*(?P<chapter>\d{1,2}):\s*")(?P<status>draft|in_review|published)(?P<suffix>",\s*)$',
    re.MULTILINE,
)


def read_approvals() -> dict[int, tuple[str, str]]:
    text = REGISTRY.read_text(encoding="utf-8")
    approvals: dict[int, tuple[str, str]] = {}
    errors: list[str] = []

    for match in APPROVAL_RE.finditer(text):
        chapter = int(match.group("chapter"))
        name = match.group("name").strip()
        date_text = match.group("date")
        if not 1 <= chapter <= 28:
            errors.append(f"Capitol în afara cărții Matei: {chapter}")
            continue
        if chapter in approvals:
            errors.append(f"Aprobare repetată pentru Matei {chapter}")
            continue
        if name.upper() in {"NENUMIT", "NUME", "NECOMPLETAT"}:
            errors.append(f"Lipsește numele celui care aprobă Matei {chapter}")
            continue
        try:
            date.fromisoformat(date_text)
        except ValueError:
            errors.append(f"Dată nevalidă pentru Matei {chapter}: {date_text}")
            continue
        approvals[chapter] = (name, date_text)

    if errors:
        raise ValueError("\n".join(errors))
    return approvals


def read_statuses() -> dict[int, str]:
    text = STATUSES.read_text(encoding="utf-8")
    matches = list(STATUS_RE.finditer(text))
    statuses: dict[int, str] = {}
    errors: list[str] = []

    for match in matches:
        chapter = int(match.group("chapter"))
        if chapter in statuses:
            errors.append(f"Stare repetată pentru Matei {chapter}")
        statuses[chapter] = match.group("status")

    expected = set(range(1, 29))
    actual = set(statuses)
    if actual != expected:
        errors.append(
            f"Registrul stărilor este incomplet; lipsesc={sorted(expected - actual)}, în plus={sorted(actual - expected)}"
        )
    if len(matches) != 28:
        errors.append(f"Registrul trebuie să conțină 28 de rânduri; găsite: {len(matches)}")
    if errors:
        raise ValueError("\n".join(errors))
    return statuses


def check() -> int:
    try:
        approvals = read_approvals()
        statuses = read_statuses()
    except (OSError, ValueError) as error:
        print(f"EROARE: {error}", file=sys.stderr)
        return 1

    errors: list[str] = []
    for chapter, status in statuses.items():
        approved = chapter in approvals
        if status == "published" and not approved:
            errors.append(f"Matei {chapter} este published fără aprobare în docs/36")
        if approved and status != "published":
            errors.append(f"Matei {chapter} este aprobat în docs/36, dar are status {status}")

    if errors:
        for error in errors:
            print(f"EROARE: {error}", file=sys.stderr)
        return 1

    published = sum(status == "published" for status in statuses.values())
    print(f"Poarta Matei: {published}/28 capitole publicate, {len(approvals)}/28 aprobări consemnate.")
    return 0


def parse_chapters(spec: str) -> list[int]:
    chapters: set[int] = set()
    for part in spec.split(","):
        part = part.strip()
        if not part:
            continue
        if "-" in part:
            start_text, end_text = part.split("-", 1)
            start, end = int(start_text), int(end_text)
            if start > end:
                raise ValueError(f"Interval inversat: {part}")
            chapters.update(range(start, end + 1))
        else:
            chapters.add(int(part))
    if not chapters or any(chapter < 1 or chapter > 28 for chapter in chapters):
        raise ValueError("Capitolele trebuie să fie între 1 și 28")
    return sorted(chapters)


def publish(spec: str) -> int:
    try:
        chapters = parse_chapters(spec)
        approvals = read_approvals()
        statuses = read_statuses()
    except (OSError, TypeError, ValueError) as error:
        print(f"EROARE: {error}", file=sys.stderr)
        return 1

    missing = [chapter for chapter in chapters if chapter not in approvals]
    if missing:
        print(
            f"EROARE: lipsește aprobarea din docs/36 pentru capitolele: {', '.join(map(str, missing))}",
            file=sys.stderr,
        )
        return 1

    text = STATUSES.read_text(encoding="utf-8")
    for chapter in chapters:
        if statuses[chapter] == "published":
            print(f"Matei {chapter}: deja publicat")
            continue
        line_re = re.compile(
            rf'^(?P<prefix>\s*{chapter}:\s*")(?:draft|in_review)(?P<suffix>",\s*)$',
            re.MULTILINE,
        )
        text, replacements = line_re.subn(r"\g<prefix>published\g<suffix>", text, count=1)
        if replacements != 1:
            print(f"EROARE: starea pentru Matei {chapter} nu poate fi actualizată", file=sys.stderr)
            return 1
        print(f"Matei {chapter}: {statuses[chapter]} -> published")

    STATUSES.write_text(text, encoding="utf-8")
    return check()


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true", help="Verifică aprobările și stările")
    parser.add_argument("--chapters", help='Publică o listă aprobată, de pildă "1-7,10"')
    args = parser.parse_args()

    if args.check == bool(args.chapters):
        parser.error("Alege exact una dintre --check și --chapters")
    return check() if args.check else publish(args.chapters)


if __name__ == "__main__":
    raise SystemExit(main())
