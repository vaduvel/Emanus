#!/usr/bin/env python3
from __future__ import annotations

import importlib.util
import json
import os
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OLD = Path(os.environ.get("OLD_PIPELINE", "scripts/tmp-old-pipeline.generated.py"))
SPEC = importlib.util.spec_from_file_location("old_nt_pipeline", OLD)
assert SPEC and SPEC.loader
old = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = old
SPEC.loader.exec_module(old)

report = json.loads((ROOT / "tmp-nt-human-quality" / "report.json").read_text(encoding="utf-8"))
selected_refs = set()
for issue in report["issues"]:
    if issue["severity"] in {"critical", "high"}:
        selected_refs.add(issue["ref"])
    elif issue["code"] == "punctuation" and issue["detail"] != "închidere de citat posibil coruptă":
        selected_refs.add(issue["ref"])

manifest = old.validator.load_json(old.validator.MANIFEST_PATH)
paths = old.validator.validate_manifest(manifest)
source_data = old.validator.validate_source_lock(old.validator.load_json(paths["sourceLock"]))


def branch_candidate(path: str, verse: int):
    try:
        raw = subprocess.check_output(
            ["git", "show", f"origin/codex/biblia-emanus-new-testament:{path}"],
            text=True,
            stderr=subprocess.DEVNULL,
        )
        data = json.loads(raw)
        candidate = next((item.get("text", "") for item in data.get("verses", []) if item.get("number") == verse), "")
        if candidate and not old.PLACEHOLDER.search(candidate):
            return candidate
    except Exception:
        return None
    return None

records = []
for ref in sorted(selected_refs, key=lambda value: old.validator.verse_id_sort_key(value)):
    book_id, chapter_s, verse_s = ref.split(".")
    chapter = int(chapter_s)
    verse = int(verse_s)
    chapter_path = old.DATA_DIR / f"{book_id}.{chapter}.json"
    data = old.validator.load_json(chapter_path)
    current = next(item["text"] for item in data["verses"] if item["number"] == verse)
    book = source_data["books"][book_id]
    source = old.clean_source(old.source_text(source_data, book["baseLockId"], book_id, chapter, verse))
    greek = old.greek_text(source_data, book["originalLockId"], book_id, chapter, verse)
    benchmarks = {
        lock_id: source_data["texts"][lock_id].get((chapter, verse), "")
        for lock_id in book["benchmarkLockIds"]
    }
    related = [item for item in report["issues"] if item["ref"] == ref]
    records.append({
        "ref": ref,
        "source": source,
        "greek": greek,
        "current": current,
        "pr37": branch_candidate(f"docs/data/biblia-emanus/{book_id}.{chapter}.json", verse),
        "benchmarks": benchmarks,
        "issues": related,
    })

out = ROOT / "tmp-nt-repair-candidates"
out.mkdir(exist_ok=True)
(out / "candidates.json").write_text(json.dumps(records, ensure_ascii=False, indent=2), encoding="utf-8")
print(json.dumps({"records": len(records)}, ensure_ascii=False))
