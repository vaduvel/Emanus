#!/usr/bin/env python3
"""Upgrade the legacy Biblia Emanus manifest gate for atomic PR40 publication.

This is an exact, fail-closed source transformation. It changes only the
manifest lifecycle check: draft remains valid exactly as before, while
``published`` is accepted only when the 64-work atomic verdict exists and
reports zero blockers. Every other validator rule remains untouched.
"""
from __future__ import annotations

from pathlib import Path

PATH = Path(__file__).with_name("check-biblia-emanus.py")

OLD = '''    expected = {
        "id": "biblia-emanus",
        "abbreviation": "BE",
        "language": "ro",
        "canon": "protestant-66",
        "status": "draft",
        "publicationBlock": "automated-audit-required",
        "licenseDecision": "CC BY 4.0",
    }
    for key, value in expected.items():
        if manifest.get(key) != value:
            fail(f"manifest.json: {key} trebuie să fie {value!r}")
'''

NEW = '''    expected = {
        "id": "biblia-emanus",
        "abbreviation": "BE",
        "language": "ro",
        "canon": "protestant-66",
        "licenseDecision": "CC BY 4.0",
    }
    for key, value in expected.items():
        if manifest.get(key) != value:
            fail(f"manifest.json: {key} trebuie să fie {value!r}")

    status = manifest.get("status")
    if status == "draft":
        if manifest.get("publicationBlock") != "automated-audit-required":
            fail("manifest.json: draft cere publicationBlock='automated-audit-required'")
    elif status == "published":
        if "publicationBlock" in manifest:
            fail("manifest.json: corpusul publicat nu poate păstra publicationBlock")
        if manifest.get("public") is not True:
            fail("manifest.json: corpusul publicat trebuie să aibă public=true")
        publication = manifest.get("pr40Publication")
        if not isinstance(publication, dict):
            fail("manifest.json: starea published cere pr40Publication")
        expected_publication = {
            "status": "published",
            "works": 64,
            "canonicalOldTestamentBooks": 39,
            "deuterocanonicalWorks": 12,
            "earlyWorks": 4,
            "qumranCollections": 9,
            "atomicVerdict": "docs/biblia-emanus/PR40-FINAL-PUBLICATION-VERDICT.json",
        }
        for key, value in expected_publication.items():
            if publication.get(key) != value:
                fail(f"manifest.json: pr40Publication.{key} trebuie să fie {value!r}")
        verdict = load_json(ROOT / publication["atomicVerdict"])
        if verdict.get("status") != "published":
            fail("PR40-FINAL-PUBLICATION-VERDICT.json: status trebuie să fie 'published'")
        counts = verdict.get("counts")
        if not isinstance(counts, dict) or counts.get("works") != 64:
            fail("PR40-FINAL-PUBLICATION-VERDICT.json: trebuie să conțină exact 64 lucrări")
        if verdict.get("blockingIssues") != 0:
            fail("PR40-FINAL-PUBLICATION-VERDICT.json: blockingIssues trebuie să fie 0")
    else:
        fail("manifest.json: status trebuie să fie 'draft' sau 'published'")
'''


def main() -> None:
    text = PATH.read_text(encoding="utf-8")
    if NEW in text:
        print("Biblia Emanus validator already supports atomic published state.")
        return
    occurrences = text.count(OLD)
    if occurrences != 1:
        raise SystemExit(
            f"Refusing to patch validator: expected one legacy manifest block, found {occurrences}"
        )
    PATH.write_text(text.replace(OLD, NEW), encoding="utf-8")
    print("Upgraded Biblia Emanus validator for fail-closed atomic published state.")


if __name__ == "__main__":
    main()
