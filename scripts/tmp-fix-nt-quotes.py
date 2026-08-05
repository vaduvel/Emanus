#!/usr/bin/env python3
from __future__ import annotations

import json
from pathlib import Path
from typing import Callable

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs/data/biblia-emanus"


def load(chapter_id: str) -> tuple[Path, dict]:
    path = DATA / f"{chapter_id}.json"
    return path, json.loads(path.read_text(encoding="utf-8"))


def change(chapter_id: str, verse_number: int, transform: Callable[[str], str]) -> None:
    path, data = load(chapter_id)
    verse = next((item for item in data["verses"] if item["number"] == verse_number), None)
    if verse is None:
        raise RuntimeError(f"{chapter_id}.{verse_number}: verse missing")
    old = verse["text"]
    new = transform(old)
    if new == old:
        raise RuntimeError(f"{chapter_id}.{verse_number}: expected quote defect not found")
    verse["text"] = new
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"[nt-quotes] {chapter_id}.{verse_number}: repaired")


def remove_final_outer(expected_suffix: str = "”") -> Callable[[str], str]:
    def apply(text: str) -> str:
        if not text.endswith(expected_suffix):
            raise RuntimeError(f"expected final {expected_suffix!r}: {text!r}")
        return text[:-1]
    return apply


def append_final_outer(text: str) -> str:
    if text.endswith("”"):
        raise RuntimeError("outer quote already present")
    return text + "”"


def replace_exact(old_fragment: str, new_fragment: str) -> Callable[[str], str]:
    def apply(text: str) -> str:
        if text.count(old_fragment) != 1:
            raise RuntimeError(
                f"expected one occurrence of {old_fragment!r}, found {text.count(old_fragment)}"
            )
        return text.replace(old_fragment, new_fragment)
    return apply


def replace_many(*pairs: tuple[str, str]) -> Callable[[str], str]:
    def apply(text: str) -> str:
        result = text
        for old, new in pairs:
            if result.count(old) != 1:
                raise RuntimeError(
                    f"expected one occurrence of {old!r}, found {result.count(old)}"
                )
            result = result.replace(old, new)
        return result
    return apply


def main() -> int:
    change("ACT.1", 22, remove_final_outer())
    change("ACT.22", 21, replace_exact("neamuri.»»", "neamuri.»”"))
    change(
        "MAT.13",
        30,
        replace_many(
            ("“Strângeți", "‘Strângeți"),
            ("hambarul meu.”»”", "hambarul meu.’»”"),
        ),
    )
    change("MAT.20", 16, remove_final_outer())
    change("MAT.25", 46, remove_final_outer())
    change("MAT.5", 48, append_final_outer)
    change("MAT.7", 27, remove_final_outer())
    change(
        "MRK.12",
        36,
        replace_many(
            ("“Șezi", "‘Șezi"),
            ("Tale.”»", "Tale.’»"),
        ),
    )
    change(
        "MRK.14",
        14,
        replace_many(
            ("“Unde", "‘Unde"),
            ("Mei?”»", "Mei?’»"),
        ),
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
