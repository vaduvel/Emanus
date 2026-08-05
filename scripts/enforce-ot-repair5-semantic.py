#!/usr/bin/env python3
"""Block every unreviewed low semantic score in the canonical OT corpus."""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REPORT = ROOT / "docs" / "biblia-emanus" / "OT-REPAIR5-SEMANTIC-AUDIT.json"
POLICY = ROOT / "docs" / "biblia-emanus" / "OT-REPAIR5-SEMANTIC-POLICY.json"
OUT = ROOT / "docs" / "biblia-emanus" / "OT-REPAIR5-SEMANTIC-RESOLVED.json"
CANONICAL = {
    "JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB",
    "PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO",
    "OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL",
}


def main() -> int:
    report = json.loads(REPORT.read_text(encoding="utf-8"))
    policy = json.loads(POLICY.read_text(encoding="utf-8"))
    threshold = float(policy["canonicalThreshold"])
    reviewed = policy.get("reviewedExceptions", {})

    below = []
    for item in report.get("weakest", []):
        book = str(item.get("bookId", ""))
        score = float(item.get("score", 1.0))
        if book in CANONICAL and score < threshold:
            below.append(item)

    references = {str(item["reference"]) for item in below}
    accepted = []
    unresolved = []
    for item in below:
        ref = str(item["reference"])
        entry = reviewed.get(ref)
        if entry and entry.get("decision") == "accept" and str(entry.get("reason", "")).strip():
            accepted.append({**item, "review": entry})
        else:
            unresolved.append(item)

    stale = sorted(set(reviewed) - references)
    result = {
        "schemaVersion": 1,
        "threshold": threshold,
        "canonicalLowScoreCount": len(below),
        "acceptedReviewedExceptions": accepted,
        "unresolved": unresolved,
        "inactiveReviewedExceptions": stale,
    }
    OUT.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({
        "threshold": threshold,
        "lowScores": len(below),
        "accepted": len(accepted),
        "unresolved": [item["reference"] for item in unresolved],
        "inactive": stale,
    }, ensure_ascii=False, indent=2))
    return 1 if unresolved else 0


if __name__ == "__main__":
    raise SystemExit(main())
