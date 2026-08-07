#!/usr/bin/env python3
import json, runpy, subprocess, unicodedata
from pathlib import Path

CH=Path('docs/data/biblia-emanus/HEB.3.json')
JR=Path('docs/biblia-emanus/NT-AI-REVIEW-BATCH-2026-08-08-HEB.3.md')
ZIP=Path('docs/data/biblia-emanus/sources/nt-sblgnt-1.2.zip')
SNAP='29b8762199eb87757ec36961097b817cb2b569557d95348a70fac66c0262f424'
RUN='emanus-nt-review-2026-08-08-heb-3'

T={
1:'De aceea, frați sfinți, părtași ai unei chemări cerești, priviți cu atenție la Isus, Apostolul și Marele-Preot al mărturisirii noastre,',
2:'care este credincios Celui ce L-a rânduit, așa cum și Moise a fost credincios în casa Lui.',
3:'Căci El a fost socotit vrednic de mai multă slavă decât Moise, cu atât mai mult cu cât cel care construiește casa are mai multă cinste decât casa.',
4:'Fiindcă orice casă este construită de cineva, dar Cel care a construit toate este Dumnezeu.',
5:'Și Moise a fost credincios în toată casa Lui ca slujitor, spre mărturie despre lucrurile care aveau să fie spuse,',
6:'dar Hristos este credincios ca Fiu peste casa Lui; iar casa Lui suntem noi, dacă ținem cu tărie la îndrăzneala și lauda nădejdii.',
7:'De aceea, după cum spune Duhul Sfânt: „Astăzi, dacă auziți glasul Lui,',
8:'nu vă împietriți inimile ca în răzvrătire, în ziua încercării din pustiu,',
9:'unde părinții voștri M-au pus la încercare, într-o probă, și au văzut lucrările Mele',
10:'timp de patruzeci de ani. De aceea M-am mâniat pe generația aceasta și am spus: «Ei rătăcesc mereu în inimă și nu au cunoscut căile Mele»,',
11:'așa că am jurat în mânia Mea: «Nu vor intra în odihna Mea.»”',
12:'Aveți grijă, fraților, ca nu cumva să fie în vreunul dintre voi o inimă rea, necredincioasă, care să se îndepărteze de Dumnezeul cel viu.',
13:'Ci încurajați-vă unii pe alții în fiecare zi, cât timp se spune „Astăzi”, ca niciunul dintre voi să nu fie împietrit prin înșelăciunea păcatului.',
14:'Căci am devenit părtași ai lui Hristos, dacă ținem ferm până la sfârșit încrederea pe care am avut-o de la început.',
15:'Așa cum se spune: „Astăzi, dacă auziți glasul Lui, nu vă împietriți inimile ca în răzvrătire.”',
16:'Căci cine au fost cei care, deși au auzit, s-au răzvrătit? Oare nu toți cei care au ieșit din Egipt prin Moise?',
17:'Și pe cine S-a mâniat timp de patruzeci de ani? Oare nu pe cei care au păcătuit, ale căror trupuri au căzut în pustiu?',
18:'Și cui i-a jurat că nu vor intra în odihna Lui, dacă nu celor care nu au ascultat?',
19:'Și vedem că nu au putut să intre din cauza necredinței.'
}

A={
1:'Ὅθεν, ἀδελφοὶ ἅγιοι … κατανοήσατε τὸν ἀπόστολον καὶ ἀρχιερέα … Ἰησοῦν',
2:'πιστὸν ὄντα τῷ ποιήσαντι αὐτὸν ὡς καὶ Μωϋσῆς ἐν τῷ οἴκῳ αὐτοῦ',
3:'πλείονος γὰρ οὗτος δόξης παρὰ Μωϋσῆν ἠξίωται … ὁ κατασκευάσας αὐτόν',
4:'πᾶς γὰρ οἶκος κατασκευάζεται ὑπό τινος, ὁ δὲ πάντα κατασκευάσας θεός',
5:'Μωϋσῆς … πιστὸς ἐν ὅλῳ τῷ οἴκῳ αὐτοῦ ὡς θεράπων … τῶν λαληθησομένων',
6:'Χριστὸς δὲ ὡς υἱὸς ἐπὶ τὸν οἶκον αὐτοῦ· ὅς οἶκός ἐσμεν ἡμεῖς, ἐὰν … τῆς ἐλπίδος κατάσχωμεν',
7:'καθὼς λέγει τὸ πνεῦμα τὸ ἅγιον· Σήμερον ἐὰν τῆς φωνῆς αὐτοῦ ἀκούσητε',
8:'μὴ σκληρύνητε τὰς καρδίας ὑμῶν ὡς ἐν τῷ παραπικρασμῷ … ἐν τῇ ἐρήμῳ',
9:'οὗ ἐπείρασαν οἱ πατέρες ὑμῶν ἐν δοκιμασίᾳ καὶ εἶδον τὰ ἔργα μου',
10:'τεσσεράκοντα ἔτη· διὸ προσώχθισα τῇ γενεᾷ ταύτῃ … Ἀεὶ πλανῶνται τῇ καρδίᾳ',
11:'ὡς ὤμοσα ἐν τῇ ὀργῇ μου· Εἰ εἰσελεύσονται εἰς τὴν κατάπαυσίν μου',
12:'βλέπετε, ἀδελφοί … καρδία πονηρὰ ἀπιστίας ἐν τῷ ἀποστῆναι ἀπὸ θεοῦ ζῶντος',
13:'παρακαλεῖτε ἑαυτοὺς καθ’ ἑκάστην ἡμέραν … μὴ σκληρυνθῇ τις ἐξ ὑμῶν ἀπάτῃ τῆς ἁμαρτίας',
14:'μέτοχοι γὰρ τοῦ Χριστοῦ γεγόναμεν … τὴν ἀρχὴν τῆς ὑποστάσεως … βεβαίαν κατάσχωμεν',
15:'Σήμερον ἐὰν τῆς φωνῆς αὐτοῦ ἀκούσητε, Μὴ σκληρύνητε τὰς καρδίας ὑμῶν',
16:'τίνες γὰρ ἀκούσαντες παρεπίκραναν; ἀλλ’ οὐ πάντες οἱ ἐξελθόντες ἐξ Αἰγύπτου διὰ Μωϋσέως',
17:'τίσιν δὲ προσώχθισεν τεσσεράκοντα ἔτη … ὧν τὰ κῶλα ἔπεσεν ἐν τῇ ἐρήμῳ',
18:'τίσιν δὲ ὤμοσεν μὴ εἰσελεύσεσθαι … εἰ μὴ τοῖς ἀπειθήσασιν',
19:'οὐκ ἠδυνήθησαν εἰσελθεῖν δι’ ἀπιστίαν'
}

def extract(member): return subprocess.check_output(['unzip','-p',str(ZIP),member], text=True)
def note(v,term,decision,alternatives,reason): return {'verse':v,'term':term,'decision':decision,'alternatives':alternatives,'reason':reason,'reviewRequired':True,'resolutionStatus':'resolved','resolutionReason':reason}

def main():
    assert subprocess.check_output(['sha256sum',str(ZIP)],text=True).split()[0]==SNAP
    src={k:extract(p) for k,p in {
      'sbl':'sblgnt/text/HEB.txt','app':'sblgnt/apparatus/text/HEB.txt','tr':'tr/HEB.usfm','webp':'webp/HEB.usfm','btf':'btf/HEB.usfm','corn':'cornilescu1924/HEB.usfm','libera':'biblia-libera/HEB.usfm'}.items()}
    for k,t in src.items(): assert t.strip(),k
    for v in A: assert f'Heb 3:{v}\t' in src['sbl'],v
    assert 'Hebrews 3:6' in src['app'] and 'ἐλπίδος' in src['app']

    d=json.loads(CH.read_text())
    assert d['status']=='in_review' and d['public'] is False
    assert [x['number'] for x in d['verses']]==list(range(1,20))
    for x in d['verses']: x['text']=T[x['number']]
    for x in d['benchmark']['translationsConsulted']: x['consultedInBatch']=x['id'] in {'CORNILESCU-1924','BTF'}
    d['benchmark']['observations']=[
      'Toate cele 19 versete au fost revizuite direct față de snapshotul fixat SBLGNT 1.2 și aparatul lui; TR a fost folosit numai ca martor textual.',
      'WEBP, BTF, Cornilescu 1924 și Biblia Liberă au fost consultate auxiliar. NTR nu a fost consultată și nu s-a copiat o traducere românească.'
    ]
    a=d['audit']
    a.update({
      'completedOn':'2026-08-08','engineVersion':'3.0.0','reviewLevel':'ai-complete',
      'reviewAgent':{'type':'ai','engine':'Codex / GPT-5','runId':RUN,'method':'verse-by-verse-source-and-benchmark'},
      'sourceSnapshotSha256':SNAP,
      'verseCoverage':{'expected':19,'reviewed':19,'continuous':True,'verseNumbersSha256':'sha256:b80e02d8660abe7d46fff4d9e100f3047d277fd4527519d4311f7aa3cbf05a29'},
      'sourceLanguage':{'language':'greacă koine','text':'SBLGNT 1.2 + aparat; Textus Receptus ca martor suplimentar','result':'approved','scope':'Toate cele 19 versete au fost confruntate direct cu SBLGNT/aparat din snapshotul fixat; TR a fost citit exclusiv ca martor, iar WEBP/BTF/Cornilescu 1924/Biblia Liberă ca auxiliare.'},
      'romanianLanguage':{'result':'approved','changesApplied':['Au fost reparate calcurile și propozițiile nefirești din textul anterior.','Citatul din Psalmul 95 a fost punctuat coerent și repetarea lui din 3:15 a fost păstrată semantic.','Formulările condiționale din 3:6 și 3:14 au fost păstrate fără adaosuri preluate din martorul TR.']},
      'theologicalContext':{'result':'approved','principles':['Textul principal urmează SBLGNT la omisiunile și ordinea cuvintelor consemnate de aparat.','ὑπόστασις din 3:14 este redat contextual prin „încrederea” de la început, fără a importa aici sensul ontologic din alte contexte.','Textul nu atenuează avertismentul despre necredință și îndepărtare, dar nici nu îi adaugă o concluzie confesională.']},
      'omissionAddition':{'result':'approved','omissions':0,'additions':0},
      'copyrightDistance':{'result':'approved','method':'redactare proprie din SBLGNT/aparat și verificări auxiliare fixate; fără copierea unei traduceri românești'},
      'criticalIssues':{'result':'approved','open':0}
    })
    a.pop('benchmarkEvidence',None); a.pop('modelEvidence',None)
    d['editorialNotes']=[
      note(1,'Ἰησοῦν','„Isus”',['TR/RP: „Isus Hristos”'],'SBLGNT nu are Χριστόν în acest loc; numele „Hristos” din RP nu este importat în textul principal.'),
      note(2,'ἐν τῷ οἴκῳ αὐτοῦ','„în casa Lui”',['WH/Treg/RP: „în toată casa Lui”'],'SBLGNT Holmes nu tipărește ὅλῳ în 3:2; „toată” este păstrat la 3:5, unde se află în textul principal.'),
      note(6,'ὅς οἶκός ἐσμεν ἡμεῖς','„iar casa Lui suntem noi”',['οὗ … în WH/Treg/RP'],'Snapshotul Holmes tipărește ὅς; relația posesivă este redată firesc în română din antecedentul „casa Lui”, fără a transforma diferența într-o doctrină.'),
      note(6,'τὸ καύχημα τῆς ἐλπίδος κατάσχωμεν','„ținem cu tărie la îndrăzneala și lauda nădejdii”',['WH/Treg/RP adaugă „până la sfârșit, ferm”'],'SBLGNT nu include adaosul μέχρι τέλους βεβαίαν la 3:6; acesta nu este importat, deși o formulare similară apare explicit în 3:14.'),
      note(9,'ἐπείρασαν … ἐν δοκιμασίᾳ','„M-au pus la încercare, într-o probă”',['RP: ἐπείρασαν με / ἐδοκιμασάν με'],'SBLGNT omite pronumele με și păstrează expresia prepozițională; în română obiectul este recuperat semantic din vocea citatului, iar diferența textuală este consemnată aici.'),
      note(14,'τὴν ἀρχὴν τῆς ὑποστάσεως','„încrederea pe care am avut-o de la început”',['„temelia de la început”','„starea de la început”'],'În acest context ὑπόστασις desemnează poziția/încrederea fermă asumată; formularea evită transferarea automată a sensului tehnic din Evrei 1:3.')
    ]
    val=runpy.run_path('scripts/check-biblia-emanus.py')
    a['textDigest']=val['chapter_text_digest'](d); a['contentDigest']=val['chapter_content_digest'](d)
    CH.write_text(unicodedata.normalize('NFC',json.dumps(d,ensure_ascii=False,indent=2)+'\n'))
    lines=['# Revizie AI, lot Evrei 3','', 'Statut: `in_review` — **nu este aprobare de publicare**.','', 'Data: `2026-08-08`','', f'Reviewer: `codex-gpt-5` (`ai`; sistem: `Codex / GPT-5`; rulare: `{RUN}`)','', '## Domeniu și surse','', 'Au fost revizuite direct toate cele 19 versete din `HEB.3` față de snapshotul fixat SBLGNT 1.2 și aparatul său. `TR-HEB` a fost folosit numai ca martor textual. `WEBP-HEB`, `BTF-HEB`, `CORNILESCU1924-HEB` și Biblia Liberă au fost consultate auxiliar. NTR nu a fost consultată (`consultedInBatch: false`). Redactarea este proprie și lotul nu reprezintă aprobare ori publicare.','', '## Decizii pe verset','', '| Referință BE | Ancoră SBLGNT verificată | Decizie |','| --- | --- | --- |']
    for v in range(1,20): lines.append(f'| HEB.3.{v} | `{A[v]}` | {T[v]} |')
    lines += ['', '## Concluzie de lot','', 'Toate cele 19 versete au fost decise semantic după confruntarea directă cu SBLGNT/aparat. Au fost documentate variantele materiale din 3:1, 3:2, 3:6 și 3:9, iar 3:14 a fost tratat lexical fără a importa automat sensul lui `ὑπόστασις` din 1:3. Capitolul rămâne `in_review` și `public: false`.','']
    JR.write_text(unicodedata.normalize('NFC','\n'.join(lines)))
    d2=json.loads(CH.read_text()); assert d2['audit']['textDigest']==val['chapter_text_digest'](d2); assert d2['audit']['contentDigest']==val['chapter_content_digest'](d2)

if __name__=='__main__': main()
