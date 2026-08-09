#!/usr/bin/env python3
"""Require a current direct-source resolution for every OT screening alert."""

from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs" / "data" / "biblia-emanus"
SCREENING = DATA / "ot-semantic-screening.jsonl"
RESOLUTIONS = DATA / "ot-semantic-review-resolutions.jsonl"
SHA256 = re.compile(r"^sha256:[0-9a-f]{64}$")


def fail(message: str) -> None:
    raise SystemExit(f"[ot-semantic-resolutions] EROARE: {message}")


def file_digest(path: Path) -> str:
    return "sha256:" + hashlib.sha256(path.read_bytes()).hexdigest()


def main() -> int:
    screening = [json.loads(line) for line in SCREENING.read_text(encoding="utf-8").splitlines()]
    queued = {record["reference"]: record for record in screening if record.get("classification") == "review"}
    artifact = json.loads(RESOLUTIONS.read_text(encoding="utf-8"))
    expected_keys = {
        "schemaVersion", "recordType", "generatedAt", "screeningArtifactSha256", "review", "decisions",
    }
    if set(artifact) != expected_keys or artifact.get("schemaVersion") != 1:
        fail("schema artefactului de rezoluții este invalidă")
    if artifact.get("recordType") != "ot-semantic-review-resolutions":
        fail("recordType invalid")
    if artifact.get("screeningArtifactSha256") != file_digest(SCREENING):
        fail("rezoluțiile nu corespund screeningului semantic curent")
    review = artifact.get("review")
    if not isinstance(review, dict) or set(review) != {"reviewerId", "method"}:
        fail("identitatea reviziei directe este invalidă")
    if review.get("method") != "direct-romanian-wlc-oshb-webu-side-by-side-review":
        fail("metoda reviziei directe este invalidă")

    decisions = artifact.get("decisions")
    if not isinstance(decisions, list):
        fail("decisions trebuie să fie listă")
    indexed: dict[str, dict] = {}
    for decision in decisions:
        if not isinstance(decision, dict) or set(decision) != {
            "reference", "screeningBindingSha256", "screeningScore", "decision", "outcome", "rationale",
        }:
            fail("decizie cu schemă invalidă")
        reference = decision.get("reference")
        if reference in indexed:
            fail(f"decizie duplicată pentru {reference}")
        if reference not in queued:
            fail(f"decizie fără alertă semantică actuală: {reference}")
        screening_record = queued[reference]
        if decision.get("screeningBindingSha256") != screening_record.get("bindingSha256"):
            fail(f"binding stale pentru {reference}")
        if decision.get("screeningScore") != screening_record.get("webuSimilarity"):
            fail(f"scor stale pentru {reference}")
        if decision.get("decision") != "approved-after-direct-source-review":
            fail(f"decizie neaprobată pentru {reference}")
        if decision.get("outcome") not in {"source-aligned", "corrected-and-rechecked"}:
            fail(f"outcome invalid pentru {reference}")
        rationale = decision.get("rationale")
        if not isinstance(rationale, str) or not rationale.startswith(reference + ": ") or len(rationale) < 55:
            fail(f"justificare insuficientă pentru {reference}")
        if not SHA256.fullmatch(str(decision.get("screeningBindingSha256"))):
            fail(f"hash invalid pentru {reference}")
        indexed[reference] = decision

    if set(indexed) != set(queued):
        fail(f"acoperire incompletă: {len(indexed)} din {len(queued)} alerte rezolvate")
    corrected = sum(item["outcome"] == "corrected-and-rechecked" for item in decisions)
    print(
        f"[ot-semantic-resolutions] OK: {len(decisions)} alerte curente rezolvate direct; "
        f"{corrected} corectate și reverificate."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
