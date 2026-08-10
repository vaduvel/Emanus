#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
from pathlib import Path

SCHEMA = "emanus-nt-semantic-review-ledger-v1"
BOOK_SCHEMA = "emanus-nt-semantic-review-book-v1"


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--input", required=True, type=Path)
    ap.add_argument("--ledger", required=True, type=Path)
    args = ap.parse_args()

    if args.ledger.exists():
        ledger = json.loads(args.ledger.read_text(encoding="utf-8"))
        if ledger.get("schema") != SCHEMA or not isinstance(ledger.get("decisions"), list):
            raise SystemExit("Unexpected semantic ledger schema")
    else:
        ledger = {
            "schema": SCHEMA,
            "policy": "Every decision is two-pass reviewed against complete transcript representation, hash-bound to current reader teaching/application, and retains official-source plus transcript-representation evidence. Locator-only evidence never approves semantic fidelity.",
            "decisions": [],
        }

    by_key = {(d["bookId"], int(d["chapter"]), d["unitId"]): d for d in ledger["decisions"]}
    added = 0
    for path in sorted(args.input.glob("*.json")):
        data = json.loads(path.read_text(encoding="utf-8"))
        if data.get("schema") != BOOK_SCHEMA:
            raise SystemExit(f"Unexpected semantic book artifact schema: {path}")
        for decision in data.get("decisions", []):
            key = (decision["bookId"], int(decision["chapter"]), decision["unitId"])
            existing = by_key.get(key)
            if existing is not None and existing != decision:
                raise SystemExit(f"Conflicting frozen semantic decision for {key}")
            if existing is None:
                by_key[key] = decision
                added += 1

    ledger["decisions"] = sorted(by_key.values(), key=lambda d: (d["bookId"], int(d["chapter"]), d["unitId"]))
    ledger["count"] = len(ledger["decisions"])
    args.ledger.parent.mkdir(parents=True, exist_ok=True)
    args.ledger.write_text(json.dumps(ledger, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Semantic review ledger: {added} new / {len(ledger['decisions'])} total decisions.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
