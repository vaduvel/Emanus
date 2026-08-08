#!/usr/bin/env python3
"""Strange paragrafele care se repeta unul dupa altul in fisierele Bibliei.

Repetarile apar fiindca scripturile de adaugare nu sunt idempotente: ele
cauta ancora veche, o gasesc de fiecare data, si lipesc din nou acelasi
adaos la fiecare rulare a workflow-ului. Scriptul acesta este plasa de
siguranta pusa la urma de tot, inainte de commit.

Se cauta orice grup de paragrafe care se repeta imediat dupa sine, oricat
de lung ar fi grupul, si se sterge a doua copie. Cautarea se reia pana
cand o trecere intreaga nu mai gaseste nimic.
"""

from __future__ import annotations

import sys
from pathlib import Path

RADACINA = Path("packages/shared/src/bible")
SEPARATOR = "\\n\\n"


def colapseaza(bucati):
    """Sterge grupurile repetate. Intoarce (bucati, cate bucati s-au sters)."""
    sterse = 0
    while True:
        n = len(bucati)
        gasit = False
        for k in range(1, n // 2 + 1):
            for i in range(0, n - 2 * k + 1):
                intai = bucati[i : i + k]
                al_doilea = bucati[i + k : i + 2 * k]
                if intai != al_doilea:
                    continue
                if not any(b.strip() for b in intai):
                    continue
                del bucati[i + k : i + 2 * k]
                sterse += k
                gasit = True
                break
            if gasit:
                break
        if not gasit:
            return bucati, sterse


def main():
    doar_verifica = "--check" in sys.argv
    total = 0

    for fisier in sorted(RADACINA.glob("*.ts")):
        text = fisier.read_text(encoding="utf-8")
        bucati = text.split(SEPARATOR)
        if len(bucati) < 3:
            continue
        bucati, sterse = colapseaza(bucati)
        if not sterse:
            continue
        total += sterse
        nou = SEPARATOR.join(bucati)
        if doar_verifica:
            print(
                "::warning title=Paragrafe repetate::"
                + fisier.name
                + ": "
                + str(sterse)
                + " paragrafe repetate"
            )
        else:
            fisier.write_text(nou, encoding="utf-8")
            print("curatat - " + fisier.name + ": " + str(sterse) + " paragrafe repetate sterse")

    if not total:
        print("Nicio repetare.")
        return 0

    if doar_verifica:
        return 1

    print("Cu totul: " + str(total) + " paragrafe repetate sterse.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
