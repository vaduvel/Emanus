#!/usr/bin/env python3
"""Apply source-confirmed WLC/WEBU repairs for the Major Prophets.

Every replacement is guarded by the exact inherited text. A changed source
document therefore fails closed instead of receiving a stale audit repair.
"""

from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path

from ot_repair5_common import parse_usfm_zip


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs" / "data" / "biblia-emanus"
SOURCES = ROOT / "docs" / "data" / "biblia-emanus-candidates" / "sources"
REPORT = ROOT / "docs" / "biblia-emanus" / "OT-MAJOR-PROPHETS-DIRECT-AUDIT-REPAIRS.json"
AUDIT_ID = "ot-major-prophets-wlc-webu-direct-audit-2026-08-08"
SOURCE_FILES = {
    "WEBU": (
        SOURCES / "engwebp_usfm.zip",
        "2287d3d5b23e7badf09d81cb3a02528f8b6bd94977b1cbfb8038008b2df1f67b",
    ),
    "WLC": (
        SOURCES / "hebwlc_usfm.zip",
        "a177507e7e85fd72fc36eb5de8c6a32648c5ec41a9363be63213501f5487432c",
    ),
}

REPAIRS: dict[str, tuple[str, str, str]] = {
    "ISA.2.3": (
        "Popoarele se vor duce cu grămada la el și vor zice: „Veniți să ne suim la muntele DOMNULUI, la Casa Dumnezeului lui Iacov, ca să ne învețe căile Lui, și să umblăm pe cărările Lui.”",
        "Popoarele se vor duce cu grămada la el și vor zice: „Veniți să ne suim la muntele DOMNULUI, la Casa Dumnezeului lui Iacov, ca să ne învețe căile Lui, și să umblăm pe cărările Lui.” Căci din Sion va ieși Legea, și din Ierusalim cuvântul DOMNULUI.",
        "Legea din Sion și cuvântul DOMNULUI din Ierusalim sunt explicite în WLC și WEBU.",
    ),
    "ISA.20.2": (
        "în vremea aceea DOMNUL a vorbit lui Isaia, fiul lui Amoț, și i-a zis: „Du-te, dezleagă-ți sacul de pe coapse și scoate-ți încălțămintea din picioare!”",
        "în vremea aceea DOMNUL a vorbit lui Isaia, fiul lui Amoț, și i-a zis: „Du-te, dezleagă-ți sacul de pe coapse și scoate-ți încălțămintea din picioare!” Isaia a făcut așa și a umblat gol și desculț.",
        "Împlinirea poruncii și umblarea goală și desculță fuseseră omise.",
    ),
    "ISA.25.2": (
        "Căci ai prefăcut cetatea (Babilon) într-un morman de pietre, cetățuia cea tare, într-o grămadă de dărâmături; cetatea cea mare a străinilor este nimicită, și niciodată nu va mai fi zidită.",
        "Căci ai prefăcut cetatea într-un morman de pietre, cetățuia cea tare, într-o grămadă de dărâmături; cetatea cea mare a străinilor este nimicită, și niciodată nu va mai fi zidită.",
        "Numele editorial «Babilon» nu apare în WLC sau WEBU.",
    ),
    "ISA.28.12": (
        "El îi zicea: „Iată odihna; lăsați pe cel ostenit să se odihnească; iată locul de odihnă!”",
        "El îi zicea: „Iată odihna; lăsați pe cel ostenit să se odihnească; iată locul de odihnă!” Dar ei n-au vrut să asculte.",
        "Refuzul explicit de a asculta fusese omis.",
    ),
    "ISA.30.15": (
        "Căci așa vorbește DOMNUL Dumnezeu, Sfântul lui Israel: „În liniște și odihnă va fi mântuirea voastră, în seninătate și încredere va fi tăria voastră.”",
        "Căci așa vorbește DOMNUL Dumnezeu, Sfântul lui Israel: „În liniște și odihnă va fi mântuirea voastră, în seninătate și încredere va fi tăria voastră.” Dar voi n-ați vrut.",
        "Refuzul «voi n-ați vrut» este explicit în WLC și WEBU.",
    ),
    "ISA.30.16": (
        "Ci ați zis: „Nu! Ci vom fugi pe cai!” – De aceea veți și fugi! – „Vom călări pe cai iuți!”",
        "Ci ați zis: „Nu! Ci vom fugi pe cai!” – De aceea veți și fugi! – „Vom călări pe cai iuți!” De aceea, cei ce vă urmăresc vor fi iuți.",
        "Consecința despre iuțeala urmăritorilor fusese omisă.",
    ),
    "ISA.33.11": (
        "Ați zămislit fân și nașteți paie de miriște; suflarea voastră de mânie împotriva Ierusalimului este un foc care pe voi înșivă vă va arde de tot.",
        "Ați zămislit fân și nașteți paie de miriște; suflarea voastră este un foc care pe voi înșivă vă va arde de tot.",
        "Adaosul «de mânie împotriva Ierusalimului» nu apare în WLC sau WEBU.",
    ),
    "ISA.37.9": (
        "Atunci împăratul Asiriei a primit o veste despre Tirhaca, împăratul Etiopiei, prin care i se spunea: „El a pornit să-ți facă război.”",
        "Atunci împăratul Asiriei a primit o veste despre Tirhaca, împăratul Etiopiei, prin care i se spunea: „El a pornit să-ți facă război.” Când a auzit aceasta, a trimis soli la Ezechia, zicând:",
        "Trimiterea solilor la Ezechia fusese omisă.",
    ),
    "ISA.41.7": (
        "Lemnarul îmbărbătează pe argintar; cel ce lustruiește cu ciocanul îmbărbătează pe cel ce bate pe nicovală, zicând despre îmbinare: „Este bună!”",
        "Lemnarul îmbărbătează pe argintar; cel ce lustruiește cu ciocanul îmbărbătează pe cel ce bate pe nicovală, zicând despre îmbinare: „Este bună!” Apoi întărește chipul cu cuie, ca să nu se clatine.",
        "Fixarea cu cuie ca să nu se clatine fusese omisă.",
    ),
    "ISA.44.5": (
        "Unul va zice: „Eu sunt al DOMNULUI!” Altul se va numi cu numele lui Iacov; iar altul va scrie cu mâna lui: „Al DOMNULUI sunt!”",
        "Unul va zice: „Eu sunt al DOMNULUI!” Altul se va numi cu numele lui Iacov; iar altul va scrie cu mâna lui: „Al DOMNULUI sunt!” și se va numi cu numele lui Israel.",
        "Numirea finală cu numele lui Israel fusese omisă.",
    ),
    "ISA.45.19": (
        "Eu n-am vorbit în ascuns, într-un colț întunecos al pământului. Eu n-am zis seminței lui Iacov: „Căutați-Mă în zadar!”",
        "Eu n-am vorbit în ascuns, într-un colț întunecos al pământului. Eu n-am zis seminței lui Iacov: „Căutați-Mă în zadar!” Eu, DOMNUL, vorbesc dreptatea și vestesc lucruri drepte.",
        "Afirmația DOMNULUI despre dreptate și lucrurile drepte fusese omisă.",
    ),
    "ISA.58.3": (
        "„La ce ne folosește să postim” – zic ei – „dacă Tu nu vezi? La ce să ne chinuim sufletul, dacă Tu nu ții seama de lucrul acesta?”",
        "„La ce ne folosește să postim” – zic ei – „dacă Tu nu vezi? La ce să ne chinuim sufletul, dacă Tu nu ții seama de lucrul acesta?” Iată, în ziua postului vostru vă vedeți de plăceri și îi asupriți pe toți lucrătorii voștri.",
        "Plăcerile și asuprirea lucrătorilor în ziua postului fuseseră omise.",
    ),
    "ISA.62.4": (
        "Nu te vor mai numi „Părăsită” și nu-ți vor mai numi pământul un pustiu, ci te vor numi: „Plăcerea Mea este în ea”, și țara ta o vor numi „Beula”, „Măritată”",
        "Nu te vor mai numi „Părăsită” și nu-ți vor mai numi pământul un pustiu, ci te vor numi: „Plăcerea Mea este în ea”, și țara ta o vor numi „Beula”, „Măritată”, căci DOMNUL Își găsește plăcerea în tine, și țara ta va fi măritată.",
        "Motivarea prin plăcerea DOMNULUI și căsătorirea țării fusese omisă.",
    ),
    "ISA.63.8": (
        "El a zis: „Negreșit, ei sunt poporul Meu, niște copii care nu vor fi necredincioși!”",
        "El a zis: „Negreșit, ei sunt poporul Meu, niște copii care nu vor fi necredincioși!” Și El a fost Mântuitorul lor.",
        "Concluzia că El a fost Mântuitorul lor fusese omisă.",
    ),
    "ISA.65.1": (
        "„Eram gata să răspund celor ce nu întrebau de Mine, eram gata să fiu găsit de cei ce nu Mă căutau; am zis: „Iată-Mă, iată-Mă!””",
        "„Eram gata să răspund celor ce nu întrebau de Mine, eram gata să fiu găsit de cei ce nu Mă căutau; am zis: „Iată-Mă, iată-Mă!” unui neam care nu era chemat cu Numele Meu.”",
        "Neamul care nu era chemat cu Numele DOMNULUI fusese omis.",
    ),
    "ISA.65.15": (
        "Veți lăsa numele vostru ca blestem aleșilor Mei; și anume: „DOMNUL Dumnezeu vă va omorî”",
        "Veți lăsa numele vostru ca blestem aleșilor Mei; și anume: „DOMNUL Dumnezeu vă va omorî”, iar slujitorilor Săi le va da un alt nume.",
        "Numele nou dat slujitorilor fusese omis.",
    ),
    "JER.3.19": (
        "Eu ziceam: „Cum să te pun printre copiii Mei și să-ți dau o țară plăcută, o moștenire, podoabă între podoabele neamurilor?” Mă gândeam că Mă vei chema: „Tată!”",
        "Eu ziceam: „Cum să te pun printre copiii Mei și să-ți dau o țară plăcută, o moștenire, podoabă între podoabele neamurilor?” Mă gândeam că Mă vei chema: „Tată!” și că nu te vei abate de la Mine.",
        "Negația despre abaterea de la DOMNUL fusese omisă.",
    ),
    "JER.6.14": (
        "Leagă în chip ușuratic rana fiicei poporului Meu, zicând: „Pace! Pace!”",
        "Leagă în chip ușuratic rana fiicei poporului Meu, zicând: „Pace! Pace!”, dar pace nu este.",
        "Negația «pace nu este» fusese omisă.",
    ),
    "JER.7.10": (
        "Și apoi veniți să vă înfățișați înaintea Mea, în Casa aceasta peste care este chemat Numele Meu, și ziceți: „Suntem izbăviți!”",
        "Și apoi veniți să vă înfățișați înaintea Mea, în Casa aceasta peste care este chemat Numele Meu, și ziceți: „Suntem izbăviți!”, ca să săvârșiți toate aceste urâciuni?",
        "Scopul interogativ despre săvârșirea urâciunilor fusese omis.",
    ),
    "JER.8.6": (
        "Căci Eu sunt cu luare aminte și aud că ei nu vorbesc cum ar trebui; niciunul nu se căiește de răutatea lui și nu zice: „Ce am făcut?”",
        "Căci Eu sunt cu luare aminte și aud că ei nu vorbesc cum ar trebui; niciunul nu se căiește de răutatea lui și nu zice: „Ce am făcut?” Toți se întorc la alergarea lor, ca un cal care se avântă în luptă.",
        "Întoarcerea tuturor la alergarea lor, ca un cal în luptă, fusese omisă.",
    ),
    "JER.8.11": (
        "Leagă în chip ușuratic rana fiicei poporului Meu, zicând: „Pace! Pace!”",
        "Leagă în chip ușuratic rana fiicei poporului Meu, zicând: „Pace! Pace!”, dar pace nu este.",
        "Negația «pace nu este» fusese omisă.",
    ),
    "JER.14.15": (
        "De aceea așa vorbește DOMNUL despre prorocii care măcar că nu i-am trimis Eu, prorocesc totuși în Numele Meu și zic: „Nu va fi nici sabie, nici foamete în țara aceasta.”",
        "De aceea așa vorbește DOMNUL despre prorocii care măcar că nu i-am trimis Eu, prorocesc totuși în Numele Meu și zic: „Nu va fi nici sabie, nici foamete în țara aceasta.” Prorocii aceia vor fi nimiciți de sabie și de foamete.",
        "Nimicirea prorocilor prin sabie și foamete fusese omisă.",
    ),
    "JER.16.15": (
        "Ci se va zice: „Viu este DOMNUL care a scos pe copiii lui Israel din țara de la miazănoapte și din toate țările unde-i izgonise!”",
        "Ci se va zice: „Viu este DOMNUL care a scos pe copiii lui Israel din țara de la miazănoapte și din toate țările unde-i izgonise!” Îi voi aduce înapoi în țara lor, pe care am dat-o părinților lor.",
        "Aducerea înapoi în țara dată părinților fusese omisă.",
    ),
    "JER.20.3": (
        "Dar a doua zi, Pașhur a scos pe Ieremia din temniță. Și Ieremia i-a zis: „DOMNUL nu te mai numește Pașhur”",
        "Dar a doua zi, Pașhur a scos pe Ieremia din temniță. Și Ieremia i-a zis: „DOMNUL nu te mai numește Pașhur, ci Magor-Misabib!”",
        "Numele nou Magor-Misabib fusese omis.",
    ),
    "JER.20.15": (
        "Blestemat să fie omul care a adus vestea aceasta tatălui meu: „Ți s-a născut un copil de parte bărbătească”",
        "Blestemat să fie omul care a adus vestea aceasta tatălui meu: „Ți s-a născut un copil de parte bărbătească” și l-a umplut de bucurie!",
        "Bucuria mare produsă tatălui fusese omisă.",
    ),
    "JER.23.34": (
        "Și pe prorocul, pe preotul sau pe acela din popor care va zice: „O amenințare a DOMNULUI”",
        "Și pe prorocul, pe preotul sau pe acela din popor care va zice: „O amenințare a DOMNULUI”, îl voi pedepsi pe omul acela și casa lui.",
        "Pedepsirea omului și a casei lui fusese omisă.",
    ),
    "JER.26.9": (
        "„Pentru ce prorocești în Numele DOMNULUI și zici: „Casa aceasta va ajunge ca Silo, și cetatea aceasta va fi pustiită și lipsită de locuitori”?”",
        "„Pentru ce prorocești în Numele DOMNULUI și zici: „Casa aceasta va ajunge ca Silo, și cetatea aceasta va fi pustiită și lipsită de locuitori”?” Tot poporul s-a strâns în jurul lui Ieremia în Casa DOMNULUI.",
        "Strângerea poporului în jurul lui Ieremia în Casa DOMNULUI fusese omisă.",
    ),
    "JER.27.16": (
        "Am vorbit și preoților și întregului popor și le-am spus: „Așa vorbește DOMNUL: „N-ascultați de cuvintele prorocilor voștri care vă prorocesc și zic: „Iată că uneltele Casei DOMNULUI vor fi aduse în curând din Babilon!”””",
        "Am vorbit și preoților și întregului popor și le-am spus: „Așa vorbește DOMNUL: „N-ascultați de cuvintele prorocilor voștri care vă prorocesc și zic: „Iată că uneltele Casei DOMNULUI vor fi aduse în curând din Babilon!”” Căci ei vă prorocesc o minciună.”",
        "Afirmația că prorocii prorocesc o minciună fusese omisă.",
    ),
    "JER.32.8": (
        "Și Hanameel, fiul unchiului meu, a venit la mine, după cuvântul DOMNULUI, în curtea temniței și mi-a zis: „Cumpără ogorul meu care este la Anatot, în țara lui Beniamin, căci tu ai drept de moștenire și de răscumpărare, cumpără-l!”",
        "Și Hanameel, fiul unchiului meu, a venit la mine, după cuvântul DOMNULUI, în curtea temniței și mi-a zis: „Cumpără ogorul meu care este la Anatot, în țara lui Beniamin, căci tu ai drept de moștenire și de răscumpărare, cumpără-l!” Atunci am cunoscut că acesta era cuvântul DOMNULUI.",
        "Recunoașterea cuvântului DOMNULUI fusese omisă.",
    ),
    "JER.35.15": (
        "V-am trimis pe toți slujitorii Mei prorocii, i-am trimis întruna la voi să vă spună: „Întoarceți-vă fiecare de la calea voastră cea rea, îndreptați-vă faptele, nu mergeți după alți dumnezei ca să le slujiți, și veți rămâne în țara pe care v-am dat-o vouă și părinților voștri!”",
        "V-am trimis pe toți slujitorii Mei prorocii, i-am trimis întruna la voi să vă spună: „Întoarceți-vă fiecare de la calea voastră cea rea, îndreptați-vă faptele, nu mergeți după alți dumnezei ca să le slujiți, și veți rămâne în țara pe care v-am dat-o vouă și părinților voștri!” Dar nu v-ați plecat urechea și nu M-ați ascultat.",
        "Cele două negații despre ureche și ascultare fuseseră omise.",
    ),
    "JER.36.14": (
        "Atunci toate căpeteniile au trimis la Baruc pe Iehudi, fiul lui Netania, fiul lui Șelemia, fiul lui Cuși, să-i spună: „Ia în mână cartea din care ai citit în auzul poporului și vino!”",
        "Atunci toate căpeteniile au trimis la Baruc pe Iehudi, fiul lui Netania, fiul lui Șelemia, fiul lui Cuși, să-i spună: „Ia în mână cartea din care ai citit în auzul poporului și vino!” Baruc, fiul lui Neria, a luat cartea în mână și a venit la ei.",
        "Luarea cărții și venirea lui Baruc fuseseră omise.",
    ),
    "JER.37.9": (
        "Așa vorbește DOMNUL: „Nu vă înșelați zicând: „Haldeii se vor depărta de la noi!””",
        "Așa vorbește DOMNUL: „Nu vă înșelați zicând: „Haldeii se vor depărta de la noi!”, căci nu se vor depărta.”",
        "Negația că haldeii nu se vor depărta fusese omisă.",
    ),
    "JER.38.12": (
        "Ebed-Melec, etiopianul, a zis lui Ieremia: „Pune aceste petice purtate și aceste zdrențe sub subsuori, sub funii.”",
        "Ebed-Melec, etiopianul, a zis lui Ieremia: „Pune aceste petice purtate și aceste zdrențe sub subsuori, sub funii.” Ieremia a făcut așa.",
        "Împlinirea poruncii de către Ieremia fusese omisă.",
    ),
    "JER.40.5": (
        "Însă fiindcă el zăbovea să răspundă: „Întoarce-te”, a adăugat el, „la Ghedalia, fiul lui Ahicam, fiul lui Șafan, pe care l-a pus împăratul Babilonului peste cetățile lui Iuda și rămâi cu el în mijlocul poporului; sau du-te oriunde vei vrea să te duci!”",
        "Însă fiindcă el zăbovea să răspundă: „Întoarce-te”, a adăugat el, „la Ghedalia, fiul lui Ahicam, fiul lui Șafan, pe care l-a pus împăratul Babilonului peste cetățile lui Iuda și rămâi cu el în mijlocul poporului; sau du-te oriunde vei vrea să te duci!” Căpetenia străjerilor i-a dat hrană și un dar și i-a dat drumul.",
        "Hrana, darul și eliberarea date de căpetenia străjerilor fuseseră omise.",
    ),
    "JER.40.14": (
        "și i-au zis: „Știi că Baalis, împăratul amoniților, a însărcinat pe Ismael, fiul lui Netania, să te omoare?”",
        "și i-au zis: „Știi că Baalis, împăratul amoniților, a însărcinat pe Ismael, fiul lui Netania, să te omoare?” Dar Ghedalia, fiul lui Ahicam, nu i-a crezut.",
        "Negația despre necredința lui Ghedalia fusese omisă.",
    ),
    "JER.41.8": (
        "Dar s-au găsit printre ei zece oameni care au zis lui Ismael: „Nu ne omorî, căci mai avem merinde ascunsă în câmp: grâu, orz, untdelemn și miere!”",
        "Dar s-au găsit printre ei zece oameni care au zis lui Ismael: „Nu ne omorî, căci mai avem merinde ascunsă în câmp: grâu, orz, untdelemn și miere!” Atunci el s-a oprit și nu i-a omorât împreună cu frații lor.",
        "Oprirea lui Ismael și neuciderea celor zece fuseseră omise.",
    ),
    "JER.44.25": (
        "Așa vorbește DOMNUL Dumnezeul lui Israel: „Voi și nevestele voastre ați mărturisit cu gurile voastre și ați împlinit cu mâinile voastre ce spuneți: „Vrem să împlinim juruințele pe care le-am făcut, să aducem tămâie împărătesei cerului și să-i turnăm jertfe de băutură!””",
        "Așa vorbește DOMNUL Dumnezeul lui Israel: „Voi și nevestele voastre ați mărturisit cu gurile voastre și ați împlinit cu mâinile voastre ce spuneți: „Vrem să împlinim juruințele pe care le-am făcut, să aducem tămâie împărătesei cerului și să-i turnăm jertfe de băutură!” Împliniți-vă, deci, juruințele și duceți-le la capăt!”",
        "Imperativele despre împlinirea juruințelor apar la finalul versetului 25.",
    ),
    "JER.44.26": (
        "De aceea, acum, după ce v-ați împlinit juruințele și v-ați înfăptuit făgăduințele, ascultați cuvântul DOMNULUI, voi toți cei din Iuda care locuiți în țara Egiptului: „Iată, jur pe Numele Meu cel mare, zice DOMNUL, că Numele Meu nu va mai fi chemat de gura niciunuia din oamenii lui Iuda, și în toată țara Egiptului niciunul nu va zice: „Viu este DOMNUL Dumnezeu!””",
        "De aceea, ascultați cuvântul DOMNULUI, voi toți cei din Iuda care locuiți în țara Egiptului: „Iată, jur pe Numele Meu cel mare, zice DOMNUL, că Numele Meu nu va mai fi chemat de gura niciunuia din oamenii lui Iuda, și în toată țara Egiptului niciunul nu va zice: „Viu este DOMNUL Dumnezeu!””",
        "Clauza despre împlinirea juruințelor aparține versetului 25, nu începutului versetului 26.",
    ),
    "JER.48.47": (
        "„Dar în vremurile de apoi, voi aduce înapoi pe prinșii de război ai Moabului, zice DOMNUL.”",
        "„Dar în vremurile de apoi, voi aduce înapoi pe prinșii de război ai Moabului, zice DOMNUL.” Până aici este judecata Moabului.",
        "Colofonul judecății Moabului fusese omis.",
    ),
    "JER.51.64": (
        "și să zici: „Așa va fi înecat Babilonul și nu se va mai ridica din nenorocirile pe care le voi aduce asupra lui; vor cădea sleiți de puteri!”",
        "și să zici: „Așa va fi înecat Babilonul și nu se va mai ridica din nenorocirile pe care le voi aduce asupra lui; vor cădea sleiți de puteri!” Până aici sunt cuvintele lui Ieremia.",
        "Colofonul cuvintelor lui Ieremia fusese omis.",
    ),
    "EZK.3.3": (
        "El mi-a zis: „Fiul omului, hrănește-ți trupul și umple-ți măruntaiele cu sulul acesta pe care ți-l dau!”",
        "El mi-a zis: „Fiul omului, hrănește-ți trupul și umple-ți măruntaiele cu sulul acesta pe care ți-l dau!” L-am mâncat și în gura mea a fost dulce ca mierea.",
        "Mâncarea sulului și dulceața lui ca mierea fuseseră omise.",
    ),
    "EZK.9.6": (
        "„Ucideți și nimiciți pe bătrâni, pe tineri, pe fecioare, pe copii și pe femei; dar să nu vă atingeți de niciunul din cei ce au semnul pe frunte! Începeți însă cu Locașul Meu cel Sfânt!”",
        "„Ucideți și nimiciți pe bătrâni, pe tineri, pe fecioare, pe copii și pe femei; dar să nu vă atingeți de niciunul din cei ce au semnul pe frunte! Începeți însă cu Locașul Meu cel Sfânt!” Și au început cu bătrânii care erau înaintea Casei.",
        "Începerea cu bătrânii dinaintea Casei fusese omisă.",
    ),
    "EZK.10.2": (
        "Și DOMNUL a zis omului aceluia îmbrăcat în haine de in: „Vâră-te între roțile de sub heruvimi, umple-ți mâinile cu cărbunii aprinși care sunt între heruvimi și împrăștie-i peste cetate!”",
        "Și DOMNUL a zis omului aceluia îmbrăcat în haine de in: „Vâră-te între roțile de sub heruvimi, umple-ți mâinile cu cărbunii aprinși care sunt între heruvimi și împrăștie-i peste cetate!” Și el a intrat sub ochii mei.",
        "Intrarea omului sub ochii prorocului fusese omisă.",
    ),
    "EZK.13.7": (
        "Nu sunt înșelătoare vedeniile pe care le aveți și nu sunt mincinoase prorociile pe care le rostiți? Voi ziceți: „Așa vorbește DOMNUL!”",
        "Nu sunt înșelătoare vedeniile pe care le aveți și nu sunt mincinoase prorociile pe care le rostiți? Voi ziceți: „Așa vorbește DOMNUL!”, dar Eu n-am vorbit.",
        "Negația DOMNULUI «Eu n-am vorbit» fusese omisă.",
    ),
    "EZK.20.29": (
        "Eu i-am întrebat: „Ce sunt aceste înălțimi la care vă duceți?” De aceea li s-a dat numele de „înălțimi”",
        "Eu i-am întrebat: „Ce sunt aceste înălțimi la care vă duceți?” De aceea li s-a dat numele de „înălțimi” până în ziua de azi.",
        "Durata «până în ziua de azi» fusese omisă.",
    ),
    "EZK.22.28": (
        "Prorocii lui au pentru ei tencuieli de ipsos, vedenii înșelătoare, prorocii mincinoase. Ei zic: „Așa vorbește DOMNUL Dumnezeu!”",
        "Prorocii lui au pentru ei tencuieli de ipsos, vedenii înșelătoare, prorocii mincinoase. Ei zic: „Așa vorbește DOMNUL Dumnezeu!”, dar DOMNUL n-a vorbit.",
        "Negația că DOMNUL n-a vorbit fusese omisă.",
    ),
    "EZK.28.2": (
        "„Fiul omului, spune voievodului Tirului: „Așa vorbește DOMNUL Dumnezeu: „Pentru că ți s-a îngâmfat inima și ai zis: „Eu sunt Dumnezeu și șed pe scaunul de domnie al lui Dumnezeu în mijlocul mărilor””””",
        "„Fiul omului, spune voievodului Tirului: „Așa vorbește DOMNUL Dumnezeu: „Pentru că ți s-a îngâmfat inima și ai zis: „Eu sunt Dumnezeu și șed pe scaunul de domnie al lui Dumnezeu în mijlocul mărilor”, totuși ești om, nu Dumnezeu, chiar dacă îți socotești inima ca inima lui Dumnezeu.”””",
        "Contrastul că voievodul este om, nu Dumnezeu, fusese omis.",
    ),
    "EZK.35.10": (
        "Pentru că ai zis: „Aceste două neamuri și aceste două țări vor fi ale mele și le vom lua în stăpânire!”",
        "Pentru că ai zis: „Aceste două neamuri și aceste două țări vor fi ale mele și le vom lua în stăpânire!”, deși DOMNUL era acolo.",
        "Prezența DOMNULUI acolo fusese omisă.",
    ),
    "EZK.40.14": (
        "A măsurat tinda porții curții, și a găsit douăzeci de coți; tinda dădea într-o curte, de jur împrejurul porții.",
        "A măsurat tinda porții curții, și a găsit șaizeci de coți; tinda dădea într-o curte, de jur împrejurul porții.",
        "WLC și WEBU au șaizeci de coți, nu douăzeci.",
    ),
    "EZK.40.47": (
        "A măsurat curtea, care era în patru colțuri, lungă de o sută de coți. Altarul era înaintea casei.",
        "A măsurat curtea, lungă de o sută de coți și lată de o sută de coți, în patru colțuri. Altarul era înaintea casei.",
        "Lățimea de o sută de coți fusese omisă.",
    ),
    "EZK.40.48": (
        "M-a dus în tinda casei. A măsurat stâlpii tindei, și a găsit cinci coți de o parte și cinci coți de cealaltă. Lățimea porții era de paisprezece coți, iar peretele de pe laturile porții era de trei coți de o parte și de trei coți de cealaltă.",
        "M-a dus în tinda casei. A măsurat stâlpii tindei, și a găsit cinci coți de o parte și cinci coți de cealaltă. Lățimea porții era de trei coți de o parte și de trei coți de cealaltă.",
        "Lățimea editorială de paisprezece coți nu apare în WLC sau WEBU; sursa are trei coți de fiecare parte.",
    ),
    "EZK.40.49": (
        "Tinda avea o lungime de douăzeci de coți și o lățime de doisprezece coți; te suiai la ea pe zece trepte. Lângă stâlpi mai erau și alți stâlpi, unul de o parte și altul de alta.",
        "Tinda avea o lungime de douăzeci de coți și o lățime de unsprezece coți; te suiai la ea pe trepte. Lângă stâlpi mai erau și alți stâlpi, unul de o parte și altul de alta.",
        "Lățimea este de unsprezece coți, iar WLC și WEBU nu dau numărul treptelor.",
    ),
    "EZK.41.9": (
        "Zidul de afară al odăilor lăturalnice avea o grosime de cinci coți.",
        "Zidul de afară al odăilor lăturalnice avea o grosime de cinci coți. Locul rămas era al odăilor lăturalnice care țineau de Casă.",
        "Locul rămas al odăilor lăturalnice care țineau de Casă fusese omis.",
    ),
    "EZK.41.22": (
        "ca un altar de lemn, înalt de trei coți, lung de doi coți și lat de doi coți. Colțurile, temelia și pereții lui erau de lemn. Omul acela mi-a zis: „Aceasta este masa care este înaintea DOMNULUI!”",
        "ca un altar de lemn, înalt de trei coți și lung de doi coți. Colțurile, temelia și pereții lui erau de lemn. Omul acela mi-a zis: „Aceasta este masa care este înaintea DOMNULUI!”",
        "Lățimea de doi coți nu apare în WLC sau WEBU.",
    ),
    "EZK.45.12": (
        "Siclul să fie de douăzeci de ghere. Cinci sicli să fie cinci, zece sicli să fie zece, iar mina să fie de cincizeci de sicli!",
        "Siclul să fie de douăzeci de ghere. Douăzeci de sicli, douăzeci și cinci de sicli și cincisprezece sicli să alcătuiască mina voastră.",
        "Seria numerică fixată este douăzeci, douăzeci și cinci și cincisprezece.",
    ),
    "EZK.45.20": (
        "Tot așa vei face și în ziua întâi a lunii a șaptea, în ziua întâi a lunii noi, pentru cei din popor care păcătuiesc fără voie sau din nechibzuință; și astfel veți curăța Casa.",
        "Tot așa vei face și în ziua a șaptea a lunii, pentru cei din popor care păcătuiesc fără voie sau din nechibzuință; și astfel veți curăța Casa.",
        "Data fixată este ziua a șaptea a lunii, nu prima zi a lunii a șaptea.",
    ),
    "DAN.2.15": (
        "A luat cuvântul și a zis lui Arioc, căpitanul împăratului: „Pentru ce a dat împăratul o poruncă atât de aspră?”",
        "A luat cuvântul și a zis lui Arioc, căpitanul împăratului: „Pentru ce a dat împăratul o poruncă atât de aspră?” Atunci Arioc i-a făcut cunoscut lui Daniel lucrul acesta.",
        "Explicația dată de Arioc lui Daniel fusese omisă.",
    ),
    "DAN.3.26": (
        "Apoi Nebucadnețar s-a apropiat de gura cuptorului aprins și, luând cuvântul, a zis: „Șadrac, Meșac și Abed-Nego, slujitorii Dumnezeului celui Preaînalt, ieșiți afară și veniți încoace!”",
        "Apoi Nebucadnețar s-a apropiat de gura cuptorului aprins și, luând cuvântul, a zis: „Șadrac, Meșac și Abed-Nego, slujitorii Dumnezeului celui Preaînalt, ieșiți afară și veniți încoace!” Atunci Șadrac, Meșac și Abed-Nego au ieșit din mijlocul focului.",
        "Ieșirea celor trei din mijlocul focului fusese omisă.",
    ),
    "DAN.10.11": (
        "Apoi mi-a zis: „Daniele, om preaiubit și scump, fii cu luare aminte la cuvintele pe care ți le voi spune acum și stai în picioare în locul unde ești; căci acum sunt trimis la tine!”",
        "Apoi mi-a zis: „Daniele, om preaiubit și scump, fii cu luare aminte la cuvintele pe care ți le voi spune acum și stai în picioare în locul unde ești; căci acum sunt trimis la tine!” Când mi-a spus cuvântul acesta, m-am ridicat tremurând.",
        "Ridicarea lui Daniel tremurând fusese omisă.",
    ),
    "DAN.10.13": (
        "Dar căpetenia împărăției Persiei mi-a stat împotrivă douăzeci și una de zile; însă iată că Mihail, una din căpeteniile cele mai de seamă, mi-a venit în ajutor și am ieșit biruitor acolo, lângă împărații Persiei.",
        "Dar căpetenia împărăției Persiei mi-a stat împotrivă douăzeci și una de zile; însă iată că Mihail, una din căpeteniile cele mai de seamă, mi-a venit în ajutor, iar eu am rămas acolo lângă împărații Persiei.",
        "WLC și WEBU spun că vorbitorul a rămas acolo, nu că a ieșit biruitor.",
    ),
    "DAN.11.12": (
        "Atunci inima împăratului se va îngâmfa, va doborî zece mii, dar tot nu va birui.",
        "Mulțimea va fi luată, iar inima împăratului se va îngâmfa; va doborî zeci de mii, dar tot nu va birui.",
        "Luarea mulțimii fusese omisă, iar numărul este plural: zeci de mii.",
    ),
    "DAN.11.31": (
        "Niște oști trimise de el vor veni și vor spurca Sfântul Locaș, cetățuia, vor face să înceteze jertfa necurmată și vor așeza urâciunea pustiitorului. Va ademeni prin lingușiri pe cei ce rup legământul.",
        "Niște oști trimise de el vor veni și vor spurca Sfântul Locaș, cetățuia, vor face să înceteze jertfa necurmată și vor așeza urâciunea pustiitorului.",
        "Clauza despre lingușiri aparține versetului 32, nu versetului 31.",
    ),
    "DAN.11.32": (
        "Dar aceia din popor care vor cunoaște pe Dumnezeul lor vor rămâne tari și vor face mari isprăvi.",
        "Pe cei ce se poartă nelegiuit față de legământ îi va corupe prin lingușiri; dar aceia din popor care vor cunoaște pe Dumnezeul lor vor rămâne tari și vor face mari isprăvi.",
        "Clauza despre coruperea prin lingușiri fusese mutată greșit în versetul 31.",
    ),
}


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def text_digest(verses: list[dict[str, object]]) -> str:
    payload = "\n".join(f"{verse['number']}\t{verse['text']}" for verse in verses)
    return "sha256:" + hashlib.sha256(payload.encode("utf-8")).hexdigest()


def load_locked_sources() -> dict[str, dict[tuple[str, int, int], str]]:
    parsed: dict[str, dict[tuple[str, int, int], str]] = {}
    for source, (path, expected_digest) in SOURCE_FILES.items():
        actual_digest = sha256(path)
        if actual_digest != expected_digest:
            raise RuntimeError(
                f"sursa {source} nu corespunde source-lock: {actual_digest}"
            )
        parsed[source] = parse_usfm_zip(path)
    return parsed


def report_payload(
    sources: dict[str, dict[tuple[str, int, int], str]],
) -> dict[str, object]:
    changes: list[dict[str, object]] = []
    for reference, (previous, replacement, reason) in REPAIRS.items():
        book, chapter, verse = reference.split(".")
        key = (book, int(chapter), int(verse))
        changes.append(
            {
                "reference": reference,
                "previous": previous,
                "replacement": replacement,
                "reason": reason,
                "evidence": {
                    "WEBU": sources["WEBU"][key],
                    "WLC": sources["WLC"][key],
                },
            }
        )
    return {
        "repairPass": AUDIT_ID,
        "count": len(REPAIRS),
        "sourceLock": {
            source: {
                "path": str(path.relative_to(ROOT)),
                "sha256": expected_digest,
            }
            for source, (path, expected_digest) in SOURCE_FILES.items()
        },
        "changes": changes,
    }


def write_report(sources: dict[str, dict[tuple[str, int, int], str]]) -> None:
    REPORT.write_text(
        json.dumps(report_payload(sources), ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )


def apply_repairs() -> list[str]:
    documents: dict[Path, dict[str, object]] = {}
    changed: list[str] = []
    mismatches: list[str] = []

    for reference, (expected, replacement, _reason) in REPAIRS.items():
        book, chapter, number = reference.split(".")
        path = DATA / f"{book}.{chapter}.json"
        document = documents.setdefault(
            path, json.loads(path.read_text(encoding="utf-8"))
        )
        verse = next(
            item for item in document["verses"] if item["number"] == int(number)
        )
        if verse["text"] == replacement:
            continue
        if verse["text"] != expected:
            mismatches.append(reference)
            continue
        verse["text"] = replacement
        changed.append(reference)

    if mismatches:
        raise RuntimeError(
            "textul de bază nu mai corespunde auditului: " + ", ".join(mismatches)
        )

    for path, document in documents.items():
        audit = document.setdefault("audit", {})
        audit["textDigest"] = text_digest(document["verses"])
        history = audit.setdefault("repairHistory", [])
        if not any(item.get("id") == AUDIT_ID for item in history):
            chapter_prefix = path.stem + "."
            history.append(
                {
                    "id": AUDIT_ID,
                    "scope": "corecții certe confirmate direct în WLC și WEBU locale fixate",
                    "verseNumbers": sorted(
                        int(reference.rsplit(".", 1)[1])
                        for reference in REPAIRS
                        if reference.startswith(chapter_prefix)
                    ),
                }
            )
        path.write_text(
            json.dumps(document, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
    return changed


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--report-only",
        action="store_true",
        help="scrie numai raportul, fără a modifica documentele biblice",
    )
    args = parser.parse_args()

    sources = load_locked_sources()
    changed = [] if args.report_only else apply_repairs()
    write_report(sources)
    print(json.dumps({"changedVerses": changed}, ensure_ascii=False))


if __name__ == "__main__":
    main()
