#!/usr/bin/env python3
"""Poarta structurală și editorială pentru Biblia explicată: Matei."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BIBLE = ROOT / "packages" / "shared" / "src" / "bible"
MANIFEST = ROOT / "docs" / "data" / "matei-poonen-playlist.json"

VERSE_COUNTS = {
    1: 25,
    2: 23,
    3: 17,
    4: 25,
    5: 48,
    6: 34,
    7: 29,
    8: 34,
    9: 38,
    10: 42,
    11: 30,
    12: 50,
    13: 58,
    14: 36,
    15: 39,
    16: 28,
    17: 27,
    18: 35,
    19: 30,
    20: 34,
    21: 46,
    22: 46,
    23: 39,
    24: 51,
    25: 46,
    26: 75,
    27: 66,
    28: 20,
}

REQUIRED_GUARDS = {
    "matei5.ts": ["abuz sau violență", "ajutorul competent"],
    "matei6.ts": ["ajutorul medical sau psihologic"],
    "matei8.ts": ["nu ne dă dreptul să promitem", "diagnosticăm de la distanță"],
    "matei9.ts": ["boala dovedește o vină ascunsă"],
    "matei12.ts": ["creștinii înțeleg ziua de odihnă în moduri diferite"],
    "matei17.ts": ["caută ajutor medical potrivit"],
    "matei18.ts": ["victima nu este obligată", "biserica nu înlocuiește poliția"],
    "matei19.ts": ["raportate autorităților competente", "nu ascunde aceste diferențe"],
    "matei24.ts": ["fără să declarăm că o cronologie disputată", "ziua exactă contrazice"],
    "matei25.ts": ["faptele nu cumpără mântuirea"],
    "matei26.ts": ["explică diferit felul prezenței", "orice convertire cu sabia"],
    "matei27.ts": ["apelează 112", "nu creează vină etnică moștenită"],
    "matei28.ts": ["nu botează fără consimțământ"],
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
    return BIBLE / ("matei.ts" if number == 1 else f"matei{number}.ts")


def github_error(message: str) -> None:
    safe = message.replace("%", "%25").replace("\r", "%0D").replace("\n", "%0A")
    print(f"::error title=Poarta Matei::{safe}")


def check_chapters(errors: list[str]) -> tuple[int, set[str]]:
    unit_count = 0
    unit_ids: set[str] = set()

    expected_files = {chapter_path(number).name for number in VERSE_COUNTS}
    actual_files = {
        path.name
        for path in BIBLE.glob("matei*.ts")
        if re.fullmatch(r"matei(?:[2-9]|1[0-9]|2[0-8])?\.ts", path.name)
    }
    if actual_files != expected_files:
        missing = sorted(expected_files - actual_files)
        extra = sorted(actual_files - expected_files)
        errors.append(f"Fișiere Matei greșite; lipsesc={missing}, în plus={extra}")

    for number, last_verse in VERSE_COUNTS.items():
        path = chapter_path(number)
        if not path.exists():
            continue
        text = path.read_text(encoding="utf-8")

        declarations = re.findall(r"\b(?:export\s+)?const\s+MATEI_(\d+)\s*=\s*mateiChapter\(\{", text)
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
            unit_id = f"matei-{number}-{start}-{end}"
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

    if unit_count != 129:
        errors.append(f"Număr greșit de unități: {unit_count}; se așteptau 129")
    return unit_count, unit_ids


def check_bible_text(errors: list[str]) -> int:
    path = BIBLE / "mateiText.ts"
    text = path.read_text(encoding="utf-8")
    lines = text.splitlines()
    chapters: list[list[str]] = []
    current: list[str] | None = None

    for line in lines:
        if line == "  [":
            if current is not None:
                errors.append("mateiText.ts: bloc de capitol imbricat")
            current = []
        elif line == "  ]," and current is not None:
            chapters.append(current)
            current = None
        elif current is not None and line.startswith('    "'):
            current.append(line)

    if current is not None:
        errors.append("mateiText.ts: ultimul capitol nu este închis")
    if len(chapters) != 28:
        errors.append(f"mateiText.ts: {len(chapters)} capitole detectate; se așteptau 28")

    total = 0
    for number, lines_in_chapter in enumerate(chapters, start=1):
        expected = VERSE_COUNTS[number]
        actual = len(lines_in_chapter) - 1
        if not lines_in_chapter or lines_in_chapter[0].strip() != '"",':
            errors.append(f"mateiText.ts: Matei {number} nu are indicele zero gol")
        if actual != expected:
            errors.append(f"mateiText.ts: Matei {number} are {actual} versete; se așteptau {expected}")
        total += max(actual, 0)

    if total != 1071:
        errors.append(f"mateiText.ts: total {total} versete; se așteptau 1071")
    if "teaching:" in text or "forYourHeart:" in text:
        errors.append("mateiText.ts: explicația a intrat în stratul textului biblic")
    return total


def check_runtime_wiring(errors: list[str]) -> None:
    index = (BIBLE / "index.ts").read_text(encoding="utf-8")
    marker_start = "/** Evanghelia după Matei"
    marker_end = "/** Cartile scrise"
    if marker_start not in index or marker_end not in index:
        errors.append("bible/index.ts: lipsește blocul de asamblare pentru Matei")
        return
    block = index.split(marker_start, 1)[1].split(marker_end, 1)[0]
    assembled = [int(number) for number in re.findall(r"\bMATEI_(\d+)\b", block)]
    if assembled != list(range(2, 29)):
        errors.append(f"bible/index.ts: ordinea capitolelor Matei este {assembled}")
    if "chapters: [\n    ...MATEI_BASE.chapters," not in block:
        errors.append("bible/index.ts: lipsește Matei 1 din MATEI_BASE")
    if not re.search(r"BIBLE_BOOKS:\s*BibleBook\[\]\s*=\s*\[[^\]]*\bMATEI\b", index):
        errors.append("bible/index.ts: Matei nu este în BIBLE_BOOKS")

    root_index = (BIBLE.parent / "index.ts").read_text(encoding="utf-8")
    if 'export * from "./bible/index.js"' in root_index:
        errors.append("shared/index.ts: Biblia nu trebuie trasă în chunk-ul principal; folosește exportul ./bible")

    helper = (BIBLE / "mateiHelpers.ts").read_text(encoding="utf-8")
    if "status: mateiStatus(input.number)" not in helper:
        errors.append("mateiHelpers.ts: starea trebuie citită din registrul editorial")

    publication = (BIBLE / "mateiPublication.ts").read_text(encoding="utf-8")
    statuses = {
        int(number): status
        for number, status in re.findall(r'^\s*(\d+):\s*"(draft|in_review|published)",\s*$', publication, re.MULTILINE)
    }
    if sorted(statuses) != list(range(1, 29)):
        errors.append(f"mateiPublication.ts: capitolele din registru sunt {sorted(statuses)}")


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
    if payload.get("episodeCount") != 128 or len(episodes) != 128:
        errors.append(
            f"Manifest video incomplet: episodeCount={payload.get('episodeCount')}, rânduri={len(episodes)}"
        )
    positions = [episode.get("position") for episode in episodes]
    if positions != list(range(1, 129)):
        errors.append("Manifest video: pozițiile nu acoperă exact 1-128")
    video_ids = [episode.get("videoId") for episode in episodes]
    if len(set(video_ids)) != len(video_ids) or any(not re.fullmatch(r"[\w-]{11}", str(item)) for item in video_ids):
        errors.append("Manifest video: ID-uri lipsă, duplicate sau invalide")
    if not str(payload.get("captionTrack", "")).startswith("en-orig"):
        errors.append("Manifest video: pista verificată trebuie să rămână en-orig")

    forbidden = list((ROOT / "docs" / "data").glob("*matei*.vtt"))
    forbidden += list((ROOT / "docs" / "data").glob("*matei*transcript*"))
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
        "Poarta Matei: "
        f"28 capitole, {unit_count} unități, {len(unit_ids)} ID-uri, "
        f"{verse_count} versete, {episode_count} episoade sursă."
    )
    if errors:
        print("Verificarea Matei a eșuat:")
        for error in errors:
            print(f"- {error}")
            github_error(error)
        return 1
    print("Verificarea structurală și editorială Matei a trecut.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
