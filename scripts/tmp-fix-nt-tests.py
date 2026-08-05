#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PATH = ROOT / "scripts/test_biblia_emanus_nt.py"


def replace_once(text: str, old: str, new: str) -> str:
    count = text.count(old)
    if count != 1:
        raise RuntimeError(f"expected one occurrence, found {count}: {old!r}")
    return text.replace(old, new)


def main() -> int:
    text = PATH.read_text(encoding="utf-8")
    text = text.replace('"version": "WEB-Protestant"', '"version": "WEBU-Protestant"')
    old = '''    def test_editorial_placeholders_are_rejected_anywhere_in_chapter(self) -> None:
        data, manifest, ledger, source_data = draft_nt_chapter(
            "Cartea nașterii lui Isus Hristos."
        )
        data["editorialNotes"] = ['''
    new = '''    def test_editorial_placeholders_block_approval(self) -> None:
        data, manifest, ledger, source_data = draft_nt_chapter(
            "Cartea nașterii lui Isus Hristos."
        )
        data["status"] = "approved"
        data["editorialNotes"] = ['''
    text = replace_once(text, old, new)
    PATH.write_text(text, encoding="utf-8")
    print("[nt-tests] normalized WEBU fixture and approval-only placeholder test")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
