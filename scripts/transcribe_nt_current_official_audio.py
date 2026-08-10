#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import importlib
import json
import os
import subprocess
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs/data/biblia-explicata"
STATUS = DATA / "nt-semantic-manual-review-status.json"
OUT_DIR = DATA / "nt-official-transcripts"
PY_DEPS = Path("/tmp/emanus-nt-python")


def sha256(text: str) -> str:
    return "sha256:" + hashlib.sha256(text.encode("utf-8")).hexdigest()


def file_sha256(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            h.update(chunk)
    return "sha256:" + h.hexdigest()


def need_sources(status: dict) -> list[dict]:
    sources = status.get("officialAudioSources") or []
    pending = []
    for source in sources:
        source_id = str(source.get("id") or "").strip()
        if not source_id:
            raise RuntimeError("officialAudioSources entry missing id")
        target = OUT_DIR / f"{source_id}.json"
        if target.exists():
            data = json.loads(target.read_text(encoding="utf-8"))
            if (
                data.get("officialAudioUrl") == source.get("officialAudioUrl")
                and data.get("schema") == "emanus-nt-official-audio-transcript-v1"
            ):
                continue
        pending.append(source)
    return pending


def ensure_runtime() -> None:
    """Install Whisper into an isolated target and prove this interpreter can import it.

    The GitHub runner previously completed a dynamic pip call but the next import still
    could not resolve faster_whisper. A fixed --target plus an explicit sys.path entry
    removes dependence on runner/user-site behaviour and fails before any editorial
    artifact is written if the runtime is unusable.
    """
    PY_DEPS.mkdir(parents=True, exist_ok=True)
    marker = PY_DEPS / ".faster-whisper-1.1.1"
    if not marker.exists():
        subprocess.run(
            [
                sys.executable,
                "-m",
                "pip",
                "install",
                "--disable-pip-version-check",
                "--quiet",
                "--target",
                str(PY_DEPS),
                "faster-whisper==1.1.1",
            ],
            check=True,
        )
        marker.write_text("faster-whisper==1.1.1\n", encoding="utf-8")

    deps = str(PY_DEPS)
    if deps not in sys.path:
        sys.path.insert(0, deps)
    importlib.invalidate_caches()
    module = importlib.import_module("faster_whisper")
    module_path = getattr(module, "__file__", None)
    if not module_path:
        raise RuntimeError("faster_whisper imported without a concrete module path")
    print(f"Whisper runtime OK: {module_path}", flush=True)


def download(url: str, target: Path) -> None:
    req = urllib.request.Request(url, headers={"User-Agent": "Emanus-Editorial-Research/1.0"})
    with urllib.request.urlopen(req, timeout=120) as response, target.open("wb") as handle:
        while True:
            chunk = response.read(1024 * 1024)
            if not chunk:
                break
            handle.write(chunk)
    if target.stat().st_size < 500_000:
        raise RuntimeError(f"Downloaded audio is unexpectedly small: {target.stat().st_size} bytes")


def transcribe(source: dict, book_id: str) -> dict:
    from faster_whisper import WhisperModel

    source_id = str(source["id"])
    work = Path("/tmp/emanus-nt-transcription")
    work.mkdir(parents=True, exist_ok=True)
    audio = work / f"{source_id}.mp3"
    download(str(source["officialAudioUrl"]), audio)

    model_name = os.environ.get("NT_TRANSCRIPTION_MODEL", "small.en")
    model = WhisperModel(model_name, device="cpu", compute_type="int8", cpu_threads=2)
    segments, info = model.transcribe(
        str(audio),
        language="en",
        beam_size=1,
        best_of=1,
        vad_filter=True,
        condition_on_previous_text=True,
    )
    rows = []
    lines = []
    for segment in segments:
        text = " ".join(segment.text.split()).strip()
        if not text:
            continue
        rows.append({"start": round(segment.start, 2), "end": round(segment.end, 2), "text": text})
        lines.append(text)
    transcript = "\n".join(lines).strip() + "\n"
    word_count = len(transcript.split())
    if word_count < 1500:
        raise RuntimeError(f"Transcript too short: {word_count} words")
    return {
        "schema": "emanus-nt-official-audio-transcript-v1",
        "bookId": book_id,
        "sourceId": source_id,
        "officialSourceUrl": source["officialSourceUrl"],
        "officialAudioUrl": source["officialAudioUrl"],
        "officialAudioSha256": file_sha256(audio),
        "sourceRange": source["sourceRange"],
        "transcriptionModel": f"faster-whisper {model_name} / CTranslate2 int8 CPU",
        "language": info.language,
        "languageProbability": info.language_probability,
        "transcriptSha256": sha256(transcript),
        "wordCount": word_count,
        "segmentCount": len(rows),
        "segments": rows,
    }


def main() -> int:
    if not STATUS.exists():
        print("Official audio transcription: status file missing; skip.")
        return 0
    status = json.loads(STATUS.read_text(encoding="utf-8"))
    book_id = str(status.get("currentBook") or "").strip()
    pending = need_sources(status)
    if not pending:
        print(f"Official audio transcription: current book {book_id or '<none>'} already current / no sources configured.")
        return 0
    ensure_runtime()
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for index, source in enumerate(pending, 1):
        result = transcribe(source, book_id)
        target = OUT_DIR / f"{source['id']}.json"
        target.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(
            f"OFFICIAL_TRANSCRIPT {index}/{len(pending)} {source['id']} "
            f"words={result['wordCount']} transcript={result['transcriptSha256']} audio={result['officialAudioSha256']}",
            flush=True,
        )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
