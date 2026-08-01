#!/usr/bin/env python3
"""
Scoate din textul biblic urmele lasate de site-ul de unde a fost razuit
textul Cornilescu 1924. Coada de pagina a sursei a intrat in campul text
al unor unitati si nu are ce cauta in Sfanta Scriptura.

Ruleaza fara argumente ca sa curete. Ruleaza cu --check ca sa verifice.
"""

import sys
from pathlib import Path

RADACINA = Path("packages/shared/src/bible")

URME = [
    " Wordproject® is a registered name of the International Biblical Association, a non-profit organization registered in Macau, China. Contact | Disclaimer | Statement of Faith | Mission |",
    "Wordproject® is a registered name of the International Biblical Association, a non-profit organization registered in Macau, China. Contact | Disclaimer | Statement of Faith | Mission |",
    " Contact | Disclaimer | Statement of Faith | Mission |",
]


def main() -> int:
    doar_verific = "--check" in sys.argv
    gasite = 0

    for cale in sorted(RADACINA.glob("*.ts")):
        text = cale.read_text(encoding="utf-8")
        curatat = text

        for urma in URME:
            while urma in curatat:
                curatat = curatat.replace(urma, "", 1)
                gasite += 1

        if curatat != text:
            print(f"  {cale.name}: urma sursei scoasa din textul biblic")
            if not doar_verific:
                cale.write_text(curatat, encoding="utf-8")

    if gasite and doar_verific:
        print(f"::warning title=Urme ale sursei ramase in text::{gasite}")
        return 1

    print(f"Urme scoase: {gasite}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
