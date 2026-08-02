#!/usr/bin/env python3
"""Construieste manifestul unui playlist Zac Poonen verse-by-verse.

Citeste listarea yt-dlp flat-playlist de pe stdin in formatul:
playlist_index|title|id|duration_seconds
si scrie docs/data/<carte>-poonen-playlist.json.
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path


CARTI = {
    "matei": {"ro": "Matei", "en": "Matthew", "capitole": 28},
    "marcu": {"ro": "Marcu", "en": "Mark", "capitole": 16},
    "luca": {"ro": "Luca", "en": "Luke", "capitole": 24},
    "ioan": {"ro": "Ioan", "en": "John", "capitole": 21},
    "fapte": {"ro": "Fapte", "en": "Acts", "capitole": 28},
    "romani": {"ro": "Romani", "en": "Romans", "capitole": 16},
    "1-corinteni": {"ro": "1 Corinteni", "en": "1 Corinthians", "capitole": 16},
    "2-corinteni": {"ro": "2 Corinteni", "en": "2 Corinthians", "capitole": 13},
    "galateni": {"ro": "Galateni", "en": "Galatians", "capitole": 6},
    "efeseni": {"ro": "Efeseni", "en": "Ephesians", "capitole": 6},
    "filipeni": {"ro": "Filipeni", "en": "Philippians", "capitole": 4},
    "coloseni": {"ro": "Coloseni", "en": "Colossians", "capitole": 4},
    "1-tesaloniceni": {"ro": "1 Tesaloniceni", "en": "1 Thessalonians", "capitole": 5},
    "2-tesaloniceni": {"ro": "2 Tesaloniceni", "en": "2 Thessalonians", "capitole": 3},
    "1-timotei": {"ro": "1 Timotei", "en": "1 Timothy", "capitole": 6},
    "2-timotei": {"ro": "2 Timotei", "en": "2 Timothy", "capitole": 4},
    "tit": {"ro": "Tit", "en": "Titus", "capitole": 3},
    "filimon": {"ro": "Filimon", "en": "Philemon", "capitole": 1},
    "evrei": {"ro": "Evrei", "en": "Hebrews", "capitole": 13},
    "iacov": {"ro": "Iacov", "en": "James", "capitole": 5},
    "1-petru": {"ro": "1 Petru", "en": "1 Peter", "capitole": 5},
    "2-petru": {"ro": "2 Petru", "en": "2 Peter", "capitole": 3},
    "1-ioan": {"ro": "1 Ioan", "en": "1 John", "capitole": 5},
    "2-ioan": {"ro": "2 Ioan", "en": "2 John", "capitole": 1},
    "3-ioan": {"ro": "3 Ioan", "en": "3 John", "capitole": 1},
    "iuda": {"ro": "Iuda", "en": "Jude", "capitole": 1},
    "apocalipsa": {"ro": "Apocalipsa", "en": "Revelation", "capitole": 22},
}


def pasaj_din_titlu(titlu: str, carte: str) -> str:
    info = CARTI[carte]
    en = re.escape(info["en"])
    ro = info["ro"]
    normalized = re.sub(r"\s+", " ", titlu.replace("–", "-").replace("—", "-")).strip()
    pattern = rf"{en}\s+(?:Chapter\s+)?(\d+)[:\-](\d+)\s+to\s+(?:Chapter\s+)?(\d+)[:\-](\d+)"
    match = re.search(pattern, normalized, re.I)
    if not match:
        return normalized
    chapter_from, verse_from, chapter_to, verse_to = match.groups()
    return f"{ro} {chapter_from}:{verse_from}-{chapter_to}:{verse_to}"


def durata_afisata(secunde: int) -> str:
    minute, sec = divmod(secunde, 60)
    hours, minute = divmod(minute, 60)
    return f"{hours}:{minute:02d}:{sec:02d}" if hours else f"{minute}:{sec:02d}"


def main() -> int:
    if len(sys.argv) < 4:
        print(f"Folosire: {sys.argv[0]} <carte> <playlist_id> <titlu_playlist>")
        return 2

    carte, playlist_id, playlist_title = sys.argv[1], sys.argv[2], sys.argv[3]
    if carte not in CARTI:
        print(f"Carte necunoscuta: {carte}. Optiuni: {', '.join(CARTI)}", file=sys.stderr)
        return 2

    episodes = []
    for line in sys.stdin:
        line = line.strip()
        if not line:
            continue
        fields = line.split("|")
        if len(fields) != 4:
            raise RuntimeError(f"Linie invalida: {line}")
        position, title, video_id, duration = fields
        episodes.append(
            {
                "position": int(position),
                "passage": pasaj_din_titlu(title, carte),
                "title": title.strip(),
                "videoId": video_id.strip(),
                "duration": durata_afisata(int(float(duration))),
                "url": f"https://www.youtube.com/watch?v={video_id.strip()}",
            }
        )

    episodes.sort(key=lambda item: item["position"])
    positions = [item["position"] for item in episodes]
    if positions != list(range(1, len(episodes) + 1)):
        raise RuntimeError("Playlistul are pozitii lipsa, duplicate sau neordonate")

    manifest = {
        "book": carte,
        "bookName": CARTI[carte]["ro"],
        "chapterCount": CARTI[carte]["capitole"],
        "playlistId": playlist_id,
        "playlistTitle": playlist_title,
        "playlistUrl": f"https://www.youtube.com/playlist?list={playlist_id}",
        "episodeCount": len(episodes),
        "captionTrack": "en-orig (automatic captions)",
        "sourcePolicy": (
            "Research only. Preserve Zac Poonen's doctrinal meaning, redact in Romanian "
            "without verbatim translation, keep Scripture separate, and leave every new "
            "chapter in_review until owner approval."
        ),
        "episodes": episodes,
    }

    path = Path("docs/data") / f"{carte}-poonen-playlist.json"
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Manifest scris: {path} ({len(episodes)} episoade)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
