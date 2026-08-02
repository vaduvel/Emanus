#!/usr/bin/env python3
"""Curata repetitiile din explicatii.

Doua feluri de repetitii s-au strecurat in fisierele de capitole:
1. bucati despartite prin randuri goale, repetate una dupa alta;
2. grupuri de fraze insirate in acelasi camp, repetate cuvant cu cuvant.

Scriptul le strange pe amandoua si scrie cate o instiintare pentru fiecare
fisier atins.
"""

import re
import sys
from pathlib import Path

RADACINA = Path("packages/shared/src/bible")

# Un grup de cel putin saizeci de semne, fara ghilimele si fara scapari de rand,
# incheiat cu punct si spatiu, care se repeta imediat dupa el insusi.
TIPAR_FRAZE = re.compile(r"((?:[^\"\n]{60,3000}?\. ))\1+")

# Acelasi lucru pentru bucatile despartite prin randuri goale scrise ca \n\n.
TIPAR_PARAGRAFE = re.compile(r"(\\n\\n(?:[^\"\n]{40,3000}?))(?=\\n\\n|\")")


def colapseaza_fraze(text: str) -> str:
    while True:
        nou = TIPAR_FRAZE.sub(r"\1", text)
        if nou == text:
            return text
        text = nou


def colapseaza_paragrafe(text: str) -> str:
    """Scoate bucatile care se repeta in acelasi sir de text."""
    rezultat = []
    pozitie = 0
    for potrivire in re.finditer(r'"(?:[^"\\]|\\.)*"', text):
        sir = potrivire.group(0)
        if "\\n\\n" not in sir:
            continue
        bucati = sir.split("\\n\\n")
        vazute = []
        for bucata in bucati:
            if bucata in vazute and len(bucata) > 40:
                continue
            vazute.append(bucata)
        curat = "\\n\\n".join(vazute)
        if curat != sir:
            rezultat.append(text[pozitie : potrivire.start()])
            rezultat.append(curat)
            pozitie = potrivire.end()
    rezultat.append(text[pozitie:])
    return "".join(rezultat)


def main() -> int:
    doar_verifica = "--check" in sys.argv
    gasite = 0

    for cale in sorted(RADACINA.glob("*.ts")):
        text = cale.read_text(encoding="utf-8")
        curat = colapseaza_paragrafe(colapseaza_fraze(text))
        if curat == text:
            continue

        gasite += 1
        print(f"::warning title=Repetitii::{cale.name}")
        if not doar_verifica:
            cale.write_text(curat, encoding="utf-8")
            print(f"curatat - {cale.name}")

    if doar_verifica and gasite:
        return 1
    if not gasite:
        print("Nicio repetitie.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
