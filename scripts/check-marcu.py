#!/usr/bin/env python3
"""Poarta structurală și editorială pentru Biblia explicată: Marcu."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BIBLE = ROOT / "packages" / "shared" / "src" / "bible"
MANIFEST = ROOT / "docs" / "data" / "marcu-poonen-playlist.json"

VERSE_COUNTS = {
    1: 45, 2: 28, 3: 35, 4: 41, 5: 43, 6: 56, 7: 37, 8: 38,
    9: 50, 10: 52, 11: 33, 12: 44, 13: 37, 14: 72, 15: 47, 16: 20,
}
EXPECTED_UNITS = 73

PROHIBITED = {
    r"\bai un demon\b": "diagnostic spiritual cert prin ecran",
    r"\bești posedat(?:ă)?\b": "diagnostic de posedare prin ecran",
    r"\bvei fi vindecat(?:ă)?\b": "promisiune individuală de vindecare",
    r"\bvindecare garantat(?:ă)?\b": "vindecare garantată",
    r"\boprește tratamentul\b": "abandonarea tratamentului",
    r"\bnu mai lua medicamente\b": "abandonarea medicației",
    r"\bboala (?:ta )?este pedeapsa\b": "diagnostic inventat al suferinței",
}


def chapter_path(number: int) -> Path:
    return BIBLE / ("marcu.ts" if number == 1 else f"marcu{number}.ts")


def fail(errors: list[str], message: str) -> None:
    errors.append(message)


def check_chapters(errors: list[str]) -> tuple[int, set[str]]:
    unit_count = 0
    unit_ids: set[str] = set()
    for number, last_verse in VERSE_COUNTS.items():
        path = chapter_path(number)
        if not path.exists():
            fail(errors, f"lipsește {path.name}")
            continue
        text = path.read_text(encoding="utf-8")
        declarations = re.findall(r"\b(?:export\s+)?const\s+MARCU_(\d+)\s*=\s*marcuChapter\(\{", text)
        if declarations != [str(number)]:
            fail(errors, f"{path.name}: declarație {declarations}, se aștepta {number}")
        if number > 1 and not re.search(rf"\bexport\s+const\s+MARCU_{number}\b", text):
            fail(errors, f"{path.name}: capitolul nu este exportat")
        for field in ("title", "summary", "literaryContext", "historicalContext", "units", "prayer"):
            if not re.search(rf"\b{field}\s*:", text):
                fail(errors, f"{path.name}: lipsește {field}")
        ranges = [(int(a), int(b)) for a, b in re.findall(r"verses:\s*\[(\d+),\s*(\d+)\]", text)]
        expected = 1
        for start, end in ranges:
            if start != expected or end < start or end > last_verse:
                fail(errors, f"{path.name}: interval invalid {start}-{end}; se aștepta {expected}-{last_verse}")
            expected = end + 1
            unit_id = f"marcu-{number}-{start}-{end}"
            if unit_id in unit_ids:
                fail(errors, f"ID duplicat: {unit_id}")
            unit_ids.add(unit_id)
        if expected != last_verse + 1:
            fail(errors, f"{path.name}: acoperirea se oprește la {expected - 1} din {last_verse}")
        unit_count += len(ranges)
        lowered = text.lower()
        for pattern, label in PROHIBITED.items():
            if match := re.search(pattern, lowered, flags=re.IGNORECASE):
                fail(errors, f"{path.name}: {label}: {match.group(0)!r}")
    if unit_count != EXPECTED_UNITS:
        fail(errors, f"Număr greșit de unități: {unit_count}; se așteptau {EXPECTED_UNITS}")
    return unit_count, unit_ids


def check_bible_text(errors: list[str]) -> int:
    text = (BIBLE / "marcuText.ts").read_text(encoding="utf-8")
    chapters: list[list[str]] = []
    current: list[str] | None = None
    for line in text.splitlines():
        if line == "  [":
            current = []
        elif line == "  ]," and current is not None:
            chapters.append(current)
            current = None
        elif current is not None and line.startswith('    "'):
            current.append(line)
    if len(chapters) != 16:
        fail(errors, f"marcuText.ts: {len(chapters)} capitole; se așteptau 16")
        return 0
    total = 0
    for number, lines in enumerate(chapters, 1):
        actual = len(lines) - 1
        if not lines or lines[0].strip() != '"",':
            fail(errors, f"marcuText.ts: Marcu {number} nu are indice zero")
        if actual != VERSE_COUNTS[number]:
            fail(errors, f"marcuText.ts: Marcu {number} are {actual} versete")
        total += max(actual, 0)
    if total != 678:
        fail(errors, f"marcuText.ts: total {total}, se așteptau 678")
    if "teaching:" in text or "forYourHeart:" in text:
        fail(errors, "marcuText.ts: explicația a intrat în textul biblic")
    return total


def check_wiring(errors: list[str]) -> None:
    index = (BIBLE / "index.ts").read_text(encoding="utf-8")
    for number in range(2, 17):
        if f'import {{ MARCU_{number} }} from "./marcu{number}.js"' not in index:
            fail(errors, f"bible/index.ts: lipsește importul MARCU_{number}")
        if not re.search(rf"\bMARCU_{number}\b", index[index.find("export const MARCU"):]):
            fail(errors, f"bible/index.ts: MARCU_{number} nu este legat")
    if not re.search(r"BIBLE_BOOKS:\s*BibleBook\[\]\s*=\s*\[[^\]]*\bMARCU\b", index):
        fail(errors, "bible/index.ts: Marcu nu este în BIBLE_BOOKS")


def check_manifest(errors: list[str]) -> int:
    try:
        payload = json.loads(MANIFEST.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        fail(errors, f"Manifestul video nu poate fi citit: {exc}")
        return 0
    episodes = payload.get("episodes", [])
    if payload.get("episodeCount") != 48 or len(episodes) != 48:
        fail(errors, f"Manifest video incomplet: {len(episodes)} episoade")
    if [e.get("position") for e in episodes] != list(range(1, 49)):
        fail(errors, "Manifest video: pozițiile nu acoperă 1-48")
    ids = [str(e.get("videoId", "")) for e in episodes]
    if len(set(ids)) != 48 or any(not re.fullmatch(r"[\w-]{11}", item) for item in ids):
        fail(errors, "Manifest video: ID-uri lipsă, duplicate sau invalide")
    return len(episodes)


def main() -> int:
    errors: list[str] = []
    units, ids = check_chapters(errors)
    verses = check_bible_text(errors)
    check_wiring(errors)
    episodes = check_manifest(errors)
    print(f"Poarta Marcu: 16 capitole, {units} unități, {len(ids)} ID-uri, {verses} versete, {episodes} episoade.")
    if errors:
        print("Verificarea Marcu a eșuat:")
        for error in errors:
            print(f"- {error}")
        return 1
    print("Verificarea structurală și editorială Marcu a trecut.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
