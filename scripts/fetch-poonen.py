#!/usr/bin/env python3
"""Descarca local subtitrarile de cercetare pentru o carte Poonen.

Lista episoadelor este versionata in docs/data/<carte>-poonen-playlist.json.
Fisierele rezultate ajung implicit in .research/<carte>-poonen, director ignorat
de Git. Transcrierile sunt material de cercetare: ideile se reda fidel in
romana, dar formularea nu se copiaza si continutul ramane in_review pana la
revizia proprietarului.
"""

from __future__ import annotations

import argparse
import json
import shutil
import subprocess
import sys
import time
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
YTDLP_VERSION = "2026.7.4"


def command_for_ytdlp(target: Path) -> list[str]:
    """Foloseste o versiune fixata, fara instalare globala."""
    uvx = shutil.which("uvx")
    if uvx:
        return [uvx, "--from", f"yt-dlp=={YTDLP_VERSION}", "yt-dlp"]

    executable = shutil.which("yt-dlp")
    if executable:
        return [executable]

    venv = target / ".venv"
    python = venv / ("Scripts/python.exe" if sys.platform == "win32" else "bin/python")
    ytdlp = venv / ("Scripts/yt-dlp.exe" if sys.platform == "win32" else "bin/yt-dlp")
    if not ytdlp.exists():
        subprocess.run([sys.executable, "-m", "venv", str(venv)], check=True)
        subprocess.run(
            [str(python), "-m", "pip", "install", f"yt-dlp=={YTDLP_VERSION}"],
            check=True,
        )
    return [str(ytdlp)]


def transcript_text(payload: dict) -> str:
    """Scoate textul ASR din JSON3 si pastreaza randurile vorbirii."""
    parts: list[str] = []
    for event in payload.get("events", []):
        segments = event.get("segs")
        if not segments:
            continue
        parts.append("".join(str(segment.get("utf8", "")) for segment in segments))

    lines = []
    for line in "".join(parts).replace("\u00a0", " ").splitlines():
        clean = " ".join(line.split())
        if clean:
            lines.append(clean)
    return "\n".join(lines).strip() + "\n"


def fetch_one(command: list[str], captions: Path, item: dict, retries: int) -> Path:
    position = int(item["position"])
    video_id = str(item["videoId"])
    stem = f"{position:03d}-{video_id}"
    output = captions / f"{stem}.%(ext)s"
    json_path = captions / f"{stem}.en-orig.json3"
    text_path = captions / f"{stem}.txt"

    if text_path.exists() and text_path.stat().st_size > 100:
        return text_path

    args = [
        *command,
        "--skip-download",
        "--write-auto-subs",
        "--sub-langs",
        "en-orig",
        "--sub-format",
        "json3",
        "--no-overwrites",
        "--output",
        str(output),
        f"https://www.youtube.com/watch?v={video_id}",
    ]

    last_error: subprocess.CalledProcessError | None = None
    for attempt in range(1, retries + 1):
        try:
            subprocess.run(args, check=True)
            break
        except subprocess.CalledProcessError as error:
            last_error = error
            if attempt == retries:
                raise
            time.sleep(attempt * 2)

    if not json_path.exists():
        if last_error:
            raise last_error
        raise RuntimeError(f"Lipseste subtitrarea pentru episodul {position}: {video_id}")

    payload = json.loads(json_path.read_text(encoding="utf-8"))
    text = transcript_text(payload)
    if len(text) < 500:
        raise RuntimeError(f"Transcriere prea scurta pentru episodul {position}: {video_id}")
    text_path.write_text(text, encoding="utf-8")
    return text_path


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("carte", help="Slugul cartii (ex: luca, fapte, romani).")
    parser.add_argument(
        "--output",
        type=Path,
        default=None,
        help="Directorul local, ignorat de Git in configuratia implicita.",
    )
    parser.add_argument("--retries", type=int, default=3)
    args = parser.parse_args()

    manifest_path = ROOT / "docs/data" / f"{args.carte}-poonen-playlist.json"
    if not manifest_path.exists():
        print(f"Lipseste manifestul: {manifest_path}", file=sys.stderr)
        return 2
    target = (args.output or ROOT / ".research" / f"{args.carte}-poonen").resolve()
    captions = target / "transcripts"
    captions.mkdir(parents=True, exist_ok=True)

    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    episodes = manifest.get("episodes", [])
    expected = manifest.get("episodeCount", len(episodes))
    if len(episodes) != expected:
        raise RuntimeError(f"Manifest incomplet: {len(episodes)} din {expected} de episoade")

    command = command_for_ytdlp(target)
    failed: list[str] = []
    for item in episodes:
        position = int(item["position"])
        try:
            path = fetch_one(command, captions, item, max(1, args.retries))
            print(f"[{position:03d}/{expected}] {path.name}")
        except Exception as error:  # noqa: BLE001 - raportam toate golurile la final
            failed.append(f"{position}: {item['videoId']} ({error})")
            print(f"[{position:03d}/{expected}] EROARE: {error}", file=sys.stderr)

    found = sorted(captions.glob("*.txt"))
    report = {
        "playlistId": manifest["playlistId"],
        "expected": len(episodes),
        "downloaded": len(found),
        "failed": failed,
        "note": "Material de cercetare. Reda fidel ideile, nu copia formularea.",
    }
    (target / "report.json").write_text(
        json.dumps(report, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    print(f"\nTranscrieri: {len(found)}/{expected} in {captions}")
    if failed:
        print("Goluri:\n- " + "\n- ".join(failed), file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
