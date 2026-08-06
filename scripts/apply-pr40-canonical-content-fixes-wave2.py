#!/usr/bin/env python3
"""Repair the five remaining canonical omission outliers after wave one."""
from __future__ import annotations

import hashlib
import json
import re
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs" / "data" / "biblia-emanus-candidates"
FIXES = {
    "2SA.4:10": (
        "că pe cel ce a venit să-mi spună: „Iată, Saul a murit”",
        "că pe cel care a venit să-mi spună: „Iată, Saul a murit”, crezând că-mi aduce o veste bună, l-am prins și l-am ucis la Țiclag; aceasta a fost răsplata pe care i-am dat-o pentru vestea lui.",
    ),
    "2SA.20:9": (
        "Ioab a zis lui Amasa: „Ești sănătos, frate?”",
        "Ioab i-a zis lui Amasa: „Ești sănătos, frate?” Apoi Ioab l-a apucat pe Amasa de barbă cu mâna dreaptă, ca să-l sărute.",
    ),
    "2KI.20:7": (
        "Isaia a zis: „Luați o turtă de smochine.”",
        "Isaia a zis: „Luați o turtă de smochine.” Au luat-o, au pus-o pe umflătură, iar Ezechia s-a vindecat.",
    ),
    "2CH.18:31": (
        "Când au zărit mai marii carelor pe Iosafat, au zis: „Este împăratul lui Israel.”",
        "Când căpeteniile carelor l-au văzut pe Iosafat, au zis: „Este împăratul lui Israel!” L-au înconjurat ca să lupte împotriva lui, dar Iosafat a strigat, DOMNUL l-a ajutat, iar Dumnezeu i-a făcut să se îndepărteze de el.",
    ),
    "PSA.53:1": (
        "Nebunul zice în inima lui: „Nu este Dumnezeu!”",
        "Nebunul zice în inima lui: „Nu este Dumnezeu!” Oamenii s-au stricat și au săvârșit nelegiuiri îngrozitoare; nu este niciunul care să facă binele.",
    ),
}


def digest(verses: list[dict]) -> str:
    return hashlib.sha256(
        "\n".join(str(verse.get("text", "")) for verse in verses).encode("utf-8")
    ).hexdigest()


def main() -> None:
    changed = 0
    grouped: dict[tuple[str, int], list[tuple[int, str, str]]] = {}
    for reference, values in FIXES.items():
        match = re.fullmatch(r"([0-9A-Z]{3})\.([1-9][0-9]*):([1-9][0-9]*)", reference)
        if not match:
            raise RuntimeError(f"Invalid reference {reference}")
        grouped.setdefault((match.group(1), int(match.group(2))), []).append(
            (int(match.group(3)), values[0], values[1])
        )

    for (book, chapter), repairs in sorted(grouped.items()):
        path = DATA / f"{book}.{chapter}.json"
        document = json.loads(path.read_text(encoding="utf-8"))
        verses = document["verses"]
        by_number = {int(verse["number"]): verse for verse in verses}
        for number, old, new in repairs:
            current = str(by_number[number]["text"])
            if current == new:
                continue
            if current != old:
                raise RuntimeError(
                    f"{book}.{chapter}:{number}: expected {old!r}, found {current!r}"
                )
            by_number[number]["text"] = new
            changed += 1
        document.setdefault("audit", {})["textDigest"] = digest(verses)
        rendered = json.dumps(document, ensure_ascii=False, indent=2) + "\n"
        path.write_text(unicodedata.normalize("NFC", rendered), encoding="utf-8")

    if changed not in {0, len(FIXES)}:
        raise SystemExit(f"Partial wave-two repair: {changed}/{len(FIXES)}")
    print(json.dumps({"repairedOmissionVersesWave2": changed}, ensure_ascii=False))


if __name__ == "__main__":
    main()
