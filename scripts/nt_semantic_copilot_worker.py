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
LEDGER = DATA / "nt-semantic-review-ledger.json"
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
        {"heading": str(unit.get("heading") or ""), "teaching": str(teaching or ""), "forYourHeart": str(heart or "")},
        ensure_ascii=False, separators=(",", ":"),
    )


def extract_json(text: str) -> dict[str, Any]:
    value = text.strip()
    value = re.sub(r"^```(?:json)?\s*", "", value)
    value = re.sub(r"\s*```$", "", value)
    try:
        parsed = json.loads(value)
        if isinstance(parsed, dict): return parsed
    except Exception:
        pass
    start, end = value.find("{"), value.rfind("}")
    if start >= 0 and end > start:
        candidate = "".join(ch if ord(ch) >= 32 or ch in "\n\r\t" else " " for ch in value[start:end+1])
        try:
            parsed = json.loads(candidate, strict=False)
            if isinstance(parsed, dict): return parsed
        except Exception as exc:
            raise RuntimeError(f"invalid JSON from Copilot: {exc}; tail={value[-1600:]}") from exc
    raise RuntimeError(f"Copilot did not return a JSON object; tail={value[-1600:]}")


def call_copilot(prompt: str, retries: int = 3) -> dict[str, Any]:
    token = os.environ.get("GITHUB_TOKEN")
    if not token: raise RuntimeError("GITHUB_TOKEN missing")
    env = os.environ.copy()
    env.update({"GITHUB_TOKEN": token, "COPILOT_GITHUB_TOKEN": token, "NO_COLOR": "1"})
    command = ["copilot", "-p", prompt, "-s", "--no-ask-user", "--no-custom-instructions", "--no-auto-update", "--no-remote", "--model", MODEL, "--deny-tool=shell", "--deny-tool=write", "--log-level", "error"]
    last = "unknown"
    for attempt in range(1, retries + 1):
        try:
            proc = subprocess.run(command, cwd=ROOT, env=env, text=True, capture_output=True, timeout=TIMEOUT)
            if proc.returncode == 0: return extract_json(proc.stdout)
            last = f"exit={proc.returncode}; stderr={proc.stderr[-2500:]}"
        except subprocess.TimeoutExpired:
            last = f"timeout={TIMEOUT}s"
        except Exception as exc:
            last = repr(exc)
        if attempt < retries: time.sleep(min(12, 2**attempt))
    raise RuntimeError(f"Copilot semantic review failed after {retries} attempts: {last}")


def visible_text_from_html(raw: str) -> str:
    raw = re.sub(r"<script\b[^>]*>.*?</script>", " ", raw, flags=re.I|re.S)
    raw = re.sub(r"<style\b[^>]*>.*?</style>", " ", raw, flags=re.I|re.S)
    raw = re.sub(r"<br\s*/?>", "\n", raw, flags=re.I)
    raw = re.sub(r"</(?:p|div|li|h[1-6]|section|article)>", "\n", raw, flags=re.I)
    raw = re.sub(r"<[^>]+>", " ", raw)
    raw = html.unescape(raw).replace("\xa0", " ")
    return "\n".join(line for line in (re.sub(r"\s+", " ", line).strip() for line in raw.splitlines()) if line)


def extract_transcript(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent":"Emanus-Editorial-Research/1.0"})
    with urllib.request.urlopen(req, timeout=60) as res:
        text = visible_text_from_html(res.read().decode("utf-8", errors="replace"))
    start = -1
    for marker in ["Full Transcript", "## Full Transcript"]:
        start = text.find(marker)
        if start >= 0:
            start += len(marker); break
    if start < 0: raise RuntimeError(f"transcript marker missing: {url}")
    tail = text[start:].lstrip("\n ")
    ends = []
    for marker in ["Sermon Outline","Key Quotes","Application Points","Frequently Asked Questions","Citation Web Link","Downloads","Topics"]:
        idx = tail.find("\n"+marker)
        if idx >= 0: ends.append(idx)
    if ends: tail = tail[:min(ends)]
    tail = re.sub(r"\n{3,}", "\n\n", tail).strip()
    if len(tail.split()) < 250: raise RuntimeError(f"transcript too short ({len(tail.split())} words): {url}")
    return tail


def transcript_url(url: str) -> bool:
    return bool(re.search(r"sermonindex\.net/speakers/zac-poonen/", url or "", re.I))


def existing_review_keys() -> set[tuple[str,int,str]]:
    if not LEDGER.exists(): return set()
    data = json.loads(LEDGER.read_text(encoding="utf-8"))
    if data.get("schema") != "emanus-nt-semantic-review-ledger-v1": raise RuntimeError("unexpected semantic ledger schema")
    return {(str(d["bookId"]), int(d["chapter"]), str(d["unitId"])) for d in data.get("decisions", [])}


def get_book(book_id: str) -> dict[str, Any]:
    for p in sorted(CORPUS.glob("*.json")):
        data = json.loads(p.read_text(encoding="utf-8"))
        if data.get("id") == book_id: return data
    raise RuntimeError(f"book not found: {book_id}")


def load_rows(book_id: str) -> list[dict[str, Any]]:
    book = get_book(book_id)
    evidence = json.loads(EVIDENCE.read_text(encoding="utf-8"))
    by_id = {str(x.get("id")): x for x in evidence.get("records", [])}
    frozen = existing_review_keys()
    rows: list[dict[str, Any]] = []
    for chapter in book.get("chapters", []):
        for unit in chapter.get("units", []):
            key = (book_id, int(chapter["number"]), str(unit["id"]))
            if key in frozen or unit.get("sourceFidelity",{}).get("reviewState") == "reviewed-against-raw-transcript": continue
            recs = [by_id.get(str(a.get("evidenceId"))) for a in unit.get("sourceAnchors", [])]
            transcript_recs = [r for r in recs if isinstance(r,dict) and transcript_url(str(r.get("sourceUrl") or ""))]
            if not transcript_recs: continue
            rows.append({"bookId":book_id,"chapter":chapter["number"],"unitId":unit["id"],"ref":unit["ref"],"heading":unit.get("heading",""),"text":unit.get("text",""),"teaching":unit.get("teaching",""),"forYourHeart":unit.get("forYourHeart"),"sourceFidelity":unit.get("sourceFidelity",{}),"transcriptRecords":transcript_recs})
    return rows


def build_transcripts(records: list[dict[str,Any]], cache: dict[str,str]) -> tuple[str,list[dict[str,Any]]]:
    sections=[]; evidence=[]; seen=set()
    for rec in records:
        url=str(rec["sourceUrl"])
        if url in seen: continue
        seen.add(url)
        if url not in cache: cache[url]=extract_transcript(url)
        transcript=cache[url]
        sections.append(f"=== TRANSCRIPT SOURCE {len(sections)+1} ===\nURL: {url}\nLOCATOR: {rec.get('locator','')}\n{transcript}")
        official=str(rec.get("officialSeriesUrl") or "")
        if not official.startswith("https://"): raise RuntimeError(f"transcript record lacks officialSeriesUrl: {url}")
        th=sha256(transcript)
        payload=json.dumps({"officialSourceUrl":official,"transcriptSourceUrl":url,"sourceRange":str(rec.get("locator") or ""),"transcriptSha256":th},ensure_ascii=False,sort_keys=True,separators=(",",":"))
        evidence.append({"officialSourceUrl":official,"transcriptSourceUrl":url,"sourceRange":str(rec.get("locator") or ""),"transcriptSha256":th,"evidenceSha256":sha256(payload)})
    return "\n\n".join(sections),evidence


def review_prompt(transcripts: str, rows: list[dict[str,Any]]) -> str:
    units=[{k:r.get(k) for k in ["unitId","ref","heading","text","teaching","forYourHeart","sourceFidelity"]} for r in rows]
    return f'''Ești primul reviewer editorial strict pentru Biblia Emanus NT Explicată. Compară semantic fiecare unitate cu TRANSCRIPTUL COMPLET.
REGULI: transcriptul reprezintă sursa Poonen; CFC oficial rămâne autoritatea de atribuire. Nu aproba locator-only. Păstrează doctrina distinctivă a sursei și detectează omisiunile materiale. O afirmație absentă din transcript poate rămâne numai dacă este direct evidentă din textul biblic furnizat și atunci o marchezi în supplementalResearch ca canonical-exegesis. Nu inventa istorie/greacă. Nu pune nume moderne de surse în reader copy. Nu modifica textul biblic.
Returnează JSON valid {{"units":[...]}}. Fiecare: unitId, assessment keep|rewrite, rationale, unsupportedClaims[], materialOmissions[], supplementalResearch[], iar la rewrite revisedTeaching complet și revisedForYourHeart string|null. Fără markdown, fără citate lungi.
TRANSCRIPT:\n{transcripts}\nUNITĂȚI:\n{json.dumps(units,ensure_ascii=False)}'''


def verify_prompt(transcripts: str, rows: list[dict[str,Any]], first: dict[str,Any]) -> str:
    units=[{k:r.get(k) for k in ["unitId","ref","heading","text","teaching","forYourHeart"]} for r in rows]
    return f'''Ești al doilea reviewer independent. Verifică verdictul primului reviewer semantic împotriva TRANSCRIPTULUI COMPLET, nu împotriva locatorului. Corectează orice doctrină a sursei omisă, afirmație fără suport sau rescriere care diluează sursa. Canonical-exegesis este permis numai dacă este evident din textul biblic dat. Nu inventa istorie/lexic. Reader copy fără nume moderne de surse.
Returnează JSON valid {{"units":[...]}}. Fiecare: unitId, finalAction keep|rewrite|reject, rationale, problems[], supplementalResearch[], și revisedTeaching/revisedForYourHeart la rewrite. problems trebuie gol pentru aprobare.
TRANSCRIPT:\n{transcripts}\nUNITĂȚI:\n{json.dumps(units,ensure_ascii=False)}\nPRIMUL REVIEW:\n{json.dumps(first,ensure_ascii=False)}'''


def validate_reader(text: str, unit_id: str) -> None:
    if FORBIDDEN_READER.search(text): raise RuntimeError(f"{unit_id}: source name leaked")
    if len(text.strip()) < 80: raise RuntimeError(f"{unit_id}: revisedTeaching too short")


def main() -> int:
    ap=argparse.ArgumentParser(); ap.add_argument("--book",required=True); ap.add_argument("--output",required=True,type=Path); ap.add_argument("--reviewed-on",default="2026-08-10"); args=ap.parse_args()
    rows=load_rows(args.book)
    if not rows:
        args.output.parent.mkdir(parents=True,exist_ok=True); args.output.write_text(json.dumps({"schema":"emanus-nt-semantic-review-book-v1","bookId":args.book,"decisions":[],"alreadyReviewedOrUnaddressable":True},indent=2)+"\n",encoding="utf-8"); print(f"semantic review {args.book}: nothing new"); return 0
    groups: dict[tuple[str,...],list[dict[str,Any]]]={}
    for row in rows:
        key=tuple(sorted({str(r["sourceUrl"]) for r in row["transcriptRecords"]})); groups.setdefault(key,[]).append(row)
    cache: dict[str,str]={}; decisions=[]
    for _, group in groups.items():
        transcripts,evidence=build_transcripts(group[0]["transcriptRecords"],cache)
        for offset in range(0,len(group),BATCH):
            batch=group[offset:offset+BATCH]
            first=call_copilot(review_prompt(transcripts,batch)); fi={x.get("unitId"):x for x in first.get("units",[]) if isinstance(x,dict)}
            expected={r["unitId"] for r in batch}
            if set(fi)!=expected: raise RuntimeError(f"{args.book}: first reviewer wrong unit set {set(fi)} != {expected}")
            second=call_copilot(verify_prompt(transcripts,batch,first)); si={x.get("unitId"):x for x in second.get("units",[]) if isinstance(x,dict)}
            if set(si)!=expected: raise RuntimeError(f"{args.book}: verifier wrong unit set")
            for row in batch:
                v=si[row["unitId"]]; action=v.get("finalAction"); problems=v.get("problems") or []
                if action=="reject" or problems: raise RuntimeError(f"{row['unitId']}: verifier rejected: {problems or v.get('rationale')}")
                if action not in ("keep","rewrite"): raise RuntimeError(f"{row['unitId']}: bad action {action}")
                teaching=row["teaching"]; heart=row.get("forYourHeart")
                d={"bookId":row["bookId"],"chapter":row["chapter"],"unitId":row["unitId"],"status":"approved-against-transcript","action":action,"transcriptEvidence":evidence,"rationale":str(v.get("rationale") or "").strip(),"reviewer":f"two-pass GitHub Copilot CLI semantic review ({MODEL})","reviewedOn":args.reviewed_on,"supplementalResearch":v.get("supplementalResearch") or []}
                if not d["rationale"]: raise RuntimeError(f"{row['unitId']}: empty rationale")
                if action=="rewrite":
                    teaching=str(v.get("revisedTeaching") or "").strip(); heart=v.get("revisedForYourHeart"); validate_reader(teaching,row["unitId"])
                    if heart: validate_reader(str(heart),row["unitId"])
                    d["revisedTeaching"]=teaching; d["revisedForYourHeart"]=heart
                d["reviewedTeachingSha256"]=sha256(stable_snapshot(row,teaching,heart)); decisions.append(d)
            print(f"semantic review {args.book}: {min(offset+BATCH,len(group))}/{len(group)}",flush=True)
    out={"schema":"emanus-nt-semantic-review-book-v1","bookId":args.book,"reviewerPolicy":"two-pass semantic review against complete transcript representation; no locator-only approval","decisions":decisions,"addressedUnits":len(decisions)}
    args.output.parent.mkdir(parents=True,exist_ok=True); args.output.write_text(json.dumps(out,ensure_ascii=False,indent=2)+"\n",encoding="utf-8"); print(f"semantic review {args.book}: {len(decisions)} new decisions"); return 0

if __name__=="__main__": raise SystemExit(main())
