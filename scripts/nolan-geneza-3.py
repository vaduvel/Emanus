#!/usr/bin/env python3
"""Aduce in Geneza 3 observatiile din studiul pastorului Allen Nolan,
episodul 11: blestemele lui Dumnezeu.

Valul al noualea.

Ia aminte: verificarea deja facut se face inaintea cautarii sirului vechi,
fiindca sirul nou il cuprinde pe cel vechi si altfel scriptul ar adauga
acelasi paragraf la fiecare rulare.

Rulare:
    python3 scripts/nolan-geneza-3.py
    python3 scripts/nolan-geneza-3.py --check
"""

import sys
from pathlib import Path

RADACINA = Path("packages/shared/src/bible")

ADAOS_BLESTEME = r"""Ia aminte acum la randuiala in care cad blestemele. Cand a intrebat, Dumnezeu a luat-o de la om spre sarpe, reasezand ce fusese rasturnat; cand rosteste blestemul, o ia in sirul in care se facuse pacatul: intai sarpele, care a inceput vorba, apoi femeia, care a luat cea dintai, si la urma barbatul. La Dumnezeu nici sirul cuvintelor nu este la intamplare.\n\nApoi ia aminte la pricina spusa pe fata: fiindca ai facut lucrul acesta. Sarpele s-a dat pe sine unealta celui rau si i-a lasat trupul la indemana. Vorba aceasta cuprinde in ea si un lucru greu: faptura aceea ar fi putut sa nu se lase. Daca nu ar fi avut nicio putere sa se impotriveasca, nu i s-ar fi cerut socoteala. Dumnezeu nu blesteama pe cine nu putea face altfel.\n\nSa cantarim bine si cuvantul talmacit intre toate vitele. In ebraica sta acolo min, care nu inseamna numai printre, ci si mai mult decat. Toata imparatia dobitoacelor a intrat sub blestem prin caderea omului, fiindca toate fusesera puse sub mana lui; insa sarpele a fost blestemat mai mult decat toate. De aici se lamureste si de ce fiarele au ajuns sa se sfasie intre ele: Dumnezeu nu le-a facut asa la inceput.\n\nIar cuvantul sa mananci tarana nu inseamna ca hrana sarpelui ar fi pamantul. Inseamna ca isi va lua mancarea de-a dreptul de jos, cu botul in colb, fiindca nu mai are cu ce sa o apuce. Invatatii evrei spun ca sarpele fusese cea mai frumoasa dintre fapturi si ca de acum incolo tot ce va manca va avea pentru el gustul taranei; lucrul acesta il dam ca parere a lor, nu ca spusa a textului.\n\nSi mai priveste inainte. Prorocul Isaia spune ca va veni o vreme cand lupul va locui impreuna cu mielul si leul va manca paie ca boul; blestemul se va ridica de pe dobitoace. Numai despre sarpe se spune si atunci ca tarana va fi hrana lui. Doua pricini se vad: el s-a dat singur unealta, si el ramane chipul celui rau. Nadejdea aceasta o dam asa cum o da Scriptura, ca privire inainte, nu ca socoteala de ani si de vremuri.\n\nSi intreaba-te cine pune vrajmasia. Nu omul, nu imprejurarile. Eu voi pune, zice Dumnezeu. Pana si despartirea de cel rau este lucrarea Lui in noi.\n\nIa aminte, la sfarsit, la doua semne mici din text. Cel dintai: se spune samanta ei, iar cuvantul care urmeaza arata o persoana, nu o multime. Aceasta iti va zdrobi capul. Nu se vesteste un neam, ci Unul singur. Al doilea: cand prorocul Isaia va spune, mult mai tarziu, ca fecioara va ramane insarcinata, in ebraica sta acolo articolul hotarat, adica fecioara aceea, ca si cum ar fi vorba de una stiuta dinainte. Iar cea dintai fagaduinta a unui fiu nascut fara barbat este tocmai randul de fata.\n\nSi inca un cuvant, care taie adanc. Acelasi proroc spune ca Domnului I-a placut sa-L zdrobeasca prin suferinta. Zdrobirea calcaiului nu a fost izbanda sarpelui, ci voia lui Dumnezeu implinita chiar prin mana lui. Cel ce a lovit nu a stiut ce face. Duhurile necurate stiau bine cine este Cel ce statea inaintea lor si strigau Numele Lui; si totusi au impins spre cruce, si tocmai acolo li s-a zdrobit capul."""

INDREPTARI = [
    (
        "geneza3.ts",
        r"""Cea mai rea stare a omului ar fi fost sa ramana in buna pace cu cel ce l-a pierdut.""",
        r"""Cea mai rea stare a omului ar fi fost sa ramana in buna pace cu cel ce l-a pierdut.\n\n"""
        + ADAOS_BLESTEME,
        "episodul 11: randuiala blestemelor, min comparativ, tarana, Mileniul, fecioara si calcaiul",
    ),
    (
        "geneza3.ts",
        """        {
          original: "שוּף",
          transliteration: "șuf",
          language: "ebraica",
          meaning:
            "a zdrobi, a lovi. Acelasi verb pentru amandoua loviturile; deosebirea sta in locul lovit, capul si calcaiul."
        }
      ],""",
        """        {
          original: "שוּף",
          transliteration: "șuf",
          language: "ebraica",
          meaning:
            "a zdrobi, a lovi. Acelasi verb pentru amandoua loviturile; deosebirea sta in locul lovit, capul si calcaiul."
        },
        {
          original: "מִן",
          transliteration: "min",
          language: "ebraica",
          meaning:
            "din, dintre. Adesea cu inteles de asemuire: mai mult decat. La Geneza 3:14 arata ca sarpele a fost blestemat mai mult decat toate dobitoacele."
        }
      ],""",
        "episodul 11: cuvantul min adaugat la Geneza 3:14-15",
    ),
    (
        "geneza3.ts",
        """        "Isaia 7:14",
        "Galateni 4:4",""",
        """        "Isaia 7:14",
        "Isaia 53:10",
        "Isaia 65:25",
        "Galateni 4:4",
        "Marcu 1:24",""",
        "episodul 11: trimiterile la Isaia 53, Isaia 65 si Marcu 1:24",
    ),
]


def main() -> int:
    doar_verifica = "--check" in sys.argv
    neaplicate = 0

    for nume, vechi, nou, de_ce in INDREPTARI:
        cale = RADACINA / nume
        text = cale.read_text(encoding="utf-8")

        if nou in text:
            print(f"deja facut - {nume}: {de_ce}")
            continue

        numar = text.count(vechi)
        if numar > 1:
            print(f"::warning title=Potrivire multipla::{nume}: {de_ce}")
            continue
        if numar == 0:
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
