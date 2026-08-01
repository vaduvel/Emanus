#!/usr/bin/env python3
"""
Aduce in Geneza 3 si 4 invatatura despre cele doua semintii, asa cum o
asaza Allen Nolan in studiul asupra Genezei.

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
        "geneza3.ts",
        r"""Se cuvine sa spunem si acest lucru: pana acum, intre om si sarpe fusese intelegere. Dumnezeu pune acum vrajmasie. Chiar si despartirea aceasta este mila. Cea mai rea stare a omului ar fi fost sa ramana in buna pace cu cel ce l-a pierdut.""",
        r"""Si acum sa luam bine seama la ceva ce porneste din randul acesta si se intinde peste toata Sfanta Scriptura. Dumnezeu nu pune vrajmasie numai intre sarpe si femeie, ci si intre samanta lui si samanta ei. Sunt deci doua semintii, si amandoua se socotesc dupa duh, nu dupa trup. Samanta femeii este, la implinirea vremii, Domnul Isus; iar cei ce sunt ai Lui, nascuti din nou, ajung si ei samanta Lui, copii duhovnicesti. Samanta sarpelui nu inseamna ca cel rau ar avea feciori nascuti din el; inseamna oamenii care poarta firea lui, cei ce au mostenit de la Adam starea aceea de moarte si nu au fost nascuti a doua oara.\n\nDe aceea randul acesta are un indoit inteles, si se cuvine sa le tinem pe amandoua. Intai: Cel nascut din femeie va zdrobi capul celui rau, si asa s-a si implinit la cruce. Al doilea: intre cele doua semintii va fi ura pana la sfarsit. Apostolul Ioan scrie despre Cain ca era de la cel rau si ca de aceea si-a ucis fratele; iar Domnul Isus a numit pui de napirci pe cei ce se ridicasera impotriva Lui, si ei au inteles foarte bine ce le spune. Cine se mira astazi ca lumea nu-l poate suferi pe cel ce este al lui Hristos sa se intoarca la randul de fata: nu este o nepotrivire de pareri, ci vrajmasia pusa de Dumnezeu in ziua caderii.\n\nSe cuvine sa spunem si acest lucru: pana acum, intre om si sarpe fusese intelegere. Dumnezeu pune acum vrajmasie. Chiar si despartirea aceasta este mila. Cea mai rea stare a omului ar fi fost sa ramana in buna pace cu cel ce l-a pierdut.""",
        "3:15 cele doua semintii si indoitul inteles al fagaduintei",
    ),
    (
        "geneza3.ts",
        """      crossRefs: [
        "Isaia 7:14",
        "Galateni 4:4",
        "Ioan 12:31",
        "Coloseni 2:15",
        "Evrei 2:14-15",
        "Romani 16:20",
        "Apocalipsa 12:17"
      ],""",
        """      crossRefs: [
        "Isaia 7:14",
        "Galateni 4:4",
        "Ioan 8:44",
        "Matei 23:33",
        "1 Ioan 3:12",
        "Ioan 12:31",
        "Coloseni 2:15",
        "Evrei 2:14-15",
        "Romani 16:20",
        "Apocalipsa 12:17"
      ],""",
        "3:15 trimiterile pentru cele doua semintii",
    ),
    (
        "geneza4.ts",
        r"""Si mai ia aminte unde se face fapta: la camp, adica departe, unde nu vede nimeni. Pacatul cauta intotdeauna un loc fara martori. Insa peste cateva randuri vom afla ca a fost un martor: pamantul insusi.""",
        r"""Si mai ia aminte unde se face fapta: la camp, adica departe, unde nu vede nimeni. Pacatul cauta intotdeauna un loc fara martori. Insa peste cateva randuri vom afla ca a fost un martor: pamantul insusi.\n\nSi acum sa luam bine seama la ce spune Apostolul Ioan despre fapta aceasta: Cain era de la cel rau si de aceea si-a ucis fratele, iar pricina a fost ca faptele lui erau rele, pe cand ale fratelui sau erau bune. Deci nu privim aici numai o cearta intre doi frati. Privim cea dintai izbucnire a vrajmasiei rostite in gradina, intre samanta sarpelui si samanta femeii. Abel este cel dintai om care moare tocmai fiindca a fost primit de Dumnezeu. Si de atunci incoace lucrul acesta se tot repeta: cel neprimit nu se intoarce la Dumnezeu ca sa fie primit si el, ci se intoarce impotriva celui primit.""",
        "4:8 cea dintai izbucnire a vrajmasiei dintre semintii",
    ),
    (
        "geneza4.ts",
        r"""Si sa luam bine seama la vorba samanta. Este cuvantul din fagaduinta. Nadejdea nu s-a stins odata cu Abel; se muta pe alt umar. De la Set se va trage sirul care duce la Noe, la Avraam, la David si, la implinirea vremii, la Domnul Isus. Capitolul care a inceput cu o nadejde inselata se incheie cu nadejdea asezata la locul ei.""",
        r"""Si sa luam bine seama la vorba samanta. Este cuvantul din fagaduinta. Nadejdea nu s-a stins odata cu Abel; se muta pe alt umar. De la Set se va trage sirul care duce la Noe, la Avraam, la David si, la implinirea vremii, la Domnul Isus. Capitolul care a inceput cu o nadejde inselata se incheie cu nadejdea asezata la locul ei.\n\nIa aminte ca de aici incolo cartea merge pe doua siruri de oameni, intocmai cum s-a vestit in gradina. Nu sunt doua neamuri de sange, ci doua semintii dupa duh, si se deosebesc printr-un singur semn: unii cheama Numele Domnului, ceilalti nu.""",
        "4:26 cele doua siruri de oameni",
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
