#!/usr/bin/env python3
"""
Aduce in Geneza 2 si 3 observatiile din studiul lui Allen Nolan asupra
Genezei, episodul despre cadere.

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
        "geneza2.ts",
        r"""Tine minte cele doua jumatati ale randului acesta, fiindca de la ele pleaca aproape tot ce stim despre noi. Esti tarana: nu te ingamfa. Porti suflarea Lui: nu te dispretui.""",
        r"""Si acum sa luam bine seama la ceva ce se lamureste abia mai departe. Suflarea aceasta nu a fost numai aer pus in plamani. Cei mai multi dintre cei ce au cercetat locul acesta socotesc ca prin ea Duhul lui Dumnezeu a venit sa locuiasca in om, si ca trupul lui Adam era, chiar de la inceput, locas al Duhului Sfant. Cand Domnul Isus a suflat peste ucenicii Sai si le-a zis sa ia Duh Sfant, a facut acelasi semn ca aici, si nu din intamplare. Iar daca asa a fost, atunci se lamureste si ce s-a pierdut in ziua caderii: Duhul a plecat, si omul a ramas viu cu trupul, dar mort cu duhul.\n\nSe cuvine sa spunem lamurit si aceasta: Adam este un om adevarat, nu un chip inchipuit. Unii au citit povestirea ca pe o pilda si au zis ca Adam ar fi cugetul, Eva ar fi simtirea, iar sarpele ar fi ademenirea. Nu se poate. Textul da amanunte de viata pe care nicio pilda nu le da: din ce a fost facut, cum a fost adormit, ce nume i-a pus femeii, cati ani a trait si ca a murit. Geneza este carte de istorie, iar locurile ei se pot arata cu degetul pe harta, cu rauri care curg si astazi. Iar blestemul rostit asupra pamantului nu este inchipuire; il stie pe piele oricine a sapat vreodata un ogor. Si mai este ceva, mai greu decat toate: daca Adam nu a fost om adevarat, atunci nici moartea venita prin el nu este adevarata, si atunci nici Cel de-al doilea Adam nu are pe cine mantui.\n\nTine minte cele doua jumatati ale randului acesta, fiindca de la ele pleaca aproape tot ce stim despre noi. Esti tarana: nu te ingamfa. Porti suflarea Lui: nu te dispretui.""",
        "2:7 Duhul in Adam si Adam ca om adevarat",
    ),
    (
        "geneza2.ts",
        r"""Si acum vorba cea grea: vei muri negresit. In ebraica sta mot tamut, adica murind vei muri. Nu se ridica indata sabia; incepe o moarte. In ziua aceea omul nu a cazut mort pe pamant, dar in ziua aceea a inceput sa moara. S-a stins intai legatura cu Dumnezeu, s-a ascuns intre pomi, a inceput sa dea vina, a fost scos afara, si abia dupa multi ani a fost ingropat. Moartea, in Sfanta Scriptura, nu este intai oprirea inimii, ci despartirea de Cel ce este viata.""",
        r"""Si acum vorba cea grea: vei muri negresit. In ebraica sta mot tamut, adica murind vei muri. Nu se ridica indata sabia asupra trupului; se rupe indata legatura care tine viata. Moartea, in Sfanta Scriptura, nu este intai oprirea inimii, ci despartirea de Cel ce este viata.\n\nSa luam bine seama si la vorba in ziua. Cuvantul ebraic este iom, si aici, legat de o zi anume, inseamna sorocul acela de douazeci si patru de ceasuri, nu o vreme oarecare. Deci Dumnezeu nu a spus cu ingaduinta candva; a spus chiar in ziua aceea. Si asa s-a si implinit, numai ca nu acolo unde ne uitam noi intai. In ziua aceea omul a murit cu duhul, iar Duhul lui Dumnezeu a iesit din el. Trupul a mers mai departe inca noua sute treizeci de ani; omul insa era deja mort in partea cea mai adanca a lui. De aceea se ascunde indata intre pomi, de aceea da vina, de aceea este scos afara. Cuvantul lui Dumnezeu nu a dat gres nici cu un ceas.""",
        "2:17 iom si moartea duhovniceasca chiar in ziua aceea",
    ),
    (
        "geneza2.ts",
        """        {
          original: "מוֹת תָּמוּת",
          transliteration: "mot tamut",
          language: "ebraica",
          meaning:
            "murind vei muri. Intarire prin repetare: nu doar o amenintare, ci un proces care incepe atunci."
        }
      ],""",
        """        {
          original: "מוֹת תָּמוּת",
          transliteration: "mot tamut",
          language: "ebraica",
          meaning:
            "murind vei muri. Intarire prin repetare: nu doar o amenintare, ci un proces care incepe atunci."
        },
        {
          original: "יוֹם",
          transliteration: "iom",
          language: "ebraica",
          meaning:
            "zi. Legat de o zi anume, arata sorocul de douazeci si patru de ceasuri, nu o vreme nehotarata."
        }
      ],""",
        "2:17 cuvantul iom",
    ),
    (
        "geneza3.ts",
        r"""Ia aminte, la sfarsit, cat de simplu se scrie: a luat, a mancat, a dat, a mancat. Patru vorbe scurte. Lucrurile care schimba o viata nu se petrec cu tunet.""",
        r"""Ia aminte, la sfarsit, cat de simplu se scrie: a luat, a mancat, a dat, a mancat. Patru vorbe scurte. Lucrurile care schimba o viata nu se petrec cu tunet.\n\nSi acum sa lamurim un cuvant pe care il auzim des si il intelegem rar: pacatul stramosesc. Cei mai multi socotesc ca ar fi vorba de fapta lui Adam, ca si cum am fi trasi la raspundere pentru ce a facut el in gradina. Nu fapta o mostenim, ci starea. Ce s-a stricat in ziua aceea nu a fost numai o purtare, ci insasi firea omului: din om viu cu duhul a ajuns om mort cu duhul, si asa isi naste el copiii, dupa chipul lui, cum se va spune fara ocol la capitolul al cincilea. De aceea Apostolul Pavel scrie ca printr-un singur om a intrat pacatul in lume, si prin pacat moartea, si ca astfel moartea a trecut asupra tuturor oamenilor. Nu suntem pacatosi fiindca pacatuim; pacatuim fiindca ne nastem cu firea aceasta.\n\nIa aminte si la randuiala vremii: Adam a cazut mai inainte de a avea copii. Daca ar fi avut feciori inainte de ziua aceea, ar fi fost in lume doua feluri de oameni, unii nascuti dintr-un om viu cu duhul, altii dintr-unul mort cu duhul, si nimeni nu ar mai fi stiut unde sta. Nu este asa. Toti venim dintr-o singura obarsie cazuta, si tocmai de aceea toti avem trebuinta de aceeasi obarsie noua.""",
        "3:6 pacatul stramosesc este stare, nu fapta",
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
