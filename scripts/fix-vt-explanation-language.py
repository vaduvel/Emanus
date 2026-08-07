#!/usr/bin/env python3
"""Corectură strict lingvistică pentru explicațiile legacy Numeri/Deuteronom.

Scope deliberat îngust:
- numai `numeriN.ts` și `deuteronomN.ts` (NU `*Text*.ts`);
- diacritice/ortografie/typo-uri evidente;
- nu schimbă versificația, sursele, unitățile, doctrina sau aplicațiile.

Utilizare:
  python3 scripts/fix-vt-explanation-language.py --check
  python3 scripts/fix-vt-explanation-language.py --write
"""

from __future__ import annotations

import argparse
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BIBLE = ROOT / "packages" / "shared" / "src" / "bible"


def targets() -> list[Path]:
    paths = list(BIBLE.glob("deuteronom[0-9]*.ts")) + list(BIBLE.glob("numeri[0-9]*.ts"))
    return sorted(path for path in paths if "Text" not in path.name)


# Forme vechi / corupte pentru care schimbarea este pur ortografică.
PATTERN_REPLACEMENTS: list[tuple[re.Pattern[str], str]] = [
    (re.compile(r"\bpămînt"), "pământ"),
    (re.compile(r"\bPămînt"), "Pământ"),
    (re.compile(r"\blegămînt"), "legământ"),
    (re.compile(r"\bLegămînt"), "Legământ"),
    (re.compile(r"\bcuvînt"), "cuvânt"),
    (re.compile(r"\bCuvînt"), "Cuvânt"),
    (re.compile(r"\bbinecuvînt"), "binecuvânt"),
    (re.compile(r"\bBinecuvînt"), "Binecuvânt"),
    (re.compile(r"\bpîn"), "pân"),
    (re.compile(r"\bPîn"), "Pân"),
    (re.compile(r"\bcînd\b"), "când"),
    (re.compile(r"\bCînd\b"), "Când"),
    (re.compile(r"\bmîn"), "mân"),
    (re.compile(r"\bMîn"), "Mân"),
    (re.compile(r"\bsîng"), "sâng"),
    (re.compile(r"\bSîng"), "Sâng"),
    (re.compile(r"\bsfînt"), "sfânt"),
    (re.compile(r"\bSfînt"), "Sfânt"),
    (re.compile(r"\bsfîr"), "sfâr"),
    (re.compile(r"\bSfîr"), "Sfâr"),
    (re.compile(r"\bstîlp"), "stâlp"),
    (re.compile(r"\bStîlp"), "Stâlp"),
    (re.compile(r"\bstînc"), "stânc"),
    (re.compile(r"\bStînc"), "Stânc"),
    (re.compile(r"\btîrzi"), "târzi"),
    (re.compile(r"\bTîrzi"), "Târzi"),
    (re.compile(r"\bîntîln"), "întâln"),
    (re.compile(r"\bÎntîln"), "Întâln"),
    (re.compile(r"\bîntîmpl"), "întâmpl"),
    (re.compile(r"\bÎntîmpl"), "Întâmpl"),
    (re.compile(r"\bdesăvîr"), "desăvâr"),
    (re.compile(r"\bDesăvîr"), "Desăvâr"),
    (re.compile(r"\bmîndr"), "mândr"),
    (re.compile(r"\bMîndr"), "Mândr"),
    (re.compile(r"\brîvn"), "râvn"),
    (re.compile(r"\bRîvn"), "Râvn"),
    (re.compile(r"\brînd"), "rând"),
    (re.compile(r"\bRînd"), "Rând"),
    (re.compile(r"\bfîntîn"), "fântân"),
    (re.compile(r"\bFîntîn"), "Fântân"),
    (re.compile(r"\bpîntec"), "pântec"),
    (re.compile(r"\bPîntec"), "Pântec"),
    (re.compile(r"\bstăpîn"), "stăpân"),
    (re.compile(r"\bStăpîn"), "Stăpân"),
    (re.compile(r"\bmîni([aei])"), r"mâni\1"),
    (re.compile(r"\bMîni([aei])"), r"Mâni\1"),
]

# Înlocuiri lexicale evidente din auditul cu dicționarul românesc.
# Sunt intenționat exacte; orice caz ambiguu rămâne pentru revizie umană.
EXACT: dict[str, str] = {
    "adanceste": "adâncește",
    "avertizeaza": "avertizează",
    "incheie": "încheie",
    "calca": "calcă",
    "rennoiește": "reînnoiește",
    "împlânită": "împlinită",
    "ințelepți": "înțelepți",
    "prtișniți": "părtiniți",
    "Îsuși": "însuși",
    "imăgine": "imagine",
    "întrebăre": "întrebare",
    "preoțease": "preoțească",
    "sfăntă": "sfântă",
    "sfărâame": "sfărâme",
    "Îiși": "își",
    "Îlși": "își",
    "îiși": "își",
    "îșiși": "își",
    "veata": "viața",
    "aleas": "ales",
    "sfărîmat": "sfărâmat",
    "sfărîmate": "sfărâmate",
    "punînd": "punând",
    "arătînd": "arătând",
    "adăugînd": "adăugând",
    "intervenîm": "intervenim",
    "înmpotriva": "împotriva",
    "ngăduie": "îngăduie",
    "îngaduie": "îngăduie",
    "îontinuă": "continuă",
    "necroforagele": "necrofagele",
    "vânde": "vinde",
    "mănce": "mănânce",
    "mânce": "mănânce",
    "mînci": "mănânci",
    "mânci": "mănânci",
    "camata": "camăta",
    "Camata": "Camăta",
    "z călogului": "zălogului",
    "zcălogului": "zălogului",
    "împarțită": "împărțită",
    "elibetări": "eliberări",
    "legți": "legi",
    "abătere": "abatere",
    "asculatarea": "ascultarea",
    "Asculatarea": "Ascultarea",
    "asculatare": "ascultare",
    "asculatării": "ascultării",
    "angașează": "angajează",
    "angaęează": "angajează",
    "angaęezi": "angajezi",
    "angaęăm": "angajăm",
    "înțeleagem": "înțelegem",
    "înețelegem": "înțelegem",
    "deslșit": "deslușit",
    "recunoștoare": "recunoscătoare",
    "atat": "atât",
    "speculatia": "speculația",
    "Ȝara": "Țara",
    "întțelege": "înțelege",
    "Îrmează": "urmează",
    "Împarați": "Împărați",
    "Împarățiilor": "împărățiilor",
    "Îrful": "vârful",
    "Vedeea": "Vederea",
    "împlinesti": "împlinești",
    "seminatii": "seminții",
    "seminatie": "seminție",
    "inainte": "înainte",
    "incheind": "încheind",
    "carui": "cărui",
    "brate": "brațe",
    "vesnice": "veșnice",
    "teofanica": "teofanică",
    "sfinti": "sfinți",
    "insasi": "însăși",
    "mostenirea": "moștenirea",
    "conducator": "conducător",
    "ambitie": "ambiție",
    "leaga": "leagă",
    "vazut": "văzut",
    "arzatoare": "arzătoare",
    "Cuvantul": "Cuvântul",
    "straluceste": "strălucește",
    "esentiala": "esențială",
    "mainile": "mâinile",
    "vrajmasilor": "vrăjmașilor",
    "tatal": "tatăl",
    "caci": "căci",
    "pazesc": "păzesc",
    "cuvantul": "cuvântul",
    "afectiunile": "afecțiunile",
    "cand": "când",
    "pastrarea": "păstrarea",
    "inaintea": "înaintea",
    "adevarului": "adevărului",
    "belsugul": "belșugul",
    "tandrete": "tandrețe",
    "frunatile": "frunțile",
    "protectie": "protecție",
    "bratul": "brațul",
    "aceeasi": "aceeași",
    "implineste": "împlinește",
    "bunavointa": "bunăvoința",
    "bogatie": "bogăție",
    "zavoarele": "zăvoarele",
    "bunavointei": "bunăvoinței",
    "acelasi": "același",
    "adapteaza": "adaptează",
    "afirmatia": "afirmația",
    "exclamatie": "exclamație",
    "mantuit": "mântuit",
    "intemeiata": "întemeiată",
    "obosseste": "obosește",
    "oricarei": "oricărei",
    "increzatori": "încrezători",
    "treaca": "treacă",
    "facand": "făcând",
    "Necunoasterea": "Necunoașterea",
    "traditional": "tradițional",
    "providentiala": "providențială",
    "pastrand": "păstrând",
    "conducatorul": "conducătorul",
    "facute": "făcute",
    "vazuta": "văzută",
    "ramane": "rămâne",
    "rămane": "rămâne",
    "imblanzita": "îmblânzită",
    "ramasa": "rămasă",
    "daca": "dacă",
    "inalt": "înalt",
    "implinire": "împlinire",
    "astazi": "astăzi",
    "aratand": "arătând",
    "indreptand": "îndreptând",
    "adevarata": "adevărată",
    "recunostinta": "recunoștința",
    "intelepciunii": "înțelepciunii",
    "lasata": "lăsată",
    "tarziu": "târziu",
    "asteptarea": "așteptarea",
    "asteptare": "așteptare",
    "lasand": "lăsând",
    "implinita": "împlinită",
    "Mostenirea": "Moștenirea",
    "pregatiti": "pregătiți",
    "nostri": "noștri",
    "sustinem": "susținem",
    "pregatesti": "pregătești",
    "inceputa": "începută",
    "altii": "alții",
    "asculci": "asculți",
    "sfănt": "sfânt",
    "rămîne": "rămâne",
    "oricît": "oricât",
    "măreță": "măreață",
    "disproportia": "disproporția",
    "îamintește": "amintește",
    "citeăză": "citează",
    "Întîlnească": "Întâlnească",
    "Împregnată": "impregnată",
    "pundeînd": "punând",
    "Împlineăscă": "împlinească",
    "desăvîrșire": "desăvârșire",
    "împărțęea": "împărțea",
    "erati": "erați",
    "Înttinde": "întinde",
    "îttregului": "întregului",
    "Întîrziat": "întârziat",
    "obțnută": "obținută",
    "urgisești": "urgisești",
    "pêine": "pâine",
    "adnc": "adânc",
    "pîinea": "pâinea",
    "pîrêe": "pâraie",
    "grînî": "grâne",
    "smocřni": "smochini",
    "sărmanță": "sămânță",
    "mênca": "mânca",
    "tăre": "tare",
    "puteța": "puterea",
    "mênii": "mâinii",
    "mndriei": "mândriei",
    "primeînd": "primind",
    "mînance": "mănânce",
    "Împlînescă": "împlinească",
    "Încăpățînat": "Încăpățânat",
    "Îltîi": "întâi",
    "pîrêul": "pârâul",
    "relână": "fărâmă",
    "slujăească": "slujească",
    "îiți": "îți",
    "mănc": "mănânc",
    "mănci": "mănânci",
    "îplini": "împlini",
    "măncați": "mâncați",
    "stărvurile": "stârvurile",
    "îveți": "înveți",
    "deți": "deții",
    "îplinirea": "împlinirea",
    "îplinesti": "împlinești",
    "vegheatți": "vegheați",
    "îplinească": "împlinească",
    "îplinind": "împlinind",
    "înălte": "înalte",
    "puserăți": "puserăți",
    "temandu": "temându",
    "îpliniți": "împliniți",
    "slujeăscă": "slujească",
    "depașrtată": "depărtată",
    "Ȝeboimului": "Țeboimului",
    "îplinim": "împlinim",
    "înăltă": "înaltă",
    "Preainălt": "Preaînalt",
    "îplinit": "împlinit",
    "Ȝoar": "Țoar",
    "temăeați": "temeați",
    "îtipărești": "întipărești",
    "fericitți": "fericiți",
    "migaloasă": "migăloasă",
    "tăberei": "taberei",
    "Însți": "însuți",
    "însotea": "însoțea",
    "împarțiți": "împărțiți",
    "sugeratând": "sugerând",
    "înșuși": "însuși",
    "împlineă": "împlinea",
    "descurajă": "descurajă",
    "zămislescă": "zămislească",
    "împartșești": "împărtășești",
    "întâmpăni": "întâmpina",
    "generatia": "generația",
    "sfașie": "sfâșie",
    "disprtu": "disprețul",
    "tecăpațina": "încăpățânarea",
    "tencionată": "intenționată",
    "pretenți": "pretenții",
    "mulțumescu": "mulțumesc",
    "Mulțumescu": "Mulțumesc",
    "mbrăca": "îmbrăca",
    "pretințiile": "pretențiile",
    "înghiță": "înghiță",
    "omorît": "omorât",
    "vegea": "veghea",
    "ambălăieșe": "îmbătrânește",
    "desavârșire": "desăvârșire",
    "curatăției": "curăției",
    "amărît": "amărât",
    "cecearta": "cearta",
    "cerand": "cerând",
    "râmane": "rămâne",
    "înșfrângerii": "înfrângerii",
    "Ocolînd": "Ocolind",
    "Îngaduința": "Îngăduința",
    "slujînt": "slujind",
    "blâstema": "blestema",
    "răvna": "râvna",
    "apâta": "ațâța",
    "cănd": "când",
    "simiioniților": "simeoniților",
    "aceți": "acești",
    "dubleaă": "dublează",
    "sfântulțite": "sfințite",
    "tourilor": "taurilor",
    "precizand": "precizând",
    "randuiala": "rânduiala",
    "porțiăm": "porționăm",
    "obșnuite": "obișnuite",
    "stăbilit": "stabilit",
    "formand": "formând",
    "strănsă": "strânsă",
    "slăjitori": "slujitori",
    "desparțire": "despărțire",
    "aleți": "aleși",
    "împreljurare": "împrejurare",
    "împreljurarea": "împrejurarea",
    "intentție": "intenție",
    "neînvinovățită": "nevinovată",
    "însotit": "însoțit",
    "înțreine": "întreține",
    "leviii": "leviții",
    "curatirea": "curățirea",
    "evreiesti": "evreiești",
    "numări": "numără",
    "ordinei": "ordinii",
    "îinapoi": "înapoi",
    "împaratul": "împăratul",
    "împaratului": "împăratului",
    "Îpărătesc": "împărătesc",
    "dezbrcat": "dezbrăcat",
    "poeiție": "poziție",
    "împara": "împăra",
    "împar": "împăr",
    "leoa": "leoaică",
    "înaltță": "înalță",
    "madianita": "madianită",
    "fruntasii": "fruntașii",
    "descantec": "descântec",
    "exceptand": "exceptând",
    "ispărăvit": "isprăvit",
    "Așteptți": "Așteptați",
    "vostrăi": "voștri",
    "omenesti": "omenești",
    "împrunându": "împreunându",
    "neleguire": "nelegiuire",
    "nazirelul": "nazireul",
}

# Câteva fraze unde typo-ul nu poate fi reparat corect doar la nivel de token.
PHRASES: dict[str, str] = {
    "o inimă care îndoia": "o inimă care se îndoia",
    "Moise amintescă": "Moise amintește",
    "poporul care Îli aparține": "poporul care Îi aparține",
    "Moise Îiși amintește": "Moise își amintește",
    "puserăți-Mă": "lăsați-Mă",
}


def apply(text: str) -> str:
    # În explicațiile editoriale folosim diacriticele românești moderne cu virgulă.
    text = text.translate(str.maketrans({"ş": "ș", "Ş": "Ș", "ţ": "ț", "Ţ": "Ț"}))
    for pattern, replacement in PATTERN_REPLACEMENTS:
        text = pattern.sub(replacement, text)
    for bad, good in EXACT.items():
        text = text.replace(bad, good)
    for bad, good in PHRASES.items():
        text = text.replace(bad, good)
    return text


def suspicious(text: str) -> list[str]:
    checks = [
        r"[Ȝêřę]",
        r"\b(?:prtișniți|împlânită|asculatarea|angaęează|Îsuși|Îlși|Îltîi|îontinuă|sfărâame)\b",
        r"\\u[0-9A-Za-z]{1,8}",
    ]
    found: list[str] = []
    for pattern in checks:
        found.extend(re.findall(pattern, text))
    return found


def main() -> None:
    parser = argparse.ArgumentParser()
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--check", action="store_true")
    group.add_argument("--write", action="store_true")
    args = parser.parse_args()

    changed: list[Path] = []
    bad_after: list[tuple[Path, list[str]]] = []
    all_targets = targets()
    for path in all_targets:
        before = path.read_text(encoding="utf-8")
        after = apply(before)
        if after != before:
            changed.append(path)
            if args.write:
                path.write_text(after, encoding="utf-8")
        bad = suspicious(after)
        if bad:
            bad_after.append((path, sorted(set(bad))))

    if bad_after:
        for path, bad in bad_after:
            print(f"{path.relative_to(ROOT)}: artefacte rămase: {', '.join(bad)}")
        raise SystemExit(1)

    if args.check and changed:
        print(f"{len(changed)} explicații VT necesită corectură lingvistică.")
        for path in changed:
            print(path.relative_to(ROOT))
        raise SystemExit(1)

    print(f"Corectură VT explicații: {len(all_targets)} capitole verificate; {len(changed)} modificate.")


if __name__ == "__main__":
    main()
