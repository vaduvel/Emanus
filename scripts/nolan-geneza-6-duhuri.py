#!/usr/bin/env python3
"""Aduce observatiile din studiul lui Allen Nolan despre nefilimi si duhurile rele.

Se aseaza in Geneza 6:4 credinta care se purta intre iudei la vremea Domnului
Isus, data ca parere a oamenilor, nu ca invatatura a Sfintei Scripturi.
Se ia invatatura, cuvintele sunt ale noastre.
"""

import sys
from pathlib import Path

RADACINA = Path("packages/shared/src/bible")

ANCORA = r"""Iata cele doua feluri de a avea nume in Sfanta Scriptura: unul luat cu sila, altul primit ca dar."""

ADAOS = r"""\n\nSi fiindca am ajuns aici, se cuvine sa spunem si ce credeau iudeii despre nefilimi la vremea Domnului Isus, ca sa intelegem mai bine Evangheliile. Ei socoteau ca duhurile rele care intra in oameni sunt duhurile nefilimilor pieriti in potop, ramase fara trup si umbland de atunci pe pamant ca sa caute unde sa se salasluiasca. Scrierile lor din vremea aceea, care nu sunt Sfanta Scriptura si nu au putere de Scriptura, spun lucrul acesta pe fata.\n\nSa fim insa cinstiti cu textul si sa nu punem in el ce nu scrie. Sfanta Scriptura nu spune de unde vin duhurile rele. Nici mantuirea, nici intelegerea capitolului de fata nu atarna de raspunsul acesta, si cine il face temei de invatatura trece dincolo de ce s-a scris.\n\nDar ia aminte la ce nu este parere, ci adevar limpede: duhurile rele sunt. Domnul Isus le-a intalnit, le-a vorbit si le-a scos afara; ele stiau cine este El si se cutremurau. Iar apostolul spune ca lupta noastra nu este impotriva carnii si a sangelui, ci impotriva duhurilor rautatii care sunt in locurile ceresti. Cine nu crede lucrul acesta citeste Evangheliile cu un ochi inchis.\n\nSi ia aminte incotro duce capitolul de fata. Cand omul calca hotarele puse de Dumnezeu si deschide usa acolo unde nu trebuia, nu ramane singur in casa. Se ivesc lucruri pe care nu le mai poate stapani, si vine o vreme cand nici nu le mai poate scoate afara singur. Numai Cel ce le-a poruncit atunci le poate porunci si astazi."""

INDREPTARI = [
    (
        "geneza6.ts",
        ANCORA,
        ANCORA + ADAOS,
        "6:4 credinta iudeilor despre duhurile nefilimilor, data ca parere, si adevarul despre duhurile rele",
    ),
]


def main() -> int:
    doar_verifica = "--check" in sys.argv
    nefacute = 0

    for fisier, vechi, nou, de_ce in INDREPTARI:
        cale = RADACINA / fisier
        if not cale.exists():
            print(f"::warning title=Fisier lipsa::{fisier}")
            nefacute += 1
            continue

        text = cale.read_text(encoding="utf-8")

        if nou in text:
            print(f"deja facut - {fisier}: {de_ce}")
            continue

        if vechi not in text:
            print(f"::warning title=Indreptare nefacuta::{fisier}: {de_ce}")
            nefacute += 1
            continue

        if text.count(vechi) > 1:
            print(f"::warning title=Potrivire multipla::{fisier}: {de_ce}")
            nefacute += 1
            continue

        if doar_verifica:
            print(f"::warning title=Indreptare neaplicata::{fisier}: {de_ce}")
            nefacute += 1
            continue

        cale.write_text(text.replace(vechi, nou), encoding="utf-8")
        print(f"aplicat - {fisier}: {de_ce}")

    if nefacute:
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
