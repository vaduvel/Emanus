#!/usr/bin/env python3
import hashlib, json, runpy, subprocess, unicodedata
from pathlib import Path

CH=Path('docs/data/biblia-emanus/HEB.10.json')
JR=Path('docs/biblia-emanus/NT-AI-REVIEW-BATCH-2026-08-08-HEB.10.md')
ZIP=Path('docs/data/biblia-emanus/sources/nt-sblgnt-1.2.zip')
SNAP='29b8762199eb87757ec36961097b817cb2b569557d95348a70fac66c0262f424'
RUN='emanus-nt-review-2026-08-08-heb-10'

T={
1:'Căci Legea, având umbra bunurilor viitoare, nu însăși imaginea lucrurilor, nu-i poate desăvârși niciodată pe cei care se apropie, prin aceleași jertfe pe care le aduc neîncetat, an de an.',
2:'Altfel, n-ar fi încetat oare să mai fie aduse, deoarece cei care se închină, odată curățiți, n-ar mai fi avut conștiința păcatelor?',
3:'Dar prin aceste jertfe se face, an de an, o aducere-aminte a păcatelor,',
4:'căci este imposibil ca sângele taurilor și al țapilor să înlăture păcatele.',
5:'De aceea, când intră în lume, El spune: „Jertfă și dar n-ai voit, ci Mi-ai pregătit un trup;',
6:'în arderi-de-tot și jertfe pentru păcat nu Ți-ai găsit plăcerea.',
7:'Atunci am spus: «Iată, vin — în sulul cărții este scris despre Mine — ca să fac voia Ta, Dumnezeule.»”',
8:'După ce spune mai sus: „Jertfe și daruri, arderi-de-tot și jertfe pentru păcat n-ai voit și nici nu Ți-ai găsit plăcerea în ele” — acestea fiind aduse potrivit Legii —,',
9:'apoi spune: „Iată, vin ca să fac voia Ta.” El îl înlătură pe cel dintâi ca să-l statornicească pe al doilea.',
10:'Prin această voie am fost sfințiți, prin jertfirea trupului lui Isus Hristos, o dată pentru totdeauna.',
11:'Și orice preot stă în picioare zi de zi, slujind și aducând de multe ori aceleași jertfe, care nu pot niciodată să înlăture păcatele.',
12:'Dar El, după ce a adus o singură jertfă pentru păcate, S-a așezat pentru totdeauna la dreapta lui Dumnezeu,',
13:'așteptând de atunci până când dușmanii Lui vor fi puși ca așternut al picioarelor Lui.',
14:'Căci printr-o singură jertfă i-a desăvârșit pentru totdeauna pe cei care sunt sfințiți.',
15:'Și Duhul Sfânt ne mărturisește aceasta; căci, după ce a spus:',
16:'„Acesta este legământul pe care îl voi încheia cu ei după zilele acelea, spune Domnul: voi pune legile Mele în inimile lor și le voi scrie în mintea lor”,',
17:'„și nu-Mi voi mai aminti nicidecum de păcatele și fărădelegile lor.”',
18:'Iar unde este iertarea acestora, nu mai este jertfă pentru păcat.',
19:'Așadar, fraților, având îndrăzneală să intrăm în Locul Sfânt prin sângele lui Isus,',
20:'pe calea cea nouă și vie pe care El a inaugurat-o pentru noi prin perdea, adică prin trupul Său,',
21:'și având un Mare Preot peste casa lui Dumnezeu,',
22:'să ne apropiem cu o inimă sinceră, în deplina siguranță a credinței, având inimile stropite și curățite de o conștiință rea și trupul spălat cu apă curată.',
23:'Să ținem neclintită mărturisirea speranței, căci credincios este Cel care a promis.',
24:'Și să veghem unii asupra altora, ca să ne îndemnăm la dragoste și la fapte bune,',
25:'fără să părăsim adunarea noastră, cum au unii obiceiul, ci încurajându-ne unii pe alții, cu atât mai mult cu cât vedeți că Ziua se apropie.',
26:'Căci, dacă păcătuim de bunăvoie după ce am primit cunoașterea adevărului, nu mai rămâne nicio jertfă pentru păcate,',
27:'ci numai o așteptare înfricoșătoare a judecății și ardoarea unui foc care îi va mistui pe cei potrivnici.',
28:'Cine încalcă Legea lui Moise moare fără milă pe mărturia a doi sau trei martori.',
29:'Cu cât mai aspră pedeapsă credeți că va merita cel care L-a călcat în picioare pe Fiul lui Dumnezeu, a socotit necurat sângele legământului prin care fusese sfințit și L-a insultat pe Duhul harului?',
30:'Căci Îl cunoaștem pe Cel care a spus: „A Mea este răzbunarea; Eu voi răsplăti.” Și din nou: „Domnul Își va judeca poporul.”',
31:'Este înfricoșător să cazi în mâinile Dumnezeului celui viu.',
32:'Aduceți-vă însă aminte de zilele de odinioară, când, după ce ați fost luminați, ați îndurat o mare luptă în suferințe:',
33:'uneori fiind făcuți spectacol prin insulte și necazuri, alteori devenind părtași cu cei tratați astfel.',
34:'Căci ați suferit împreună cu cei întemnițați și ați primit cu bucurie jefuirea bunurilor voastre, știind că voi înșivă aveți o avere mai bună și trainică.',
35:'Nu vă lepădați deci îndrăzneala, care are o mare răsplată.',
36:'Căci aveți nevoie de răbdare, pentru ca, după ce ați făcut voia lui Dumnezeu, să primiți promisiunea.',
37:'„Căci încă foarte puțin și Cel care vine va veni și nu va întârzia;',
38:'iar dreptul Meu va trăi prin credință; dar, dacă se dă înapoi, sufletul Meu nu-Și găsește plăcerea în el.”',
39:'Noi însă nu suntem dintre cei care se dau înapoi spre pierzare, ci dintre cei care au credință spre păstrarea sufletului.'
}

A={
1:'Σκιὰν γὰρ ἔχων ὁ νόμος',2:'ἐπεὶ οὐκ ἂν ἐπαύσαντο',3:'ἀνάμνησις ἁμαρτιῶν κατʼ ἐνιαυτόν',4:'ἀδύνατον γὰρ αἷμα ταύρων',5:'Θυσίαν καὶ προσφορὰν οὐκ ἠθέλησας',6:'ὁλοκαυτώματα καὶ περὶ ἁμαρτίας',7:'Ἰδοὺ ἥκω',8:'ἀνώτερον λέγων',9:'ἀναιρεῖ τὸ πρῶτον',10:'ἐν ᾧ θελήματι ἡγιασμένοι',11:'πᾶς μὲν ἱερεὺς ἕστηκεν',12:'μίαν ὑπὲρ ἁμαρτιῶν προσενέγκας',13:'τὸ λοιπὸν ἐκδεχόμενος',14:'μιᾷ γὰρ προσφορᾷ τετελείωκεν',15:'μαρτυρεῖ δὲ ἡμῖν',16:'Αὕτη ἡ διαθήκη',17:'τῶν ἁμαρτιῶν αὐτῶν',18:'ὅπου δὲ ἄφεσις τούτων',19:'Ἔχοντες οὖν, ἀδελφοί',20:'ὁδὸν πρόσφατον καὶ ζῶσαν',21:'ἱερέα μέγαν ἐπὶ τὸν οἶκον',22:'προσερχώμεθα μετὰ ἀληθινῆς καρδίας',23:'κατέχωμεν τὴν ὁμολογίαν',24:'κατανοῶμεν ἀλλήλους',25:'μὴ ἐγκαταλείποντες τὴν ἐπισυναγωγὴν',26:'Ἑκουσίως γὰρ ἁμαρτανόντων',27:'φοβερὰ δέ τις ἐκδοχὴ κρίσεως',28:'ἀθετήσας τις νόμον Μωϋσέως',29:'πόσῳ δοκεῖτε χείρονος',30:'Ἐμοὶ ἐκδίκησις',31:'φοβερὸν τὸ ἐμπεσεῖν',32:'Ἀναμιμνῄσκεσθε δὲ τὰς πρότερον',33:'ὀνειδισμοῖς τε καὶ θλίψεσιν',34:'τοῖς ⸀δεσμίοις συνεπαθήσατε',35:'μὴ ἀποβάλητε οὖν',36:'ὑπομονῆς γὰρ ἔχετε χρείαν',37:'ἔτι γὰρ μικρὸν ὅσον ὅσον',38:'ὁ δὲ δίκαιός ⸀μου ἐκ πίστεως',39:'ἡμεῖς δὲ οὐκ ἐσμὲν ὑποστολῆς'
}

def extract(member):
    return subprocess.check_output(['unzip','-p',str(ZIP),member],text=True)

def note(v,term,decision,alts,reason):
    return {'verse':v,'term':term,'decision':decision,'alternatives':alts,'reason':reason,'reviewRequired':True,'resolutionStatus':'resolved','resolutionReason':reason}

def main():
    assert subprocess.check_output(['sha256sum',str(ZIP)],text=True).split()[0]==SNAP
    src={k:extract(p) for k,p in {'sbl':'sblgnt/text/HEB.txt','app':'sblgnt/apparatus/text/HEB.txt','tr':'tr/HEB.usfm','webp':'webp/HEB.usfm','btf':'btf/HEB.usfm','corn':'cornilescu1924/HEB.usfm','libera':'biblia-libera/HEB.usfm'}.items()}
    for k,t in src.items(): assert t.strip(),k
    for v in range(1,40): assert f'Heb 10:{v}\t' in src['sbl']
    s=unicodedata.normalize('NFC',src['sbl'])
    for v,a0 in A.items(): assert unicodedata.normalize('NFC',a0) in s,(v,a0)
    for marker in ['Hebrews 10:1','Hebrews 10:2','Hebrews 10:8','Hebrews 10:9','Hebrews 10:10','Hebrews 10:12','Hebrews 10:15','Hebrews 10:16','Hebrews 10:17','Hebrews 10:30','Hebrews 10:34','Hebrews 10:35','Hebrews 10:38']: assert marker in src['app']
    d=json.loads(CH.read_text())
    assert d['status']=='in_review' and d['public'] is False
    assert [x['number'] for x in d['verses']]==list(range(1,40))
    for x in d['verses']: x['text']=T[x['number']]
    for x in d['benchmark']['translationsConsulted']:
        x['consultedInBatch']=x['id'] in {'CORNILESCU-1924','BTF'}
    d['benchmark']['observations']=[
        'Toate cele 39 de versete au fost revizuite semantic direct față de snapshotul fixat SBLGNT 1.2 și aparatul lui; rezultatul automat „0 probleme” nu a fost folosit drept verdict semantic.',
        'TR a fost folosit numai ca martor textual. WEBP, BTF, Cornilescu 1924 și Biblia Liberă au fost consultate auxiliar. NTR nu a fost consultată; textul românesc a fost redactat independent.'
    ]
    nums='\n'.join(str(i) for i in range(1,40)).encode()
    a=d['audit']
    a.update({
        'completedOn':'2026-08-08','engineVersion':'3.0.0','reviewLevel':'ai-complete',
        'reviewAgent':{'type':'ai','engine':'Codex / GPT-5','runId':RUN,'method':'verse-by-verse-source-and-benchmark'},
        'sourceSnapshotSha256':SNAP,
        'verseCoverage':{'expected':39,'reviewed':39,'continuous':True,'verseNumbersSha256':'sha256:'+hashlib.sha256(nums).hexdigest()},
        'sourceLanguage':{'language':'greacă koine','text':'SBLGNT 1.2 + aparat; Textus Receptus ca martor suplimentar','result':'approved','scope':'Toate cele 39 de versete au fost confruntate direct cu SBLGNT/aparat; TR numai martor, iar WEBP/BTF/Cornilescu 1924/Biblia Liberă auxiliare.'},
        'romanianLanguage':{'result':'approved','changesApplied':['Au fost reparate calcurile, dezacordurile și frazele corupte din textul existent.','Citatele și unitățile sintactice din 10:5-10, 10:15-17 și 10:37-38 au fost delimitate în română după structura greacă.','Formulările din 10:20, 10:25, 10:29 și 10:34 au fost refăcute pentru sens și referenți corecți.']},
        'theologicalContext':{'result':'approved','principles':['Textul principal urmează SBLGNT la variantele materiale și nu importă automat adaosurile TR/RP.','La 10:34 este păstrată lectura SBLGNT „cei întemnițați” și nu lectura TR/RP „lanțurile mele”; nu este adăugat „în ceruri”, absent din textul principal.','La 10:38 este păstrat pronumele μου din SBLGNT, redat „dreptul Meu”.']},
        'omissionAddition':{'result':'approved','omissions':0,'additions':0},
        'copyrightDistance':{'result':'approved','method':'redactare proprie din SBLGNT/aparat și verificări auxiliare fixate; fără copierea unei traduceri românești'},
        'criticalIssues':{'result':'approved','open':0}
    })
    a.pop('benchmarkEvidence',None); a.pop('modelEvidence',None)
    d['editorialNotes']=[
        note(1,'δύναται','Verbul este redat la singular, cu „Legea” ca subiect.',['„jertfele ... nu pot”'],'SBLGNT/NA28 are singularul δύναται; lectura plurală δύνανται este consemnată de aparat pentru WH/Treg/RP.'),
        note(9,'ποιῆσαι','„Iată, vin ca să fac voia Ta.”',['TR/RP: adaosul ὁ θεός'],'Textul principal SBLGNT nu importă ὁ θεός după ποιῆσαι.'),
        note(17,'καὶ τῶν ἁμαρτιῶν','Citatul continuă direct cu „și nu-Mi voi mai aminti...”',['NIV/aparat: „apoi spune”'],'SBLGNT nu are introducerea explicită „apoi spune”; aceasta nu este adăugată în corpul versetului.'),
        note(30,'ἐγὼ ἀνταποδώσω','„Eu voi răsplăti.”',['TR/RP: „Eu voi răsplăti, spune Domnul”'],'Adaosul λέγει κύριος din RP nu este în textul principal SBLGNT.'),
        note(34,'τοῖς δεσμίοις','„ați suferit împreună cu cei întemnițați”',['TR/RP: „lanțurile mele”'],'SBLGNT are δεσμίοις, nu δεσμοῖς μου; referentul este plural și nu este personalizat în textul principal.'),
        note(34,'κρείττονα ὕπαρξιν καὶ μένουσαν','„o avere mai bună și trainică”',['TR/RP: adaos „în ceruri”'],'SBLGNT nu conține ἐν οὐρανοῖς la finalul acestei propoziții; adaosul tradițional nu este importat.'),
        note(38,'ὁ δὲ δίκαιός μου','„dreptul Meu”',['RP: fără μου'],'Pronumele μου este prezent în SBLGNT și este reprezentat explicit în română.')
    ]
    val=runpy.run_path('scripts/check-biblia-emanus.py')
    a['textDigest']=val['chapter_text_digest'](d)
    a['contentDigest']=val['chapter_content_digest'](d)
    CH.write_text(unicodedata.normalize('NFC',json.dumps(d,ensure_ascii=False,indent=2)+'\n'))
    d2=json.loads(CH.read_text())
    assert d2['audit']['textDigest']==val['chapter_text_digest'](d2)
    assert d2['audit']['contentDigest']==val['chapter_content_digest'](d2)
    lines=['# Revizie AI, lot Evrei 10','', 'Statut: `in_review` — **nu este aprobare de publicare**.','', 'Data: `2026-08-08`','', 'Reviewer: `codex-gpt-5` (`ai`; sistem: `Codex / GPT-5`; rulare: `'+RUN+'`)','', '## Domeniu și surse','', 'Au fost revizuite semantic toate cele 39 de versete din `HEB.10` direct cu snapshotul fixat SBLGNT 1.2 și aparatul lui. TR a fost folosit numai ca martor textual. WEBP, BTF, Cornilescu 1924 și Biblia Liberă au fost consultate auxiliar. NTR nu a fost consultată (`consultedInBatch: false`). Nicio traducere românească nu a fost copiată. Rezultatul validatorului automat nu a fost tratat drept verdict semantic.','', '## Decizii pe verset','', '| Referință BE | Ancoră SBLGNT verificată | Decizie editorială |','| --- | --- | --- |']
    for v in range(1,40): lines.append(f'| HEB.10.{v} | `{A[v]}` | {T[v]} |')
    lines += ['', '## Concluzie de lot','', 'Toate cele 39 de versete au fost confruntate individual cu textul grec fixat și cu aparatul. Variantele materiale din 10:1, 10:2, 10:8-10, 10:12, 10:15-17, 10:30, 10:34-35 și 10:38 au fost verificate explicit. În special, 10:34 urmează `δεσμίοις` și nu importă nici „lanțurile mele”, nici adaosul „în ceruri”; 10:38 păstrează `μου`. Capitolul rămâne `in_review` și `public: false`; acest lot nu autorizează publicarea.','']
    JR.write_text(unicodedata.normalize('NFC','\n'.join(lines)))

if __name__=='__main__': main()
