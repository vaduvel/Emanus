#!/usr/bin/env python3
"""Curata frazele repetate lipite una de alta in acelasi camp.

Scriptul de paragrafe lucreaza cu bucati despartite prin randuri goale.
Aici se strang repetarile care stau in aceeasi propozitie insirata, adica
un grup de fraze care se repeta cuvant cu cuvant imediat dupa el insusi.
"""

import re
import sys
from pathlib import Path

RADACINA = Path("packages/shared/src/bible")

# Un grup de cel putin saizeci de semne, fara ghilimele si fara scapari,
# incheiat cu punct si spatiu, care se repeta imediat dupa el insusi.
TIPAR = re.compile(r"((?:[^\"\\\n]{60,700}?\. ))\1+")


def colapseaza(text: str) -> str:
    while True:
        nou = TIPAR.sub(r"\1", text)
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
        print(f"::warning title=Fraze repetate::{cale.name}")
        if not doar_verifica:
            cale.write_text(curat, encoding="utf-8")
            print(f"curatat - {cale.name}")

    if doar_verifica and gasite:
        return 1
    if not gasite:
        print("Nicio fraza repetata.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
