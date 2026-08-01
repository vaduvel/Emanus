#!/usr/bin/env python3
"""
Aduce in Geneza 6 amanuntele despre corabie si despre Noe, asa cum le asaza
Allen Nolan in studiul asupra Genezei.

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
        "geneza6.ts",
        r"""Al treilea, si cel mai mare: Noe umbla cu Dumnezeu. Este chiar cuvantul spus despre Enoh. Doi oameni in toata vremea aceea de dinainte de potop, si despre amandoi acelasi lucru.""",
        r"""Al treilea, si cel mai mare: Noe umbla cu Dumnezeu. Este chiar cuvantul spus despre Enoh. Doi oameni in toata vremea aceea de dinainte de potop, si despre amandoi acelasi lucru.\n\nSi ia aminte ca vorba aceasta nu ramane o lauda goala; se vede in tot ce urmeaza. Cine numara cu luare-aminte afla ca Dumnezeu i-a vorbit lui Noe de sapte ori, si de fiecare data pe indelete: aici, la randul al treisprezecelea; apoi la inceputul capitolului al saptelea; apoi cand i-a spus sa iasa din corabie; si de patru ori in capitolul al noualea. A umbla cu Dumnezeu nu inseamna a-L pomeni din cand in cand, ci a fi om cu care Dumnezeu vorbeste.""",
        "6:9 cele sapte vorbiri ale lui Dumnezeu catre Noe",
    ),
    (
        "geneza6.ts",
        r"""Acum masurile. Trei sute de coti in lungime, cincizeci in latime, treizeci in inaltime — asta face, in masura de astazi, aproape o suta treizeci si sapte de metri lungime. Sa se ia bine seama la potriveala dintre ele: sase la unu intre lungime si latime. Corabierii au aflat, dupa mii de ani, ca aceasta este intre cele mai bune potriveli pentru un vas care nu trebuie sa mearga repede, ci sa nu se rastoarne.""",
        r"""Acum masurile. Cotul era cam de patruzeci si cinci de centimetri, adica lungimea bratului de la cot la varful degetelor. Trei sute de coti in lungime, cincizeci in latime, treizeci in inaltime — asta face, in masura de astazi, aproape o suta treizeci si sapte de metri lungime, douazeci si trei latime si treisprezece inaltime, cu trei caturi. Sa se ia bine seama la potriveala dintre ele: sase la unu intre lungime si latime. Corabierii au aflat, dupa mii de ani, ca aceasta este intre cele mai bune potriveli pentru un vas care nu trebuie sa mearga repede, ci sa nu se rastoarne. Cei ce au cercetat lucrul acesta spun ca o lada de asemenea masuri s-ar fi putut apleca aproape pe o coasta si tot s-ar fi ridicat la loc.\n\nSi ia aminte cat loc era inauntru. Incaperea intreaga a corabiei se socoteste la vreo patruzeci de mii de metri cubi — cat ar incapea in peste cinci sute de vagoane de marfa. Se cuvine sa spunem lucrul acesta raspicat, fiindca multi isi inchipuie o luntre neincapatoare in care dobitoacele stateau unele peste altele. Nu asa. Era loc cu prisosinta.\n\nApoi ia aminte la camarutele pe care i se porunceste sa le faca. Cuvantul ebraic inseamna cuiburi. Nu o singura incapere mare in care sa stea laolalta si leul, si mielul, ci locasuri deosebite, randuite pentru fiecare. Dumnezeu nu lasa nici amanuntul acesta la voia intamplarii.\n\nSi mai ia aminte la fereastra, fiindca aici se citeste adesea gresit. Cine trece repede isi inchipuie o ferestruica mica intr-un perete. Textul spune ca era lata de un cot si asezata sus, la un cot de acoperis. Deci nu o gaura, ci o deschizatura de patruzeci si cinci de centimetri de jur imprejurul corabiei, pe sub streasina. Asa intra lumina si aerul in toata lada, pe toate laturile. Iar de vazut afara nu se putea vedea nimic: fereastra privea in sus, spre cer, nu inainte, spre ape.""",
        "6:15 masurile, incaperea, cuiburile si fereastra de jur imprejur",
    ),
    (
        "geneza6.ts",
        """            "smoala, si totodata pret de rascumparare. Din aceeasi radacina cu kippur, ispasire."
        }
      ],""",
        """            "smoala, si totodata pret de rascumparare. Din aceeasi radacina cu kippur, ispasire."
        },
        {
          original: "קִנִּיִּם",
          transliteration: "qinnim",
          language: "ebraica",
          meaning:
            "cuiburi. Cuvantul talmacit camarute; locasuri deosebite, randuite pentru fiecare soi."
        }
      ],""",
        "6:14 cuvantul qinnim, cuiburi",
    ),
    (
        "geneza6.ts",
        r"""Cartea Evreilor va spune ca prin credinta a facut lucrul acesta, fiind instiintat de Dumnezeu despre lucruri care inca nu se vedeau. Iar Petru il va numi propovaduitor al neprihanirii. Deci in tot rastimpul acela, ciocanul a fost si propovaduire.""",
        r"""Cartea Evreilor va spune ca prin credinta a facut lucrul acesta, fiind instiintat de Dumnezeu despre lucruri care inca nu se vedeau. Iar Petru il va numi propovaduitor al neprihanirii. Deci in tot rastimpul acela, ciocanul a fost si propovaduire.\n\nSi ia aminte la un lucru care il scuteste pe Noe de o povara pe care multi si-o inchipuie: nu i s-a spus sa umble prin lume dupa dobitoace. Textul spune raspicat ca ele au sa vina la el. Lui i s-a dat un singur lucru de facut, corabia; adunarea a facut-o Dumnezeu. Asa lucreaza El si astazi: iti da partea ta, care este de ajuns de grea, si Isi tine partea Lui, care este cu neputinta.\n\nSi acum sa luam bine seama la ceva ce se vede numai daca punem masurile alaturi de numarul celor scapati. In corabia aceea au intrat opt oameni. Era loc pentru mult mai multi. Se cuvine sa ne intrebam de ce a poruncit Dumnezeu o lada atat de incapatoare pentru o casa atat de mica. Iar raspunsul sta in inima Lui: nu voia sa fie numai opt. O suta douazeci de ani a batut ciocanul la vederea tuturor, si un propovaduitor al neprihanirii a vorbit oricui voia sa asculte. Daca s-ar fi pocait cineva si ar fi venit, ar fi gasit usa deschisa si loc inauntru. Corabia aceea ramane o marturie ca Dumnezeu a facut loc pentru mai multi decat au vrut sa vina.""",
        "6:20-22 dobitoacele au venit singure si prisosul de loc din corabie",
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
