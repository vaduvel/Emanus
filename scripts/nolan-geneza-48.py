#!/usr/bin/env python3
"""Aduce observatiile din studiul lui Allen Nolan la Geneza 48.

Dreptul de intai nascut trecut la fiii lui Iosif, dupa cum lamureste
1 Cronici 5:1-2, si numarul semintiilor dupa asezarea lui Efraim si Manase.
Se ia invatatura, cuvintele sunt ale noastre.
"""

import sys
from pathlib import Path

RADACINA = Path("packages/shared/src/bible")

ANCORA_1 = r"""Se cuvine sa fim cinstiti: dreptul de intai nascut nu s-a luat cu ura, ci s-a asezat acolo unde s-a vazut credinciosie."""

ADAOS_1 = r"""\n\nSi ca sa nu ramana lucrul acesta la parerea noastra, sa luam bine seama ca Sfanta Scriptura insasi il lamureste mai tarziu, in cartea intai a Cronicilor: fiindca Ruben a intinat patul tatalui sau, dreptul lui de intai nascut a fost dat fiilor lui Iosif; insa Iuda a fost cel mai puternic intre fratii lui, si din el a iesit Domnitorul.\n\nIa aminte ce se face aici: dreptul de intai nascut se desface in doua. Partea indoita a averii merge la Iosif, prin cei doi baieti asezati acum pe genunchii batranului. Domnia merge la Iuda, si din Iuda va veni, dupa veacuri, Cel ce domneste in veci.\n\nSe cuvine sa spunem raspicat ca nici Iosif, nici Iuda nu si-au cerut partea aceasta. Nu se ia; se da."""

ANCORA_2 = r"""Batranul acela orb a vazut mai departe cu sapte sute de ani decat vedeau ochii lui Iosif."""

ADAOS_2 = r"""\n\nSi acum sa se lamureasca o socoteala care ii incurca pe multi cand ajung aici. Daca Efraim si Manase sunt asezati ca fii, alaturi de cei doisprezece feciori ai lui Iacov, atunci ies treisprezece nume; si totusi Scriptura numara mereu douasprezece semintii.\n\nRaspunsul se afla mai tarziu, la impartirea tarii. Levi nu primeste parte de mostenire ca ceilalti, fiindca partea lui este slujba de la altar si Domnul insusi; iar in locul lui intra cele doua semintii iesite din Iosif. Deci numarul ramane doisprezece, insa asezarea dinauntru s-a schimbat, si s-a schimbat aici, in odaia aceasta.\n\nSe cuvine sa luam seama cat de mult atarna de un ceas in care un batran bolnav se ridica in capul oaselor. Ce se face acum in tacere se va vedea peste veacuri pe harta unei tari."""

INDREPTARI = [
    (
        "geneza48.ts",
        ANCORA_1,
        ANCORA_1 + ADAOS_1,
        "48:5 dreptul de intai nascut desfacut in doua, dupa 1 Cronici 5:1-2",
    ),
    (
        "geneza48.ts",
        ANCORA_2,
        ANCORA_2 + ADAOS_2,
        "48:19 numarul semintiilor si locul lui Levi",
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
