#!/usr/bin/env python3
from __future__ import annotations

import json
import re
import subprocess
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE_REF = "origin/codex/biblia-emanus-new-testament"
BOOKS = (
    "MAT", "MRK", "LUK", "JHN", "ACT", "ROM", "1CO", "2CO", "GAL",
    "EPH", "PHP", "COL", "1TH", "2TH", "1TI", "2TI", "TIT", "PHM",
    "HEB", "JAS", "1PE", "2PE", "1JN", "2JN", "3JN", "JUD", "REV",
)
PATTERN = re.compile(r"^docs/data/biblia-emanus/(" + "|".join(map(re.escape, BOOKS)) + r")\.([1-9][0-9]*)\.json$")


def main() -> int:
    listing = subprocess.check_output(
        ["git", "ls-tree", "-r", "--name-only", SOURCE_REF, "docs/data/biblia-emanus"],
        cwd=ROOT,
        text=True,
    ).splitlines()
    rows: dict[str, dict[str, list[int]]] = defaultdict(lambda: {"translated": [], "placeholder": [], "mixed": []})
    for path in listing:
        match = PATTERN.match(path)
        if not match:
            continue
        raw = subprocess.check_output(["git", "show", f"{SOURCE_REF}:{path}"], cwd=ROOT)
        data = json.loads(raw)
        texts = [verse.get("text", "") for verse in data.get("verses", []) if isinstance(verse, dict)]
        placeholder_count = sum(text == "DE TRADUS" for text in texts)
        if texts and placeholder_count == len(texts):
            state = "placeholder"
        elif placeholder_count:
            state = "mixed"
        else:
            state = "translated"
        rows[match.group(1)][state].append(int(match.group(2)))

    total_translated = sum(len(rows[book]["translated"]) for book in BOOKS)
    total_placeholder = sum(len(rows[book]["placeholder"]) for book in BOOKS)
    total_mixed = sum(len(rows[book]["mixed"]) for book in BOOKS)
    lines = [
        "# Inventar real — Noul Testament importat",
        "",
        "Sursa: `codex/biblia-emanus-new-testament`.",
        "",
        f"- capitole cu text românesc: **{total_translated}**;",
        f"- capitole integral `DE TRADUS`: **{total_placeholder}**;",
        f"- capitole mixte: **{total_mixed}**;",
        f"- total: **{total_translated + total_placeholder + total_mixed}**.",
        "",
        "| Carte | Traduse | Placeholder | Mixte |",
        "|---|---:|---:|---:|",
    ]
    for book in BOOKS:
        lines.append(
            f"| {book} | {len(rows[book]['translated'])} | "
            f"{len(rows[book]['placeholder'])} | {len(rows[book]['mixed'])} |"
        )
    lines.extend(["", "## Capitole nefinalizate", ""])
    for book in BOOKS:
        pending = rows[book]["placeholder"] + rows[book]["mixed"]
        if pending:
            lines.append(f"- **{book}:** " + ", ".join(map(str, sorted(pending))))
    target = ROOT / "docs/biblia-emanus/NT-IMPORT-REPORT.md"
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"[nt-report] translated={total_translated} placeholders={total_placeholder} mixed={total_mixed}")
    if total_mixed or total_translated + total_placeholder != 260:
        raise SystemExit(1)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
