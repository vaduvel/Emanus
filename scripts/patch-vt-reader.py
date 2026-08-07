#!/usr/bin/env python3
"""Leagă cititorul existent din main la catalogul editorial VT fără a copia UI vechi."""

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PATH = ROOT / "apps/web/src/screens/Bible.tsx"


def replace_once(text: str, old: str, new: str, label: str) -> str:
    if new in text:
        return text
    if old not in text:
        raise SystemExit(f"Bible.tsx: lipsește ancora {label}")
    return text.replace(old, new, 1)


def main() -> None:
    text = PATH.read_text(encoding="utf-8")

    text = replace_once(
        text,
        'import { BIBLE_BOOKS, BIBLE_TRANSLATION, findChapter } from "@emanus/shared/bible"',
        'import { BIBLE_TRANSLATION, chapterIsOpen } from "@emanus/shared/bible"\n'
        'import { PUBLICATION_BIBLE_BOOKS, findPublicationChapter } from "@emanus/shared/bible-publication"',
        "importurile Bibliei",
    )

    text = text.replace(
        ' * Biblia explicata. Textul (Cornilescu 1924, editia originala) sta intr-un\n'
        ' * strat vizual separat de explicatie: cine vrea numai textul il poate citi\n'
        ' * fara sa treaca prin comentariu.\n'
        ' *\n'
        ' * Capitolele cu status "in_review" se deschid, dar poarta un semn: nu au fost\n'
        ' * inca citite de un om.\n',
        ' * Biblia explicată păstrează textul biblic separat de explicație. Traducerea\n'
        ' * este etichetată per carte; un text editorial provizoriu nu este prezentat\n'
        ' * drept Biblia Emanus. Capitolele in_review sunt vizibile numai în development.\n',
        1,
    )

    key_anchor = 'const SAVED_KEY = "emanus.bible.saved"\n'
    text = replace_once(
        text,
        key_anchor,
        key_anchor + '\nconst SHOW_EDITORIAL = import.meta.env.DEV\n',
        "SHOW_EDITORIAL",
    )

    plat_block = '''function plat(text: string): string {\n  return text.normalize("NFD").replace(/[\\u0300-\\u036f]/g, "").toLowerCase()\n}\n'''
    visibility = plat_block + '''\nfunction visibleChapters(book: BibleBook): BibleChapter[] {\n  return SHOW_EDITORIAL ? book.chapters : book.chapters.filter(chapterIsOpen)\n}\n'''
    text = replace_once(text, plat_block, visibility, "visibleChapters")

    text = text.replace('for (const book of BIBLE_BOOKS) {\n    for (const ch of book.chapters) {', 'for (const book of PUBLICATION_BIBLE_BOOKS) {\n    for (const ch of visibleChapters(book)) {', 1)
    text = text.replace('Deocamdată n-avem scris nimic pe durerea aceasta. Avem doar Geneza. Vine şi restul.', 'Deocamdată nu avem un pasaj disponibil pentru această căutare.', 1)

    text = text.replace(
        '{review && <span className="bchap__flag" title="Scris, dar necitit inca de un om">în revizie</span>}',
        '{review && SHOW_EDITORIAL && <span className="bchap__flag" title="Scris, dar necitit încă de un om">în revizie</span>}',
        1,
    )

    text = text.replace(
        '  const chapters = useMemo(() => {\n    if (q.length === 0) return book.chapters\n    return book.chapters.filter((c) => {',
        '  const chapters = useMemo(() => {\n    const available = visibleChapters(book)\n    if (q.length === 0) return available\n    return available.filter((c) => {',
        1,
    )

    text = text.replace(
        '      <p className="muted">{book.blurb}</p>\n      <p className="bbook__count">{book.chapters.length} capitole scrise</p>',
        '      <p className="muted">{book.blurb}</p>\n      {book.translation && <p className="muted">{book.translation}</p>}\n      <p className="bbook__count">{visibleChapters(book).length} capitole disponibile</p>',
        1,
    )

    text = text.replace('{BIBLE_BOOKS.map((b) => <Book key={b.id} book={b} query={query} />)}', '{PUBLICATION_BIBLE_BOOKS.map((b) => <Book key={b.id} book={b} query={query} />)}', 1)
    text = text.replace(
        '<p className="muted bible__note">Traducere: {BIBLE_TRANSLATION}. Explicaţiile sunt scrise pentru Emanus.</p>',
        '<p className="muted bible__note">Traducerea este indicată separat pentru fiecare carte. Explicaţiile sunt scrise pentru Emanus.</p>',
        1,
    )

    text = text.replace('  const found = findChapter(bookId, chapter)\n  const book = BIBLE_BOOKS.find((b) => b.id === bookId)', '  const found = findPublicationChapter(bookId, chapter)\n  const book = PUBLICATION_BIBLE_BOOKS.find((b) => b.id === bookId)\n  const canRead = Boolean(found && (SHOW_EDITORIAL || chapterIsOpen(found)))', 1)
    text = text.replace('    if (found) writeLast({ bookId, chapter, title: found.title })\n  }, [bookId, chapter, found])', '    if (found && canRead) writeLast({ bookId, chapter, title: found.title })\n  }, [bookId, chapter, found, canRead])', 1)
    text = text.replace('  if (!found || !book) {', '  if (!found || !book || !canRead) {', 1)
    text = text.replace('  const numbers = book.chapters.map((c) => c.number).sort((a, b) => a - b)', '  const numbers = visibleChapters(book).map((c) => c.number).sort((a, b) => a - b)', 1)
    text = text.replace('{found.status !== "published" && <p className="bchead__flag">Scris, dar necitit încă de un om. Dacă vezi ceva greşit, spune-ne.</p>}', '{SHOW_EDITORIAL && found.status !== "published" && <p className="bchead__flag">Scris, dar necitit încă de un om. Dacă vezi ceva greşit, spune-ne.</p>}', 1)
    text = text.replace('<p className="muted bible__note">{BIBLE_TRANSLATION}</p>', '<p className="muted bible__note">{book.translation ?? BIBLE_TRANSLATION}</p>', 1)

    PATH.write_text(text, encoding="utf-8")
    print("Cititor VT: catalog 39/39 cablat, in_review blocat în producție, traducerea afișată per carte.")


if __name__ == "__main__":
    main()
