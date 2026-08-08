#!/usr/bin/env python3
"""Generate and refine selected deuterocanonical Romanian candidates.

The first pass uses OPUS-MT tc-big. A second independent OPUS-MT candidate,
a pinned public-domain historical candidate where available, and the same
multilingual semantic model used by the publication audit are then used for
best-candidate selection. Set ``PR40_BOOKS`` for parallel CI shards.
"""
from __future__ import annotations

import importlib.util
import json
import os
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CANDIDATES = ROOT / "docs" / "data" / "biblia-emanus-deuterocanon-new-translation"
EXACT_SOURCE_CONFIRMED_WORDING = {
    "SIR.28:20": "Căci jugul ei este un jug de fier, iar legăturile ei sunt legături de aramă.",
}


def apply_exact_source_confirmed_wording() -> list[str]:
    """Apply reviewed wording after model selection, before the semantic audit."""
    applied: list[str] = []
    for reference, wording in EXACT_SOURCE_CONFIRMED_WORDING.items():
        chapter_id, verse_raw = reference.split(":", 1)
        path = CANDIDATES / f"{chapter_id}.json"
        if not path.is_file():
            continue
        verse_number = int(verse_raw)
        document = json.loads(path.read_text(encoding="utf-8"))
        matched = False
        for verse in document.get("verses", []):
            if verse.get("number") == verse_number:
                verse["text"] = wording
                matched = True
                break
        if not matched:
            raise RuntimeError(f"{reference}: verse missing from generated candidate")
        path.write_text(
            json.dumps(document, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
        applied.append(reference)
    return applied


SCRIPT = Path(__file__).with_name("translate-pr40-deuterocanon-missing.py")
spec = importlib.util.spec_from_file_location("pr40_deuterocanon_big", SCRIPT)
if spec is None or spec.loader is None:
    raise SystemExit(f"Cannot load {SCRIPT}")
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)
module.MODEL_ID = "Helsinki-NLP/opus-mt-tc-big-en-ro"
all_targets = {
    "1ES": "3 Ezdra",
    "1MA": "1 Macabei",
    "2MA": "2 Macabei",
    "3MA": "3 Macabei",
    "BAR": "Baruh",
    "ESG": "Adăugirile grecești la Estera",
    "JDT": "Iudita",
    "MAN": "Rugăciunea lui Manase",
    "PS2": "Psalmul 151",
    "SIR": "Înțelepciunea lui Isus, fiul lui Sirah",
    "TOB": "Tobit",
    "WIS": "Înțelepciunea lui Solomon",
}
selected_raw = os.environ.get("PR40_BOOKS", "").strip()
selected = {item.strip() for item in selected_raw.split(",") if item.strip()} if selected_raw else set(all_targets)
unknown = sorted(selected - set(all_targets))
if unknown:
    raise SystemExit(f"Unknown PR40_BOOKS values: {unknown}")
module.TARGETS.clear()
module.TARGETS.update({book_id: all_targets[book_id] for book_id in all_targets if book_id in selected})
if not module.TARGETS:
    raise SystemExit("No deuterocanonical books selected")
module.main()

batch_size = "20"
for index, argument in enumerate(sys.argv):
    if argument == "--batch-size" and index + 1 < len(sys.argv):
        batch_size = sys.argv[index + 1]
subprocess.run(
    [
        sys.executable,
        str(Path(__file__).with_name("refine-pr40-translation-candidates.py")),
        "--collection",
        "deuterocanon",
        "--batch-size",
        batch_size,
    ],
    check=True,
)
print(
    json.dumps(
        {"sourceConfirmedWordings": apply_exact_source_confirmed_wording()},
        ensure_ascii=False,
    )
)
