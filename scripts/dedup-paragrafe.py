#!/usr/bin/env python3
"""Curata paragrafele repetate din explicatiile Bibliei.

Scripturile care adauga paragrafe la sfarsitul unui camp teaching nu erau
idempotente: fiindca sirul nou il cuprinde pe cel vechi, o a doua rulare il
gasea iarasi pe cel vechi si adauga inca o data. Asa s-au strans paragrafe
repetate de mai multe ori.

Scriptul de fata strange la loc orice grup de paragrafe care se repeta unul
dupa altul, oricat de lung ar fi grupul.

Rulare:
    python3 scripts/dedup-paragrafe.py
    python3 scripts/dedup-paragrafe.py --check
"""

import sys
from pathlib import Path

RADACINA = Path("packages/shared/src/bible")

# In fisierele TypeScript, despartitorul de paragraf este scris ca doua
# perechi de caractere: backslash urmat de n, de doua ori.
SEPARATOR = "\\n\\n"


def colapseaza(bucati):
    schimbat = True
    while schimbat:
        schimbat = False
        n = len(bucati)
        for k in range(1, n // 2 + 1):
            gasit = False
            for i in range(0, n - 2 * k + 1):
                if bucati[i : i + k] == bucati[i + k : i + 2 * k]:
                    del bucati[i + k : i + 2 * k]
                    gasit = True
                    schimbat = True
                    break
            if gasit:
                break
    return bucati


def main() -> int:
    doar_verifica = "--check" in sys.argv
    murdare = 0

    for cale in sorted(RADACINA.glob("*.ts")):
        text = cale.read_text(encoding="utf-8")
        bucati = text.split(SEPARATOR)
        if len(bucati) < 3:
            continue

        curatat = SEPARATOR.join(colapseaza(list(bucati)))
        if curatat == text:
            continue

        sterse = len(bucati) - len(curatat.split(SEPARATOR))
        murdare += 1

        if doar_verifica:
            print(
                f"::warning title=Paragrafe repetate::{cale.name}: {sterse} paragrafe repetate"
            )
            continue

        cale.write_text(curatat, encoding="utf-8")
        print(f"curatat - {cale.name}: {sterse} paragrafe repetate sterse")

    if not murdare:
        print("Nicio repetare.")

    if doar_verifica and murdare:
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
