#!/usr/bin/env python3
"""Build an exact inventory of all JSON book/chapter payloads from the PR40 branch."""
from __future__ import annotations

import json
import re
import subprocess
from collections import Counter, defaultdict
from pathlib import Path
from typing import Any

SOURCE_REF = "origin/agent/biblia-emanus-ot-and-apocrypha"
OUT = Path("docs/biblia-emanus/PR40-EXACT-BOOK-INVENTORY.json")
PLACEHOLDER_PATTERNS = [
    re.compile(pattern, re.I)
    for pattern in (
        r"Text istoric din manuscrisele vechi",
        r"Păstrat în sulurile",
        r"Martor istoric al credinței",
        r"Mărturie despre rânduiala",
        r"Scriere păstrată și studiată",
        r"text revizuit în limba română",
        r"În ziua aceea, din .* capitolul",
        r"str\s+strămoșești",
    )
]


def git(*args: str) -> str:
    return subprocess.check_output(["git", *args], text=True)


def show(path: str) -> str:
    return git("show", f"{SOURCE_REF}:{path}")


def main() -> None:
    subprocess.check_call(["git", "fetch", "--depth=1", "origin", "agent/biblia-emanus-ot-and-apocrypha"])
    paths = [
        line.strip()
        for line in git("ls-tree", "-r", "--name-only", SOURCE_REF).splitlines()
        if line.strip().endswith(".json") and "biblia-emanus" in line
    ]
    books: dict[str, dict[str, Any]] = {}
    malformed: list[dict[str, str]] = []
    ignored: list[str] = []

    for path in paths:
        try:
            doc = json.loads(show(path))
        except Exception as exc:  # noqa: BLE001
            malformed.append({"file": path, "error": str(exc)})
            continue
        if not isinstance(doc, dict) or not doc.get("bookId"):
            ignored.append(path)
            continue
        book_id = str(doc["bookId"])
        rec = books.setdefault(
            book_id,
            {
                "bookId": book_id,
                "bookNames": Counter(),
                "categories": Counter(),
                "files": [],
                "chapters": [],
                "verseCount": 0,
                "statuses": Counter(),
                "publicValues": Counter(),
                "sourceIds": Counter(),
                "sourceVersions": Counter(),
                "placeholderHits": Counter(),
                "uniqueVerseTexts": set(),
                "totalVerseTexts": 0,
            },
        )
        rec["files"].append(path)
        chapter = doc.get("chapter", doc.get("chapterNumber"))
        if isinstance(chapter, int):
            rec["chapters"].append(chapter)
        rec["bookNames"][str(doc.get("bookName", ""))] += 1
        rec["categories"][str(doc.get("category", ""))] += 1
        rec["statuses"][str(doc.get("status", ""))] += 1
        rec["publicValues"][str(doc.get("public", ""))] += 1

        source = doc.get("source", {})
        if isinstance(source, dict):
            stack: list[Any] = [source]
            while stack:
                value = stack.pop()
                if isinstance(value, dict):
                    for key, child in value.items():
                        if key.lower() in {"id", "sourceid", "lockid"} and isinstance(child, str):
                            rec["sourceIds"][child] += 1
                        if key.lower() in {"version", "name"} and isinstance(child, str):
                            rec["sourceVersions"][child] += 1
                        stack.append(child)
                elif isinstance(value, list):
                    stack.extend(value)

        verses = doc.get("verses", [])
        if isinstance(verses, list):
            for verse in verses:
                if not isinstance(verse, dict):
                    continue
                text = str(verse.get("text", "")).strip()
                rec["verseCount"] += 1
                rec["totalVerseTexts"] += 1
                rec["uniqueVerseTexts"].add(text)
                for pattern in PLACEHOLDER_PATTERNS:
                    if pattern.search(text):
                        rec["placeholderHits"][pattern.pattern] += 1

    normalized = []
    for book_id, rec in sorted(books.items()):
        total = rec.pop("totalVerseTexts")
        unique = len(rec.pop("uniqueVerseTexts"))
        chapters = sorted(set(rec["chapters"]))
        rec["chapters"] = chapters
        rec["chapterCount"] = len(chapters)
        rec["fileCount"] = len(rec["files"])
        rec["uniqueVerseTexts"] = unique
        rec["textUniquenessRatio"] = round(unique / total, 6) if total else 0.0
        for key in (
            "bookNames",
            "categories",
            "statuses",
            "publicValues",
            "sourceIds",
            "sourceVersions",
            "placeholderHits",
        ):
            rec[key] = dict(rec[key].most_common())
        normalized.append(rec)

    category_summary: dict[str, dict[str, int]] = defaultdict(lambda: {"books": 0, "chapters": 0, "verses": 0})
    for rec in normalized:
        category = next(iter(rec["categories"]), "unclassified") or "unclassified"
        category_summary[category]["books"] += 1
        category_summary[category]["chapters"] += rec["chapterCount"]
        category_summary[category]["verses"] += rec["verseCount"]

    payload = {
        "schemaVersion": 1,
        "sourceRef": SOURCE_REF,
        "bookCount": len(normalized),
        "chapterFileCount": sum(item["fileCount"] for item in normalized),
        "verseCount": sum(item["verseCount"] for item in normalized),
        "categorySummary": dict(sorted(category_summary.items())),
        "books": normalized,
        "malformed": malformed,
        "ignoredJsonFiles": ignored,
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({k: payload[k] for k in ("bookCount", "chapterFileCount", "verseCount", "categorySummary")}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
