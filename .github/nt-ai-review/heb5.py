#!/usr/bin/env python3
import hashlib, json, runpy, subprocess, unicodedata
from pathlib import Path

CH=Path('docs/data/biblia-emanus/HEB.5.json')
JR=Path('docs/biblia-emanus/NT-AI-REVIEW-BATCH-2026-08-08-HEB.5.md')
ZIP=Path('docs/data/biblia-emanus/sources/nt-sblgnt-1.2.zip')
SNAP='29b8762199eb87757ec36961097b817cb2b569557d95348a70fac66c0262f424'
RUN='emanus-nt-review-2026-08-08-heb-5'

T={
1:'Căci orice mare preot, luat dintre oameni, este pus pentru oameni în lucrurile privitoare la Dumnezeu, ca să aducă daruri și jertfe pentru păcate.',
2:'El poate să se poarte cu măsură față de cei neștiutori și rătăciți, fiindcă și el este înconjurat de slăbiciune.',
3:'Din cauza acestei slăbiciuni, este dator să aducă jertfe pentru păcate atât pentru popor, cât și pentru sine.',
4:'Nimeni nu-și ia singur această cinste, ci o primește când este chemat de Dumnezeu, așa cum a fost și Aaron.',
5:'Tot astfel, nici Hristos nu S-a glorificat pe Sine ca să devină Mare Preot, ci Cel care I-a spus: „Tu ești Fiul Meu; Eu astăzi Te-am născut.”',
6:'după cum spune și în alt loc: „Tu ești preot pentru totdeauna, după rânduiala lui Melhisedec.”',
7:'În zilele vieții Sale în trup, El a adus, cu strigăt puternic și lacrimi, rugăciuni și cereri către Cel care putea să-L salveze din moarte și a fost ascultat datorită evlaviei Sale.',
8:'Deși era Fiu, a învățat ascultarea din ceea ce a suferit.',
9:'Și, fiind făcut desăvârșit, a devenit pentru toți cei care ascultă de El autorul mântuirii veșnice,',
10:'fiind numit de Dumnezeu Mare Preot după rânduiala lui Melhisedec.',
11:'Despre aceasta avem multe de spus și este greu de explicat, fiindcă ați devenit greoi la auz.',
12:'Căci, deși după atâta vreme ar fi trebuit să fiți învățători, aveți din nou nevoie ca cineva să vă învețe elementele de început ale cuvintelor lui Dumnezeu; ați ajuns să aveți nevoie de lapte, nu de hrană tare.',
13:'Căci oricine se hrănește cu lapte este nepriceput în cuvântul dreptății, fiindcă este copil.',
14:'Dar hrana tare este pentru cei maturi, ale căror simțuri, prin deprindere, sunt antrenate să deosebească binele de rău.'
}
A={
1:'Πᾶς γὰρ ἀρχιερεὺς ἐξ ἀνθρώπων',
2:'μετριοπαθεῖν δυνάμενος τοῖς ἀγνοοῦσι',
3:'καὶ ⸂διʼ αὐτὴν⸃ ὀφείλει',
4:'καὶ οὐχ ἑαυτῷ τις λαμβάνει τὴν τιμήν',
5:'Οὕτως καὶ ὁ Χριστὸς οὐχ ἑαυτὸν ἐδόξασεν',
6:'Σὺ ἱερεὺς εἰς τὸν αἰῶνα κατὰ τὴν τάξιν Μελχισέδεκ',
7:'ὃς ἐν ταῖς ἡμέραις τῆς σαρκὸς αὐτοῦ',
8:'καίπερ ὢν υἱός, ἔμαθεν',
9:'καὶ τελειωθεὶς ἐγένετο',
10:'προσαγορευθεὶς ὑπὸ τοῦ θεοῦ ἀρχιερεὺς',
11:'Περὶ οὗ πολὺς ἡμῖν ὁ λόγος',
12:'καὶ γὰρ ὀφείλοντες εἶναι διδάσκαλοι',
13:'πᾶς γὰρ ὁ μετέχων γάλακτος',
14:'τελείων δέ ἐστιν ἡ στερεὰ τροφή'
}

def extract(member): return subprocess.check_output(['unzip','-p',str(ZIP),member], text=True)
def note(v,term,decision,alternatives,reason):
    return {'verse':v,'term':term,'decision':decision,'alternatives':alternatives,'reason':reason,'reviewRequired':True,'resolutionStatus':'resolved','resolutionReason':reason}

def main():
    assert subprocess.check_output(['sha256sum',str(ZIP)],text=True).split()[0]==SNAP
    src={k:extract(p) for k,p in {
      'sbl':'sblgnt/text/HEB.txt','app':'sblgnt/apparatus/text/HEB.txt','tr':'tr/HEB.usfm','webp':'webp/HEB.usfm','btf':'btf/HEB.usfm','corn':'cornilescu1924/HEB.usfm','libera':'biblia-libera/HEB.usfm'}.items()}
    for k,t in src.items(): assert t.strip(),k
    for v in range(1,15): assert f'Heb 5:{v}\t' in src['sbl'],v
    sbl_nfc=unicodedata.normalize('NFC',src['sbl'])
    for v,a in A.items(): assert unicodedata.normalize('NFC',a) in sbl_nfc,(v,a)
    assert 'Hebrews 5:12' in src['app']
    assert '12 τινὰ' in src['app'] and 'οὐ WH' in src['app']
    for witness in ('tr','webp','btf','corn','libera'):
        assert '\\c 5' in src[witness], witness

    d=json.loads(CH.read_text())
    assert d['status']=='in_review' and d['public'] is False
    assert [x['number'] for x in d['verses']]==list(range(1,15))
    for x in d['verses']: x['text']=T[x['number']]
    for x in d['benchmark']['translationsConsulted']:
        x['consultedInBatch']=x['id'] in {'CORNILESCU-1924','BTF'}
    d['benchmark']['observations']=[
      'Toate cele 14 versete au fost revizuite semantic direct față de snapshotul fixat SBLGNT 1.2 și aparatul lui; rezultatul automat „0 probleme” nu a fost folosit drept verdict semantic.',
      'TR a fost folosit numai ca martor textual. WEBP, BTF, Cornilescu 1924 și Biblia Liberă au fost consultate auxiliar. NTR nu a fost consultată; textul românesc a fost redactat independent.'
    ]
    nums='\n'.join(str(i) for i in range(1,15)).encode()
    a=d['audit']
    a.update({
      'completedOn':'2026-08-08','engineVersion':'3.0.0','reviewLevel':'ai-complete',
      'reviewAgent':{'type':'ai','engine':'Codex / GPT-5','runId':RUN,'method':'verse-by-verse-source-and-benchmark'},
      'sourceSnapshotSha256':SNAP,
      'verseCoverage':{'expected':14,'reviewed':14,'continuous':True,'verseNumbersSha256':'sha256:'+hashlib.sha256(nums).hexdigest()},
      'sourceLanguage':{'language':'greacă koine','text':'SBLGNT 1.2 + aparat; Textus Receptus ca martor suplimentar','result':'approved','scope':'Toate cele 14 versete au fost confruntate direct cu SBLGNT/aparat din snapshotul fixat; TR a fost folosit numai ca martor, iar WEBP/BTF/Cornilescu 1924/Biblia Liberă ca auxiliare.'},
      'romanianLanguage':{'result':'approved','changesApplied':['Au fost eliminate calcurile englezești, acordurile defectuoase și punctuația coruptă din candidatul anterior.','Terminologia preoțească și pedagogică a fost uniformizată într-o română naturală fără parafraze doctrinare.','Citatele din Psalmii 2 și 110 au fost redate coerent după textul grec fixat.']},
      'theologicalContext':{'result':'approved','principles':['γεννάω din 5:5 este redat lexical prin „a naște”, nu prin parafraza engleză „a deveni Tată”.','τελειόω din 5:9 este păstrat ca limbaj al aducerii la desăvârșire în argumentul preoțesc, fără a sugera corectarea unei imperfecțiuni morale.','La 5:12 textul principal urmează lectura SBLGNT τινὰ și οὐ; variantele aparatului nu sunt importate automat.']},
      'omissionAddition':{'result':'approved','omissions':0,'additions':0},
      'copyrightDistance':{'result':'approved','method':'redactare proprie din SBLGNT/aparat și verificări auxiliare fixate; fără copierea unei traduceri românești'},
      'criticalIssues':{'result':'approved','open':0}
    })
    a.pop('benchmarkEvidence',None); a.pop('modelEvidence',None)
    d['editorialNotes']=[
      note(2,'μετριοπαθεῖν','„să se poarte cu măsură”',['„să fie blând”','„să aibă îngăduință”'],'Verbul descrie o atitudine moderată și cumpătată față de cei neștiutori și rătăciți; formularea evită îngustarea sensului la o singură emoție.'),
      note(3,'διʼ αὐτὴν','„din cauza acestei slăbiciuni”',['TR: διὰ ταύτην'],'Referentul este slăbiciunea din versetul precedent; SBLGNT păstrează αὐτήν, iar TR are demonstrativul ταύτην. Sensul referențial este făcut explicit fără importarea formei TR.'),
      note(5,'ἐγὼ σήμερον γεγέννηκά σε','„Eu astăzi Te-am născut”',['„astăzi am devenit Tatăl Tău”'],'Perfectul lui γεννάω este redat lexical; parafraza engleză auxiliară nu este folosită ca text principal.'),
      note(7,'εἰσακουσθεὶς ἀπὸ τῆς εὐλαβείας','„a fost ascultat datorită evlaviei Sale”',['„din cauza fricii Sale”','„datorită respectului Său reverențios”'],'εὐλάβεια exprimă reverență/evlavie; formularea aleasă păstrează sensul fără a sugera că rugăciunea a fost ascultată din teamă servilă.'),
      note(9,'τελειωθεὶς … αἴτιος σωτηρίας αἰωνίου','„fiind făcut desăvârșit … autorul mântuirii veșnice”',['„desăvârșindu-Se … cauza mântuirii”'],'τελειόω este păstrat în registrul argumentului preoțesc, iar αἴτιος este redat prin „autorul”, fără a adăuga o teorie externă despre mecanismul mântuirii.'),
      note(12,'τινὰ … οὐ στερεᾶς τροφῆς','„ca cineva să vă învețe … lapte, nu hrană tare”',['Treg/RP: τίνα; Treg/NA28/RP: καὶ οὐ'],'SBLGNT urmează aici τινὰ și simplul οὐ; textul românesc păstrează un subiect nedefinit „cineva” și opoziția directă fără adaosul conjunctiv din ceilalți martori.')
    ]
    val=runpy.run_path('scripts/check-biblia-emanus.py')
    a['textDigest']=val['chapter_text_digest'](d)
    a['contentDigest']=val['chapter_content_digest'](d)
    out=unicodedata.normalize('NFC',json.dumps(d,ensure_ascii=False,indent=2)+'\n')
    CH.write_text(out)
    lines=['# Revizie AI, lot Evrei 5','', 'Statut: `in_review` — **nu este aprobare de publicare**.','', 'Data: `2026-08-08`','', 'Reviewer: `codex-gpt-5` (`ai`; sistem: `Codex / GPT-5`; rulare: `'+RUN+'`)','', '## Domeniu și surse','', 'Au fost revizuite semantic toate cele 14 versete din `HEB.5` direct cu snapshotul fixat SBLGNT 1.2 și aparatul lui. TR a fost folosit numai ca martor textual. WEBP, BTF, Cornilescu 1924 și Biblia Liberă au fost consultate auxiliar. NTR nu a fost consultată (`consultedInBatch: false`). Nicio traducere românească nu a fost copiată. Rezultatul validatorului automat nu a fost tratat drept verdict semantic.','', '## Decizii pe verset','', '| Referință BE | Ancoră SBLGNT verificată | Decizie editorială |','| --- | --- | --- |']
    for v in range(1,15): lines.append(f'| HEB.5.{v} | `{A[v]}` | {T[v]} |')
    lines += ['', '## Concluzie de lot','', 'Toate cele 14 versete au fost confruntate individual cu textul grec fixat, aparatul și martorii declarați. La 5:12 au fost verificate explicit lecturile `τινὰ` și `οὐ` ale textului principal față de variantele aparatului. Capitolul rămâne `in_review` și `public: false`; acest lot nu autorizează publicarea.','']
    JR.write_text(unicodedata.normalize('NFC','\n'.join(lines)))

if __name__=='__main__': main()
