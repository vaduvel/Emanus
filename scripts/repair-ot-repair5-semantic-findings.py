#!/usr/bin/env python3
"""Repair source-confirmed semantic errors surfaced by the full OT audit.

Every replacement below addresses a concrete omission, wrong object, reversed
meaning, or corrupted punctuation confirmed against the pinned WEBBE source and,
for canonical books, checked against WLC/BTF evidence. The pass is explicit and
idempotent; no model-generated bulk rewriting occurs here.
"""
from __future__ import annotations

import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs" / "data" / "biblia-emanus-candidates"
OUT = ROOT / "docs" / "biblia-emanus" / "OT-REPAIR5-SEMANTIC-REPAIRS.json"

REPLACEMENTS = {
    "EZK.23:16": "De îndată ce i-a văzut, s-a aprins de dorință după ei și le-a trimis soli în Haldeea.",
    "JDG.5:21": "Pârâul Chișon i-a luat, pârâul străvechi, pârâul Chișon. Suflete al meu, înaintează cu putere!",
    "JOB.6:27": "Voi ați arunca sorții chiar și pentru un orfan și v-ați târgui pentru prietenul vostru.",
    "AMO.5:18": "Vai de cei care doresc ziua DOMNULUI! La ce vă va folosi ziua DOMNULUI? Ea va fi întuneric, nu lumină.",
    "PRO.14:4": "Unde nu sunt boi, ieslea este curată, dar puterea boului aduce belșug de roade.",
    "ISA.65:5": "Ei spun: «Stai deoparte! Nu te apropia de mine, fiindcă sunt mai sfânt decât tine!» Aceștia sunt fum în nările Mele, un foc care arde toată ziua.",
    "JER.11:16": "DOMNUL te numise «măslin verde, frumos, cu rod bun». Dar, în vuietul unei mari furtuni, a aprins focul asupra lui, iar ramurile lui au fost frânte.",
    "2KI.9:37": "Hoita Izabelei va fi ca gunoiul pe fața câmpului, pe ogorul din Izreel, astfel încât nimeni nu va mai putea spune: «Aceasta este Izabela.»",
    "RUT.4:17": "Femeile vecine i-au pus numele Obed, spunând: «Naomi are un fiu!» El a fost tatăl lui Isai, tatăl lui David.",
    "1SA.17:6": "Avea jambiere de bronz pe picioare și o suliță de bronz între umeri.",
    "ISA.32:19": "Chiar dacă grindina va doborî pădurea, iar cetatea va fi făcută una cu pământul.",
    "JER.52:22": "Deasupra lui era un capitel de bronz, înalt de cinci coți. Împrejurul capitelului erau o rețea și rodii, toate de bronz. Al doilea stâlp avea aceeași înfățișare, cu rodii.",
    "PSA.13:4": "ca să nu spună vrăjmașul meu: «L-am biruit!» și potrivnicii mei să nu se bucure când mă clatin.",
    "2KI.9:10": "Câinii o vor mânca pe Izabela pe ogorul din Izreel și nu va fi nimeni care s-o îngroape.» Apoi tânărul a deschis ușa și a fugit.",
    "EZK.18:25": "Dar voi spuneți: «Calea Stăpânului nu este dreaptă.» Ascultă, casă a lui Israel! Oare calea Mea nu este dreaptă? Nu sunt mai degrabă căile voastre nedrepte?",
    "1KI.2:38": "Șimei i-a spus împăratului: «Cuvântul este bun. Slujitorul tău va face așa cum a spus domnul meu, împăratul.» Șimei a locuit multe zile la Ierusalim.",
    "PSA.18:3": "Îl chem pe DOMNUL, care este vrednic de laudă, și sunt izbăvit de vrăjmașii mei.",
    "LAM.3:24": "«DOMNUL este partea mea», spune sufletul meu; de aceea voi nădăjdui în El.",
    "1SA.25:19": "Ea le-a spus slujitorilor săi: «Mergeți înaintea mea; eu vin după voi.» Dar nu i-a spus nimic soțului ei, Nabal.",
    "PSA.49:9": "ca să trăiască pe vecie și să nu vadă groapa.",
    "JOB.24:6": "Ei își strâng hrana de pe câmp și culeg ce a rămas în via celui nelegiuit.",
}

REASONS = {
    "EZK.23:16": "Lipsea verbul semantic central: femeia s-a aprins de dorință după chipurile văzute.",
    "JDG.5:21": "Imperativul final înseamnă înaintare cu putere, nu călcarea vitejilor în picioare.",
    "JOB.6:27": "Acțiunile sunt tragerea la sorți pentru orfan și comercializarea prietenului, nu persecutarea generică.",
    "AMO.5:18": "Versetul era tăiat după exclamația introductivă și pierdea contrastul întuneric–lumină.",
    "PRO.14:4": "Ieslea fără boi este curată, nu doar goală; antiteza privește curățenia și productivitatea.",
    "ISA.65:5": "Lipseau evaluarea divină și imaginile fumului și focului continuu.",
    "JER.11:16": "Lipseau focul, vuietul și ruperea ramurilor.",
    "2KI.9:37": "Textul avea ghilimele multiplicate mecanic și era nepublicabil.",
    "RUT.4:17": "Lipseau numele Obed și legătura genealogică până la David.",
    "1SA.17:6": "Obiectul dintre umeri este o suliță de bronz, nu un scut.",
    "ISA.32:19": "Cetatea este nivelată complet; formularea moștenită nu avea sens românesc.",
    "JER.52:22": "Termenul arhitectural este capitel, nu acoperiș.",
    "PSA.13:4": "Lipseau două consecințe: lauda vrăjmașului și bucuria potrivnicilor la cădere.",
    "2KI.9:10": "Lipseau lipsa îngropării și fuga mesagerului după rostirea profeției.",
    "EZK.18:25": "Lipseau răspunsul lui Dumnezeu și întoarcerea acuzației asupra căilor lui Israel.",
    "1KI.2:38": "Lipseau acceptarea ordinului și șederea îndelungată a lui Șimei la Ierusalim.",
    "PSA.18:3": "Lipseau chemarea DOMNULUI și izbăvirea de vrăjmași.",
    "LAM.3:24": "Lipseau vorbitorul, sufletul, și concluzia nădejdii.",
    "1SA.25:19": "Lipseau instrucțiunea către slujitori și faptul că Abigail nu i-a spus lui Nabal.",
    "PSA.49:9": "Dubla negație românească răsturna sensul dorit al vieții fără vedere a gropii.",
    "JOB.24:6": "«Nutreț» introducea hrană pentru animale; contextul este hrana secerată de oameni săraci.",
}


def digest(verses: list[dict]) -> str:
    raw = "\n".join(str(v.get("text", "")) for v in verses)
    return hashlib.sha256(raw.encode("utf-8")).hexdigest()


def main() -> None:
    grouped: dict[tuple[str, int], dict[int, str]] = {}
    for reference, replacement in REPLACEMENTS.items():
        book_chapter, verse = reference.split(":")
        book, chapter = book_chapter.split(".")
        grouped.setdefault((book, int(chapter)), {})[int(verse)] = replacement

    changed = []
    for (book, chapter), replacements in sorted(grouped.items()):
        path = DATA / f"{book}.{chapter}.json"
        if not path.exists():
            raise SystemExit(f"Missing candidate chapter: {path}")
        doc = json.loads(path.read_text(encoding="utf-8"))
        verses = doc.get("verses", [])
        by_number = {int(v.get("number", 0)): v for v in verses}
        notes = [n for n in doc.get("editorialNotes", []) if n.get("term") != "repair5-semantic-finding"]
        for number, replacement in sorted(replacements.items()):
            ref = f"{book}.{chapter}:{number}"
            verse = by_number.get(number)
            if verse is None:
                raise SystemExit(f"Missing target verse: {ref}")
            old = str(verse.get("text", ""))
            verse["text"] = replacement
            notes.append({
                "verse": number,
                "term": "repair5-semantic-finding",
                "decision": REASONS[ref],
                "previousTextDigest": hashlib.sha256(old.encode("utf-8")).hexdigest(),
                "sourceEvidence": ["eng-webbe pinned snapshot", "hebwlc pinned snapshot", "ronbtf comparison-only snapshot"],
                "resolutionStatus": "resolved",
            })
            changed.append({
                "reference": ref,
                "previousText": old,
                "repairedText": replacement,
                "reason": REASONS[ref],
            })
        doc["editorialNotes"] = notes
        audit = doc.setdefault("audit", {})
        audit["textDigest"] = digest(verses)
        passes = audit.setdefault("repairPasses", [])
        if "ot-repair5-semantic-findings-1" not in passes:
            passes.append("ot-repair5-semantic-findings-1")
        path.write_text(json.dumps(doc, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    payload = {
        "repairPass": "ot-repair5-semantic-findings-1",
        "count": len(changed),
        "changes": changed,
    }
    OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"count": len(changed), "references": [x["reference"] for x in changed]}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
