#!/usr/bin/env python3
"""Cablare deterministă a catalogului VT publicabil în ecranul Biblia."""

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCREEN = ROOT / "apps" / "web" / "src" / "screens" / "Bible.tsx"
CSS = ROOT / "apps" / "web" / "src" / "bible.css"


def replace_once(text: str, old: str, new: str, label: str) -> str:
    if old not in text:
        if new in text:
            return text
        raise SystemExit(f"Nu găsesc ancora pentru {label}")
    return text.replace(old, new, 1)


def main() -> None:
    text = SCREEN.read_text(encoding="utf-8")

    text = replace_once(
        text,
        'import { BIBLE_BOOKS, BIBLE_TRANSLATION, chapterIsOpen, findChapter } from "@emanus/shared/bible"',
        'import { BIBLE_TRANSLATION, chapterIsOpen } from "@emanus/shared/bible"\nimport { PUBLICATION_BIBLE_BOOKS, findPublicationChapter } from "@emanus/shared/bible-publication"',
        "import catalog",
    )

    text = text.replace("BIBLE_BOOKS", "PUBLICATION_BIBLE_BOOKS")
    text = text.replace("findChapter(", "findPublicationChapter(")

    text = replace_once(
        text,
        '<p className="muted bible__note">Traducere: {BIBLE_TRANSLATION}. Explicațiile sunt scrise pentru Emanus.</p>',
        '<p className="muted bible__note">Traducerea textului biblic este afișată pentru fiecare carte. Explicația rămâne separată de Scriptură.</p>',
        "footer traducere",
    )

    text = replace_once(
        text,
        '    <h3 className="bunit__heading">{unit.heading}</h3>\n\n    <blockquote className="bunit__text">{unit.text}</blockquote>',
        '    <h3 className="bunit__heading">{unit.heading}</h3>\n    {unit.explanationSource && <p className="bunit__source">{unit.explanationSource}</p>}\n\n    <blockquote className="bunit__text">{unit.text}</blockquote>',
        "sursa explicației",
    )

    text = replace_once(
        text,
        '    <details className="bctx">\n      <summary>Unde suntem în carte</summary>\n      <p>{found.literaryContext}</p>\n    </details>\n    <details className="bctx">\n      <summary>Cum era pe atunci</summary>\n      <p>{found.historicalContext}</p>\n    </details>',
        '    {found.literaryContext && <details className="bctx">\n      <summary>Unde suntem în carte</summary>\n      <p>{found.literaryContext}</p>\n    </details>}\n    {found.historicalContext && <details className="bctx">\n      <summary>Cum era pe atunci</summary>\n      <p>{found.historicalContext}</p>\n    </details>}',
        "context condițional",
    )

    text = replace_once(
        text,
        '    <div className="bprayer">\n      <p className="today__kicker">Rugăciune</p>\n      {paragraphs(found.prayer).map((p, i) => <p key={i}>{p}</p>)}\n    </div>',
        '    {found.prayer && <div className="bprayer">\n      <p className="today__kicker">Rugăciune</p>\n      {paragraphs(found.prayer).map((p, i) => <p key={i}>{p}</p>)}\n    </div>}',
        "rugăciune condițională",
    )

    text = replace_once(
        text,
        '    <p className="muted bible__note">{BIBLE_TRANSLATION}</p>',
        '    <p className="muted bible__note">{book.translation ?? BIBLE_TRANSLATION}</p>',
        "traducere per carte",
    )

    SCREEN.write_text(text, encoding="utf-8")

    css = CSS.read_text(encoding="utf-8")
    marker = ".bunit__source"
    if marker not in css:
        css += "\n\n/* Proveniența explicației: vizibilă, dar secundară față de textul biblic. */\n.bunit__source {\n  margin: -0.15rem 0 0.65rem;\n  font-size: 0.75rem;\n  opacity: 0.68;\n}\n"
        CSS.write_text(css, encoding="utf-8")

    print("Cititorul Biblia folosește catalogul de publicare și afișează proveniența explicațiilor.")


if __name__ == "__main__":
    main()
