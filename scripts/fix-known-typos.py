#!/usr/bin/env python3
"""Corectează sau verifică typo-uri cunoscute prin reguli explicite."""
import sys
from pathlib import Path

ROOTS = [Path("packages/shared/src"), Path("apps/web/src")]
REPLACEMENTS = {
    "]i-am călcat": "ți-am călcat", "A dăt ploaia": "A dat ploaia", "a arunca-o": "a aruncat-o",
    "primesc uor": "primesc ușor", "moWtenire": "moștenire", "vorbește-I Și": "vorbește-I și",
    "aseapta": "așteaptă", "mariae": "mărire", "puin": "puțin",
    "ieseire": "ieșire", "stradiuasca": "străduiască", "increed": "încred", "foloseesti": "folosești",
    "ieseit": "ieșit", "isprvi": "isprăvi", "Îî spuneau": "Îi spuneau", "caUtat": "căutat",
    "caUtam": "căutăm", "soluti a": "soluția", "ajunge satul": "ajunge sătul", "ispravî": "isprăvi",
    "recitî": "recitit", "robîe": "robie", "naȘtere": "naștere", "strainăduiete": "străduiește",
    "arma greenieta": "arma greșită", "opriunal": "opțional", "aspepti": "aștepți", "aspepte": "aștepte",
    "liniStit": "liniștit", "actițunea": "acțiunea", "izgonS": "izgonit", "increedere": "încredere",
    "muncA": "muncă", "ireproSabil": "ireproșabil", "ireproSabilă": "ireproșabilă", "a rams": "a rămas",
    "randăit": "rânduit", "excluS": "exclus", "trAise": "trăise", "poziti a": "poziția",
    "parasșim": "părăsim", "clAdire": "clădire", "pAinea": "pâinea", "ințeleaga bila": "înțeleagă Biblia",
    "increedeutul": "încrezutul", "desdesăvârșiți": "desăvârșiți", "intenionat": "intenționat",
    "Stați lipită de viță": "Stai lipit de viță", "nu stai pe ce simți tu": "nu te bazezi pe ce simți tu",
    "se sfortează": "se străduiește",
    # --- Biblia explicata: Geneza 1-50 ---
    # cuvinte lipite sau rupte
    "buni cioara": "bunicioara",
    "in raut atea": "in rautatea",
    "sa daramape nimeni": "sa darame pe nimeni",
    "sa punastapanire": "sa puna stapanire",
    "isprav it": "ispravit",
    "tradu cerea": "traducerea",
    "trudi ti": "truditi",
    "stranegeau": "strangeau",
    "oprelisce": "opreliste",
    "unii tradue": "unii traduc",
    "nu se pot despatri": "nu se pot desparti",
    "nopta aceleia": "noptii aceleia",
    "un capetenie": "o capetenie",
    # formulare gresita, Geneza 46:28
    "ca sa nu se ratoiasca nimeni si sa nu se ratoiasca lucrurile":
        "ca sa nu se rataceasca nimeni si sa nu se incurce lucrurile",
    # trimitere scrisa de doua ori, o data in engleza, Geneza 30:37-43
    "        \"Romans 12:19\",\n": "",
    # paragrafe rupte gresit
    "\\Zice:": "\\n\\nZice:",
    "\\Cel de al doilea:": "\\n\\nCel de al doilea:",
    "\\n\\n Doua cuvinte": "\\n\\nDoua cuvinte",
    # litera chirilica strecurata in loc de cea latina
    "mint\u0435": "minte",
    # ATENTIE: nu se mai pun aici corecturi care scot diacritice.
    # Textul biblic din packages/shared/src/bible este acum adus din editia
    # Cornilescu 1924 cu diacriticele lui, iar o astfel de corectura l-ar strica.
}

check = "--check" in sys.argv[1:]
changed: list[str] = []
errors: list[str] = []
for root in ROOTS:
    for path in root.rglob("*.ts*"):
        text = path.read_text(encoding="utf-8")
        new = text
        for old, replacement in REPLACEMENTS.items():
            if old in new:
                line = new.count("\n", 0, new.find(old)) + 1
                errors.append(f"{path}:{line}: {old!r} → {replacement!r}")
                new = new.replace(old, replacement)
        if new != text and not check:
            path.write_text(new, encoding="utf-8")
            changed.append(str(path))

if check:
    if errors:
        for error in errors:
            safe = error.replace("%", "%25").replace("\r", "%0D").replace("\n", "%0A")
            print(f"::error title=Typo cunoscut::{safe}")
        print(f"Au rămas {len(errors)} typo-uri cunoscute.")
        sys.exit(1)
    print("Nu au rămas typo-uri cunoscute.")
else:
    print(f"Corectate {len(changed)} fișiere:")
    for path in changed:
        print(f"- {path}")
