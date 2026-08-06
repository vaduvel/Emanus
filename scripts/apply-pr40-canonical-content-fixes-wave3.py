#!/usr/bin/env python3
"""Independently reword Esther 10 after the public-domain similarity gate."""
from __future__ import annotations

import hashlib
import json
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PATH = ROOT / "docs" / "data" / "biblia-emanus-candidates" / "EST.10.json"
FIXES = {
    1: (
        "Împăratul Ahașveroș a pus un bir asupra țării și asupra ostroavelor mării.",
        "Regele Ahașveroș a impus tribut pe continent și pe insulele mării.",
    ),
    2: (
        "Toate faptele privitoare la puterea lui și isprăvile lui și amănuntele despre mărimea la care a ridicat împăratul pe Mardoheu, nu sunt scrise în cartea Cronicilor împăraților Mezilor și Perșilor?",
        "Puterea și realizările lui, precum și relatarea despre rangul înalt pe care regele i l-a acordat lui Mardoheu, sunt consemnate în cartea cronicilor regilor Mediei și Persiei.",
    ),
    3: (
        "Căci Iudeul Mardoheu era cel dintâi după împăratul Ahașveroș. El era cu vază între Iudei și iubit de mulțimea fraților săi, căci a căutat binele poporului său și a vorbit pentru fericirea întregului său neam.",
        "Mardoheu iudeul era al doilea în rang după regele Ahașveroș. Era prețuit de iudei și bine primit de numeroșii săi frați, deoarece urmărea binele poporului său și vorbea pentru pacea tuturor urmașilor săi.",
    ),
}


def main() -> None:
    document = json.loads(PATH.read_text(encoding="utf-8"))
    verses = {int(item["number"]): item for item in document["verses"]}
    changed = 0
    for number, (old, new) in FIXES.items():
        current = str(verses[number]["text"])
        if current == new:
            continue
        if current != old:
            raise RuntimeError(f"EST.10:{number}: expected {old!r}, found {current!r}")
        verses[number]["text"] = new
        changed += 1
    document.setdefault("audit", {})["textDigest"] = hashlib.sha256(
        "\n".join(str(item["text"]) for item in document["verses"]).encode("utf-8")
    ).hexdigest()
    PATH.write_text(
        unicodedata.normalize("NFC", json.dumps(document, ensure_ascii=False, indent=2) + "\n"),
        encoding="utf-8",
    )
    if changed not in {0, 3}:
        raise SystemExit(f"Partial Esther 10 rewrite: {changed}/3")
    print(json.dumps({"rewrittenEsther10Verses": changed}, ensure_ascii=False))


if __name__ == "__main__":
    main()
