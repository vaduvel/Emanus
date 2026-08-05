#!/usr/bin/env python3
"""Inspect the ETCBC DSS dataset and map PR40 Qumran titles to real documents.

This stage does not copy publication text. It records the exact dataset commit,
license, TF features, document names and likely matches for the nine fabricated
PR40 works.
"""
from __future__ import annotations

import json
import re
import subprocess
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
CACHE = ROOT / ".cache" / "etcbc-dss"
OUT = ROOT / "docs" / "biblia-emanus" / "PR40-QUMRAN-ETCBC-INVENTORY.json"
REPO = "https://github.com/ETCBC/dss.git"

TARGETS: dict[str, list[str]] = {
    "ADD_PSA": ["additional psalm", "apocryphal psalm", "psalm"],
    "COMM_REG": ["community rule", "serekh hayahad", "1qs"],
    "GEN_APO": ["genesis apocryphon", "1qapgen"],
    "GIANTS": ["book of giants", "giants"],
    "HAB_COM": ["habakkuk pesher", "commentary on habakkuk", "1qpha"],
    "HODAYOT": ["hodayot", "thanksgiving hymns", "1qh"],
    "SABB_SAC": ["songs of the sabbath sacrifice", "sabbath sacrifice", "4q400"],
    "TEMP_SCR": ["temple scroll", "11q19", "11qta"],
    "WAR_SCR": ["war scroll", "1qm"],
}


def run(*args: str, cwd: Path | None = None) -> str:
    return subprocess.check_output(list(args), cwd=cwd, text=True, stderr=subprocess.STDOUT)


def normalize(value: str) -> str:
    return " ".join(re.findall(r"[a-z0-9]+", value.lower()))


def parse_tf_values(path: Path) -> dict[int, str]:
    """Read a simple node feature from TF; supports slot ranges and single nodes."""
    values: dict[int, str] = {}
    if not path.exists():
        return values
    node = 0
    in_data = False
    for raw in path.read_text(encoding="utf-8").splitlines():
        if not in_data:
            if raw == "":
                in_data = True
            continue
        if not raw or raw.startswith("@"):
            continue
        parts = raw.split("\t", 1)
        if len(parts) == 1:
            node += 1
            values[node] = parts[0]
            continue
        spec, value = parts
        if spec.isdigit():
            node = int(spec)
            values[node] = value
        elif "-" in spec and all(piece.isdigit() for piece in spec.split("-", 1)):
            start, end = map(int, spec.split("-", 1))
            for current in range(start, end + 1):
                values[current] = value
            node = end
    return values


def main() -> None:
    if CACHE.exists():
        subprocess.check_call(["rm", "-rf", str(CACHE)])
    CACHE.parent.mkdir(parents=True, exist_ok=True)
    subprocess.check_call(["git", "clone", "--depth=1", REPO, str(CACHE)])
    commit = run("git", "rev-parse", "HEAD", cwd=CACHE).strip()
    license_text = (CACHE / "LICENSE").read_text(encoding="utf-8", errors="replace")

    tf_dirs = sorted(path for path in (CACHE / "tf").glob("*") if path.is_dir())
    selected = tf_dirs[-1] if tf_dirs else None
    features: list[str] = []
    document_candidates: list[str] = []
    feature_samples: dict[str, list[str]] = {}
    if selected:
        features = sorted(path.stem for path in selected.glob("*.tf"))
        for likely in ("book", "document", "scroll", "manuscript", "name", "chapter", "column", "fragment"):
            path = selected / f"{likely}.tf"
            values = parse_tf_values(path)
            if values:
                distinct = list(dict.fromkeys(value for value in values.values() if value))
                feature_samples[likely] = distinct[:2000]
                if likely in {"book", "document", "scroll", "manuscript", "name"}:
                    document_candidates.extend(distinct)

    unique_documents = list(dict.fromkeys(document_candidates))
    mappings: dict[str, dict[str, Any]] = {}
    for target, aliases in TARGETS.items():
        scored: list[tuple[int, str]] = []
        for document in unique_documents:
            key = normalize(document)
            score = 0
            for alias in aliases:
                alias_key = normalize(alias)
                if alias_key == key:
                    score = max(score, 1000 + len(alias_key))
                elif alias_key in key:
                    score = max(score, 500 + len(alias_key))
                elif all(token in key for token in alias_key.split()):
                    score = max(score, 100 + len(alias_key))
            if score:
                scored.append((score, document))
        scored.sort(reverse=True)
        mappings[target] = {
            "aliases": aliases,
            "matches": [document for _score, document in scored[:50]],
            "resolved": bool(scored),
        }

    payload = {
        "schemaVersion": 1,
        "repository": REPO,
        "commit": commit,
        "repositoryLicenseFileSha256": __import__("hashlib").sha256(license_text.encode("utf-8")).hexdigest(),
        "datasetPolicy": {
            "publicationCollection": "qumran-research",
            "license": "CC BY-NC 4.0 for the DSS text/morphology data based on Abegg; MIT applies to repository software",
            "commercialUseAllowed": False,
            "attributionRequired": True,
            "fragmentaryTextMustRemainFragmentary": True,
        },
        "tfVersionDirectory": str(selected.relative_to(CACHE)) if selected else None,
        "features": features,
        "featureSamples": feature_samples,
        "documentCandidateCount": len(unique_documents),
        "documentCandidates": unique_documents,
        "targetMappings": mappings,
        "allTargetsResolved": all(record["resolved"] for record in mappings.values()),
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({
        "commit": commit,
        "tfVersionDirectory": payload["tfVersionDirectory"],
        "featureCount": len(features),
        "documentCandidateCount": len(unique_documents),
        "resolved": {target: record["resolved"] for target, record in mappings.items()},
    }, ensure_ascii=False, indent=2))
    if not selected or not unique_documents:
        raise SystemExit("Could not locate document names in ETCBC DSS TF data")


if __name__ == "__main__":
    main()
