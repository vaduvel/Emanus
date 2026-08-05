#!/usr/bin/env python3
"""Enforce deterministic audit after applying the explicit versification policy."""
from __future__ import annotations

import json
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REPORT = ROOT / "docs" / "biblia-emanus" / "OT-REPAIR5-DETERMINISTIC-AUDIT.json"
POLICY = ROOT / "docs" / "data" / "biblia-emanus-candidates" / "versification-policy.json"
RESOLVED = ROOT / "docs" / "biblia-emanus" / "OT-REPAIR5-DETERMINISTIC-RESOLVED.json"


def main() -> int:
    report = json.loads(REPORT.read_text(encoding="utf-8"))
    policy = json.loads(POLICY.read_text(encoding="utf-8"))
    allowed_lengths = policy.get("lengthExceptions", {})
    expected_wlc = policy.get("wlcBookCountDifferences", {})

    unresolved = []
    accepted = []
    seen_length = set()
    seen_wlc = set()

    for item in report.get("issues", []):
        severity = item.get("severity")
        code = item.get("code")
        reference = item.get("reference")
        if severity in {"critical", "error"}:
            if code == "LENGTH" and reference in allowed_lengths:
                accepted.append({**item, "policy": allowed_lengths[reference]})
                seen_length.add(reference)
                continue
            unresolved.append(item)
            continue
        if code == "WLC_VERSIFICATION_MAP_REQUIRED":
            book_stats = report.get("books", {}).get(reference, {})
            actual = book_stats.get("wlcBookCountDifference")
            expected = expected_wlc.get(reference)
            if actual != expected:
                unresolved.append({
                    **item,
                    "severity": "error",
                    "message": f"Diferența WLC s-a schimbat: expected={expected}, actual={actual}",
                })
            else:
                accepted.append({**item, "policyDifference": expected})
                seen_wlc.add(reference)

    missing_length = sorted(set(allowed_lengths) - seen_length)
    # A length exception may disappear after a harmless wording update. That is
    # acceptable, but any newly appearing exception remains blocked.
    missing_wlc = sorted(set(expected_wlc) - seen_wlc)
    if missing_wlc:
        unresolved.append({
            "severity": "error",
            "code": "WLC_POLICY_NOT_EXERCISED",
            "reference": ",".join(missing_wlc),
            "message": "Politica declară diferențe WLC care nu mai apar în raport; politica trebuie actualizată explicit.",
        })

    counts = Counter(item.get("severity") for item in unresolved)
    resolved = {
        "schemaVersion": 1,
        "sourceAuditSchemaVersion": report.get("schemaVersion"),
        "effectiveSeverityCounts": dict(counts),
        "acceptedDocumentedExceptions": accepted,
        "inactiveLengthExceptions": missing_length,
        "unresolved": unresolved,
    }
    RESOLVED.write_text(json.dumps(resolved, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({
        "unresolved": len(unresolved),
        "acceptedExceptions": len(accepted),
        "inactiveLengthExceptions": missing_length,
    }, ensure_ascii=False, indent=2))
    return 1 if unresolved else 0


if __name__ == "__main__":
    raise SystemExit(main())
