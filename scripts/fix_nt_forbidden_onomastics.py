#!/usr/bin/env python3
"""Apply the canonical NT form Hristos and refresh chapter audit digests."""

from __future__ import annotations

import importlib.util
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs/data/biblia-emanus"
CORRECTIONS = ROOT / "docs/biblia-emanus/nt-final-review/nt-final-codex-corrections.json"
CHAPTERS = ("LUK.20.json", "LUK.22.json", "LUK.23.json", "LUK.24.json")


def load_validator():
    path = ROOT / "scripts/check-biblia-emanus.py"
    spec = importlib.util.spec_from_file_location("biblia_emanus_validator", path)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Cannot load validator from {path}")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def main() -> None:
    validator = load_validator()
    ledger = json.loads(CORRECTIONS.read_text(encoding="utf-8"))
    corrections = ledger["corrections"]
    known = {item["reference"] for item in corrections}
    changed = 0

    for filename in CHAPTERS:
        path = DATA / filename
        chapter = json.loads(path.read_text(encoding="utf-8"))
        chapter_changed = False
        for verse in chapter["verses"]:
            current = verse["text"]
            final = current.replace("Cristos", "Hristos")
            if final == current:
                continue
            reference = f"LUK.{chapter['chapter']}.{verse['number']}"
            if reference not in known:
                corrections.append(
                    {
                        "reference": reference,
                        "currentText": current,
                        "finalText": final,
                        "sourceAnchor": "SBLGNT Χριστός; onomastics.json: Hristos",
                        "reason": "Uniformizează numele mesianic la forma canonică Biblia Emanus fără a modifica sensul textului grecesc.",
                    }
                )
                known.add(reference)
            verse["text"] = final
            chapter_changed = True
            changed += 1
        if chapter_changed:
            chapter["audit"]["textDigest"] = validator.chapter_text_digest(chapter)
            chapter["audit"]["contentDigest"] = validator.chapter_content_digest(chapter)
            path.write_text(json.dumps(chapter, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    CORRECTIONS.write_text(json.dumps(ledger, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Applied {changed} canonical-name corrections; ledger={len(corrections)}")


if __name__ == "__main__":
    main()
