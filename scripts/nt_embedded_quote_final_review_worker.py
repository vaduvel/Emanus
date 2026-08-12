#!/usr/bin/env python3
from __future__ import annotations

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
BE_DIR = ROOT / "docs/data/biblia-emanus"
AUDIT = DATA / "nt-embedded-quote-audit.json"
LEDGER = DATA / "nt-embedded-quote-review-ledger.json"
OUT = DATA / "nt-embedded-quote-final-review.json"
MODEL = os.environ.get("NT_QUOTE_REVIEW_MODEL", "openai/gpt-4.1")
ENDPOINT = "https://models.github.ai/inference/chat/completions"
API_VERSION = "2026-03-10"
TIMEOUT = int(os.environ.get("NT_QUOTE_REVIEW_TIMEOUT", "300"))
BATCH = int(os.environ.get("NT_QUOTE_REVIEW_BATCH", "4"))
SHA_RE = re.compile(r"^sha256:[0-9a-f]{64}$")


def fail(message: str) -> None:
    raise SystemExit(f"[embedded quote final review] {message}")


def sha256_text(value: str) -> str:
    return "sha256:" + hashlib.sha256(value.encode("utf-8")).hexdigest()


def load(path: Path) -> dict:
    if not path.exists():
        fail(f"missing {path.relative_to(ROOT)}")
    return json.loads(path.read_text(encoding="utf-8"))


def find_book(book_id: str) -> dict:
    for path in sorted(CORPUS.glob("*.json")):
        book = load(path)
        if book.get("id") == book_id:
            return book
    fail(f"missing corpus book {book_id}")


def field_value(book: dict, chapter_no: int, field: str) -> tuple[str, str | None]:
    chapter = next((c for c in book.get("chapters", []) if int(c.get("number", -1)) == chapter_no), None)
    if chapter is None:
        fail(f"{book.get('id')} {chapter_no}: missing chapter")
    match = re.fullmatch(r"units\[(\d+)\]\.(teaching|forYourHeart)", field)
    if match:
        index, key = int(match.group(1)), match.group(2)
        units = chapter.get("units", [])
        if index >= len(units):
            fail(f"{book.get('id')} {chapter_no} {field}: unit index out of range")
        unit = units[index]
        value = unit.get(key)
        if not isinstance(value, str):
            fail(f"{book.get('id')} {chapter_no} {field}: field is not string")
        return value, str(unit.get("id") or "")
    value = chapter.get(field)
    if not isinstance(value, str):
        fail(f"{book.get('id')} {chapter_no} {field}: chapter field is not string")
    return value, None


def be_chapters() -> dict[str, str]:
    out: dict[str, str] = {}
    for path in BE_DIR.glob("*.json"):
        if not re.fullmatch(r"[A-Z0-9]{3}\.\d+\.json", path.name):
            continue
        data = load(path)
        if data.get("translation") != "BE" or not isinstance(data.get("verses"), list):
            continue
        key = f"{data['bookId']}.{data['chapter']}"
        out[key] = " ".join(str(v.get("text") or "") for v in data["verses"])
    return out


def call_model(prompt: str, retries: int = 6) -> dict:
    token = os.environ.get("GITHUB_TOKEN")
    if not token:
        fail("GITHUB_TOKEN missing")
    payload = json.dumps({
        "model": MODEL,
        "messages": [
            {"role": "system", "content": "You are a strict Bible quotation provenance reviewer. Follow the Romanian rules and return only valid JSON."},
            {"role": "user", "content": prompt},
        ],
        "temperature": 0.0,
    }, ensure_ascii=False).encode("utf-8")
    last = "unknown"
    for attempt in range(1, retries + 1):
        request = urllib.request.Request(ENDPOINT, data=payload, method="POST", headers={
            "Accept": "application/vnd.github+json",
            "Authorization": f"Bearer {token}",
            "X-GitHub-Api-Version": API_VERSION,
            "Content-Type": "application/json",
            "User-Agent": "Emanus-Embedded-Quote-Review/1.0",
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
                start, end = raw.find("{"), raw.rfind("}")
                if start < 0 or end <= start:
                    raise
                parsed = json.loads(raw[start:end + 1], strict=False)
            if not isinstance(parsed, dict):
                raise RuntimeError("JSON root is not object")
            return parsed
        except urllib.error.HTTPError as exc:
            body = exc.read().decode("utf-8", errors="replace")
            last = f"HTTP {exc.code}: {body[-1200:]}"
            if exc.code not in (408, 409, 429, 500, 502, 503, 504):
                break
            retry_after = exc.headers.get("Retry-After")
            delay = min(60, int(retry_after)) if retry_after and retry_after.isdigit() else min(60, attempt * attempt * 3)
            time.sleep(delay)
        except Exception as exc:
            last = repr(exc)
            if attempt < retries:
                time.sleep(min(30, 2 ** attempt))
    fail(f"GitHub Models call failed after {retries} attempts: {last}")


def first_prompt(rows: list[dict]) -> str:
    compact = [{
        "reviewId": r["reviewId"],
        "book": r["book"],
        "chapter": r["chapter"],
        "field": r["field"],
        "unitId": r["unitId"],
        "quote": r["quote"],
        "context": r["context"],
        "exactMatchElsewhere": r.get("exactMatchElsewhere", []),
        "sameChapterBE": r["sameChapterBE"],
        "exactElsewhereBE": r["exactElsewhereBE"],
    } for r in rows]
    return f'''Revizuiește citatele nerezolvate din Biblia Emanus NT Explicată.

Clasificări permise, exact una:
- `non-bible-quotation`: ghilimelele marchează clar rugăciune, dialog ipotetic, slogan, formulare editorială sau altă vorbire care NU pretinde că redă Scriptura.
- `biblical-cross-reference`: fragmentul este Scriptură și apare EXACT, cu aceleași cuvinte normalizate, într-un capitol BE din `exactMatchElsewhere`; contextul îl folosește ca trimitere la acel pasaj. Trebuie să alegi target din lista furnizată. Nu folosi această clasă doar pentru că un text asemănător există undeva.
- `biblical-paraphrase-unquote`: ghilimelele pretind sau sugerează un citat biblic, dar fragmentul NU este un citat BE exact în capitolul curent și nu îndeplinește strict regula de cross-reference de mai sus. Remediul conservator este să scoatem numai ghilimelele, fără să schimbăm cuvintele.

Reguli:
1. Nu inventa o țintă biblică. Pentru cross-reference, targetCanonicalBookId/targetChapter trebuie să provină exact din `exactMatchElsewhere`.
2. O parafrază biblică nu poate fi clasificată `non-bible-quotation`.
3. Rugăciunile devoționale formulate de editor sunt `non-bible-quotation`, chiar dacă folosesc vocabular biblic.
4. Dialogul ipotetic prezentat ca exemplu editorial este `non-bible-quotation`.
5. Dacă există orice îndoială că fragmentul pretinde Scriptura, alege `biblical-paraphrase-unquote`.
6. Nu propune modificări de wording. Pentru paraphrase remediul este exclusiv unquote.

Returnează numai JSON: {{"items":[{{"reviewId":"...","classification":"non-bible-quotation|biblical-cross-reference|biblical-paraphrase-unquote","targetCanonicalBookId":null,"targetChapter":null,"rationale":"..."}}]}}.

DATE:
{json.dumps(compact, ensure_ascii=False)}'''


def verify_prompt(rows: list[dict], first: dict) -> str:
    compact = [{
        "reviewId": r["reviewId"],
        "quote": r["quote"],
        "context": r["context"],
        "exactMatchElsewhere": r.get("exactMatchElsewhere", []),
        "sameChapterBE": r["sameChapterBE"],
        "exactElsewhereBE": r["exactElsewhereBE"],
    } for r in rows]
    return f'''Ești al doilea reviewer independent și fail-closed. Verifică fiecare clasificare a primului reviewer.

Condiții de aprobare:
- `non-bible-quotation` numai dacă este clar vorbire editorială/devoțională/ipotetică, nu Scriptură parafrazată.
- `biblical-cross-reference` numai dacă ținta este în exactMatchElsewhere și contextul chiar citează acel pasaj; verifică textul BE furnizat.
- orice citat biblic neexact sau incert trebuie `biblical-paraphrase-unquote`.
- nu modifica wording-ul.

Returnează numai JSON: {{"items":[{{"reviewId":"...","approved":true,"classification":"...","targetCanonicalBookId":null,"targetChapter":null,"rationale":"...","problems":[]}}]}}. Dacă nu poți aproba, `approved:false` și explică în problems.

DATE:
{json.dumps(compact, ensure_ascii=False)}

PRIMUL REVIEW:
{json.dumps(first, ensure_ascii=False)}'''


def main() -> int:
    audit = load(AUDIT)
    if audit.get("schema") != "emanus-nt-embedded-quote-audit-v2":
        fail("unexpected audit schema")
    findings = audit.get("findings")
    if not isinstance(findings, list) or not findings:
        fail("no unresolved quote findings to review")
    if int(audit.get("reviewLedgerProblems", -1)) != 0:
        fail("existing quote review ledger has problems")
    chapters = be_chapters()

    rows: list[dict] = []
    for finding in findings:
        review_id = str(finding.get("reviewId") or "")
        quote = str(finding.get("quote") or "")
        quote_sha = str(finding.get("quoteSha256") or "")
        if not re.fullmatch(r"[0-9a-f]{64}", review_id):
            fail(f"invalid reviewId {review_id!r}")
        if not SHA_RE.fullmatch(quote_sha) or sha256_text(quote) != quote_sha:
            fail(f"{review_id}: quote SHA drift")
        book_id = str(finding.get("bookId") or "")
        canonical = str(finding.get("canonicalBookId") or "")
        chapter = int(finding.get("chapter", -1))
        field = str(finding.get("field") or "")
        book = find_book(book_id)
        context, unit_id = field_value(book, chapter, field)
        wrappers = [f"„{quote}”", f"«{quote}»", f'"{quote}"']
        if sum(context.count(wrapper) for wrapper in wrappers) != 1:
            fail(f"{review_id}: quoted wrapper no longer unique in field")
        same_key = f"{canonical}.{chapter}"
        if same_key not in chapters:
            fail(f"{review_id}: missing same-chapter BE {same_key}")
        elsewhere = finding.get("exactMatchElsewhere") or []
        if not isinstance(elsewhere, list):
            fail(f"{review_id}: exactMatchElsewhere not list")
        exact_be: dict[str, str] = {}
        for key in elsewhere:
            if key not in chapters:
                fail(f"{review_id}: elsewhere BE chapter missing {key}")
            exact_be[key] = chapters[key]
        rows.append({
            "reviewId": review_id,
            "quoteSha256": quote_sha,
            "bookId": book_id,
            "canonicalBookId": canonical,
            "book": str(finding.get("book") or book.get("name") or book_id),
            "chapter": chapter,
            "field": field,
            "unitId": unit_id,
            "quote": quote,
            "context": context,
            "exactMatchElsewhere": elsewhere,
            "sameChapterBE": chapters[same_key],
            "exactElsewhereBE": exact_be,
        })

    approved: list[dict] = []
    for offset in range(0, len(rows), BATCH):
        batch = rows[offset:offset + BATCH]
        first = call_model(first_prompt(batch))
        first_map = {x.get("reviewId"): x for x in first.get("items", []) if isinstance(x, dict)}
        expected = {r["reviewId"] for r in batch}
        if set(first_map) != expected:
            fail(f"first reviewer set mismatch at offset {offset}")
        second = call_model(verify_prompt(batch, first))
        second_map = {x.get("reviewId"): x for x in second.get("items", []) if isinstance(x, dict)}
        if set(second_map) != expected:
            fail(f"verifier set mismatch at offset {offset}")
        for row in batch:
            item = second_map[row["reviewId"]]
            if item.get("approved") is not True or (item.get("problems") or []):
                fail(f"{row['reviewId']}: verifier rejected: {item.get('problems') or item.get('rationale')}")
            classification = item.get("classification")
            if classification not in {"non-bible-quotation", "biblical-cross-reference", "biblical-paraphrase-unquote"}:
                fail(f"{row['reviewId']}: invalid classification {classification}")
            target_book = item.get("targetCanonicalBookId")
            target_chapter = item.get("targetChapter")
            if classification == "biblical-cross-reference":
                if not isinstance(target_book, str) or not isinstance(target_chapter, int):
                    fail(f"{row['reviewId']}: cross-reference target missing")
                key = f"{target_book}.{target_chapter}"
                if key not in row["exactMatchElsewhere"]:
                    fail(f"{row['reviewId']}: cross-reference target {key} not exactMatchElsewhere")
            else:
                target_book = None
                target_chapter = None
            rationale = str(item.get("rationale") or "").strip()
            if not rationale:
                fail(f"{row['reviewId']}: rationale missing")
            approved.append({
                **row,
                "classification": classification,
                "targetCanonicalBookId": target_book,
                "targetChapter": target_chapter,
                "rationale": rationale,
            })
            print(f"QUOTE {row['bookId']} {row['chapter']} {classification} {row['reviewId'][:10]}", flush=True)

    if len(approved) != len(rows) or len({x["reviewId"] for x in approved}) != len(rows):
        fail("approved quote review coverage incomplete")

    existing = load(LEDGER)
    if existing.get("schema") != "emanus-nt-embedded-quote-review-ledger-v1" or not isinstance(existing.get("decisions"), list):
        fail("existing review ledger malformed")
    decisions = list(existing["decisions"])
    existing_ids = {str(d.get("reviewId") or "") for d in decisions}
    if len(existing_ids) != len(decisions):
        fail("existing review ledger duplicate ids")

    unquotes: list[dict] = []
    classifications_added = 0
    for row in approved:
        if row["classification"] == "biblical-paraphrase-unquote":
            unquotes.append({
                "reviewId": row["reviewId"],
                "quoteSha256": row["quoteSha256"],
                "bookId": row["bookId"],
                "canonicalBookId": row["canonicalBookId"],
                "chapter": row["chapter"],
                "field": row["field"],
                "unitId": row["unitId"],
                "quote": row["quote"],
                "action": "unquote-biblical-paraphrase-without-wording-change",
                "rationale": row["rationale"],
            })
            continue
        if row["reviewId"] in existing_ids:
            fail(f"{row['reviewId']}: unresolved finding unexpectedly already exists in ledger")
        decision = {
            "reviewId": row["reviewId"],
            "quoteSha256": row["quoteSha256"],
            "classification": row["classification"],
            "rationale": row["rationale"],
            "reviewedBy": f"two-pass GitHub Models exact-BE quote review ({MODEL})",
            "reviewedOn": "2026-08-11",
        }
        if row["classification"] == "biblical-cross-reference":
            decision["targetCanonicalBookId"] = row["targetCanonicalBookId"]
            decision["targetChapter"] = row["targetChapter"]
        decisions.append(decision)
        existing_ids.add(row["reviewId"])
        classifications_added += 1

    LEDGER.write_text(json.dumps({
        "schema": "emanus-nt-embedded-quote-review-ledger-v1",
        "policy": existing.get("policy") or "Hash-bound manual review of quoted spans that are not exact same-chapter Biblia Emanus text.",
        "decisions": decisions,
    }, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    OUT.write_text(json.dumps({
        "schema": "emanus-nt-embedded-quote-final-review-v1",
        "policy": "Two-pass review. Exact cross-references are ledger-bound to BE chapters; editorial quotations are classified non-Bible; biblical paraphrases are resolved only by removing quotation wrappers without changing wording. Every operation is quote-SHA and location bound.",
        "sourceAuditCount": len(rows),
        "classificationsAdded": classifications_added,
        "unquoteCount": len(unquotes),
        "unquotes": unquotes,
    }, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Embedded quote final review: {len(rows)} unresolved -> {classifications_added} ledger classifications + {len(unquotes)} exact unquotes.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
