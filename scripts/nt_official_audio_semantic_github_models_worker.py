#!/usr/bin/env python3
from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import time
import urllib.error
import urllib.request
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs/data/biblia-explicata"
CORPUS = DATA / "nt-final-source-first"
TRANSCRIPTS = DATA / "nt-official-transcripts"
MODEL = os.environ.get("NT_SEMANTIC_GITHUB_MODEL", "openai/gpt-4.1")
ENDPOINT = "https://models.github.ai/inference/chat/completions"
API_VERSION = "2026-03-10"
BATCH = int(os.environ.get("NT_SEMANTIC_BATCH_SIZE", "3"))
TIMEOUT = int(os.environ.get("NT_SEMANTIC_TIMEOUT", "300"))
FORBIDDEN_READER = re.compile(r"\b(?:Poonen|CFC|SermonIndex)\b", re.I)
SHA_RE = re.compile(r"^sha256:[0-9a-f]{64}$")

CONFIG = {
    "filipeni": {
        "unitCount": 19,
        "snapshotFile": "11-filipeni-semantic-preedit-snapshots.json",
        "sourceIds": ["filipeni-vbv-01", "filipeni-vbv-02", "filipeni-vbv-03", "filipeni-vbv-04"],
    },
    "coloseni": {
        "unitCount": 22,
        "snapshotFile": "12-coloseni-semantic-preedit-snapshots.json",
        "sourceIds": ["coloseni-vbv-01", "coloseni-vbv-02", "coloseni-vbv-03", "coloseni-vbv-04"],
    },
    "1-tesaloniceni": {
        "unitCount": 23,
        "snapshotFile": "13-1-tesaloniceni-semantic-preedit-snapshots.json",
        "sourceIds": ["1-tesaloniceni-vbv-01", "1-tesaloniceni-vbv-02"],
    },
}


def fail(message: str) -> None:
    raise SystemExit(f"[official-audio semantic review] {message}")


def sha(text: str) -> str:
    return "sha256:" + hashlib.sha256(text.encode("utf-8")).hexdigest()


def canonical(value: Any) -> str:
    return json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(",", ":"))


def snapshot_payload(unit: dict, teaching: str | None = None, heart_marker: bool = False, heart: Any = None) -> dict:
    if teaching is None:
        teaching = str(unit.get("teaching") or "")
    final_heart = heart if heart_marker else unit.get("forYourHeart")
    return {
        "heading": str(unit.get("heading") or ""),
        "teaching": str(teaching or ""),
        "forYourHeart": str(final_heart or ""),
    }


def snapshot_sha(unit: dict, teaching: str | None = None, heart_marker: bool = False, heart: Any = None) -> str:
    return sha(json.dumps(snapshot_payload(unit, teaching, heart_marker, heart), ensure_ascii=False, separators=(",", ":")))


def load(path: Path) -> dict:
    if not path.exists():
        fail(f"missing {path.relative_to(ROOT)}")
    return json.loads(path.read_text(encoding="utf-8"))


def find_book(book_id: str) -> dict:
    for path in sorted(CORPUS.glob("*.json")):
        data = load(path)
        if data.get("id") == book_id:
            return data
    fail(f"book not found: {book_id}")


def parse_source_range(value: str) -> tuple[tuple[int, int], tuple[int, int]]:
    # Transcript sourceRange may include an audit suffix after ';'.
    value = value.split(";", 1)[0].strip()
    match = re.search(r"(\d+):(\d+)\s*[-–]\s*(?:(\d+):)?(\d+)$", value)
    if not match:
        fail(f"cannot parse source range: {value!r}")
    sc, sv = int(match.group(1)), int(match.group(2))
    ec = int(match.group(3)) if match.group(3) else sc
    ev = int(match.group(4))
    if (ec, ev) < (sc, sv):
        fail(f"reversed source range: {value!r}")
    return (sc, sv), (ec, ev)


def validate_transcript(source_id: str, book_id: str) -> dict:
    data = load(TRANSCRIPTS / f"{source_id}.json")
    if data.get("schema") != "emanus-nt-official-audio-transcript-v1":
        fail(f"{source_id}: invalid transcript schema")
    if data.get("bookId") != book_id or data.get("sourceId") != source_id:
        fail(f"{source_id}: identity drift")
    if not str(data.get("officialSourceUrl") or "").startswith("https://"):
        fail(f"{source_id}: official source URL missing")
    if not str(data.get("officialAudioUrl") or "").startswith("https://"):
        fail(f"{source_id}: official audio URL missing")
    if not SHA_RE.fullmatch(str(data.get("officialAudioSha256") or "")):
        fail(f"{source_id}: invalid audio SHA")
    if not SHA_RE.fullmatch(str(data.get("transcriptSha256") or "")):
        fail(f"{source_id}: invalid transcript SHA")
    segments = data.get("segments")
    if not isinstance(segments, list) or not segments:
        fail(f"{source_id}: segments missing")
    lines: list[str] = []
    previous_end = -1.0
    for index, segment in enumerate(segments):
        if not isinstance(segment, dict):
            fail(f"{source_id}: bad segment {index}")
        start, end = segment.get("start"), segment.get("end")
        text = " ".join(str(segment.get("text") or "").split()).strip()
        if not isinstance(start, (int, float)) or not isinstance(end, (int, float)) or end < start:
            fail(f"{source_id}: bad timestamps at segment {index}")
        if start + 0.05 < previous_end:
            fail(f"{source_id}: unexpected overlap at segment {index}")
        if not text:
            fail(f"{source_id}: empty segment {index}")
        previous_end = end
        lines.append(text)
    transcript = "\n".join(lines).strip() + "\n"
    if len(transcript.split()) != data.get("wordCount"):
        fail(f"{source_id}: reconstructed word count drift")
    if sha(transcript) != data.get("transcriptSha256"):
        fail(f"{source_id}: reconstructed transcript SHA drift")
    data["_text"] = transcript
    data["_range"] = parse_source_range(str(data.get("sourceRange") or ""))
    return data


def call_model(prompt: str, retries: int = 6) -> dict:
    token = os.environ.get("GITHUB_TOKEN")
    if not token:
        fail("GITHUB_TOKEN missing")
    payload = json.dumps({
        "model": MODEL,
        "messages": [
            {"role": "system", "content": "You are a strict source-fidelity editorial reviewer. Follow the Romanian instructions exactly and return only valid JSON."},
            {"role": "user", "content": prompt},
        ],
        "temperature": 0.1,
    }, ensure_ascii=False).encode("utf-8")
    last = "unknown"
    for attempt in range(1, retries + 1):
        request = urllib.request.Request(ENDPOINT, data=payload, method="POST", headers={
            "Accept": "application/vnd.github+json",
            "Authorization": f"Bearer {token}",
            "X-GitHub-Api-Version": API_VERSION,
            "Content-Type": "application/json",
            "User-Agent": "Emanus-Official-Audio-Semantic-Review/1.0",
        })
        try:
            with urllib.request.urlopen(request, timeout=TIMEOUT) as response:
                data = json.loads(response.read().decode("utf-8"))
            content = data.get("choices", [{}])[0].get("message", {}).get("content")
            if not isinstance(content, str) or not content.strip():
                raise RuntimeError("model returned no content")
            raw = re.sub(r"^```(?:json)?\s*", "", content.strip())
            raw = re.sub(r"\s*```$", "", raw)
            try:
                result = json.loads(raw)
            except Exception:
                start, end = raw.find("{"), raw.rfind("}")
                if start < 0 or end <= start:
                    raise
                result = json.loads(raw[start:end + 1], strict=False)
            if not isinstance(result, dict):
                raise RuntimeError("model JSON root is not an object")
            return result
        except urllib.error.HTTPError as exc:
            body = exc.read().decode("utf-8", errors="replace")
            last = f"HTTP {exc.code}: {body[-1200:]}"
            if exc.code not in (408, 409, 429, 500, 502, 503, 504):
                break
            delay = min(60, 3 * attempt * attempt)
            retry_after = exc.headers.get("Retry-After")
            if retry_after and retry_after.isdigit():
                delay = min(60, int(retry_after))
            time.sleep(delay)
        except Exception as exc:
            last = repr(exc)
            if attempt < retries:
                time.sleep(min(30, 2 ** attempt))
    fail(f"GitHub Models call failed after {retries} attempts: {last}")


def first_prompt(transcript: dict, rows: list[dict]) -> str:
    units = [{
        "unitId": row["unitId"], "ref": row["ref"], "heading": row["heading"],
        "teaching": row["teaching"], "forYourHeart": row["forYourHeart"],
    } for row in rows]
    return f'''Ești primul reviewer semantic strict pentru Biblia Emanus NT Explicată. Compară FIECARE unitate cu TRANSCRIPTUL OFICIAL COMPLET de mai jos, nu doar cu intervalul de versete.

Reguli absolute:
1. Păstrează toate axele teologice și practice materiale ale sursei care aparțin pasajului; detectează diluarea sau omisiunea.
2. Elimină sau rescrie afirmațiile editoriale care nu sunt susținute de transcript, cu excepția unei explicații direct evidente din textul biblic al pasajului.
3. Nu inventa istorie, greacă, motive sau aplicații moderne.
4. Reader copy nu poate conține numele sursei, autorului, organizației ori platformei.
5. Dacă textul actual este fidel și suficient, assessment=keep. Altfel rewrite și livrează revisedTeaching complet, nu patch.
6. forYourHeart trebuie să rămână direct, pastoral și fidel aceleiași surse; revisedForYourHeart poate fi null dacă nu necesită schimbare.
7. Nu scurta o axă distinctivă importantă doar pentru stil.

Returnează numai JSON valid: {{"units":[{{"unitId":"...","assessment":"keep|rewrite","rationale":"...","unsupportedClaims":[],"materialOmissions":[],"revisedTeaching":"... sau null","revisedForYourHeart":"... sau null"}}]}}.

SOURCE ID: {transcript['sourceId']}
SOURCE RANGE: {transcript['sourceRange']}
TRANSCRIPT SHA: {transcript['transcriptSha256']}
TRANSCRIPT COMPLET:
{transcript['_text']}

UNITĂȚI:
{json.dumps(units, ensure_ascii=False)}'''


def verify_prompt(transcript: dict, rows: list[dict], first: dict) -> str:
    units = [{
        "unitId": row["unitId"], "ref": row["ref"], "heading": row["heading"],
        "teaching": row["teaching"], "forYourHeart": row["forYourHeart"],
    } for row in rows]
    return f'''Ești al doilea reviewer independent și fail-closed. Verifică verdictul primului reviewer împotriva ACELUIAȘI TRANSCRIPT OFICIAL COMPLET.

Respinge orice verdict care omite o doctrină/aplicație materială a sursei, păstrează o afirmație fără suport, inventează detalii sau diluează mesajul. Nu aproba locator-only. Reader copy fără nume moderne de surse. La rewrite, livrează forma finală integrală.

Returnează numai JSON valid: {{"units":[{{"unitId":"...","finalAction":"keep|rewrite|reject","rationale":"...","problems":[],"revisedTeaching":"... sau null","revisedForYourHeart":"... sau null"}}]}}. `problems` trebuie să fie [] pentru keep/rewrite.

SOURCE ID: {transcript['sourceId']}
SOURCE RANGE: {transcript['sourceRange']}
TRANSCRIPT SHA: {transcript['transcriptSha256']}
TRANSCRIPT COMPLET:
{transcript['_text']}

UNITĂȚI:
{json.dumps(units, ensure_ascii=False)}

PRIMUL REVIEW:
{json.dumps(first, ensure_ascii=False)}'''


def evidence(transcript: dict, ref: str) -> dict:
    payload = {
        "officialSourceUrl": transcript["officialSourceUrl"],
        "transcriptSourceUrl": transcript["officialAudioUrl"],
        "sourceRange": f"{ref}; exact persisted official audio transcript {transcript['sourceId']}; {transcript['sourceRange']}",
        "transcriptSha256": transcript["transcriptSha256"],
    }
    return {
        **payload,
        "evidenceSha256": sha(canonical(payload)),
        "officialAudioSha256": transcript["officialAudioSha256"],
        "transcriptionModel": transcript.get("transcriptionModel"),
        "wordCount": transcript["wordCount"],
        "sourceId": transcript["sourceId"],
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--book", required=True, choices=sorted(CONFIG))
    parser.add_argument("--output", required=True, type=Path)
    parser.add_argument("--reviewed-on", default="2026-08-11")
    args = parser.parse_args()

    config = CONFIG[args.book]
    book = find_book(args.book)
    snapshots = load(DATA / "nt-semantic-review-work" / config["snapshotFile"])
    if snapshots.get("schema") != "emanus-nt-semantic-book-preedit-snapshots-v1" or snapshots.get("bookId") != args.book:
        fail(f"{args.book}: bad preedit snapshot artifact")
    if snapshots.get("unitCount") != config["unitCount"] or len(snapshots.get("units", {})) != config["unitCount"]:
        fail(f"{args.book}: preedit snapshot count drift")

    transcripts = [validate_transcript(source_id, args.book) for source_id in config["sourceIds"]]
    rows: list[dict] = []
    for chapter in book.get("chapters", []):
        for unit in chapter.get("units", []):
            unit_id = str(unit.get("id") or "")
            frozen = snapshots["units"].get(unit_id)
            if not frozen:
                fail(f"{args.book}: unit {unit_id} missing from preedit snapshots")
            if int(frozen.get("chapter", -1)) != int(chapter["number"]):
                fail(f"{unit_id}: snapshot chapter drift")
            current = snapshot_sha(unit)
            if current != frozen.get("snapshotSha256"):
                fail(f"{unit_id}: preedit reader snapshot drifted; {current} != {frozen.get('snapshotSha256')}")
            if canonical(frozen.get("snapshot")) != canonical(snapshot_payload(unit)):
                fail(f"{unit_id}: preedit snapshot payload drifted")
            point_start = (int(chapter["number"]), int(unit.get("verseStart") or 0))
            point_end = (int(chapter["number"]), int(unit.get("verseEnd") or 0))
            containing = [t for t in transcripts if t["_range"][0] <= point_start and point_end <= t["_range"][1]]
            if not containing:
                fail(f"{unit_id}: no persisted official transcript fully contains {unit.get('ref')}")
            # Prefer the narrowest complete containing source when overlaps exist.
            chosen = min(containing, key=lambda t: (t["_range"][1][0] - t["_range"][0][0], t["wordCount"], t["sourceId"]))
            rows.append({
                "unitId": unit_id,
                "chapter": int(chapter["number"]),
                "ref": str(unit.get("ref") or ""),
                "heading": str(unit.get("heading") or ""),
                "teaching": str(unit.get("teaching") or ""),
                "forYourHeart": unit.get("forYourHeart"),
                "unit": unit,
                "transcript": chosen,
            })
    if len(rows) != config["unitCount"]:
        fail(f"{args.book}: expected {config['unitCount']} units, found {len(rows)}")

    decisions: list[dict] = []
    for source_id in config["sourceIds"]:
        source_rows = [row for row in rows if row["transcript"]["sourceId"] == source_id]
        transcript = next((t for t in transcripts if t["sourceId"] == source_id), None)
        if transcript is None:
            fail(f"{source_id}: transcript disappeared")
        for offset in range(0, len(source_rows), BATCH):
            batch = source_rows[offset:offset + BATCH]
            if not batch:
                continue
            first = call_model(first_prompt(transcript, batch))
            first_map = {item.get("unitId"): item for item in first.get("units", []) if isinstance(item, dict)}
            expected = {row["unitId"] for row in batch}
            if set(first_map) != expected:
                fail(f"{source_id}: first reviewer unit set mismatch: {set(first_map)} != {expected}")
            second = call_model(verify_prompt(transcript, batch, first))
            second_map = {item.get("unitId"): item for item in second.get("units", []) if isinstance(item, dict)}
            if set(second_map) != expected:
                fail(f"{source_id}: verifier unit set mismatch")
            for row in batch:
                result = second_map[row["unitId"]]
                action = result.get("finalAction")
                problems = result.get("problems") or []
                if action == "reject" or problems:
                    fail(f"{row['unitId']}: verifier rejected: {problems or result.get('rationale')}")
                if action not in {"keep", "rewrite"}:
                    fail(f"{row['unitId']}: invalid finalAction {action}")
                rationale = str(result.get("rationale") or "").strip()
                if not rationale:
                    fail(f"{row['unitId']}: empty rationale")
                teaching = row["teaching"]
                has_heart = False
                final_heart = row["forYourHeart"]
                if action == "rewrite":
                    teaching = str(result.get("revisedTeaching") or "").strip()
                    if len(teaching) < 120:
                        fail(f"{row['unitId']}: rewrite too short")
                    if FORBIDDEN_READER.search(teaching):
                        fail(f"{row['unitId']}: source attribution leaked into revised teaching")
                    if "revisedForYourHeart" in result and result.get("revisedForYourHeart") is not None:
                        has_heart = True
                        final_heart = str(result.get("revisedForYourHeart") or "").strip()
                        if final_heart and FORBIDDEN_READER.search(final_heart):
                            fail(f"{row['unitId']}: source attribution leaked into forYourHeart")
                reviewed_hash = snapshot_sha(row["unit"], teaching, has_heart, final_heart)
                decision = {
                    "bookId": args.book,
                    "chapter": row["chapter"],
                    "unitId": row["unitId"],
                    "status": "approved-against-transcript",
                    "action": action,
                    "reviewedTeachingSha256": reviewed_hash,
                    "transcriptEvidence": [evidence(transcript, row["ref"])],
                    "rationale": rationale,
                    "reviewer": f"two-pass GitHub Models semantic review against exact persisted official audio transcript ({MODEL})",
                    "reviewedOn": args.reviewed_on,
                }
                if action == "rewrite":
                    decision["revisedTeaching"] = teaching
                    if has_heart:
                        decision["revisedForYourHeart"] = final_heart
                decisions.append(decision)
                print(f"SEMANTIC {args.book} {row['unitId']} {action} source={source_id}", flush=True)

    keys = {(d["chapter"], d["unitId"]) for d in decisions}
    if len(decisions) != config["unitCount"] or len(keys) != config["unitCount"]:
        fail(f"{args.book}: decisions incomplete/duplicate: {len(decisions)}")
    rewrite_count = sum(d["action"] == "rewrite" for d in decisions)
    keep_count = sum(d["action"] == "keep" for d in decisions)
    artifact = {
        "schema": "emanus-nt-semantic-review-book-v1",
        "bookId": args.book,
        "reviewMode": "two-pass-model-review-against-exact-persisted-official-audio-transcripts",
        "coverage": {
            "bookUnits": config["unitCount"],
            "approvedUnits": len(decisions),
            "rewrite": rewrite_count,
            "keep": keep_count,
            "officialTranscriptSources": config["sourceIds"],
        },
        "decisions": sorted(decisions, key=lambda d: (d["chapter"], d["unitId"])),
    }
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(artifact, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{args.book}: {len(decisions)}/{config['unitCount']} semantic decisions ({rewrite_count} rewrite / {keep_count} keep).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
