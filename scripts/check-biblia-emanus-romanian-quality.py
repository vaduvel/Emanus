#!/usr/bin/env python3
from __future__ import annotations

import argparse
import importlib.util
import json
import re
import unicodedata
from pathlib import Path
from statistics import median

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs" / "data" / "biblia-emanus"
NT = {"MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV"}
OT = {"GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL"}

FORBIDDEN = [
    (re.compile(r"\b(?:s|n|l|i|v|m|a)['’](?:a|au|am|ai|ar|as|ați|ati)\b", re.I), "apostrof în loc de cratimă"),
    (re.compile(r"\b(?:cînd|cîmp|pămînt(?:ul|ului)?|mormînt|sînge(?:le)?|strîns|mîn(?:ă|a|i)|întîi|dintîi|bătrîni|cuvînt(?:ul)?|blîndețea|pînă|decît|sfîrșit|rămîne|vînturilor)\b", re.I), "ortografie veche cu î în interior"),
    (re.compile(r"\b(?:cari|pentrucă|dela|Celce|V['’]am|Dupăce)\b", re.I), "formă arhaică sau lipită"),
    (re.compile(r"\s+-\s+|\s+-[a-zăâîșț]|[a-zăâîșț]-\s+", re.I), "spațiere coruptă în jurul cratimei"),
    (re.compile(r"(?:[:,.]\?|\?\s*t\b|Don\?\s*t|won\?\s*t|can\?\s*t)", re.I), "punctuație/OCR englezesc corupt"),
    (re.compile(r",,"), "ghilimele corupte cu două virgule"),
    (re.compile(r"\b(?:daca|Daca|tau|Tau|intuneric|Intuneric|fara|Fara|inainte|Inainte|imparatie|Imparatie)\b"), "cuvânt românesc fără diacritice"),
    (re.compile(r"\b(?:like-minded|sound|feeding trough|publicized|baby|Don|won)\b", re.I), "fragment sau calc englezesc"),
    (re.compile(r"[ãõ]", re.I), "caracter corupt/ne-românesc"),
    (re.compile(r"\bbufnita\b", re.I), "diacritică lipsă în «bufnița»"),
    (re.compile(r"(?:\?\s*,|!\s*,)"), "virgulă imposibilă după semn terminal"),
    (re.compile(r"(?:!\?|\?!)"), "punctuație terminală dublă neuniformă"),
    (re.compile(r"\?[”»]\?"), "semn de întrebare duplicat după citat"),
    (re.compile(r"\b(?:muti|pedestri|iutimea|stărvurile)\b", re.I), "diacritică lipsă"),
    (re.compile(r"\bpârâiele\b", re.I), "plural neconform pentru «pârâu»"),
    (re.compile(r"\b(?:disciplinedază|mânindu)\b", re.I), "formă verbală coruptă"),
    (re.compile(r"\bsumețit\b", re.I), "formă verbală neconformă"),
    (re.compile(r"\bluare aminte\b", re.I), "locuțiune scrisă fără cratimă"),
    (re.compile(r"\btoți (?:fii|oameni viteji|viteji)\b", re.I), "substantiv nearticulat după «toți»"),
    (re.compile(r"\bvitejiii+\b", re.I), "formă articulată coruptă prin litere repetate"),
    (re.compile(r"lăcusta (?:Gazam|Arbeh|Ielec|Hasil)"), "substantiv comun ebraic tratat ca nume propriu"),
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
    "și-i culeg roadele": "pronume neacordat cu «vii»",
    "Vânzare! Vânzare!": "arhaism ambiguu pentru ebraicul qeșer",
    "Perii albi sunt": "formulare arhaică pentru părul cărunt",
    "și-a văzut înainte de drum": "construcție verbală coruptă",
    "coborât jos": "pleonasm",
    "ieșind afară": "pleonasm",
    "Ce! sunt câine": "interogație coruptă",
    "l-a blestemat pe David pe dumnezeii lui": "prepoziție instrumentală coruptă",
    "nu este mai veșnică": "comparație românească defectă",
    "se suie în sus": "pleonasm",
    "se coboară în jos": "pleonasm",
    "Casa aceasta, –": "semn editorial izolat",
    "să cercetezi cu de-amănuntul": "succesiune verbală defectă în Deuteronomul 17:4",
    "vorbesc cu răutate de asuprire": "construcție prepozițională ambiguă",
    "sunt plini de nădejde când le văd": "adaos absent din sursa ebraică",
    "toate bunătățile de preț și plăcute": "termen prea vag pentru ebraicul hon",
    "am fost cumpărat din tinerețea mea": "subiectul ebraic adam este omis",
    "Atunci tac și vreau să mor": "modalitate schimbată față de propoziția ipotetică ebraică",
    "cântăreala dreaptă": "termen impropriu pentru greutatea de cântar",
    "strigătele stăpânului, care-l mână": "relație de stăpânire adăugată textului",
    "au fost îndepărtați de la preoție": "calificarea ebraică drept necurați este omisă",
    "Inima mea este tulburată și nu se odihnește": "imaginea ebraică a măruntaielor care fierb este omisă",
    "nu voi da nimănui titluri măgulitoare": "calc rigid pentru verbul contextual despre lingușire",
    "Zgomotul lui vorbește despre El": "referință ambiguă într-un verset ebraic dificil",
    "Ghioagele le socotește paie": "acord și referință pronominală ambigue",
}

QUOTE_PAIRS = {"„": "”", "«": "»"}
QUOTE_OPEN_FOR_CLOSE = {value: key for key, value in QUOTE_PAIRS.items()}


def chapters(book_ids):
    for path in sorted(DATA.glob("*.json")):
        try:
            data = json.loads(path.read_text(encoding="utf-8"))
        except Exception:
            continue
        if data.get("bookId") in book_ids and isinstance(data.get("verses"), list):
            yield path, data


def load_source_data():
    validator_path = Path(__file__).with_name("check-biblia-emanus.py")
    spec = importlib.util.spec_from_file_location("biblia_emanus_validator", validator_path)
    if spec is None or spec.loader is None:
        raise RuntimeError("Nu pot încărca validatorul surselor Biblia Emanus")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    source_lock = module.load_json(DATA / "source-lock.json")
    return module, module.validate_source_lock(source_lock)


def main(argv=None) -> int:
    parser = argparse.ArgumentParser(description="Verifică limba română din Biblia Emanus.")
    parser.add_argument(
        "--testament",
        choices=("NT", "OT", "all"),
        default="NT",
        help="Corpusul verificat; implicit NT pentru compatibilitate CI.",
    )
    args = parser.parse_args(argv)
    book_ids = NT if args.testament == "NT" else OT if args.testament == "OT" else NT | OT
    errors: list[str] = []
    verse_map = {}
    chapter_count = verse_count = 0
    source_module = source_data = None
    if args.testament in {"OT", "all"}:
        source_module, source_data = load_source_data()
    for _, data in chapters(book_ids):
        chapter_count += 1
        quote_stack: list[str] = []
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

            if data["bookId"] in OT:
                book = source_data["books"][data["bookId"]]
                benchmark_lengths = [
                    len(source_module.normalize_for_comparison(
                        source_data["texts"][lock_id][(data["chapter"], verse["number"])]
                    ).split())
                    for lock_id in book["benchmarkLockIds"]
                ]
                expected_length = median(benchmark_lengths)
                ratio = len(source_module.normalize_for_comparison(text).split()) / expected_length
                # Benchmark versification can split name lists and legal clauses
                # differently; retain only a high-signal truncation threshold.
                if ratio < 0.35:
                    errors.append(
                        f"{ref}: lungime suspect de scurtă față de etaloanele fixate "
                        f"(raport {ratio:.2f}): {text}"
                    )
                if ratio > 2.00:
                    errors.append(
                        f"{ref}: lungime suspect de mare față de etaloanele fixate "
                        f"(raport {ratio:.2f}): {text}"
                    )

            for character in text:
                if character in QUOTE_PAIRS:
                    expected = "„" if len(quote_stack) % 2 == 0 else "«"
                    if character != expected:
                        errors.append(
                            f"{ref}: nivel de citare neuniform ({character} în loc de {expected}): {text}"
                        )
                    quote_stack.append(character)
                elif character in QUOTE_OPEN_FOR_CLOSE:
                    expected_open = QUOTE_OPEN_FOR_CLOSE[character]
                    if not quote_stack or quote_stack[-1] != expected_open:
                        errors.append(f"{ref}: închidere de citat incompatibilă: {text}")
                    else:
                        quote_stack.pop()
        if quote_stack:
            errors.append(f"{data['bookId']}.{data['chapter']}: citat neînchis la sfârșitul capitolului")

    if args.testament in {"NT", "all"}:
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

    print(f"[romanian-quality:{args.testament}] {chapter_count} capitole / {verse_count} versete / {len(errors)} probleme")
    for error in errors[:250]:
        print("-", error)
    if len(errors) > 250:
        print(f"... încă {len(errors)-250} probleme")
    return 1 if errors else 0


if __name__ == "__main__":
    raise SystemExit(main())
