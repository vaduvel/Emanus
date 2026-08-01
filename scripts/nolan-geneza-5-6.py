#!/usr/bin/env python3
"""Aduce in Geneza 5 si 6 observatiile din studiul pastorului Allen Nolan.

Valul al saselea. Izvoare: episodul 17 (de ce a inecat Dumnezeu pamantul)
si episodul 21 (cine a fost Metusala).

Rulare:
    python3 scripts/nolan-geneza-5-6.py
    python3 scripts/nolan-geneza-5-6.py --check
"""

import sys
from pathlib import Path

RADACINA = Path("packages/shared/src/bible")

INDREPTARI = [
    (
        "geneza5.ts",
        r"""Nu spune Scriptura mai mult, si nici noi nu vom spune mai mult; dar lucrul sta scris, si se cuvine sa fie vazut.\n\nIa aminte si cat a tinut umblarea""",
        r"""Nu spune Scriptura mai mult, si nici noi nu vom spune mai mult; dar lucrul sta scris, si se cuvine sa fie vazut.\n\nSi ia aminte ce nume i-a pus fiului. Metusala se talcuieste: cand va muri el, va veni. Cei mai multi invatati citesc numele acesta ca pe o vestire: cand moare el, vine judecata. Iata deci ce fel de om a fost Enoh. Nu doar unul care se ruga; unul caruia Dumnezeu i-a spus dinainte ce are de gand sa faca. Iar el a scris vestirea aceea in numele copilului sau, ca sa o poarte omul acela printre oameni noua sute saizeci si noua de ani. Cine umbla cu Dumnezeu ajunge sa stie ce are Dumnezeu pe inima.\n\nIa aminte si cat a tinut umblarea""",
        "episodul 21: intelesul numelui Metusala, dat de Enoh dupa cuvantul lui Dumnezeu",
    ),
    (
        "geneza5.ts",
        r"""        {
          original: "לָקַח",
          transliteration: "laqah",
          language: "ebraica",
          meaning:
            "a lua, a ridica la Sine. Acelasi verb se spune despre Ilie si in Psalmul 49:15."
        }
      ],""",
        r"""        {
          original: "לָקַח",
          transliteration: "laqah",
          language: "ebraica",
          meaning:
            "a lua, a ridica la Sine. Acelasi verb se spune despre Ilie si in Psalmul 49:15."
        },
        {
          original: "מְתוּשֶׁלַח",
          transliteration: "Metușelah",
          language: "ebraica",
          meaning:
            "Metusala. Se talcuieste: cand va muri el, va veni; cei mai multi invatati citesc: cand moare el, vine judecata."
        }
      ],""",
        "episodul 21: numele Metusala adaugat la cuvintele lui Enoh",
    ),
    (
        "geneza5.ts",
        r"""Si nu spune nici cum a murit, si nu se cuvine sa punem noi in text ce nu scrie.\n\nInsa un lucru se vede limpede""",
        r"""Si nu spune nici cum a murit, si nu se cuvine sa punem noi in text ce nu scrie.\n\nMai este insa o socoteala pe care o fac cei mai multi invatati, si se cuvine spusa. Cand va veni vremea apelor, Dumnezeu ii va spune lui Noe ca peste sapte zile va face sa ploua pe pamant; si abia dupa sapte zile au venit apele. De ce inca sapte zile de asteptare, dupa o suta douazeci de ani de asteptare? La evrei, jelirea unui mort tinea sapte zile; asa l-au jelit Iosif si fratii lui pe Iacov. Multi socotesc dar ca in zilele acelea sapte a fost jelit Metusala, si ca abia dupa jelirea lui s-au deschis apele. Numele lui s-ar fi implinit atunci intocmai: cand a murit el, a venit judecata.\n\nSe cuvine sa fim cinstiti cu textul: Sfanta Scriptura nu leaga ea insasi lucrurile acestea in cuvinte. Le lasa in cifre si in datini, pentru cine socoteste. Noi nu punem in text ce nu scrie; dar nici nu trecem cu vederea ce sta scris in numere.\n\nInsa un lucru se vede limpede""",
        "episodul 21: cele sapte zile de jelire dinaintea potopului",
    ),
    (
        "geneza5.ts",
        r"""      crossRefs: [
        "Geneza 7:6",
        "Geneza 7:11",""",
        r"""      crossRefs: [
        "Geneza 7:4",
        "Geneza 7:6",
        "Geneza 7:11",
        "Geneza 50:10",""",
        "episodul 21: trimiteri la cele sapte zile si la jelirea lui Iacov",
    ),
    (
        "geneza6.ts",
        r"""Sfanta Scriptura nu spune ca Dumnezeu S-a maniat aici, ci ca S-a mahnit in inima Lui.\n\nIa aminte bine""",
        r"""Sfanta Scriptura nu spune ca Dumnezeu S-a maniat aici, ci ca S-a mahnit in inima Lui.\n\nSi acum se cuvine limpezit ce anume s-a schimbat, fiindca aici se poticnesc multi. Cuvantul acesta nu inseamna ca Dumnezeu Si-a schimbat parerea, ca si cum ar fi aflat ceva ce nu stia. Inseamna ca Si-a schimbat planul. Randuiala Lui dintai fusese aceasta: omul sa creasca, sa se inmulteasca si sa umple pamantul; aceea a fost binecuvantarea din ziua a sasea. Acum, din pricina purtarii omului, planul se intoarce pe dos: in loc sa se inmulteasca, va fi sters de pe fata pamantului, afara de o singura casa. Nu se poate schimbare mai mare decat aceasta. Iar partea de la urma a randului ne spune cat L-a costat: si S-a mahnit in inima Lui.\n\nSi sa luam bine seama ca asa lucreaza Dumnezeu si in alte locuri, si El insusi o spune raspicat prin prorocul Ieremia: daca vorbesc despre un neam ca il voi smulge si il voi nimici, iar neamul acela se intoarce de la rautatea lui, atunci Imi pare rau de raul pe care ma gandisem sa i-l fac. Deci planul lui Dumnezeu se intoarce dupa purtarea omului. Nu firea Lui se schimba, ci calea pe care merge cu noi. Lucrul acesta este mangaiere pentru cel ce se pocaieste si cutremur pentru cel ce nu se pocaieste.\n\nIa aminte bine""",
        "episodul 17: naham ca schimbare de plan, nu de parere, cu marturia din Ieremia 18",
    ),
    (
        "geneza6.ts",
        r"""Lumea era o scriere frumoasa peste care s-a scris altceva urat.""",
        r"""Lumea era o scriere frumoasa peste care s-a scris altceva urat.\n\nSi la urma o intrebare pe care putini o pun: de ce si vitele, si tararitoarele, si pasarile cerului? Ele nu pacatuisera cu nimic. Raspunsul sta in randuiala facerii. Dobitoacele au fost puse sub stapanirea omului inca din ziua a sasea, iar ce este sub stapanirea cuiva merge pe drumul celui ce stapaneste. Cand cade capul, cade si casa lui. Asa a fost si cu pamantul blestemat din pricina lui Adam. Se cuvine sa ne cutremuram de greutatea pe care o poarta omul: nu pacatuim niciodata numai pentru noi.""",
        "episodul 17: dobitoacele pier fiindca erau sub stapanirea omului",
    ),
    (
        "geneza6.ts",
        r"""Insa temeiul nu sta in vrednicia lui. Sta in mila lui Dumnezeu.\n\nSi mai ia aminte cat de singur este randul acesta.""",
        r"""Insa temeiul nu sta in vrednicia lui. Sta in mila lui Dumnezeu.\n\nSa cantarim bine, fiindca de aici atarna felul in care intelegem toata Scriptura. Multi au fost invatati asa: Noe a fost om bun, si de aceea l-a scapat Dumnezeu. Daca ar fi asa, atunci scaparea se plateste cu purtare buna, si niciunul dintre noi nu are cu ce sa o plateasca. Cartea Evreilor ne spune insa cum a fost: prin credinta a facut Noe corabia, fiind instiintat de Dumnezeu despre lucruri care inca nu se vedeau. Dumnezeu i-a facut har vestindu-i ce are sa vina; Noe a crezut ce i s-a spus; si fiindca a crezut, a fost socotit neprihanit si a lucrat ca un neprihanit. Randul al noualea nu spune de ce a capatat har; spune ce a iesit din harul capatat.\n\nDeci randuiala este aceeasi in Vechiul Testament ca si in cel Nou: prin har suntem mantuiti, prin credinta, si aceasta nu vine de la noi, ci este darul lui Dumnezeu. Nu s-a schimbat nimic in privinta aceasta intre potop si Golgota. Se lamureste Numele Celui in care se crede; calea ramane una singura.\n\nSi mai ia aminte cat de singur este randul acesta.""",
        "episodul 17: Noe a capatat har prin credinta, iar neprihanirea a urmat harului",
    ),
]


def main() -> int:
    doar_verifica = "--check" in sys.argv
    neaplicate = 0

    for nume, vechi, nou, de_ce in INDREPTARI:
        cale = RADACINA / nume
        text = cale.read_text(encoding="utf-8")

        numar = text.count(vechi)
        if numar > 1:
            print(f"::warning title=Potrivire multipla::{nume}: {de_ce}")
            continue
        if numar == 0:
            if nou in text:
                print(f"deja facut - {nume}: {de_ce}")
            else:
                neaplicate += 1
                print(f"::warning title=Indreptare nefacuta::{nume}: {de_ce}")
            continue

        if doar_verifica:
            neaplicate += 1
            print(f"::warning title=Indreptare neaplicata::{nume}: {de_ce}")
            continue

        cale.write_text(text.replace(vechi, nou), encoding="utf-8")
        print(f"aplicat - {nume}: {de_ce}")

    if doar_verifica and neaplicate:
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
