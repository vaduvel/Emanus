#!/usr/bin/env python3
"""Aduce in blurbul Genezei, in capitolul 1 si in capitolul 5 observatiile
din studiul pastorului Allen Nolan, episodul intai.

Valul al saptelea.

Rulare:
    python3 scripts/nolan-geneza-1.py
    python3 scripts/nolan-geneza-1.py --check
"""

import sys
from pathlib import Path

RADACINA = Path("packages/shared/src/bible")

INDREPTARI = [
    (
        "geneza.ts",
        r"""Cine nu cunoaste cartea aceasta citeste tot restul Scripturii fara temelie sub picioare.""",
        r"""Randul in care Dumnezeu ii spune lui Avram ca prin el vor fi binecuvantate toate semintiile pamantului este taria pe care se leaga cele doua parti; cine il intelege intelege tot Vechiul Testament.\n\nSi ia aminte cat de mult atarna Noul Testament de cartea aceasta. Cei ce au numarat cu deamanuntul gasesc in Geneza peste o suta saizeci de locuri care sunt fie citate de-a dreptul in Noul Testament, fie pomenite intr-un fel sau altul; socotind si aducerile aminte mai departate, se trece de doua sute. Avraam este pomenit pe nume in cincisprezece carti ale Vechiului Testament, afara de Geneza, si in unsprezece ale celui Nou; Iacov, in douazeci de carti ale celui Vechi si in saptesprezece ale celui Nou. Nu se poate citi Evanghelia fara cartea aceasta asezata sub ea.\n\nCine nu cunoaste cartea aceasta citeste tot restul Scripturii fara temelie sub picioare.""",
        "episodul 1: cele peste 165 de locuri pomenite in Noul Testament si taria de la 12:3",
    ),
    (
        "geneza.ts",
        r"""Deci randul acesta nu vorbeste despre doua locuri, ci despre tot. Nu a ramas nimic pe dinafara.""",
        r"""Deci randul acesta nu vorbeste despre doua locuri, ci despre tot. Nu a ramas nimic pe dinafara.\n\nSi sa luam bine seama unde ne aflam in Sfanta Scriptura. Cartea aceasta si cea de pe urma se privesc una pe alta ca doua oglinzi, si se cuvine sa fie citite laolalta. Aici se fac cerurile si pamantul cel dintai; acolo se vad un cer nou si un pamant nou. Aici intra pacatul, moartea si plansul; acolo se sterge orice lacrima din ochi, si nu va mai fi moarte. Aici omul este scos afara din gradina, departe de pomul vietii; acolo pomul vietii sta iarasi in mijlocul cetatii, si frunzele lui slujesc la vindecarea neamurilor. Aici sarpele insala si ramane slobod; acolo este aruncat pentru totdeauna. Aici se rosteste blestemul asupra pamantului; acolo se spune ca nu va mai fi nimic vrednic de blestem. Ce se deschide in randul de fata se inchide la capatul Scripturii.""",
        "episodul 1: Geneza si Apocalipsa, cele doua capete ale Scripturii",
    ),
    (
        "geneza.ts",
        r"""          crossRefs: ["Ioan 1:1-3", "Coloseni 1:16-17", "Evrei 11:3", "Apocalipsa 4:11"],""",
        r"""          crossRefs: [
            "Ioan 1:1-3",
            "Coloseni 1:16-17",
            "Evrei 11:3",
            "Apocalipsa 4:11",
            "Apocalipsa 21:1",
            "Apocalipsa 21:4",
            "Apocalipsa 22:3"
          ],""",
        "episodul 1: trimiterile spre Apocalipsa la cel dintai rand al Scripturii",
    ),
    (
        "geneza.ts",
        r"""Cei mai multi dintre credinciosi au vazut aici cel dintai licar din ceea ce Noul Testament va spune deschis: ca Dumnezeu nu este singur in Sine.""",
        r"""Cei mai multi dintre credinciosi au vazut aici cel dintai licar din ceea ce Noul Testament va spune deschis: ca Dumnezeu nu este singur in Sine.\n\nSe cuvine spus limpede: acesta este cel dintai loc din Sfanta Scriptura in care se intrezareste Sfanta Treime. Nu ca invatatura asezata pe rafturi, ci ca un glas launtric care zice sa facem. Si cine citeste cu luare-aminte capitolul intreg ii afla pe toti trei de fata la facerea lumii: Dumnezeu zice, Duhul lui Dumnezeu Se misca pe deasupra apelor, iar apostolul Ioan ne spune ca toate lucrurile au fost facute prin Cuvantul si ca nimic din ce s-a facut nu s-a facut fara El. Taina care se deschide in Evanghelie sta ascunsa aici, in a doua vorba a randului.""",
        "episodul 1: cea dintai pomenire a Sfintei Treimi, la 1:26",
    ),
    (
        "geneza.ts",
        r"""          crossRefs: [
            "Geneza 9:6",
            "Psalmul 8:4-8",
            "Iacov 3:9",""",
        r"""          crossRefs: [
            "Geneza 1:2",
            "Geneza 9:6",
            "Psalmul 8:4-8",
            "Ioan 1:1-3",
            "Iacov 3:9",""",
        "episodul 1: trimiterile pentru Treime la randul cu sa facem om",
    ),
    (
        "geneza5.ts",
        r"""Cartea Evreilor spune limpede ca Enoh a fost stramutat de acolo, ca sa nu vada moartea, si ca inainte de stramutarea lui capatase marturia ca este placut lui Dumnezeu.""",
        r"""Cartea Evreilor spune limpede ca Enoh a fost stramutat de acolo, ca sa nu vada moartea, si ca inainte de stramutarea lui capatase marturia ca este placut lui Dumnezeu.\n\nSi se cuvine spus raspicat ce se afla aici: cea dintai rapire din Sfanta Scriptura. Un om viu, luat de pe pamant fara sa treaca prin moarte. Ce se va fagadui mai tarziu adunarii — ca cei ramasi in viata vor fi rapiti in nori, ca sa intampine pe Domnul in vazduh — s-a vazut aici o data, la un singur om, cu mii de ani mai inainte. Dumnezeu a aratat de la inceputul cartii ca moartea nu este singura iesire din lumea aceasta.""",
        "episodul 1: Enoh, cea dintai rapire din Sfanta Scriptura",
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
