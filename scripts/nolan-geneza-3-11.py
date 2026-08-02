#!/usr/bin/env python3
"""Aduce doua observatii din studiul pastorului Allen Nolan:
slava pierduta ca imbracaminte (Geneza 3:7) si masura vremii
de la Adam la Avraam (Geneza 11:10-26).

Invatatura este a lui; cuvintele sunt ale noastre.
"""

import sys
from pathlib import Path

RADACINA = Path("packages/shared/src/bible")

ANCORA_1 = r"""Cea dintai cunostinta pe care omul a castigat-o singur, fara Dumnezeu, a fost cunostinta propriei goliciuni."""

ADAOS_1 = r"""\n\nSi sa cantarim bine ce anume s-a pierdut. Pana in ceasul acela statusera goi si nu le fusese rusine, si se cuvine sa ne intrebam de ce. Multi invatatori socotesc ca omul nu se vedea gol fiindca era acoperit de slava lui Dumnezeu ca de o haina; iar cand duhul i s-a stins, lumina aceea s-a dus, si au ramas ca o casa din care a plecat lumina. Lucrul acesta il dam ca o citire a textului, nu ca o spusa a lui. Insa un lucru se vede limpede si fara ea: trupul lor nu se schimbase cu nimic. S-a schimbat ce ii acoperea. Deci se cuvine sa spunem apasat, ca sa nu ia nimeni randul acesta pe dos: rusinea de atunci nu a venit fiindca trupul ar fi ceva de rusine. Dumnezeu il facuse si il vazuse foarte bun. A venit fiindca omul ramasese descoperit inaintea lui Dumnezeu, si stia lucrul acesta."""

ANCORA_2 = r"""Este cea dintai spita din Geneza care nu se sfarseste cu moartea, ci cu un om chemat."""

ADAOS_2 = r"""\n\nSi sa luam bine seama la felul in care isi imparte Sfanta Scriptura vremea. De la Adam pana la Avraam sunt vreo doua mii de ani, si Geneza ii spune in unsprezece capitole. De la Avraam pana la Domnul Isus sunt alte doua mii de ani, si pentru ei Dumnezeu a randuit tot restul Genezei si inca treizeci si opt de carti ale Vechiului Testament. Aceeasi masura de ani intr-o parte si in cealalta, si cat de deosebit este locul dat fiecareia. Ia aminte ce ne invata asezarea aceasta: Dumnezeu nu zaboveste asupra a tot ce s-a intamplat, ci asupra a ceea ce duce la fagaduinta. Cele unsprezece capitole dintai ne spun de ce era nevoie de un Mantuitor; tot ce vine dupa ele ne spune cum a fost adus."""

INDREPTARI = [
    (
        "geneza3.ts",
        ANCORA_1,
        ANCORA_1 + ADAOS_1,
        "3:7 slava pierduta ca imbracaminte, fara rusine fata de trup",
    ),
    (
        "geneza11.ts",
        ANCORA_2,
        ANCORA_2 + ADAOS_2,
        "11:10-26 cele doua mii de ani de la Adam la Avraam",
    ),
]


def main() -> int:
    verifica = "--check" in sys.argv
    nefacute = 0
    for nume, vechi, nou, de_ce in INDREPTARI:
        cale = RADACINA / nume
        if not cale.exists():
            print(f"::warning title=Fisier lipsa::{nume}")
            nefacute += 1
            continue
        text = cale.read_text(encoding="utf-8")
        if nou in text:
            print(f"deja facut: {nume}: {de_ce}")
            continue
        if vechi not in text:
            print(f"::warning title=Indreptare nefacuta::{nume}: {de_ce}")
            nefacute += 1
            continue
        if text.count(vechi) > 1:
            print(f"::warning title=Potrivire multipla::{nume}: {de_ce}")
            nefacute += 1
            continue
        if verifica:
            print(f"::warning title=Indreptare neaplicata::{nume}: {de_ce}")
            nefacute += 1
            continue
        cale.write_text(text.replace(vechi, nou), encoding="utf-8")
        print(f"aplicat: {nume}: {de_ce}")
    return 1 if nefacute else 0


if __name__ == "__main__":
    raise SystemExit(main())
