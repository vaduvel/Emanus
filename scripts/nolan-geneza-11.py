#!/usr/bin/env python3
"""Aduce in Geneza 11 observatiile din studiul pastorului Allen Nolan,
episodul 28: turnul Babel, Nimrod si randuiala povestirii.

Valul al optulea.

Rulare:
    python3 scripts/nolan-geneza-11.py
    python3 scripts/nolan-geneza-11.py --check
"""

import sys
from pathlib import Path

RADACINA = Path("packages/shared/src/bible")

INDREPTARI = [
    (
        "geneza11.ts",
        r"""dupa ce omul s-a aratat neputincios sa se inalte, Dumnezeu incepe sa lucreze de unde nu se mai poate nimic.""",
        r"""dupa ce omul s-a aratat neputincios sa se inalte, Dumnezeu incepe sa lucreze de unde nu se mai poate nimic. Si se cuvine lamurit un lucru care i-a incurcat pe multi: in capitolul dinainte se spune de trei ori ca neamurile erau impartite fiecare dupa limba lui, iar aici se spune ca tot pamantul avea o singura limba. Nu este nicio nepotrivire. Capitolul al zecelea insira roadele, iar capitolul al unsprezecelea spune pricina. Povestirea nu merge dupa sirul anilor, ci se intoarce inapoi anume ca sa lamureasca de unde s-au ivit cele saptezeci de neamuri si limbile lor la atat de putina vreme dupa potop. Fara randurile acestea, nimeni nu ar putea spune cum, in vreo suta de ani, din trei fii ai lui Noe s-au facut saptezeci de neamuri care nu se mai intelegeau intre ele.""",
        "episodul 28: capitolul 11 lamureste capitolul 10, nu il contrazice",
    ),
    (
        "geneza11.ts",
        r"""Si mai ia aminte la un cuvant mic: au descalecat acolo. S-au asezat. Li se spusese sa umple pamantul, iar ei se opresc si se aseaza, toti in acelasi loc.""",
        r"""Si mai ia aminte la un cuvant mic: au descalecat acolo. S-au asezat. Li se spusese sa umple pamantul, iar ei se opresc si se aseaza, toti in acelasi loc.\n\nSi sa luam bine seama cand se petrec toate acestea. Peleg, al carui nume inseamna impartire, s-a nascut la vreo suta de ani dupa potop, si in zilele lui a fost impartit pamantul. Deci turnul se zideste pe cand Noe era inca in viata, fiindca el a mai trait trei sute cincizeci de ani dupa ape. Omul care vazuse judecata cu ochii lui traia inca atunci cand nepotii nepotilor lui se strangeau sa se ridice impotriva Celui ce il scapase. Atat de repede uita neamul omenesc.""",
        "episodul 28: Babel la vreo suta de ani dupa potop, pe cand Noe traia inca",
    ),
    (
        "geneza11.ts",
        r"""Cine nu se increde in Cel ce l-a trimis isi face un turn ca sa nu fie nevoit sa plece.""",
        r"""Cine nu se increde in Cel ce l-a trimis isi face un turn ca sa nu fie nevoit sa plece.\n\nSi se cuvine sa spunem cine sta in fruntea lucrarii acesteia, fiindca fara omul acela nu se intelege povestirea. In tot sirul neamurilor din capitolul dinainte, Scriptura se opreste anume asupra unui singur nume: Nimrod, nepotul lui Ham. Despre el se spune ca a inceput sa fie puternic pe pamant si ca cea dintai cetate a imparatiei lui a fost Babel, in tara Sinear, adica tocmai tara in care se ridica turnul. Deci nu avem aici o multime fara cap; in spatele caramizilor sta un imparat.\n\nIa aminte si la numele lui. Nimrod vine de la o radacina care inseamna a se razvrati. Iar textul il numeste de trei ori puternic si de doua ori viteaz la vanatoare inaintea Domnului. Cuvantul talmacit inaintea poarta in el si intelesul de impotriva, iar vanatul lui nu erau numai fiarele campului. Dumnezeu randuise dupa potop ca cine varsa sangele omului, sangele lui sa fie varsat; Nimrod a calcat tocmai porunca aceasta si a vanat oameni. Asa a ajuns imparat: prin frica.\n\nDeci turnul nu se zideste numai din mandria multimii, ci si din silnicia unuia singur. Unde nu se mai tine seama de viata omului, acolo se zideste degraba si impotriva lui Dumnezeu.""",
        "episodul 28: Nimrod, numele lui si silnicia din spatele turnului",
    ),
    (
        "geneza11.ts",
        """        {
          original: "שֵׁם",
          transliteration: "șem",
          language: "ebraica",
          meaning:
            "nume, faima. Acelasi cuvant ca numele lui Sem, si ca in vorba oamenii numelui din Geneza 6:4."
        }
      ],""",
        """        {
          original: "שֵׁם",
          transliteration: "șem",
          language: "ebraica",
          meaning:
            "nume, faima. Acelasi cuvant ca numele lui Sem, si ca in vorba oamenii numelui din Geneza 6:4."
        },
        {
          original: "נִמְרוֹד",
          transliteration: "Nimrod",
          language: "ebraica",
          meaning:
            "Nimrod. Numele vine de la radacina care inseamna a se razvrati, a se impotrivi."
        }
      ],""",
        "episodul 28: numele Nimrod adaugat la cuvintele capitolului",
    ),
    (
        "geneza11.ts",
        """      crossRefs: [
        "Geneza 6:4",
        "Geneza 9:1",
        "Geneza 12:2",""",
        """      crossRefs: [
        "Geneza 6:4",
        "Geneza 9:1",
        "Geneza 9:6",
        "Geneza 10:8-10",
        "Geneza 12:2",""",
        "episodul 28: trimiterile la Nimrod si la randuiala de dupa potop",
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
