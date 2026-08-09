#!/usr/bin/env python3
"""Apply the source-confirmed historical-books WLC/WEBU audit repairs.

All inherited verse texts are checked before any file is written. A rerun is
idempotent: repaired verses and chapter-level history entries are left intact.
"""

from __future__ import annotations

import hashlib
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs" / "data" / "biblia-emanus"
REPORT = (
    ROOT
    / "docs"
    / "biblia-emanus"
    / "OT-HISTORICAL-KINGS-DIRECT-AUDIT-REPAIRS.json"
)
AUDIT_ID = "ot-historical-kings-wlc-webu-audit-2026-08-08"
FINDING_COUNT = 45

REPAIRS: dict[str, tuple[str, str, str]] = {
    "JDG.1.15": (
        "Ea i-a răspuns: „Dă-mi un dar, căci mi-ai dat un pământ secetos; dă-mi și izvoare de apă.”",
        "Ea i-a răspuns: „Dă-mi un dar, căci mi-ai dat un pământ secetos; dă-mi și izvoare de apă.” Atunci Caleb i-a dat izvoarele de sus și izvoarele de jos.",
        "WEBU și WLC consemnează că Caleb i-a dat izvoarele de sus și de jos.",
    ),
    "JDG.4.9": (
        "Ea a răspuns: „Voi merge cu tine; dar nu vei avea slavă în calea pe care mergi, căci DOMNUL va da pe Sisera în mâinile unei femei.”",
        "Ea a răspuns: „Voi merge cu tine; dar nu vei avea slavă în calea pe care mergi, căci DOMNUL va da pe Sisera în mâinile unei femei.” Debora s-a ridicat și a mers cu Barac la Chedeș.",
        "Ridicarea Deborei și plecarea ei cu Barac la Chedeș sunt explicite.",
    ),
    "JDG.5.31": (
        "„Așa să piară toți vrăjmașii Tăi, DOAMNE! Dar cei ce-L iubesc sunt ca soarele, când se arată în puterea lui.”",
        "„Așa să piară toți vrăjmașii Tăi, DOAMNE! Dar cei ce-L iubesc sunt ca soarele, când se arată în puterea lui.” Țara a avut odihnă patruzeci de ani.",
        "WEBU și WLC încheie versetul cu odihna țării timp de patruzeci de ani.",
    ),
    "JDG.7.24": (
        "Ghedeon a trimis soli în tot muntele lui Efraim ca să spună: „Coborâți-vă înaintea lui Madian și tăiați-le trecerea apelor până la Bet-Bara și Iordan.”",
        "Ghedeon a trimis soli în tot muntele lui Efraim ca să spună: „Coborâți-vă înaintea lui Madian și tăiați-le trecerea apelor până la Bet-Bara și Iordan.” Toți bărbații lui Efraim s-au adunat și au luat trecerile apelor până la Bet-Bara și Iordan.",
        "Adunarea bărbaților lui Efraim și ocuparea trecerilor fuseseră omise.",
    ),
    "JDG.8.24": (
        "Ghedeon le-a zis: „Am să vă fac o rugăminte: dați-mi fiecare verigile de nas pe care le-ați luat ca pradă.”",
        "Ghedeon le-a zis: „Am să vă fac o rugăminte: dați-mi fiecare verigile de nas pe care le-ați luat ca pradă.” Căci aveau verigi de aur, fiindcă erau ismaeliți.",
        "Motivul verigilor de aur, identitatea ismaelită, este explicit în ambii martori.",
    ),
    "JDG.12.7": (
        "Iefta a fost judecător în Israel zece ani; apoi Iefta, galaaditul, a murit și a fost îngropat într-una din cetățile Galaadului.",
        "Iefta a fost judecător în Israel șase ani; apoi Iefta, galaaditul, a murit și a fost îngropat într-una din cetățile Galaadului.",
        "WLC și WEBU au șase ani, nu zece.",
    ),
    "JDG.14.14": (
        "Și el le-a zis: „Din cel ce mănâncă a ieșit ce se mănâncă, și din cel tare a ieșit dulceață.”",
        "Și el le-a zis: „Din cel ce mănâncă a ieșit ce se mănâncă, și din cel tare a ieșit dulceață.” Timp de trei zile n-au putut dezlega ghicitoarea.",
        "Clauza despre cele trei zile aparține versetului 14 în WEBU și WLC.",
    ),
    "JDG.14.15": (
        "Trei zile, n-au putut dezlega ghicitoarea. În ziua a șaptea, au zis nevestei lui Samson: „Înduplecă pe bărbatul tău să ne dezlege ghicitoarea; altfel, te vom arde, pe tine și casa tatălui tău. Ne-ați adunat aici ca să ne jefuiți, nu-i așa?”",
        "În ziua a șaptea, au zis nevestei lui Samson: „Înduplecă pe bărbatul tău să ne dezlege ghicitoarea; altfel, te vom arde, pe tine și casa tatălui tău. Ne-ați adunat aici ca să ne jefuiți, nu-i așa?”",
        "Clauza mutată înapoi la versetul 14 este eliminată din versetul 15.",
    ),
    "JDG.15.1": (
        "După câtva timp, pe vremea seceratului grâului, Samson s-a dus să-și vadă nevasta și i-a dus un ied. El a zis: „Vreau să intru la nevasta mea în odaia ei.”",
        "După câtva timp, pe vremea seceratului grâului, Samson s-a dus să-și vadă nevasta și i-a dus un ied. El a zis: „Vreau să intru la nevasta mea în odaia ei.” Dar tatăl ei nu l-a lăsat să intre.",
        "Refuzul tatălui este explicit în WEBU și în negația WLC.",
    ),
    "JDG.16.20": (
        "Atunci ea a zis: „Filistenii sunt asupra ta, Samson!” Și el s-a trezit din somn și a zis: „Voi face ca și mai înainte și mă voi scutura.”",
        "Atunci ea a zis: „Filistenii sunt asupra ta, Samson!” Și el s-a trezit din somn și a zis: „Voi face ca și mai înainte și mă voi scutura.” Dar nu știa că DOMNUL Se depărtase de el.",
        "Samson nu știa că DOMNUL Se depărtase de el.",
    ),
    "JDG.21.8": (
        "Ei au zis deci: „Este cineva dintre semințiile lui Israel care să nu se fi suit la DOMNUL, la Mițpa?”",
        "Ei au zis deci: „Este cineva dintre semințiile lui Israel care să nu se fi suit la DOMNUL, la Mițpa?” Și iată că nimeni din Iabeș-Galaad nu venise în tabără, la adunare.",
        "Absența oamenilor din Iabeș-Galaad este explicită în WEBU și WLC.",
    ),
    "1SA.1.28": (
        "„De aceea vreau să-l dau DOMNULUI: toată viața lui să fie dat DOMNULUI.”",
        "„De aceea vreau să-l dau DOMNULUI: toată viața lui să fie dat DOMNULUI.” Și s-a închinat acolo înaintea DOMNULUI.",
        "Închinarea înaintea DOMNULUI fusese omisă.",
    ),
    "1SA.4.6": (
        "Răsunetul acestor strigăte a fost auzit de filisteni, și au zis: „Ce înseamnă strigătele acestea care răsună în tabăra evreilor?”",
        "Răsunetul acestor strigăte a fost auzit de filisteni, și au zis: „Ce înseamnă strigătele acestea care răsună în tabăra evreilor?” Au înțeles că chivotul DOMNULUI venise în tabără.",
        "Filistenii au înțeles că chivotul DOMNULUI venise în tabără.",
    ),
    "1SA.5.11": (
        "Și au trimis și au strâns pe toți domnitorii filistenilor și au zis: „Trimiteți înapoi chivotul Dumnezeului lui Israel; să se întoarcă la locul lui, ca să nu ne omoare, pe noi și poporul nostru.”",
        "Și au trimis și au strâns pe toți domnitorii filistenilor și au zis: „Trimiteți înapoi chivotul Dumnezeului lui Israel; să se întoarcă la locul lui, ca să nu ne omoare, pe noi și poporul nostru.” Căci în toată cetatea era groază de moarte, iar mâna lui Dumnezeu apăsa foarte greu acolo.",
        "Groaza de moarte și apăsarea mâinii lui Dumnezeu fuseseră omise.",
    ),
    "1SA.11.7": (
        "A luat o pereche de boi, i-a tăiat în bucăți și le-a trimis prin soli în tot ținutul lui Israel, zicând: „Oricine nu va merge după Saul și Samuel își va vedea boii tăiați la fel.”",
        "A luat o pereche de boi, i-a tăiat în bucăți și le-a trimis prin soli în tot ținutul lui Israel, zicând: „Oricine nu va merge după Saul și Samuel își va vedea boii tăiați la fel.” Frica DOMNULUI a căzut peste popor și au ieșit ca un singur om.",
        "Frica DOMNULUI și ieșirea poporului ca un singur om sunt explicite.",
    ),
    "1SA.13.5": (
        "Filistenii s-au strâns să lupte cu Israel. Aveau o mie de care și șase mii de călăreți; și poporul acesta era fără număr: ca nisipul de pe țărmul mării. Au venit și au tăbărât la Micmaș, la răsărit de Bet-Aven.",
        "Filistenii s-au strâns să lupte cu Israel. Aveau treizeci de mii de care și șase mii de călăreți; și poporul acesta era fără număr: ca nisipul de pe țărmul mării. Au venit și au tăbărât la Micmaș, la răsărit de Bet-Aven.",
        "WEBU și WLC au treizeci de mii de care, nu o mie.",
    ),
    "1SA.14.1": (
        "Într-o zi, Ionatan, fiul lui Saul, a zis tânărului care-i purta armele: „Vino, și să pătrundem până la straja filistenilor, care este dincolo de locul acesta.”",
        "Într-o zi, Ionatan, fiul lui Saul, a zis tânărului care-i purta armele: „Vino, și să pătrundem până la straja filistenilor, care este dincolo de locul acesta.” Dar nu i-a spus tatălui său.",
        "Negația despre tatăl lui Ionatan fusese omisă.",
    ),
    "1SA.14.17": (
        "Atunci Saul a zis poporului care era cu el: „Numărați, vă rog, și vedeți cine a plecat din mijlocul nostru.”",
        "Atunci Saul a zis poporului care era cu el: „Numărați, vă rog, și vedeți cine a plecat din mijlocul nostru.” După ce au numărat, au văzut că Ionatan și cel care-i purta armele lipseau.",
        "Rezultatul numărătorii, absența lui Ionatan și a purtătorului de arme, lipsea.",
    ),
    "1SA.14.24": (
        "Ziua aceea a fost obositoare pentru bărbații lui Israel. Saul pusese pe popor să jure, zicând: „Blestemat să fie omul care va mânca pâine până seara, până mă voi răzbuna pe vrăjmașii mei!”",
        "Ziua aceea a fost obositoare pentru bărbații lui Israel. Saul pusese pe popor să jure, zicând: „Blestemat să fie omul care va mânca pâine până seara, până mă voi răzbuna pe vrăjmașii mei!” De aceea nimeni din popor n-a gustat mâncare.",
        "WEBU și WLC afirmă că nimeni din popor nu a gustat mâncare.",
    ),
    "1SA.14.37": (
        "Și Saul a întrebat pe Dumnezeu: „Să mă cobor după filisteni? Îi vei da în mâinile lui Israel?”",
        "Și Saul a întrebat pe Dumnezeu: „Să mă cobor după filisteni? Îi vei da în mâinile lui Israel?” Dar Dumnezeu nu i-a răspuns în ziua aceea.",
        "Negația despre lipsa răspunsului în ziua aceea fusese omisă.",
    ),
    "1SA.19.1": (
        "Saul a vorbit fiului său Ionatan și tuturor slujitorilor lui să omoare pe David.",
        "Saul a vorbit fiului său Ionatan și tuturor slujitorilor lui să-l omoare pe David. Dar Ionatan, fiul lui Saul, ținea foarte mult la David.",
        "Atașamentul puternic al lui Ionatan față de David fusese omis.",
    ),
    "1SA.20.22": (
        "Dar dacă voi zice tânărului: „Iată că săgețile sunt dincolo de tine!”",
        "Dar dacă voi zice tânărului: „Iată că săgețile sunt dincolo de tine!”, atunci pleacă, fiindcă DOMNUL te trimite.",
        "Instrucțiunea de plecare și trimiterea din partea DOMNULUI fuseseră omise.",
    ),
    "1SA.22.17": (
        "Și împăratul a zis alergătorilor care stăteau lângă el: „Întoarceți-vă și omorâți pe preoții DOMNULUI; căci s-au învoit cu David: au știut bine că fuge și nu mi-au dat de veste.”",
        "Și împăratul a zis alergătorilor care stăteau lângă el: „Întoarceți-vă și omorâți pe preoții DOMNULUI; căci s-au învoit cu David: au știut bine că fuge și nu mi-au dat de veste.” Dar slujitorii împăratului n-au vrut să ridice mâna împotriva preoților DOMNULUI.",
        "Refuzul slujitorilor de a-i ataca pe preoții DOMNULUI fusese omis.",
    ),
    "1SA.24.4": (
        "Oamenii lui David i-au zis: „Iată ziua în care DOMNUL îți zice: „Dau pe vrăjmașul tău în mâinile tale; fă-i ce-ți va plăcea.””",
        "Oamenii lui David i-au zis: „Iată ziua în care DOMNUL îți zice: «Dau pe vrăjmașul tău în mâinile tale; fă-i ce-ți va plăcea.»” Atunci David s-a ridicat și a tăiat pe ascuns colțul mantiei lui Saul.",
        "Tăierea pe ascuns a colțului mantiei lui Saul fusese omisă.",
    ),
    "2SA.2.21": (
        "Abner i-a zis: „Abate-te la dreapta sau la stânga, pune mâna pe unul din tinerii aceștia și ia-i armele.”",
        "Abner i-a zis: „Abate-te la dreapta sau la stânga, pune mâna pe unul din tinerii aceștia și ia-i armele.” Dar Asael n-a vrut să se abată din urmărirea lui.",
        "Refuzul lui Asael de a abandona urmărirea fusese omis.",
    ),
    "2SA.9.10": (
        "„Tu să lucrezi pământurile pentru el, tu, fiii tăi și robii tăi, și să strângi roadele, ca fiul stăpânului tău să aibă pâine de mâncare; și Mefiboșet, fiul stăpânului tău, va mânca întotdeauna la masa mea.”",
        "„Tu să lucrezi pământurile pentru el, tu, fiii tăi și robii tăi, și să strângi roadele, ca fiul stăpânului tău să aibă pâine de mâncare; și Mefiboșet, fiul stăpânului tău, va mânca întotdeauna la masa mea.” Țiba avea cincisprezece fii și douăzeci de slujitori.",
        "Numerele cincisprezece fii și douăzeci de slujitori sunt explicite.",
    ),
    "2SA.13.16": (
        "Ea i-a răspuns: „Nu mai mări răul pe care l-ai făcut, izgonindu-mă.”",
        "Ea i-a răspuns: „Nu mai mări răul pe care l-ai făcut, izgonindu-mă.” Dar el n-a vrut s-o asculte.",
        "Refuzul lui Amnon de a o asculta fusese omis.",
    ),
    "2SA.17.20": (
        "Slujitorii lui Absalom au intrat în casă la femeia aceasta și au zis: „Unde sunt Ahimaaț și Ionatan?” Femeia le-a răspuns: „Au trecut pârâul.”",
        "Slujitorii lui Absalom au intrat în casă la femeia aceasta și au zis: „Unde sunt Ahimaaț și Ionatan?” Femeia le-a răspuns: „Au trecut pârâul.” După ce i-au căutat și nu i-au găsit, s-au întors la Ierusalim.",
        "Căutarea nereușită și întoarcerea la Ierusalim fuseseră omise.",
    ),
    "2SA.23.17": (
        "El a zis: „Departe de mine, DOAMNE, gândul să fac lucrul acesta! Să beau sângele oamenilor acestora care s-au dus cu primejdia vieții lor?”",
        "El a zis: „Departe de mine, DOAMNE, gândul să fac lucrul acesta! Să beau sângele oamenilor acestora care s-au dus cu primejdia vieții lor?” De aceea n-a vrut s-o bea. Acestea le-au făcut cei trei viteji.",
        "Refuzul de a bea și identificarea celor trei viteji fuseseră omise.",
    ),
    "2SA.24.24": (
        "Dar împăratul a zis lui Aravna: „Nu! Vreau s-o cumpăr de la tine pe preț de argint și nu voi aduce DOMNULUI Dumnezeului meu arderi de tot, care să nu mă coste nimic.”",
        "Dar împăratul a zis lui Aravna: „Nu! Vreau s-o cumpăr de la tine pe preț de argint și nu voi aduce DOMNULUI Dumnezeului meu arderi de tot, care să nu mă coste nimic.” David a cumpărat aria și boii cu cincizeci de sicli de argint.",
        "Achiziția ariei și a boilor pentru cincizeci de sicli fusese omisă.",
    ),
    "1KI.1.32": (
        "Împăratul David a zis: „Chemați-mi pe preotul Țadoc, pe prorocul Natan și pe Benaia, fiul lui Iehoiada.”",
        "Împăratul David a zis: „Chemați-mi pe preotul Țadoc, pe prorocul Natan și pe Benaia, fiul lui Iehoiada.” Ei au venit înaintea împăratului.",
        "Venirea lor înaintea împăratului fusese omisă.",
    ),
    "1KI.8.29": (
        "Ochii Tăi să fie zi și noapte deschiși asupra Casei acesteia, asupra locului despre care ai zis: „Acolo va fi Numele Meu!”",
        "Ochii Tăi să fie zi și noapte deschiși asupra Casei acesteia, asupra locului despre care ai zis: „Acolo va fi Numele Meu!” Ascultă rugăciunea pe care robul Tău o face spre locul acesta.",
        "Cererea de ascultare a rugăciunii fusese omisă.",
    ),
    "1KI.10.5": (
        "și bucatele de la masa lui, și locuința slujitorilor lui, și slujbele și hainele celor ce-i slujeau, și paharnicii lui, și arderile de tot pe care le aducea în Casa DOMNULUI.",
        "și bucatele de la masa lui, și locuința slujitorilor lui, și slujbele și hainele celor ce-i slujeau, și paharnicii lui, și arderile de tot pe care le aducea în Casa DOMNULUI; și n-a mai rămas suflare în ea.",
        "Reacția împărătesei, că nu mai era suflare în ea, fusese omisă.",
    ),
    "1KI.12.16": (
        "Când a văzut tot Israelul că împăratul nu-l ascultă, poporul a răspuns împăratului: „Ce parte avem noi cu David? Noi n-avem moștenire cu fiul lui Isai! La corturile tale, Israele! Acum vezi-ți de casă, Davide!”",
        "Când a văzut tot Israelul că împăratul nu-l ascultă, poporul a răspuns împăratului: „Ce parte avem noi cu David? Noi n-avem moștenire cu fiul lui Isai! La corturile tale, Israele! Acum vezi-ți de casă, Davide!” Și Israel s-a dus la corturile lui.",
        "Plecarea lui Israel la corturi fusese omisă.",
    ),
    "1KI.18.26": (
        "Ei au luat juncul pe care li l-au dat și l-au pregătit. Și au chemat numele lui Baal, de dimineață până la amiază, zicând: „Baale, auzi-ne!”",
        "Ei au luat juncul pe care li l-au dat și l-au pregătit. Și au chemat numele lui Baal, de dimineață până la amiază, zicând: „Baale, auzi-ne!” Dar nu s-a auzit niciun glas și nimeni n-a răspuns. Ei săreau în jurul altarului pe care-l făcuseră.",
        "Lipsa glasului, lipsa răspunsului și săritul în jurul altarului fuseseră omise.",
    ),
    "1KI.20.35": (
        "Unul din fiii prorocilor a zis tovarășului său, după porunca DOMNULUI: „Lovește-mă, te rog!”",
        "Unul din fiii prorocilor a zis tovarășului său, după porunca DOMNULUI: „Lovește-mă, te rog!” Dar omul acela n-a vrut să-l lovească.",
        "Refuzul omului de a-l lovi fusese omis.",
    ),
    "1KI.21.13": (
        "Cei doi oameni de nimic au venit și s-au așezat în fața lui; și acești oameni răi au mărturisit așa înaintea poporului, împotriva lui Nabot: „Nabot a blestemat pe Dumnezeu și pe împăratul!”",
        "Cei doi oameni de nimic au venit și s-au așezat în fața lui; și acești oameni răi au mărturisit așa înaintea poporului, împotriva lui Nabot: „Nabot a blestemat pe Dumnezeu și pe împăratul!” Apoi l-au scos afară din cetate, l-au omorât cu pietre și a murit.",
        "Scoaterea lui Nabot din cetate și uciderea lui cu pietre fuseseră omise.",
    ),
    "1KI.22.49": (
        "Atunci Ahazia, fiul lui Ahab, a zis lui Iosafat: „Vrei ca slujitorii mei să meargă împreună cu ai tăi pe corăbii?”",
        "Atunci Ahazia, fiul lui Ahab, a zis lui Iosafat: „Vrei ca slujitorii mei să meargă împreună cu ai tăi pe corăbii?” Dar Iosafat n-a vrut.",
        "Refuzul lui Iosafat fusese omis.",
    ),
    "2KI.4.40": (
        "Au dat oamenilor acelora să mănânce. Dar, cum au mâncat din ciorba aceea, au strigat: „Omule al lui Dumnezeu, moartea este în oală!”",
        "Au dat oamenilor acelora să mănânce. Dar, cum au mâncat din ciorba aceea, au strigat: „Omule al lui Dumnezeu, moartea este în oală!” Și n-au putut să mănânce.",
        "Negația despre imposibilitatea de a mânca fusese omisă.",
    ),
    "2KI.4.41": (
        "Elisei a zis: „Luați făină.” A aruncat făină în oală și a zis: „Dă oamenilor acestora să mănânce.”",
        "Elisei a zis: „Luați făină.” A aruncat făină în oală și a zis: „Dă oamenilor acestora să mănânce.” Și nu mai era nimic vătămător în oală.",
        "WLC și WEBU afirmă că nu mai era nimic vătămător în oală.",
    ),
    "2KI.6.10": (
        "Și împăratul lui Israel a trimis niște oameni să stea la pândă spre locul pe care i-l spusese și despre care îl înștiințase omul lui Dumnezeu. Aceasta s-a întâmplat nu o dată, nici de două ori.",
        "Împăratul lui Israel a trimis oameni la locul despre care îl înștiințase omul lui Dumnezeu și s-a păzit acolo; aceasta s-a întâmplat nu o dată, nici de două ori.",
        "Scopul de pândă nu este în surse; WLC afirmă că împăratul s-a păzit acolo.",
    ),
    "2KI.9.27": (
        "Ahazia, împăratul lui Iuda, când a văzut lucrul acesta, a fugit pe drumul care duce la casa din grădină. Iehu l-a urmărit și a zis: „Lovește-l și pe el în car!”",
        "Ahazia, împăratul lui Iuda, când a văzut lucrul acesta, a fugit pe drumul care duce la casa din grădină. Iehu l-a urmărit și a zis: „Lovește-l și pe el în car!” L-au lovit la suișul Gur, lângă Ibleam. El a fugit la Meghido și a murit acolo.",
        "Suișul Gur, Ibleam, fuga la Meghido și moartea lui Ahazia fuseseră omise.",
    ),
    "2KI.10.6": (
        "Iehu le-a scris o a doua scrisoare în care spunea: „Dacă sunteți ai mei și dacă ascultați de glasul meu, luați capetele oamenilor acelora, fiii stăpânului vostru, și veniți la mine mâine la ceasul acesta, la Izreel.”",
        "Iehu le-a scris o a doua scrisoare în care spunea: „Dacă sunteți ai mei și dacă ascultați de glasul meu, luați capetele oamenilor acelora, fiii stăpânului vostru, și veniți la mine mâine la ceasul acesta, la Izreel.” Cei șaptezeci de fii ai împăratului se aflau la mai-marii cetății, care-i crescuseră.",
        "Cei șaptezeci de fii și oamenii care îi crescuseră fuseseră omiși.",
    ),
    "2KI.13.18": (
        "Elisei a mai zis: „Ia săgeți.” Și a luat. Elisei a zis împăratului lui Israel: „Lovește în pământ!”",
        "Elisei a mai zis: „Ia săgeți.” Și a luat. Elisei a zis împăratului lui Israel: „Lovește în pământ!” Împăratul a lovit de trei ori și s-a oprit.",
        "Cele trei lovituri și oprirea împăratului fuseseră omise.",
    ),
    "2KI.17.16": (
        "Au părăsit toate poruncile DOMNULUI Dumnezeului lor, și-au făcut viței turnați, au făcut idoli de ai Astarteii, s-au închinat înaintea întregii oștiri a cerurilor și au slujit lui Baal.",
        "Au părăsit toate poruncile DOMNULUI Dumnezeului lor, și-au făcut doi viței turnați, au făcut un idol al Astarteii, s-au închinat înaintea întregii oștiri a cerurilor și au slujit lui Baal.",
        "WLC și WEBU precizează doi viței turnați.",
    ),
    "2KI.22.10": (
        "Șafan, logofătul, a mai spus împăratului: „Preotul Hilchia mi-a dat o carte.”",
        "Șafan, logofătul, a mai spus împăratului: „Preotul Hilchia mi-a dat o carte.” Apoi Șafan a citit-o înaintea împăratului.",
        "Citirea cărții înaintea împăratului fusese omisă.",
    ),
}


def digest(verses: list[dict[str, object]]) -> str:
    canonical = "\n".join(f"{verse['number']}\t{verse['text']}" for verse in verses)
    return "sha256:" + hashlib.sha256(canonical.encode("utf-8")).hexdigest()


def main() -> None:
    documents: dict[Path, dict[str, object]] = {}
    planned: list[tuple[str, Path, dict[str, object]]] = []
    mismatches: list[str] = []

    # Validate every precondition before mutating any in-memory document.
    for reference, (expected, replacement, _reason) in REPAIRS.items():
        book, chapter, verse_number = reference.split(".")
        path = DATA / f"{book}.{chapter}.json"
        document = documents.setdefault(
            path, json.loads(path.read_text(encoding="utf-8"))
        )
        verse = next(
            item
            for item in document["verses"]
            if item["number"] == int(verse_number)
        )
        if verse["text"] == replacement:
            continue
        if verse["text"] != expected:
            mismatches.append(reference)
            continue
        planned.append((reference, path, verse))

    if mismatches:
        raise RuntimeError(
            "textul de bază nu mai corespunde auditului istoric: "
            + ", ".join(mismatches)
        )

    changed: list[str] = []
    for reference, _path, verse in planned:
        verse["text"] = REPAIRS[reference][1]
        changed.append(reference)

    planned_histories: dict[Path, dict[str, object]] = {}
    for path, document in documents.items():
        audit = document.setdefault("audit", {})
        history = audit.setdefault("repairHistory", [])
        verse_numbers = sorted(
            int(reference.split(".")[-1])
            for reference in REPAIRS
            if path.name == ".".join(reference.split(".")[:2]) + ".json"
        )
        expected_history: dict[str, object] = {
            "id": AUDIT_ID,
            "scope": "corecții istorice confirmate direct în WLC/OSHB și WEBU fixate",
            "verseNumbers": verse_numbers,
        }
        history_entry = next(
            (item for item in history if item.get("id") == AUDIT_ID), None
        )
        if history_entry is not None and history_entry != expected_history:
            raise RuntimeError(f"istoric incompatibil pentru {path.name}: {AUDIT_ID}")
        planned_histories[path] = expected_history

    for path, document in documents.items():
        audit = document.setdefault("audit", {})
        audit["textDigest"] = digest(document["verses"])
        history = audit.setdefault("repairHistory", [])
        history_entry = next(
            (item for item in history if item.get("id") == AUDIT_ID), None
        )
        if history_entry is None:
            history.append(planned_histories[path])
        path.write_text(
            json.dumps(document, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )

    report_changes = [
        {
            "reference": reference,
            "previous": expected,
            "replacement": replacement,
            "reason": reason,
        }
        for reference, (expected, replacement, reason) in REPAIRS.items()
    ]
    REPORT.write_text(
        json.dumps(
            {
                "repairPass": AUDIT_ID,
                "count": FINDING_COUNT,
                "verseCount": len(REPAIRS),
                "changes": report_changes,
            },
            ensure_ascii=False,
            indent=2,
        )
        + "\n",
        encoding="utf-8",
    )
    print(
        json.dumps(
            {"changedVerses": changed, "findingCount": FINDING_COUNT},
            ensure_ascii=False,
        )
    )


if __name__ == "__main__":
    main()
