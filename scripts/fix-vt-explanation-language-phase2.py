#!/usr/bin/env python3
"""A doua trecere de corectură pentru Numeri/Deuteronom.

Rulează exclusiv în stringurile de explicație din fișierele de capitol.
Nu atinge `*Text*.ts`, identificatori, importuri sau versificația.
"""

from __future__ import annotations

import argparse
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BIBLE = ROOT / "packages" / "shared" / "src" / "bible"
STRING_RE = re.compile(r'"(?:\\.|[^"\\])*"')
WORD = r"A-Za-zĂÂÎȘȚăâîșț"


def targets() -> list[Path]:
    paths = list(BIBLE.glob("deuteronom[0-9]*.ts")) + list(BIBLE.glob("numeri[0-9]*.ts"))
    return sorted(p for p in paths if "Text" not in p.name)


EXACT = {
    "salcîm": "salcâm", "Salcîm": "Salcâm", "decît": "decât", "Decît": "Decât",
    "sămînta": "sămânța", "grînele": "grânele", "grînî": "grâne",
    "stînga": "stânga", "jurămîntul": "jurământul", "cîrteala": "cârteala",
    "mânci": "mănânci", "mănce": "mănânce", "mânce": "mănânce", "mânance": "mănânce",
    "necroforagele": "necrofagele", "vânde": "vinde", "intervenîm": "intervenim",
    "camata": "camăta", "Camata": "Camăta", "zcălogului": "zălogului",
    "împarțită": "împărțită", "elibetări": "eliberări", "legți": "legi",
    "abătere": "abatere", "atat": "atât", "scoțătorul": "scoaterea",
    "seminatii": "seminții", "seminatie": "seminție", "inainte": "înainte",
    "incheind": "încheind", "carui": "cărui", "brate": "brațe", "vesnice": "veșnice",
    "leaga": "leagă", "pazesc": "păzesc", "frunatile": "frunțile", "impunge": "împunge",
    "incheie": "încheie", "obosseste": "obosește", "traditional": "tradițional",
    "ramasa": "rămasă", "indreptand": "îndreptând", "recunostinta": "recunoștința",
    "mostenirea": "moștenirea", "lasand": "lăsând", "asteptare": "așteptare",
    "implinita": "împlinită", "tarziu": "târziu", "Mostenirea": "Moștenirea",
    "pregatiti": "pregătiți", "ramane": "rămâne", "măreță": "măreață",
    "pănă": "până", "erati": "erați", "tăre": "tare", "puteța": "puterea",
    "înți": "îți", "sfârâmat": "sfărâmat", "disprtu": "disprețul",
    "hultește": "hulește", "leviti": "leviți", "Mulțumescu": "Mulțumesc",
    "răbini": "rabini", "aratând": "arătând", "ascultati": "ascultați",
    "țiție": "ție", "apâta": "ațâța", "Țapte": "Șapte", "sugeratand": "sugerând",
    "sugeratând": "sugerând", "ceta": "ceata", "înălți": "înalți",
    "madianita": "madianită", "fruntasii": "fruntașii", "descantec": "descântec",
    "exceptand": "exceptând", "ispărăvit": "isprăvit", "vostrăi": "voștri",
    "omenesti": "omenești", "nazirelul": "nazireul", "blandețe": "blândețe",
    "neabatută": "neabătută", "înaltat": "înălțat", "înălțat": "înălțat",
    "preoțease": "preoțească", "aleas": "ales", "mâncați": "mâncați",
    "Împregnată": "impregnată", "împartășește": "împărtășește",
    "înceoe": "începe", "Îrful": "vârful", "Înutul": "ținutul",
}

PHRASES = {
    "inimă care trebuie tăiată Împreună": "inimă care trebuie tăiată împrejur",
    "chemarea de a tăia inima Împreună": "chemarea de a tăia împrejur inima",
    "Tăiați Împreună inima voastră": "Tăiați împrejur inima voastră",
    "să tăiați Împreună inima voastră": "să tăiați împrejur inima voastră",
    "să tăiați Împreună pielea inimii voastre": "să tăiați împrejur pielea inimii voastre",
    "Tăiește Împreună inima noastră": "Taie împrejur inima noastră",
    "Moise Îl construiește un chivot": "Moise construiește un chivot",
    "unde fiul lui Eleazar Îl urmează În slujba preoțească": "unde fiul lui, Eleazar, îi urmează în slujba preoțească",
    "Religia biblică se rezumă Îl patru mișcări": "Religia biblică se rezumă în patru mișcări",
    "Dumnezeu însăși": "Dumnezeu Însuși",
    "nu ți dă": "nu-ți dă",
    "Moise rostesc Shema": "Moise rostește Shema",
    "Moise numesc greșeala": "Moise numește greșeala",
    "purtate pe mnă": "purtate pe mână",
    "Socotește-te săul": "După ce te vei sătura",
    "o întrebă pe care Moise o pune": "o întrebare pe care Moise o pune",
    "poporul care Îli aparține": "poporul care Îi aparține",
    "persoana aceea Îli hultește pe DOMNUL": "persoana aceea Îl hulește pe DOMNUL",
    "Aproprierea de Dumnezeu": "Apropierea de Dumnezeu",
    "Dumnezeu Însăși întâlnirea": "Dumnezeu Însuși întâlnirea",
    "Duhul lui Dumnezeu a venit peste el” — aceeași": "Duhul lui Dumnezeu a venit peste el” — aceeași",
    "Moise Însuși a spart tablele scrise cu însuși degetul lui Dumnezeu": "Moise însuși a spart tablele scrise cu degetul lui Dumnezeu",
    "chiar În timp ce primești cele mai mari daruri de la Tine": "chiar în timp ce primim cele mai mari daruri de la Tine",
    "noi însuși Îl batem joc de el": "noi înșine ne batem joc de el",
    "fără să lase nicio relână de venerabile rămășițe": "fără să lase nicio fărâmă care să poată deveni obiect de venerare",
}

TOKEN_PATTERNS = [
    (re.compile(rf"(?<![{WORD}]){re.escape(bad)}(?![{WORD}])"), good)
    for bad, good in EXACT.items()
]


def lowercase_mid_sentence_in(value: str) -> str:
    """Corectează `În` produs de conversie când nu începe o propoziție."""
    chars = list(value)
    for match in list(re.finditer(r"\bÎn\b", value)):
        start = match.start()
        prefix = value[:start].rstrip()
        if not prefix:
            continue
        # După punct/semn de întrebare/exclamare păstrăm majuscula.
        if prefix[-1] in ".?!":
            continue
        chars[start] = "î"
    return "".join(chars)


def clean(value: str) -> str:
    value = value.translate(str.maketrans({"ş": "ș", "Ş": "Ș", "ţ": "ț", "Ţ": "Ț"}))
    for bad, good in PHRASES.items():
        value = value.replace(bad, good)
    for pattern, good in TOKEN_PATTERNS:
        value = pattern.sub(good, value)
    value = lowercase_mid_sentence_in(value)
    # Ortografie modernă pentru câteva forme productive rămase.
    value = re.sub(r"\b([A-Za-zĂÂÎȘȚăâîșț]+)înd\b", lambda m: m.group(1) + "ând" if m.group(0) in {"punînd", "arătînd", "adăugînd"} else m.group(0), value)
    return value


def should_process(raw: str) -> bool:
    inner = raw[1:-1]
    if len(inner) < 20 or inner.startswith(("./", "../", "http")):
        return False
    return True


def clean_file(text: str) -> str:
    def repl(match: re.Match[str]) -> str:
        raw = match.group(0)
        if not should_process(raw):
            return raw
        return '"' + clean(raw[1:-1]) + '"'
    return STRING_RE.sub(repl, text)


def banned(text: str) -> set[str]:
    probes = {
        "tăiată Împreună", "tăia inima Împreună", "Tăiați Împreună", "Tăiește Împreună",
        "Moise Îl construiește", "preoțease", "decît", "salcîm", "prtișniți", "împlânită",
        "transliterațion", "Îli hultește", "Moise rostesc", "Moise numesc", "relână",
        "puteța", "sfârâmat", "disprtu", "tecăpațina", "Mulțumescu", "ambălăieșe",
    }
    return {p for p in probes if p in text}


def main() -> None:
    parser = argparse.ArgumentParser()
    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument("--check", action="store_true")
    mode.add_argument("--write", action="store_true")
    args = parser.parse_args()

    changed = []
    bad = []
    for path in targets():
        before = path.read_text(encoding="utf-8")
        after = clean_file(before)
        if before != after:
            changed.append(path)
            if args.write:
                path.write_text(after, encoding="utf-8")
        remains = banned(after)
        if remains:
            bad.append((path, remains))

    if bad:
        for path, terms in bad:
            print(f"{path.relative_to(ROOT)}: {', '.join(sorted(terms))}")
        raise SystemExit(1)

    if args.check and changed:
        print(f"{len(changed)} fișiere necesită faza 2 de corectură.")
        raise SystemExit(1)

    print(f"Faza 2 limbă VT: {len(changed)} fișiere modificate.")


if __name__ == "__main__":
    main()
