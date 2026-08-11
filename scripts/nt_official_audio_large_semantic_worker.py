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
MANIFEST = ROOT / ".github/semantic-source-manifests/remaining-large-books.json"
MODEL = os.environ.get("NT_SEMANTIC_GITHUB_MODEL", "openai/gpt-4.1")
ENDPOINT = "https://models.github.ai/inference/chat/completions"
API_VERSION = "2026-03-10"
BATCH = int(os.environ.get("NT_SEMANTIC_BATCH_SIZE", "3"))
TIMEOUT = int(os.environ.get("NT_SEMANTIC_TIMEOUT", "300"))
FORBIDDEN_READER = re.compile(r"\b(?:Poonen|CFC|SermonIndex)\b", re.I)
SHA_RE = re.compile(r"^sha256:[0-9a-f]{64}$")


def fail(message: str) -> None:
    raise SystemExit(f"[large official-audio semantic review] {message}")


def sha(text: str) -> str:
    return "sha256:" + hashlib.sha256(text.encode("utf-8")).hexdigest()


def canonical(value: Any) -> str:
    return json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(",", ":"))


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


def parse_range(value: str) -> tuple[tuple[int, int], tuple[int, int]]:
    value = value.split(";", 1)[0].strip()
    match = re.search(r"(\d+):(\d+)\s*[-–]\s*(?:(\d+):)?(\d+)$", value)
    if not match:
        fail(f"cannot parse source range {value!r}")
    sc, sv = int(match.group(1)), int(match.group(2))
    ec = int(match.group(3)) if match.group(3) else sc
    ev = int(match.group(4))
    start, end = (sc, sv), (ec, ev)
    if end < start:
        fail(f"reversed source range {value!r}")
    return start, end


def validate_transcript(book_id: str, canonical_page: str, episode: dict) -> dict:
    source_id = episode["id"]
    data = load(TRANSCRIPTS / f"{source_id}.json")
    if data.get("schema") != "emanus-nt-official-audio-transcript-v1":
        fail(f"{source_id}: invalid transcript schema")
    if data.get("bookId") != book_id or data.get("sourceId") != source_id:
        fail(f"{source_id}: identity drift")
    if data.get("officialSourceUrl") != canonical_page:
        fail(f"{source_id}: officialSourceUrl drift")
    if data.get("officialAudioUrl") != episode.get("audioUrl"):
        fail(f"{source_id}: officialAudioUrl drift")
    if data.get("sourceRange") != episode.get("range"):
        fail(f"{source_id}: sourceRange drift: {data.get('sourceRange')} != {episode.get('range')}")
    if not SHA_RE.fullmatch(str(data.get("officialAudioSha256") or "")):
        fail(f"{source_id}: invalid officialAudioSha256")
    if not SHA_RE.fullmatch(str(data.get("transcriptSha256") or "")):
        fail(f"{source_id}: invalid transcriptSha256")
    segments = data.get("segments")
    if not isinstance(segments, list) or not segments:
        fail(f"{source_id}: missing segments")
    lines: list[str] = []
    previous_end = -1.0
    for index, segment in enumerate(segments):
        start, end = segment.get("start"), segment.get("end")
        text = " ".join(str(segment.get("text") or "").split()).strip()
        if not isinstance(start, (int, float)) or not isinstance(end, (int, float)) or end < start:
            fail(f"{source_id}: invalid segment timestamps {index}")
        if start + 0.05 < previous_end:
            fail(f"{source_id}: segment overlap {index}")
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
    data["_range"] = parse_range(episode["range"])
    return data


def point_contained(point: tuple[int, int], source_range: tuple[tuple[int, int], tuple[int, int]]) -> bool:
    return source_range[0] <= point <= source_range[1]


def no_gap(prev_end: tuple[int, int], next_start: tuple[int, int]) -> bool:
    # Overlap is always safe.
    if next_start <= prev_end:
        return True
    if next_start[0] == prev_end[0]:
        return next_start[1] <= prev_end[1] + 1
    # Across chapter boundary the next source must begin at verse 1 of the immediately next chapter.
    if next_start[0] == prev_end[0] + 1:
        return next_start[1] == 1
    return False


def coverage_set(episodes: list[dict], start: tuple[int, int], end: tuple[int, int]) -> list[dict]:
    singles = [episode for episode in episodes if episode["_range"][0] <= start and end <= episode["_range"][1]]
    if singles:
        return [min(singles, key=lambda e: (e["wordCount"], e["sourceId"]))]

    candidates: list[list[dict]] = []
    for i, first in enumerate(episodes):
        if not point_contained(start, first["_range"]):
            continue
        selected = [first]
        covered_end = first["_range"][1]
        if end <= covered_end:
            candidates.append(selected)
            continue
        for j in range(i + 1, len(episodes)):
            nxt = episodes[j]
            if not no_gap(covered_end, nxt["_range"][0]):
                break
            selected.append(nxt)
            if nxt["_range"][1] > covered_end:
                covered_end = nxt["_range"][1]
            if end <= covered_end:
                candidates.append(list(selected))
                break
    if not candidates:
        fail(f"no contiguous official transcript set covers {start[0]}:{start[1]}-{end[0]}:{end[1]}")
    return min(candidates, key=lambda items: (len(items), sum(int(x["wordCount"]) for x in items), tuple(x["sourceId"] for x in items)))


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
            "User-Agent": "Emanus-Large-Official-Audio-Semantic-Review/1.0",
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
                parsed = json.loads(raw)
            except Exception:
                begin, finish = raw.find("{"), raw.rfind("}")
                if begin < 0 or finish <= begin:
                    raise
                parsed = json.loads(raw[begin:finish + 1], strict=False)
            if not isinstance(parsed, dict):
                raise RuntimeError("model JSON root is not object")
            return parsed
        except urllib.error.HTTPError as exc:
            body = exc.read().decode("utf-8", errors="replace")
            last = f"HTTP {exc.code}: {body[-1500:]}"
            if exc.code not in (408, 409, 429, 500, 502, 503, 504):
                break
            retry_after = exc.headers.get("Retry-After")
            delay = min(60, int(retry_after)) if retry_after and retry_after.isdigit() else min(60, 3 * attempt * attempt)
            time.sleep(delay)
        except Exception as exc:
            last = repr(exc)
            if attempt < retries:
                time.sleep(min(30, 2 ** attempt))
    fail(f"GitHub Models call failed after {retries} attempts: {last}")


def transcript_block(sources: list[dict]) -> str:
    sections = []
    for index, source in enumerate(sources, 1):
        sections.append(
            f"=== TRANSCRIPT OFICIAL {index}/{len(sources)} ===\n"
            f"SOURCE_ID: {source['sourceId']}\n"
            f"SOURCE_RANGE: {source['sourceRange']}\n"
            f"TRANSCRIPT_SHA: {source['transcriptSha256']}\n"
            f"{source['_text']}"
        )
    return "\n\n".join(sections)


def first_prompt(sources: list[dict], rows: list[dict]) -> str:
    units = [{
        "unitId": row["unitId"], "ref": row["ref"], "heading": row["heading"],
        "teaching": row["teaching"], "forYourHeart": row["forYourHeart"],
    } for row in rows]
    return f'''Ești primul reviewer semantic strict pentru Biblia Emanus NT Explicată. Compară fiecare unitate cu întregul set de TRANSCRIPTURI OFICIALE de mai jos. Setul a fost ales determinist pentru a acoperi complet pasajul, fără gol de versete.

Reguli absolute:
1. Locatorul nu este dovadă semantică. Citește efectiv transcripturile complete.
2. Recuperează toate axele teologice și practice materiale ale sursei care aparțin pasajului; marchează omisiunile și diluarea.
3. Elimină/rescrie afirmații editoriale fără suport, exceptând numai ce este direct evident din pasajul biblic indicat.
4. Nu inventa istorie, greacă, cauze, promisiuni, diagnostice sau aplicații moderne.
5. Reader copy nu poate conține numele autorului modern, organizației sau platformei sursă.
6. `keep` numai dacă textul actual este fidel și suficient. Altfel `rewrite` și livrează revisedTeaching integral.
7. revisedForYourHeart poate fi null dacă aplicația actuală rămâne fidelă; altfel rescrie-o direct și pastoral.
8. Nu dilua o afirmație distinctivă a sursei din motive de ton.

Returnează numai JSON valid: {{"units":[{{"unitId":"...","assessment":"keep|rewrite","rationale":"...","unsupportedClaims":[],"materialOmissions":[],"revisedTeaching":"... sau null","revisedForYourHeart":"... sau null"}}]}}.

TRANSCRIPTURI:
{transcript_block(sources)}

UNITĂȚI:
{json.dumps(units, ensure_ascii=False)}'''


def verify_prompt(sources: list[dict], rows: list[dict], first: dict) -> str:
    units = [{
        "unitId": row["unitId"], "ref": row["ref"], "heading": row["heading"],
        "teaching": row["teaching"], "forYourHeart": row["forYourHeart"],
    } for row in rows]
    return f'''Ești al doilea reviewer independent, fail-closed. Verifică primul review propoziție-cu-propoziție față de același set complet de transcripturi oficiale. Nu aproba dacă o axă materială este omisă/diluată, dacă rămâne o afirmație fără suport, dacă apare o invenție sau dacă reader copy atribuie sursa modernă.

Returnează numai JSON valid: {{"units":[{{"unitId":"...","finalAction":"keep|rewrite|reject","rationale":"...","problems":[],"revisedTeaching":"... sau null","revisedForYourHeart":"... sau null"}}]}}. `problems` trebuie să fie [] pentru aprobare.

TRANSCRIPTURI:
{transcript_block(sources)}

UNITĂȚI:
{json.dumps(units, ensure_ascii=False)}

PRIMUL REVIEW:
{json.dumps(first, ensure_ascii=False)}'''


def evidence(source: dict, ref: str, coverage_ids: list[str]) -> dict:
    payload = {
        "officialSourceUrl": source["officialSourceUrl"],
        "transcriptSourceUrl": source["officialAudioUrl"],
        "sourceRange": f"{ref}; exact persisted official audio transcript {source['sourceId']}; {source['sourceRange']}; coverage set {','.join(coverage_ids)}",
        "transcriptSha256": source["transcriptSha256"],
    }
    return {
        **payload,
        "evidenceSha256": sha(canonical(payload)),
        "officialAudioSha256": source["officialAudioSha256"],
        "transcriptionModel": source.get("transcriptionModel"),
        "wordCount": source["wordCount"],
        "sourceId": source["sourceId"],
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--book", required=True, choices=["luca", "ioan", "fapte"])
    parser.add_argument("--primary-source-id", required=True)
    parser.add_argument("--output", required=True, type=Path)
    parser.add_argument("--reviewed-on", default="2026-08-11")
    args = parser.parse_args()

    manifest = load(MANIFEST)
    if manifest.get("schema") != "emanus-nt-official-audio-semantic-source-manifest-v1":
        fail("unexpected source manifest schema")
    book_manifest = manifest.get("books", {}).get(args.book)
    if not isinstance(book_manifest, dict):
        fail(f"manifest missing book {args.book}")
    episode_specs = book_manifest.get("episodes", [])
    if args.primary_source_id not in {episode.get("id") for episode in episode_specs}:
        fail(f"{args.primary_source_id}: not a source in {args.book} manifest")
    episodes = [validate_transcript(args.book, book_manifest["canonicalPage"], episode) for episode in episode_specs]
    by_source = {episode["sourceId"]: episode for episode in episodes}
    book = find_book(args.book)

    rows: list[dict] = []
    all_units = 0
    for chapter in book.get("chapters", []):
        for unit in chapter.get("units", []):
            all_units += 1
            start = (int(chapter["number"]), int(unit.get("verseStart") or 0))
            end = (int(chapter["number"]), int(unit.get("verseEnd") or 0))
            if start[1] <= 0 or end[1] <= 0 or end < start:
                fail(f"{unit.get('id')}: invalid passage coordinates")
            sources = coverage_set(episodes, start, end)
            if sources[0]["sourceId"] != args.primary_source_id:
                continue
            rows.append({
                "bookId": args.book,
                "chapter": int(chapter["number"]),
                "unitId": str(unit["id"]),
                "ref": str(unit.get("ref") or ""),
                "heading": str(unit.get("heading") or ""),
                "teaching": str(unit.get("teaching") or ""),
                "forYourHeart": unit.get("forYourHeart"),
                "unit": unit,
                "preEditSnapshotSha256": snapshot_sha(unit),
                "sources": sources,
            })
    if all_units != int(book_manifest["unitCount"]):
        fail(f"{args.book}: manifest expects {book_manifest['unitCount']} units, corpus has {all_units}")

    decisions: list[dict] = []
    groups: dict[tuple[str, ...], list[dict]] = {}
    for row in rows:
        key = tuple(source["sourceId"] for source in row["sources"])
        groups.setdefault(key, []).append(row)

    for coverage_ids, group in groups.items():
        sources = [by_source[source_id] for source_id in coverage_ids]
        for offset in range(0, len(group), BATCH):
            batch = group[offset:offset + BATCH]
            first = call_model(first_prompt(sources, batch))
            first_map = {item.get("unitId"): item for item in first.get("units", []) if isinstance(item, dict)}
            expected = {row["unitId"] for row in batch}
            if set(first_map) != expected:
                fail(f"{args.primary_source_id}: first reviewer unit set mismatch: {set(first_map)} != {expected}")
            second = call_model(verify_prompt(sources, batch, first))
            second_map = {item.get("unitId"): item for item in second.get("units", []) if isinstance(item, dict)}
            if set(second_map) != expected:
                fail(f"{args.primary_source_id}: verifier unit set mismatch")
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
                final_heart = row["forYourHeart"]
                has_heart = False
                if action == "rewrite":
                    teaching = str(result.get("revisedTeaching") or "").strip()
                    if len(teaching) < 120:
                        fail(f"{row['unitId']}: revisedTeaching too short")
                    if FORBIDDEN_READER.search(teaching):
                        fail(f"{row['unitId']}: source attribution leaked into teaching")
                    if "revisedForYourHeart" in result and result.get("revisedForYourHeart") is not None:
                        has_heart = True
                        final_heart = str(result.get("revisedForYourHeart") or "").strip()
                        if final_heart and FORBIDDEN_READER.search(final_heart):
                            fail(f"{row['unitId']}: source attribution leaked into forYourHeart")
                reviewed_hash = snapshot_sha(row["unit"], teaching, has_heart, final_heart)
                coverage_list = list(coverage_ids)
                decision = {
                    "bookId": args.book,
                    "chapter": row["chapter"],
                    "unitId": row["unitId"],
                    "status": "approved-against-transcript",
                    "action": action,
                    "reviewedPreEditSnapshotSha256": row["preEditSnapshotSha256"],
                    "reviewedTeachingSha256": reviewed_hash,
                    "transcriptEvidence": [evidence(source, row["ref"], coverage_list) for source in sources],
                    "rationale": rationale,
                    "reviewer": f"two-pass sharded GitHub Models semantic review against exact persisted official audio transcripts ({MODEL})",
                    "reviewedOn": args.reviewed_on,
                }
                if action == "rewrite":
                    decision["revisedTeaching"] = teaching
                    if has_heart:
                        decision["revisedForYourHeart"] = final_heart
                decisions.append(decision)
                print(f"SEMANTIC {args.book} {row['unitId']} {action} coverage={','.join(coverage_ids)}", flush=True)

    fragment = {
        "schema": "emanus-nt-semantic-review-fragment-v1",
        "bookId": args.book,
        "primarySourceId": args.primary_source_id,
        "reviewMode": "two-pass-sharded-exact-persisted-official-audio-transcripts",
        "assignedUnits": len(rows),
        "decisions": sorted(decisions, key=lambda d: (d["chapter"], d["unitId"])),
    }
    if len(decisions) != len(rows):
        fail(f"{args.primary_source_id}: reviewed {len(decisions)}/{len(rows)} assigned units")
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(fragment, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{args.book}/{args.primary_source_id}: {len(decisions)} decisions persisted in fragment.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
