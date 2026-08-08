#!/usr/bin/env python3
import hashlib, json, runpy, subprocess, unicodedata
from pathlib import Path

CH=Path('docs/data/biblia-emanus/HEB.4.json')
JR=Path('docs/biblia-emanus/NT-AI-REVIEW-BATCH-2026-08-08-HEB.4.md')
ZIP=Path('docs/data/biblia-emanus/sources/nt-sblgnt-1.2.zip')
SNAP='29b8762199eb87757ec36961097b817cb2b569557d95348a70fac66c0262f424'
RUN='emanus-nt-review-2026-08-08-heb-4'

T={
1:'Să ne temem, așadar, ca nu cumva, cât timp rămâne promisiunea de a intra în odihna Lui, vreunul dintre voi să pară că a rămas în urmă.',
2:'Căci și nouă ni s-a vestit Evanghelia, ca și lor; dar cuvântul auzit nu le-a fost de folos, deoarece cei care l-au auzit nu au fost uniți cu el prin credință.',
3:'Noi, cei care am crezut, intrăm în odihnă, după cum a spus: „Așa am jurat în mânia Mea: «Nu vor intra în odihna Mea»”, deși lucrările Lui erau încheiate de la întemeierea lumii.',
4:'Căci despre ziua a șaptea a spus undeva astfel: „Și Dumnezeu S-a odihnit în ziua a șaptea de toate lucrările Sale.”',
5:'Iar în locul acesta spune din nou: „Nu vor intra în odihna Mea.”',
6:'Așadar, fiindcă rămâne ca unii să intre în ea, iar cei cărora li s-a vestit mai înainte Evanghelia nu au intrat din cauza neascultării,',
7:'El hotărăște din nou o anumită zi, „Astăzi”, spunând prin David, după atât de mult timp, așa cum s-a spus mai înainte: „Astăzi, dacă auziți glasul Lui, nu vă împietriți inimile.”',
8:'Căci dacă Iosua le-ar fi dat odihnă, Dumnezeu nu ar mai fi vorbit după aceea despre o altă zi.',
9:'Prin urmare, rămâne o odihnă de Sabat pentru poporul lui Dumnezeu.',
10:'Căci cel care a intrat în odihna Lui s-a odihnit și el de lucrările sale, așa cum Dumnezeu S-a odihnit de ale Sale.',
11:'Să ne străduim, așadar, să intrăm în acea odihnă, pentru ca nimeni să nu cadă urmând același exemplu de neascultare.',
12:'Căci Cuvântul lui Dumnezeu este viu și lucrător, mai ascuțit decât orice sabie cu două tăișuri, pătrunzând până la despărțirea sufletului și a duhului, a încheieturilor și a măduvei, și este în stare să judece gândurile și intențiile inimii.',
13:'Nicio făptură nu este ascunsă înaintea Lui, ci toate sunt goale și descoperite înaintea ochilor Celui căruia trebuie să-I dăm socoteală.',
14:'Așadar, fiindcă avem un Mare-Preot măreț, care a străbătut cerurile, pe Isus, Fiul lui Dumnezeu, să ținem cu tărie mărturisirea noastră.',
15:'Căci nu avem un Mare-Preot care să nu poată avea compasiune pentru slăbiciunile noastre, ci unul care a fost ispitit în toate, în același fel ca noi, dar fără păcat.',
16:'Să ne apropiem, așadar, cu îndrăzneală de tronul harului, ca să primim îndurare și să găsim har pentru ajutor la vreme potrivită.'
}

A={
1:'Φοβηθῶμεν οὖν μήποτε καταλειπομένης ἐπαγγελίας',
2:'καὶ γάρ ἐσμεν εὐηγγελισμένοι καθάπερ κἀκεῖνοι',
3:'Εἰσερχόμεθα γὰρ εἰς τὴν κατάπαυσιν οἱ πιστεύσαντες',
4:'Καὶ κατέπαυσεν ὁ θεὸς ἐν τῇ ἡμέρᾳ τῇ ἑβδόμῃ',
5:'Εἰ εἰσελεύσονται εἰς τὴν κατάπαυσίν μου',
6:'ἐπεὶ οὖν ἀπολείπεται τινὰς εἰσελθεῖν εἰς αὐτήν',
7:'πάλιν τινὰ ὁρίζει ἡμέραν, Σήμερον',
8:'εἰ γὰρ αὐτοὺς Ἰησοῦς κατέπαυσεν',
9:'ἄρα ἀπολείπεται σαββατισμὸς τῷ λαῷ τοῦ θεοῦ',
10:'ὁ γὰρ εἰσελθὼν εἰς τὴν κατάπαυσιν αὐτοῦ',
11:'Σπουδάσωμεν οὖν εἰσελθεῖν εἰς ἐκείνην τὴν κατάπαυσιν',
12:'Ζῶν γὰρ ὁ λόγος τοῦ θεοῦ καὶ ἐνεργὴς',
13:'οὐκ ἔστιν κτίσις ἀφανὴς ἐνώπιον αὐτοῦ',
14:'Ἔχοντες οὖν ἀρχιερέα μέγαν διεληλυθότα τοὺς οὐρανούς',
15:'οὐ γὰρ ἔχομεν ἀρχιερέα μὴ δυνάμενον συνπαθῆσαι',
16:'προσερχώμεθα οὖν μετὰ παρρησίας τῷ θρόνῳ τῆς χάριτος'
}

def extract(member): return subprocess.check_output(['unzip','-p',str(ZIP),member], text=True)
def note(v,term,decision,alternatives,reason):
    return {'verse':v,'term':term,'decision':decision,'alternatives':alternatives,'reason':reason,'reviewRequired':True,'resolutionStatus':'resolved','resolutionReason':reason}

def main():
    assert subprocess.check_output(['sha256sum',str(ZIP)],text=True).split()[0]==SNAP
    src={k:extract(p) for k,p in {
      'sbl':'sblgnt/text/HEB.txt','app':'sblgnt/apparatus/text/HEB.txt','tr':'tr/HEB.usfm','webp':'webp/HEB.usfm','btf':'btf/HEB.usfm','corn':'cornilescu1924/HEB.usfm','libera':'biblia-libera/HEB.usfm'}.items()}
    for k,t in src.items(): assert t.strip(),k
    for v in range(1,17): assert f'Heb 4:{v}\t' in src['sbl'],v
    # Each journal anchor is checked against the exact pinned SBL text after normalization.
    sbl_nfc=unicodedata.normalize('NFC',src['sbl'])
    for v,a in A.items(): assert unicodedata.normalize('NFC',a) in sbl_nfc,(v,a)

    d=json.loads(CH.read_text())
    assert d['status']=='in_review' and d['public'] is False
    assert [x['number'] for x in d['verses']]==list(range(1,17))
    for x in d['verses']: x['text']=T[x['number']]
    for x in d['benchmark']['translationsConsulted']: x['consultedInBatch']=x['id'] in {'CORNILESCU-1924','BTF'}
    d['benchmark']['observations']=[
      'Toate cele 16 versete au fost revizuite semantic direct față de snapshotul fixat SBLGNT 1.2 și aparatul lui; un rezultat automat „0 probleme” nu a fost folosit drept verdict semantic.',
      'TR a fost folosit numai ca martor textual. WEBP, BTF, Cornilescu 1924 și Biblia Liberă au fost consultate auxiliar. NTR nu a fost consultată; textul românesc a fost redactat independent.'
    ]
    nums='\n'.join(str(i) for i in range(1,17)).encode()
    a=d['audit']
    a.update({
      'completedOn':'2026-08-08','engineVersion':'3.0.0','reviewLevel':'ai-complete',
      'reviewAgent':{'type':'ai','engine':'Codex / GPT-5','runId':RUN,'method':'verse-by-verse-source-and-benchmark'},
      'sourceSnapshotSha256':SNAP,
      'verseCoverage':{'expected':16,'reviewed':16,'continuous':True,'verseNumbersSha256':'sha256:'+hashlib.sha256(nums).hexdigest()},
      'sourceLanguage':{'language':'greacă koine','text':'SBLGNT 1.2 + aparat; Textus Receptus ca martor suplimentar','result':'approved','scope':'Toate cele 16 versete au fost confruntate direct cu SBLGNT/aparat din snapshotul fixat; TR a fost citit exclusiv ca martor, iar WEBP/BTF/Cornilescu 1924/Biblia Liberă ca auxiliare.'},
      'romanianLanguage':{'result':'approved','changesApplied':['Au fost eliminate calcurile și fragmentul englezesc din 4:12, precum și dublarea din 4:14.','Frazele complexe despre odihnă au fost reconstruite în română fără inversarea relațiilor logice.','Citatele din Psalmul 95 și Geneza 2 au fost punctuate coerent, fără a le extinde din martori auxiliari.']},
      'theologicalContext':{'result':'approved','principles':['Promisiunea din 4:1 este păstrată ca fiind încă disponibilă, nu transformată într-o promisiune „neîmplinită” de cititor.','σαββατισμός din 4:9 este redat lexical „odihnă de Sabat”, fără concluzii confesionale adăugate.','λόγος τοῦ θεοῦ din 4:12 este redat literal și funcțional, fără a identifica în corpul versetului referentul printr-o glosă teologică externă.']},
      'omissionAddition':{'result':'approved','omissions':0,'additions':0},
      'copyrightDistance':{'result':'approved','method':'redactare proprie din SBLGNT/aparat și verificări auxiliare fixate; fără copierea unei traduceri românești'},
      'criticalIssues':{'result':'approved','open':0}
    })
    a.pop('benchmarkEvidence',None); a.pop('modelEvidence',None)
    d['editorialNotes']=[
      note(1,'καταλειπομένης ἐπαγγελίας','„cât timp rămâne promisiunea”',['„fiind lăsată o promisiune”'],'Participiul prezent exprimă existența/rămânerea promisiunii; formularea anterioară schimba sensul în ideea că cititorul nu și-ar fi făcut o promisiune.'),
      note(2,'μὴ συγκεκερασμένους τῇ πίστει τοῖς ἀκούσασιν','„cei care l-au auzit nu au fost uniți cu el prin credință”',['lecturi ale aparatului care leagă acordul diferit de „cuvânt” sau de „cei ce au auzit”'],'Aparatul a fost verificat; textul principal urmează forma SBLGNT și păstrează ideea lipsei unirii prin credință, fără a importa automat lectura TR.'),
      note(9,'σαββατισμός','„odihnă de Sabat”',['„sabatizare”','„odihnă sabatică”'],'Termenul este distinct de κατάπαυσις și păstrează aluzia la Sabat; formularea aleasă este naturală și nu adaugă o prescripție confesională.'),
      note(12,'μερισμοῦ ψυχῆς καὶ πνεύματος … κριτικὸς ἐνθυμήσεων καὶ ἐννοιῶν καρδίας','„până la despărțirea sufletului și a duhului … judecă gândurile și intențiile inimii”',['„separarea sufletului de duh”'],'Genitivele sunt păstrate fără a transforma imaginea retorică într-o definiție antropologică; κριτικός este redat prin funcția de evaluare/judecare.'),
      note(13,'πρὸς ὃν ἡμῖν ὁ λόγος','„Celui căruia trebuie să-I dăm socoteală”',['„Cel despre care vorbim”'],'Idiomul privește răspunderea înaintea lui Dumnezeu în context; formularea românească evită literalismul ambiguu.'),
      note(15,'πεπειρασμένον … χωρὶς ἁμαρτίας','„ispitit în toate … dar fără păcat”',['„încercat în toate”'],'πειράζω poate indica încercare/ispitire; contextul solidarității Marelui-Preot și precizarea „fără păcat” susțin formularea aleasă, fără a afirma că El a păcătuit.')
    ]
    validator=runpy.run_path('scripts/check-biblia-emanus.py')
    a['textDigest']=validator['chapter_text_digest'](d)
    a['contentDigest']=validator['chapter_content_digest'](d)
    out=unicodedata.normalize('NFC',json.dumps(d,ensure_ascii=False,indent=2)+'\n')
    CH.write_text(out)
    reread=json.loads(CH.read_text())
    assert reread['audit']['textDigest']==validator['chapter_text_digest'](reread)
    assert reread['audit']['contentDigest']==validator['chapter_content_digest'](reread)

    lines=['# Revizie AI, lot Evrei 4','', 'Statut: `in_review` — **nu este aprobare de publicare**.','', 'Data: `2026-08-08`','', 'Reviewer: `codex-gpt-5` (`ai`; sistem: `Codex / GPT-5`; rulare: `'+RUN+'`)','', '## Domeniu și surse','', 'Au fost revizuite semantic toate cele 16 versete din `HEB.4` direct cu snapshotul fixat SBLGNT 1.2 și aparatul lui. TR a fost folosit numai ca martor textual. WEBP, BTF, Cornilescu 1924 și Biblia Liberă au fost consultate auxiliar. NTR nu a fost consultată (`consultedInBatch: false`). Nicio traducere românească nu a fost copiată. Rezultatul validatorului automat nu a fost tratat drept verdict semantic.','', '## Decizii pe verset','', '| Referință BE | Ancoră SBLGNT verificată | Decizie editorială |','| --- | --- | --- |']
    for v in range(1,17): lines.append(f'| HEB.4.{v} | `{A[v]}` | {T[v]} |')
    lines += ['', '## Concluzie de lot','', 'Toate cele 16 versete au fost confruntate individual cu textul grec fixat, aparatul și martorii declarați. Problemele de sens, calcurile și fragmentul englezesc din textul anterior au fost reparate. Capitolul rămâne `in_review` și `public: false`; acest lot nu autorizează publicarea.','']
    JR.write_text(unicodedata.normalize('NFC','\n'.join(lines)))

if __name__=='__main__': main()
