#!/usr/bin/env python3
"""Run the legacy Biblia Emanus validator against an atomically published PR40 corpus.

The underlying validator predates the PR40 final-publication manifest and therefore
expects the canonical manifest to remain in ``draft`` state with the historical
publication block. This adapter does not weaken any chapter/source checks: it
first proves that the published state is backed by the atomic 64-work verdict,
then delegates every existing structural, source, benchmark and content check to
the original validator using a manifest shadow that only restores those two
legacy state fields.
"""
from __future__ import annotations

import importlib.util
from pathlib import Path
from typing import Any

BASE_PATH = Path(__file__).with_name("check-biblia-emanus.py")
spec = importlib.util.spec_from_file_location("biblia_emanus_validator", BASE_PATH)
if spec is None or spec.loader is None:
    raise SystemExit(f"Cannot load validator: {BASE_PATH}")
base = importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)

original_validate_manifest = base.validate_manifest
EXPECTED_ATOMIC_VERDICT = "docs/biblia-emanus/PR40-FINAL-PUBLICATION-VERDICT.json"


def validate_manifest_published_aware(manifest: dict[str, Any]) -> dict[str, Path]:
    if manifest.get("status") != "published":
        return original_validate_manifest(manifest)

    if manifest.get("public") is not True:
        base.fail("manifest.json: corpusul publicat trebuie să aibă public=true")
    if "publicationBlock" in manifest:
        base.fail("manifest.json: corpusul publicat nu poate păstra publicationBlock")

    publication = manifest.get("pr40Publication")
    if not isinstance(publication, dict):
        base.fail("manifest.json: starea published cere pr40Publication")
    expected_publication = {
        "status": "published",
        "works": 64,
        "canonicalOldTestamentBooks": 39,
        "deuterocanonicalWorks": 12,
        "earlyWorks": 4,
        "qumranCollections": 9,
        "atomicVerdict": EXPECTED_ATOMIC_VERDICT,
    }
    for key, expected in expected_publication.items():
        if publication.get(key) != expected:
            base.fail(f"manifest.json: pr40Publication.{key} trebuie să fie {expected!r}")

    verdict_path = base.ROOT / EXPECTED_ATOMIC_VERDICT
    verdict = base.load_json(verdict_path)
    if verdict.get("status") != "published":
        base.fail("PR40-FINAL-PUBLICATION-VERDICT.json: status trebuie să fie 'published'")
    counts = verdict.get("counts")
    if not isinstance(counts, dict) or counts.get("works") != 64:
        base.fail("PR40-FINAL-PUBLICATION-VERDICT.json: verdictul trebuie să conțină exact 64 lucrări")
    if verdict.get("blockingIssues") != 0:
        base.fail("PR40-FINAL-PUBLICATION-VERDICT.json: blockingIssues trebuie să fie 0")

    # Preserve every existing validation rule. Only the two historical lifecycle
    # fields are shadowed so the pre-publication validator can inspect the same
    # already-published corpus without rejecting the new lifecycle state first.
    legacy_shadow = dict(manifest)
    legacy_shadow["status"] = "draft"
    legacy_shadow["publicationBlock"] = "automated-audit-required"
    return original_validate_manifest(legacy_shadow)


base.validate_manifest = validate_manifest_published_aware

if __name__ == "__main__":
    raise SystemExit(base.main())
