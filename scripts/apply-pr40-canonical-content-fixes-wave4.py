#!/usr/bin/env python3
"""Repair the sole remaining canonical quote defects in Jeremiah 3.

The changes are punctuation-only, keep every verse independently balanced,
and assert the inherited candidate text exactly before rewriting. The digest
follows the candidate corpus policy: sha256 of newline-joined verse texts.
"""
from __future__ import annotations

import hashlib
import json
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs" / "data" / "biblia-emanus-candidates"
PATH = DATA / "JER.3.json"

REPLACEMENTS = {
    5: (
        "„„Își va ține El mânia pe vecie? O va păstra El întotdeauna?” Iată, așa ai vorbit, și totuși ai făcut lucruri nelegiuite cât ai putut!”",
        "„Își va ține El mânia pe vecie? O va păstra El întotdeauna?” Iată, așa ai vorbit, și totuși ai făcut lucruri nelegiuite cât ai putut!",
    ),
    22: (
        "Întoarceți-vă, copii răzvrătiți, și vă voi ierta abaterile.” – „Iată-ne, venim la Tine, căci Tu ești DOMNUL Dumnezeul nostru.",
        "„Întoarceți-vă, copii răzvrătiți, și vă voi ierta abaterile.” – Iată-ne, venim la Tine, căci Tu ești DOMNUL Dumnezeul nostru.",
    ),
    25: (
        "„„Să ne culcăm în rușinea noastră și să ne învelim cu ocara noastră, căci am păcătuit împotriva DOMNULUI Dumnezeului nostru, noi și părinții noștri, din tinerețea noastră și până în ziua de azi, și n-am ascultat glasul DOMNULUI Dumnezeului nostru.””",
        "„Să ne culcăm în rușinea noastră și să ne învelim cu ocara noastră, căci am păcătuit împotriva DOMNULUI Dumnezeului nostru, noi și părinții noștri, din tinerețea noastră și până în ziua de azi, și n-am ascultat glasul DOMNULUI Dumnezeului nostru.”",
    ),
}


def digest(verses: list[dict]) -> str:
    return hashlib.sha256(
        "\n".join(str(verse.get("text", "")) for verse in verses).encode("utf-8")
    ).hexdigest()


def main() -> None:
    document = json.loads(PATH.read_text(encoding="utf-8"))
    verses = {int(verse["number"]): verse for verse in document["verses"]}
    changed = 0
    for number, (expected, replacement) in REPLACEMENTS.items():
        actual = str(verses[number]["text"])
        if actual == replacement:
            continue
        if actual != expected:
            raise RuntimeError(
                f"JER.3:{number}: candidate base changed; expected {expected!r}, found {actual!r}"
            )
        verses[number]["text"] = replacement
        changed += 1

    if changed not in {0, len(REPLACEMENTS)}:
        raise SystemExit(f"Partial Jeremiah quote repair: {changed}/{len(REPLACEMENTS)}")

    document.setdefault("audit", {})["textDigest"] = digest(document["verses"])
    rendered = json.dumps(document, ensure_ascii=False, indent=2) + "\n"
    PATH.write_text(unicodedata.normalize("NFC", rendered), encoding="utf-8")
    print(json.dumps({"repairedJeremiahQuoteVerses": changed}, ensure_ascii=False))


if __name__ == "__main__":
    main()
