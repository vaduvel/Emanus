#!/usr/bin/env python3
"""Aduce observatiile din studiul lui Allen Nolan pentru Geneza 9.

Episodul 25 al seriei Geneza: legamantul lui Noe.
Se ia invatatura, cuvintele sunt ale noastre.
"""

import sys
from pathlib import Path

RADACINA = Path("packages/shared/src/bible")

ANCORA_1 = r"""Este un legamant dintr-o singura parte: Dumnezeu Se leaga, si atat."""

ADAOS_1 = r"""\n\nSa lamurim intai numele. Cand spunem legamantul lui Noe, nu spunem ca este numai al lui Noe. Legamantul lui Avraam se cheama asa fiindca lui Avraam i-a fost dat; cel de la Sinai poarta numele lui Moise fiindca prin mana lui Moise a fost primit. Tot asa si acesta: poarta numele lui Noe fiindca la vremea lui a fost incheiat, indata dupa ce au scazut apele. Dar cuprinsul lui trece cu mult peste casa lui Noe. Se face cu tot ce este viu si cu pamantul insusi, si tine si astazi, peste capul fiecarui om care se scoala dimineata.\n\nSa luam bine seama si la felul legamantului, fiindca nu toate sunt la fel. La Sinai, legamantul are doua parti si amandoua au de facut ceva: daca veti asculta glasul Meu, veti fi. Acolo binecuvantarea atarna de ascultare. Aici nu se afla niciun daca. Lui Noe nu i se cere nimic, nici lui, nici fiilor lui, nici noua dupa ei. Dumnezeu Se leaga pe Sine singur si ia asupra Lui toata indatorirea. Orice ar face omul si orice ar lasa nefacut, apele nu se mai intorc asupra a tot ce este viu.\n\nSe cuvine insa sa spunem si ce nu spune textul. Din faptul ca Dumnezeu S-a legat sa nu mai nimiceasca tot ce este viu prin ape nu urmeaza ca S-a tras deoparte din lume si ca nu mai lucreaza in ea. Sfanta Scriptura marturiseste si judecati care vin, si o lucrare necurmata a Lui in mijlocul oamenilor. Fagaduinta de aici priveste apele si nimicirea a tot ce respira. Atat spune, si atata luam."""

ANCORA_2 = r"""Sunt mii de ani de cand tine cuvantul acesta."""

ADAOS_2 = r"""\n\nIa aminte si la locurile in care ni se vorbeste despre legamantul acesta, fiindca sunt trei si nu unul. Cel dintai este in Geneza 6:18, mai inainte de potop, cand Dumnezeu ii spune lui Noe ca va face un legamant cu el; acolo nu ni se da niciun amanunt, numai vestirea. Al doilea este in Geneza 8:21-22, dupa jertfa de pe munte, unde ni se da pe scurt inima lucrului: nu voi mai blestema pamantul, si semanatul si seceratul nu vor mai inceta. Abia al treilea, aici in capitolul de fata, il desfasoara intreg, cu cuvintele lui, cu partile lui si cu semnul lui. Asa lucreaza Sfanta Scriptura de multe ori: vesteste intai, spune apoi pe scurt, si la urma aseaza pe indelete."""

INDREPTARI = [
    (
        "geneza9.ts",
        ANCORA_1,
        ANCORA_1 + ADAOS_1,
        "9:8-11 numele legamantului si deosebirea dintre legamantul dintr-o parte si cel din doua",
    ),
    (
        "geneza9.ts",
        ANCORA_2,
        ANCORA_2 + ADAOS_2,
        "9:8-11 cele trei locuri ale legamantului: 6:18, 8:21-22, capitolul 9",
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
