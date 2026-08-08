#!/usr/bin/env python3
"""
Aduce in Geneza observatiile din studiul lui Allen Nolan asupra Genezei
(episoadele 4, 5 si 6 din seria lui: teoriile despre varsta pamantului,
zilele intai, a doua si a treia, apoi zilele a patra, a cincea si a sasea).

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
        "geneza.ts",
        r"""Cartea inceputurilor. Aici afli de unde vine lumea, de unde vii tu, cum s-a rupt totul si cine a fagaduit cel dintai ca va drege ruptura.""",
        r"""Cartea inceputurilor. Aici afli de unde vine lumea, de unde vii tu, cum s-a rupt totul si cine a fagaduit cel dintai ca va drege ruptura. Sta in doua parti: capitolele de la unu la unsprezece spun inceputul lumii intregi, iar de la doisprezece pana la cincizeci se spune inceputul unui singur neam, prin care Dumnezeu a hotarat sa binecuvinteze toate neamurile. Cine nu cunoaste cartea aceasta citeste tot restul Scripturii fara temelie sub picioare.""",
        "blurb: cele doua parti ale cartii",
    ),
    (
        "geneza.ts",
        r"""Sa ne oprim asupra felului in care se face lumina. Nu se spune ca Dumnezeu a aprins ceva. Se spune ca a vorbit. Intre porunca Lui si implinirea ei nu este nicio departare, niciun mijloc, nicio unealta. Dumnezeu a zis, si a fost. Cuvantul Lui nu cere ajutor.""",
        r"""Sa ne oprim asupra felului in care se face lumina. Nu se spune ca Dumnezeu a aprins ceva. Se spune ca a vorbit. Intre porunca Lui si implinirea ei nu este nicio departare, niciun mijloc, nicio unealta. Dumnezeu a zis, si a fost. Cuvantul Lui nu cere ajutor.\n\nInvatatorii de demult au numit lucrarea aceasta zidire prin porunca. Cuvantul latinesc pus in talmacirile vechi pentru sa fie insemna chiar a porunci, a randui. Dumnezeu nu a rugat lumina sa vina si nici nu a lucrat-o cu mana. A poruncit-o, si ea s-a supus. Asa lucreaza un Imparat, nu un lucrator cu unelte.""",
        "1:3 zidirea prin porunca",
    ),
    (
        "geneza.ts",
        r"""Se cuvine sa spunem lamurit si acest lucru: seara vine intai, si apoi dimineata. Ziua evreiasca incepe la asfintit. Asa se face ca in socoteala lui Dumnezeu intunericul nu este sfarsitul, ci inceputul unei zile care merge spre lumina.""",
        r"""Sa luam bine seama la felul in care se numara ziua. Seara vine intai, si apoi dimineata. Cuvantul talmacit seara este erev, si inseamna asfintitul soarelui. De aceea evreul socoteste ziua de la asfintit pana la asfintit, si nu de la miezul noptii, cum socotim noi. De aici se lamuresc mai departe toate sarbatorile Domnului si insasi ziua de odihna. Iar in socoteala lui Dumnezeu intunericul nu este sfarsitul, ci inceputul unei zile care merge spre lumina.\n\nSi mai ia aminte la ceva ce sta in randul acesta fara sa fie spus pe nume. Dumnezeu a numit lumina zi, iar intunericul l-a numit noapte. Ca sa fie zi intr-o parte si noapte in alta, pamantul trebuie sa se invarta, avand o fata in lumina si alta in umbra. Deci pamantul a inceput sa se roteasca in ziua intai, mai inainte de a fi asezat soarele la locul lui. Ceasul lumii a pornit atunci.""",
        "1:5 erev si rotirea pamantului din ziua intai",
    ),
    (
        "geneza.ts",
        """              meaning:
                "a desparti, a pune hotar. Acelasi cuvant se va folosi mai tarziu pentru despartirea dintre curat si necurat, dintre sfant si de rand."
            }
          ],""",
        """              meaning:
                "a desparti, a pune hotar. Acelasi cuvant se va folosi mai tarziu pentru despartirea dintre curat si necurat, dintre sfant si de rand."
            },
            {
              original: "עֶרֶב",
              transliteration: "erev",
              language: "ebraica",
              meaning:
                "seara, asfintitul soarelui. De aici se socoteste ziua evreiasca, de la asfintit pana la asfintit."
            }
          ],""",
        "1:3-5 cuvantul erev",
    ),
    (
        "geneza.ts",
        r"""Si se cuvine sa fim cinstiti cu textul: apele acestea infricosau lumea veche. Marea era, la vecinii lui Israel, o fiara neimblanzita. Aici insa apa nu se lupta cu nimeni. Sta acolo unde i s-a spus sa stea.""",
        r"""Si se cuvine sa fim cinstiti cu textul: apele acestea infricosau lumea veche. Marea era, la vecinii lui Israel, o fiara neimblanzita. Aici insa apa nu se lupta cu nimeni. Sta acolo unde i s-a spus sa stea.\n\nSa luam bine seama unde se afla pamantul in clipa aceasta. Este acoperit de apa de tot, fara varf de munte care sa iasa deasupra, fara o palma de uscat nicaieri. Psalmistul spune acelasi lucru: pamantul a fost imbracat cu apele ca si cu o haina, si apele stateau peste munti. Uscatul nu se arata decat a treia zi. Deci ziua a doua nu ne aduce inca un pamant pe care sa calci; ne aduce numai incaperea de aer dintre apele de jos si apele de sus.\n\nIar despre apele care au ramas deasupra, cei mai multi dintre cei ce au cercetat locul acesta socotesc ca s-au prefacut in aburi si au stat ca un acoperamant de negura deasupra lumii. Un acoperamant ca acesta ar fi ocrotit pamantul de arsita si de razele care ard, ar fi tinut aerul deopotriva de cald peste tot si ar fi facut lumea mult mai buna de trait decat este astazi. Aici se afla si o lamurire pentru ceva ce ne mira mai tarziu: de ce oamenii de dinaintea potopului au trait sapte sute, opt sute, noua sute de ani. Nu erau facuti altfel decat noi. Lumea era altfel. Iar cand potopul a rupt acoperamantul acela, viata omului a inceput sa se scurteze din neam in neam.""",
        "1:6-8 pamantul acoperit de apa si acoperamantul de aburi",
    ),
    (
        "geneza.ts",
        r"""Se cuvine sa bagam de seama si aceasta: pamantul da verdeata. Dumnezeu porunceste, si pamantul lucreaza. Nu fiindca pamantul ar avea putere de la sine, ci fiindca asa a randuit El, sa lucreze prin cele facute. Este intaiul semn ca Dumnezeu nu Se sfieste sa lucreze prin unelte.""",
        r"""Se cuvine sa bagam de seama si aceasta, fiindca este mai adanc decat pare: sa dea pamantul verdeata. Verbul ebraic dașa nu sta aici in forma obisnuita, ci in forma care arata pricinuirea, adica a face pe altul sa lucreze. Deci nu se spune ca Dumnezeu a facut iarba de-a dreptul, cum a facut lumina din nimic. Se spune ca Dumnezeu a imputernicit pamantul sa rodeasca. I-a dat pamantului insusi darul de a naste.\n\nIa aminte cat de rar este lucrul acesta. O singura data in tot capitolul face Dumnezeu asa. Fapturile cu suflare de viata nu vor fi date in grija pamantului; acelea le zideste El Insusi. Numai verdetei i s-a rostuit un izvor pamantesc. De atunci pamantul rodeste fara sa fie poruncit din nou in fiecare primavara, fiindca a primit odata pentru totdeauna puterea aceasta.\n\nSi mai ia aminte cum s-a aratat uscatul: apele au fost stranse la un loc. Nu s-a adus pamant de aiurea. Pamantul era acolo, sub ape, si Dumnezeu doar a facut sa se vada. Uneori Dumnezeu nu aduce nimic nou; da la o parte ce acoperea.""",
        "1:9-13 verbul dasa in forma pricinuitoare",
    ),
    (
        "geneza.ts",
        """              meaning: "samanta, si totodata urmasii. Acelasi cuvant va suna in fagaduintele facute lui Avraam."
            }
          ],""",
        """              meaning: "samanta, si totodata urmasii. Acelasi cuvant va suna in fagaduintele facute lui Avraam."
            },
            {
              original: "דָּשָׁא",
              transliteration: "dașa",
              language: "ebraica",
              meaning:
                "a odrasli, a da verdeata. Aici sta in forma care arata pricinuirea: Dumnezeu face pamantul sa rodeasca, dandu-i lui puterea de a naste."
            }
          ],""",
        "1:9-13 cuvantul dasa",
    ),
    (
        "geneza.ts",
        """          crossRefs: [
            "Deuteronom 4:19",""",
        """          crossRefs: [
            "Iov 38:4-7",
            "Deuteronom 4:19",""",
        "1:14-19 trimitere la Iov 38",
    ),
    (
        "geneza.ts",
        r"""Se cuvine sa spunem si ce nu spune textul. Nu ni se lamureste cum stau la un loc ziua intai, cu lumina ei, si ziua a patra, cu luminatorii. Oamenii credinciosi au dat mai multe raspunsuri de-a lungul vremii. Textul insa nu se ostenește sa raspunda, fiindca nu despre asta vrea sa ne invete. Vrea sa ne invete cine porunceste soarelui.""",
        r"""Si acum sa cantarim bine locul in care se impiedica cei mai multi. La citirea grabita pare ca soarele, luna si stelele se fac abia in ziua a patra, desi lumina era din ziua intai. Sa luam seama insa la ce spune textul cu adevarat: Dumnezeu i-a asezat in intinderea cerului. Nu se spune ca atunci au inceput sa fie; se spune ca atunci au fost pusi la locul lor si rostuiti pentru slujba lor.\n\nCa asa este, ne invata alte locuri ale Scripturii. Domnul il intreaba pe Iov unde era el cand se puneau temeliile pamantului, si adauga ca atunci stelele diminetii cantau laolalta. Deci stelele erau deja acolo la punerea temeliilor, adica din ziua intai. Nu este nicio nepotrivire in Sfanta Scriptura. Lucrarea zilei a patra nu este aducerea lor la fiinta, ci asezarea lor: soarele ajunge luminatorul cel mai mare al pamantului nostru, luna cel mai mic, iar toata bolta se face ceas si calendar pentru om, spre semne, spre vremuri, spre zile si spre ani.\n\nSi mai ia aminte la un lucru care se vede numai daca urmarim tot capitolul. Pana aici Dumnezeu a dat nume la toate: zi, noapte, cer, pamant, mari. Aici nu da nume. Nu zice soare, nu zice luna. Le lasa nenumite, iar datul de nume se opreste odata cu venirea omului, caruia i se va incredinta tocmai aceasta slujba. Faptul ca cei doi luminatori mari raman fara nume in randurile acestea, in vreme ce toate neamurile din jur le rosteau numele ca pe nume de dumnezei, nu este scapare, ci hotarare.""",
        "1:14-19 luminatorii nu se fac, ci se aseaza",
    ),
    (
        "geneza.ts",
        r"""Se cuvine sa bagam de seama ca Dumnezeu nu voieste o lume goala. De trei ori in randurile acestea se aude porunca de a umple. Golul nu este starea pe care o iubeste El.""",
        r"""Sa luam bine seama la o deosebire pe care textul o face cu grija. La verdeata s-a spus sa dea pamantul, si pamantul a dat. Aici nu se mai spune asa. Aici se spune ca Dumnezeu a facut, cu acel cuvant tare care se rosteste numai despre El. Pamantul poate scoate iarba, dar nu poate scoate vietate. Fiindca aici este ceva ce pamantul nu are de unde da: suflare de viata. In ebraica se spune nefeș haya, faptura vie. Materia poate fi rostuita, poate fi impartita, poate fi chiar imputernicita sa rodeasca; insa viata nu se scoate din ea. Viata o da numai Cel ce o are.\n\nSe cuvine sa bagam de seama si aceasta: Dumnezeu nu voieste o lume goala. De trei ori in randurile acestea se aude porunca de a umple. Golul nu este starea pe care o iubeste El.""",
        "1:20-23 vietatea nu iese din pamant",
    ),
    (
        "geneza.ts",
        """              meaning: "a binecuvanta; a da putere de rod si de crestere."
            }
          ],""",
        """              meaning: "a binecuvanta; a da putere de rod si de crestere."
            },
            {
              original: "נֶפֶשׁ חַיָּה",
              transliteration: "nefeș haya",
              language: "ebraica",
              meaning:
                "faptura vie, purtatoare de suflare. Ceea ce pamantul nu poate da de la sine si numai Dumnezeu aduce la fiinta."
            }
          ],""",
        "1:20-23 cuvantul nefes haya",
    ),
    (
        "geneza.ts",
        r"""Asemanare este demut, si mai domoleste putin cuvantul dintai, ca sa nu socotim ca omul ar fi la fel cu Dumnezeu. Este asemenea, nu deopotriva.""",
        r"""Asemanare este demut, si mai domoleste putin cuvantul dintai, ca sa nu socotim ca omul ar fi la fel cu Dumnezeu. Este asemenea, nu deopotriva.\n\nSa nu trecem insa mai departe fara sa spunem ce inseamna aceasta pe fata. Nu inseamna ca Dumnezeu ar avea chip omenesc, ci ca omul a primit ceva din cele ale lui Dumnezeu. Dumnezeu lucreaza, si omului i s-au dat maini care lucreaza. Dumnezeu merge unde voieste, si omului i s-au dat picioare. Dumnezeu vorbeste, si omul vorbeste. Mai mult decat toate: Dumnezeu cugeta, hotaraste si voieste, iar omul cugeta, hotaraste si voieste. Dobitocul nu cantareste daca fapta lui este dreapta sau nedreapta; se poarta cum il duce firea. Omul cantareste, fiindca poarta chipul.\n\nSi de aici iese ceva greu, dar drept. Tocmai fiindca porti chipul lui Dumnezeu, Dumnezeu te va cere la socoteala. Se cuvine sa fim cinstiti aici: oricat de amara ti-ar fi fost copilaria si oricat de strambe pildele din casa parinteasca, tu nu esti o faptura care numai raspunde la ce i se face. Ai fost facut in stare sa alegi. De aceea rana din tine nu este o dezvinovatire, ci un lucru care se cere adus inaintea lui Dumnezeu si lucrat cu puterea Duhului Sfant. Cinstea de a purta chipul si datoria de a raspunde sunt una si aceeasi.""",
        "1:26 ce inseamna chipul si de ce omul da socoteala",
    ),
    (
        "geneza.ts",
        """              meaning:
                "a stapani, a domni. Se spune si despre imparat. Felul domniei se judeca dupa Cel in numele caruia se domneste."
            }
          ],""",
        """              meaning:
                "a stapani, a domni. Se spune si despre imparat. Felul domniei se judeca dupa Cel in numele caruia se domneste."
            },
            {
              original: "כָּבַשׁ",
              transliteration: "kabaș",
              language: "ebraica",
              meaning:
                "a supune, a aduce sub stapanire. Cuvant tare, dat omului ca sa lucreze pamantul, nu ca sa-l prade."
            }
          ],""",
        "1:28 cuvantul kabas",
    ),
    (
        "geneza.ts",
        " Wordproject® is a registered name of the International Biblical Association, a non-profit organization registered in Macau, China. Contact | Disclaimer | Statement of Faith | Mission |",
        "",
        "1:29-31 scoate coada de pagina intrata din sursa",
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
            if nou and nou in text:
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
