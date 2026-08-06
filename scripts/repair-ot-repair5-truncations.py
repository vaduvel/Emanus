#!/usr/bin/env python3
"""Repair the 33 source-proven truncations found by deterministic audit v3."""
from __future__ import annotations

import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs" / "data" / "biblia-emanus-candidates"

REPLACEMENTS = {
    "1KI.13:12": "Tatăl lor i-a întrebat: „Pe ce drum a plecat?” Fiii lui văzuseră drumul pe care mersese omul lui Dumnezeu venit din Iuda.",
    "1KI.19:11": "El i-a spus: „Ieși și stai pe munte înaintea DOMNULUI!” Și iată, DOMNUL a trecut. Un vânt mare și puternic despica munții și sfărâma stâncile înaintea DOMNULUI, dar DOMNUL nu era în vânt. După vânt a venit un cutremur, dar DOMNUL nu era în cutremur.",
    "1KI.22:37": "Astfel, împăratul a murit. A fost adus la Samaria și a fost înmormântat acolo.",
    "1SA.20:7": "Dacă va spune: „Bine”, slujitorul tău va fi în pace; dar dacă se va mânia, să știi că a hotărât răul.",
    "1SA.28:23": "Dar el a refuzat și a spus: „Nu voi mânca.” Slujitorii lui și femeia au stăruit, iar el i-a ascultat. S-a ridicat de la pământ și s-a așezat pe pat.",
    "2KI.10:14": "El a spus: „Prindeți-i de vii!” I-au prins de vii și i-au ucis la groapa de lângă casa tunsului oilor: patruzeci și doi de oameni. Iehu n-a lăsat să scape niciunul.",
    "2KI.5:23": "Naaman a spus: „Te rog, ia doi talanți.” A stăruit de el, a legat doi talanți de argint în doi saci, împreună cu două schimburi de haine, și le-a dat la doi dintre slujitorii săi, care le-au purtat înaintea lui.",
    "2KI.9:21": "Ioram a poruncit: „Pregătiți carul!” I-au pregătit carul, iar Ioram, împăratul lui Israel, și Ahazia, împăratul lui Iuda, au ieșit fiecare în carul său. Au mers în întâmpinarea lui Iehu și l-au găsit pe ogorul lui Nabot din Izreel.",
    "2KI.9:33": "El a spus: „Aruncați-o jos!” Ei au aruncat-o, iar sângele ei a stropit zidul și caii. Apoi Iehu a călcat-o în picioare.",
    "2SA.18:14": "Ioab a spus: „Nu voi mai pierde vremea cu tine!” A luat trei sulițe în mână și le-a înfipt în inima lui Absalom, care era încă viu în mijlocul stejarului.",
    "EST.6:4": "Împăratul a întrebat: „Cine este în curte?” Haman tocmai intrase în curtea exterioară a palatului, ca să-i ceară împăratului să-l spânzure pe Mardoheu pe spânzurătoarea pregătită pentru el.",
    "EZK.3:18": "Când îi voi spune celui rău: „Vei muri negreșit”, iar tu nu-l vei avertiza și nu-i vei vorbi ca să-l întorci de la calea lui rea și să-i salvezi viața, acel om rău va muri în nelegiuirea lui, dar sângele lui îl voi cere din mâna ta.",
    "EZK.33:8": "Când îi voi spune celui rău: „Om rău, vei muri negreșit”, iar tu nu vei vorbi ca să-l avertizezi să se întoarcă de la calea lui, acel om rău va muri în nelegiuirea lui, dar sângele lui îl voi cere din mâna ta.",
    "EZK.36:4": "de aceea, munți ai lui Israel, ascultați cuvântul Stăpânului DOMN! Așa vorbește Stăpânul DOMN munților și dealurilor, albiilor și văilor, ruinelor pustii și cetăților părăsite, care au ajuns pradă și batjocură pentru rămășița popoarelor din jur:",
    "EZK.8:5": "El mi-a spus: „Fiul omului, ridică-ți ochii spre nord.” Mi-am ridicat ochii spre nord și iată, la nord de poarta altarului, la intrare, era acel chip care stârnea gelozia.",
    "ISA.57:10": "Ai obosit de lungimea drumurilor tale, dar n-ai spus: „Este zadarnic.” Ai găsit o reînnoire a puterii tale și de aceea n-ai slăbit.",
    "ISA.8:20": "Întoarceți-vă la Lege și la mărturie! Dacă nu vor vorbi potrivit acestui cuvânt, nu va exista nicio lumină a dimineții pentru ei.",
    "JDG.11:38": "El i-a spus: „Du-te.” A lăsat-o să plece pentru două luni; ea a mers împreună cu prietenele ei și și-a plâns fecioria pe munți.",
    "JDG.12:6": "atunci îi spuneau: „Spune «Șibolet».” El zicea: „Sibolet”, fiindcă nu putea rosti corect. Atunci îl prindeau și îl ucideau la vadurile Iordanului. În vremea aceea au căzut patruzeci și două de mii de efraimiți.",
    "JDG.16:30": "Samson a spus: „Să mor împreună cu filistenii!” S-a încordat cu toată puterea, iar casa s-a prăbușit peste conducători și peste tot poporul dinăuntru. Astfel, cei pe care i-a ucis la moartea sa au fost mai mulți decât cei pe care îi ucisese în timpul vieții.",
    "JDG.8:25": "Ei au răspuns: „Ți-i vom da cu plăcere.” Au întins o haină și fiecare a aruncat pe ea cerceii luați ca pradă.",
    "JER.2:8": "Preoții n-au întrebat: „Unde este DOMNUL?” Cei care mânuiau Legea nu M-au cunoscut; conducătorii s-au răzvrătit împotriva Mea, profeții au profețit prin Baal și au urmat lucruri fără folos.",
    "JER.23:36": "Să nu mai spuneți: „Povara DOMNULUI”, căci cuvântul fiecăruia va ajunge propria lui povară; voi răstălmăciți cuvintele Dumnezeului celui viu, ale DOMNULUI Oștirilor, Dumnezeul nostru.",
    "JER.4:2": "și dacă vei jura: „Viu este DOMNUL!”, cu adevăr, cu dreptate și cu neprihănire, atunci națiunile se vor binecuvânta în El și se vor lăuda cu El.",
    "JOB.37:6": "El îi spune zăpezii: „Cazi pe pământ”, și la fel ploii, atât aversei ușoare, cât și ploii Sale puternice.",
    "JOL.1:15": "Vai, ce zi! Ziua DOMNULUI este aproape și vine ca o nimicire de la Cel Atotputernic.",
    "MAL.1:13": "Mai spuneți: „Ce oboseală!” și o tratați cu dispreț, zice DOMNUL Oștirilor. Aduceți animale luate cu sila, șchioape sau bolnave și le aduceți ca dar. Să le primesc Eu din mâna voastră? zice DOMNUL.",
    "MAL.2:14": "Și întrebați: „De ce?” Pentru că DOMNUL a fost martor între tine și soția tinereții tale, față de care ai fost necredincios, deși ea este tovarășa ta și soția legământului tău.",
    "PRO.20:14": "„Nu este bun, nu este bun”, spune cumpărătorul; dar după ce pleacă, se laudă cu târgul făcut.",
    "PRO.24:12": "Dacă spui: „Iată, n-am știut”, oare Cel care cântărește inimile nu vede? Cel care îți păzește sufletul nu știe? Nu va răsplăti El fiecăruia după faptele lui?",
    "PSA.57:1": "(Pentru dirijor. Pe melodia „Nu nimici”. Un miktam al lui David, când a fugit de Saul în peșteră.) Dumnezeule, ai milă de mine, ai milă de mine, căci sufletul meu se adăpostește în Tine; la umbra aripilor Tale mă voi refugia până va trece nenorocirea.",
    "ZEC.11:10": "Mi-am luat toiagul numit „Bunăvoință” și l-am rupt, ca să desființez legământul pe care îl încheiasem cu toate popoarele.",
    "ZEC.5:8": "El a spus: „Aceasta este Răutatea!” A împins-o înapoi în mijlocul efei și a aruncat greutatea de plumb peste gura ei.",
}


def digest(verses: list[dict]) -> str:
    raw = "\n".join(str(v.get("text", "")) for v in verses)
    return hashlib.sha256(raw.encode("utf-8")).hexdigest()


def main() -> None:
    grouped: dict[tuple[str, int], dict[int, str]] = {}
    for reference, text in REPLACEMENTS.items():
        book_chapter, verse = reference.split(":")
        book, chapter = book_chapter.split(".")
        grouped.setdefault((book, int(chapter)), {})[int(verse)] = text

    changed = []
    for (book, chapter), replacements in sorted(grouped.items()):
        path = DATA / f"{book}.{chapter}.json"
        doc = json.loads(path.read_text(encoding="utf-8"))
        verses = doc.get("verses", [])
        by_number = {int(v["number"]): v for v in verses}
        notes = [n for n in doc.get("editorialNotes", []) if n.get("term") != "repair5-truncation"]
        for number, new_text in sorted(replacements.items()):
            if number not in by_number:
                raise SystemExit(f"Missing target {book}.{chapter}:{number}")
            old_text = str(by_number[number].get("text", ""))
            by_number[number]["text"] = new_text
            notes.append({
                "verse": number,
                "term": "repair5-truncation",
                "decision": "Versetul moștenit era tăiat după prima propoziție sau după introducerea citatului; a fost reconstruit integral din WEBBE și verificat comparativ cu WLC/BTF, unde sunt disponibile.",
                "previousTextDigest": hashlib.sha256(old_text.encode("utf-8")).hexdigest(),
                "resolutionStatus": "resolved",
            })
            changed.append(f"{book}.{chapter}:{number}")
        doc["editorialNotes"] = notes
        doc.setdefault("audit", {})["textDigest"] = digest(verses)
        doc["audit"]["repairPass"] = "ot-repair5-truncation-1"
        path.write_text(json.dumps(doc, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    report = {
        "repairPass": "ot-repair5-truncation-1",
        "changedVerses": changed,
        "count": len(changed),
    }
    out = ROOT / "docs" / "biblia-emanus" / "OT-REPAIR5-TRUNCATION-REPAIRS.json"
    out.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(report, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
