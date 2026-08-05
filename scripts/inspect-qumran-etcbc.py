#!/usr/bin/env python3
"""Map every fabricated PR40 Qumran title to authentic manuscript sigla.

This stage inventories only. It records the ETCBC DSS commit, dataset policy,
Text-Fabric features and the exact scroll families that will replace PR40's
invented chapter payloads. No publication text is copied here.
"""
from __future__ import annotations

import hashlib
import json
import subprocess
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
CACHE = ROOT / ".cache" / "etcbc-dss"
OUT = ROOT / "docs" / "biblia-emanus" / "PR40-QUMRAN-ETCBC-INVENTORY.json"
REPO = "https://github.com/ETCBC/dss.git"

TARGET_SCROLLS: dict[str, dict[str, Any]] = {
    "ADD_PSA": {
        "name": "Psalmi și compoziții poetice suplimentare",
        "scrolls": ["11Q5", "11Q6", "4Q88", "4Q380", "4Q381"],
        "publicationForm": "multi-scroll-fragment-edition",
    },
    "COMM_REG": {
        "name": "Regula Comunității",
        "scrolls": ["1QS", "1QSa", "1QSb"],
        "publicationForm": "multi-scroll-fragment-edition",
    },
    "GEN_APO": {
        "name": "Apocriful Genezei",
        "scrolls": ["1Q20"],
        "publicationForm": "single-scroll-fragment-edition",
    },
    "GIANTS": {
        "name": "Cartea Uriașilor",
        "scrolls": ["1Q23", "2Q26", "4Q203", "4Q206", "4Q530", "4Q531", "4Q532", "4Q533", "6Q8"],
        "publicationForm": "reconstructed-multi-scroll-fragment-edition",
    },
    "HAB_COM": {
        "name": "Comentariul la Habacuc",
        "scrolls": ["1QpHab"],
        "publicationForm": "single-scroll-fragment-edition",
    },
    "HODAYOT": {
        "name": "Imnurile de mulțumire / Hodayot",
        "scrolls": ["1QHa"],
        "publicationForm": "single-scroll-fragment-edition",
    },
    "SABB_SAC": {
        "name": "Cântările jertfei de Sabat",
        "scrolls": ["4Q400", "4Q401", "4Q402", "4Q403", "4Q404", "4Q405", "4Q406", "4Q407", "11Q17"],
        "publicationForm": "reconstructed-multi-scroll-fragment-edition",
    },
    "TEMP_SCR": {
        "name": "Sulul Templului",
        "scrolls": ["11Q19", "11Q20"],
        "publicationForm": "multi-scroll-fragment-edition",
    },
    "WAR_SCR": {
        "name": "Sulul Războiului",
        "scrolls": ["1QM", "4Q491", "4Q492", "4Q493", "4Q494", "4Q495", "4Q496", "4Q497"],
        "publicationForm": "reconstructed-multi-scroll-fragment-edition",
    },
}


def run(*args: str, cwd: Path | None = None) -> str:
    return subprocess.check_output(list(args), cwd=cwd, text=True, stderr=subprocess.STDOUT)


def parse_tf_values(path: Path) -> dict[int, str]:
    values: dict[int, str] = {}
    if not path.exists():
        return values
    node = 0
    data_started = False
    for raw in path.read_text(encoding="utf-8").splitlines():
        if not data_started:
            if raw == "":
                data_started = True
            continue
        if not raw or raw.startswith("@"):
            continue
        parts = raw.split("\t", 1)
        if len(parts) == 1:
            node += 1
            values[node] = parts[0]
            continue
        specification, value = parts
        if specification.isdigit():
            node = int(specification)
            values[node] = value
        elif "-" in specification and all(piece.isdigit() for piece in specification.split("-", 1)):
            start, end = map(int, specification.split("-", 1))
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

    tf_directories = sorted(path for path in (CACHE / "tf").glob("*") if path.is_dir())
    selected = tf_directories[-1] if tf_directories else None
    if selected is None:
        raise SystemExit("ETCBC DSS has no Text-Fabric directory")

    features = sorted(path.stem for path in selected.glob("*.tf"))
    scroll_values = list(dict.fromkeys(parse_tf_values(selected / "scroll.tf").values()))
    scroll_set = set(scroll_values)
    mappings: dict[str, dict[str, Any]] = {}
    missing: list[dict[str, str]] = []
    for target, metadata in TARGET_SCROLLS.items():
        present = [scroll for scroll in metadata["scrolls"] if scroll in scroll_set]
        absent = [scroll for scroll in metadata["scrolls"] if scroll not in scroll_set]
        mappings[target] = {
            **metadata,
            "presentScrolls": present,
            "absentScrolls": absent,
            "resolved": not absent,
        }
        missing.extend({"bookId": target, "scroll": scroll} for scroll in absent)

    payload = {
        "schemaVersion": 2,
        "repository": REPO,
        "commit": commit,
        "repositoryLicenseFileSha256": hashlib.sha256(license_text.encode("utf-8")).hexdigest(),
        "datasetPolicy": {
            "publicationCollection": "qumran-research",
            "license": "CC BY-NC 4.0 for DSS text/morphology data based on Abegg; MIT for repository software",
            "commercialUseAllowed": False,
            "attributionRequired": True,
            "fragmentaryTextMustRemainFragmentary": True,
            "reconstructedOrderMustBeMarked": True,
        },
        "tfVersionDirectory": str(selected.relative_to(CACHE)),
        "features": features,
        "scrollCount": len(scroll_values),
        "scrolls": scroll_values,
        "targetMappings": mappings,
        "missingExpectedScrolls": missing,
        "allTargetsResolved": not missing,
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({
        "commit": commit,
        "tfVersionDirectory": payload["tfVersionDirectory"],
        "scrollCount": len(scroll_values),
        "resolved": {target: record["resolved"] for target, record in mappings.items()},
        "missing": missing,
    }, ensure_ascii=False, indent=2))
    if missing:
        raise SystemExit("One or more expected Qumran scroll sigla are absent; inspect inventory")


if __name__ == "__main__":
    main()
