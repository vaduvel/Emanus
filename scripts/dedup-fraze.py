#!/usr/bin/env python3
"""Curata repetitiile din explicatii.

Repetitiile s-au strecurat in doua feluri: fraze insirate una dupa alta in
acelasi camp, si paragrafe intregi despartite prin randuri goale scrise ca
\\n\\n. Amandoua se arata la fel: o bucata de text incheiata cu punct, urmata
indata de ea insasi. Scriptul le strange pe amandoua.
"""

import re
import sys
from pathlib import Path

RADACINA = Path("packages/shared/src/bible")

# O bucata de cel putin saizeci de semne, fara ghilimele, incheiata cu punct,
# urmata de ea insasi. Intre cele doua copii pot sta spatii sau randuri goale
# scrise ca \n\n.
TIPAR_REPETARE = re.compile(r"((?:[^\"\n]{60,3000}?)\.)(?:\s|\\n)*\1")


def colapseaza(text: str) -> str:
    while True:
        nou = TIPAR_REPETARE.sub(r"\1", text)
        if nou == text:
            return text
        text = nou


def main() -> int:
    doar_verifica = "--check" in sys.argv
    gasite = 0

    for cale in sorted(RADACINA.glob("*.ts")):
        text = cale.read_text(encoding="utf-8")
        curat = colapseaza(text)
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
