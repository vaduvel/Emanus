#!/usr/bin/env python3
"""Poarta consolidată pentru finalizarea Noului Testament."""
from __future__ import annotations
import argparse, json, re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BIBLE = ROOT / "packages" / "shared" / "src" / "bible"
DATA = ROOT / "docs" / "data"
BOOKS = [
    {"slug":"2-tesaloniceni","var":"DOI_TESALONICENI","camel":"doiTesaloniceni","name":"2 Tesaloniceni","bookId":"2TH","counts":[12,17,18]},
    {"slug":"1-timotei","var":"UNU_TIMOTEI","camel":"unuTimotei","name":"1 Timotei","bookId":"1TI","counts":[20,15,16,16,25,21]},
    {"slug":"2-timotei","var":"DOI_TIMOTEI","camel":"doiTimotei","name":"2 Timotei","bookId":"2TI","counts":[18,26,17,22]},
    {"slug":"evrei","var":"EVREI","camel":"evrei","name":"Evrei","bookId":"HEB","counts":[14,18,19,16,14,20,28,13,28,39,40,29,25]},
    {"slug":"iacov","var":"IACOV","camel":"iacov","name":"Iacov","bookId":"JAS","counts":[27,26,18,17,20]},
    {"slug":"1-petru","var":"UNU_PETRU","camel":"unuPetru","name":"1 Petru","bookId":"1PE","counts":[25,25,22,19,14]},
    {"slug":"2-petru","var":"DOI_PETRU","camel":"doiPetru","name":"2 Petru","bookId":"2PE","counts":[21,22,18]},
    {"slug":"1-ioan","var":"UNU_IOAN","camel":"unuIoan","name":"1 Ioan","bookId":"1JN","counts":[10,29,24,21,21]},
    {"slug":"2-ioan","var":"DOI_IOAN","camel":"doiIoan","name":"2 Ioan","bookId":"2JN","counts":[13]},
    {"slug":"3-ioan","var":"TREI_IOAN","camel":"treiIoan","name":"3 Ioan","bookId":"3JN","counts":[15]},
    {"slug":"iuda","var":"IUDA","camel":"iuda","name":"Iuda","bookId":"JUD","counts":[25]},
    {"slug":"apocalipsa","var":"APOCALIPSA","camel":"apocalipsa","name":"Apocalipsa","bookId":"REV","counts":[20,29,22,11,14,17,17,13,21,11,19,18,18,20,8,21,18,24,21,15,27,21]},
]
CANONICAL = [book["var"] for book in BOOKS]

def unit_count(last: int) -> int:
    return 3 if last <= 15 else 4 if last <= 25 else 5

def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--book")
    args = parser.parse_args()
    selected = [book for book in BOOKS if not args.book or book["slug"] == args.book]
    if not selected:
        raise SystemExit(f"Carte necunoscută: {args.book}")

    errors: list[str] = []
    manifest = json.loads((DATA / "nt-completion-poonen-sources.json").read_text(encoding="utf-8"))
    sources = {item["slug"]: item for item in manifest["books"]}
    index = (BIBLE / "index.ts").read_text(encoding="utf-8")
    module = (BIBLE / "ntCompletionBooks.ts").read_text(encoding="utf-8")
    helper = (BIBLE / "ntCompletionHelpers.ts").read_text(encoding="utf-8")
    root_package = (ROOT / "package.json").read_text(encoding="utf-8")
    shared_package = (ROOT / "packages/shared/package.json").read_text(encoding="utf-8")
    chapters = verses = units = episodes = 0

    if 'status: "in_review"' not in helper:
        errors.append("Helperul nu păstrează capitolele in_review")
    if 'from "./ntCompletionBooks.js"' not in index:
        errors.append("Modulul final NT nu este importat în catalog")

    for book in selected:
        cfg_path = DATA / f'{book["slug"]}-rccv-import.json'
        source = sources.get(book["slug"])
        if not cfg_path.exists():
            errors.append(f'{book["name"]}: configurație RCCV lipsă')
            continue
        cfg = json.loads(cfg_path.read_text(encoding="utf-8"))
        if cfg.get("bookId") != book["bookId"] or cfg.get("verseCounts") != book["counts"]:
            errors.append(f'{book["name"]}: configurație RCCV incorectă')
        if cfg.get("bookSlug") != book["camel"]:
            errors.append(f'{book["name"]}: identificator TypeScript invalid')
        if f'export const {book["var"]} = buildBook' not in module:
            errors.append(f'{book["name"]}: definiție lipsă')
        if book["var"] not in index:
            errors.append(f'{book["name"]}: catalog lipsă')
        if f'check:{book["slug"]}' not in root_package:
            errors.append(f'{book["name"]}: comandă de verificare lipsă')
        if f'{book["slug"]}-rccv-import.json' not in shared_package:
            errors.append(f'{book["name"]}: materializare RCCV lipsă')
        if not source or not source.get("episodes"):
            errors.append(f'{book["name"]}: manifest CFC lipsă')
        book_units = sum(unit_count(count) for count in book["counts"])
        book_episodes = len(source.get("episodes", [])) if source else 0
        chapters += len(book["counts"]); verses += sum(book["counts"])
        units += book_units; episodes += book_episodes
        print(f'Poarta {book["name"]}: {len(book["counts"])} capitole, {book_units} unități, {sum(book["counts"])} versete RCCV și {book_episodes} episoade CFC.')

    if not args.book:
        match = re.search(r"BIBLE_BOOKS:\s*BibleBook\[\]\s*=\s*\[(.*?)\]", index, re.S)
        catalog = match.group(1) if match else ""
        cursor = -1
        for name in CANONICAL:
            position = catalog.find(name)
            if position <= cursor:
                errors.append(f"Ordine canonică greșită la {name}")
            cursor = position
        if (chapters, verses, units, episodes) != (69, 1383, 272, 52):
            errors.append(f"Totaluri: {chapters} capitole, {verses} versete, {units} unități, {episodes} episoade")
        for temporary in (ROOT / ".github/workflows/research-nt-completion.yml", ROOT / ".github/workflows/finalize-nt-completion.yml", ROOT / ".nt-completion-payload.b64"):
            if temporary.exists():
                errors.append(f"Fișier temporar rămas: {temporary.name}")

    if errors:
        for error in errors:
            print(f"::error title=Poarta NT final::{error}")
        return 1
    print("Verificarea valului final al Noului Testament a trecut.")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
