#!/usr/bin/env python3
from __future__ import annotations

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs/data/biblia-explicata"
AUDIT = DATA / "nt-embedded-quote-audit.json"
LEDGER = DATA / "nt-embedded-quote-review-ledger.json"
OUT = DATA / "nt-embedded-quote-final-review.json"

NON_BIBLE = {
    2: "Rugăciune editorială formulată pentru aplicarea lecției, nu citat biblic.",
    8: "Dialog ipotetic folosit pentru a respinge o aplicare pripită, nu citat biblic.",
    10: "Rugăciune editorială formulată pentru cititor, nu citat biblic.",
    12: "Imperativ ipotetic care descrie falsificarea aparențelor, nu citat biblic.",
    13: "Slogan interior editorial folosit ca exemplu, nu citat biblic.",
    15: "Replică ipotetică adresată lui Dumnezeu pentru a descrie posesivitatea, nu citat biblic.",
    19: "Rugăciune editorială formulată pentru aplicarea lecției, nu citat biblic.",
    25: "Întrebare editorială de discernământ, nu citat biblic.",
    30: "Replică ipotetică ce expune slujirea tranzacțională, nu citat biblic.",
    31: "Rugăciune editorială ce exemplifică slujirea din recunoștință, nu citat biblic.",
    34: "Replică ipotetică ce exprimă autosuficiența, nu citat biblic.",
    47: "Întrebare editorială de discernământ pentru aplicarea pasajului, nu citat biblic.",
}

CROSS_REFERENCES = {
    3: ("LUK", 22, "Aplicarea citează deliberat rugăciunea lui Isus din Luca 22, iar fragmentul are potrivire exactă în capitolul BE indicat."),
    23: ("LUK", 22, "Explicația trimite explicit la rugăciunea lui Isus; fragmentul are potrivire exactă în Luca 22 BE."),
}


def fail(message: str) -> None:
    raise SystemExit(f"[embedded quote manual final review] {message}")


def load(path: Path) -> dict:
    if not path.exists():
        fail(f"missing {path.relative_to(ROOT)}")
    return json.loads(path.read_text(encoding="utf-8"))


def main() -> int:
    audit = load(AUDIT)
    findings = audit.get("findings")
    if audit.get("schema") != "emanus-nt-embedded-quote-audit-v2" or not isinstance(findings, list):
        fail("unexpected audit schema")
    if len(findings) != 55:
        fail(f"expected the reviewed 55-finding set, got {len(findings)}")
    if int(audit.get("reviewLedgerProblems", -1)) != 0:
        fail("existing quote ledger has problems")
    if set(NON_BIBLE) & set(CROSS_REFERENCES):
        fail("classification sets overlap")
    if not set(NON_BIBLE) | set(CROSS_REFERENCES) <= set(range(1, len(findings) + 1)):
        fail("classification index outside reviewed finding set")

    existing = load(LEDGER)
    if existing.get("schema") != "emanus-nt-embedded-quote-review-ledger-v1" or not isinstance(existing.get("decisions"), list):
        fail("existing quote ledger malformed")
    decisions = list(existing["decisions"])
    existing_ids = {str(item.get("reviewId") or "") for item in decisions}
    if len(existing_ids) != len(decisions):
        fail("existing quote ledger contains duplicate review ids")

    unquotes: list[dict] = []
    classifications_added = 0
    for index, finding in enumerate(findings, 1):
        review_id = str(finding.get("reviewId") or "")
        quote_sha = str(finding.get("quoteSha256") or "")
        elsewhere = finding.get("exactMatchElsewhere") or []
        if len(review_id) != 64 or not review_id.isalnum():
            fail(f"finding {index}: invalid review id")
        if not quote_sha.startswith("sha256:") or len(quote_sha) != 71:
            fail(f"finding {index}: invalid quote SHA")
        if review_id in existing_ids:
            fail(f"finding {index}: unexpectedly already classified")

        if index in NON_BIBLE:
            decisions.append({
                "reviewId": review_id,
                "quoteSha256": quote_sha,
                "classification": "non-bible-quotation",
                "rationale": NON_BIBLE[index],
                "reviewedBy": "Codex direct contextual review against the current explanation and Biblia Emanus corpus",
                "reviewedOn": "2026-08-11",
            })
            existing_ids.add(review_id)
            classifications_added += 1
            continue

        if index in CROSS_REFERENCES:
            target_book, target_chapter, rationale = CROSS_REFERENCES[index]
            target = f"{target_book}.{target_chapter}"
            if target not in elsewhere:
                fail(f"finding {index}: target {target} is not an exact BE match")
            decisions.append({
                "reviewId": review_id,
                "quoteSha256": quote_sha,
                "classification": "biblical-cross-reference",
                "rationale": rationale,
                "reviewedBy": "Codex direct contextual review against the current explanation and Biblia Emanus corpus",
                "reviewedOn": "2026-08-11",
                "targetCanonicalBookId": target_book,
                "targetChapter": target_chapter,
            })
            existing_ids.add(review_id)
            classifications_added += 1
            continue

        unquotes.append({
            "reviewId": review_id,
            "quoteSha256": quote_sha,
            "bookId": finding["bookId"],
            "canonicalBookId": finding["canonicalBookId"],
            "chapter": finding["chapter"],
            "field": finding["field"],
            "unitId": None,
            "quote": finding["quote"],
            "action": "unquote-biblical-paraphrase-without-wording-change",
            "rationale": "Fragmentul redă sau rezumă Scriptura în context, dar nu este text BE exact în capitolul explicat și nu îndeplinește regula strictă pentru o trimitere exactă; se elimină exclusiv ghilimelele.",
        })

    if classifications_added != 14 or len(unquotes) != 41:
        fail(f"classification coverage drift: {classifications_added} ledger + {len(unquotes)} unquotes")

    # Resolve and bind unit identities from the exact current corpus location.
    books: dict[str, dict] = {}
    for path in sorted((DATA / "nt-final-source-first").glob("*.json")):
        book = load(path)
        books[str(book.get("id") or "")] = book
    for operation in unquotes:
        book = books.get(operation["bookId"])
        if not book:
            fail(f"missing corpus book {operation['bookId']}")
        chapter = next((item for item in book.get("chapters", []) if int(item.get("number", -1)) == int(operation["chapter"])), None)
        if chapter is None:
            fail(f"missing chapter {operation['bookId']} {operation['chapter']}")
        field = operation["field"]
        if not field.startswith("units["):
            fail(f"unsupported non-unit field {field}")
        unit_index = int(field.split("[", 1)[1].split("]", 1)[0])
        unit = chapter["units"][unit_index]
        operation["unitId"] = unit["id"]

    LEDGER.write_text(json.dumps({
        "schema": "emanus-nt-embedded-quote-review-ledger-v1",
        "policy": existing.get("policy") or "Hash-bound manual review of quoted spans that are not exact same-chapter Biblia Emanus text.",
        "decisions": decisions,
    }, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    OUT.write_text(json.dumps({
        "schema": "emanus-nt-embedded-quote-final-review-v1",
        "policy": "Direct contextual review. Exact cross-references are ledger-bound to BE chapters; editorial quotations are classified non-Bible; biblical paraphrases are resolved only by removing quotation wrappers without changing wording. Every operation is quote-SHA and location bound.",
        "sourceAuditCount": len(findings),
        "classificationsAdded": classifications_added,
        "unquoteCount": len(unquotes),
        "unquotes": unquotes,
    }, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Embedded quote manual final review: {len(findings)} findings -> {classifications_added} ledger classifications + {len(unquotes)} exact unquotes.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
