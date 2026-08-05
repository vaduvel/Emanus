#!/usr/bin/env python3
"""Validate one or more Biblia Emanus books without requiring the whole corpus to publish."""

from __future__ import annotations

import argparse
import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def load_validator():
    path = ROOT / "scripts" / "check-biblia-emanus.py"
    spec = importlib.util.spec_from_file_location("biblia_emanus_validator", path)
    if spec is None or spec.loader is None:
        raise RuntimeError("Nu pot încărca validatorul Biblia Emanus")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--book", action="append", required=True, dest="books")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    validator = load_validator()
    try:
        manifest = validator.load_json(validator.MANIFEST_PATH)
        paths = validator.validate_manifest(manifest)
        source_data = validator.validate_source_lock(
            validator.load_json(paths["sourceLock"])
        )
        ledger = validator.validate_ledger(
            validator.load_json(paths["sourceLedger"]), source_data
        )
        validator.validate_source_coverage(ledger, source_data)
        forbidden = validator.validate_onomastics(
            validator.load_json(paths["onomastics"])
        )
        requested = set(args.books)
        unknown = requested.difference(source_data["books"])
        if unknown:
            validator.fail(f"cărți necunoscute: {', '.join(sorted(unknown))}")
        chapter_paths = sorted(
            (
                path
                for path in validator.DATA_DIR.glob("*.json")
                if path.stem.rsplit(".", 1)[0] in requested
                and path.stem.rsplit(".", 1)[-1].isdigit()
            ),
            key=validator.chapter_sort_key,
        )
        expected = {
            chapter_id for chapter_id in ledger
            if chapter_id.split(".", 1)[0] in requested
        }
        if {path.stem for path in chapter_paths} != expected:
            validator.fail("fișierele selectate nu corespund registrului")
        validated = [
            validator.validate_chapter(
                path,
                validator.load_json(path),
                manifest,
                ledger,
                source_data,
                forbidden,
            )
            for path in chapter_paths
        ]
    except validator.ValidationError as error:
        print(f"[biblia-emanus-book] EROARE: {error}")
        return 1
    print(
        f"[biblia-emanus-book] OK: {len(validated)} capitole, "
        f"{sum(item[1] for item in validated)} versete"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
