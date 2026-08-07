#!/usr/bin/env python3
"""Asamblează Biblia explicată VT pe o ramură pornită din main, fără conținut NT."""

from __future__ import annotations

import json
import posixpath
import re
import subprocess
from pathlib import Path

SOURCE = "origin/agent/biblia-explicata-vt-complet"
MAIN = "origin/main"
ROOT = Path(__file__).resolve().parents[1]

EXACT_INFRA = {
    "packages/shared/src/bible/completeOverlay.ts",
    "packages/shared/src/bible/explainedOverlay.ts",
    "packages/shared/src/bible/overlayBibleBooks.ts",
    "packages/shared/src/bible/publicationBible.ts",
    "packages/shared/src/bible/vtExplainedCoverage.ts",
    "packages/shared/src/bible/vtFullNarrativesHistorical.ts",
    "packages/shared/src/bible/vtFullNarrativesWisdom.ts",
    "packages/shared/src/bible/vtFullNarrativesMajorProphets.ts",
    "packages/shared/src/bible/vtFullNarrativesMinorProphets.ts",
}

SAFE_SCRIPTS = {
    "scripts/check-vt-explained-coverage.py",
    "scripts/check-vt-publication-runtime.mjs",
    "scripts/materialize-vt-overlay-texts.py",
    "scripts/check-overlay-book.py",
    "scripts/check-rut.py",
    "scripts/check-1-samuel.py",
    "scripts/check-2-samuel.py",
    "scripts/check-1-imparati.py",
    "scripts/check-1-imparati-book.py",
    "scripts/check-2-imparati-overlay.py",
}

SAFE_DOCS = {
    "docs/biblia-explicata/VT-COVERAGE-FINAL.md",
    "docs/biblia-explicata/RUT-SOURCE-RULES.md",
    "docs/biblia-explicata/1-SAMUEL-SOURCE-RULES.md",
    "docs/biblia-explicata/2-SAMUEL-SOURCE-RULES.md",
    "docs/biblia-explicata/1-IMPARATI-SOURCE-RULES.md",
}

LEGACY_PREFIXES = (
    "exod",
    "levitic",
    "numeri",
    "deuteronom",
    "iosua",
    "rut",
    "samuel1",
    "samuel2",
    "imparati1",
)

FORBIDDEN_TOKENS = (
    "matei",
    "marcu",
    "luca",
    "ioan",
    "fapte",
    "romani",
    "corinteni",
    "galateni",
    "efeseni",
    "filipeni",
    "coloseni",
    "tesaloniceni",
    "timotei",
    "filimon",
    "evrei",
    "iacov",
    "petru",
    "apocalipsa",
)


def run(*args: str, capture: bool = False) -> str:
    result = subprocess.run(
        list(args),
        cwd=ROOT,
        check=True,
        text=True,
        stdout=subprocess.PIPE if capture else None,
    )
    return result.stdout if capture else ""


def source_has(path: str) -> bool:
    return (
        subprocess.run(
            ["git", "cat-file", "-e", f"{SOURCE}:{path}"],
            cwd=ROOT,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        ).returncode
        == 0
    )


def reject_nt(path: str) -> None:
    low = path.lower()
    name = Path(low).name
    if low.startswith(".research/marcu-poonen/") or any(name.startswith(token) for token in FORBIDDEN_TOKENS):
        raise SystemExit(f"REFUZ dependență NT în integrarea VT: {path}")


def copy_from_source(path: str, copied: set[str]) -> None:
    reject_nt(path)
    run("git", "checkout", SOURCE, "--", path)
    copied.add(path)


def select_initial_paths() -> list[str]:
    changed = run("git", "diff", "--name-only", f"{MAIN}...{SOURCE}", capture=True).splitlines()
    selected: list[str] = []
    for path in changed:
        name = Path(path).name.lower()
        if path.startswith(".research/poonen-through-the-bible-OT/"):
            selected.append(path)
        elif path.startswith("packages/shared/src/bible/generated/vtCanonicalText/"):
            selected.append(path)
        elif path.startswith("packages/shared/src/bible/overlays/"):
            selected.append(path)
        elif path in EXACT_INFRA or path in SAFE_SCRIPTS or path in SAFE_DOCS:
            selected.append(path)
        elif path.startswith("packages/shared/src/bible/") and name.startswith(LEGACY_PREFIXES):
            selected.append(path)
    return sorted(set(selected))


def close_bible_imports(copied: set[str]) -> None:
    import_re = re.compile(r'from\s+["\'](\.[^"\']+)["\']')
    changed = True
    while changed:
        changed = False
        for path in sorted(copied):
            if not path.endswith(".ts"):
                continue
            file_path = ROOT / path
            if not file_path.exists():
                continue
            for rel in import_re.findall(file_path.read_text(encoding="utf-8")):
                target = posixpath.normpath(posixpath.join(Path(path).parent.as_posix(), rel))
                if target.endswith(".js"):
                    target = target[:-3] + ".ts"
                if not target.startswith("packages/shared/src/bible/"):
                    continue
                if (ROOT / target).exists():
                    continue
                if not source_has(target):
                    raise SystemExit(f"Dependență lipsă: {path} -> {target}")
                copy_from_source(target, copied)
                changed = True


def patch_types() -> None:
    path = ROOT / "packages/shared/src/bible/types.ts"
    text = path.read_text(encoding="utf-8")

    original = 'export type OriginalLanguage = "ebraica" | "aramaica" | "greaca"\n'
    if "export type BibleExplanationKind" not in text:
        if original not in text:
            raise SystemExit("types.ts: lipsește ancora OriginalLanguage")
        text = text.replace(
            original,
            original + '\nexport type BibleExplanationKind = "exposition" | "textual-overview"\n',
            1,
        )

    text = text.replace(
        "/** Textul biblic, nemodificat. Cornilescu 1924, editia originala. */",
        "/** Textul biblic al traducerii asociate cărții, păstrat separat de explicație. */",
        1,
    )

    unit_anchor = '  /** Invatatura Emanus. Markdown. */\n  teaching: string\n'
    if "explanationKind?: BibleExplanationKind" not in text:
        if unit_anchor not in text:
            raise SystemExit("types.ts: lipsește ancora BibleUnit.teaching")
        text = text.replace(
            unit_anchor,
            unit_anchor
            + "  /** Tipul explicației: expunere din sursa editorială sau overview textual de completare. */\n"
            + "  explanationKind?: BibleExplanationKind\n"
            + "  /** Eticheta scurtă a provenienței explicației, folosită de cititor. */\n"
            + "  explanationSource?: string\n",
            1,
        )

    book_anchor = "  blurb: string\n  chapters: BibleChapter[]\n"
    if "translation?: string" not in text:
        if book_anchor not in text:
            raise SystemExit("types.ts: lipsește ancora BibleBook")
        text = text.replace(
            book_anchor,
            "  blurb: string\n"
            + "  /** Eticheta traducerii biblice folosite de această carte în cititor. */\n"
            + "  translation?: string\n"
            + "  chapters: BibleChapter[]\n",
            1,
        )

    translation_anchor = (
        "/** Traducerea afisata. Editia originala 1924 este in domeniul public. */\n"
        'export const BIBLE_TRANSLATION = "Cornilescu 1924, editia originala"\n'
    )
    if "BIBLIA_EMANUS_TRANSLATION" not in text:
        if translation_anchor not in text:
            raise SystemExit("types.ts: lipsește ancora BIBLE_TRANSLATION")
        text = text.replace(
            translation_anchor,
            'export const BIBLIA_EMANUS_TRANSLATION = "Biblia Emanus"\n\n' + translation_anchor,
            1,
        )

    path.write_text(text, encoding="utf-8")


def patch_bible_index() -> None:
    path = ROOT / "packages/shared/src/bible/index.ts"
    text = path.read_text(encoding="utf-8")

    import_anchor = 'import { GENEZA_50 } from "./geneza50.js"\n'
    if 'import { EXOD } from "./exod.js"' not in text:
        if import_anchor not in text:
            raise SystemExit("bible/index.ts: lipsește ancora GENEZA_50")
        text = text.replace(
            import_anchor,
            import_anchor
            + 'import { EXOD } from "./exod.js"\n'
            + 'import { LEVITIC } from "./levitic.js"\n'
            + 'import { NUMERI } from "./numeri.js"\n'
            + 'import { DEUTERONOM } from "./deuteronom.js"\n'
            + 'import { IOSUA } from "./iosua.js"\n'
            + 'import { RUT } from "./rut.js"\n'
            + 'import { SAMUEL1 } from "./samuel1.js"\n'
            + 'import { SAMUEL2 } from "./samuel2.js"\n',
            1,
        )

    old = (
        "/** Cartile scrise pana acum. Se adauga pe rand, dupa revizie. */\n"
        "export const BIBLE_BOOKS: BibleBook[] = [GENEZA]\n"
    )
    if old in text:
        text = text.replace(
            old,
            "export { EXOD, LEVITIC, NUMERI, DEUTERONOM, IOSUA, RUT, SAMUEL1, SAMUEL2 }\n\n"
            + "/** Cărțile legacy VT integrate; 1 Împărați este adăugată separat în publicationBible. */\n"
            + "export const BIBLE_BOOKS: BibleBook[] = [\n"
            + "  GENEZA,\n  EXOD,\n  LEVITIC,\n  NUMERI,\n  DEUTERONOM,\n  IOSUA,\n  RUT,\n  SAMUEL1,\n  SAMUEL2,\n]\n",
            1,
        )
    elif "export { EXOD, LEVITIC, NUMERI, DEUTERONOM, IOSUA, RUT, SAMUEL1, SAMUEL2 }" not in text:
        raise SystemExit("bible/index.ts: catalogul nu este nici main, nici deja patch-uit")

    path.write_text(text, encoding="utf-8")


def patch_packages() -> None:
    shared_path = ROOT / "packages/shared/package.json"
    shared = json.loads(shared_path.read_text(encoding="utf-8"))
    shared["exports"]["./bible-explained"] = {
        "types": "./dist/bible/overlays/index.d.ts",
        "default": "./dist/bible/overlays/index.js",
    }
    shared["exports"]["./bible-publication"] = {
        "types": "./dist/bible/publicationBible.d.ts",
        "default": "./dist/bible/publicationBible.js",
    }
    shared_path.write_text(json.dumps(shared, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    root_path = ROOT / "package.json"
    root = json.loads(root_path.read_text(encoding="utf-8"))
    root["scripts"]["check:vt-explained"] = "python3 scripts/check-vt-explained-coverage.py"
    root["scripts"]["check:vt-publication"] = "pnpm build:shared && node scripts/check-vt-publication-runtime.mjs"
    root_path.write_text(json.dumps(root, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main() -> None:
    copied: set[str] = set()
    for path in select_initial_paths():
        copy_from_source(path, copied)
    close_bible_imports(copied)
    patch_types()
    patch_bible_index()
    patch_packages()

    print(f"Asamblare pregătită: {len(copied)} fișiere copiate din sursa finală VT.")
    for path in sorted(copied):
        print(path)


if __name__ == "__main__":
    main()
