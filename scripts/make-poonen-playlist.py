#!/usr/bin/env python3
"""Construieste manifestul playlist-ului pentru o carte Poonen.

Citeste listarea flat-playlist yt-dlp de pe stdin (format:
playlist_index|title|id|duration_seconds) si scrie manifestul JSON in
docs/data/ cu structura identica manifestului Matei.
"""
import json
import re
import sys
from pathlib import Path

CARTI = {
    "marcu": {"ro": "Marcu", "en": "Mark", "capitole": 16},
}


def pasaj_din_titlu(titlu: str, carte: str) -> str:
    en = CARTI[carte]["en"]
    ro = CARTI[carte]["ro"]
    m = re.search(rf"{en}\s+(\d+):(\d+)\s+to\s+(\d+):(\d+)", titlu, re.I)
    if m:
        cap, de, cap2, pana = m.groups()
        return f"{ro} {cap}:{de}-{cap2}:{pana}"
    return titlu.strip()


def durata_afisata(secunde: int) -> str:
    minute, sec = divmod(secunde, 60)
    return f"{minute}:{sec:02d}"


def main() -> int:
    if len(sys.argv) < 3:
        print("Folosire: %s <carte> <playlist_id> <titlu_playlist>" % sys.argv[0])
        return 2
    carte, playlist_id, titlu_playlist = sys.argv[1], sys.argv[2], sys.argv[3]
    ro = CARTI[carte]["ro"]
    capitole_asteptate = CARTI[carte]["capitole"]

    episoade = []
    for linie in sys.stdin:
        linie = linie.strip()
        if not linie:
            continue
        poz, titlu, video_id, durata = linie.split("|")
        poz = int(poz)
        pasaj = pasaj_din_titlu(titlu, carte)
        episoade.append(
            {
                "position": poz,
                "passage": pasaj,
                "title": titlu.strip(),
                "videoId": video_id,
                "duration": durata_afisata(int(durata)),
                "url": f"https://www.youtube.com/watch?v={video_id}",
            }
        )

    manifest = {
        "playlistId": playlist_id,
        "playlistTitle": titlu_playlist,
        "playlistUrl": f"https://www.youtube.com/playlist?list={playlist_id}",
        "episodeCount": len(episoade),
        "captionTrack": "en-orig (automatic captions)",
        "sourcePolicy": "Research only. Emanus explanations must be original and checked against Scripture.",
        "episodes": episoade,
    }

    cale = Path("docs/data") / f"{carte}-poonen-playlist.json"
    cale.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Manifest scris: {cale} ({len(episoade)} episoade)")


if __name__ == "__main__":
    raise SystemExit(main())
