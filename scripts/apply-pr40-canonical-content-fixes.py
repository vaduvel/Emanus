#!/usr/bin/env python3
"""Apply audited, deterministic fixes to the inherited canonical OT candidates.

The repair is deliberately strict: every omission fix records the exact old
text expected on this branch, and the script aborts instead of silently
rewriting an independently changed verse. Psalm headings inherited inside
verse 1 are moved to the schema's dedicated ``superscription`` field without
changing their wording.
"""
from __future__ import annotations

import hashlib
import json
import re
import unicodedata
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs" / "data" / "biblia-emanus-candidates"
LEADING_SUPERSCRIPTION = re.compile(r"^\((.+?)\)\s*(.+)$", re.S)

# reference -> (exact inherited text, independently reconstructed complete text)
VERSE_FIXES: dict[str, tuple[str, str]] = {
    "JDG.19:28": (
        "El i-a zis: „Scoală-te și haidem să mergem!”",
        "El i-a zis: „Scoală-te și haidem să mergem!” Dar ea n-a răspuns. Atunci a ridicat-o, a pus-o pe măgar, s-a sculat și a plecat spre casa lui.",
    ),
    "RUT.3:15": (
        "Și a adăugat: „Adu mantaua de pe tine și ține-o.”",
        "El a mai zis: „Adu mantaua de pe tine și ține-o.” Ea a ținut-o, iar el a măsurat șase măsuri de orz, le-a pus pe ea și apoi a intrat în cetate.",
    ),
    "1SA.22:18": (
        "Atunci împăratul a zis lui Doeg: „Întoarce-te și lovește pe preoți.”",
        "Atunci împăratul i-a zis lui Doeg: „Întoarce-te și lovește-i pe preoți!” Doeg, edomitul, s-a întors, i-a lovit pe preoți și, în ziua aceea, a ucis optzeci și cinci de oameni care purtau efodul de in.",
    ),
    "1SA.25:13": (
        "Atunci David a zis oamenilor săi: „Fiecare din voi să-și încingă sabia!”",
        "Atunci David le-a zis oamenilor săi: „Fiecare să-și încingă sabia!” Fiecare și-a încins sabia; David și-a încins-o și el. Aproape patru sute de oameni au mers după David, iar două sute au rămas lângă bagaje.",
    ),
    "2SA.15:22": (
        "David a zis atunci lui Itai: „Du-te și treci!”",
        "David i-a zis atunci lui Itai: „Du-te și treci!” Itai din Gat a trecut împreună cu toți oamenii lui și cu toți copiii care erau cu el.",
    ),
    "1KI.9:13": (
        "și a zis: „Ce cetăți mi-ai dat, frate?”",
        "El a zis: „Ce fel de cetăți mi-ai dat, frate?” Și le-a numit țara Cabul, nume pe care îl poartă până în ziua de azi.",
    ),
    "1KI.17:19": (
        "El i-a răspuns: „Dă-mi încoace pe fiul tău.”",
        "El i-a zis: „Dă-mi pe fiul tău.” L-a luat de la sânul ei, l-a dus în odaia de sus, unde locuia el, și l-a culcat pe patul lui.",
    ),
    "2KI.3:15": (
        "„Acum aduceți-mi un cântăreț cu harpa.”",
        "„Acum aduceți-mi un cântăreț cu harpa.” Pe când cânta acesta, mâna DOMNULUI a venit peste Elisei.",
    ),
    "2KI.4:15": (
        "Și el a zis: „Cheam-o!”",
        "Și el a zis: „Cheam-o!” Ghehazi a chemat-o, iar ea s-a oprit în pragul ușii.",
    ),
    "2KI.5:19": (
        "Elisei i-a zis: „Du-te în pace.”",
        "Elisei i-a zis: „Du-te în pace.” Naaman a plecat de la el și a mers o bucată de drum.",
    ),
    "2KI.6:6": (
        "Omul lui Dumnezeu a zis: „Unde a căzut?”",
        "Omul lui Dumnezeu a întrebat: „Unde a căzut?” Omul i-a arătat locul. Elisei a tăiat o bucată de lemn, a aruncat-o acolo și a făcut fierul să plutească.",
    ),
    "2KI.6:7": (
        "Apoi a zis: „Ridică-l!”",
        "Apoi a zis: „Ridică-l!” Omul și-a întins mâna și l-a luat.",
    ),
    "2KI.6:17": (
        "Elisei s-a rugat și a zis: „DOAMNE, deschide-i ochii să vadă.”",
        "Elisei s-a rugat și a zis: „DOAMNE, te rog, deschide-i ochii ca să vadă.” DOMNUL a deschis ochii slujitorului, iar el a văzut muntele plin de cai și de care de foc în jurul lui Elisei.",
    ),
    "2KI.18:20": (
        "Tu ai zis: „Pentru război trebuie chibzuință și putere.”",
        "Tu ai zis: „Pentru război trebuie chibzuință și putere”, dar acestea sunt doar vorbe deșarte. În cine ți-ai pus încrederea de te-ai răzvrătit împotriva mea?",
    ),
    "1CH.29:20": (
        "David a zis întregii adunări: „Binecuvântați pe DOMNUL Dumnezeul vostru.”",
        "David a zis întregii adunări: „Binecuvântați acum pe DOMNUL Dumnezeul vostru!” Toată adunarea L-a binecuvântat pe DOMNUL Dumnezeul părinților lor; și-au plecat capetele și s-au închinat înaintea DOMNULUI și înaintea împăratului.",
    ),
    "JOB.39:25": (
        "La sunetul trâmbiței parcă zice: „Înainte!”",
        "La fiecare sunet al trâmbiței parcă zice: „Înainte!” De departe simte mirosul luptei, tunetul căpeteniilor și strigătele de război.",
    ),
    "ISA.47:7": (
        "Tu ziceai: „În veci voi fi împărăteasă!”",
        "Tu ziceai: „În veci voi fi împărăteasă!” De aceea nu ți-ai pus aceste lucruri la inimă și nu te-ai gândit la sfârșitul lor.",
    ),
    "JER.1:7": (
        "Dar DOMNUL mi-a zis: „Nu zice: „Sunt un copil””",
        "Dar DOMNUL mi-a zis: „Nu spune: «Sunt un copil», căci vei merge la toți cei la care te voi trimite și vei spune tot ce-ți voi porunci.”",
    ),
    "JER.5:22": (
        "„Nu voiți să vă temeți de Mine, zice DOMNUL, nu voiți să tremurați înaintea Mea?”",
        "„Nu vreți să vă temeți de Mine?”, zice DOMNUL. „Nu vreți să tremurați înaintea Mea, a Celui care am pus nisipul drept hotar mării, printr-o hotărâre veșnică pe care ea nu o poate trece? Valurile ei se înfurie, dar nu biruie; urlă, dar nu trec peste hotar.”",
    ),
    "EZK.33:14": (
        "Dimpotrivă, când zic celui rău: „Vei muri!”",
        "Dimpotrivă, când îi zic celui rău: „Vei muri negreșit!”, dacă se întoarce de la păcatul lui și face ce este drept și legiuit,",
    ),
}


def load(path: Path) -> dict[str, Any]:
    value = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(value, dict):
        raise RuntimeError(f"{path}: JSON root must be an object")
    return value


def digest(verses: list[dict[str, Any]]) -> str:
    payload = "\n".join(str(verse.get("text", "")) for verse in verses)
    return hashlib.sha256(payload.encode("utf-8")).hexdigest()


def write(path: Path, document: dict[str, Any]) -> None:
    rendered = json.dumps(document, ensure_ascii=False, indent=2) + "\n"
    path.write_text(unicodedata.normalize("NFC", rendered), encoding="utf-8")


def apply_verse_fixes() -> int:
    changed = 0
    grouped: dict[tuple[str, int], list[tuple[int, str, str]]] = {}
    for reference, (old, new) in VERSE_FIXES.items():
        match = re.fullmatch(r"([0-9A-Z]{3})\.([1-9][0-9]*):([1-9][0-9]*)", reference)
        if not match:
            raise RuntimeError(f"Invalid repair reference {reference}")
        book, chapter, verse = match.group(1), int(match.group(2)), int(match.group(3))
        grouped.setdefault((book, chapter), []).append((verse, old, new))

    for (book, chapter), repairs in sorted(grouped.items()):
        path = DATA / f"{book}.{chapter}.json"
        document = load(path)
        verses = document.get("verses")
        if not isinstance(verses, list):
            raise RuntimeError(f"{path.name}: missing verses")
        by_number = {int(item["number"]): item for item in verses}
        for number, old, new in repairs:
            item = by_number.get(number)
            if item is None:
                raise RuntimeError(f"{path.name}: missing verse {number}")
            current = str(item.get("text", ""))
            if current == new:
                continue
            if current != old:
                raise RuntimeError(
                    f"{book}.{chapter}:{number}: inherited text changed; expected {old!r}, found {current!r}"
                )
            item["text"] = new
            changed += 1
        document.setdefault("audit", {})["textDigest"] = digest(verses)
        write(path, document)
    return changed


def move_psalm_superscriptions() -> int:
    moved = 0
    for path in sorted(DATA.glob("PSA.*.json")):
        document = load(path)
        verses = document.get("verses")
        if not isinstance(verses, list) or not verses:
            raise RuntimeError(f"{path.name}: missing Psalm verses")
        first = verses[0]
        if int(first.get("number", 0)) != 1:
            raise RuntimeError(f"{path.name}: first verse is not verse 1")
        current = str(first.get("text", ""))
        match = LEADING_SUPERSCRIPTION.match(current)
        if not match:
            continue
        if document.get("superscription"):
            raise RuntimeError(f"{path.name}: has both a superscription field and a heading in verse 1")
        heading = f"({match.group(1).strip()})"
        verse_text = match.group(2).strip()
        if not verse_text:
            raise RuntimeError(f"{path.name}: moving the heading would empty verse 1")
        document["superscription"] = heading
        first["text"] = verse_text
        document.setdefault("audit", {})["textDigest"] = digest(verses)
        write(path, document)
        moved += 1
    return moved


def main() -> None:
    repaired = apply_verse_fixes()
    superscriptions = move_psalm_superscriptions()
    if repaired not in {0, len(VERSE_FIXES)}:
        raise SystemExit(f"Partial canonical verse repair: {repaired}/{len(VERSE_FIXES)}")
    # This branch currently contains 103 inherited Psalm headings inside verse 1.
    # A rerun after an already materialized repair legitimately moves zero.
    if superscriptions not in {0, 103}:
        raise SystemExit(f"Unexpected Psalm superscription count: {superscriptions}")
    print(
        json.dumps(
            {
                "repairedOmissionVerses": repaired,
                "movedPsalmSuperscriptions": superscriptions,
                "candidateDigestPolicy": "sha256(newline-joined-verse-texts)",
            },
            ensure_ascii=False,
            indent=2,
        )
    )


if __name__ == "__main__":
    main()
