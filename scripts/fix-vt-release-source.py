#!/usr/bin/env python3
"""Normalizează defecte de serializare TypeScript din cărțile VT legacy.

Nu schimbă doctrina și nu rescrie explicațiile. Repară exclusiv:
- escape-uri Unicode literale/defecte rămase în Deuteronom/Numeri;
- ghilimele ASCII neescape-uite aflate în interiorul stringurilor textuale;
- artefacte mecanice produse de serializarea veche a diacriticelor.

Utilizare:
  python3 scripts/fix-vt-release-source.py --check
  python3 scripts/fix-vt-release-source.py --write
"""

from __future__ import annotations

import argparse
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BIBLE = ROOT / "packages" / "shared" / "src" / "bible"
TARGET_GLOBS = ("deuteronom*.ts", "numeri*.ts")

UNICODE_ESCAPE = re.compile(r"\\u([0-9a-fA-F]{4})")
MALFORMED_ROMANIAN_I = re.compile(r"\\u00[ce](?=[^0-9a-fA-F])")
MALFORMED_ROMANIAN_A_OR_I = re.compile(r"\\u00(?=[A-Za-zĂÂÎȘȚăâîșț])")

MECHANICAL_ESCAPE_FIXES = {r"\u015s": "ș", r"\u015S": "Ș", r"\u103": "ă"}

TOKEN_FIXES = {
    "Îltreag": "întreag", "îltreag": "întreag",
    "Îlocu": "înlocu", "îlocu": "înlocu", "Îllocu": "înlocu", "îllocu": "înlocu",
    "Îlseamn": "înseamn", "îlseamn": "înseamn", "Îlsemna": "însemna", "îlsemna": "însemna",
    "Îlche": "înche", "îlche": "înche", "Îlceput": "început", "îlceput": "început",
    "Îlcepe": "începe", "îlcepe": "începe", "Îlvăț": "învăț", "îlvăț": "învăț",
    "Îlveț": "înveț", "îlveț": "înveț", "Îlvaț": "învaț", "îlvaț": "învaț",
    "Îlchin": "închin", "îlchin": "închin", "Îlcred": "încred", "îlcred": "încred",
    "Îlfrunt": "înfrunt", "îlfrunt": "înfrunt", "Îlfrico": "înfrico", "îlfrico": "înfrico",
    "Îlving": "înving", "îlving": "înving", "Îlvi": "învi", "îlvi": "învi",
    "Îlmulț": "înmulț", "îlmulț": "înmulț", "Îldepărt": "îndepărt", "îldepărt": "îndepărt",
    "Îldreapt": "îndreapt", "îldreapt": "îndreapt", "Îldurat": "îndurat", "îldurat": "îndurat",
    "Îldurare": "îndurare", "îldurare": "îndurare", "Îldoial": "îndoial", "îldoial": "îndoial",
    "Îltoarc": "întoarc", "îltoarc": "întoarc", "Îltors": "întors", "îltors": "întors",
    "Îltorc": "întorc", "îltorc": "întorc", "Îltâi": "întâi", "îltâi": "întâi",
    "Îltăi": "întăi", "îltăi": "întăi", "Îltind": "întind", "îltind": "întind",
    "Îltăr": "întăr", "îltăr": "întăr", "Îltr": "într", "îltr": "într",
    "Îlainte": "înainte", "îlainte": "înainte", "Îllături": "înlături", "îllături": "înlături",
    "Îllătur": "înlătur", "îllătur": "înlătur", "Îlcerc": "încerc", "îlcerc": "încerc",
    "Îlcă": "încă", "îlcă": "încă", "Îlfrumuseț": "înfrumuseț", "îlfrumuseț": "înfrumuseț",
    "Îlpărț": "împărț", "îlpărț": "împărț", "Îlvoial": "învoial", "îlvoial": "învoial",
    "Îleleas": "înțeleas", "îleleas": "înțeleas", "Îleleag": "înțeleag", "îleleag": "înțeleag",
    "Îlalț": "înălț", "îlalț": "înălț", "Îlsuș": "însuș", "îlsuș": "însuș",
    "Îlsăș": "însăș", "îlsăș": "însăș", "Îltemeiaz": "întemeiaz", "îltemeiaz": "întemeiaz",
    "Îltîmpl": "întâmpl", "îltîmpl": "întâmpl", "Îlți": "înți", "îlți": "înți",
}


def malformed_a_or_i(text: str) -> str:
    # Recuperează un prefix Unicode trunchiat după poziția în cuvânt:
    # în interior -> â; la început -> î.
    def repl(match: re.Match[str]) -> str:
        pos = match.start()
        previous = text[pos - 1] if pos > 0 else ""
        return "â" if previous.isalpha() else "î"
    return MALFORMED_ROMANIAN_A_OR_I.sub(repl, text)


def decode_unicode_escapes(text: str) -> str:
    text = UNICODE_ESCAPE.sub(lambda m: chr(int(m.group(1), 16)), text)
    for bad, good in MECHANICAL_ESCAPE_FIXES.items():
        text = text.replace(bad, good)
    text = MALFORMED_ROMANIAN_I.sub("î", text)
    text = malformed_a_or_i(text)
    for bad, good in TOKEN_FIXES.items():
        text = text.replace(bad, good)
    return text


def unescaped_quote_positions(line: str) -> list[int]:
    positions: list[int] = []
    escaped = False
    for index, char in enumerate(line):
        if char == "\\" and not escaped:
            escaped = True
            continue
        if char == '"' and not escaped:
            positions.append(index)
        escaped = False
    return positions


def fix_inner_quotes(line: str) -> str:
    if not line.lstrip().startswith('"'):
        return line
    positions = unescaped_quote_positions(line)
    if len(positions) <= 2:
        return line
    chars = list(line)
    opening = True
    for pos in positions[1:-1]:
        chars[pos] = "„" if opening else "”"
        opening = not opening
    return "".join(chars)


def normalize(path: Path) -> tuple[str, str]:
    before = path.read_text(encoding="utf-8")
    after = decode_unicode_escapes(before)
    after = "\n".join(fix_inner_quotes(line) for line in after.split("\n"))
    return before, after


def targets() -> list[Path]:
    found: set[Path] = set()
    for pattern in TARGET_GLOBS:
        found.update(BIBLE.glob(pattern))
    return sorted(found)


def suspicious_tokens(text: str) -> set[str]:
    suspicious = set(re.findall(r"\\u[0-9A-Za-z]{1,8}", text))
    suspicious.update(re.findall(r"\bÎl[a-zăâîșț]+", text))
    return suspicious


def main() -> None:
    parser = argparse.ArgumentParser()
    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument("--check", action="store_true")
    mode.add_argument("--write", action="store_true")
    args = parser.parse_args()

    changed: list[Path] = []
    suspicious: dict[Path, set[str]] = {}
    all_targets = targets()
    for path in all_targets:
        before, after = normalize(path)
        if before != after:
            changed.append(path)
            if args.write:
                path.write_text(after, encoding="utf-8")
        tokens = suspicious_tokens(after)
        if tokens:
            suspicious[path] = tokens

    if suspicious:
        print("Tokeni care merită inspecție editorială după normalizare:")
        for path, tokens in suspicious.items():
            print(f"  {path.relative_to(ROOT)}: {', '.join(sorted(tokens))}")

    if args.check and changed:
        print(f"Sunt {len(changed)} fișiere VT legacy care necesită normalizare:")
        for path in changed:
            print(f"  {path.relative_to(ROOT)}")
        raise SystemExit(1)

    action = "normalizate" if args.write else "verificate"
    print(f"VT legacy: {len(all_targets)} fișiere {action}; {len(changed)} au avut modificări.")


if __name__ == "__main__":
    main()
