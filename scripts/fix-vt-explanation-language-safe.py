#!/usr/bin/env python3
"""Corectură sigură, exclusiv lingvistică, pentru explicațiile Numeri/Deuteronom.

Reguli:
- procesează numai `numeriN.ts` și `deuteronomN.ts`; niciodată `*Text*.ts`;
- modifică numai conținutul literalelor string lungi, nu identificatori/importuri/chei;
- nu atinge stringurile ebraice/transliterările scurte;
- aplică doar ortografie modernă și typo-uri cu corecție neambiguă;
- nu rescrie doctrina, aplicațiile sau sensul pasajului.
"""

from __future__ import annotations

import argparse
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BIBLE = ROOT / "packages" / "shared" / "src" / "bible"
STRING_RE = re.compile(r'"(?:\\.|[^"\\])*"')


def targets() -> list[Path]:
    paths = list(BIBLE.glob("deuteronom[0-9]*.ts")) + list(BIBLE.glob("numeri[0-9]*.ts"))
    return sorted(p for p in paths if "Text" not in p.name)


# Modernizarea î/â este limitată la rădăcini românești neambigue.
PATTERNS: list[tuple[re.Pattern[str], str]] = [
    (re.compile(r"\bpămînt"), "pământ"), (re.compile(r"\bPămînt"), "Pământ"),
    (re.compile(r"\blegămînt"), "legământ"), (re.compile(r"\bLegămînt"), "Legământ"),
    (re.compile(r"\bcuvînt"), "cuvânt"), (re.compile(r"\bCuvînt"), "Cuvânt"),
    (re.compile(r"\bbinecuvînt"), "binecuvânt"), (re.compile(r"\bBinecuvînt"), "Binecuvânt"),
    (re.compile(r"\bpîn"), "pân"), (re.compile(r"\bPîn"), "Pân"),
    (re.compile(r"\bcînd\b"), "când"), (re.compile(r"\bCînd\b"), "Când"),
    (re.compile(r"\bmîn"), "mân"), (re.compile(r"\bMîn"), "Mân"),
    (re.compile(r"\bsîng"), "sâng"), (re.compile(r"\bSîng"), "Sâng"),
    (re.compile(r"\bsfînt"), "sfânt"), (re.compile(r"\bSfînt"), "Sfânt"),
    (re.compile(r"\bsfîr"), "sfâr"), (re.compile(r"\bSfîr"), "Sfâr"),
    (re.compile(r"\bstîlp"), "stâlp"), (re.compile(r"\bStîlp"), "Stâlp"),
    (re.compile(r"\bstînc"), "stânc"), (re.compile(r"\bStînc"), "Stânc"),
    (re.compile(r"\btîrzi"), "târzi"), (re.compile(r"\bTîrzi"), "Târzi"),
    (re.compile(r"\bîntîln"), "întâln"), (re.compile(r"\bÎntîln"), "Întâln"),
    (re.compile(r"\bîntîmpl"), "întâmpl"), (re.compile(r"\bÎntîmpl"), "Întâmpl"),
    (re.compile(r"\bdesăvîr"), "desăvâr"), (re.compile(r"\bDesăvîr"), "Desăvâr"),
    (re.compile(r"\bmîndr"), "mândr"), (re.compile(r"\bMîndr"), "Mândr"),
    (re.compile(r"\brîvn"), "râvn"), (re.compile(r"\bRîvn"), "Râvn"),
    (re.compile(r"\brînd"), "rând"), (re.compile(r"\bRînd"), "Rând"),
    (re.compile(r"\bfîntîn"), "fântân"), (re.compile(r"\bFîntîn"), "Fântân"),
    (re.compile(r"\bpîntec"), "pântec"), (re.compile(r"\bPîntec"), "Pântec"),
    (re.compile(r"\bstăpîn"), "stăpân"), (re.compile(r"\bStăpîn"), "Stăpân"),
    (re.compile(r"\bomorît"), "omorât"), (re.compile(r"\bamărît"), "amărât"),
    (re.compile(r"\bsfărîmat"), "sfărâmat"), (re.compile(r"\bsfărîmate"), "sfărâmate"),
    (re.compile(r"\bpunînd"), "punând"), (re.compile(r"\barătînd"), "arătând"),
    (re.compile(r"\badăugînd"), "adăugând"), (re.compile(r"\boricît"), "oricât"),
]

# Numai typo-uri cu o singură corecție rezonabilă. Se aplică la limite de cuvânt,
# astfel încât nu pot altera identificatori precum `transliteration`.
TOKENS: dict[str, str] = {
    "rennoiește": "reînnoiește", "împlânită": "împlinită", "ințelepți": "înțelepți",
    "prtișniți": "părtiniți", "Îsuși": "însuși", "imăgine": "imagine",
    "întrebăre": "întrebare", "sfăntă": "sfântă", "sfărâame": "sfărâme",
    "Îiși": "își", "Îlși": "își", "îiși": "își", "îșiși": "își",
    "înmpotriva": "împotriva", "îontinuă": "continuă", "ngăduie": "îngăduie",
    "îngaduie": "îngăduie", "asculatarea": "ascultarea", "Asculatarea": "Ascultarea",
    "asculatare": "ascultare", "asculatării": "ascultării", "angașează": "angajează",
    "angaęează": "angajează", "angaęezi": "angajezi", "angaęăm": "angajăm",
    "înțeleagem": "înțelegem", "înețelegem": "înțelegem", "deslșit": "deslușit",
    "recunoștoare": "recunoscătoare", "speculatia": "speculația", "Ȝara": "Țara",
    "întțelege": "înțelege", "Îrmează": "urmează", "Împarați": "Împărați",
    "Împarățiilor": "împărățiilor", "Vedeea": "Vederea", "împlinesti": "împlinești",
    "seminatii": "seminții", "seminatie": "seminție", "inainte": "înainte",
    "incheind": "încheind", "carui": "cărui", "brate": "brațe", "vesnice": "veșnice",
    "teofanica": "teofanică", "sfinti": "sfinți", "insasi": "însăși",
    "mostenirea": "moștenirea", "conducator": "conducător", "ambitie": "ambiție",
    "vazut": "văzut", "arzatoare": "arzătoare", "Cuvantul": "Cuvântul",
    "straluceste": "strălucește", "esentiala": "esențială", "mainile": "mâinile",
    "vrajmasilor": "vrăjmașilor", "tatal": "tatăl", "caci": "căci",
    "cuvantul": "cuvântul", "afectiunile": "afecțiunile", "cand": "când",
    "pastrarea": "păstrarea", "inaintea": "înaintea", "adevarului": "adevărului",
    "belsugul": "belșugul", "tandrete": "tandrețe", "protectie": "protecție",
    "bratul": "brațul", "aceeasi": "aceeași", "implineste": "împlinește",
    "bunavointa": "bunăvoința", "bogatie": "bogăție", "zavoarele": "zăvoarele",
    "bunavointei": "bunăvoinței", "acelasi": "același", "adapteaza": "adaptează",
    "afirmatia": "afirmația", "exclamatie": "exclamație", "mantuit": "mântuit",
    "intemeiata": "întemeiată", "obosseste": "obosește", "oricarei": "oricărei",
    "increzatori": "încrezători", "treaca": "treacă", "facand": "făcând",
    "Necunoasterea": "Necunoașterea", "providentiala": "providențială",
    "pastrand": "păstrând", "conducatorul": "conducătorul", "facute": "făcute",
    "vazuta": "văzută", "ramane": "rămâne", "rămane": "rămâne",
    "imblanzita": "îmblânzită", "ramasa": "rămasă", "daca": "dacă",
    "inalt": "înalt", "implinire": "împlinire", "astazi": "astăzi",
    "aratand": "arătând", "indreptand": "îndreptând", "adevarata": "adevărată",
    "recunostinta": "recunoștința", "intelepciunii": "înțelepciunii",
    "lasata": "lăsată", "tarziu": "târziu", "asteptarea": "așteptarea",
    "asteptare": "așteptare", "lasand": "lăsând", "implinita": "împlinită",
    "Mostenirea": "Moștenirea", "pregatiti": "pregătiți", "nostri": "noștri",
    "sustinem": "susținem", "pregatesti": "pregătești", "inceputa": "începută",
    "altii": "alții", "asculci": "asculți", "sfănt": "sfânt", "rămîne": "rămâne",
    "disproportia": "disproporția", "îamintește": "amintește", "citeăză": "citează",
    "Întîlnească": "Întâlnească", "pundeînd": "punând", "Împlineăscă": "împlinească",
    "desăvîrșire": "desăvârșire", "împărțęea": "împărțea", "Înttinde": "întinde",
    "îttregului": "întregului", "Întîrziat": "întârziat", "obțnută": "obținută",
    "pêine": "pâine", "adnc": "adânc", "pîinea": "pâinea", "pîrêe": "pâraie",
    "smocřni": "smochini", "sărmanță": "sămânță", "mênca": "mânca",
    "mênii": "mâinii", "mndriei": "mândriei", "primeînd": "primind",
    "mînance": "mănânce", "Împlînescă": "împlinească", "Încăpățînat": "Încăpățânat",
    "Îltîi": "întâi", "pîrêul": "pârâul", "slujăească": "slujească",
    "îiți": "îți", "mănc": "mănânc", "mănci": "mănânci", "îplini": "împlini",
    "măncați": "mâncați", "stărvurile": "stârvurile", "îveți": "înveți",
    "deți": "deții", "îplinirea": "împlinirea", "vegheatți": "vegheați",
    "îplinească": "împlinească", "îplinind": "împlinind", "înălte": "înalte",
    "îpliniți": "împliniți", "slujeăscă": "slujească", "depașrtată": "depărtată",
    "Ȝeboimului": "Țeboimului", "îplinim": "împlinim", "înăltă": "înaltă",
    "Preainălt": "Preaînalt", "îplinit": "împlinit", "Ȝoar": "Țoar",
    "temăeați": "temeați", "îtipărești": "întipărești", "fericitți": "fericiți",
    "migaloasă": "migăloasă", "tăberei": "taberei", "Însți": "însuți",
    "însotea": "însoțea", "împarțiți": "împărțiți", "sugeratând": "sugerând",
    "înșuși": "însuși", "împlineă": "împlinea", "zămislescă": "zămislească",
    "împartșești": "împărtășești", "întâmpăni": "întâmpina", "generatia": "generația",
    "sfașie": "sfâșie", "tencionată": "intenționată", "pretenți": "pretenții",
    "mulțumescu": "mulțumesc", "Mulțumescu": "Mulțumesc", "mbrăca": "îmbrăca",
    "pretințiile": "pretențiile", "înghiță": "înghiță", "vegea": "veghea",
    "desavârșire": "desăvârșire", "curatăției": "curăției", "cecearta": "cearta",
    "cerand": "cerând", "râmane": "rămâne", "înșfrângerii": "înfrângerii",
    "Ocolînd": "Ocolind", "Îngaduința": "Îngăduința", "slujînt": "slujind",
    "blâstema": "blestema", "răvna": "râvna", "cănd": "când",
    "simiioniților": "simeoniților", "aceți": "acești", "dubleaă": "dublează",
    "sfântulțite": "sfințite", "tourilor": "taurilor", "precizand": "precizând",
    "randuiala": "rânduiala", "porțiăm": "porționăm", "obșnuite": "obișnuite",
    "stăbilit": "stabilit", "formand": "formând", "strănsă": "strânsă",
    "slăjitori": "slujitori", "desparțire": "despărțire", "aleți": "aleși",
    "împreljurare": "împrejurare", "împreljurarea": "împrejurarea", "intentție": "intenție",
    "însotit": "însoțit", "înțreine": "întreține", "leviii": "leviții",
    "curatirea": "curățirea", "evreiesti": "evreiești", "numări": "numără",
    "ordinei": "ordinii", "îinapoi": "înapoi", "împaratul": "împăratul",
    "împaratului": "împăratului", "Îpărătesc": "împărătesc", "dezbrcat": "dezbrăcat",
    "poeiție": "poziție", "leoa": "leoaică", "înaltță": "înalță",
    "madianita": "madianită", "fruntasii": "fruntașii", "descantec": "descântec",
    "exceptand": "exceptând", "ispărăvit": "isprăvit", "Așteptți": "Așteptați",
    "vostrăi": "voștri", "omenesti": "omenești", "neleguire": "nelegiuire",
    "nazirelul": "nazireul",
}

# Fraze cu corecție gramaticală evidentă, fără schimbarea ideii.
PHRASES: dict[str, str] = {
    "o inimă care îndoia": "o inimă care se îndoia",
    "Moise amintescă": "Moise amintește",
    "poporul care Îli aparține": "poporul care Îi aparține",
    "Moise Îiși amintește": "Moise își amintește",
}

TOKEN_PATTERNS = [(re.compile(rf"(?<![\wĂÂÎȘȚăâîșț]){re.escape(bad)}(?![\wĂÂÎȘȚăâîșț])"), good) for bad, good in TOKENS.items()]


def clean_prose(value: str) -> str:
    value = value.translate(str.maketrans({"ş": "ș", "Ş": "Ș", "ţ": "ț", "Ţ": "Ț"}))
    for pattern, replacement in PATTERNS:
        value = pattern.sub(replacement, value)
    for pattern, replacement in TOKEN_PATTERNS:
        value = pattern.sub(replacement, value)
    for bad, good in PHRASES.items():
        value = value.replace(bad, good)
    return value


def should_process_string(raw: str) -> bool:
    inner = raw[1:-1]
    if len(inner) < 20:
        return False
    if inner.startswith("./") or inner.startswith("../"):
        return False
    # Nu atingem stringuri care sunt doar identificatori, referințe, URL-uri sau transliterări scurte.
    if re.fullmatch(r"[A-Za-z0-9_.:/;,' -]+", inner) and not re.search(r"[ĂÂÎȘȚăâîșț]", inner):
        return False
    return True


def clean_file(text: str) -> str:
    def repl(match: re.Match[str]) -> str:
        raw = match.group(0)
        if not should_process_string(raw):
            return raw
        inner = raw[1:-1]
        return '"' + clean_prose(inner) + '"'
    return STRING_RE.sub(repl, text)


def suspicious(text: str) -> set[str]:
    probes = {
        "prtișniți", "împlânită", "asculatarea", "angaęează", "Îsuși", "Îlși",
        "Îltîi", "îontinuă", "sfărâame", "smocřni", "primeînd", "vegheatți",
        "sugeratând", "cecearta", "înșfrângerii", "dubleaă", "slăjitori",
        "poeiție", "transliterațion",
    }
    found = {token for token in probes if token in text}
    found.update(re.findall(r"[Ȝêřę]", text))
    return found


def main() -> None:
    parser = argparse.ArgumentParser()
    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument("--check", action="store_true")
    mode.add_argument("--write", action="store_true")
    args = parser.parse_args()

    changed: list[Path] = []
    bad: list[tuple[Path, set[str]]] = []
    all_targets = targets()

    for path in all_targets:
        before = path.read_text(encoding="utf-8")
        after = clean_file(before)
        if after != before:
            changed.append(path)
            if args.write:
                path.write_text(after, encoding="utf-8")
        remains = suspicious(after)
        if remains:
            bad.append((path, remains))

    if bad:
        for path, tokens in bad:
            print(f"{path.relative_to(ROOT)}: artefacte rămase: {', '.join(sorted(tokens))}")
        raise SystemExit(1)

    if args.check and changed:
        print(f"{len(changed)} fișiere cu explicații necesită corectură sigură.")
        raise SystemExit(1)

    print(f"Corectură sigură VT: {len(all_targets)} fișiere verificate; {len(changed)} modificate.")


if __name__ == "__main__":
    main()
