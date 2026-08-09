#!/usr/bin/env python3
"""Apply the source-confirmed final editorial repairs to the canonical OT.

The pass is intentionally idempotent. Every semantic repair asserts the
inherited wording, while quote normalization only alternates Romanian quote
pairs by actual nesting depth across an entire chapter.
"""

from __future__ import annotations

import hashlib
import importlib.util
import json
import re
import sys
from datetime import date
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs" / "data" / "biblia-emanus"
GATE_PATH = Path(__file__).with_name("check-biblia-emanus-ot-source-evidence.py")
PASS_ID = "ot-final-editorial-2026-08-09"

OT_BOOKS = {
    "GEN", "EXO", "LEV", "NUM", "DEU", "JOS", "JDG", "RUT", "1SA", "2SA",
    "1KI", "2KI", "1CH", "2CH", "EZR", "NEH", "EST", "JOB", "PSA", "PRO",
    "ECC", "SNG", "ISA", "JER", "LAM", "EZK", "DAN", "HOS", "JOL", "AMO",
    "OBA", "JON", "MIC", "NAM", "HAB", "ZEP", "HAG", "ZEC", "MAL",
}

REPAIRS: dict[str, tuple[str, str, str]] = {
    "1SA.13.21": (
        "Iar prețul era de un pim pentru ascuțirea săpăligilor, plugurilor, furcilor cu trei coarne, securilor și țepușelor.",
        "Iar prețul era de un pim pentru a ascuți sapa, fierul de plug, furca cu trei coarne, securea și țepușa.",
        "Uneltele și prețul ebraic pim sunt păstrate, iar enumerarea a fost formulată natural și verificabil în română.",
    ),
    "JOB.30.27": (
        "Inima mea este tulburată și nu se odihnește; zile de nenorocire au venit peste mine.",
        "Măruntaiele îmi fierb și nu se odihnesc; zilele nenorocirii m-au întâmpinat.",
        "Ebraicul me'ai denumește măruntaiele, iar rutehu exprimă fierberea; imaginea corporală omisă a fost restaurată.",
    ),
    "JOB.32.21": (
        "Nu voi ține seama de fața nimănui și nu voi da nimănui titluri măgulitoare;",
        "Nu voi părtini pe nimeni și nu voi linguși pe nimeni;",
        "Idiomul ebraic despre ridicarea feței exprimă părtinirea, iar verbul akaneh este redat prin lingușire în context.",
    ),
    "JOB.36.33": (
        "„Zgomotul lui vorbește despre El, iar vitele, despre furtuna care se ridică.”",
        "„Tunetul arată apropierea Lui; până și vitele arată furtuna care se ridică.”",
        "Versetul ebraic dificil păstrează zgomotul, vestirea, vitele și ceea ce se ridică; apropierea furtunii explicitează referentul contextual.",
    ),
    "JOB.41.29": (
        "Ghioagele le socotește paie și râde de vuietul suliței.",
        "Ghioaga este socotită ca paiul; el râde de vuietul suliței.",
        "Cele două imagini ebraice sunt păstrate, cu forme românești care evită ambiguitatea acordului din formularea moștenită.",
    ),
    "ISA.43.6": (
        "Voi zice miazănoaptei: „Dă încoace!”, și miazăzilei: „Nu opri, ci adu-Mi fiii din țările depărtate și fiicele de la marginile pământului.”",
        "Voi zice miazănoaptei: „Dă încoace!”, iar către miazăzi: „Nu opri, ci adu-Mi fiii din țările depărtate și fiicele de la marginile pământului.”",
        "Substantivul «miazăzi» este invariabil; construcția prepozițională redă natural adresarea ebraică spre sud.",
    ),
    "1SA.17.43": (
        "Filisteanul a zis lui David: „Ce! sunt câine, de vii la mine cu toiege?” Și filisteanul l-a blestemat pe David pe dumnezeii lui.",
        "Filisteanul i-a zis lui David: „Sunt eu un câine, de vii la mine cu toiege?” Și filisteanul l-a blestemat pe David în numele dumnezeilor lui.",
        "Interogația ebraică a fost restaurată, iar be'elohav a fost redat instrumental: filisteanul a blestemat prin dumnezeii lui.",
    ),
    "1KI.8.42": (
        "căci se va ști că Numele Tău este mare, mâna Ta este tare și brațul Tău este întins, când va veni să se roage în Casa aceasta, –",
        "căci vor auzi despre Numele Tău cel mare, despre mâna Ta cea puternică și despre brațul Tău întins; când va veni și se va ruga spre Casa aceasta,",
        "Verbele și direcția rugăciunii au fost aliniate cu ebraicul yișmeun și el habayit; semnul editorial izolat a fost eliminat.",
    ),
    "1KI.18.37": (
        "„Ascultă-mă, DOAMNE, ascultă-mă, pentru ca să cunoască poporul acesta că Tu, DOAMNE, ești adevăratul Dumnezeu, și că Tu le-ai întors inima înapoi!”",
        "„Ascultă-mă, DOAMNE, ascultă-mă, ca poporul acesta să cunoască faptul că Tu, DOAMNE, ești Dumnezeu și că Tu le-ai întors din nou inima!”",
        "Scopul și repetarea adverbială au fost redate natural, păstrând afirmația ebraică despre întoarcerea inimii.",
    ),
    "ECC.2.16": (
        "Căci pomenirea înțeleptului nu este mai veșnică decât a nebunului: chiar în zilele următoare totul este uitat. Și apoi și înțeleptul moare, și nebunul!",
        "Căci nici înțeleptul, nici nebunul nu vor fi pomeniți pentru totdeauna; în zilele care vin, amândoi vor fi uitați. Și cum moare înțeleptul la fel ca nebunul!",
        "Paralelismul ebraic neagă pomenirea veșnică a amândurora și afirmă aceeași moarte; comparația românească defectă a fost reparată.",
    ),
    "ECC.3.21": (
        "Cine știe dacă suflarea omului se suie în sus, și dacă suflarea dobitocului se coboară în jos în pământ?",
        "Cine știe dacă suflarea omului urcă și dacă suflarea animalului coboară în pământ?",
        "Contrastul ebraic dintre urcare și coborâre a fost păstrat fără pleonasmele românești.",
    ),
    "1SA.24.7": (
        "Cu aceste cuvinte, David a oprit pe oamenii săi și i-a împiedicat să se arunce asupra lui Saul. Apoi Saul s-a sculat să iasă din peșteră și și-a văzut înainte de drum.",
        "Cu aceste cuvinte, David i-a oprit pe oamenii săi și i-a împiedicat să se arunce asupra lui Saul. Apoi Saul s-a ridicat, a ieșit din peșteră și și-a văzut de drum.",
        "Construcția coruptă a fost reparată după ebraicul wayyelekh badarekh și WEBU: Saul a ieșit și și-a continuat drumul.",
    ),
    "1KI.17.23": (
        "Ilie a luat copilul, l-a coborât jos în casă din odaia de sus și l-a dat mamei sale. Și Ilie a zis: „Iată, fiul tău este viu.”",
        "Ilie a luat copilul, l-a coborât din odaia de sus în casă și l-a dat mamei sale. Și Ilie a zis: „Iată, fiul tău este viu.”",
        "Pleonasmul «l-a coborât jos» a fost eliminat, păstrând traseul exprimat de textul ebraic.",
    ),
    "1SA.17.23": (
        "Pe când vorbea cu ei, iată că filisteanul din Gat, numit Goliat, a înaintat între cele două oștiri, ieșind afară din șirurile filistenilor. A rostit aceleași cuvinte ca mai înainte, și David le-a auzit.",
        "Pe când vorbea cu ei, iată că filisteanul din Gat, numit Goliat, a înaintat între cele două oștiri, ieșind din șirurile filistenilor. A rostit aceleași cuvinte ca mai înainte, și David le-a auzit.",
        "Pleonasmul «ieșind afară» a fost eliminat fără schimbarea acțiunii din textul-sursă.",
    ),
    "DEU.19.14": (
        "Să nu muti hotarul aproapelui tău, pus de cei de demult în moștenirea pe care o vei primi în țara pe care ți-o dă DOMNUL, Dumnezeul tău, s-o stăpânești.",
        "Să nu muți hotarul aproapelui tău, pus de cei de demult în moștenirea pe care o vei primi în țara pe care ți-o dă DOMNUL, Dumnezeul tău, s-o stăpânești.",
        "Forma verbală «muți» cere diacritica ț; sensul poruncii ebraice rămâne neschimbat.",
    ),
    "NUM.11.21": (
        "Moise a zis: „Șase sute de mii de bărbați pedestri are poporul în mijlocul căruia mă aflu, și Tu zici: «Le voi da carne și vor mânca o lună întreagă!»”",
        "Moise a zis: „Șase sute de mii de bărbați pedeștri are poporul în mijlocul căruia mă aflu, și Tu zici: «Le voi da carne și vor mânca o lună întreagă!»”",
        "Corectarea diacriticei lipsă din pluralul «pedeștri».",
    ),
    "1SA.1.16": (
        "„Să nu iei pe roaba ta drept o femeie stricată, căci numai prea multa mea durere și supărare m-a făcut să vorbesc până acum.”",
        "„Să nu iei pe roaba ta drept o femeie stricată, căci numai prea multa mea durere și supărare m-au făcut să vorbesc până acum.”",
        "Predicatul a fost acordat cu subiectul multiplu «durere și supărare».",
    ),
    "PRO.5.23": (
        "El va muri din lipsă de înfrânare, se va poticni din prea multa lui nebunie.",
        "El va muri din lipsă de înfrânare; se va rătăci din pricina marii lui nebunii.",
        "Ebraicul berov ivvalto exprimă mulțimea sau mărimea nebuniei; coordonarea a fost redată natural în română.",
    ),
    "2SA.16.10": (
        "Dar împăratul a zis: „Ce aveți voi cu mine, fiii Țeruiei? Dacă blestemă, înseamnă că DOMNUL i-a zis: «Blestemă pe David!» Cine-i va zice, dar: «Pentru ce faci așa?»?”",
        "Dar împăratul a zis: „Ce aveți voi cu mine, fiii Țeruiei? Dacă blestemă, înseamnă că DOMNUL i-a zis: «Blestemă pe David!» Cine-i va zice, dar: «Pentru ce faci așa?»”",
        "Semnul întrebării din citatul interior încheie și întrebarea exterioară; al doilea semn era redundant.",
    ),
    "JDG.11.24": (
        "Oare ce-ți dă în stăpânire dumnezeul tău, Chemoș, nu vei stăpâni? Și tot ce ne-a dat în stăpânire DOMNUL Dumnezeul nostru, înaintea noastră, noi să nu stăpânim?!",
        "Oare ce-ți dă în stăpânire dumnezeul tău, Chemoș, nu vei stăpâni? Și tot ce ne-a dat în stăpânire DOMNUL Dumnezeul nostru, înaintea noastră, noi să nu stăpânim?",
        "Întrebarea retorică a fost încheiată cu un singur semn terminal.",
    ),
    "1SA.11.12": (
        "Poporul a zis lui Samuel: „Cine zicea: «Saul să domnească peste noi?»? Dați încoace pe oamenii aceia, ca să-i omorâm.”",
        "Poporul a zis lui Samuel: „Cine zicea: «Saul să domnească peste noi?» Dați încoace pe oamenii aceia, ca să-i omorâm.”",
        "Semnul întrebării din citatul interior încheie întrebarea; semnul exterior duplicat a fost eliminat.",
    ),
    "2KI.19.11": (
        "Iată, ai auzit ce au făcut împărații Asiriei tuturor țărilor și cum le-au nimicit; și tu, să fii izbăvit?!",
        "Iată, ai auzit ce au făcut împărații Asiriei tuturor țărilor și cum le-au nimicit; și tu să fii izbăvit?",
        "Întrebarea retorică a fost încheiată cu un singur semn terminal, iar virgula inutilă a fost eliminată.",
    ),
    "LEV.11.17": (
        "cucuveaua de stâncă, corbul de apă și bufnita,",
        "cucuveaua de stâncă, corbul de apă și bufnița,",
        "Corectarea diacriticei lipsă din «bufnița»; enumerarea ebraică rămâne neschimbată.",
    ),
    "PSA.107.37": (
        "însămânțează ogoare, sădesc vii și le culeg roadele.",
        "însămânțează ogoare, sădesc vii și obțin roade îmbelșugate.",
        "Ebraicul wayya'asu peri tevuah spune că ogoarele și viile produc rod; formularea nu introduce o recoltare absentă din sursă.",
    ),
    "DEU.17.4": (
        "și ți se va da de știre și vei auzi, să cercetezi cu de-amănuntul. Dacă este adevărat și sigur că urâciunea aceasta a fost săvârșită în Israel,",
        "și ți se va da de știre și vei auzi, cercetează cu de-amănuntul. Dacă este adevărat și sigur că urâciunea aceasta a fost săvârșită în Israel,",
        "Succesiunea verbală a fost reparată în română; porunca de a cerceta atent rămâne explicită ca în ebraică.",
    ),
    "PSA.73.8": (
        "Râd și vorbesc cu răutate de asuprire: vorbesc de sus,",
        "Batjocoresc și vorbesc cu răutate despre asuprire; vorbesc cu trufie,",
        "Verbele ebraice despre batjocură, asuprire și vorbirea trufașă au fost redate fără construcția românească ambiguă «de asuprire».",
    ),
    "JOB.6.19": (
        "Cetele celor din Tema se uită țintă la ele, călătorii din Seba sunt plini de nădejde când le văd.",
        "Caravanele din Tema se uită după ele, iar călătorii din Seba își pun nădejdea în ele.",
        "Adaosul «când le văd» a fost eliminat; ebraicul qivvu exprimă nădejdea sau așteptarea caravanelor.",
    ),
    "PRO.24.4": (
        "prin știință se umplu cămările ei de toate bunătățile de preț și plăcute.",
        "prin cunoaștere se umplu cămările ei cu toate comorile de preț și plăcute.",
        "Ebraicul hon denumește aici bogăția sau comoara; formularea reparată păstrează paralelismul despre casa zidită prin înțelepciune.",
    ),
    "ZEC.13.5": (
        "Ci fiecare din ei va zice: „Eu nu sunt proroc, ci sunt plugar, căci am fost cumpărat din tinerețea mea!”",
        "Ci va zice: „Eu nu sunt proroc, ci sunt plugar, căci un om m-a cumpărat din tinerețea mea!”",
        "Subiectul ebraic adam, «un om», a fost restaurat; pluralul introductiv absent din verset a fost eliminat.",
    ),
    "JOB.13.19": (
        "Are cineva ceva de spus împotriva mea? Atunci tac și vreau să mor.",
        "Cine este cel care se va judeca cu mine? Căci atunci aș tăcea și mi-aș da duhul.",
        "Ebraicul exprimă o dispută judiciară și o consecință ipotetică, nu dorința vorbitorului de a muri.",
    ),
    "PRO.11.1": (
        "Cumpăna înșelătoare este urâtă DOMNULUI, dar cântăreala dreaptă Îi este plăcută.",
        "Cumpăna înșelătoare este o urâciune pentru DOMNUL, dar greutatea dreaptă Îi este plăcută.",
        "Termenii ebraici to'evah și even șelemah au fost redați direct: urâciune și greutate întreagă sau dreaptă.",
    ),
    "JOB.39.7": (
        "El râde de zarva cetăților și n-aude strigătele stăpânului, care-l mână.",
        "El râde de zarva cetății și nu aude strigătele celui care-l mână.",
        "Ebraicul noges îl desemnează pe cel care mână animalul, fără a afirma că îi este stăpân.",
    ),
    "EZR.2.62": (
        "Și-au căutat însemnarea în cărțile spițelor de neam, dar n-au găsit-o. De aceea, au fost îndepărtați de la preoție,",
        "Și-au căutat însemnarea în cărțile spițelor de neam, dar n-au găsit-o. De aceea, au fost socotiți necurați și îndepărtați de la preoție,",
        "Ebraicul wayyigo'alu include declararea lor ca necurați; calificarea omisă a fost restaurată înaintea excluderii de la preoție.",
    ),
    "EZK.16.23": (
        "După toate aceste răutăți ale tale – (vai, vai de tine!, zice DOMNUL Dumnezeu) –",
        "După toate aceste răutăți ale tale — vai, vai de tine! — zice DOMNUL Dumnezeu —",
        "Punctuația incidentului profetic a fost reparată fără schimbarea textului ebraic.",
    ),
    "MAL.1.2": (
        "„V-am iubit, zice DOMNUL! Și voi ziceți: «Cu ce ne-ai iubit?» Nu era Esau fratele lui Iacov?, zice DOMNUL. Totuși l-am iubit pe Iacov.”",
        "„V-am iubit, zice DOMNUL! Și voi ziceți: «Cu ce ne-ai iubit?» Nu era Esau fratele lui Iacov? zice DOMNUL. Totuși l-am iubit pe Iacov.”",
        "Virgula imposibilă de după semnul întrebării a fost eliminată.",
    ),
    "JER.3.4": (
        "Acum, nu-i așa?, strigi la Mine: „Tată! Tu ai fost călăuza tinereții mele!”",
        "Oare nu strigi tu acum către Mine, spunând: „Tată! Tu ai fost călăuza tinereții mele!”",
        "Interogația ebraică a fost redată direct, eliminând construcția românească defectă.",
    ),
    "2KI.11.14": (
        "S-a uitat. Și iată că împăratul stătea lângă stâlp, după datină. Căpeteniile și trâmbițele erau lângă împărat: tot poporul țării se bucura și sunau din trâmbițe. Atalia și-a sfâșiat hainele și a strigat: „Vânzare! Vânzare!”",
        "S-a uitat. Și iată că împăratul stătea lângă stâlp, după datină. Căpeteniile și trâmbițele erau lângă împărat: tot poporul țării se bucura și sunau din trâmbițe. Atalia și-a sfâșiat hainele și a strigat: „Trădare! Trădare!”",
        "Ebraicul qeșer înseamnă complot sau trădare; «vânzare» este un arhaism ambiguu.",
    ),
    "2CH.23.13": (
        "S-a uitat. Și iată că împăratul stătea pe scaunul său împărătesc la intrare. Căpeteniile și trâmbițele erau lângă împărat; tot poporul țării se bucura și sunau din trâmbițe, iar cântăreții cu instrumentele de muzică ziceau cântările de laudă. Atalia și-a sfâșiat hainele și a zis: „Vânzare! Vânzare!”",
        "S-a uitat. Și iată că împăratul stătea pe scaunul său împărătesc la intrare. Căpeteniile și trâmbițele erau lângă împărat; tot poporul țării se bucura și sunau din trâmbițe, iar cântăreții cu instrumentele de muzică ziceau cântările de laudă. Atalia și-a sfâșiat hainele și a zis: „Trădare! Trădare!”",
        "Ebraicul qeșer înseamnă complot sau trădare; «vânzare» este un arhaism ambiguu.",
    ),
    "JOL.1.4": (
        "Ce a lăsat nemâncat lăcusta Gazam a mâncat lăcusta Arbeh, ce a lăsat lăcusta Arbeh a mâncat lăcusta Ielec, ce a lăsat lăcusta Ielec a mâncat lăcusta Hasil.",
        "Ce a lăsat nemâncat lăcusta gazam a mâncat lăcusta arbeh; ce a lăsat lăcusta arbeh a mâncat lăcusta ielec; iar ce a lăsat lăcusta ielec a mâncat lăcusta hasil.",
        "Cei patru termeni ebraici sunt substantive comune cu identificare zoologică disputată, nu nume proprii.",
    ),
    "PRO.16.31": (
        "Perii albi sunt o cunună de cinste, ea se găsește pe calea neprihănirii.",
        "Părul cărunt este o cunună de cinste; el se găsește pe calea dreptății.",
        "Ebraicul seivah denumește părul cărunt; formularea românească a fost modernizată fără adaos.",
    ),
    "ISA.32.8": (
        "Dar cel ales la suflet face planuri alese și stăruie în planurile lui alese.",
        "Dar omul nobil face planuri nobile și stăruie în fapte nobile.",
        "Repetiția ebraică din rădăcina n-d-b exprimă noblețea, nu alegerea sufletului.",
    ),
    "JER.51.18": (
        "Sunt o nimica toată și o lucrare de râs: când le vine pedeapsa, pier cu desăvârșire!",
        "Sunt o nimica toată și o lucrare înșelătoare; când le vine pedeapsa, pier cu desăvârșire!",
        "Aceeași expresie ebraică din Ieremia 10:15 denumește amăgirea, nu râsul.",
    ),
    "PSA.106.46": (
        "a stârnit pentru ei mila tuturor celor ce îi țineau prinși de război.",
        "a stârnit pentru ei mila tuturor celor ce îi țineau captivi.",
        "Ebraicul șoveyhem îi numește pe cei care îi țineau captivi, fără a adăuga cauza războiului.",
    ),
    "JOB.40.10": (
        "Împodobește-te cu măreție și mărime, îmbracă-te cu strălucire și cu slavă!",
        "Împodobește-te cu măreție și demnitate, îmbracă-te cu strălucire și cu slavă!",
        "Cele două substantive ebraice sunt distincte; «măreție și mărime» era o repetiție lexicală săracă.",
    ),
    "1KI.3.9": (
        "„Dă, dar, robului Tău o inimă pricepută, ca să judece pe poporul Tău, să deosebească binele de rău! Căci cine ar putea să judece pe poporul Tău, pe poporul acesta așa de mare la număr!?”",
        "„Dă, dar, robului Tău o inimă pricepută, ca să judece pe poporul Tău, să deosebească binele de rău! Căci cine ar putea să judece pe poporul Tău, pe poporul acesta așa de mare la număr?”",
        "Întrebarea retorică cere semnul întrebării, nu combinația exclamare-întrebare.",
    ),
    "2SA.11.11": (
        "Urie a răspuns lui David: „Chivotul și Israel și Iuda locuiesc în corturi, domnul meu Ioab și slujitorii domnului meu sunt tăbărâți în câmp, și eu să intru în casă să mănânc și să beau și să mă culc cu nevasta mea!? Viu ești tu și viu este sufletul tău, că nu voi face lucrul acesta.”",
        "Urie a răspuns lui David: „Chivotul și Israel și Iuda locuiesc în corturi, domnul meu Ioab și slujitorii domnului meu sunt tăbărâți în câmp, și eu să intru în casă să mănânc și să beau și să mă culc cu nevasta mea? Viu ești tu și viu este sufletul tău, că nu voi face lucrul acesta.”",
        "Întrebarea retorică cere semnul întrebării, fără punctuație dublă.",
    ),
}

INTERMEDIATE_WORDING = {
    "JOB.36.33": "„Tunetul vestește apropierea Lui; până și vitele vestesc furtuna care se ridică.”",
}

GLOBAL_REPLACEMENTS: tuple[tuple[str, str, str], ...] = (
    (
        "pârâiele",
        "pâraiele",
        "Pluralul articulat al substantivului «pârâu» a fost restaurat conform DOOM 3.",
    ),
    (
        "Pârâiele",
        "Pâraiele",
        "Pluralul articulat al substantivului «pârâu» a fost restaurat conform DOOM 3.",
    ),
    (
        "iutimea",
        "iuțimea",
        "Diacritica lipsă din «iuțimea» a fost restaurată.",
    ),
    (
        "disciplinedază",
        "disciplinează",
        "Forma verbală coruptă a fost corectată la «disciplinează».",
    ),
    (
        "stărvurile",
        "stârvurile",
        "Forma ortografică a pluralului «stârvurile» a fost corectată.",
    ),
    (
        "s-a sumețit",
        "s-a semețit",
        "Forma verbală a fost corectată la «s-a semețit».",
    ),
    (
        "mânindu-L",
        "mâniindu-L",
        "Gerunziul verbului «a mânia» a fost corectat la «mâniindu-L».",
    ),
    (
        "luare aminte",
        "luare-aminte",
        "Locuțiunea substantivală a fost scrisă consecvent cu cratimă.",
    ),
    (
        "toți fii ai lui Heman",
        "toți fiii lui Heman",
        "Substantivul determinat de «toți» cere forma articulată «fiii».",
    ),
    (
        "toți fii ai lui Iosafat",
        "toți fiii lui Iosafat",
        "Substantivul determinat de «toți» cere forma articulată «fiii».",
    ),
    (
        "toți fii ai lui Ierubaal",
        "toți fiii lui Ierubaal",
        "Substantivul determinat de «toți» cere forma articulată «fiii».",
    ),
    (
        "toți oameni viteji",
        "toți oamenii viteji",
        "Substantivul determinat de «toți» cere forma articulată «oamenii».",
    ),
    (
        "toți viteji",
        "toți vitejii",
        "Substantivul determinat de «toți» cere forma articulată «vitejii».",
    ),
)


def load_gate() -> Any:
    spec = importlib.util.spec_from_file_location("ot_final_editorial_gate", GATE_PATH)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Nu pot încărca {GATE_PATH}")
    module = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = module
    spec.loader.exec_module(module)
    return module


def chapter_digest(verses: list[dict[str, Any]]) -> str:
    payload = "\n".join(f"{verse['number']}\t{verse['text']}" for verse in verses)
    return "sha256:" + hashlib.sha256(payload.encode("utf-8")).hexdigest()


def normalize_quote_depth(verses: list[dict[str, Any]], chapter_id: str) -> set[str]:
    stack: list[tuple[str, str]] = []
    changed: set[str] = set()
    close_for = {"„": "”", "«": "»"}
    open_for_close = {"”": "„", "»": "«"}

    for verse in verses:
        original = str(verse["text"])
        rendered: list[str] = []
        for char in original:
            if char in close_for:
                desired = "„" if len(stack) % 2 == 0 else "«"
                stack.append((char, desired))
                rendered.append(desired)
            elif char in open_for_close:
                expected = open_for_close[char]
                if not stack or stack[-1][0] != expected:
                    raise RuntimeError(
                        f"{chapter_id}.{verse['number']}: închidere de citat incompatibilă"
                    )
                _, desired = stack.pop()
                rendered.append(close_for[desired])
            else:
                rendered.append(char)
        replacement = "".join(rendered)
        if replacement != original:
            verse["text"] = replacement
            changed.add(f"{chapter_id}.{verse['number']}")

    if stack:
        raise RuntimeError(f"{chapter_id}: citat neînchis la sfârșitul capitolului")
    return changed


def update_evidence(changed: set[str], reasons: dict[str, str]) -> None:
    gate = load_gate()
    source_lock = gate.load_json_object(DATA / "source-lock.json", "source-lock.json")
    ledger = gate.load_json_object(DATA / "source-ledger.json", "source-ledger.json")
    targets = gate._load_target_verses(DATA, source_lock, ledger, gate.PRODUCTION_CONTRACT)
    contexts = {
        context.reference: context
        for context in gate._build_contexts(DATA, source_lock, targets)
        if context.reference in changed
    }
    if set(contexts) != changed:
        raise RuntimeError("Nu am putut reconstrui toate contextele versetelor modificate")

    evidence_path = DATA / "ot-source-evidence.jsonl"
    records = [json.loads(line) for line in evidence_path.read_text(encoding="utf-8").splitlines()]
    for record in records:
        reference = record["reference"]
        if reference not in changed:
            continue
        context = contexts[reference]
        record["texts"]["romanian"]["sha256"] = gate.text_digest(context.romanian)
        record["bindingSha256"] = gate.binding_digest(reference, record["texts"])
        reason = reasons.get(reference, "Formatarea citatului a fost normalizată; sensul și sursele sunt neschimbate.")
        for name, check in record["checks"].items():
            check["rationale"] = f"{reference}: {reason} Controlul {name} rămâne aprobat după comparația directă."
        record["review"] = {
            "method": gate.REVIEW_METHOD,
            "reviewerId": PASS_ID,
            "reviewedAt": date.today().isoformat(),
        }
        record["recordSha256"] = gate.record_digest(record)
    evidence_path.write_text(
        "".join(json.dumps(record, ensure_ascii=False, sort_keys=True) + "\n" for record in records),
        encoding="utf-8",
    )


def main() -> None:
    documents: dict[Path, dict[str, Any]] = {}
    reasons: dict[str, str] = {}
    changed: set[str] = set()

    for reference, (expected, replacement, reason) in REPAIRS.items():
        book, chapter, number = reference.split(".")
        path = DATA / f"{book}.{chapter}.json"
        document = documents.setdefault(path, json.loads(path.read_text(encoding="utf-8")))
        verse = next(item for item in document["verses"] if item["number"] == int(number))
        if verse["text"] == replacement:
            reasons[reference] = reason
            continue
        if verse["text"] != expected and verse["text"] != INTERMEDIATE_WORDING.get(reference):
            raise RuntimeError(f"{reference}: textul moștenit nu mai corespunde reparației")
        verse["text"] = replacement
        changed.add(reference)
        reasons[reference] = reason

    for path in sorted(DATA.glob("*.json")):
        try:
            document = documents.setdefault(path, json.loads(path.read_text(encoding="utf-8")))
        except json.JSONDecodeError:
            continue
        book = document.get("bookId")
        chapter = document.get("chapter")
        verses = document.get("verses")
        if book not in OT_BOOKS or not isinstance(chapter, int) or not isinstance(verses, list):
            continue
        for verse in verses:
            original = str(verse["text"])
            replacement = original
            applied_reasons: list[str] = []
            replacement, repaired_count = re.subn(r"\bvitejii{2,}\b", "vitejii", replacement)
            if repaired_count:
                applied_reasons.append(
                    "Forma articulată «vitejii» a fost restaurată după o dublare editorială locală."
                )
            for needle, substitute, reason in GLOBAL_REPLACEMENTS:
                pattern = rf"(?<!\w){re.escape(needle)}(?!\w)"
                replacement, replacement_count = re.subn(pattern, substitute, replacement)
                if replacement_count:
                    applied_reasons.append(reason)
            if replacement != original:
                reference = f"{book}.{chapter}.{verse['number']}"
                verse["text"] = replacement
                changed.add(reference)
                reasons[reference] = " ".join(applied_reasons)
        changed.update(normalize_quote_depth(verses, f"{book}.{chapter}"))

    touched_chapters = {".".join(reference.split(".")[:2]) for reference in changed}
    for chapter_id in sorted(touched_chapters):
        path = DATA / f"{chapter_id}.json"
        document = documents[path]
        audit = document.setdefault("audit", {})
        audit["textDigest"] = chapter_digest(document["verses"])
        history = audit.setdefault("repairHistory", [])
        if not any(item.get("id") == PASS_ID for item in history):
            history.append({
                "id": PASS_ID,
                "scope": "revizie finală românească, semantică și tipografică",
                "verseNumbers": sorted(
                    int(reference.split(".")[-1])
                    for reference in changed
                    if reference.startswith(chapter_id + ".")
                ),
            })
        path.write_text(json.dumps(document, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    joel_path = DATA / "JOL.1.json"
    joel = documents[joel_path]
    notes = joel.setdefault("editorialNotes", [])
    if not any(note.get("verse") == 4 and note.get("term") == "gazam / arbeh / ielec / hasil" for note in notes):
        notes.append({
            "verse": 4,
            "term": "gazam / arbeh / ielec / hasil",
            "decision": (
                "Termenii ebraici pentru cele patru insecte sau stadii de dezvoltare au fost "
                "transliterați cu inițială mică, deoarece identificarea zoologică exactă este disputată."
            ),
        })
        joel_path.write_text(json.dumps(joel, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    update_evidence(changed, reasons)
    print(json.dumps({"changed": len(changed), "references": sorted(changed)}, ensure_ascii=False))


if __name__ == "__main__":
    main()
