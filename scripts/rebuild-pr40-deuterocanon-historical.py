#!/usr/bin/env python3
"""Run 1914 extraction for seven works and record five new translations."""
from __future__ import annotations

import importlib.util
import json
from pathlib import Path

SCRIPT = Path(__file__).with_name("rebuild-pr40-deuterocanon.py")
spec = importlib.util.spec_from_file_location("pr40_deuterocanon", SCRIPT)
if spec is None or spec.loader is None:
    raise SystemExit(f"Cannot load {SCRIPT}")
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)
module.BOOKS["MAN"] = {"name": "Rugăciunea lui Manase", "mode": "new-translation"}
module.BOOKS["PS2"] = {"name": "Psalmul 151", "mode": "new-translation"}
module.main()

report = json.loads(module.REPORT.read_text(encoding="utf-8"))
required = [
    book_id
    for book_id, metadata in module.BOOKS.items()
    if metadata["mode"] == "new-translation"
]
report["newTranslationRequired"] = required
report["summary"]["newTranslationsRequired"] = len(required)
report["summary"]["allTwelvePublicationReady"] = False
module.REPORT.write_text(
    json.dumps(report, ensure_ascii=False, indent=2) + "\n",
    encoding="utf-8",
)
print(json.dumps({"newTranslationRequired": required}, ensure_ascii=False, indent=2))
