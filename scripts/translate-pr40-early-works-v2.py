#!/usr/bin/env python3
"""Generate and refine early-work candidates with two independent passes."""
from __future__ import annotations

import importlib.util
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCRIPT = Path(__file__).with_name("translate-pr40-early-works.py")
CANDIDATES = ROOT / "docs" / "data" / "biblia-emanus-early-romanian-candidates"
THOUSANDS_WITH_MACHINE_SPACE = re.compile(r"(?<=\d),\s+(?=\d{3}\b)")


def normalize_numeric_formatting() -> int:
    """Remove MT-inserted spaces inside thousands tokens without changing digits."""
    changed_files = 0
    if not CANDIDATES.is_dir():
        return changed_files
    for path in sorted(CANDIDATES.glob("*.json")):
        document = json.loads(path.read_text(encoding="utf-8"))
        changed = False
        for verse in document.get("verses", []):
            text = verse.get("text")
            if not isinstance(text, str):
                continue
            normalized = THOUSANDS_WITH_MACHINE_SPACE.sub(",", text)
            if normalized != text:
                verse["text"] = normalized
                changed = True
        if changed:
            path.write_text(
                json.dumps(document, ensure_ascii=False, indent=2) + "\n",
                encoding="utf-8",
            )
            changed_files += 1
    return changed_files


spec = importlib.util.spec_from_file_location("pr40_early_translation_big", SCRIPT)
if spec is None or spec.loader is None:
    raise SystemExit(f"Cannot load {SCRIPT}")
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)
module.MODEL_ID = "Helsinki-NLP/opus-mt-tc-big-en-ro"
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
        "early",
        "--batch-size",
        batch_size,
    ],
    check=True,
)
print(json.dumps({"normalizedThousandsFiles": normalize_numeric_formatting()}))
