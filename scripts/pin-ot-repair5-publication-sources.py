#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs" / "data" / "biblia-emanus-candidates"
SOURCES = DATA / "sources"
MANIFEST = DATA / "manifest.json"

FILES = {
    "engwebp": "engwebp_usfm.zip",
    "hboWLC": "hboWLC_usfm.zip",
    "ronbtf": "ronbtf_usfm.zip",
    "ron1924": "ron1924_usfm.zip",
    "eng-webbe": "eng-webbe_usfm.zip",
}


def sha(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main() -> None:
    missing = [name for name in FILES.values() if not (SOURCES / name).exists()]
    if missing:
        raise SystemExit(f"Missing pinned archives: {missing}")
    doc = json.loads(MANIFEST.read_text(encoding="utf-8"))
    doc["sources"] = {
        "english": {
            "id": "engwebp",
            "name": "World English Bible, Protestant Edition",
            "license": "Public Domain",
            "snapshot": f"sources/{FILES['engwebp']}",
            "sha256": sha(SOURCES / FILES["engwebp"]),
            "role": "public-domain bridge and target versification"
        },
        "hebrew": {
            "id": "hboWLC",
            "name": "Westminster Leningrad Codex",
            "license": "Public Domain text",
            "snapshot": f"sources/{FILES['hboWLC']}",
            "sha256": sha(SOURCES / FILES["hboWLC"]),
            "role": "Hebrew authority for canonical Old Testament"
        },
        "romanianBtf": {
            "id": "ronbtf",
            "name": "Biblia Traducerea Fidelă",
            "license": "Public Domain",
            "snapshot": f"sources/{FILES['ronbtf']}",
            "sha256": sha(SOURCES / FILES["ronbtf"]),
            "role": "comparison-only benchmark"
        },
        "romanianCornilescu1924": {
            "id": "ron1924",
            "name": "Biblia Dumitru Cornilescu 1924",
            "license": "Public Domain",
            "snapshot": f"sources/{FILES['ron1924']}",
            "sha256": sha(SOURCES / FILES["ron1924"]),
            "role": "comparison-only benchmark"
        },
        "deuterocanonBridge": {
            "id": "eng-webbe",
            "name": "World English Bible British Edition with Deuterocanon",
            "license": "Public Domain",
            "snapshot": f"sources/{FILES['eng-webbe']}",
            "sha256": sha(SOURCES / FILES["eng-webbe"]),
            "role": "supplement research only; not used to publish the 66-book canon"
        }
    }
    MANIFEST.write_text(json.dumps(doc, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    lines = []
    for key, filename in FILES.items():
        lines.append(f"{sha(SOURCES / filename)}  {filename}")
    (SOURCES / "SHA256SUMS").write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(json.dumps(doc["sources"], ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
