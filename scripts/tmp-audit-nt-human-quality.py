#!/usr/bin/env python3
from __future__ import annotations

import json
import re
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "docs" / "data" / "biblia-emanus"
OUT_DIR = ROOT / "tmp-nt-human-quality"
OUT_DIR.mkdir(exist_ok=True)

NT_BOOKS = {
    "MAT", "MRK", "LUK", "JHN", "ACT", "ROM", "1CO", "2CO", "GAL", "EPH",
    "PHP", "COL", "1TH", "2TH", "1TI", "2TI", "TIT", "PHM", "HEB", "JAS",
    "1PE", "2PE", "1JN", "2JN", "3JN", "JUD", "REV",
}

# Defecte certe sau aproape certe, nu simple preferințe stilistice.
WORD_FIXES = {
    "sîngele": "sângele",
    "sînge": "sânge",
    "cîmp": "câmp",
    "daca": "dacă",
    "Daca": "Dacă",
    "intuneric": "întuneric",
    "Intuneric": "Întuneric",
    "tau": "tău",
    "Tau": "Tău",
    "V'am": "V-am",
    "cari": "care",
}

EXACT_BAD_PHRASES = {
    "ochiul tău este sunet": "calc englezesc: sound",
    "Dumnezeu Regatul": "ordine sintactică imposibilă",
    "va fi nerăbdător pentru sine": "calc englezesc",
    "Fiecare zi propriul rău este suficient": "ordine sintactică imposibilă",
    "situată într-un jgheab de hrănire": "acord și registru defecte",
    "au mediatizat pe larg zicala": "registru și sens defecte",
    "este preferat înaintea mea": "calc englezesc",
    "a declarat, și nu a negat, dar el a declarat": "repetiție mecanică defectă",
    "un moment la durata lui de viață": "calc semantic suspect",
    "Cine nu are pe Dumnezeu, Fiul lui nu are viața": "ordine sintactică și sens defecte",
    "cei care nu păcătuiesc duce la moarte": "acord și sens defecte",
    "păcatul nu duce la moarte": "generalizare care poate schimba sensul în 1 Ioan 5:17",
    "ca noi să păzim poruncile Lui": "construcție românească greoaie",
    "a fost înregistrată toată lumea locuită": "calc englezesc",
    "a stat lângă ei": "posibil calc narativ",
    "benzi de pânză": "registru nefiresc pentru scutece/fâșii",
    "a mediatizat": "registru modern impropriu",
    "jgheab de hrănire": "calc lexical",
    "un copil": "terminologie posibil improprie pentru prunc în narațiunea nașterii",
}

PUNCTUATION_PATTERNS = [
    (re.compile(r"\s-\s"), "spații în jurul cratimei"),
    (re.compile(r":\?"), "semne de punctuație corupte"),
    (re.compile(r"\?\S"), "lipsește spațiu după semnul întrebării"),
    (re.compile(r"\b[ldmnstv]-\s+"), "spațiu după cratimă pronominală"),
    (re.compile(r"\s{2,}"), "spații consecutive"),
    (re.compile(r"[»”]\"?$"), "închidere de citat posibil coruptă"),
]

ASCII_ROMANIAN_WORDS = {
    "daca", "intuneric", "tau", "fara", "pana", "cand", "caci", "sange", "camp",
    "inainte", "intelepciune", "imparatie", "inviat", "inger", "ingerii", "inima",
}

ARCHAIC_PATTERNS = [
    re.compile(r"\bV['’]am\b"),
    re.compile(r"\bcari\b", re.I),
    re.compile(r"\bs[î]n(?:ge|gele)\b", re.I),
    re.compile(r"\bc[î]mp\b", re.I),
]


def add_issue(issues, severity, code, book, chapter, verse, text, detail):
    issues.append({
        "severity": severity,
        "code": code,
        "ref": f"{book}.{chapter}.{verse}",
        "text": text,
        "detail": detail,
    })


def load_chapters():
    chapters = []
    for path in sorted(DATA_DIR.glob("*.json")):
        try:
            data = json.loads(path.read_text(encoding="utf-8"))
        except Exception:
            continue
        if data.get("bookId") not in NT_BOOKS or not isinstance(data.get("verses"), list):
            continue
        chapters.append((path, data))
    return chapters


def verse_map(chapters):
    result = {}
    for _, chapter in chapters:
        book = chapter["bookId"]
        num = int(chapter["chapter"])
        for verse in chapter["verses"]:
            result[(book, num, int(verse["number"]))] = verse
    return result


def main():
    chapters = load_chapters()
    verses = verse_map(chapters)
    issues = []

    for path, chapter in chapters:
        book = chapter["bookId"]
        ch = int(chapter["chapter"])
        for verse in chapter["verses"]:
            num = int(verse["number"])
            text = str(verse.get("text", "")).strip()
            if not text:
                add_issue(issues, "critical", "empty", book, ch, num, text, "verset fără text")
                continue

            for bad, good in WORD_FIXES.items():
                if re.search(rf"\b{re.escape(bad)}\b", text):
                    add_issue(issues, "high", "orthography", book, ch, num, text, f"«{bad}» → «{good}»")

            lowered = text.lower()
            for phrase, detail in EXACT_BAD_PHRASES.items():
                if phrase.lower() in lowered:
                    add_issue(issues, "high", "translationese", book, ch, num, text, detail)

            for pattern, detail in PUNCTUATION_PATTERNS:
                if pattern.search(text):
                    add_issue(issues, "medium", "punctuation", book, ch, num, text, detail)

            tokens = re.findall(r"[A-Za-zĂÂÎȘȚăâîșț]+", text)
            for token in tokens:
                if token.lower() in ASCII_ROMANIAN_WORDS:
                    add_issue(issues, "medium", "missing_diacritic", book, ch, num, text, f"cuvânt fără diacritică: {token}")
                    break

            for pattern in ARCHAIC_PATTERNS:
                if pattern.search(text):
                    add_issue(issues, "high", "archaic_or_wrong", book, ch, num, text, pattern.pattern)
                    break

            if any(marker in text for marker in ("DE TRADUS", "DE VERIFICAT", "DE DOCUMENTAT", "TODO")):
                add_issue(issues, "critical", "placeholder", book, ch, num, text, "placeholder editorial în text")

    # Variante textuale critice, verificate față de politica declarată SBLGNT.
    mat613 = verses.get(("MAT", 6, 13), {}).get("text", "")
    if any(x in mat613.lower() for x in ("căci a ta este împărăția", "puterea și slava", "amin")):
        add_issue(issues, "critical", "textual_variant", "MAT", 6, 13, mat613,
                  "doxologia tradițională este în textul principal deși politica declară SBLGNT")

    jhn118 = verses.get(("JHN", 1, 18), {}).get("text", "")
    if "fiu" in jhn118.lower() and "dumnezeu, cel unic" not in jhn118.lower():
        add_issue(issues, "critical", "text_note_conflict", "JHN", 1, 18, jhn118,
                  "textul redă «Fiu», iar nota declară lectura μονογενὴς θεός")

    one_jn_57 = verses.get(("1JN", 5, 7), {}).get("text", "")
    one_jn_58 = verses.get(("1JN", 5, 8), {}).get("text", "")
    comma_markers = ("tatăl, cuvântul", "în cer", "acești trei una sunt")
    if any(x in (one_jn_57 + " " + one_jn_58).lower() for x in comma_markers):
        add_issue(issues, "critical", "comma_johanneum", "1JN", 5, 7,
                  one_jn_57 + " / " + one_jn_58, "Comma Johanneum introdusă în textul principal")

    for n in range(9, 21):
        verse = verses.get(("MRK", 16, n))
        if verse and verse.get("textualStatus") != "double-bracketed":
            add_issue(issues, "critical", "mark_long_ending", "MRK", 16, n, verse.get("text", ""),
                      "Marcu 16:9-20 trebuie marcat explicit ca lectură disputată")

    # Pericopa adulterae trebuie semnalată, dacă este prezentă.
    for ref in [("JHN", 7, 53)] + [("JHN", 8, n) for n in range(1, 12)]:
        verse = verses.get(ref)
        if verse and verse.get("textualStatus") not in {"double-bracketed", "disputed"}:
            add_issue(issues, "critical", "pericope_adulterae", ref[0], ref[1], ref[2], verse.get("text", ""),
                      "Ioan 7:53-8:11 trebuie marcat ca pasaj textual disputat")

    counts = Counter(i["severity"] for i in issues)
    by_code = Counter(i["code"] for i in issues)
    refs_by_code = defaultdict(list)
    for issue in issues:
        refs_by_code[issue["code"]].append(issue["ref"])

    report = {
        "chapters_scanned": len(chapters),
        "verses_scanned": len(verses),
        "issue_count": len(issues),
        "by_severity": dict(counts),
        "by_code": dict(by_code),
        "refs_by_code": {k: v[:500] for k, v in refs_by_code.items()},
        "issues": issues,
    }
    (OUT_DIR / "report.json").write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")

    lines = [
        "# Audit uman-asistat NT",
        "",
        f"- Capitole scanate: {len(chapters)}",
        f"- Versete scanate: {len(verses)}",
        f"- Probleme: {len(issues)}",
        f"- Critice: {counts.get('critical', 0)}",
        f"- Ridicate: {counts.get('high', 0)}",
        f"- Medii: {counts.get('medium', 0)}",
        "",
        "## Probleme",
        "",
    ]
    for issue in issues:
        lines.append(f"- **{issue['severity']} / {issue['code']} / {issue['ref']}** — {issue['detail']} — {issue['text']}")
    (OUT_DIR / "report.md").write_text("\n".join(lines) + "\n", encoding="utf-8")

    print(json.dumps({
        "chapters": len(chapters),
        "verses": len(verses),
        "issues": len(issues),
        "severity": dict(counts),
        "codes": dict(by_code),
    }, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
