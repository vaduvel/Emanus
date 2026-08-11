#!/usr/bin/env python3
from __future__ import annotations

import json
import shutil
from pathlib import Path

ROOT = Path.cwd()
DATA = ROOT / "docs/data/biblia-explicata"
PACK = DATA / "nt-addressable-wave2-review-pack"
INDEX = PACK / "index.json"
TARGETS = ("matei", "apocalipsa")


def fail(message: str) -> None:
    raise SystemExit(f"[wave2 unit inspection files] {message}")


if not INDEX.exists():
    fail("wave2 index missing")
index = json.loads(INDEX.read_text(encoding="utf-8"))
if index.get("schema") != "emanus-nt-addressable-wave2-review-pack-v2":
    fail(f"expected v2 pack, got {index.get('schema')}")

written = 0
for book_id in TARGETS:
    book_cfg = (index.get("books") or {}).get(book_id)
    if not isinstance(book_cfg, dict):
        fail(f"{book_id}: index entry missing")
    unit_map: dict[str, dict] = {}
    for rep in book_cfg.get("representations", []):
        meta_path = PACK / rep["metaFile"]
        if not meta_path.exists():
            fail(f"{book_id}: meta missing: {rep['metaFile']}")
        meta = json.loads(meta_path.read_text(encoding="utf-8"))
        if meta.get("bookId") != book_id:
            fail(f"{rep['metaFile']}: wrong book")
        transcript = {
            "representation": meta["representation"],
            "transcriptUrl": meta["transcriptUrl"],
            "transcriptSha256": meta["transcriptSha256"],
            "wordCount": meta["wordCount"],
            "chunks": meta["chunks"],
        }
        for unit in meta.get("units", []):
            unit_id = unit.get("unitId")
            if not unit_id:
                fail(f"{rep['metaFile']}: mapped unit lacks id")
            current = unit_map.get(unit_id)
            core = {
                "bookId": unit["bookId"],
                "chapter": unit["chapter"],
                "unitId": unit_id,
                "ref": unit.get("ref"),
                "verseStart": unit.get("verseStart"),
                "verseEnd": unit.get("verseEnd"),
                "snapshot": unit["snapshot"],
                "snapshotSha256": unit["snapshotSha256"],
                "sourceIds": unit.get("sourceIds", []),
                "sourceAnchors": unit.get("sourceAnchors", []),
                "officialSourceUrl": unit.get("officialSourceUrl"),
                "officialSourceResolution": unit.get("officialSourceResolution"),
                "coverageVerification": unit.get("coverageVerification"),
            }
            if current is None:
                current = {**core, "transcripts": []}
                unit_map[unit_id] = current
            else:
                for key, value in core.items():
                    if current.get(key) != value:
                        fail(f"{unit_id}: unit metadata differs across transcript representations at {key}")
            if transcript not in current["transcripts"]:
                current["transcripts"].append(transcript)

    expected = int(book_cfg.get("directUnits", -1))
    if len(unit_map) != expected:
        fail(f"{book_id}: expected {expected} direct unit files, assembled {len(unit_map)}")
    out_dir = PACK / book_id / "units"
    if out_dir.exists():
        shutil.rmtree(out_dir)
    out_dir.mkdir(parents=True)
    for unit_id, payload in sorted(unit_map.items()):
        payload["transcripts"].sort(key=lambda item: item["representation"])
        out = {
            "schema": "emanus-nt-addressable-wave2-unit-inspection-v1",
            "policy": "Inspection only. Semantic approval requires reading every complete transcript representation listed here and then freezing a keep/rewrite decision against this exact snapshotSha256.",
            **payload,
        }
        (out_dir / f"{unit_id}.json").write_text(json.dumps(out, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        written += 1

print(f"Wave2 unit inspection files: {written} exact current snapshots materialized (125 Matei + 53 Apocalipsa).")
