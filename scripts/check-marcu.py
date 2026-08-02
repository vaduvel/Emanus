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
    1: 45,
    2: 28,
    3: 35,
    4: 41,
    5: 43,
    6: 56,
    7: 37,
    8: 38,
    9: 50,
    10: 52,
    11: 33,
    12: 44,
    13: 37,
    14: 72,
    15: 47,
    16: 20,
}

# Se actualizează pe măsură ce capitolele se scriu; 9 = Marcu 1.
EXPECTED_UNITS = 9

REQUIRED_GUARDS = {
    "marcu.ts": [
        "nu ne este dat să diagnosticăm",
        "nu promitem",
        "poate chema și doctorul",
    ],
}

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


def github_error(message: str) -> None:
    safe = message.replace("%", "%25").replace("\r", "%0D").replace("\n", "%0A")
    print(f"::error title=Poarta Marcu::{safe}")


def check_chapters(errors: list[str]) -> tuple[int, set[str]]:
    unit_count = 0
    unit_ids: set[str] = set()

    for number, last_verse in VERSE_COUNTS.items():
        path = chapter_path(number)
        if not path.exists():
            continue
        text = path.read_text(encoding="utf-8")

        declarations = re.findall(r"\b(?:export\s+)?const\s+MARCU_(\d+)\s*=\s*marcuChapter\(\{", text)
        if declarations != [str(number)]:
            errors.append(f"{path.name}: declarația capitolului este {declarations}, se aștepta {number}")

        for field in ("title", "summary", "literaryContext", "historicalContext", "units", "prayer"):
            if not re.search(rf"\b{field}\s*:", text):
                errors.append(f"{path.name}: lipsește câmpul {field}")

        ranges = [(int(start), int(end)) for start, end in re.findall(r"verses:\s*\[(\d+),\s*(\d+)\]", text)]
        if not ranges:
            errors.append(f"{path.name}: nu are unități")
            continue

        expected_start = 1
        for start, end in ranges:
            if start != expected_start or end < start or end > last_verse:
                errors.append(
                    f"{path.name}: interval invalid {start}-{end}; se aștepta {expected_start}-{last_verse}"
                )
            expected_start = end + 1
            unit_id = f"marcu-{number}-{start}-{end}"
            if unit_id in unit_ids:
                errors.append(f"ID de unitate duplicat: {unit_id}")
            unit_ids.add(unit_id)
        if expected_start != last_verse + 1:
            errors.append(f"{path.name}: acoperirea se oprește la {expected_start - 1} din {last_verse}")
        unit_count += len(ranges)

        lowered = text.lower()
        for pattern, label in PROHIBITED.items():
            match = re.search(pattern, lowered, flags=re.IGNORECASE)
            if match:
                errors.append(f"{path.name}: {label}: {match.group(0)!r}")

    if unit_count != EXPECTED_UNITS:
        errors.append(f"Număr greșit de unități: {unit_count}; se așteptau {EXPECTED_UNITS}")
    return unit_count, unit_ids


def check_bible_text(errors: list[str]) -> int:
    path = BIBLE / "marcuText.ts"
    text = path.read_text(encoding="utf-8")
    lines = text.splitlines()
    chapters: list[list[str]] = []
    current: list[str] | None = None

    for line in lines:
        if line == "  [":
            if current is not None:
                errors.append("marcuText.ts: bloc de capitol imbricat")
            current = []
        elif line == "  ]," and current is not None:
            chapters.append(current)
            current = None
        elif current is not None and line.startswith('    "'):
            current.append(line)

    if current is not None:
        errors.append("marcuText.ts: ultimul capitol nu este închis")
    if len(chapters) != 16:
        errors.append(f"marcuText.ts: {len(chapters)} capitole detectate; se așteptau 16")

    total = 0
    for number, lines_in_chapter in enumerate(chapters, start=1):
        expected = VERSE_COUNTS[number]
        actual = len(lines_in_chapter) - 1
        if not lines_in_chapter or lines_in_chapter[0].strip() != '"",':
            errors.append(f"marcuText.ts: Marcu {number} nu are indicele zero gol")
        if actual != expected:
            errors.append(f"marcuText.ts: Marcu {number} are {actual} versete; se așteptau {expected}")
        total += max(actual, 0)

    if total != 678:
        errors.append(f"marcuText.ts: total {total} versete; se așteptau 678")
    if "teaching:" in text or "forYourHeart:" in text:
        errors.append("marcuText.ts: explicația a intrat în stratul textului biblic")
    return total


def check_runtime_wiring(errors: list[str]) -> None:
    index = (BIBLE / "index.ts").read_text(encoding="utf-8")
    marker_start = "/** Marcu, scris acum"
    if marker_start not in index:
        errors.append("bible/index.ts: lipsește blocul de asamblare pentru Marcu")
    if not re.search(r"BIBLE_BOOKS:\s*BibleBook\[\]\s*=\s*\[[^\]]*\bMARCU\b", index):
        errors.append("bible/index.ts: Marcu nu este în BIBLE_BOOKS")

    root_index = (BIBLE.parent / "index.ts").read_text(encoding="utf-8")
    if 'export * from "./bible/index.js"' in root_index:
        errors.append("shared/index.ts: Biblia nu trebuie trasă în chunk-ul principal; folosește exportul ./bible")

    helper = (BIBLE / "marcuHelpers.ts").read_text(encoding="utf-8")
    if "status: marcuStatus(input.number)" not in helper:
        errors.append("marcuHelpers.ts: starea trebuie citită din registrul editorial")

    publication = (BIBLE / "marcuPublication.ts").read_text(encoding="utf-8")
    statuses = {
        int(number): status
        for number, status in re.findall(r'^\s*(\d+):\s*"(draft|in_review|published)",\s*$', publication, re.MULTILINE)
    }
    if sorted(statuses) != list(range(1, 17)):
        errors.append(f"marcuPublication.ts: capitolele din registru sunt {sorted(statuses)}")


def check_editorial_guards(errors: list[str]) -> None:
    for filename, needles in REQUIRED_GUARDS.items():
        text = (BIBLE / filename).read_text(encoding="utf-8").lower()
        for needle in needles:
            if needle.lower() not in text:
                errors.append(f"{filename}: lipsește protecția editorială {needle!r}")


def check_manifest(errors: list[str]) -> int:
    try:
        payload = json.loads(MANIFEST.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        errors.append(f"Manifestul video nu poate fi citit: {exc}")
        return 0

    episodes = payload.get("episodes", [])
    if payload.get("episodeCount") != 48 or len(episodes) != 48:
        errors.append(
            f"Manifest video incomplet: episodeCount={payload.get('episodeCount')}, rânduri={len(episodes)}"
        )
    positions = [episode.get("position") for episode in episodes]
    if positions != list(range(1, 49)):
        errors.append("Manifest video: pozițiile nu acoperă exact 1-48")
    video_ids = [episode.get("videoId") for episode in episodes]
    if len(set(video_ids)) != len(video_ids) or any(not re.fullmatch(r"[\w-]{11}", str(item)) for item in video_ids):
        errors.append("Manifest video: ID-uri lipsă, duplicate sau invalide")
    if not str(payload.get("captionTrack", "")).startswith("en-orig"):
        errors.append("Manifest video: pista verificată trebuie să rămână en-orig")

    forbidden = list((ROOT / "docs" / "data").glob("*marcu*.vtt"))
    forbidden += list((ROOT / "docs" / "data").glob("*marcu*transcript*"))
    if forbidden:
        errors.append(f"Transcrieri brute găsite în Git: {[path.name for path in forbidden]}")
    if ".research/" not in (ROOT / ".gitignore").read_text(encoding="utf-8"):
        errors.append(".gitignore: lipsește directorul local .research/")
    return len(episodes)


def main() -> int:
    errors: list[str] = []
    unit_count, unit_ids = check_chapters(errors)
    verse_count = check_bible_text(errors)
    check_runtime_wiring(errors)
    check_editorial_guards(errors)
    episode_count = check_manifest(errors)

    print(
        "Poarta Marcu: "
        f"{len([n for n in VERSE_COUNTS if chapter_path(n).exists()])} capitole scrise, {unit_count} unități, "
        f"{len(unit_ids)} ID-uri, {verse_count} versete, {episode_count} episoade sursă."
    )
    if errors:
        print("Verificarea Marcu a eșuat:")
        for error in errors:
            print(f"- {error}")
            github_error(error)
        return 1
    print("Verificarea structurală și editorială Marcu a trecut.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
