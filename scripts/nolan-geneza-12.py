#!/usr/bin/env python3
"""
Aduce in Geneza 12 invatatura despre versetul de trecere dintre cele doua
parti ale cartii, asa cum o asaza Allen Nolan in studiul asupra Genezei.

Regula care nu se calca: nu se copiaza nicio fraza a lui. Invatatura este a
lui, ordinea opririlor este a lui, cuvintele sunt ale noastre.

Ruleaza fara argumente ca sa aplice. Ruleaza cu --check ca sa verifice.
"""

import sys
from pathlib import Path

RADACINA = Path("packages/shared/src/bible")

# (fisier, textul vechi, textul nou, de ce)
INDREPTARI = [
    (
        "geneza12.ts",
        r"""Capitolul acesta este cotitura Sfintei Scripturi. Cele dintai unsprezece capitole au vorbit despre omenirea intreaga si s-au sfarsit rau de patru ori: caderea, uciderea, potopul si turnul. De aici incolo, Dumnezeu lucreaza cu un singur om.""",
        r"""Capitolul acesta este cotitura Sfintei Scripturi. Cele dintai unsprezece capitole au vorbit despre omenirea intreaga si s-au sfarsit rau de patru ori: caderea, uciderea, potopul si turnul. De aici incolo, Dumnezeu lucreaza cu un singur om. Iar taria pe care se leaga cele doua parti ale cartii este randul al treilea de aici. Cine il intelege intelege tot Vechiul Testament; cine trece peste el va citi mai departe fara sa priceapa de ce se opreste Dumnezeu la un singur neam, si va socoti pe nedrept ca ceilalti au fost lepadati.""",
        "12:3 este randul de trecere intre cele doua parti",
    ),
    (
        "geneza12.ts",
        r"""Iar apostolul Pavel va spune raspicat ce inseamna randul acesta: Scriptura a vestit mai dinainte lui Avraam aceasta veste buna, ca toate neamurile vor fi binecuvantate in el — si ca samanta aceea este Hristos.""",
        r"""Si sa luam bine seama la cuvantul talmacit familiile. In ebraica sta mishpaha, si nu inseamna familia din casa, cu parinti si copii. Inseamna semintii, triburi, neamuri intregi. Deci nu se fagaduieste ca vor fi binecuvantate cateva case alese, ci ca fiecare neam de pe fata pamantului are partea lui in randul acesta. Adu-ti aminte de capitolul al zecelea, unde s-au insirat neamurile pe harta lumii; nu a fost trecut cu vederea niciunul.\n\nAici se cuvine sa lamurim o nedumerire care il framanta pe multi: de ce alege Dumnezeu un singur popor? Nu din partinire. Cand Israel va sta la poalele muntelui, Domnul le va spune ca sunt comoara Lui deosebita dintre toate popoarele, dar in aceeasi rasuflare le spune si de ce: fiindca tot pamantul este al Lui, si fiindca ei au sa-I fie o imparatie de preoti. Iar preotul nu se alege pentru sine. Preotul sta intre Dumnezeu si ceilalti, si tocmai pentru ceilalti este pus deoparte. Israel nu a fost ales in locul neamurilor, ci pentru neamuri.\n\nIar apostolul Pavel va spune raspicat ce inseamna randul acesta: Scriptura a vestit mai dinainte lui Avraam aceasta veste buna, ca toate neamurile vor fi binecuvantate in el — si ca samanta aceea este Hristos.""",
        "12:3 mishpaha si alegerea pentru slujba de preot",
    ),
    (
        "geneza12.ts",
        """      crossRefs: [
        "Geneza 11:4",
        "Geneza 10:32",
        "Geneza 22:18",""",
        """      words: [
        {
          original: "מִשְׁפָּחָה",
          transliteration: "mișpaha",
          language: "ebraica",
          meaning:
            "semintie, trib, neam. Nu familia din casa, ci norodul intreg; de aceea fagaduinta cuprinde toate neamurile pamantului."
        }
      ],
      crossRefs: [
        "Geneza 11:4",
        "Geneza 10:32",
        "Exod 19:5-6",
        "1 Petru 2:9",
        "Geneza 22:18",""",
        "12:3 cuvantul mișpaha si trimiterile la preotia pentru neamuri",
    ),
]


def main() -> int:
    doar_verific = "--check" in sys.argv
    nefacute = 0

    for fisier, vechi, nou, de_ce in INDREPTARI:
        cale = RADACINA / fisier
        if not cale.exists():
            print(f"::warning title=Fisier lipsa::{fisier}")
            nefacute += 1
            continue

        text = cale.read_text(encoding="utf-8")

        if vechi not in text:
            if nou in text:
                print(f"  {fisier}: deja facut - {de_ce}")
            else:
                print(f"::warning title=Indreptare nefacuta::{fisier}: {de_ce}")
                nefacute += 1
            continue

        if text.count(vechi) > 1:
            print(f"::warning title=Potrivire multipla::{fisier}: {de_ce}")
            nefacute += 1
            continue

        if doar_verific:
            print(f"::warning title=Indreptare neaplicata::{fisier}: {de_ce}")
            nefacute += 1
            continue

        cale.write_text(text.replace(vechi, nou), encoding="utf-8")
        print(f"  {fisier}: {de_ce}")

    if nefacute:
        print(f"Indreptari nefacute: {nefacute}")
        return 1

    print("Toate indreptarile sunt la locul lor.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
