#!/usr/bin/env python3
"""Apply source-confirmed WLC/WEBU repairs to 1CH, 2CH, EST, and NEH.

Every replacement is guarded by the exact inherited Romanian text. The pass
fails before writing anything if a verse is neither inherited nor repaired.
"""

from __future__ import annotations

import hashlib
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs" / "data" / "biblia-emanus"
REPORT = ROOT / "docs" / "biblia-emanus" / "OT-HISTORICAL-EXILE-DIRECT-AUDIT-REPAIRS.json"
AUDIT_ID = "ot-historical-exile-wlc-webu-audit-2026-08-08"

REPAIRS: dict[str, tuple[str, str, str]] = {
    "1CH.2.54": (
        "Fiii lui Salma: Betleem și netofatiții, Atrot-Bet-Ioab, Hați-Hamanahti, țoreiții;",
        "Fiii lui Salma: Betleem, netofatiții, Atrot-Bet-Ioab, jumătate dintre manahatiți și țoreiții;",
        "WEBU și WLC disting jumătatea manahatiților de țoreiți.",
    ),
    "1CH.4.10": (
        "Iaebeț a chemat pe Dumnezeul lui Israel și a zis: „Dacă mă vei binecuvânta și-mi vei întinde hotarele, dacă mâna Ta va fi cu mine și dacă mă vei feri de nenorocire, așa încât să nu fiu în suferință!…”",
        "Iaebeț a chemat pe Dumnezeul lui Israel și a zis: „Dacă mă vei binecuvânta și-mi vei întinde hotarele, dacă mâna Ta va fi cu mine și dacă mă vei feri de nenorocire, ca să nu fiu în suferință!” Dumnezeu i-a dat ceea ce ceruse.",
        "WEBU și WLC afirmă că Dumnezeu i-a dat ceea ce ceruse.",
    ),
    "1CH.6.25": (
        "Fiii lui Elcana: Amasaiși Ahimot;",
        "Fiii lui Elcana: Amasai și Ahimot;",
        "WEBU și WLC păstrează două nume distincte: Amasai și Ahimot.",
    ),
    "1CH.7.31": (
        "Fiii lui Beria: Eber și Malchiel.",
        "Fiii lui Beria: Eber și Malchiel, care a fost tatăl lui Birzait.",
        "WEBU și WLC îl identifică pe Malchiel drept tatăl lui Birzait.",
    ),
    "1CH.11.19": (
        "El a zis: „Să mă ferească Dumnezeul meu să fac una ca aceasta! Să beau eu sângele acestor oameni, care s-au dus cu primejdia vieții lor? Căci cu primejdia vieții lor au adus-o.”",
        "El a zis: „Să mă ferească Dumnezeul meu să fac una ca aceasta! Să beau eu sângele acestor oameni, care s-au dus cu primejdia vieții lor? Căci cu primejdia vieții lor au adus-o.” De aceea n-a vrut s-o bea. Cei trei viteji au făcut aceste lucruri.",
        "WEBU și WLC păstrează refuzul și concluzia despre cei trei viteji.",
    ),
    "1CH.12.18": (
        "Amasai, unul din căpitanii de seamă, a fost apucat de Duhul și a zis: „Suntem cu tine, Davide, și cu tine, fiul lui Isai! Pace, pace ție și pace celor ce te ajută, căci Dumnezeul tău ți-a ajutat!”",
        "Amasai, unul din căpitanii de seamă, a fost apucat de Duhul și a zis: „Suntem cu tine, Davide, și cu tine, fiul lui Isai! Pace, pace ție și pace celor ce te ajută, căci Dumnezeul tău ți-a ajutat!” David i-a primit și i-a pus căpetenii ale cetei.",
        "WEBU și WLC consemnează primirea lor și numirea drept căpetenii.",
    ),
    "1CH.22.5": (
        "David zicea: „Fiul meu Solomon este tânăr și plăpând, și Casa care va fi zidită DOMNULUI trebuie să fie de mare faimă și slavă în toate țările; de aceea vreau să-i pregătesc cele de trebuință pentru zidirea ei.”",
        "David zicea: „Fiul meu Solomon este tânăr și plăpând, și Casa care va fi zidită DOMNULUI trebuie să fie de mare faimă și slavă în toate țările; de aceea vreau să-i pregătesc cele de trebuință pentru zidirea ei.” Astfel David a pregătit din belșug înainte de moartea sa.",
        "WEBU și WLC consemnează pregătirea abundentă făcută înaintea morții.",
    ),
    "1CH.27.20": (
        "al fiilor lui Efraim: Hosea, fiul lui Azazia;",
        "al fiilor lui Efraim: Hosea, fiul lui Azazia; al jumătății seminției lui Manase: Ioel, fiul lui Pedaia;",
        "WEBU și WLC plasează aici căpetenia jumătății seminției lui Manase.",
    ),
    "1CH.27.21": (
        "al jumătății seminției lui Manase: Ioel, fiul lui Pedaia; al jumătății seminției lui Manase din Galaad: Ido, fiul lui Zaharia; al lui Beniamin: Iaasiel, fiul lui Abner;",
        "al jumătății seminției lui Manase din Galaad: Ido, fiul lui Zaharia; al lui Beniamin: Iaasiel, fiul lui Abner;",
        "WEBU și WLC încep versetul cu jumătatea seminției lui Manase din Galaad.",
    ),
    "2CH.1.5": (
        "Tot acolo se afla, înaintea Cortului DOMNULUI, altarul de aramă pe care-l făcuse Bețaleel, fiul lui Uri, fiul lui Hur.",
        "Tot acolo se afla, înaintea Cortului DOMNULUI, altarul de aramă pe care-l făcuse Bețaleel, fiul lui Uri, fiul lui Hur; Solomon și adunarea L-au căutat acolo pe Dumnezeu.",
        "WEBU și WLC consemnează că Solomon și adunarea L-au căutat acolo.",
    ),
    "2CH.7.6": (
        "Preoții stăteau la locul lor, și tot astfel și leviții, cu instrumentele făcute în cinstea DOMNULUI de împăratul David pentru cântarea laudelor DOMNULUI, când i-a însărcinat David să mărească pe DOMNUL, zicând: „Căci îndurarea Lui ține în veac!”",
        "Preoții stăteau la locul lor, și tot astfel și leviții, cu instrumentele făcute în cinstea DOMNULUI de împăratul David pentru cântarea laudelor DOMNULUI, când i-a însărcinat David să mărească pe DOMNUL, zicând: „Căci îndurarea Lui ține în veac!” Preoții sunau din trâmbițe înaintea lor, iar tot Israelul stătea în picioare.",
        "WEBU și WLC păstrează trâmbițele preoților și Israelul în picioare.",
    ),
    "2CH.10.5": (
        "El le-a zis: „Întoarceți-vă la mine după trei zile.”",
        "El le-a zis: „Întoarceți-vă la mine după trei zile.” Și poporul a plecat.",
        "WEBU și WLC consemnează plecarea poporului.",
    ),
    "2CH.10.16": (
        "Când a văzut tot Israelul că împăratul nu-l ascultă, poporul a răspuns împăratului: „Ce parte avem noi cu David? Noi n-avem nicio moștenire cu fiul lui Isai! La corturile tale, Israele! Acum, vezi-ți de casă, Davide!”",
        "Când a văzut tot Israelul că împăratul nu-l ascultă, poporul a răspuns împăratului: „Ce parte avem noi cu David? Noi n-avem nicio moștenire cu fiul lui Isai! La corturile tale, Israele! Acum, vezi-ți de casă, Davide!” Atunci tot Israelul a plecat la corturile lui.",
        "WEBU și WLC consemnează plecarea întregului Israel la corturi.",
    ),
    "2CH.11.4": (
        "„Așa vorbește DOMNUL: „Să nu vă suiți și să nu faceți război împotriva fraților voștri! Fiecare din voi să se întoarcă acasă, căci de la Mine s-a întâmplat lucrul acesta.””",
        "„Așa vorbește DOMNUL: «Să nu vă suiți și să nu faceți război împotriva fraților voștri! Fiecare să se întoarcă acasă, căci de la Mine s-a întâmplat lucrul acesta.»” Ei au ascultat cuvintele DOMNULUI și s-au întors, fără să mai meargă împotriva lui Ieroboam.",
        "WEBU și WLC consemnează ascultarea și întoarcerea oștirii.",
    ),
    "2CH.14.7": (
        "El a zis lui Iuda: „Să zidim aceste cetăți și să le înconjurăm cu ziduri, cu turnuri, cu porți și cu zăvoare; țara este încă a noastră, căci am căutat pe DOMNUL Dumnezeul nostru. L-am căutat, și El ne-a dat odihnă din toate părțile.”",
        "El a zis lui Iuda: „Să zidim aceste cetăți și să le înconjurăm cu ziduri, cu turnuri, cu porți și cu zăvoare; țara este încă a noastră, căci am căutat pe DOMNUL Dumnezeul nostru. L-am căutat, și El ne-a dat odihnă din toate părțile.” Astfel au zidit și au izbutit.",
        "WEBU și WLC afirmă că au zidit și au izbutit.",
    ),
    "2CH.18.19": (
        "Și DOMNUL a zis: „Cine va amăgi pe Ahab, împăratul lui Israel, ca să se suie la Ramot în Galaad și să piară acolo?”",
        "Și DOMNUL a zis: „Cine va amăgi pe Ahab, împăratul lui Israel, ca să se suie la Ramot în Galaad și să piară acolo?” Unul a răspuns într-un fel, iar altul în alt fel.",
        "WEBU și WLC păstrează răspunsurile diferite date în sfat.",
    ),
    "2CH.22.9": (
        "Au căutat pe Ahazia și l-au prins în Samaria, unde se ascunsese. L-au adus la Iehu și l-au omorât. Apoi l-au îngropat, căci ziceau: „Este fiul lui Iosafat, care căuta pe DOMNUL din toată inima lui.”",
        "Au căutat pe Ahazia și l-au prins în Samaria, unde se ascunsese. L-au adus la Iehu și l-au omorât. Apoi l-au îngropat, căci ziceau: „Este fiul lui Iosafat, care căuta pe DOMNUL din toată inima lui.” Casa lui Ahazia nu mai avea putere să păstreze domnia.",
        "WEBU și WLC afirmă că familia lui Ahazia nu putea păstra domnia.",
    ),
    "2CH.24.5": (
        "A strâns pe preoți și pe leviți și le-a zis: „Duceți-vă prin cetățile lui Iuda și strângeți bani din tot Israelul, pe fiecare an, pentru dregerea Casei Dumnezeului vostru. Și grăbiți-vă cu lucrul acesta.”",
        "A strâns pe preoți și pe leviți și le-a zis: „Duceți-vă prin cetățile lui Iuda și strângeți bani din tot Israelul, pe fiecare an, pentru dregerea Casei Dumnezeului vostru. Și grăbiți-vă cu lucrul acesta.” Dar leviții nu s-au grăbit.",
        "WEBU și WLC păstrează negația: leviții nu s-au grăbit.",
    ),
    "2CH.25.18": (
        "Și Ioas, împăratul lui Israel, a trimis să spună lui Amația, împăratul lui Iuda: „Spinul din Liban a trimis să spună cedrului din Liban: „Dă pe fiica ta de nevastă fiului meu!””",
        "Ioas, împăratul lui Israel, a trimis să-i spună lui Amația, împăratul lui Iuda: „Spinul din Liban a trimis să-i spună cedrului din Liban: «Dă-o pe fiica ta de soție fiului meu!» Dar o fiară sălbatică din Liban a trecut și a călcat spinul în picioare.”",
        "WEBU și WLC păstrează fiara care a călcat spinul în picioare.",
    ),
    "2CH.26.23": (
        "Ozia a adormit cu părinții săi. Și l-au îngropat cu părinții săi în ogorul de înmormântare al împăraților, căci ziceau: „Este lepros.”",
        "Ozia a adormit cu părinții săi. Și l-au îngropat cu părinții săi în ogorul de înmormântare al împăraților, căci ziceau: „Este lepros.” Fiul său Iotam a domnit în locul lui.",
        "WEBU și WLC consemnează domnia lui Iotam în locul tatălui său.",
    ),
    "2CH.28.23": (
        "A adus jertfă dumnezeilor Damascului, care-l bătuseră, și a zis: „Fiindcă dumnezeii împăraților Siriei le vin în ajutor, le voi aduce și eu jertfe, ca să-mi ajute.”",
        "A adus jertfă dumnezeilor Damascului, care-l bătuseră, și a zis: „Fiindcă dumnezeii împăraților Siriei le vin în ajutor, le voi aduce și eu jertfe, ca să-mi ajute.” Dar tocmai ei au dus la căderea lui și a întregului Israel.",
        "WEBU și WLC afirmă că acești dumnezei au dus la căderea lui și a Israelului.",
    ),
    "2CH.29.31": (
        "Ezechia a luat atunci cuvântul și a zis: „Acum, după ce v-ați sfințit în slujba DOMNULUI, apropiați-vă, aduceți dobitoacele pentru jertfă și aduceți jertfe de mulțumire la Casa DOMNULUI.”",
        "Ezechia a luat atunci cuvântul și a zis: „Acum, după ce v-ați sfințit în slujba DOMNULUI, apropiați-vă, aduceți dobitoacele pentru jertfă și aduceți jertfe de mulțumire la Casa DOMNULUI.” Adunarea a adus jertfe și daruri de mulțumire, iar toți cei cu inimă binevoitoare au adus arderi de tot.",
        "WEBU și WLC consemnează darurile adunării și arderile de tot voluntare.",
    ),
    "2CH.32.8": (
        "„Cu el este un braț de carne, dar cu noi este DOMNUL Dumnezeul nostru care ne va ajuta și va lupta pentru noi.”",
        "„Cu el este un braț de carne, dar cu noi este DOMNUL Dumnezeul nostru care ne va ajuta și va lupta pentru noi.” Poporul s-a încrezut în cuvintele lui Ezechia, împăratul lui Iuda.",
        "WEBU și WLC consemnează încrederea poporului în cuvintele lui Ezechia.",
    ),
    "2CH.34.15": (
        "Atunci Hilchia a luat cuvântul și a zis logofătului Șafan: „Am găsit cartea Legii în Casa DOMNULUI.”",
        "Atunci Hilchia a luat cuvântul și a zis logofătului Șafan: „Am găsit cartea Legii în Casa DOMNULUI.” Hilchia i-a dat cartea lui Șafan.",
        "WEBU și WLC consemnează predarea cărții lui Șafan.",
    ),
    "2CH.34.18": (
        "Logofătul Șafan a mai spus împăratului: „Preotul Hilchia mi-a dat o carte.”",
        "Logofătul Șafan a mai spus împăratului: „Preotul Hilchia mi-a dat o carte.” Șafan a citit din ea înaintea împăratului.",
        "WEBU și WLC consemnează citirea cărții înaintea împăratului.",
    ),
    "EST.5.14": (
        "Nevasta sa, Zereș, și toți prietenii lui i-au zis: „Să se pregătească o spânzurătoare înaltă de cincizeci de coți, și mâine dimineață cere împăratului ca Mardoheu să fie spânzurat. Apoi vei merge vesel la ospăț cu împăratul.”",
        "Nevasta sa, Zereș, și toți prietenii lui i-au zis: „Să se pregătească o spânzurătoare înaltă de cincizeci de coți, și mâine dimineață cere împăratului ca Mardoheu să fie spânzurat. Apoi vei merge vesel la ospăț cu împăratul.” Lucrul acesta i-a plăcut lui Haman, și a pus să fie făcută spânzurătoarea.",
        "WEBU și WLC consemnează aprobarea lui Haman și construirea spânzurătorii.",
    ),
    "EST.6.3": (
        "Împăratul a zis: „Ce cinste și mărire i s-a făcut lui Mardoheu pentru aceasta?” – „Nu i s-a făcut nimic”",
        "Împăratul a zis: „Ce cinste și mărire i s-a făcut lui Mardoheu pentru aceasta?” Slujitorii împăratului care-l serveau au răspuns: „Nu i s-a făcut nimic.”",
        "WEBU și WLC îi identifică explicit pe slujitorii împăratului drept vorbitori.",
    ),
    "EST.7.8": (
        "Când s-a întors împăratul din grădina casei împărătești în odaia ospățului, a văzut pe Haman că se aruncase spre patul pe care era Estera și i-a zis: „Cum, să mai și silești pe împărăteasă, la mine, în casa împărătească?”",
        "Când s-a întors împăratul din grădina casei împărătești în odaia ospățului, a văzut pe Haman că se aruncase spre patul pe care era Estera și i-a zis: „Cum, să mai și silești pe împărăteasă, la mine, în casa împărătească?” Cuvântul abia ieșise din gura împăratului, când i-au acoperit fața lui Haman.",
        "WEBU și WLC consemnează acoperirea feței lui Haman.",
    ),
    "NEH.1.11": (
        "„Ah! DOAMNE, să ia aminte urechea Ta la rugăciunea robului Tău și la rugăciunea robilor Tăi, care vor să se teamă de Numele Tău! Dă astăzi izbândă robului Tău și fă-l să capete trecere înaintea omului acestuia!”",
        "„Ah! DOAMNE, să ia aminte urechea Ta la rugăciunea robului Tău și la rugăciunea robilor Tăi, care vor să se teamă de Numele Tău! Dă astăzi izbândă robului Tău și fă-l să capete trecere înaintea omului acestuia!” Pe atunci eram paharnicul împăratului.",
        "WEBU și WLC îl identifică pe Neemia drept paharnicul împăratului.",
    ),
    "NEH.2.2": (
        "Împăratul mi-a zis: „Pentru ce ai fața tristă? Totuși nu ești bolnav; nu poate fi decât o întristare a inimii.”",
        "Împăratul mi-a zis: „Pentru ce ai fața tristă? Totuși nu ești bolnav; nu poate fi decât o întristare a inimii.” Atunci m-am temut foarte tare.",
        "WEBU și WLC consemnează teama puternică a lui Neemia.",
    ),
    "NEH.2.8": (
        "„și o scrisoare pentru Asaf, păzitorul pădurii împăratului, ca să-mi dea lemne să fac grinzi pentru porțile cetățuii de lângă casă, pentru zidul cetății și pentru casa în care voi locui.”",
        "„și o scrisoare pentru Asaf, păzitorul pădurii împăratului, ca să-mi dea lemne să fac grinzi pentru porțile cetățuii de lângă casă, pentru zidul cetății și pentru casa în care voi locui.” Împăratul mi-a dat ce cerusem, pentru că mâna cea bună a Dumnezeului meu era peste mine.",
        "WEBU și WLC consemnează aprobarea cererilor datorită mâinii bune a lui Dumnezeu.",
    ),
    "NEH.2.18": (
        "Și le-am istorisit cum mâna cea bună a Dumnezeului meu fusese peste mine și ce cuvinte îmi spusese împăratul. Ei au zis: „Să ne sculăm și să zidim!”",
        "Și le-am istorisit cum mâna cea bună a Dumnezeului meu fusese peste mine și ce cuvinte îmi spusese împăratul. Ei au zis: „Să ne sculăm și să zidim!” Și și-au întărit mâinile pentru lucrarea cea bună.",
        "WEBU și WLC consemnează întărirea mâinilor pentru lucrarea bună.",
    ),
    "NEH.5.7": (
        "Am hotărât să mustru pe cei mari și pe dregători, și le-am zis: „Ce! Voi împrumutați cu camătă fraților voștri?”",
        "Am hotărât să mustru pe cei mari și pe dregători, și le-am zis: „Ce! Voi împrumutați cu camătă fraților voștri?” Apoi am convocat împotriva lor o mare adunare.",
        "WEBU și WLC consemnează convocarea unei mari adunări împotriva lor.",
    ),
    "NEH.5.8": (
        "și le-am zis: „Noi am răscumpărat, după puterea noastră, pe frații noștri iudei vânduți neamurilor; și voi să vindeți pe frații voștri? Și încă nouă să ne fie vânduți?”",
        "și le-am zis: „Noi am răscumpărat, după puterea noastră, pe frații noștri iudei vânduți neamurilor; și voi să vindeți pe frații voștri? Și încă nouă să ne fie vânduți?” Ei au tăcut și n-au găsit nimic de răspuns.",
        "WEBU și WLC consemnează tăcerea și lipsa unui răspuns.",
    ),
    "NEH.5.13": (
        "Și mi-am scuturat mantaua, zicând: „Așa să scuture Dumnezeu afară din Casa Lui și de averile lui pe orice om care nu-și va ține cuvântul, și așa să fie scuturat omul acela, și lăsat cu mâinile goale!” Toată adunarea a zis: „Amin.”",
        "Și mi-am scuturat mantaua, zicând: „Așa să scuture Dumnezeu afară din Casa Lui și de averile lui pe orice om care nu-și va ține cuvântul, și așa să fie scuturat omul acela, și lăsat cu mâinile goale!” Toată adunarea a zis: „Amin!” și L-a lăudat pe DOMNUL. Poporul a făcut după această făgăduință.",
        "WEBU și WLC păstrează lauda adusă DOMNULUI și împlinirea făgăduinței.",
    ),
    "NEH.6.2": (
        "Atunci Sanbalat și Gheșem au trimis să-mi spună: „Vino și să ne întâlnim în satele din valea Ono.”",
        "Atunci Sanbalat și Gheșem au trimis să-mi spună: „Vino și să ne întâlnim în satele din valea Ono.” Dar ei plănuiau să-mi facă rău.",
        "WEBU și WLC afirmă intenția lor de a-i face rău lui Neemia.",
    ),
    "NEH.6.9": (
        "Toți oamenii aceștia voiau să ne înfricoșeze și își ziceau: „Li se va muia inima, și lucrarea nu se va face.”",
        "Toți oamenii aceștia voiau să ne înfricoșeze și își ziceau: „Li se va muia inima, și lucrarea nu se va face.” Dar acum, întărește-mi mâinile!",
        "WEBU și WLC păstrează rugăciunea finală pentru întărirea mâinilor.",
    ),
    "NEH.7.73": (
        "Preoții și leviții, ușierii, cântăreții, oamenii din popor, slujitorii Templului și tot Israelul s-au așezat în cetățile lor.",
        "Preoții și leviții, ușierii, cântăreții, oamenii din popor, slujitorii Templului și tot Israelul s-au așezat în cetățile lor. Când a venit luna a șaptea, fiii lui Israel erau în cetățile lor.",
        "WEBU și WLC păstrează tranziția temporală la luna a șaptea.",
    ),
    "NEH.8.9": (
        "Dregătorul Neemia, preotul și cărturarul Ezra și leviții care învățau pe popor au zis întregului popor: „Ziua aceasta este închinată DOMNULUI Dumnezeului vostru; să nu vă bociți și să nu plângeți!”",
        "Dregătorul Neemia, preotul și cărturarul Ezra și leviții care învățau pe popor au zis întregului popor: „Ziua aceasta este închinată DOMNULUI Dumnezeului vostru; să nu vă bociți și să nu plângeți!” Căci tot poporul plângea când a auzit cuvintele Legii.",
        "WEBU și WLC explică faptul că tot poporul plângea la auzirea Legii.",
    ),
    "NEH.12.28": (
        "Fiii cântăreților s-au strâns din împrejurimile Ierusalimului, din satele slujitorilor Templului,",
        "Fiii cântăreților s-au strâns din câmpia din jurul Ierusalimului și din satele netofatiților,",
        "WEBU și WLC numesc explicit câmpia și satele netofatiților.",
    ),
    "NEH.13.21": (
        "I-am mustrat și le-am zis: „Pentru ce stați noaptea înaintea zidului? Dacă veți mai face încă o dată lucrul acesta, voi pune mâna pe voi.”",
        "I-am mustrat și le-am zis: „Pentru ce stați noaptea înaintea zidului? Dacă veți mai face încă o dată lucrul acesta, voi pune mâna pe voi.” Din acel timp n-au mai venit în ziua Sabatului.",
        "WEBU și WLC păstrează negația: negustorii n-au mai venit în Sabat.",
    ),
}


def digest(verses: list[dict[str, object]]) -> str:
    payload = "\n".join(f"{verse['number']}\t{verse['text']}" for verse in verses)
    return "sha256:" + hashlib.sha256(payload.encode("utf-8")).hexdigest()


def rendered_json(value: object) -> str:
    return json.dumps(value, ensure_ascii=False, indent=2) + "\n"


def write_if_changed(path: Path, value: object) -> bool:
    rendered = rendered_json(value)
    if path.exists() and path.read_text(encoding="utf-8") == rendered:
        return False
    path.write_text(rendered, encoding="utf-8")
    return True


def main() -> None:
    documents: dict[Path, dict[str, object]] = {}
    changed_references: list[str] = []
    mismatches: list[str] = []

    # Validate the entire pass before writing any chapter.
    for reference, (expected, replacement, _reason) in REPAIRS.items():
        book, chapter, number = reference.split(".")
        path = DATA / f"{book}.{chapter}.json"
        document = documents.setdefault(path, json.loads(path.read_text(encoding="utf-8")))
        verse = next(item for item in document["verses"] if item["number"] == int(number))
        if verse["text"] == replacement:
            continue
        if verse["text"] != expected:
            mismatches.append(reference)
            continue
        verse["text"] = replacement
        changed_references.append(reference)

    if mismatches:
        raise RuntimeError(
            "textul de bază nu mai corespunde auditului istoric/exil: "
            + ", ".join(mismatches)
        )

    written_chapters: list[str] = []
    for path, document in sorted(documents.items()):
        audit = document.setdefault("audit", {})
        audit["textDigest"] = digest(document["verses"])
        history = audit.setdefault("repairHistory", [])
        if not any(item.get("id") == AUDIT_ID for item in history):
            history.append({
                "id": AUDIT_ID,
                "scope": "corecții confirmate direct în WLC/OSHB și WEBU fixate",
                "verseNumbers": sorted(
                    int(reference.split(".")[-1])
                    for reference in REPAIRS
                    if path.name == ".".join(reference.split(".")[:2]) + ".json"
                ),
            })
        if write_if_changed(path, document):
            written_chapters.append(path.name)

    report = {
        "repairPass": AUDIT_ID,
        "findingCount": 40,
        "count": len(REPAIRS),
        "changes": [
            {
                "reference": reference,
                "previous": expected,
                "replacement": replacement,
                "reason": reason,
            }
            for reference, (expected, replacement, reason) in REPAIRS.items()
        ],
    }
    report_written = write_if_changed(REPORT, report)
    print(json.dumps({
        "changedVerses": changed_references,
        "writtenChapters": written_chapters,
        "reportWritten": report_written,
    }, ensure_ascii=False))


if __name__ == "__main__":
    main()
