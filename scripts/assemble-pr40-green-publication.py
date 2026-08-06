#!/usr/bin/env python3
"""Publish the 61 PR #40 works whose individual gates are already green.

The three unfinished works are deliberately excluded from runtime publication:
Didascalia (DID), the Temple Scroll (TEMP_SCR), and Additional Psalms
(ADD_PSA). The original 64-work inventory remains as historical scope evidence.
"""
from __future__ import annotations

import argparse
import importlib.util
import json
from pathlib import Path
from typing import Any

BASE_PATH = Path(__file__).with_name("assemble-pr40-final-publication.py")
spec = importlib.util.spec_from_file_location("pr40_full_assembler", BASE_PATH)
if spec is None or spec.loader is None:
    raise SystemExit(f"Cannot load {BASE_PATH}")
base = importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)

EXCLUDED = {
    "DID": "unfinished semantic/editorial finalization",
    "TEMP_SCR": "unfinished Romanian research-edition finalization",
    "ADD_PSA": "unfinished Romanian research-edition finalization",
}

base.EARLY = {"4BA", "ENO", "JUB"}
base.QUMRAN_WITNESSES = {
    "COMM_REG": {"1QS", "1QSa", "1QSb"},
    "GEN_APO": {"1Q20"},
    "GIANTS": {"1Q23", "2Q26", "4Q203", "4Q206", "4Q530", "4Q531", "4Q532", "4Q533", "6Q8"},
    "HAB_COM": {"1QpHab"},
    "HODAYOT": {"1QHa"},
    "SABB_SAC": {"4Q400"},
    "WAR_SCR": {"1QM"},
}


def audited_chapter_count(prior: Path, collection: str, id_: str) -> int:
    """Return the authoritative chapter count from a green audited artifact."""
    artifact = base.final_artifact(prior, prior, collection, id_)
    if collection == "deuterocanon":
        audited = artifact / "data" / "biblia-emanus-deuterocanon-audited"
    elif collection == "early":
        audited = artifact / "data" / "biblia-emanus-early-audited"
    else:
        raise ValueError(f"Unsupported chapter collection: {collection}")

    paths = sorted(audited.glob(f"{id_}.*.json"))
    chapters: list[int] = []
    for path in paths:
        suffix = path.stem.rsplit(".", 1)[-1]
        if suffix.isdigit():
            chapters.append(int(suffix))
    chapters.sort()
    if not chapters:
        raise RuntimeError(f"{id_}: audited artifact contains no chapter files")
    expected_sequence = list(range(1, len(chapters) + 1))
    if chapters != expected_sequence:
        raise RuntimeError(
            f"{id_}: audited chapter sequence is not contiguous: {chapters}"
        )
    return len(chapters)


def expected_chapters(prior: Path) -> dict[str, int]:
    inventory = base.read_json(base.INVENTORY_PATH)
    if int(inventory.get("bookCount", 0)) != 64:
        raise RuntimeError("Historical PR40 inventory no longer contains exactly 64 works")
    expected = {
        str(item["bookId"]): int(item["chapterCount"])
        for item in inventory["books"]
        if str(item["bookId"]) not in EXCLUDED
    }

    # The historical inventory describes the placeholder-era scope. For every
    # noncanonical work being published, the green audited artifact is the
    # authoritative source of chapter boundaries. This corrects ESG (10 audited
    # chapters rather than the historical 6) and prevents equivalent drift in
    # any other deuterocanonical or early work.
    for id_ in sorted(base.DEUTEROCANON):
        expected[id_] = audited_chapter_count(prior, "deuterocanon", id_)
    for id_ in sorted(base.EARLY):
        expected[id_] = audited_chapter_count(prior, "early", id_)
    return expected


def copy_canonical(prior: Path, expected: dict[str, int]) -> dict[str, Any]:
    result = base.copy_canonical(prior, expected)
    manifest_path = base.CANONICAL_DEST / "manifest.json"
    manifest = base.read_json(manifest_path)
    manifest["pr40Publication"] = {
        "status": "published",
        "works": 61,
        "canonicalOldTestamentBooks": 39,
        "deuterocanonicalWorks": 12,
        "earlyWorks": 3,
        "qumranCollections": 7,
        "excludedWorks": EXCLUDED,
        "atomicVerdict": "docs/biblia-emanus/PR40-FINAL-PUBLICATION-VERDICT.json",
    }
    base.write_json(manifest_path, manifest)
    return result


def assemble_qumran(prior: Path) -> dict[str, Any]:
    result = base.assemble_qumran(prior, prior)
    manifest_path = base.QUMRAN_DEST / "manifest.json"
    manifest = base.read_json(manifest_path)
    manifest["collectionCount"] = 7
    manifest["excludedCollections"] = {
        key: value for key, value in EXCLUDED.items() if key in {"TEMP_SCR", "ADD_PSA"}
    }
    base.write_json(manifest_path, manifest)
    result["works"] = 7
    return result


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--prior", type=Path, required=True)
    args = parser.parse_args()
    prior = args.prior.resolve()

    expected = expected_chapters(prior)
    expected_ids = base.CANONICAL | base.DEUTEROCANON | base.EARLY | set(base.QUMRAN_WITNESSES)
    if set(expected) != expected_ids:
        raise RuntimeError(
            "Green publication inventory mismatch: "
            f"missing={sorted(expected_ids - set(expected))} "
            f"extra={sorted(set(expected) - expected_ids)}"
        )
    if len(expected_ids) != 61:
        raise RuntimeError(f"Expected exactly 61 green works, got {len(expected_ids)}")

    canonical = copy_canonical(prior, expected)
    deuterocanon = base.assemble_chapter_collection(
        prior, prior, "deuterocanon", base.DEUTEROCANON, base.DEUT_DEST, expected
    )
    early = base.assemble_chapter_collection(
        prior, prior, "early", base.EARLY, base.EARLY_DEST, expected
    )
    qumran = assemble_qumran(prior)

    digests = {
        str(path.relative_to(base.ROOT)): base.sha_file(path)
        for path in base.publication_files()
    }
    report = {
        "schemaVersion": 1,
        "status": "published",
        "public": True,
        "runtimeEnabled": True,
        "sourcePullRequest": 43,
        "sourceArtifactRun": base.PRIOR_RUN,
        "publicationDecision": "publish every individually green work and exclude unfinished works",
        "counts": {
            "works": 61,
            "canonicalOldTestament": 39,
            "deuterocanon": 12,
            "earlyWorks": 3,
            "qumranCollections": 7,
        },
        "excludedWorks": EXCLUDED,
        "collections": {
            "canonical": canonical,
            "deuterocanon": deuterocanon,
            "early": early,
            "qumran": qumran,
        },
        "atomicPublication": True,
        "blockingIssues": 0,
        "fileDigestsSha256": digests,
    }
    base.write_json(base.REPORT_PATH, report)
    print(json.dumps(report, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
