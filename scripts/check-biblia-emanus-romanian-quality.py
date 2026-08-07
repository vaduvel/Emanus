#!/usr/bin/env python3
from __future__ import annotations

import json
import importlib.util
import re
import sys
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs" / "data" / "biblia-emanus"
NT = {"MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV"}


def load_editorial_gate():
    path = ROOT / "scripts" / "nt_editorial_gate.py"
    spec = importlib.util.spec_from_file_location("nt_editorial_gate", path)
    if spec is None or spec.loader is None:
        raise RuntimeError("Nu pot încărca poarta editorială NT")
    module = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = module
    spec.loader.exec_module(module)
    return module

FORBIDDEN = [
    (re.compile(r"\b(?:s|n|l|i|v|m|a)['’](?:a|au|am|ai|ar|as|ați|ati)\b", re.I), "apostrof în loc de cratimă"),
    (re.compile(r"\b(?:cînd|cîmp|pămînt(?:ul|ului)?|mormînt|sînge(?:le)?|strîns|mîn(?:ă|a|i)|întîi|dintîi|bătrîni|cuvînt(?:ul)?|blîndețea|pînă|decît|sfîrșit|rămîne|vînturilor)\b", re.I), "ortografie veche cu î în interior"),
    (re.compile(r"\b(?:cari|pentrucă|dela|Celce|V['’]am|Dupăce)\b", re.I), "formă arhaică sau lipită"),
    (re.compile(r"\s+-\s+|\s+-[a-zăâîșț]|[a-zăâîșț]-\s+", re.I), "spațiere coruptă în jurul cratimei"),
    (re.compile(r"(?:[:,.]\?|\?\s*t\b|Don\?\s*t|won\?\s*t|can\?\s*t)", re.I), "punctuație/OCR englezesc corupt"),
    (re.compile(r",,"), "ghilimele corupte cu două virgule"),
    (re.compile(r"\b(?:daca|Daca|tau|Tau|intuneric|Intuneric|fara|Fara|pana|Pana|inainte|Inainte|imparatie|Imparatie)\b"), "cuvânt românesc fără diacritice"),
    (re.compile(r"\b(?:like-minded|sound|feeding trough|publicized|baby|Don|won)\b", re.I), "fragment sau calc englezesc"),
    (re.compile(r"[ãõ]", re.I), "caracter corupt/ne-românesc"),
]

BAD_PHRASES = {
    "Dumnezeu Regatul": "ordine sintactică imposibilă",
    "va fi nerăbdător pentru sine": "calc englezesc",
    "Fiecare zi propriul rău este suficient": "ordine sintactică imposibilă",
    "situată într-un jgheab de hrănire": "acord și registru defecte",
    "au mediatizat pe larg zicala": "registru defect",
    "este preferat înaintea mea": "calc englezesc",
    "a declarat, și nu a negat, dar el a declarat": "repetiție mecanică",
    "Cine nu are pe Dumnezeu, Fiul lui nu are viața": "sens și ordine defecte",
    "cei care nu păcătuiesc duce la moarte": "acord și sens defecte",
    "ca-minded": "fragment englezesc",
    "durere dureroasă și dureroasă": "repetiție mecanică",
    "castronul pe pământ": "termen impropriu pentru vasul apocaliptic",
    "într-un cartof": "halucinație lexicală",
    "cei care rulează într-o cursă toate alerga": "traducere mecanică neinteligibilă",
    "cel ce plugul ar trebui": "traducere mecanică neinteligibilă",
    "un vapori care apare": "acord și calc englezesc",
    "de te la el": "propoziție coruptă",
    "de-pasă de el": "propoziție coruptă",
    "de la cel mai mic la cel mai mare lor": "acord corupt",
    "mă de păcat": "verb lipsă",
    "Pa mieii mei": "verb corupt",
    "Pa oile mele": "verb corupt",
    "Pune-Mi oile la încercare": "sens corupt",
    "Na ta preoții": "fragment corupt",
    "ai câștigat t vedea mine": "fragment englezesc corupt",
    "eliber-l": "verb corupt",
    "nu păz Legea": "acord verbal corupt",
    "faptele lui erau rele ale fratelui său drepte": "ordine sintactică imposibilă",
    "nu am de gând în conformitate cu carnea": "calc englezesc",
    "Nu există nici o altă veste bună.?": "punctuație și sens corupte",
}


def chapters():
    for path in sorted(DATA.glob("*.json")):
        try:
            data = json.loads(path.read_text(encoding="utf-8"))
        except Exception:
            continue
        if data.get("bookId") in NT and isinstance(data.get("verses"), list):
            yield path, data


def main() -> int:
    errors: list[str] = []
    verse_map = {}
    chapter_map = {}
    chapter_count = verse_count = 0
    for _, data in chapters():
        chapter_count += 1
        chapter_map[f"{data['bookId']}.{data['chapter']}"] = data
        for verse in data["verses"]:
            verse_count += 1
            ref = f"{data['bookId']}.{data['chapter']}.{verse['number']}"
            text = str(verse.get("text", ""))
            verse_map[ref] = (text, verse)
            if not text.strip():
                errors.append(f"{ref}: text gol")
                continue
            if unicodedata.normalize("NFC", text) != text:
                errors.append(f"{ref}: textul nu este NFC")
            if any(ch in text for ch in "şţŞŢ"):
                errors.append(f"{ref}: diacritice cu sedilă")
            for pattern, detail in FORBIDDEN:
                if pattern.search(text):
                    errors.append(f"{ref}: {detail}: {text}")
            lower = text.lower()
            for phrase, detail in BAD_PHRASES.items():
                if re.search(rf"(?<!\w){re.escape(phrase.lower())}(?!\w)", lower):
                    errors.append(f"{ref}: {detail}: {text}")

    gate = load_editorial_gate()
    for issue in gate.scan_nt_quality(chapter_map):
        text = verse_map.get(issue.reference, ("", {}))[0]
        errors.append(f"{issue.reference}: [{issue.code}] {issue.detail}: {text}")

    mat = verse_map.get("MAT.6.13", ("", {}))[0].lower()
    if any(x in mat for x in ("căci a ta este împărăția", "puterea și slava", "amin")):
        errors.append("MAT.6.13: doxologia tradițională este în textul principal, contrar SBLGNT")
    jhn = verse_map.get("JHN.1.18", ("", {}))[0].lower()
    if "dumnezeu, cel unic" not in jhn:
        errors.append("JHN.1.18: textul principal nu corespunde lecturii μονογενὴς θεός")
    one7 = verse_map.get("1JN.5.7", ("", {}))[0].lower()
    one8 = verse_map.get("1JN.5.8", ("", {}))[0].lower()
    if any(x in one7 + " " + one8 for x in ("tatăl, cuvântul", "în cer", "acești trei una sunt")):
        errors.append("1JN.5.7-8: Comma Johanneum nu poate fi în textul principal")
    for number in range(9, 21):
        item = verse_map.get(f"MRK.16.{number}")
        if item and item[1].get("textualStatus") != "double-bracketed":
            errors.append(f"MRK.16.{number}: finalul lung nu este marcat double-bracketed")

    print(f"[romanian-quality] {chapter_count} capitole / {verse_count} versete / {len(errors)} probleme")
    for error in errors[:250]:
        print("-", error)
    if len(errors) > 250:
        print(f"... încă {len(errors)-250} probleme")
    return 1 if errors else 0


if __name__ == "__main__":
    raise SystemExit(main())
