#!/usr/bin/env python3
"""Run canonical promotion after removing only empty remap containers.

The official OSHB remapper can leave an empty trailing chapter when a Hebrew
chapter is folded into the preceding English-versification chapter (for
example Joel 4 → Joel 3). Empty containers carry no words and are removed;
all non-empty word arrays remain byte-for-byte inputs to the v3 generator.
"""
from __future__ import annotations

import importlib.util
import json
from pathlib import Path

SCRIPT = Path(__file__).with_name("promote-pr40-canonical-ot-v3.py")
spec = importlib.util.spec_from_file_location("canonical_v3", SCRIPT)
if spec is None or spec.loader is None:
    raise SystemExit(f"Cannot load {SCRIPT}")
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)
_original = module.build_remapped_usfm


def build_remapped_usfm(output: Path):
    removed: dict[str, list[int]] = {}
    for path in sorted(output.glob("*.json")):
        chapters = json.loads(path.read_text(encoding="utf-8"))
        if not isinstance(chapters, list):
            continue
        empty = [index for index, chapter in enumerate(chapters, start=1) if chapter == []]
        compact = [chapter for chapter in chapters if chapter != []]
        if empty:
            if any(not isinstance(chapter, list) for chapter in chapters):
                raise RuntimeError(f"{path.name}: malformed chapter container")
            removed[path.name] = empty
            path.write_text(json.dumps(compact, ensure_ascii=False), encoding="utf-8")
    result = _original(output)
    result["removedEmptyChapterContainers"] = removed
    return result


module.build_remapped_usfm = build_remapped_usfm
module.main()
