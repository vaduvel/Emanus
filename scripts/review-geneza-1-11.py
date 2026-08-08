#!/usr/bin/env python3
"""Primul val de revizie editoriala si teologica pentru Geneza 1-11."""

from pathlib import Path
import sys

RADACINA = Path("packages/shared/src/bible")

INDREPTARI = {
    "geneza.ts": [
        (
            "Forma cuvantului este de mai multi, dar verbul de langa el este intotdeauna de unul singur. Limba insasi pastreaza o taina pe care Noul Testament o va deschide.",
            "Forma cuvantului este morfologic de plural, iar verbul de aici este la singular. Lucrul acesta se cuvine observat, dar forma singura nu dovedeste Treimea; taina Treimii se lamureste din marturia intreaga a Sfintei Scripturi."
        ),
        (
            "a face aducand la fiinta. In Sfanta Scriptura, subiectul acestui cuvant este intotdeauna Dumnezeu, niciodata omul.",
            "a crea, a face. In Sfanta Scriptura, verbul acesta Il are pe Dumnezeu drept subiect; in Geneza 1:1, El este Cel care aduce la fiinta cerurile si pamantul."
        ),
        (
            "Si mai ia aminte la ceva ce sta in randul acesta fara sa fie spus pe nume. Dumnezeu a numit lumina zi, iar intunericul l-a numit noapte. Ca sa fie zi intr-o parte si noapte in alta, pamantul trebuie sa se invarta, avand o fata in lumina si alta in umbra. Deci pamantul a inceput sa se roteasca in ziua intai, mai inainte de a fi asezat soarele la locul lui. Ceasul lumii a pornit atunci.",
            "Se cuvine sa nu punem in randul acesta mai mult decat spune. Textul marturiseste alternarea zilei si a noptii, dar nu descrie miscarea pamantului si nici felul in care lumina a fost purtata inainte de ziua a patra. Putem cerceta lucrurile acestea in lumea facuta; aici primim marturia ca Dumnezeu a pus hotar intre lumina si intuneric."
        ),
        (
            "Cei ce au numarat cu deamanuntul gasesc in Geneza peste o suta saizeci de locuri care sunt fie citate de-a dreptul in Noul Testament, fie pomenite intr-un fel sau altul; socotind si aducerile aminte mai departate, se trece de doua sute. Avraam este pomenit pe nume in cincisprezece carti ale Vechiului Testament, afara de Geneza, si in unsprezece ale celui Nou; Iacov, in douazeci de carti ale celui Vechi si in saptesprezece ale celui Nou. Nu se poate citi Evanghelia fara cartea aceasta asezata sub ea.",
            "Noul Testament se intoarce mereu la Geneza: la Adam si Eva, la Abel, Noe, Avraam, Sara, Isaac, Iacov si Iosif. Unele locuri sunt citate de-a dreptul, altele sunt amintite ori asezate la temelia unei invataturi. Numarul lor se schimba dupa felul in care sunt socotite aluziile, de aceea nu legam greutatea cartii de o cifra. Lucrul limpede este acesta: nu se poate citi Evanghelia fara cartea aceasta asezata sub ea."
        ),
    ],
    "geneza2.ts": [
        (
            "La ziua a saptea nu se mai spune. Nu i se pune capat. Invatatorii au bagat de seama lucrul acesta inca de demult, iar Noul Testament il ia mai departe si vorbeste despre o odihna care ramane inca deschisa pentru poporul lui Dumnezeu. Ziua a saptea nu s-a inchis niciodata.",
            "La ziua a saptea nu se mai spune formula despre seara si dimineata. Invatatorii au bagat de seama lucrul acesta inca de demult, iar Epistola catre Evrei vorbeste despre o odihna care ramane pentru poporul lui Dumnezeu. Se poate vedea aici o deschidere spre odihna Lui, dar textul nu ne cere sa spunem ca ziua calendaristica a saptea nu s-a incheiat."
        ),
        (
            "Si acum sa luam bine seama la ceva ce se lamureste abia mai departe. Suflarea aceasta nu a fost numai aer pus in plamani. Cei mai multi dintre cei ce au cercetat locul acesta socotesc ca prin ea Duhul lui Dumnezeu a venit sa locuiasca in om, si ca trupul lui Adam era, chiar de la inceput, locas al Duhului Sfant. Cand Domnul Isus a suflat peste ucenicii Sai si le-a zis sa ia Duh Sfant, a facut acelasi semn ca aici, si nu din intamplare. Iar daca asa a fost, atunci se lamureste si ce s-a pierdut in ziua caderii: Duhul a plecat, si omul a ramas viu cu trupul, dar mort cu duhul.",
            "Mai tarziu, Domnul Isus va sufla peste ucenici si le va spune sa primeasca Duh Sfant, iar cititorul crestin aude pe drept o legatura cu facerea omului. Se cuvine insa sa nu trecem dincolo de text: Geneza 2:7 spune ca Dumnezeu i-a dat omului suflare de viata; nu spune aici ca Adam a devenit locas al Duhului Sfant si nici ca Duhul a plecat din el la cadere. Moartea duhovniceasca se lamureste din marturia mai larga a Scripturii, nu dintr-un cuvant ascuns in acest rand."
        ),
        (
            "latura, coasta unei cladiri. In restul Scripturii, cuvantul se foloseste pentru laturile cortului si ale chivotului, nu pentru oase.",
            "latura, coasta. In alte locuri cuvantul arata laturile unei cladiri ori ale chivotului; aici, contextul il foloseste pentru partea luata din om."
        ),
    ],
    "geneza3.ts": [
        (
            "Sarpele o va si impinge, peste cateva randuri, sa se atinga de pom fara sa moara pe loc.",
            "Peste cateva randuri, femeia va lua din rod; textul nu ne spune daca sarpele a impins-o sa atinga pomul mai intai."
        ),
        (
            "Statea acolo. A auzit toata vorba, de la inceput pana la sfarsit, si nu a zis nimic.",
            "Era cu ea cand a mancat si i-a dat. Textul nu ne spune de cand statea acolo si nici cat din vorbire a auzit; spune limpede insa ca a primit si a mancat fara sa se impotriveasca."
        ),
        (
            "Sortul cusut de om nu tine. Imbracamintea data de Dumnezeu costa o viata.",
            "Sortul cusut de om nu tine. Hainele date de Dumnezeu sunt de piele; textul nu spune de la ce animal au venit si nici nu descrie aici o jertfa, desi multi invatatori au vazut in ele un chip care indreapta privirea spre acoperirea data mai tarziu prin jertfa."
        ),
        (
            "Sabia nu a fost mutata din drum; a cazut asupra Lui.",
            "Perdeaua s-a rupt prin moartea Lui si ni s-a deschis o cale noua si vie. Imaginea sabiei cazute asupra Lui este o talcuire omiletica, nu o afirmatie a randului din Geneza."
        ),
    ],
    "geneza4.ts": [
        (
            "Iar cine citeste cu luare-aminte simte ce nadejde poarta in ea. Auzise fagaduinta despre samanta femeii care va zdrobi capul sarpelui. Se uita la pruncul din brate si crede ca acesta este.",
            "Unii invatatori au auzit in strigatul ei nadejdea ca pruncul ar putea fi samanta fagaduita in gradina. Este o citire cu putinta, dar textul nu spune ca Eva l-a socotit pe Cain implinirea fagaduintei. Ceea ce spune limpede este ca ea a primit nasterea cu recunostinta fata de Domnul."
        ),
        (
            "Un nume care spune cat de scurta va fi viata lui.",
            "Un nume care, citit dupa viata lui, se potriveste dureros cu scurtimea ei; textul nu spune daca numele i-a fost dat ca prorocie."
        ),
        (
            "Sunt aceleasi doua cuvinte, dorinta si stapanire, asezate in aceeasi randuiala. Iar aici intelesul este limpede: este vorba de o intindere spre a pune stapanire. Randul acesta lumineaza randul de dincolo, si arata ca acolo nu se vestea o randuiala buna, ci o lupta.",
            "Sunt aceleasi doua cuvinte, dorinta si stapanire, asezate in aceeasi randuiala. Multi inteleg aici o dorinta de a pune stapanire si citesc, prin aceasta, si Geneza 3:16 ca vestire a unei lupte. Altii inteleg cuvantul ca o dorinta indreptata spre cineva. Legatura dintre cele doua locuri este limpede; nu se cuvine insa sa spunem ca sensul disputat este hotarat numai de aceasta asemanare."
        ),
        (
            "Este cel dintai loc din Sfanta Scriptura in care se spune ca oamenii se roaga laolalta.",
            "Este cel dintai loc din Sfanta Scriptura in care se spune deslusit ca oamenii au inceput sa cheme Numele Domnului; textul nu descrie forma adunarii lor si nici nu spune cati se rugau impreuna."
        ),
    ],
    "geneza5.ts": [
        (
            "Metusala se talcuieste: cand va muri el, va veni. Cei mai multi invatati citesc numele acesta ca pe o vestire: cand moare el, vine judecata. Iata deci ce fel de om a fost Enoh. Nu doar unul care se ruga; unul caruia Dumnezeu i-a spus dinainte ce are de gand sa faca. Iar el a scris vestirea aceea in numele copilului sau, ca sa o poarte omul acela printre oameni noua sute saizeci si noua de ani. Cine umbla cu Dumnezeu ajunge sa stie ce are Dumnezeu pe inima.",
            "Numele Metusala a primit mai multe talcuiri, iar cea cunoscuta in predici — cand va muri el, va veni — nu este sprijinita indeajuns de limba ebraica pentru a fi data drept inteles sigur. Socoteala anilor din textul masoretic il asaza pe Metusala in anul potopului, dar Scriptura nu spune ca numele lui a fost o prorocie si nici in ce imprejurare a murit. Se cuvine sa ramanem la ce scrie: dupa nasterea lui, Enoh a umblat cu Dumnezeu."
        ),
        (
            "Si se cuvine spus raspicat ce se afla aici: cea dintai rapire din Sfanta Scriptura. Un om viu, luat de pe pamant fara sa treaca prin moarte. Ce se va fagadui mai tarziu adunarii — ca cei ramasi in viata vor fi rapiti in nori, ca sa intampine pe Domnul in vazduh — s-a vazut aici o data, la un singur om, cu mii de ani mai inainte. Dumnezeu a aratat de la inceputul cartii ca moartea nu este singura iesire din lumea aceasta.",
            "Epistola catre Evrei spune limpede ca Enoh a fost mutat ca sa nu vada moartea. Este cea dintai asemenea mutare povestita in Scriptura. Unii invatatori o pun alaturi de fagaduinta din 1 Tesaloniceni 4 despre cei vii la venirea Domnului; legatura este folositoare ca asemanare, dar randul din Geneza nu hotaraste singur ordinea lucrurilor de la sfarsit. Dumnezeu arata aici, fara indoiala, ca moartea nu are ultimul cuvant."
        ),
    ],
    "geneza6.ts": [
        (
            "Insa cel dintai inteles se leaga mai bine de ce urmeaza: Petru va spune ca indelunga rabdare a lui Dumnezeu era in asteptare, in zilele lui Noe, pe cand se facea corabia. Deci Dumnezeu a pus un ceas pe masa si l-a lasat sa mearga o suta douazeci de ani.",
            "Petru spune ca indelunga rabdare a lui Dumnezeu astepta in zilele lui Noe, pe cand se facea corabia, iar lucrul acesta se potriveste cu citirea unui rastimp pana la judecata. Totusi Petru nu numeste cei o suta douazeci de ani, iar Geneza nu ne da anul in care a inceput zidirea; de aceea lasam amandoua citirile deschise."
        ),
        (
            "Si acum sa luam bine seama la ceva ce se vede numai daca punem masurile alaturi de numarul celor scapati. In corabia aceea au intrat opt oameni. Era loc pentru mult mai multi. Se cuvine sa ne intrebam de ce a poruncit Dumnezeu o lada atat de incapatoare pentru o casa atat de mica. Iar raspunsul sta in inima Lui: nu voia sa fie numai opt. O suta douazeci de ani a batut ciocanul la vederea tuturor, si un propovaduitor al neprihanirii a vorbit oricui voia sa asculte. Daca s-ar fi pocait cineva si ar fi venit, ar fi gasit usa deschisa si loc inauntru. Corabia aceea ramane o marturie ca Dumnezeu a facut loc pentru mai multi decat au vrut sa vina.",
            "In corabie au intrat opt oameni, impreuna cu vietuitoarele si merindele randuite. Scriptura nu ne spune cat loc a ramas, daca altor oameni li s-a facut o chemare sa intre ori ce s-ar fi intamplat daca ar fi venit. Petru il numeste pe Noe propovaduitor al neprihanirii si marturiseste indelunga rabdare a lui Dumnezeu; atat putem spune cu temei, fara sa alcatuim o usa pe care textul nu o descrie."
        ),
    ],
    "geneza7.ts": [
        (
            "Dumnezeu nu spune du-te in corabie. Spune intra. Cine zice intra sta inauntru. Este cuvantul gazdei catre cel de la usa, nu al celui ce ramane afara si trimite pe altul la adapost. Noe nu este impins spre un loc gol; este chemat acolo unde este Domnul.",
            "Dumnezeu nu spune numai ca a venit vremea apelor, ci ii da lui Noe porunca limpede sa intre. Cuvantul nu ne spune unde Se afla vorbitorul si nu se cuvine sa zidim pe forma lui o dovada ca Dumnezeu era inauntrul corabiei. Mangaierea sta in altceva, spus limpede: Dumnezeu il cheama, ii poarta de grija si inchide El Insusi usa."
        ),
        (
            "Sfanta Scriptura nu spune despre fiii lui si despre nevestele lor ca ar fi fost neprihaniti. Se spune ca au intrat cu el.",
            "Sfanta Scriptura nu ne da aici o judecata separata despre fiecare fiu si fiecare nevasta; spune ca au intrat impreuna. Nu facem din aceasta tacere o invatatura ca neprihanirea unui om mantuieste automat casa lui. Fiecare om raspunde inaintea lui Dumnezeu, iar aici citim pur si simplu ca familia a ascultat chemarea si a intrat."
        ),
        (
            "A doua: din cele curate se va manca. Randuiala hranei si randuiala jertfei sunt asezate inca inainte de ape.",
            "Mai tarziu, dupa iesirea din corabie, Dumnezeu va ingadui omului sa manance carne. In randul de fata, pricina vazuta pentru numarul mai mare al dobitoacelor curate este jertfa de la Geneza 8:20; textul nu spune ca Noe manca deja din ele inainte de potop."
        ),
        (
            "Cine a vrut sa rada, a mai avut o saptamana de ras. Cine a vrut sa se intoarca, a mai avut o saptamana de intors.",
            "Cerul a ramas inca senin sapte zile dupa porunca intrarii. Textul nu ne spune ce au facut cei de afara in acel rastimp si nici daca usa le-a fost oferita; putem vedea indelunga rabdare a lui Dumnezeu, dar nu putem scrie o scena pe care Scriptura a lasat-o nespusa."
        ),
        (
            "Iar Metusala, cel mai batran om care a trait vreodata, murise chiar in anul acesta. Cea mai lunga viata omeneasca s-a sfarsit tocmai cand s-a sfarsit si rabdarea.",
            "Socoteala anilor din textul masoretic il aduce pe Metusala pana in anul potopului. Scriptura nu spune in ce zi a murit si nici daca moartea lui a avut legatura cu apele; de aceea nu spunem mai mult decat ingaduie socoteala."
        ),
        (
            "Adancimea de cincisprezece coti peste munti este tocmai adancimea de care avea nevoie ca sa treaca peste orice inaltime fara sa se loveasca de nimic. Apa nu a fost cu un cot mai mult decat trebuia. Dumnezeu masoara si potopul.",
            "Textul spune ca apele s-au ridicat cu cincisprezece coti deasupra muntilor acoperiti. Nu ne da pescajul corabiei si nu ne ingaduie sa spunem ca aceasta era exact adancimea tehnica de care avea nevoie. Putem marturisi ca Dumnezeu a purtat corabia fara sa prefacem o presupunere inginereasca in explicatie a versetului."
        ),
    ],
    "geneza8.ts": [
        (
            "Si mai ia aminte de ce s-a facut maslinul, de atunci si pana astazi, semn al pacii intre Dumnezeu si oameni.",
            "Frunza de maslin a ajuns, in cultura de mai tarziu, semn al pacii. Geneza nu spune ca Dumnezeu a randuit-o aici ca semn de legamant; semnul legamantului va fi curcubeul. Aici frunza ii arata lui Noe, atat de simplu, ca apele au scazut si viata a prins din nou."
        ),
    ],
    "geneza9.ts": [
        (
            "Este atarnata cu coarda in jos si cu deschizatura in sus, spre cer. Un arc asezat astfel nu mai poate fi tras spre pamant. Daca ar fi indreptat spre cineva, ar fi indreptat spre Cel ce l-a pus acolo.",
            "Unii invatatori au vazut in forma curcubeului un arc pus deoparte, care nu mai este indreptat spre pamant. Este o imagine de predica, nu ceva spus de text despre coarda ori directia armei. Ceea ce spune Dumnezeu Insusi este de ajuns: curcubeul va fi semnul legamantului."
        ),
        (
            "Legamantul care te tine nu atarna de statornicia ta. Daca ar atarna, s-ar rupe pana maine. Sta pe Cel ce l-a facut, si El ramane credincios chiar cand noi suntem necredinciosi.",
            "Legamantul acesta nu atarna de statornicia omului: Dumnezeu a fagaduit ca nu va mai nimici tot ce este viu prin apele unui potop. Sa nu largim fagaduinta pana la a o face sa spuna totul despre mantuirea fiecarui om; sa ne odihnim in ceea ce spune, fiindca Cel ce a facut-o ramane credincios."
        ),
        (
            "Al patrulea, si cel mai greu de ocolit: cel ce rosteste cuvintele acestea este un om abia trezit din betie. Sfanta Scriptura ni le da ca fapt petrecut, nu ca porunca data noua.",
            "Al patrulea: Sfanta Scriptura ne da cuvintele ca parte a istoriei si nu ca porunca data noua. Faptul ca Noe aflase ce i se facuse dupa trezire nu hotaraste singur daca vorbirea lui este ori nu prorocie; implinirea se cantareste din restul Scripturii."
        ),
    ],
    "geneza10.ts": [
        (
            "Vanatorul care ajunge sa domneasca peste noroade nu a vanat dobitoace. A vanat oameni.",
            "Unii talcuitori au vazut in vanatorul ajuns stapanitor si un vanator de oameni. Textul nu spune ce vana si nu ne ingaduie sa dam aceasta talcuire drept fapt. Ceea ce spune este ca puterea lui s-a legat de imparatie si de cetati."
        ),
        (
            "Poate sa insemne sub privirea Lui, dar poate sa insemne si in fata Lui, adica impotriva Lui, cu obraznicie.",
            "Inseamna inaintea Lui, sub privirea Lui. Unii au inteles expresia ca pe o impotrivire sfidatoare, dar cuvantul panim, luat singur, nu dovedeste sensul impotriva."
        ),
        (
            "Cuvantul ebraic palag inseamna a imparti, a despica. Iar impartirea despre care se vorbeste este tocmai ce se va povesti in capitolul urmator: incurcarea limbilor la Babel si imprastierea oamenilor.",
            "Cuvantul ebraic palag inseamna a imparti. Multi leaga impartirea pomenita aici de incurcarea limbilor si imprastierea de la Babel, povestite in capitolul urmator. Legatura se potriveste bine cu asezarea textului, dar Geneza 10:25 nu numeste Babelul; de aceea o dam ca talcuire puternica, nu ca singura citire cu putinta."
        ),
    ],
    "geneza11.ts": [
        (
            "Deci turnul se zideste pe cand Noe era inca in viata, fiindca el a mai trait trei sute cincizeci de ani dupa ape. Omul care vazuse judecata cu ochii lui traia inca atunci cand nepotii nepotilor lui se strangeau sa se ridice impotriva Celui ce il scapase. Atat de repede uita neamul omenesc.",
            "Dupa socoteala anilor din textul masoretic, Noe traia inca in vremea lui Peleg. Daca impartirea din zilele lui Peleg este Babelul, atunci omul care vazuse apele era inca in viata. Sunt doua legaturi de cronologie si talcuire, nu o afirmatie rostita de capitol; le tinem ca atare."
        ),
        (
            "Piatra o face Dumnezeu si omul o gaseste. Caramida o face omul. O framanta din lut, o toarna in tipar si o arde in foc. Iar caramizile ies toate la fel.",
            "Piatra se gaseste, iar caramida se framanta din lut, se toarna si se arde. Randul explica felul zidirii din campia lipsita de piatra. Se poate folosi omiletic deosebirea dintre piatra primita si caramida facuta, dar textul nu osandeste mestesugul caramizii si nici uniformitatea ei."
        ),
        (
            "Deci nu avem aici o multime fara cap; in spatele caramizilor sta un imparat.",
            "Babel fusese pomenit intre cetatile imparatiei lui Nimrod, iar apropierea ii face pe multi sa-l lege de turn. Capitolul 11 nu il numeste insa pe Nimrod si nu spune cine a condus zidirea; de aceea nu asezam un imparat in spatele caramizilor ca fapt dovedit."
        ),
        (
            "Nimrod a calcat tocmai porunca aceasta si a vanat oameni. Asa a ajuns imparat: prin frica.",
            "Unii talcuitori au legat vanatoarea lui de stapanirea asupra oamenilor. Textul nu spune ca Nimrod a vanat oameni si nici cum a ajuns imparat; nu folosim aceasta presupunere ca temelie a explicatiei turnului."
        ),
    ],
}


def main() -> int:
    nefacute = 0
    schimbari = 0
    for nume, perechi in INDREPTARI.items():
        cale = RADACINA / nume
        text = cale.read_text(encoding="utf-8")
        pentru_fisier = 0
        for vechi, nou in perechi:
            if nou in text:
                continue
            numar = text.count(vechi)
            if numar != 1:
                print(f"::warning title=Revizie neaplicata::{nume}: potriviri={numar}: {vechi[:80]}")
                nefacute += 1
                continue
            text = text.replace(vechi, nou, 1)
            schimbari += 1
            pentru_fisier += 1
        if pentru_fisier:
            cale.write_text(text, encoding="utf-8")
            print(f"{nume}: {pentru_fisier} indreptari")
    print(f"Total: {schimbari} indreptari; neaplicate: {nefacute}")
    return 1 if nefacute else 0


if __name__ == "__main__":
    raise SystemExit(main())
