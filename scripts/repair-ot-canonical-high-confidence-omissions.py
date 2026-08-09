#!/usr/bin/env python3
"""Repair a small, source-confirmed batch of obvious OT omissions.

Each replacement asserts the inherited text before changing it. The added
clauses are direct Romanian renderings of the pinned WEBU/WLC witnesses, not
copies of a Romanian benchmark.
"""

from __future__ import annotations

import hashlib
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs" / "data" / "biblia-emanus"

REPAIRS: dict[str, tuple[str, str]] = {
    "EST.2.4": ('„Și fata care-i va plăcea împăratului să fie împărăteasă în locul Vastiei.”', '„Și fata care-i va plăcea împăratului să fie împărăteasă în locul Vastiei.” Lucrul a plăcut împăratului, și așa a făcut.'),
    "EST.5.5": ('Și împăratul a zis: „Duceți-vă îndată și aduceți pe Haman, cum dorește Estera.”', 'Și împăratul a zis: „Duceți-vă îndată și aduceți pe Haman, cum dorește Estera.” Împăratul și Haman s-au dus la ospățul pregătit de Estera.'),
    "EST.7.6": ('Estera a răspuns: „Apăsătorul, vrăjmașul este Haman, răul acesta!”', 'Estera a răspuns: „Apăsătorul, vrăjmașul este Haman, răul acesta!” Atunci Haman s-a înspăimântat înaintea împăratului și a împărătesei.'),
    "NEH.2.4": ('Și împăratul mi-a zis: „Ce ceri?”', 'Și împăratul mi-a zis: „Ce ceri?” Atunci m-am rugat Dumnezeului cerurilor.'),
    "NEH.2.6": ('Împăratul, lângă care ședea și împărăteasa, mi-a zis atunci: „Cât va ține călătoria ta și când te vei întoarce?”', 'Împăratul, lângă care ședea și împărăteasa, mi-a zis atunci: „Cât va ține călătoria ta și când te vei întoarce?” Împăratul a găsit cu cale să mă trimită și i-am hotărât un timp.'),
    "NEH.5.12": ('Ei au răspuns: „Le vom da înapoi și nu le vom cere nimic, vom face cum ai zis.”', 'Ei au răspuns: „Le vom da înapoi și nu le vom cere nimic, vom face cum ai zis.” Atunci am chemat preoții și i-am pus să jure că vor face după această făgăduință.'),
    "NEH.8.6": ('Ezra a binecuvântat pe DOMNUL Dumnezeul cel mare, și tot poporul a răspuns ridicând mâinile: „Amin! Amin!”', 'Ezra a binecuvântat pe DOMNUL Dumnezeul cel mare, și tot poporul a răspuns ridicând mâinile: „Amin! Amin!” Apoi s-au plecat și s-au închinat DOMNULUI cu fața la pământ.'),
    "NEH.13.11": ('Am mustrat pe dregători și am zis: „Pentru ce a fost părăsită Casa lui Dumnezeu?”', 'Am mustrat pe dregători și am zis: „Pentru ce a fost părăsită Casa lui Dumnezeu?” I-am adunat și i-am pus iarăși la slujbele lor.'),
    "RUT.1.9": ('„Să vă dea DOMNUL să găsiți odihnă fiecare în casa unui bărbat!”', '„Să vă dea DOMNUL să găsiți odihnă fiecare în casa unui bărbat!” Apoi le-a sărutat, iar ele și-au ridicat glasul și au plâns.'),
    "RUT.2.14": ('La vremea prânzului, Boaz a zis către Rut: „Apropie-te, mănâncă pâine și înmoaie-ți bucata în oțet.”', 'La vremea prânzului, Boaz a zis către Rut: „Apropie-te, mănâncă pâine și înmoaie-ți bucata în oțet.” Ea a șezut lângă secerători; i-au dat grâu prăjit, a mâncat, s-a săturat și i-a rămas.'),
    "RUT.3.16": ('Rut s-a întors la soacra sa, și Naomi a zis: „Tu ești, fiica mea?”', 'Rut s-a întors la soacra sa, și Naomi a zis: „Cum ți-a mers, fiica mea?” Rut i-a povestit tot ce făcuse omul pentru ea.'),
    "JDG.3.28": ('El le-a zis: „Veniți după mine, căci DOMNUL a dat în mâinile voastre pe vrăjmașii voștri moabiți.”', 'El le-a zis: „Veniți după mine, căci DOMNUL a dat în mâinile voastre pe vrăjmașii voștri moabiți.” Ei l-au urmat, au luat vadurile Iordanului împotriva moabiților și n-au lăsat pe nimeni să treacă.'),
    "JDG.4.14": ('Atunci Debora a zis lui Barac: „Scoală-te, căci iată ziua când dă DOMNUL pe Sisera în mâinile tale. Într-adevăr, DOMNUL merge înaintea ta.”', 'Atunci Debora a zis lui Barac: „Scoală-te, căci iată ziua când dă DOMNUL pe Sisera în mâinile tale. Într-adevăr, DOMNUL merge înaintea ta.” Barac s-a coborât de pe muntele Taborului, cu zece mii de oameni după el.'),
    "JDG.4.18": ('Iael a ieșit înaintea lui Sisera și i-a zis: „Intră, domnul meu, intră la mine și nu te teme!”', 'Iael a ieșit înaintea lui Sisera și i-a zis: „Intră, domnul meu, intră la mine și nu te teme!” El a intrat la ea în cort, iar ea l-a acoperit cu o pătură.'),
    "JDG.4.19": ('El a zis: „Dă-mi, te rog, puțină apă să beau, căci mi-e sete.”', 'El a zis: „Dă-mi, te rog, puțină apă să beau, căci mi-e sete.” Ea a deschis un burduf cu lapte, i-a dat să bea și l-a acoperit.'),
    "JDG.4.22": ('Pe când Barac urmărea pe Sisera, Iael i-a ieșit înainte și i-a zis: „Vino, și-ți voi arăta pe omul pe care-l cauți.”', 'Pe când Barac urmărea pe Sisera, Iael i-a ieșit înainte și i-a zis: „Vino, și-ți voi arăta pe omul pe care-l cauți.” El a intrat la ea și a văzut pe Sisera mort, cu țărușul în tâmple.'),
    "JDG.6.24": ('Ghedeon a zidit acolo un altar DOMNULUI și i-a pus numele „DOMNUL păcii”', 'Ghedeon a zidit acolo un altar DOMNULUI și i-a pus numele „DOMNUL păcii”. El este și astăzi în Ofra abiezeriților.'),
    "JDG.7.3": ('Vestește, dar, lucrul acesta în auzul poporului: „Cine este fricos și se teme, să se întoarcă și să se depărteze de muntele Galaadului.”', 'Vestește, dar, lucrul acesta în auzul poporului: „Cine este fricos și se teme, să se întoarcă și să se depărteze de muntele Galaadului.” Douăzeci și două de mii de oameni s-au întors, iar zece mii au rămas.'),
    "JDG.7.11": ('„Să asculți ce vor zice, și după aceea ți se vor întări mâinile: coboară-te, dar, în tabără.”', '„Să asculți ce vor zice, și după aceea ți se vor întări mâinile: coboară-te, dar, în tabără.” Atunci Ghedeon s-a coborât cu Pura, slujitorul său, până la marginea oamenilor înarmați din tabără.'),
    "JDG.8.20": ('Și a zis lui Ieter, întâiul lui născut: „Scoală-te și ucide-i!”', 'Și a zis lui Ieter, întâiul lui născut: „Scoală-te și ucide-i!” Dar tânărul nu și-a scos sabia, fiindcă se temea, căci era încă tânăr.'),
    "JDG.8.21": ('Zebah și Țalmuna au zis: „Scoală-te tu însuți și ucide-ne. Căci cum e omul, așa e și puterea lui.”', 'Zebah și Țalmuna au zis: „Scoală-te tu însuți și ucide-ne. Căci cum e omul, așa e și puterea lui.” Ghedeon s-a sculat, i-a ucis pe Zebah și pe Țalmuna și a luat semilunile de la gâtul cămilelor lor.'),
    "JDG.11.17": ('Atunci Israel a trimis soli împăratului Edomului, ca să-i spună: „Lasă-mă să trec prin țara ta.”', 'Atunci Israel a trimis soli împăratului Edomului, ca să-i spună: „Lasă-mă să trec prin țara ta.” Dar împăratul Edomului n-a ascultat. Israel a trimis și la împăratul Moabului, dar nici el n-a vrut; astfel Israel a rămas la Cades.'),
    "JDG.15.13": ('Ei i-au răspuns: „Nu; vrem numai să te legăm și să te dăm în mâinile lor, dar nu te vom omorî.”', 'Ei i-au răspuns: „Nu; vrem numai să te legăm și să te dăm în mâinile lor, dar nu te vom omorî.” L-au legat cu două funii noi și l-au suit de pe stâncă.'),
    "JDG.16.9": ('Iar niște oameni stăteau la pândă la ea, într-o odaie. Ea i-a zis: „Filistenii sunt asupra ta, Samson!”', 'Iar niște oameni stăteau la pândă la ea, într-o odaie. Ea i-a zis: „Filistenii sunt asupra ta, Samson!” El a rupt funiile cum se rupe un fir de in când atinge focul; și n-au aflat în ce stătea puterea lui.'),
    "JDG.16.12": ('Dalila a luat niște funii noi și l-a legat cu ele. Apoi i-a zis: „Filistenii sunt asupra ta, Samson!”', 'Dalila a luat niște funii noi și l-a legat cu ele. Apoi i-a zis: „Filistenii sunt asupra ta, Samson!” Oamenii stăteau la pândă în odaie, iar el a rupt funiile de pe brațe ca pe un fir.'),
    "JDG.16.14": ('Și ea le-a pironit cu un cui de lemn în pământ. Apoi i-a zis: „Filistenii sunt asupra ta, Samson!”', 'Și ea le-a pironit cu un cui de lemn în pământ. Apoi i-a zis: „Filistenii sunt asupra ta, Samson!” El s-a trezit din somn și a smuls cuiul războiului de țesut, împreună cu țesătura.'),
    "JDG.20.13": ('„Scoateți afară acum pe oamenii aceia stricați din Ghibeea ca să-i omorâm și să curățăm răul din mijlocul lui Israel.”', '„Scoateți afară acum pe oamenii aceia stricați din Ghibeea ca să-i omorâm și să curățăm răul din mijlocul lui Israel.” Dar Beniamin n-a vrut să asculte de glasul fraților lui, copiii lui Israel.'),
    "2SA.6.12": ('Au venit și au spus împăratului David: „DOMNUL a binecuvântat casa lui Obed-Edom și tot ce avea, din pricina chivotului lui Dumnezeu.”', 'Au venit și au spus împăratului David: „DOMNUL a binecuvântat casa lui Obed-Edom și tot ce avea, din pricina chivotului lui Dumnezeu.” David s-a dus și a suit chivotul lui Dumnezeu din casa lui Obed-Edom în cetatea lui David, cu bucurie.'),
    "2SA.9.11": ('El a zis împăratului: „Robul tău va face tot ce poruncește împăratul, domnul meu, robului său.”', 'El a zis împăratului: „Robul tău va face tot ce poruncește împăratul, domnul meu, robului său.” Mefiboșet a mâncat la masa împăratului ca unul dintre fiii împăratului.'),
    "2SA.10.2": ('David a zis: „Voi arăta bunăvoință lui Hanun, fiul lui Nahaș, cum a arătat și tatăl lui față de mine.”', 'David a zis: „Voi arăta bunăvoință lui Hanun, fiul lui Nahaș, cum a arătat și tatăl lui față de mine.” David a trimis pe slujitorii săi să-l mângâie pentru tatăl lui. Slujitorii lui David au venit în țara fiilor lui Amon.'),
    "2SA.11.8": ('Apoi David a zis lui Urie: „Coboară-te acasă și spală-ți picioarele.”', 'Apoi David a zis lui Urie: „Coboară-te acasă și spală-ți picioarele.” Urie a ieșit din casa împăratului, iar după el i-a fost trimis un dar de la împărat.'),
    "2SA.11.12": ('David a zis lui Urie: „Mai rămâi și astăzi aici, și mâine îți voi da drumul.”', 'David a zis lui Urie: „Mai rămâi și astăzi aici, și mâine îți voi da drumul.” Urie a rămas în Ierusalim în ziua aceea și în ziua următoare.'),
    "2SA.13.10": ('Atunci Amnon a zis Tamarei: „Adu-mi mâncarea în odaie și s-o mănânc din mâna ta.”', 'Atunci Amnon a zis Tamarei: „Adu-mi mâncarea în odaie și s-o mănânc din mâna ta.” Tamara a luat turtele pe care le făcuse și le-a dus în odaie la Amnon, fratele ei.'),
    "2SA.13.25": ('Și împăratul a zis lui Absalom: „Nu, fiule, nu vom veni toți, ca să nu-ți fie greu.”', 'Și împăratul a zis lui Absalom: „Nu, fiule, nu vom veni toți, ca să nu-ți fie greu.” Absalom a stăruit, dar împăratul n-a vrut să meargă și l-a binecuvântat.'),
    "2SA.14.24": ('Dar împăratul a zis: „Să se ducă în casa lui și să nu-mi vadă fața.”', 'Dar împăratul a zis: „Să se ducă în casa lui și să nu-mi vadă fața.” Absalom s-a dus în casa lui și n-a văzut fața împăratului.'),
    "2SA.15.9": ('Împăratul i-a zis: „Du-te în pace.”', 'Împăratul i-a zis: „Du-te în pace.” El s-a sculat și s-a dus la Hebron.'),
    "2SA.17.14": ('Absalom și toți oamenii lui Israel au zis: „Sfatul lui Hușai, architul, este mai bun decât sfatul lui Ahitofel.”', 'Absalom și toți oamenii lui Israel au zis: „Sfatul lui Hușai, architul, este mai bun decât sfatul lui Ahitofel.” Căci DOMNUL hotărâse să zădărnicească sfatul bun al lui Ahitofel, ca să aducă nenorocirea peste Absalom.'),
    "2SA.18.21": ('Și Ioab a zis lui Cuși: „Du-te și vestește împăratului ce ai văzut.”', 'Și Ioab a zis lui Cuși: „Du-te și vestește împăratului ce ai văzut.” Cuși s-a plecat înaintea lui Ioab și a alergat.'),
    "2SA.18.23": ('„Orice s-ar întâmpla vreau să alerg”, a zis din nou Ahimaaț. Și Ioab i-a zis: „Dă fuga!”', '„Orice s-ar întâmpla vreau să alerg”, a zis din nou Ahimaaț. Și Ioab i-a zis: „Dă fuga!” Ahimaaț a alergat pe drumul câmpiei și l-a întrecut pe Cuși.'),
    "2SA.18.30": ('Și împăratul a zis: „Stai acolo la o parte.”', 'Și împăratul a zis: „Stai acolo la o parte.” El s-a dus și a stat.'),
    "2SA.19.8": ('Atunci împăratul s-a sculat și a șezut la poartă. Au spus tot poporului: „Iată că împăratul stă la poartă.”', 'Atunci împăratul s-a sculat și a șezut la poartă. Au spus tot poporului: „Iată că împăratul stă la poartă.” Tot poporul a venit înaintea împăratului. Israel fugise, fiecare în cortul lui.'),
    "2SA.19.23": ('Și împăratul a zis lui Șimei: „Nu vei muri!”', 'Și împăratul a zis lui Șimei: „Nu vei muri!” Și împăratul i-a jurat.'),
    "1SA.1.23": ('Elcana, bărbatul ei, i-a zis: „Fă ce vei crede, așteaptă până-l vei înțărca. Numai împlinească-Și DOMNUL cuvântul Lui!”', 'Elcana, bărbatul ei, i-a zis: „Fă ce vei crede, așteaptă până-l vei înțărca. Numai împlinească-Și DOMNUL cuvântul Lui!” Femeia a rămas și și-a alăptat fiul până l-a înțărcat.'),
    "1SA.2.25": ('„Dacă un om păcătuiește împotriva altui om, îl va judeca Dumnezeu; dar dacă păcătuiește împotriva DOMNULUI, cine se va ruga pentru el?”', '„Dacă un om păcătuiește împotriva altui om, îl va judeca Dumnezeu; dar dacă păcătuiește împotriva DOMNULUI, cine se va ruga pentru el?” Totuși ei n-au ascultat de glasul tatălui lor, căci DOMNUL voia să-i omoare.'),
    "1SA.2.30": ('De aceea, iată ce zice DOMNUL Dumnezeul lui Israel: „Spusesem că și casa ta și casa tatălui tău au să umble întotdeauna înaintea Mea.”', 'De aceea, iată ce zice DOMNUL Dumnezeul lui Israel: „Spusesem că și casa ta și casa tatălui tău au să umble întotdeauna înaintea Mea. Dar acum DOMNUL zice: «Departe de Mine! Căci voi cinsti pe cei ce Mă cinstesc, iar cei ce Mă disprețuiesc vor fi disprețuiți.»”'),
    "1SA.4.14": ('Eli, auzind aceste strigăte, a zis: „Ce însemnă zarva aceasta?”', 'Eli, auzind aceste strigăte, a zis: „Ce însemnă zarva aceasta?” Omul s-a grăbit, a venit și i-a spus lui Eli.'),
    "1SA.4.20": ('Când trăgea să moară, femeile care erau lângă ea i-au zis: „Nu te teme, căci ai născut un fiu!”', 'Când trăgea să moară, femeile care erau lângă ea i-au zis: „Nu te teme, căci ai născut un fiu!” Dar ea n-a răspuns și n-a luat aminte.'),
    "1SA.4.21": ('A pus copilului numele I-Cabod zicând: „S-a dus slava din Israel!”', 'A pus copilului numele I-Cabod zicând: „S-a dus slava din Israel!”, căci chivotul lui Dumnezeu fusese luat și din pricina socrului ei și a bărbatului ei.'),
    "1SA.9.9": ('Odinioară în Israel, când se ducea cineva să întrebe pe Dumnezeu, zicea: „Haidem să mergem la văzător!”', 'Odinioară în Israel, când se ducea cineva să întrebe pe Dumnezeu, zicea: „Haidem să mergem la văzător!”, căci acela care se numește azi proroc se numea odinioară văzător.'),
    "1SA.9.10": ('Saul a zis slugii: „Ai dreptate; haidem să mergem!”', 'Saul a zis slugii: „Ai dreptate; haidem să mergem!” Și s-au dus în cetatea unde era omul lui Dumnezeu.'),
    "1SA.10.16": ('Și Saul a răspuns unchiului său: „Ne-a spus că măgărițele s-au găsit.”', 'Și Saul a răspuns unchiului său: „Ne-a spus că măgărițele s-au găsit.” Dar nu i-a spus nimic despre împărăție, despre care vorbise Samuel.'),
    "1SA.11.9": ('Ei au zis solilor care veniseră: „Așa să vorbiți locuitorilor Iabesului din Galaad: „Mâine, când va dogori soarele, veți avea ajutor.””', 'Ei au zis solilor care veniseră: „Așa să vorbiți locuitorilor Iabesului din Galaad: «Mâine, când va dogori soarele, veți avea ajutor.»” Solii s-au dus și le-au spus oamenilor din Iabes; iar ei s-au bucurat.'),
    "1SA.13.4": ('Tot Israelul a auzit zicându-se: „Saul a bătut tabăra filistenilor, și Israel s-a făcut urât filistenilor.”', 'Tot Israelul a auzit zicându-se: „Saul a bătut tabăra filistenilor, și Israel s-a făcut urât filistenilor.” Poporul s-a strâns după Saul la Ghilgal.'),
    "1SA.14.9": ('Dacă ne vor zice: „Opriți-vă până vom veni noi la voi!”', 'Dacă ne vor zice: „Opriți-vă până vom veni noi la voi!”, atunci vom rămâne pe loc și nu ne vom sui la ei.'),
    "1SA.14.18": ('Și Saul a zis lui Ahia: „Adu încoace chivotul lui Dumnezeu!”', 'Și Saul a zis lui Ahia: „Adu încoace chivotul lui Dumnezeu!” Căci chivotul lui Dumnezeu era atunci cu copiii lui Israel.'),
    "1SA.14.41": ('Saul a zis DOMNULUI: „Dumnezeul lui Israel, arată adevărul. Dă un sorț întreg.”', 'Saul a zis DOMNULUI: „Dumnezeul lui Israel, arată adevărul. Dă un sorț întreg.” Ionatan și Saul au fost aleși, dar poporul a scăpat.'),
    "1SA.15.11": ('„Îmi pare rău că am pus pe Saul împărat, căci se abate de la Mine și nu păzește cuvintele Mele.”', '„Îmi pare rău că am pus pe Saul împărat, căci se abate de la Mine și nu păzește cuvintele Mele.” Samuel s-a mâhnit și a strigat către DOMNUL toată noaptea.'),
    "1SA.16.5": ('El a răspuns: „Da; vin să aduc o jertfă DOMNULUI. Sfințiți-vă și veniți cu mine la jertfă.”', 'El a răspuns: „Da; vin să aduc o jertfă DOMNULUI. Sfințiți-vă și veniți cu mine la jertfă.” Apoi i-a sfințit pe Isai și pe fiii lui și i-a chemat la jertfă.'),
    "1SA.17.43": ('Filisteanul a zis lui David: „Ce! sunt câine, de vii la mine cu toiege?”', 'Filisteanul a zis lui David: „Ce! sunt câine, de vii la mine cu toiege?” Și filisteanul l-a blestemat pe David pe dumnezeii lui.'),
    "1SA.18.11": ('Saul a ridicat sulița, zicându-și în sine: „Voi pironi pe David de perete.”', 'Saul a ridicat sulița, zicându-și în sine: „Voi pironi pe David de perete.” David a scăpat de două ori dinaintea lui.'),
    "1SA.20.36": ('El i-a zis: „Dă fuga și găsește săgețile pe care le voi trage.”', 'El i-a zis: „Dă fuga și găsește săgețile pe care le voi trage.” Pe când băiatul alerga, el a tras o săgeată dincolo de el.'),
    "1SA.24.8": ('După aceea, David s-a sculat și a ieșit din peșteră. El a început să strige atunci după Saul: „Împărate, domnul meu!”', 'După aceea, David s-a sculat și a ieșit din peșteră. El a început să strige atunci după Saul: „Împărate, domnul meu!” Când Saul s-a uitat înapoi, David s-a plecat cu fața la pământ și s-a închinat.'),
    "1SA.24.16": ('Când a sfârșit David de spus aceste vorbe lui Saul, Saul a zis: „Glasul tău este, fiule David?”', 'Când a sfârșit David de spus aceste vorbe lui Saul, Saul a zis: „Glasul tău este, fiule David?” Saul și-a ridicat glasul și a plâns.'),
    "1SA.28.14": ('El i-a zis: „Cum e la chip?” Și ea a răspuns: „Este un bătrân care se scoală și este învelit cu o mantie.”', 'El i-a zis: „Cum e la chip?” Și ea a răspuns: „Este un bătrân care se scoală și este învelit cu o mantie.” Saul a înțeles că era Samuel și s-a plecat cu fața la pământ și s-a închinat.'),
    "1SA.30.7": ('El a zis preotului Abiatar, fiul lui Ahimelec: „Adu-mi efodul!”', 'El a zis preotului Abiatar, fiul lui Ahimelec: „Adu-mi efodul!” Abiatar a adus efodul la David.'),
    "1SA.31.4": ('Saul a zis atunci celui ce-i ducea armele: „Scoate-ți sabia și străpunge-mă, ca nu cumva acești netăiați împrejur să vină să mă străpungă și să-și bată joc de mine.”', 'Saul a zis atunci celui ce-i ducea armele: „Scoate-ți sabia și străpunge-mă, ca nu cumva acești netăiați împrejur să vină să mă străpungă și să-și bată joc de mine.” Dar cel ce-i ducea armele n-a vrut, căci se temea foarte tare. Atunci Saul și-a luat sabia și s-a aruncat în ea.'),
    "1CH.10.4": (
        'Saul a zis atunci celui ce-i ducea armele: „Scoate-ți sabia și străpunge-mă cu ea, ca nu cumva să vină acești netăiați împrejur să mă batjocorească.”',
        'Saul a zis atunci celui ce-i ducea armele: „Scoate-ți sabia și străpunge-mă cu ea, ca nu cumva să vină acești netăiați împrejur să mă batjocorească.” Cel ce-i ducea armele n-a vrut, căci se temea foarte tare. Atunci Saul și-a luat sabia și s-a aruncat în ea.',
    ),
    "1CH.11.5": (
        'Locuitorii Iebusului au zis lui David: „Nu vei intra aici.”',
        'Locuitorii Iebusului au zis lui David: „Nu vei intra aici.” Totuși David a luat cetățuia Sionului, adică cetatea lui David.',
    ),
    "1CH.11.6": (
        'David zisese: „Oricine va bate cel dintâi pe iebusiți va fi căpetenie și domn.”',
        'David zisese: „Oricine va bate cel dintâi pe iebusiți va fi căpetenie și domn.” Ioab, fiul Țeruiei, s-a suit cel dintâi și a fost făcut căpetenie.',
    ),
    "1CH.14.5": (
        'Ibhar, Elișua, Elfelet,',
        'Ibhar, Elișua, Elpelet,',
    ),
    "1CH.19.2": (
        'David a zis: „Voi arăta bunăvoință lui Hanun, fiul lui Nahaș, căci tatăl lui a arătat bunăvoință față de mine.”',
        'David a zis: „Voi arăta bunăvoință lui Hanun, fiul lui Nahaș, căci tatăl lui a arătat bunăvoință față de mine.” David a trimis soli să-l mângâie pentru tatăl lui. Slujitorii lui David au venit în țara fiilor lui Amon, la Hanun, ca să-l mângâie.',
    ),
    "1KI.1.5": (
        'Adonia, fiul Haghitei, s-a sumețit până acolo încât a zis: „Eu voi fi împărat!”',
        'Adonia, fiul Haghitei, s-a sumețit până acolo încât a zis: „Eu voi fi împărat!” Apoi și-a pregătit care și călăreți, și cincizeci de oameni care alergau înaintea lui.',
    ),
    "1KI.1.6": (
        'Tatăl său nu-l mustrase niciodată în viața lui, zicând: „Pentru ce faci așa?”',
        'Tatăl său nu-l mustrase niciodată în viața lui, zicând: „Pentru ce faci așa?” El era și foarte frumos la chip și se născuse după Absalom.',
    ),
    "1KI.1.23": (
        'Au dat de știre împăratului și au zis: „Iată că a venit prorocul Natan!”',
        'Au dat de știre împăratului și au zis: „Iată că a venit prorocul Natan!” Când a intrat înaintea împăratului, s-a plecat cu fața la pământ înaintea lui.',
    ),
    "1KI.1.28": (
        'Împăratul David a răspuns: „Chemați-mi pe Bat-Șeba.”',
        'Împăratul David a răspuns: „Chemați-mi pe Bat-Șeba.” Ea a venit înaintea împăratului și a stat înaintea lui.',
    ),
    "1KI.3.24": (
        'Apoi a adăugat: „Aduceți-mi o sabie.”',
        'Apoi a adăugat: „Aduceți-mi o sabie.” I-au adus sabia înaintea împăratului.',
    ),
    "1KI.13.4": (
        'Când a auzit împăratul cuvântul pe care-l strigase omul lui Dumnezeu împotriva altarului din Betel, a întins mâna de pe altar, zicând: „Prindeți-l!”',
        'Când a auzit împăratul cuvântul pe care-l strigase omul lui Dumnezeu împotriva altarului din Betel, a întins mâna de pe altar, zicând: „Prindeți-l!” Mâna pe care o întinsese împotriva lui s-a uscat, și nu putea s-o tragă înapoi.',
    ),
    "1KI.13.6": (
        'Atunci împăratul a luat cuvântul și a zis omului lui Dumnezeu: „Roagă-te DOMNULUI Dumnezeului tău și cere-I să-mi pot trage mâna înapoi.”',
        'Atunci împăratul a luat cuvântul și a zis omului lui Dumnezeu: „Roagă-te DOMNULUI Dumnezeului tău și cere-I să-mi pot trage mâna înapoi.” Omul lui Dumnezeu s-a rugat DOMNULUI, iar mâna împăratului i s-a întors și a ajuns cum fusese mai înainte.',
    ),
    "1KI.13.13": (
        'Și a zis fiilor săi: „Puneți-mi șaua pe măgar.”',
        'Și a zis fiilor săi: „Puneți-mi șaua pe măgar.” Fiii lui i-au pus șaua pe măgar, iar el a încălecat pe el.',
    ),
    "1KI.16.16": (
        'Și poporul a auzit în tabără vestea aceasta: „Zimri a uneltit și chiar a ucis pe împărat!”',
        'Și poporul a auzit în tabără vestea aceasta: „Zimri a uneltit și chiar a ucis pe împărat!” Atunci tot Israelul l-a făcut pe Omri, căpetenia oștirii, împărat peste Israel în ziua aceea, în tabără.',
    ),
    "1KI.18.40": (
        '„Puneți mâna pe prorocii lui Baal”, le-a zis Ilie, „niciunul să nu scape!”',
        '„Puneți mâna pe prorocii lui Baal”, le-a zis Ilie, „niciunul să nu scape!” Ei au pus mâna pe ei, iar Ilie i-a coborât la pârâul Chișon și i-a ucis acolo.',
    ),
    "1KI.20.37": (
        'A găsit pe un alt om și a zis: „Lovește-mă, te rog!”',
        'A găsit pe un alt om și a zis: „Lovește-mă, te rog!” Omul l-a lovit și l-a rănit.',
    ),
    "1KI.21.4": (
        'Ahab a intrat în casă, trist și mâniat, din pricina cuvintelor pe care i le spusese Nabot din Izreel: „Nu-ți voi da moștenirea părinților mei!”',
        'Ahab a intrat în casă, trist și mâniat, din pricina cuvintelor pe care i le spusese Nabot din Izreel: „Nu-ți voi da moștenirea părinților mei!” S-a culcat pe pat, și-a întors fața și n-a vrut să mănânce pâine.',
    ),
    "1KI.22.32": (
        'Când au zărit căpeteniile carelor pe Iosafat, au zis: „Negreșit, acesta este împăratul lui Israel.”',
        'Când au zărit căpeteniile carelor pe Iosafat, au zis: „Negreșit, acesta este împăratul lui Israel.” S-au întors să lupte împotriva lui, iar Iosafat a strigat.',
    ),
    "2CH.18.29": (
        'Împăratul lui Israel a zis lui Iosafat: „Vreau să-mi schimb hainele, ca să mă duc la luptă; dar tu, îmbracă-te cu hainele tale.”',
        'Împăratul lui Israel a zis lui Iosafat: „Vreau să-mi schimb hainele, ca să mă duc la luptă; dar tu, îmbracă-te cu hainele tale.” Împăratul lui Israel și-a schimbat hainele, iar ei au intrat în luptă.',
    ),
    "2KI.1.12": (
        'Ilie le-a răspuns: „Dacă sunt un om al lui Dumnezeu, să se coboare foc din cer și să te mistuie, pe tine și pe cei cincizeci de oameni ai tăi!”',
        'Ilie le-a răspuns: „Dacă sunt un om al lui Dumnezeu, să se coboare foc din cer și să te mistuie, pe tine și pe cei cincizeci de oameni ai tăi!” Focul lui Dumnezeu s-a coborât din cer și l-a mistuit pe el și pe cei cincizeci de oameni ai lui.',
    ),
    "2KI.1.15": (
        'Îngerul DOMNULUI a zis lui Ilie: „Coboară-te împreună cu el, n-ai nicio frică de el.”',
        'Îngerul DOMNULUI a zis lui Ilie: „Coboară-te împreună cu el, n-ai nicio frică de el.” Atunci Ilie s-a sculat și s-a coborât cu el la împărat.',
    ),
    "2KI.2.12": (
        'Elisei se uita și striga: „Părinte! Părinte! Carul lui Israel și călărimea lui!”',
        'Elisei se uita și striga: „Părinte! Părinte! Carul lui Israel și călărimea lui!” Și nu l-a mai văzut. Apoi și-a apucat hainele și le-a rupt în două bucăți.',
    ),
    "2KI.2.14": (
        'a luat mantaua, căreia îi dăduse Ilie drumul, și a lovit apele cu ea și a zis: „Unde este acum DOMNUL Dumnezeul lui Ilie?”',
        'A luat mantaua, căreia îi dăduse Ilie drumul, și a lovit apele cu ea și a zis: „Unde este acum DOMNUL Dumnezeul lui Ilie?” Când a lovit și el apele, acestea s-au despărțit într-o parte și într-alta, iar Elisei a trecut.',
    ),
    "2KI.2.15": (
        'Fiii prorocilor care erau în fața Ierihonului, când l-au văzut, au zis: „Duhul lui Ilie a venit peste Elisei.”',
        'Fiii prorocilor care erau în fața Ierihonului, când l-au văzut, au zis: „Duhul lui Ilie a venit peste Elisei.” Au venit înaintea lui și s-au plecat până la pământ.',
    ),
    "2KI.2.17": (
        'Dar ei au stăruit multă vreme de el. Și el a zis: „Trimiteți-i.”',
        'Dar ei au stăruit multă vreme de el. Și el a zis: „Trimiteți-i.” Au trimis cincizeci de oameni, care l-au căutat trei zile, dar nu l-au găsit.',
    ),
    "2KI.3.12": (
        'Și Iosafat a zis: „Cuvântul DOMNULUI este cu el.”',
        'Și Iosafat a zis: „Cuvântul DOMNULUI este cu el.” Atunci împăratul lui Israel, Iosafat și împăratul Edomului s-au coborât la el.',
    ),
    "2KI.4.12": (
        'El a zis slujitorului său, Ghehazi: „Cheamă pe sunamita aceasta!”',
        'El a zis slujitorului său, Ghehazi: „Cheamă pe sunamita aceasta!” Ghehazi a chemat-o și ea a stat înaintea lui.',
    ),
    "2KI.5.5": (
        'Și împăratul Siriei a zis: „Du-te la Samaria, și voi trimite o scrisoare împăratului lui Israel.”',
        'Și împăratul Siriei a zis: „Du-te la Samaria, și voi trimite o scrisoare împăratului lui Israel.” El a plecat, luând cu el zece talanți de argint, șase mii de sicli de aur și zece haine de schimb.',
    ),
    "2KI.5.16": (
        'Elisei a răspuns: „Viu este DOMNUL, al cărui slujitor sunt, că nu voi primi.”',
        'Elisei a răspuns: „Viu este DOMNUL, al cărui slujitor sunt, că nu voi primi.” Naaman a stăruit să primească, dar Elisei a refuzat.',
    ),
    "2KI.6.20": (
        'Când au intrat în Samaria, Elisei a zis: „DOAMNE, deschide ochii oamenilor acestora să vadă!”',
        'Când au intrat în Samaria, Elisei a zis: „DOAMNE, deschide ochii oamenilor acestora să vadă!” DOMNUL le-a deschis ochii, și au văzut că erau în mijlocul Samariei.',
    ),
    "2KI.9.32": (
        'El a ridicat fața spre fereastră și a zis: „Cine este pentru mine? Cine?”',
        'El a ridicat fața spre fereastră și a zis: „Cine este pentru mine? Cine?” Doi sau trei fameni s-au uitat pe fereastră la el.',
    ),
    "2KI.10.16": (
        'și a zis: „Vino cu mine și vei vedea râvna mea pentru DOMNUL.”',
        'Și a zis: „Vino cu mine și vei vedea râvna mea pentru DOMNUL.” L-au făcut să meargă cu el în carul lui.',
    ),
    "2KI.10.25": (
        'Când au isprăvit de adus arderile de tot, Iehu a zis alergătorilor și căpeteniilor: „Intrați și loviți-i: unul să nu iasă.”',
        'Când au isprăvit de adus arderile de tot, Iehu a zis alergătorilor și căpeteniilor: „Intrați și loviți-i: unul să nu iasă.” I-au lovit cu ascuțișul sabiei. Alergătorii și căpeteniile au aruncat trupurile afară și au intrat în locul dinăuntru al templului lui Baal.',
    ),
    "2KI.13.15": (
        'Elisei i-a zis: „Ia un arc și săgeți!”',
        'Elisei i-a zis: „Ia un arc și săgeți!” El a luat un arc și săgeți.',
    ),
    "2KI.13.16": (
        'Apoi Elisei a zis împăratului lui Israel: „Încordează arcul cu mâna ta.”',
        'Apoi Elisei a zis împăratului lui Israel: „Încordează arcul cu mâna ta.” El și-a pus mâna pe arc, iar Elisei și-a pus mâinile pe mâinile împăratului.',
    ),
    "2KI.18.14": (
        'Ezechia, împăratul lui Iuda, a trimis să spună împăratului Asiriei la Lachis: „Am greșit! Depărtează-te de mine. Ce vei pune asupra mea voi purta.”',
        'Ezechia, împăratul lui Iuda, a trimis să spună împăratului Asiriei la Lachis: „Am greșit! Depărtează-te de mine. Ce vei pune asupra mea voi purta.” Împăratul Asiriei a pus asupra lui Ezechia trei sute de talanți de argint și treizeci de talanți de aur.',
    ),
    "2KI.22.8": (
        'Atunci marele preot Hilchia a zis lui Șafan, logofătul: „Am găsit cartea Legii în Casa DOMNULUI.”',
        'Atunci marele preot Hilchia a zis lui Șafan, logofătul: „Am găsit cartea Legii în Casa DOMNULUI.” Hilchia i-a dat cartea lui Șafan, iar acesta a citit-o.',
    ),
    "2KI.23.18": (
        'Și el a zis: „Lăsați-l; nimeni să nu-i miște oasele!”',
        'Și el a zis: „Lăsați-l; nimeni să nu-i miște oasele!” Așa i-au lăsat oasele neatinse, împreună cu oasele prorocului care venise din Samaria.',
    ),
    "JOB.7.4": (
        'Mă culc și zic: „Când mă voi scula? Când se va sfârși noaptea?”',
        'Mă culc și zic: „Când mă voi scula? Când se va sfârși noaptea?” Și mă satur de frământări până în revărsatul zorilor.',
    ),
    "JOB.19.28": (
        'Atunci veți zice: „Pentru ce-l urmăream noi?”',
        'Atunci veți zice: „Pentru ce-l urmăream noi? Căci rădăcina pricinii se află în mine.”',
    ),
    "JOB.24.15": (
        'Ochiul preacurvarului pândește amurgul: „Nimeni nu mă va vedea”',
        'Ochiul preacurvarului pândește amurgul: „Nimeni nu mă va vedea”, și își acoperă fața.',
    ),
    "PSA.24.10": (
        '„Cine este acest Împărat al slavei?”',
        '„Cine este acest Împărat al slavei?” DOMNUL oștirilor: El este Împăratul slavei! – (Oprire)',
    ),
    "PSA.27.8": (
        'Inima îmi zice din partea Ta: „Caută fața Mea!”',
        'Inima îmi zice din partea Ta: „Caută fața Mea!” Și fața Ta, DOAMNE, o caut!',
    ),
    "PSA.31.22": (
        'În pornirea mea nechibzuită ziceam: „Sunt izgonit dinaintea Ta!”',
        'În pornirea mea nechibzuită ziceam: „Sunt izgonit dinaintea Ta!” Dar Tu ai auzit glasul rugăciunilor mele când am strigat spre Tine.',
    ),
    "PSA.73.15": (
        'Dacă aș zice: „Vreau să vorbesc ca ei”',
        'Dacă aș zice: „Vreau să vorbesc ca ei”, iată că n-aș fi credincios neamului copiilor Tăi.',
    ),
    "PSA.74.8": (
        'Ei ziceau în inima lor: „Să-i prăpădim pe toți!”',
        'Ei ziceau în inima lor: „Să-i prăpădim pe toți!” Au ars toate locașurile sfinte din țară.',
    ),
    "PSA.85.2": (
        'ai iertat nelegiuirea poporului Tău,',
        'ai iertat nelegiuirea poporului Tău și ai acoperit toate păcatele lor. (Oprire)',
    ),
    "PSA.87.5": (
        'Iar despre Sion este zis: „Toți s-au născut în el”',
        'Iar despre Sion se va zice: „Acesta și acela s-au născut în el”, iar Cel Preaînalt îl întărește.',
    ),
    "PSA.91.9": (
        'Pentru că zici: „DOMNUL este locul meu de adăpost!”',
        'Pentru că zici: „DOMNUL este locul meu de adăpost!” și faci din Cel Preaînalt locuința ta,',
    ),
    "PRO.7.4": (
        'Zi înțelepciunii: „Tu ești sora mea!”',
        'Zi înțelepciunii: „Tu ești sora mea!” și numește priceperea prietena ta,',
    ),
    "PRO.9.4": (
        '„Cine este prost, să vină încoace!”',
        '„Cine este prost, să vină încoace!” Celor lipsiți de pricepere le zice:',
    ),
    "PRO.9.16": (
        '„Cine este prost, să vină aici!”',
        '„Cine este prost, să vină aici!” Iar celui fără minte îi zice:',
    ),
    "PRO.20.22": (
        'Nu zice: „Îi voi întoarce eu răul!”',
        'Nu zice: „Îi voi întoarce eu răul!” Nădăjduiește în DOMNUL, și El te va ajuta.',
    ),
    "PRO.23.7": (
        'căci el este ca unul care își face socotelile în suflet. „Mănâncă și bea,”',
        'căci el este ca unul care își face socotelile în suflet. „Mănâncă și bea”, îți va zice el, dar inima lui nu este cu tine.',
    ),
    "PRO.24.24": (
        'Pe cine zice celui rău: „Tu ești bun!”',
        'Pe cine zice celui rău: „Tu ești bun!” îl blestemă popoarele și-l urăsc neamurile.',
    ),
    "PRO.25.7": (
        'căci este mai bine să ți se zică: „Suie-te mai sus!”',
        'căci este mai bine să ți se zică: „Suie-te mai sus!” decât să fii coborât înaintea voievodului pe care ți-l văd ochii.',
    ),
    "PRO.30.9": (
        'Ca nu cumva, în belșug, să mă lepăd de Tine și să zic: „Cine este DOMNUL?”',
        'Ca nu cumva, în belșug, să mă lepăd de Tine și să zic: „Cine este DOMNUL?” Sau ca nu cumva, în sărăcie, să fur și să iau în deșert Numele Dumnezeului meu.',
    ),
    "ECC.1.10": (
        'Dacă este vreun lucru despre care s-ar putea spune: „Iată ceva nou!”',
        'Dacă este vreun lucru despre care s-ar putea spune: „Iată ceva nou!”, demult lucrul acela era și în veacurile dinaintea noastră.',
    ),
    "ECC.2.1": (
        'Am zis inimii mele: „Haide! Vreau să te încerc cu veselie, și gustă fericirea.”',
        'Am zis inimii mele: „Haide! Vreau să te încerc cu veselie, și gustă fericirea.” Dar iată că și aceasta este o deșertăciune.',
    ),
    "ECC.5.6": (
        'Nu lăsa gura să te bage în păcat și nu zice înaintea trimisului lui Dumnezeu: „M-am pripit.”',
        'Nu lăsa gura să te bage în păcat și nu zice înaintea trimisului lui Dumnezeu: „M-am pripit.” Pentru ce să Se mânie Dumnezeu din pricina cuvintelor tale și să nimicească lucrarea mâinilor tale?',
    ),
    "ECC.9.16": (
        'Atunci am zis: „Mai bună este înțelepciunea decât tăria!”',
        'Atunci am zis: „Mai bună este înțelepciunea decât tăria!” Totuși, înțelepciunea săracului este disprețuită și nimeni nu-l ascultă.',
    ),
    "AMO.5.16": (
        'De aceea, așa vorbește DOMNUL Dumnezeul oștirilor, Cel Atotputernic: „În toate piețele se vor boci și pe toate ulițele vor zice: „Vai! Vai!””',
        'De aceea, așa vorbește DOMNUL Dumnezeul oștirilor, Cel Atotputernic: „În toate piețele se vor boci și pe toate ulițele vor zice: «Vai! Vai!» Vor chema pe plugar la jale și pe cei iscusiți în bocire la tânguire.”',
    ),
    "EZK.2.3": (
        'El mi-a zis: „Fiul omului, te trimit la copiii lui Israel, la aceste „popoare îndărătnice””',
        'El mi-a zis: „Fiul omului, te trimit la copiii lui Israel, la un neam de răzvrătiți, care s-a răzvrătit împotriva Mea; ei și părinții lor au păcătuit împotriva Mea până în ziua aceasta.”',
    ),
    "EZK.5.15": (
        'Vei ajunge de ocară și de rușine, vei fi o pildă și o groază pentru neamurile care te înconjoară, când voi aduce la îndeplinire judecățile Mele împotriva ta, cu mânie, cu urgie și cu pedepse aspre – Eu, DOMNUL, o spun – când voi arunca împotriva lor săgețile nimicitoare ale foametei care dau moartea și pe care le voi trimite să vă nimicească.',
        'Vei ajunge de ocară și de rușine, vei fi o pildă și o groază pentru neamurile care te înconjoară, când voi aduce la îndeplinire judecățile Mele împotriva ta, cu mânie, cu urgie și cu pedepse aspre – Eu, DOMNUL, o spun.',
    ),
    "EZK.5.16": (
        'Căci la nenorocirile voastre voi mai adăuga și foametea și vă voi sfărâma toiagul pâinii.',
        'Când voi trimite asupra voastră săgețile nimicitoare ale foametei, care sunt spre pierzare și pe care le voi trimite ca să vă nimicesc, voi adăuga foamete peste voi și vă voi sfărâma toiagul pâinii.',
    ),
    "EZK.8.8": (
        'Și mi-a zis: „Fiul omului, ia sapă în perete!”',
        'Și mi-a zis: „Fiul omului, sapă acum în perete!” Am săpat în perete și iată că era o ușă.',
    ),
    "EZK.9.7": (
        'Și El le-a zis: „Spurcați Casa și umpleți curțile cu morți!… Ieșiți…”',
        'Și El le-a zis: „Spurcați Casa și umpleți curțile cu morți! Ieșiți!” Ei au ieșit și au ucis în cetate.',
    ),
    "EZK.13.6": (
        'Vedeniile lor sunt înșelătoare, și prorociile lor mincinoase. Ei zic: „Așa vorbește DOMNUL!”',
        'Au văzut năluciri și ghiciri mincinoase, ei care zic: „Așa vorbește DOMNUL!”, deși DOMNUL nu i-a trimis; totuși, ei fac pe oameni să nădăjduiască în împlinirea cuvântului.',
    ),
    "EZK.28.9": (
        'Vei mai zice tu atunci în fața ucigașului tău: „Sunt Dumnezeu”',
        'Vei mai zice tu, în fața ucigașului tău: „Sunt Dumnezeu”? Dar ești om, și nu Dumnezeu, în mâna celui ce te rănește.',
    ),
    "EZK.33.17": (
        'Copiii poporului tău zic: „Calea DOMNULUI nu este dreaptă!”',
        'Totuși copiii poporului tău zic: „Calea DOMNULUI nu este dreaptă!”, dar calea lor nu este dreaptă.',
    ),
    "ISA.10.4": (
        '„Unii vor fi îngenuncheați între cei prinși în război, iar alții vor cădea între cei morți.”',
        'Unii vor fi îngenuncheați între cei prinși în război, iar alții vor cădea între cei morți. Cu toate acestea, mânia Lui nu se întoarce și mâna Lui este încă întinsă.',
    ),
    "ISA.38.8": (
        '„voi întoarce înapoi cu zece trepte umbra treptelor cu care s-a coborât soarele pe cadranul lui Ahaz.”',
        '„Iată, voi întoarce înapoi cu zece trepte umbra treptelor cu care s-a coborât soarele pe cadranul lui Ahaz.” Și soarele s-a întors cu zece trepte pe cadranul pe care coborâse.',
    ),
    "ISA.41.26": (
        'Cine a vestit lucrul acesta de la început, ca să-l știm, și cu mult înainte, ca să zicem: „Are dreptate”',
        'Cine a vestit lucrul acesta de la început, ca să-l știm, și cu mult înainte, ca să zicem: „Are dreptate”? Dar nimeni nu a vestit, nimeni nu a făcut cunoscut și nimeni nu a auzit cuvintele voastre.',
    ),
    "ISA.49.9": (
        'să spui prinșilor de război: „Ieșiți!”, și celor ce sunt în întuneric: „Arătați-vă!”',
        'să spui prinșilor de război: „Ieșiți!”, și celor ce sunt în întuneric: „Arătați-vă!” Ei vor paște de-a lungul drumurilor, și pășunea lor va fi pe toate înălțimile golașe.',
    ),
    "ISA.65.8": (
        'Așa vorbește DOMNUL: „După cum, când se găsește zeamă într-un strugure, se zice: „Nu-l nimici, căci este o binecuvântare în el!””',
        'Așa vorbește DOMNUL: „După cum, când se găsește must într-un ciorchine, se zice: «Nu-l nimici, căci este o binecuvântare în el!», tot așa voi face de dragul robilor Mei, ca să nu nimicesc totul.”',
    ),
    "JER.2.20": (
        'Demult ți-ai sfărâmat jugul, ți-ai rupt legăturile și ai zis: „Nu mai vreau să slujesc ca un rob!”',
        'Căci, demult ți-am sfărâmat jugul, ți-am rupt legăturile, iar tu ai zis: „Nu voi sluji!” Căci pe orice deal înalt și sub orice copac verde te întindeai ca o prostituată.',
    ),
    "JER.8.8": (
        'Cum puteți voi să ziceți: „Suntem înțelepți, și Legea DOMNULUI este cu noi”',
        'Cum puteți voi să ziceți: „Suntem înțelepți, și Legea DOMNULUI este cu noi”? Iată, pana mincinoasă a cărturarilor a prefăcut-o în minciună.',
    ),
    "JER.20.8": (
        'Căci, ori de câte ori vorbesc, trebuie să strig: „Silnicie și apăsare!”',
        'Căci, ori de câte ori vorbesc, trebuie să strig: „Silnicie și pustiire!” Căci cuvântul DOMNULUI mi-a adus ocară și batjocură toată ziua.',
    ),
    "JER.22.21": (
        'Ți-am vorbit când îți mergea bine; dar tu ziceai: „Nu pot s-ascult!”',
        'Ți-am vorbit când îți mergea bine, dar tu ziceai: „Nu voi asculta!” Aceasta a fost calea ta din tinerețea ta: nu ai ascultat de glasul Meu.',
    ),
    "JER.36.15": (
        'Ei i-au zis: „Șezi și citește-o în auzul nostru.”',
        'Ei i-au zis: „Șezi și citește-o în auzul nostru.” Atunci Baruc a citit-o în auzul lor.',
    ),
    "JER.48.2": (
        'S-a dus fala Moabului, la Hesbon i se pune la cale pieirea: „Haidem să-l nimicim din mijlocul neamurilor!”',
        'S-a dus fala Moabului; la Hesbon i se pune la cale pieirea: „Haideți să-l nimicim din mijlocul neamurilor!” Și tu, Madmen, vei fi adus la tăcere; sabia te va urmări.',
    ),
    "MIC.7.10": (
        'Când va vedea vrăjmașa mea lucrul acesta, va fi acoperită de rușine, ea care-mi zicea: „Unde este DOMNUL Dumnezeul tău?”',
        'Când va vedea vrăjmașa mea lucrul acesta, va fi acoperită de rușine, ea care-mi zicea: „Unde este DOMNUL Dumnezeul tău?” Ochii mei o vor vedea; acum ea va fi călcată în picioare ca noroiul de pe ulițe.',
    ),
    "ZEC.14.20": (
        'În ziua aceea, va sta scris până și pe zurgălăii cailor: „Sfinți DOMNULUI!”',
        'În ziua aceea, va sta scris până și pe zurgălăii cailor: „Sfinți DOMNULUI!” Și oalele din Casa DOMNULUI vor fi ca potirele înaintea altarului.',
    ),
    "ZEP.2.15": (
        'Iată, dar, cetatea aceea veselă, care stătea plină de încredere și zicea în inima ei: „Eu și niciuna afară de mine!”',
        'Iată, dar, cetatea aceea veselă, care stătea plină de încredere și zicea în inima ei: „Eu sunt și nu este nimeni în afară de mine!” Cum a ajuns o pustietate, un culcuș pentru fiare! Toți cei ce trec pe lângă ea fluieră și își clatină mâna.',
    ),
    "JER.2.23": (
        'Cum poți să zici: „Nu m-am spurcat și nu m-am dus după Baali”',
        'Cum poți să zici: „Nu m-am spurcat și nu m-am dus după Baali”? Privește-ți calea în vale, recunoaște ce ai făcut! Ești ca o dromaderă iute care aleargă încoace și încolo pe drumurile ei.',
    ),
    "JER.5.5": (
        '„Mă voi duce deci la cei mari și le voi vorbi; căci ei cunosc calea DOMNULUI, Legea Dumnezeului lor!”',
        '„Mă voi duce deci la cei mari și le voi vorbi; căci ei cunosc calea DOMNULUI, Legea Dumnezeului lor!” Dar și aceștia au rupt cu toții jugul și au sfâșiat legăturile.',
    ),
    "JER.6.4": (
        '„Pregătiți-vă s-o bateți! Haidem! Să ne suim ziua în amiaza mare!”',
        '„Pregătiți-vă s-o bateți! Haidem! Să ne suim ziua în amiaza mare! Vai de noi, căci ziua trece și umbrele serii se lungesc!”',
    ),
    "JER.12.16": (
        'Și dacă vor învăța căile poporului Meu, dacă vor jura pe Numele Meu zicând: „Viu este DOMNUL!”',
        'Și dacă vor învăța cu adevărat căile poporului Meu, să jure pe Numele Meu zicând: „Viu este DOMNUL!”, cum au învățat pe poporul Meu să jure pe Baal, atunci vor fi zidiți în mijlocul poporului Meu.',
    ),
    "JER.13.22": (
        'Și dacă vei zice în inima ta: „Pentru ce mi se întâmplă lucrul acesta?”',
        'Și dacă vei zice în inima ta: „Pentru ce mi se întâmplă lucrul acesta?” Din pricina mulțimii nelegiuirilor tale, poalele ți-au fost descoperite și călcâiele ți-au fost siluite.',
    ),
    "JER.20.9": (
        'Dacă zic: „Nu voi mai pomeni de El și nu voi mai vorbi în Numele Lui!”',
        'Dacă zic: „Nu voi mai pomeni de El și nu voi mai vorbi în Numele Lui!”, cuvântul Lui a fost în inima mea ca un foc arzând, închis în oasele mele; am obosit încercând să-l țin în mine și nu mai puteam.',
    ),
    "JER.22.14": (
        'care zice: „Îmi voi zidi o casă mare și odăi încăpătoare”',
        'care zice: „Îmi voi zidi o casă mare și odăi încăpătoare”, își taie ferestre, o căptușește cu cedru și o vopsește cu roșu.',
    ),
    "JER.27.14": (
        'N-ascultați de cuvintele prorocilor care vă zic: „Nu veți fi supuși împăratului Babilonului!”',
        'N-ascultați de cuvintele prorocilor care vă zic: „Nu veți fi supuși împăratului Babilonului!”, căci ei vă prorocesc minciuni.',
    ),
    "JER.28.11": (
        'Și Hanania a zis în fața întregului popor: „Așa vorbește DOMNUL: „Așa voi sfărâma, peste doi ani, de pe grumazul tuturor neamurilor jugul lui Nebucadnețar, împăratul Babilonului!””',
        'Și Hanania a zis în fața întregului popor: „Așa vorbește DOMNUL: Așa voi sfărâma, peste doi ani, de pe grumazul tuturor neamurilor jugul lui Nebucadnețar, împăratul Babilonului!” Apoi prorocul Ieremia și-a văzut de drum.',
    ),
    "JER.37.14": (
        'Ieremia a răspuns: „Nu este adevărat! Nu vreau să trec la haldei!”',
        'Ieremia a răspuns: „Nu este adevărat! Nu vreau să trec la haldei!” Dar el nu l-a ascultat; Iriia l-a apucat pe Ieremia și l-a adus la căpetenii.',
    ),
    "JER.42.19": (
        'Rămășițe ale lui Iuda, DOMNUL vă zice: „Nu vă duceți în Egipt!”',
        'Rămășițe ale lui Iuda, DOMNUL vă zice: „Nu vă duceți în Egipt!” Să știți bine că v-am avertizat astăzi.',
    ),
    "JON.1.10": (
        'Oamenii aceia au avut o mare teamă și i-au zis: „Pentru ce ai făcut lucrul acesta?”',
        'Oamenii aceia au avut o mare teamă și i-au zis: „Pentru ce ai făcut lucrul acesta?” Căci oamenii știau că fugea departe de fața DOMNULUI, fiindcă le spusese.',
    ),
    "JON.1.11": (
        'Ei i-au zis: „Ce să-ți facem, ca să se potolească marea față de noi?”',
        'Ei i-au zis: „Ce să-ți facem, ca să se potolească marea față de noi?” Căci marea devenea din ce în ce mai furtunoasă.',
    ),
    "MAL.1.2": (
        '„V-am iubit, zice DOMNUL! Și voi ziceți: «Cu ce ne-ai iubit?» Nu era Esau fratele lui Iacov?, zice DOMNUL. Totuși l-am iubit pe Iacov.',
        '„V-am iubit, zice DOMNUL! Și voi ziceți: «Cu ce ne-ai iubit?» Nu era Esau fratele lui Iacov?, zice DOMNUL. Totuși l-am iubit pe Iacov.”',
    ),
    "ZEC.11.12": (
        'Eu le-am zis: „Dacă găsiți cu cale, dați-mi plata; dacă nu, nu mi-o dați!”',
        'Eu le-am zis: „Dacă găsiți cu cale, dați-mi plata; dacă nu, nu mi-o dați!” Atunci mi-au cântărit ca plată treizeci de arginți.',
    ),
    "ZEC.11.13": (
        'Dar DOMNUL mi-a zis: „Aruncă olarului prețul acesta scump cu care m-au prețuit!”',
        'Dar DOMNUL mi-a zis: „Aruncă olarului prețul acesta scump cu care m-au prețuit!” Am luat cei treizeci de arginți și i-am aruncat olarului, în Casa DOMNULUI.',
    ),
    "ZEC.11.14": (
        'Apoi mi-am rupt al doilea toiag „Legământ”',
        'Apoi mi-am rupt al doilea toiag, «Legături», ca să rup frăția dintre Iuda și Israel.',
    ),
    "ZEC.13.3": (
        'Și dacă va mai proroci cineva, atunci tatăl său și mama sa, înșiși părinții lui, îi vor zice: „Tu nu vei trăi, căci ai spus minciuni în Numele DOMNULUI”',
        'Și dacă va mai proroci cineva, atunci tatăl său și mama sa, înșiși părinții lui, îi vor zice: „Tu nu vei trăi, căci ai spus minciuni în Numele DOMNULUI.” Iar tatăl său și mama sa, cei care l-au născut, îl vor străpunge când va proroci.',
    ),
    "EZK.7.27": (
        '„„Împăratul jelește, voievodul se înspăimântă, și mâinile poporului țării tremură. Le voi face după umbletele lor, îi voi judeca după cuviință, și vor ști că Eu sunt DOMNUL.””',
        'Împăratul va jeli, căpetenia se va îmbrăca în groază, iar mâinile poporului țării vor tremura. Le voi face după umbletele lor, îi voi judeca după judecățile lor și vor ști că Eu sunt DOMNUL.',
    ),
    "EZK.13.10": (
        'Lucrurile acestea se vor întâmpla pentru că ei rătăcesc pe poporul Meu zicând: „Pace!”',
        'Lucrurile acestea se vor întâmpla pentru că ei rătăcesc pe poporul Meu zicând: „Pace!”, dar pace nu este. Când cineva zidește un zid, iată, ei îl tencuiesc cu var.',
    ),
    "EZK.25.3": (
        'Spune copiilor lui Amon: „Ascultați cuvântul DOMNULUI Dumnezeu! Așa vorbește DOMNUL Dumnezeu: „Pentru că ai zis: „Ha! Ha!”””',
        'Spune copiilor lui Amon: „Ascultați cuvântul DOMNULUI Dumnezeu! Așa vorbește DOMNUL Dumnezeu: Pentru că ai zis: «Ha! Ha!» împotriva Locașului Meu cel sfânt, când a fost pângărit, împotriva țării lui Israel, când a fost pustiită, și împotriva casei lui Iuda, când a mers în robie.”',
    ),
    "EZK.41.15": (
        'A măsurat lungimea clădirii dinaintea locului gol, pe partea dinapoi a Casei, și pridvoarele ei de fiecare parte: erau o sută de coți.',
        'A măsurat lungimea clădirii dinaintea locului gol, pe partea dinapoi a Casei, și pridvoarele ei de fiecare parte: erau o sută de coți. A măsurat o sută de coți din templul interior și pridvoarele curții.',
    ),
    "HAB.2.19": (
        'Vai de cel ce zice lemnului: „Scoală-te”, și unei pietre mute: „Trezește-te!”',
        'Vai de cel ce zice lemnului: «Scoală-te!» și pietrei mute: «Trezește-te!» Oare poate ea să învețe? Iată, este acoperită cu aur și argint, dar nu este deloc suflare în ea.',
    ),
    "ISA.4.3": (
        'Și cel rămas în Sion, cel lăsat în Ierusalim, se va numi „sfânt”',
        'Și cel rămas în Sion, cel lăsat în Ierusalim, se va numi sfânt, adică oricine este înscris printre cei vii în Ierusalim.',
    ),
    "ISA.7.2": (
        'Când au venit și au spus casei lui David: „Sirienii au tăbărât în Efraim!”',
        'Când au venit și au spus casei lui David: „Sirienii au tăbărât în Efraim!” Inima lui și inima poporului lui s-au cutremurat cum se cutremură copacii pădurii de vânt.',
    ),
    "ISA.7.18": (
        'În ziua aceea, DOMNUL va șuiera muștelor de la capătul râurilor Egiptului și albinelor din țara Asiriei;',
        'În ziua aceea, DOMNUL va șuiera muștelor de la capătul râurilor Egiptului și albinelor din țara Asiriei. Ele vor veni și se vor așeza toate în văile pustii, în crăpăturile stâncilor, în toate tufișurile spinoase și în toate pășunile.',
    ),
    "ISA.16.6": (
        'Auzim îngâmfarea mândrului Moab, fudulia și fala lui, trufia și lăudăroșia lui.',
        'Auzim îngâmfarea mândrului Moab, fudulia și fala lui, trufia și lăudăroșia lui. Dar lăudăroșia lui este zadarnică.',
    ),
    "ISA.22.16": (
        '„Ce ai tu aici la tine și pe cine ai aici, de-ți sapi aici un mormânt?”',
        'Ce ai tu aici și pe cine ai tu aici, de-ți sapi un mormânt? Tu, care îți sapi sus un mormânt și îți cioplești un lăcaș în stâncă!',
    ),
    "ISA.28.13": (
        'și pentru ei cuvântul DOMNULUI va fi: „Învățătură peste învățătură, învățătură peste învățătură, poruncă peste poruncă, poruncă peste poruncă, puțin aici, puțin acolo”',
        'și pentru ei cuvântul DOMNULUI va fi: „Învățătură peste învățătură, învățătură peste învățătură, poruncă peste poruncă, poruncă peste poruncă, puțin aici, puțin acolo”, ca ei să meargă, să cadă pe spate, să fie zdrobiți, prinși în laț și luați.',
    ),
    "ISA.30.21": (
        'Urechile tale vor auzi după tine glasul care va zice: „Iată drumul, mergeți pe el!”',
        'Când te vei abate la dreapta sau la stânga, urechile tale vor auzi în urma ta un glas care va zice: «Aceasta este calea; umblați pe ea!»',
    ),
    "ISA.33.24": (
        'Niciun locuitor nu zice: „Sunt bolnav!”',
        'Niciun locuitor nu va zice: „Sunt bolnav!” Poporului care locuiește acolo i se va ierta nelegiuirea.',
    ),
    "ISA.36.18": (
        'Nu vă lăsați amăgiți de Ezechia, când vă zice: „DOMNUL ne va izbăvi.”',
        'Nu vă lăsați amăgiți de Ezechia, când vă zice: „DOMNUL ne va izbăvi.” Au izbăvit vreunul dintre dumnezeii neamurilor țările lor din mâna împăratului Asiriei?',
    ),
    "ISA.38.3": (
        '„DOAMNE, adu-Ți aminte că am umblat înaintea Ta cu credincioșie și inimă curată și am făcut ce este bine înaintea Ta!”',
        '„DOAMNE, adu-Ți aminte că am umblat înaintea Ta cu credincioșie și inimă curată și am făcut ce este bine înaintea Ta!” Apoi Ezechia a plâns amar.',
    ),
    "ISA.58.9": (
        'Atunci tu vei chema, și DOMNUL va răspunde, vei striga, și El va zice: „Iată-Mă!”',
        'Atunci vei chema, iar DOMNUL va răspunde; vei striga, iar El va zice: „Iată-Mă!” Dacă vei îndepărta din mijlocul tău jugul, arătarea cu degetul și vorbirea rea,',
    ),
    "GEN.17.19": (
        'Dumnezeu a spus: „Într-adevăr, Sara, soția ta, îți va naște un fiu, iar tu îi vei pune numele Isaac. Voi întemeia legământul Meu cu el ca legământ veșnic pentru urmașii lui după el.',
        'Dumnezeu a spus: „Nu, ci Sara, soția ta, îți va naște un fiu, iar tu îi vei pune numele Isaac. Voi întemeia legământul Meu cu el ca legământ veșnic pentru urmașii lui după el.',
    ),
    "EZR.3.11": (
        'Cântau, mărind și lăudând pe DOMNUL prin aceste cuvinte: „Căci este bun, căci îndurarea Lui pentru Israel ține în veac!”',
        'Cântau, mărind și lăudând pe DOMNUL prin aceste cuvinte: „Căci este bun, căci îndurarea Lui pentru Israel ține în veac!” Tot poporul a scos un strigăt mare, lăudând pe DOMNUL, pentru că fuseseră puse temeliile Casei DOMNULUI.',
    ),
    "EZR.4.12": (
        'Să știe împăratul că iudeii plecați de la tine și veniți printre noi la Ierusalim zidesc din nou cetatea aceea răzvrătită și rea, îi ridică zidurile și-i dreg temeliile.',
        'Să știe împăratul că iudeii plecați de la tine și veniți printre noi la Ierusalim zidesc din nou cetatea aceea răzvrătită și rea, au terminat zidurile și au dres temeliile.',
    ),
    "EZR.5.3": (
        'În aceeași vreme, Tatnai, dregătorul de dincoace de Râu, Șetar-Boznai și tovarășii lor de slujbă au venit la ei și le-au vorbit așa: „Cine v-a dat învoire să zidiți Casa aceasta și să ridicați zidurile acestea?”',
        'În aceeași vreme, Tatnai, dregătorul de dincolo de Râu, Șetar-Boznai și tovarășii lor de slujbă au venit la ei și le-au vorbit așa: „Cine v-a dat poruncă să zidiți Casa aceasta și să terminați zidul acesta?”',
    ),
    "EZR.5.9": (
        'Am întrebat pe bătrâni și le-am vorbit așa: „Cine v-a dat învoire să zidiți Casa aceasta și să ridicați zidurile acestea?”',
        'Am întrebat pe bătrâni și le-am vorbit așa: „Cine v-a dat poruncă să zidiți Casa aceasta și să terminați zidul acesta?”',
    ),
    "EZR.5.14": (
        'Și chiar împăratul Cirus a scos din templul din Babilon uneltele de aur și de argint ale Casei lui Dumnezeu, pe care le luase Nebucadnețar din Templul de la Ierusalim și le dusese în templul din Babilon, le-a dat în mâna așa-zisului Șeșbațar, pe care l-a pus dregător,',
        'Și chiar împăratul Cirus a scos din templul din Babilon uneltele de aur și de argint ale Casei lui Dumnezeu, pe care le luase Nebucadnețar din Templul de la Ierusalim și le dusese în templul din Babilon, le-a dat în mâna unui om numit Șeșbațar, pe care l-a pus dregător,',
    ),
    "EZR.7.12": (
        '„Artaxerxe, împăratul împăraților, către Ezra, preotul și cărturarul iscusit în Legea Dumnezeului cerurilor, și așa mai departe…:”',
        '„Artaxerxe, împăratul împăraților, către Ezra, preotul, cărturarul Legii Dumnezeului cerurilor. Pace deplină; și acum:”',
    ),
    "EZR.8.31": (
        'Am plecat de la râul Ahava, ca să ne ducem la Ierusalim, în a douăsprezecea zi a lunii întâi. Mâna Dumnezeului nostru a fost peste noi și ne-a păzit de loviturile vrăjmașului și de orice piedică pe drum.',
        'Am plecat de la râul Ahava, ca să ne ducem la Ierusalim, în a douăsprezecea zi a lunii întâi. Mâna Dumnezeului nostru a fost peste noi și ne-a izbăvit din mâna vrăjmașului și a celor ce pândeau pe drum.',
    ),
    "EZR.9.9": (
        'Căci suntem robi, dar Dumnezeu nu ne-a părăsit în robia noastră. A îndreptat spre noi bunăvoința împăraților perșilor, și ei ne-au dat o nouă putere de viață, ca să putem zidi Casa Dumnezeului nostru și să-i dregem dărâmăturile, făcându-ne astfel rost de un loc de adăpost în Iuda și la Ierusalim.',
        'Căci suntem robi, dar Dumnezeu nu ne-a părăsit în robia noastră. A îndreptat spre noi bunăvoința împăraților perșilor, și ei ne-au dat o nouă putere de viață, ca să putem zidi Casa Dumnezeului nostru și să-i dregem dărâmăturile, făcându-ne astfel rost de un zid în Iuda și la Ierusalim.',
    ),
    "EZR.10.14": (
        '„Să rămână, dar, toate căpeteniile noastre în locul întregii adunări. Și toți cei din cetățile noastre care s-au însurat cu femei străine să vină la timpuri hotărâte, cu bătrânii și judecătorii din fiecare cetate, până se va abate de la noi mânia aprinsă a Dumnezeului nostru din pricina întâmplării acesteia.”',
        '„Să rămână, dar, toate căpeteniile noastre în locul întregii adunări. Și toți cei din cetățile noastre care s-au însurat cu femei străine să vină la timpuri hotărâte, cu bătrânii și judecătorii din fiecare cetate, până când se va abate de la noi mânia aprinsă a Dumnezeului nostru din pricina acestei fapte, până când se va rezolva lucrul acesta.”',
    ),
    "EZR.10.18": (
        'Între fiii preoților s-au găsit unii care se însuraseră cu femei străine: dintre fiii lui Iosua, fiul lui Ioțadac, și dintre frații săi: Maaseia, Eliezer, Iarib și Ghedalia, care s-au îndatorat',
        'Între fiii preoților s-au găsit unii care se însuraseră cu femei străine: dintre fiii lui Iosua, fiul lui Ioțadac, și dintre frații săi: Maaseia, Eliezer, Iarib și Ghedalia.',
    ),
    "EZR.10.19": (
        'dând mâna să-și izgonească nevestele și să aducă un berbec ca jertfă pentru vină;',
        'Ei au dat mâna că își vor izgoni nevestele; fiind vinovați, au adus un berbec din turmă ca jertfă pentru vină.',
    ),
    "EZR.10.44": (
        'Toți aceștia luaseră femei străine, și mulți avuseseră copii cu ele.',
        'Toți aceștia își luaseră femei străine; unele dintre ele avuseseră copii.',
    ),
    "EZR.4.10": (
        'și celelalte popoare pe care le-a mutat marele și vestitul Osnapar și le-a așezat în cetatea Samariei și în celelalte locuri de dincoace de Râu și așa mai departe.',
        'și celelalte popoare pe care le-a mutat marele și vestitul Osnapar și le-a așezat în cetatea Samariei și în celelalte locuri de dincolo de Râu. Și acum:',
    ),
    "EZR.4.11": (
        'Iată cuprinsul scrisorii pe care au trimis-o împăratului Artaxerxe: „Robii tăi, oamenii de dincoace de Râu, și așa mai departe…”',
        'Iată cuprinsul scrisorii pe care au trimis-o împăratului Artaxerxe: „Împăratului Artaxerxe, de la robii tăi, oamenii de dincolo de Râu. Și acum:”',
    ),
    "EZR.4.17": (
        'Iată răspunsul trimis de împărat dregătorului Rehum, logofătului Șimșai și celorlalți tovarăși ai lui de slujbă, care locuiau la Samaria și în alte locuri de cealaltă parte a Râului: „Sănătate și așa mai departe…”',
        'Iată răspunsul trimis de împărat dregătorului Rehum, logofătului Șimșai și celorlalți tovarăși ai lui de slujbă, care locuiau la Samaria și în celelalte locuri de dincolo de Râu: „Pace. Și acum:”',
    ),
    "SNG.1.6": (
        'Nu vă uitați că sunt așa de negricioasă, căci m-a ars soarele. Fiii mamei mele s-au mâniat pe mine, și m-au pus păzitoare la vii. Dar via frumuseții mele n-am păzit-o.',
        'Nu vă uitați că sunt așa de negricioasă, căci m-a ars soarele. Fiii mamei mele s-au mâniat pe mine și m-au pus păzitoare la vii. Dar via mea n-am păzit-o.',
    ),
    "SNG.1.7": (
        'Spune-mi tu, pe care te iubește inima mea, unde îți paști oile, unde te odihnești la amiază? Căci de ce să umblu ca o rătăcită pe la turmele tovarășilor tăi? –',
        'Spune-mi tu, pe care te iubește inima mea, unde îți paști oile, unde te odihnești la amiază? Căci de ce să fiu ca una care își acoperă fața pe lângă turmele tovarășilor tăi? –',
    ),
    "SNG.1.17": (
        'Cedrii sunt grinzile caselor noastre, și chiparoșii sunt pardoselile noastre. –',
        'Grinzile casei noastre sunt cedrii, iar căpriorii noștri sunt brazii. –',
    ),
    "SNG.2.7": (
        'Vă jur, fiice ale Ierusalimului, pe căprioarele și cerboaicele de pe câmp: nu stârniți, nu treziți dragostea până nu vine ea! –',
        'Vă jur, fiice ale Ierusalimului, pe căprioarele și cerboaicele de pe câmp: nu stârniți și nu treziți dragostea până când ea va dori. –',
    ),
    "SNG.3.5": (
        'Vă jur, fiice ale Ierusalimului, pe căprioarele și cerboaicele de pe câmp: nu stârniți, nu treziți dragostea până nu vine ea. –',
        'Vă jur, fiice ale Ierusalimului, pe căprioarele și cerboaicele de pe câmp: nu stârniți și nu treziți dragostea până când ea va dori. –',
    ),
    "SNG.4.1": (
        'Ce frumoasă ești, iubito, ce frumoasă ești! Ochii tăi sunt ochi de porumbiță, sub marama ta. Părul tău este ca o turmă de capre poposită pe coama muntelui Galaad.',
        'Ce frumoasă ești, iubito, ce frumoasă ești! Ochii tăi sunt ochi de porumbiță, sub marama ta. Părul tău este ca o turmă de capre care coboară de pe muntele Galaad.',
    ),
    "SNG.5.4": (
        'Dar iubitul meu a vârât mâna pe gaura zăvorului, și mi-a fost milă de el atunci.',
        'Dar iubitul meu a vârât mâna pe gaura zăvorului și inima mi s-a tulburat pentru el.',
    ),
    "SNG.5.6": (
        'Am deschis iubitului meu; dar iubitul meu plecase, se făcuse nevăzut. Înnebuneam când îmi vorbea. L-am căutat, dar nu l-am găsit; l-am strigat, dar nu mi-a răspuns.',
        'Am deschis iubitului meu, dar iubitul meu plecase, se făcuse nevăzut. Sufletul mi se topea când vorbea. L-am căutat, dar nu l-am găsit; l-am strigat, dar nu mi-a răspuns.',
    ),
    "SNG.5.12": (
        'Ochii lui sunt ca niște porumbei pe marginea izvoarelor, scăldați în lapte și odihnindu-se în fața lui plină.',
        'Ochii lui sunt ca niște porumbei pe marginea izvoarelor, scăldați în lapte, așezați ca niște pietre într-o montură.',
    ),
    "SNG.5.15": (
        'picioarele lui sunt niște stâlpi de marmură albă, așezați pe niște temelii de aur curat. Înfățișarea lui este ca Libanul, pare un tânăr ales ca cedrii.',
        'Picioarele lui sunt niște stâlpi de marmură albă, așezați pe niște temelii de aur curat. Înfățișarea lui este ca Libanul, falnic ca cedrii.',
    ),
    "SNG.7.1": (
        'Ce frumoase îți sunt picioarele în încălțămintea ta, fată de domn! Marginile rotunde ale coapsei tale sunt ca niște lănțișoare de pus la gât, lucrate de mâinile unui meșter iscusit.',
        'Ce frumoase îți sunt picioarele în încălțămintea ta, fată de domn! Rotunjimile coapselor tale sunt ca niște bijuterii, lucrarea mâinilor unui meșter iscusit.',
    ),
    "SNG.7.8": (
        'Îmi zic: „Mă voi sui în finic și-i voi apuca crăcile!”',
        'Îmi zic: „Mă voi sui în palmier și-i voi apuca crengile! Sânii tăi să fie ca ciorchinii viței, iar mirosul răsuflării tale ca merele.”',
    ),
    "SNG.7.9": (
        'Și gura ta toarnă un vin ales care curge lin ca răspuns la dezmierdările mele și alunecă pe buzele noastre când adormim!',
        'Iar cerul gurii tale, pentru iubitul meu, este ca vinul cel mai bun, care curge lin și face buzele celor adormiți să vorbească.',
    ),
    "SNG.8.4": (
        'Vă rog fierbinte, fiice ale Ierusalimului: nu stârniți, nu treziți dragostea până nu vine ea. –',
        'Vă rog fierbinte, fiice ale Ierusalimului: nu stârniți și nu treziți dragostea până când ea va dori. –',
    ),
    "SNG.4.10": (
        'Ce lipici în dezmierdările tale, soro, mireaso! Dezmierdările tale prețuiesc mai mult decât vinul, și miresmele tale sunt mai plăcute decât toate miroznele!',
        'Cât de frumoase sunt dezmierdările tale, soro, mireaso! Dezmierdările tale sunt mai bune decât vinul, iar mirosul parfumurilor tale decât toate aromele.',
    ),
    "SNG.6.5": (
        'Întoarce-ți ochii de la mine, căci mă tulbură. Perii tăi sunt ca o turmă de capre care poposesc pe coama Galaadului.',
        'Întoarce-ți ochii de la mine, căci mă tulbură. Părul tău este ca o turmă de capre care coboară din Galaad.',
    ),
    "SNG.6.13": (
        'Întoarce-te, întoarce-te, Sulamito! Întoarce-te, întoarce-te, ca să te privim. – Ce aveți voi să vă uitați la Sulamita ca la niște fete ce joacă în cor?',
        'Întoarce-te, întoarce-te, Sulamito! Întoarce-te, întoarce-te, ca să te privim! Ce priviți la Sulamita ca la dansul Mahanaimului?',
    ),
    "SNG.7.2": (
        'Pântecele tău este un pahar rotund de unde nu lipsește vinul mirositor; trupul tău este un snop de grâu încins cu crini.',
        'Buricul tău este un pahar rotund, din care nu lipsește vinul amestecat; pântecele tău este un snop de grâu, încins cu crini.',
    ),
    "SNG.7.5": (
        'Capul tău este cum e Carmelul, și părul capului tău este ca purpura împărătească: până și un împărat ar fi înlănțuit de pletele tale!…',
        'Capul tău este ca Carmelul, iar părul capului tău ca purpura; împăratul este ținut legat în pletele tale.',
    ),
    "SNG.8.5": (
        'Cine este aceea care se suie din pustiu, rezemată de iubitul ei și zicând: „Te-am trezit sub măr; acolo te-a născut mama ta, acolo te-a născut și te-a făcut ea”',
        'Cine este aceasta care se suie din pustiu, rezemată de iubitul ei? Te-am trezit sub măr; acolo mama ta te-a zămislit, acolo a avut durerile nașterii cea care te-a născut.',
    ),
    "JDG.2.1": (
        'Îngerul DOMNULUI S-a suit din Ghilgal la Bochim și a zis: „Eu v-am scos din Egipt și v-am adus în țara pe care am jurat părinților voștri că v-o voi da. Am zis: „Niciodată nu voi rupe legământul Meu cu voi;””',
        'Îngerul DOMNULUI S-a suit din Ghilgal la Bochim și a zis: „Eu v-am scos din Egipt și v-am adus în țara pe care am jurat părinților voștri că v-o voi da. Am zis: «Niciodată nu voi rupe legământul Meu cu voi.»',
    ),
    "JDG.2.2": (
        '„și voi să nu încheiați legământ cu locuitorii din țara aceasta, ci să le surpați altarele.”',
        'Voi să nu încheiați legământ cu locuitorii din țara aceasta, ci să le surpați altarele. Dar nu ați ascultat de glasul Meu. De ce ați făcut aceasta?”',
    ),
    "JDG.2.17": (
        'Dar ei n-au ascultat nici de judecătorii lor, căci au curvit cu alți dumnezei și s-au închinat înaintea lor. În curând s-au abătut de la calea pe care o urmaseră părinții lor și n-au ascultat de poruncile DOMNULUI, ca și ei.',
        'Dar ei n-au ascultat nici de judecătorii lor, căci au curvit cu alți dumnezei și s-au închinat înaintea lor. S-au abătut repede de la calea pe care urmaseră părinții lor, ascultând de poruncile DOMNULUI. Ei n-au făcut așa.',
    ),
    "JDG.2.23": (
        '„Și DOMNUL a lăsat în pace pe popoarele acelea pe care nu le dăduse în mâinile lui Iosua și nu S-a grăbit să le izgonească.”',
        'Și DOMNUL a lăsat în pace popoarele acelea, fără să le izgonească în grabă. Nu le-a dat în mâinile lui Iosua.',
    ),
    "EZK.18.29": (
        'Casa lui Israel zice: „Calea DOMNULUI nu este dreaptă.”',
        'Casa lui Israel zice: „Calea DOMNULUI nu este dreaptă.” Oare calea Mea nu este dreaptă, casa lui Israel? Oare nu mai degrabă căile voastre nu sunt drepte?',
    ),
    "ZEC.3.5": (
        'Eu am zis: „Să i se pună pe cap o mitră curată!”',
        'Eu am zis: „Să i se pună pe cap o mitră curată!” Și i-au pus o mitră curată pe cap și l-au îmbrăcat cu haine, în timp ce Îngerul DOMNULUI stătea acolo.',
    ),
    "PSA.79.10": (
        'Pentru ce să zică neamurile: „Unde este Dumnezeul lor?”',
        'Pentru ce să zică neamurile: „Unde este Dumnezeul lor?” Să se știe înaintea ochilor noștri, printre neamuri, că Tu răzbuni sângele vărsat al slujitorilor Tăi.',
    ),
    "EZK.47.6": (
        'El mi-a zis: „Ai văzut, fiul omului?”',
        'El mi-a zis: „Ai văzut, fiul omului?” Apoi m-a dus și m-a făcut să mă întorc la marginea râului.',
    ),
    "1KI.18.30": (
        'Ilie a zis atunci întregului popor: „Apropiați-vă de mine!”',
        'Ilie a zis atunci întregului popor: „Apropiați-vă de mine!” Tot poporul s-a apropiat de el. Și el a reparat altarul DOMNULUI, care fusese dărâmat.',
    ),
    "LAM.2.12": (
        'Ei ziceau către mamele lor: „Unde este pâine și vin?”',
        'Ei ziceau către mamele lor: „Unde este pâine și vin?” Și cădeau leșinați ca răniții pe străzile cetății, își dădeau sufletul la pieptul mamelor lor.',
    ),
    "1SA.1.18": (
        'Ea a zis: „Să capete roaba ta trecere înaintea ta!”',
        'Ea a zis: „Să capete roaba ta trecere înaintea ta!” Apoi femeia a plecat în drumul ei, a mâncat și fața ei nu mai era tristă.',
    ),
    "JER.3.17": (
        'În vremea aceea, Ierusalimul se va numi „Scaunul de domnie al DOMNULUI”',
        'În vremea aceea, Ierusalimul se va numi „Scaunul de domnie al DOMNULUI”; toate neamurile se vor strânge la Ierusalim, în Numele DOMNULUI, și nu vor mai urma pornirile inimii lor rele.',
    ),
    "EZK.18.19": (
        'Voi însă ziceți: „Pentru ce nu poartă fiul pedeapsa pentru nelegiuirea tatălui său?”',
        'Voi însă ziceți: „Pentru ce nu poartă fiul pedeapsa pentru nelegiuirea tatălui său?” Pentru că fiul a lucrat după dreptate și neprihănire, a păzit și a împlinit toate legile Mele; el va trăi negreșit.',
    ),
    "EZK.6.11": (
        'Așa vorbește DOMNUL Dumnezeu: „Bate din mâini, dă din picioare și zi: „Vai!””',
        'Așa vorbește DOMNUL Dumnezeu: „Bate din mâini, dă din picioare și zi: „Vai!” pentru toate urâciunile rele ale casei lui Israel, care va cădea lovită de sabie, de foamete și de ciumă.”',
    ),
    "JDG.16.25": (
        'În bucuria inimii lor, au zis: „Chemați pe Samson, ca să ne desfete!”',
        'În bucuria inimii lor, au zis: „Chemați pe Samson, ca să ne desfete!” Au scos pe Samson din temniță, și el a jucat înaintea lor. L-au așezat între stâlpi.',
    ),
    "PSA.14.1": (
        'Nebunul zice în inima lui: „Nu este Dumnezeu!”',
        'Nebunul zice în inima lui: „Nu este Dumnezeu!” S-au stricat oamenii, fac fapte urâte; nu este niciunul care să facă binele.',
    ),
    "PSA.24.8": (
        '„Cine este acest Împărat al slavei?”',
        '„Cine este acest Împărat al slavei?” DOMNUL cel tare și puternic, DOMNUL cel viteaz în lupte.',
    ),
    "PSA.40.8": (
        '„vreau să fac voia Ta, Dumnezeule!”',
        '„vreau să fac voia Ta, Dumnezeule!” Și Legea Ta este în fundul inimii mele.',
    ),
    "2SA.18.4": (
        'Împăratul le-a răspuns: „Voi face ce credeți că este mai bine.”',
        'Împăratul le-a răspuns: „Voi face ce credeți că este mai bine.” Și împăratul a stat lângă poartă, în timp ce tot poporul ieșea cu sutele și cu miile.',
    ),
    "1SA.14.41": (
        'Saul a zis DOMNULUI: „Dumnezeul lui Israel, arată adevărul. Dă un sorț întreg.”',
        'Saul a zis DOMNULUI, Dumnezeul lui Israel: „Arată ce este drept.” Ionatan și Saul au fost aleși, dar poporul a scăpat.',
    ),
    "1SA.20.38": (
        'I-a strigat iarăși: „Iute, grăbește-te, nu te opri!”',
        'I-a strigat iarăși: „Iute, grăbește-te, nu te opri!” Și băiatul lui Ionatan a strâns săgețile și s-a întors la stăpânul lui.',
    ),
    "ISA.43.6": (
        'Voi zice miazănoaptei: „Dă încoace!”, și miazăzilei: „Nu opri”',
        'Voi zice miazănoaptei: „Dă încoace!”, și miazăzilei: „Nu opri, ci adu-Mi fiii din țările depărtate și fiicele de la marginile pământului.”',
    ),
}


def digest(verses: list[dict[str, object]]) -> str:
    value = "\n".join(f"{v['number']}\t{v['text']}" for v in verses)
    return "sha256:" + hashlib.sha256(value.encode("utf-8")).hexdigest()


def main() -> None:
    documents: dict[Path, dict[str, object]] = {}
    planned: list[tuple[str, dict[str, object], dict[str, object], int]] = []
    mismatches: list[str] = []
    for reference, (expected, replacement) in REPAIRS.items():
        book, chapter_text, verse_text = reference.split(".")
        path = DATA / f"{book}.{chapter_text}.json"
        document = documents.setdefault(
            path, json.loads(path.read_text(encoding="utf-8"))
        )
        verse = next(item for item in document["verses"] if item["number"] == int(verse_text))
        if verse["text"] == replacement:
            continue
        if verse["text"] != expected:
            mismatches.append(reference)
            continue
        planned.append((reference, document, verse, int(verse_text)))

    if mismatches:
        raise RuntimeError(
            "textul de bază nu mai corespunde reparației: "
            + ", ".join(mismatches)
        )

    changed: list[str] = []
    changed_paths: set[Path] = set()
    for reference, document, verse, verse_number in planned:
        replacement = REPAIRS[reference][1]
        verse["text"] = replacement
        audit = document.setdefault("audit", {})
        audit["textDigest"] = digest(document["verses"])
        audit.setdefault("repairHistory", []).append(
            {
                "id": "ot-canonical-high-confidence-omissions-2026-08-08",
                "verseNumbers": [verse_number],
                "scope": "completarea unei omisiuni confirmate de WEBU și WLC/OSHB",
            }
        )
        changed_paths.add(DATA / f"{reference.split('.')[0]}.{reference.split('.')[1]}.json")
        changed.append(reference)

    for path in changed_paths:
        document = documents[path]
        path.write_text(json.dumps(document, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"changedVerses": changed}, ensure_ascii=False))


if __name__ == "__main__":
    main()
