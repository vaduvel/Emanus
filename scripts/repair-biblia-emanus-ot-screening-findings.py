#!/usr/bin/env python3
"""Apply only source-confirmed corrections from OT semantic screening.

Every replacement was read against the pinned WLC/OSHB payload and the aligned
WEBU control.  The script asserts the previous text before changing it so it
cannot silently overwrite a later editorial correction.
"""

from __future__ import annotations

import hashlib
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs" / "data" / "biblia-emanus"
REPORT = ROOT / "docs" / "biblia-emanus" / "OT-SEMANTIC-SCREENING-REPAIRS.json"

REPAIRS: dict[str, tuple[str, str, str]] = {
    "PSA.106.31": (
        "Lucrul acesta i-a fost socotit ca o stare de neprihănire, din neam în neam, pe vecie.",
        "Lucrul acesta i-a fost socotit ca dreptate, din neam în neam, pe vecie.",
        "Expresia „ca o stare de” nu apare în textul ebraic; actul este socotit ca dreptate.",
    ),
    "JOB.41.12": (
        "Vreau să mai vorbesc iarăși de mădularele lui și de tăria lui, și de frumusețea întocmirii lui.",
        "Nu voi tăcea despre mădularele lui, despre tăria lui și despre frumusețea întocmirii lui.",
        "Negarea explicită „nu voi tăcea” a fost înlocuită de o reluare fără suport în sursă.",
    ),
    "DEU.18.11": (
        "nicio legătură cu duhurile, nimeni care să întrebe pe cei ce cheamă morții sau care să întrebe pe morți.",
        "nici cel care face descântece, nici cel care consultă un duh sau un spirit familiar, nici cel care întreabă pe morți.",
        "Sunt păstrate trei practici distincte: descântecul, consultarea unui ov/yidoni și întrebarea morților.",
    ),
    "JER.3.9": (
        "Și astfel, prin necurăția ei strigătoare, Israel a spurcat țara, a preacurvit cu piatra și lemnul.",
        "Prin ușurătatea desfrânării ei, a spurcat țara și a preacurvit cu piatra și lemnul.",
        "Ebraica descrie ușurătatea desfrânării, nu o intensificare editorială „strigătoare”.",
    ),
    "JOB.3.2": (
        "A luat cuvântul și a zis:",
        "Iov a răspuns și a zis:",
        "Subiectul explicit Iov și verbul „a răspuns” sunt ambele prezente în sursa ebraică.",
    ),
    "1CH.11.8": (
        "Au făcut zid împrejurul cetății, de la Milo de jur împrejur; și Ioab a dres cealaltă parte a cetății.",
        "El a zidit cetatea de jur împrejur, de la Milo și până în jurul ei; iar Ioab a reparat restul cetății.",
        "Textul are subiect singular și afirmă zidirea cetății, nu doar construirea unui zid de către un plural nedefinit.",
    ),
    "JOB.27.12": (
        "Dar voi le cunoașteți și sunteți de același gând; pentru ce dar vorbiți așa de prostește?",
        "Iată, voi toți ați văzut; pentru ce vă dedați atunci cu totul la deșertăciune?",
        "Versetul spune că ei au văzut și s-au dedat deșertăciunii; nu afirmă că sunt de același gând.",
    ),
    "PSA.75.2": (
        "„Atunci când va veni vremea hotărâtă”, zice DOMNUL, „voi judeca fără părtinire.”",
        "Când voi alege vremea hotărâtă, voi judeca drept.",
        "Verbul este la persoana întâi „voi alege”; eticheta de vorbitor nu este în versetul ebraic.",
    ),
    "ISA.5.15": (
        "Și astfel, cei mici vor fi doborâți, cei mari vor fi smeriți, și privirile trufașe vor fi plecate.",
        "Omul va fi plecat, omenirea va fi smerită, iar ochii celor trufași vor fi smeriți.",
        "Perechea ebraică este omul/omenirea, nu o clasificare socială în cei mici și cei mari.",
    ),
    "JOB.21.24": (
        "cu coapsele încărcate de grăsime și măduva oaselor plină de suc.",
        "cu ugerul plin de lapte și cu măduva oaselor umezită.",
        "Termenul desemnează ugerul sau sânii plini de lapte, nu coapsele încărcate de grăsime.",
    ),
    "DEU.14.13": (
        "șoimul, gaia și tot ce ține de neamul ei,",
        "gaia roșie, șoimul și gaia, după soiurile ei,",
        "Sunt enumerați trei termeni de păsări; versiunea anterioară reducea lista la doi.",
    ),
    "JOB.18.15": (
        "Nimeni din ai lui nu locuiește în cortul lui, pucioasă este presărată pe locuința lui.",
        "În cortul lui va locui ce nu este al lui; pucioasă va fi presărată peste locuința lui.",
        "Afirmația este despre ceva care nu îi aparține, nu despre absența familiei sale.",
    ),
    "1KI.7.17": (
        "A mai făcut niște împletituri în chip de rețea, niște ciucuri făcuți cu lănțișoare, pentru acoperișurile de pe vârful stâlpilor, șapte pentru acoperișul dintâi, și șapte pentru acoperișul al doilea.",
        "Erau împletituri ca o rețea și ghirlande făcute ca lanțurile, pentru capitelurile de pe vârful stâlpilor: șapte pentru un capitel și șapte pentru celălalt.",
        "Obiectele sunt capitelurile stâlpilor, nu acoperișuri.",
    ),
    "ISA.24.4": (
        "Țara este tristă, sleită de puteri; locuitorii sunt mâhniți și tânjesc; căpeteniile poporului sunt fără putere,",
        "Pământul jelește și se veștejește; lumea lâncezește și se veștejește; cei înălțați ai pământului lâncezesc.",
        "Versetul distinge pământul, lumea și cei înălțați ai pământului; nu locuitorii și căpeteniile unui singur popor.",
    ),
    "PSA.105.34": (
        "El a zis și au venit lăcuste, lăcuste fără număr,",
        "El a spus, și au venit lăcustele și ielecul, fără număr.",
        "Sunt doi termeni distincți pentru lăcuste; repetarea aceluiași cuvânt elimina distincția.",
    ),
    "JOB.8.7": (
        "Vechea ta propășire va fi mică față de cea de mai târziu.",
        "Deși începutul tău a fost mic, sfârșitul tău va crește foarte mult.",
        "Textul afirmă creșterea foarte mare a sfârșitului, nu doar o comparație vagă.",
    ),
    "JOB.22.8": (
        "Țara era a ta, fiindcă erai mai tare, te așezai în ea, fiindcă erai cu vază.",
        "Cel puternic avea țara, iar cel cu vază locuia în ea.",
        "Afirmația generală despre omul puternic și cel cu vază a fost schimbată în adresare directă cu o cauzalitate adăugată.",
    ),
    "SNG.6.7": (
        "Obrazul tău este ca o jumătate de rodie, sub marama ta…",
        "Tâmplele tale sunt ca o felie de rodie, sub marama ta.",
        "Imaginea privește tâmplele, nu obrazul în general.",
    ),
    "JOB.41.29": (
        "Nu vede în ghioagă decât un fir de pai și râde la șuieratul săgeților.",
        "Ghioagele le socotește paie și râde de vuietul suliței.",
        "Versetul are ghioage la plural și o suliță/javelină la singular, nu săgeți.",
    ),
    "PRO.18.1": (
        "Cel ursuz caută ce-i place lui, se supără de orice lucru bun. –",
        "Cel ce se izolează își caută dorința egoistă și se împotrivește oricărei judecăți sănătoase.",
        "Izolarea și împotrivirea față de judecata sănătoasă au fost înlocuite de ursuzenie și supărare.",
    ),
    "JER.7.8": (
        "Dar iată că voi vă hrăniți cu nădejdi înșelătoare care nu slujesc la nimic.",
        "Iată, voi vă încredeți în cuvinte mincinoase care nu folosesc la nimic.",
        "Obiectul încrederii este explicit „cuvinte mincinoase”, nu nădejdi formulate editorial.",
    ),
    "NUM.15.20": (
        "Din prima voastră maia să aduceți o turtă ca prinos; cum aduceți prinosul din arie, așa să o aduceți.",
        "Din primul vostru aluat să aduceți o turtă ca prinos; cum aduceți prinosul din arie, așa să o aduceți.",
        "Termenul desemnează aluatul, nu maiaua.",
    ),
    "2CH.4.14": (
        "cele zece temelii și cele zece lighene de pe temelii;",
        "temeliile și lighenele de pe temelii;",
        "Numărul zece nu apare în acest verset al textului ebraic și a fost adăugat de două ori.",
    ),
    "PRO.30.29": (
        "Trei ființe au o ținută frumoasă și patru au mers măreț:",
        "Trei lucruri au mers falnic și patru au umblare măreață:",
        "Textul spune „lucruri”, nu restrânge enumerarea la ființe.",
    ),
    "JOB.39.24": (
        "fierbe de aprindere, mănâncă pământul, n-are astâmpăr când răsună trâmbița.",
        "În zgomot și mânie, mănâncă pământul și nu stă locului la sunetul trâmbiței.",
        "Zgomotul, mânia și lipsa stării pe loc sunt explicite în verset.",
    ),
    "PSA.74.20": (
        "Ai în vedere legământul! Căci locurile dosnice din țară sunt pline de bârloguri de tâlhari.",
        "Privește la legământ! Căci locurile întunecate ale țării sunt pline de lăcașuri ale violenței.",
        "Textul vorbește despre locuri întunecate și lăcașuri ale violenței, nu despre bârloguri de tâlhari.",
    ),
}


def chapter_digest(verses: list[dict[str, object]]) -> str:
    payload = "\n".join(f"{verse['number']}\t{verse['text']}" for verse in verses)
    return "sha256:" + hashlib.sha256(payload.encode("utf-8")).hexdigest()


def main() -> None:
    grouped: dict[tuple[str, int], list[tuple[int, str, str, str]]] = {}
    for reference, (expected, replacement, reason) in REPAIRS.items():
        book, chapter, verse = reference.split(".")
        grouped.setdefault((book, int(chapter)), []).append((int(verse), expected, replacement, reason))

    changes: list[dict[str, object]] = []
    for (book, chapter), repairs in sorted(grouped.items()):
        path = DATA / f"{book}.{chapter}.json"
        document = json.loads(path.read_text(encoding="utf-8"))
        verses = {int(verse["number"]): verse for verse in document["verses"]}
        notes = document.setdefault("editorialNotes", [])
        notes[:] = [note for note in notes if note.get("term") != "ot-semantic-screening-2026-08"]
        for verse_number, expected, replacement, reason in repairs:
            verse = verses.get(verse_number)
            reference = f"{book}.{chapter}.{verse_number}"
            if verse is None:
                raise SystemExit(f"Lipsește versetul {reference}")
            actual = verse.get("text")
            if actual == replacement:
                continue
            if actual != expected:
                raise SystemExit(f"{reference}: text de bază neașteptat; nu suprascriu corectura")
            verse["text"] = replacement
            notes.append({
                "verse": verse_number,
                "term": "ot-semantic-screening-2026-08",
                "decision": replacement,
                "reason": reason,
                "reviewRequired": True,
                "resolutionStatus": "resolved",
                "resolutionReason": "Confirmat direct față de WLC/OSHB și WEBU fixate în source-lock.",
            })
            changes.append({"reference": reference, "previous": expected, "replacement": replacement, "reason": reason})
        document.setdefault("audit", {})["textDigest"] = chapter_digest(document["verses"])
        path.write_text(json.dumps(document, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    REPORT.write_text(
        json.dumps({"repairPass": "ot-semantic-screening-2026-08", "count": len(changes), "changes": changes}, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(json.dumps({"count": len(changes), "references": [change["reference"] for change in changes]}, ensure_ascii=False))


if __name__ == "__main__":
    main()
