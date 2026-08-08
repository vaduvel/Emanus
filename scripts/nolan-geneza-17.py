#!/usr/bin/env python3
"""Aduce observatiile din studiul lui Allen Nolan la Geneza 17.

Deosebirea dintre legamintele dintr-o singura parte si cele din doua parti,
si locul semnului taierii imprejur in legamantul cu Avraam.
Se ia invatatura, cuvintele sunt ale noastre.
"""

import sys
from pathlib import Path

RADACINA = Path("packages/shared/src/bible")

ANCORA = r"""Asa se cuvine sa privim si noi orice semn pe care ni-l da Dumnezeu: nu-l facem ca sa fim primiti, ci fiindca am fost primiti."""

ADAOS = r"""\n\nSi fiindca am ajuns aici, sa lamurim o data pentru totdeauna cele doua feluri de legaminte din Sfanta Scriptura, ca sa nu se incurce mai tarziu.\n\nSunt legaminte dintr-o singura parte, in care Dumnezeu Se leaga singur si nu pune nici o conditie: legamantul cu Noe, cand curcubeul a fost pus pe nori fara sa i se ceara nimic omului, si legamantul acesta cu Avraam, cand prin dobitoacele despicate a trecut numai El. Astfel de legaminte nu se pot rupe, fiindca nu atarna de cel ce doarme.\n\nSi sunt legaminte din doua parti, in care se spune limpede daca veti asculta. Asa va fi cel de la Sinai: daca veti asculta glasul Meu si veti pazi legamantul Meu, veti fi ai Mei. Acolo binecuvantarea si blestemul sunt scrise alaturi, si poporul raspunde: vom face tot ce a zis Domnul. Iar legamantul acela s-a si rupt, si nu din partea lui Dumnezeu.\n\nSe cuvine sa spunem raspicat ca porunca taierii imprejur nu preface legamantul cu Avraam in legamant din doua parti. Fagaduinta ramane a lui Dumnezeu si atarna de El; semnul este cerut celui ce a primit fagaduinta. Cine nu-l lua era taiat din popor, insa cuvantul dat lui Avraam nu se clatina.\n\nSi mai ia aminte la ceva de folos: nu orice legamant din Scriptura este cu Dumnezeu. Ionatan face legamant cu David, iar Iacov cu Laban; sunt legaturi intre oameni, cu martori si cu semne. Legamantul inseamna, la temelia lui, o legatura in care cineva se leaga cu cuvantul lui. Deosebirea cea mare este cine se leaga, si de cine atarna tinerea lui."""

INDREPTARI = [
    (
        "geneza17.ts",
        ANCORA,
        ANCORA + ADAOS,
        "17:9-14 cele doua feluri de legaminte si locul semnului",
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
