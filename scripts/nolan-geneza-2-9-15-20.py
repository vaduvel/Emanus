#!/usr/bin/env python3
"""Aduce observatiile ramase din episoadele Nolan 2, 9, 15 si 20.

Invatatura este cercetata dupa transcrieri; cuvintele sunt ale noastre.
Afirmațiile de socoteala ori talcuire sunt marcate ca atare.
"""

import sys
from pathlib import Path

RADACINA = Path("packages/shared/src/bible")

ANCORA_1 = r"""Ceea ce a fost mai inainte de randul acesta nu se poate masura in ani, pentru ca anii se nasc aici."""
ADAOS_1 = r"""\n\nSe cuvine sa deosebim vesnicia lui Dumnezeu de viata vesnica daruita fapturii. Numai Dumnezeu este fara inceput si fara sfarsit. Omul poate trai fara sfarsit prin darul Lui, dar omul a avut un inceput. Cand randul spune la inceput, vorbeste despre inceputul nostru si al lumii, nu despre inceputul lui Dumnezeu. El era mai inainte ca timpul sa poata fi numarat."""

ANCORA_2 = r"""Numele legamantului, Numele Celui apropiat, nu se rosteste."""
ADAOS_2 = r"""\n\nIa aminte si la felul intrebarii. Sarpele se preface ca nu stie si ii lasa femeii locul de invatator: ea poate sa-l indrepte, sa-i spuna ce a zis Dumnezeu si sa se simta mai priceputa decat cel care intreaba. Nu este o intrebare nevinovata, ci o mangaiere a mandriei. Ispita nu loveste numai in pofta; ii place mai intai omului sa creada ca vede mai limpede decat ceilalti."""

ANCORA_3 = r"""Judecata nu aduce ceva strain; lasa stricaciunea sa ajunga la capatul ei."""
ADAOS_3 = r"""\n\nSe cuvine sa vedem si hotarul adevarat al acestei parti. Cartea neamurilor lui Adam incepe la Geneza 5:1 si nu se incheie la sfarsitul capitolului al cincilea, ci la Geneza 6:8. Abia la randul al noualea incepe toledotul lui Noe. Impartirea in capitole a fost adaugata mult mai tarziu ca sa ne ajute sa gasim locurile; aici insa desparte la vedere ceea ce scriitorul a legat. Randurile 1-8 nu sunt o povestire aruncata intre doua genealogii, ci capatul neamurilor lui Adam si lamurirea drumului lor spre judecata."""

ANCORA_4 = r"""Sfanta Scriptura nu ne spune cum a aflat-o Noe, si nu se cuvine sa punem noi in text ce nu scrie."""
ADAOS_4 = r"""\n\nNu este nici nepotrivire intre randul de aici si porunca din capitolul al saselea. Acolo se spune pe scurt ca fapturile vor veni doua cate doua, adica in perechi, parte barbateasca si parte femeiasca. Aici se da numarul deplin al perechilor: sapte pentru cele curate si cate una pentru cele necurate. Randul dintai arata felul in care vin; randul de fata arata cate perechi vin din fiecare fel."""

ANCORA_5 = r"""Adica tocmai anii lui Metusala."""
ADAOS_5 = r"""\n\nAceeasi socoteala poate fi dusa de la Adam pana la potop. Daca adunam varsta fiecarui tata la nasterea fiului prin care merge sirul — o suta treizeci, o suta cinci, nouazeci, saptezeci, saizeci si cinci, o suta saizeci si doi, saizeci si cinci, o suta optzeci si sapte, o suta optzeci si doi — si apoi cei sase sute de ani ai lui Noe, ajungem la o mie sase sute cincizeci si sase. Se cuvine sa spunem exact ce inseamna cifra: este anul al 1656-lea socotit de la facerea lui Adam in sirul ebraic pastrat de textul nostru, nu o data din calendarul de astazi si nici un an inainte de Hristos stabilit fara indoiala."""

INDREPTARI = [
    ("geneza.ts", ANCORA_1, ANCORA_1 + ADAOS_1, "1:1 vesnicia lui Dumnezeu si inceputul fapturii"),
    ("geneza3.ts", ANCORA_2, ANCORA_2 + ADAOS_2, "3:1 intrebarea care mangaie mandria"),
    ("geneza6.ts", ANCORA_3, ANCORA_3 + ADAOS_3, "5:1-6:8 hotarul toledotului lui Adam"),
    ("geneza7.ts", ANCORA_4, ANCORA_4 + ADAOS_4, "7:2-3 perechile si numarul lor"),
    ("geneza5.ts", ANCORA_5, ANCORA_5 + ADAOS_5, "5:25-27 socoteala anului 1656"),
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
