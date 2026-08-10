#!/usr/bin/env python3
from __future__ import annotations

import argparse
import hashlib
import html
import json
import os
import re
import subprocess
import time
import urllib.request
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs/data/biblia-explicata"
CORPUS = DATA / "nt-final-source-first"
EVIDENCE = DATA / "nt-source-evidence.json"
MODEL = os.environ.get("NT_SEMANTIC_COPILOT_MODEL", "auto")
TIMEOUT = int(os.environ.get("NT_SEMANTIC_COPILOT_TIMEOUT", "300"))
BATCH = int(os.environ.get("NT_SEMANTIC_BATCH_SIZE", "4"))

FORBIDDEN_READER = re.compile(r"\b(?:Poonen|CFC|SermonIndex)\b", re.I)


def sha256(text: str) -> str:
    return "sha256:" + hashlib.sha256(text.encode("utf-8")).hexdigest()


def stable_snapshot(unit: dict[str, Any], teaching: str | None = None, heart: Any = ...) -> str:
    if teaching is None:
        teaching = str(unit.get("teaching") or "")
    if heart is ...:
        heart = unit.get("forYourHeart")
    return json.dumps(
        {
            "heading": str(unit.get("heading") or ""),
            "teaching": str(teaching or ""),
            "forYourHeart": str(heart or ""),
        },
        ensure_ascii=False,
        separators=(",", ":"),
    )


def extract_json(text: str) -> dict[str, Any]:
    value = text.strip()
    value = re.sub(r"^```(?:json)?\s*", "", value)
    value = re.sub(r"\s*```$", "", value)
    try:
        parsed = json.loads(value)
        if isinstance(parsed, dict):
            return parsed
    except Exception:
        pass
    start, end = value.find("{"), value.rfind("}")
    if start >= 0 and end > start:
        candidate = value[start : end + 1]
        # Repair raw control characters occasionally emitted inside JSON strings.
        candidate = "".join(ch if ord(ch) >= 32 or ch in "\n\r\t" else " " for ch in candidate)
        try:
            parsed = json.loads(candidate, strict=False)
            if isinstance(parsed, dict):
                return parsed
        except Exception as exc:
            raise RuntimeError(f"invalid JSON from Copilot: {exc}; tail={value[-1600:]}") from exc
    raise RuntimeError(f"Copilot did not return a JSON object; tail={value[-1600:]}")


def call_copilot(prompt: str, retries: int = 3) -> dict[str, Any]:
    token = os.environ.get("GITHUB_TOKEN")
    if not token:
        raise RuntimeError("GITHUB_TOKEN missing")
    env = os.environ.copy()
    env["GITHUB_TOKEN"] = token
    env["COPILOT_GITHUB_TOKEN"] = token
    env["NO_COLOR"] = "1"
    command = [
        "copilot", "-p", prompt, "-s", "--no-ask-user", "--no-custom-instructions",
        "--no-auto-update", "--no-remote", "--model", MODEL,
        "--deny-tool=shell", "--deny-tool=write", "--log-level", "error",
    ]
    last = "unknown"
    for attempt in range(1, retries + 1):
        try:
            proc = subprocess.run(command, cwd=ROOT, env=env, text=True, capture_output=True, timeout=TIMEOUT)
            if proc.returncode == 0:
                return extract_json(proc.stdout)
            last = f"exit={proc.returncode}; stderr={proc.stderr[-2500:]}"
        except subprocess.TimeoutExpired:
            last = f"timeout={TIMEOUT}s"
        except Exception as exc:
            last = repr(exc)
        if attempt < retries:
            time.sleep(min(12, 2**attempt))
    raise RuntimeError(f"Copilot semantic review failed after {retries} attempts: {last}")


def visible_text_from_html(raw: str) -> str:
    # Remove scripts/styles before stripping tags. SermonIndex server-renders transcript text.
    raw = re.sub(r"<script\b[^>]*>.*?</script>", " ", raw, flags=re.I | re.S)
    raw = re.sub(r"<style\b[^>]*>.*?</style>", " ", raw, flags=re.I | re.S)
    raw = re.sub(r"<br\s*/?>", "\n", raw, flags=re.I)
    raw = re.sub(r"</(?:p|div|li|h[1-6]|section|article)>", "\n", raw, flags=re.I)
    raw = re.sub(r"<[^>]+>", " ", raw)
    raw = html.unescape(raw).replace("\xa0", " ")
    lines = [re.sub(r"\s+", " ", line).strip() for line in raw.splitlines()]
    return "\n".join(line for line in lines if line)


def extract_transcript(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": "Emanus-Editorial-Research/1.0"})
    with urllib.request.urlopen(req, timeout=60) as res:
        raw = res.read().decode("utf-8", errors="replace")
    text = visible_text_from_html(raw)
    markers = ["Full Transcript", "## Full Transcript"]
    start = -1
    for marker in markers:
        start = text.find(marker)
        if start >= 0:
            start += len(marker)
            break
    if start < 0:
        raise RuntimeError(f"transcript marker missing: {url}")
    tail = text[start:].lstrip("\n ")
    ends = []
    for marker in ["Sermon Outline", "Key Quotes", "Application Points", "Frequently Asked Questions", "Citation Web Link", "Downloads", "Topics"]:
        idx = tail.find("\n" + marker)
        if idx >= 0:
            ends.append(idx)
    if ends:
        tail = tail[: min(ends)]
    tail = re.sub(r"\n{3,}", "\n\n", tail).strip()
    if len(tail.split()) < 250:
        raise RuntimeError(f"transcript too short ({len(tail.split())} words): {url}")
    return tail


def transcript_url(url: str) -> bool:
    return bool(re.search(r"sermonindex\.net/speakers/zac-poonen/", url or "", re.I))


def get_book(book_id: str) -> dict[str, Any]:
    for p in sorted(CORPUS.glob("*.json")):
        data = json.loads(p.read_text(encoding="utf-8"))
        if data.get("id") == book_id:
            return data
    raise RuntimeError(f"book not found: {book_id}")


def load_rows(book_id: str) -> tuple[list[dict[str, Any]], dict[str, dict[str, Any]]]:
    book = get_book(book_id)
    evidence = json.loads(EVIDENCE.read_text(encoding="utf-8"))
    by_id = {str(x.get("id")): x for x in evidence.get("records", [])}
    rows: list[dict[str, Any]] = []
    for chapter in book.get("chapters", []):
        for unit in chapter.get("units", []):
            if unit.get("sourceFidelity", {}).get("reviewState") == "reviewed-against-raw-transcript":
                continue
            recs = [by_id.get(str(a.get("evidenceId"))) for a in unit.get("sourceAnchors", [])]
            recs = [r for r in recs if isinstance(r, dict)]
            transcript_recs = [r for r in recs if transcript_url(str(r.get("sourceUrl") or ""))]
            if not transcript_recs:
                continue
            rows.append(
                {
                    "bookId": book_id,
                    "chapter": chapter["number"],
                    "unitId": unit["id"],
                    "ref": unit["ref"],
                    "heading": unit.get("heading", ""),
                    "text": unit.get("text", ""),
                    "teaching": unit.get("teaching", ""),
                    "forYourHeart": unit.get("forYourHeart"),
                    "sourceFidelity": unit.get("sourceFidelity", {}),
                    "transcriptRecords": transcript_recs,
                }
            )
    return rows, by_id


def source_bundle(row: dict[str, Any], cache: dict[str, str]) -> tuple[str, list[dict[str, Any]]]:
    sections: list[str] = []
    evidence_out: list[dict[str, Any]] = []
    seen: set[str] = set()
    for record in row["transcriptRecords"]:
        url = str(record["sourceUrl"])
        if url in seen:
            continue
        seen.add(url)
        if url not in cache:
            cache[url] = extract_transcript(url)
        transcript = cache[url]
        sections.append(f"=== TRANSCRIPT SOURCE {len(sections)+1} ===\nURL: {url}\nLOCATOR: {record.get('locator','')}\n{transcript}")
        official = str(record.get("officialSeriesUrl") or "")
        if not official.startswith("https://"):
            # A CFC source URL can itself be the official source; otherwise fail closed.
            src = str(record.get("sourceUrl") or "")
            official = src if "cfcindia" in src and src.startswith("https://") else ""
        if not official:
            raise RuntimeError(f"{row['unitId']}: transcript record lacks officialSeriesUrl")
        transcript_hash = sha256(transcript)
        evidence_payload = json.dumps(
            {"officialSourceUrl": official, "transcriptSourceUrl": url, "sourceRange": str(record.get("locator") or row["ref"]), "transcriptSha256": transcript_hash},
            ensure_ascii=False, sort_keys=True, separators=(",", ":"),
        )
        evidence_out.append(
            {
                "officialSourceUrl": official,
                "transcriptSourceUrl": url,
                "sourceRange": str(record.get("locator") or row["ref"]),
                "transcriptSha256": transcript_hash,
                "evidenceSha256": sha256(evidence_payload),
            }
        )
    return "\n\n".join(sections), evidence_out


def prompt_review(transcripts: str, rows: list[dict[str, Any]]) -> str:
    compact = [
        {k: row.get(k) for k in ["unitId", "ref", "heading", "text", "teaching", "forYourHeart", "sourceFidelity"]}
        for row in rows
    ]
    return f'''Ești reviewer editorial strict pentru Biblia Emanus NT Explicată.

REGULA SUPREMĂ:
- transcriptul de mai jos reprezintă conținutul sursei Poonen pentru pasaj; pagina CFC oficială este autoritatea de atribuire, transcriptul mirror este doar reprezentarea textuală;
- compară semantic fiecare afirmație doctrinară/expozitivă din `teaching` și aplicația din `forYourHeart` cu transcriptul;
- nu aproba doar fiindcă există locator/range sau pentru că textul "sună biblic";
- o observație absentă din transcript poate rămâne doar dacă este direct și evident susținută de textul biblic furnizat ca `text`; marcheaz-o `canonical-exegesis` în `supplementalResearch`;
- afirmațiile istorice/lexicale care nu sunt în transcript și nu pot fi demonstrate din textul biblic trebuie eliminate din teaching sau păstrate numai dacă metadata existentă le documentează separat;
- păstrează doctrina distinctivă a sursei; semnalează omisiunile materiale ale ideilor pe care transcriptul le dezvoltă pentru pasaj;
- nu introduce numele Poonen/CFC/SermonIndex în reader copy;
- nu modifica `text` biblic;
- nu dilua doctrina ca să fie neutră.

Pentru fiecare unitate întoarce EXACT un obiect JSON în `units`:
- `unitId`
- `assessment`: `keep` sau `rewrite`
- `rationale`: explicație scurtă, concretă, despre suportul semantic
- `unsupportedClaims`: listă
- `materialOmissions`: listă
- `supplementalResearch`: listă de obiecte {{"kind":"canonical-exegesis","claim":"...","basis":"..."}} numai pentru completări legitime care nu vin din transcript
- dacă `rewrite`: `revisedTeaching` complet și `revisedForYourHeart` (string sau null); rescrierea trebuie să fie în română curată și reader-facing, fără nume de sursă.

Nu cita transcriptul lung. În rationale descrie ideile prin parafrază. Nu folosi markdown. Returnează JSON valid.

TRANSCRIPT(E):
{transcripts}

UNITĂȚI:
{json.dumps(compact, ensure_ascii=False)}
'''


def prompt_verify(transcripts: str, rows: list[dict[str, Any]], first: dict[str, Any]) -> str:
    compact = [{k: row.get(k) for k in ["unitId", "ref", "heading", "text", "teaching", "forYourHeart"]} for row in rows]
    return f'''Ești al doilea reviewer independent. Verifică verdictul primului reviewer împotriva transcriptului integral furnizat.

Cerințe:
- nu valida pe baza locatorului; citește semantic transcriptul;
- fiecare afirmație expozitivă păstrată trebuie susținută de transcript sau, doar dacă este direct evidentă din textul biblic al unității, clasificată ca `canonical-exegesis`;
- dacă primul reviewer a propus rewrite, verifică exact rescrierea;
- dacă a omis o doctrină/aplicație materială pe care sursa o dezvoltă în pasaj, repară;
- reader copy nu conține nume moderne de surse;
- nu inventa context istoric sau sensuri grecești;
- răspuns JSON valid, fără markdown.

Întoarce `units`, câte un obiect per unitate:
- `unitId`
- `finalAction`: `keep`, `rewrite` sau `reject`
- `rationale`
- `revisedTeaching` și `revisedForYourHeart` numai pentru rewrite
- `supplementalResearch` listă
- `problems` listă; trebuie goală pentru keep/rewrite aprobat.

TRANSCRIPT(E):
{transcripts}

UNITĂȚI CURENTE:
{json.dumps(compact, ensure_ascii=False)}

PRIMUL REVIEW:
{json.dumps(first, ensure_ascii=False)}
'''


def validate_reader(text: str, unit_id: str) -> None:
    if FORBIDDEN_READER.search(text):
        raise RuntimeError(f"{unit_id}: source name leaked into reader copy")
    if len(text.strip()) < 80:
        raise RuntimeError(f"{unit_id}: revisedTeaching too short")


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--book", required=True)
    ap.add_argument("--output", required=True, type=Path)
    ap.add_argument("--reviewed-on", default="2026-08-10")
    args = ap.parse_args()
    rows, _ = load_rows(args.book)
    if not rows:
        args.output.write_text(json.dumps({"schema":"emanus-nt-semantic-review-book-v1","bookId":args.book,"decisions":[],"unaddressable":True}, indent=2)+"\n", encoding="utf-8")
        print(f"semantic review {args.book}: no transcript-addressable units")
        return 0

    # Group units by exact transcript URL set so each prompt reads the relevant complete source only.
    groups: dict[tuple[str, ...], list[dict[str, Any]]] = {}
    for row in rows:
        key = tuple(sorted({str(r["sourceUrl"]) for r in row["transcriptRecords"]}))
        groups.setdefault(key, []).append(row)

    transcript_cache: dict[str, str] = {}
    decisions: list[dict[str, Any]] = []
    for key, group_rows in groups.items():
        for offset in range(0, len(group_rows), BATCH):
            batch = group_rows[offset : offset + BATCH]
            # Build the transcript bundle using first row; group key guarantees same transcript set.
            transcripts, _ = source_bundle(batch[0], transcript_cache)
            first = call_copilot(prompt_review(transcripts, batch))
            first_items = {x.get("unitId"): x for x in first.get("units", []) if isinstance(x, dict)}
            if set(first_items) != {row["unitId"] for row in batch}:
                raise RuntimeError(f"{args.book}: first reviewer returned wrong unit set")
            second = call_copilot(prompt_verify(transcripts, batch, first))
            second_items = {x.get("unitId"): x for x in second.get("units", []) if isinstance(x, dict)}
            if set(second_items) != {row["unitId"] for row in batch}:
                raise RuntimeError(f"{args.book}: verifier returned wrong unit set")

            for row in batch:
                verdict = second_items[row["unitId"]]
                action = verdict.get("finalAction")
                problems = verdict.get("problems") or []
                if action == "reject" or problems:
                    raise RuntimeError(f"{row['unitId']}: verifier rejected semantic fidelity: {problems or verdict.get('rationale')}")
                if action not in ("keep", "rewrite"):
                    raise RuntimeError(f"{row['unitId']}: invalid finalAction {action}")
                evidence: list[dict[str, Any]] = []
                for rec in row["transcriptRecords"]:
                    url = str(rec["sourceUrl"])
                    transcript = transcript_cache[url]
                    official = str(rec.get("officialSeriesUrl") or "")
                    if not official.startswith("https://"):
                        raise RuntimeError(f"{row['unitId']}: officialSeriesUrl missing")
                    t_hash = sha256(transcript)
                    ep = json.dumps({"officialSourceUrl":official,"transcriptSourceUrl":url,"sourceRange":str(rec.get("locator") or row["ref"]),"transcriptSha256":t_hash}, ensure_ascii=False, sort_keys=True, separators=(",",":"))
                    evidence.append({"officialSourceUrl":official,"transcriptSourceUrl":url,"sourceRange":str(rec.get("locator") or row["ref"]),"transcriptSha256":t_hash,"evidenceSha256":sha256(ep)})

                teaching = row["teaching"]
                heart = row.get("forYourHeart")
                decision: dict[str, Any] = {
                    "bookId": row["bookId"], "chapter": row["chapter"], "unitId": row["unitId"],
                    "status": "approved-against-transcript", "action": action,
                    "transcriptEvidence": evidence,
                    "rationale": str(verdict.get("rationale") or "").strip(),
                    "reviewer": f"two-pass GitHub Copilot CLI semantic review ({MODEL})",
                    "reviewedOn": args.reviewed_on,
                    "supplementalResearch": verdict.get("supplementalResearch") or [],
                }
                if not decision["rationale"]:
                    raise RuntimeError(f"{row['unitId']}: empty rationale")
                if action == "rewrite":
                    teaching = str(verdict.get("revisedTeaching") or "").strip()
                    heart = verdict.get("revisedForYourHeart")
                    validate_reader(teaching, row["unitId"])
                    if heart:
                        validate_reader(str(heart), row["unitId"])
                    decision["revisedTeaching"] = teaching
                    decision["revisedForYourHeart"] = heart
                decision["reviewedTeachingSha256"] = sha256(stable_snapshot(row, teaching, heart))
                decisions.append(decision)
            print(f"semantic review {args.book}: {min(offset+BATCH,len(group_rows))}/{len(group_rows)} in transcript group", flush=True)

    out = {
        "schema": "emanus-nt-semantic-review-book-v1",
        "bookId": args.book,
        "reviewerPolicy": "two-pass semantic review against complete transcript representation; no locator-only approval",
        "decisions": decisions,
        "addressedUnits": len(decisions),
    }
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(out, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"semantic review {args.book}: {len(decisions)} decisions")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
