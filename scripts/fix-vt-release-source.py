#!/usr/bin/env python3
"""Normalizează defecte de serializare TypeScript din cărțile VT legacy.

Nu schimbă doctrina și nu rescrie explicațiile. Repară exclusiv:
- escape-uri Unicode literale/defecte rămase în Deuteronom/Numeri;
- ghilimele ASCII neescape-uite aflate în interiorul stringurilor textuale;
- câteva artefacte mecanice produse de serializarea veche a lui „î/în”.

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

TARGET_GLOBS = (
    "deuteronom*.ts",
    "numeri*.ts",
)

UNICODE_ESCAPE = re.compile(r"\\u([0-9a-fA-F]{4})")
MALFORMED_ROMANIAN_I = re.compile(r"\\u00c(?=[^0-9a-fA-F])")

# Artefacte mecanice observate în serializarea legacy. Aceste înlocuiri repară
# numai forme imposibile în română produse după decodarea unui \u00ce accidental.
TOKEN_FIXES = {
    "Îltreag": "întreag",
    "îltreag": "întreag",
    "Îlocu": "înlocu",
    "îlocu": "înlocu",
    "Îlseamn": "înseamn",
    "îlseamn": "înseamn",
    "Îlche": "înche",
    "îlche": "înche",
    "Îlvăț": "învăț",
    "îlvăț": "învăț",
    "Îlvaț": "învaț",
    "îlvaț": "învaț",
    "Îlchin": "închin",
    "îlchin": "închin",
    "Îlcred": "încred",
    "îlcred": "încred",
    "Îlfrunt": "înfrunt",
    "îlfrunt": "înfrunt",
    "Îlving": "înving",
    "îlving": "înving",
    "Îlvi": "învi",
    "îlvi": "învi",
    "Îltorc": "întorc",
    "îltorc": "întorc",
    "Îltâi": "întâi",
    "îltâi": "întâi",
    "Îltăi": "întăi",
    "îltăi": "întăi",
    "Îltr": "într",
    "îltr": "într",
}


def decode_unicode_escapes(text: str) -> str:
    # Decodăm numai forma explicită \uXXXX. Nu folosim unicode_escape peste
    # întregul fișier, ca să nu alterăm backslash-uri legitime precum \n.
    text = UNICODE_ESCAPE.sub(lambda m: chr(int(m.group(1), 16)), text)
    # Serializarea veche a lăsat uneori „\u00c” urmat de o literă nehex.
    # Intenția observabilă este litera românească „î”.
    text = MALFORMED_ROMANIAN_I.sub("î", text)
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
    """Transformă doar ghilimelele INTERIOARE ale unui string pe o singură linie.

    Exemple:
      "text "citat" text",  -> "text „citat” text",

    Importurile, array-urile și proprietățile cu string simplu nu sunt atinse.
    """
    stripped = line.lstrip()
    if not stripped.startswith('"'):
        return line

    positions = unescaped_quote_positions(line)
    if len(positions) <= 2:
        return line

    first, last = positions[0], positions[-1]
    inner = positions[1:-1]
    chars = list(line)
    opening = True
    for pos in inner:
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
    # „Îl...” lipit de un cuvânt poate fi artefact, dar „Îl ” ca pronume este valid.
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

    for path in targets():
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
            rel = path.relative_to(ROOT)
            print(f"  {rel}: {', '.join(sorted(tokens))}")

    if args.check and changed:
        print(f"Sunt {len(changed)} fișiere VT legacy care necesită normalizare:")
        for path in changed:
            print(f"  {path.relative_to(ROOT)}")
        raise SystemExit(1)

    action = "normalizate" if args.write else "verificate"
    print(f"VT legacy: {len(targets())} fișiere {action}; {len(changed)} au avut modificări.")


if __name__ == "__main__":
    main()
