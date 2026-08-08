#!/usr/bin/env python3
import hashlib, json, runpy, subprocess, unicodedata
from pathlib import Path
CH=Path('docs/data/biblia-emanus/HEB.8.json')
JR=Path('docs/biblia-emanus/NT-AI-REVIEW-BATCH-2026-08-08-HEB.8.md')
ZIP=Path('docs/data/biblia-emanus/sources/nt-sblgnt-1.2.zip')
SNAP='29b8762199eb87757ec36961097b817cb2b569557d95348a70fac66c0262f424'
RUN='emanus-nt-review-2026-08-08-heb-8'
T={
1:'Punctul principal al celor spuse este acesta: avem un astfel de Mare Preot, care S-a așezat la dreapta tronului Măreției în ceruri,',
2:'slujitor al sanctuarului și al adevăratului cort, pe care l-a ridicat Domnul, nu un om.',
3:'Căci orice mare preot este pus să aducă daruri și jertfe; de aceea este necesar ca și Acesta să aibă ceva de adus.',
4:'Dacă ar fi pe pământ, nici n-ar fi preot, fiindcă sunt cei care aduc darurile potrivit Legii.',
5:'Ei slujesc unei reprezentări și unei umbre a lucrurilor cerești, așa cum a fost înștiințat Moise când urma să ridice cortul: „Vezi”, spune El, „să faci toate după modelul care ți-a fost arătat pe munte.”',
6:'Dar acum El a primit o slujire cu atât mai înaltă, cu cât este și Mijlocitorul unui legământ mai bun, întemeiat prin lege pe promisiuni mai bune.',
7:'Căci, dacă acel prim legământ ar fi fost fără cusur, nu s-ar mai fi căutat loc pentru un al doilea.',
8:'Dar, găsindu-le vină, El spune: „Iată, vin zile, spune Domnul, când voi încheia cu casa lui Israel și cu casa lui Iuda un legământ nou,',
9:'nu ca legământul pe care l-am făcut cu părinții lor în ziua când i-am luat de mână ca să-i scot din țara Egiptului; fiindcă ei n-au rămas în legământul Meu, iar Eu nu M-am mai îngrijit de ei, spune Domnul.',
10:'Căci acesta este legământul pe care îl voi încheia cu casa lui Israel după acele zile, spune Domnul: voi pune legile Mele în mintea lor și le voi scrie pe inimile lor; Eu voi fi Dumnezeul lor, iar ei vor fi poporul Meu.',
11:'Și nu va mai învăța fiecare pe concetățeanul său și fiecare pe fratele său, spunând: „Cunoaște-L pe Domnul!”, fiindcă toți Mă vor cunoaște, de la cel mai mic până la cel mai mare dintre ei.',
12:'Căci voi fi îndurător față de nedreptățile lor și nu-Mi voi mai aminti de păcatele lor.”',
13:'Spunând „un legământ nou”, El l-a făcut învechit pe cel dintâi; iar ceea ce se învechește și îmbătrânește este aproape de dispariție.'
}
A={1:'Κεφάλαιον δὲ ἐπὶ τοῖς λεγομένοις',2:'τῶν ἁγίων λειτουργὸς',3:'πᾶς γὰρ ἀρχιερεὺς',4:'εἰ μὲν ⸀οὖν ἦν ἐπὶ γῆς',5:'οἵτινες ὑποδείγματι καὶ σκιᾷ',6:'⸀νυνὶ δὲ διαφορωτέρας τέτυχεν λειτουργίας',7:'Εἰ γὰρ ἡ πρώτη ἐκείνη',8:'μεμφόμενος γὰρ ⸀αὐτοὺς λέγει',9:'οὐ κατὰ τὴν διαθήκην',10:'ὅτι αὕτη ἡ διαθήκη',11:'καὶ οὐ μὴ διδάξωσιν',12:'ὅτι ἵλεως ἔσομαι',13:'ἐν τῷ λέγειν Καινὴν'}
def extract(member): return subprocess.check_output(['unzip','-p',str(ZIP),member],text=True)
def note(v,term,decision,alts,reason): return {'verse':v,'term':term,'decision':decision,'alternatives':alts,'reason':reason,'reviewRequired':True,'resolutionStatus':'resolved','resolutionReason':reason}
def main():
 assert subprocess.check_output(['sha256sum',str(ZIP)],text=True).split()[0]==SNAP
 src={k:extract(p) for k,p in {'sbl':'sblgnt/text/HEB.txt','app':'sblgnt/apparatus/text/HEB.txt','tr':'tr/HEB.usfm','webp':'webp/HEB.usfm','btf':'btf/HEB.usfm','corn':'cornilescu1924/HEB.usfm','libera':'biblia-libera/HEB.usfm'}.items()}
 for k,t in src.items(): assert t.strip(),k
 for v in range(1,14): assert f'Heb 8:{v}\t' in src['sbl']
 s=unicodedata.normalize('NFC',src['sbl'])
 for v,a0 in A.items(): assert unicodedata.normalize('NFC',a0) in s,(v,a0)
 for marker in ['Hebrews 8:2','Hebrews 8:4','Hebrews 8:6','Hebrews 8:8','Hebrews 8:11','Hebrews 8:12']: assert marker in src['app']
 d=json.loads(CH.read_text()); assert d['status']=='in_review' and d['public'] is False; assert [x['number'] for x in d['verses']]==list(range(1,14))
 for x in d['verses']: x['text']=T[x['number']]
 for x in d['benchmark']['translationsConsulted']: x['consultedInBatch']=x['id'] in {'CORNILESCU-1924','BTF'}
 d['benchmark']['observations']=['Toate cele 13 versete au fost revizuite semantic direct față de snapshotul fixat SBLGNT 1.2 și aparatul lui; rezultatul automat „0 probleme” nu a fost folosit drept verdict semantic.','TR a fost folosit numai ca martor textual. WEBP, BTF, Cornilescu 1924 și Biblia Liberă au fost consultate auxiliar. NTR nu a fost consultată; textul românesc a fost redactat independent.']
 nums='\n'.join(str(i) for i in range(1,14)).encode(); a=d['audit']
 a.update({'completedOn':'2026-08-08','engineVersion':'3.0.0','reviewLevel':'ai-complete','reviewAgent':{'type':'ai','engine':'Codex / GPT-5','runId':RUN,'method':'verse-by-verse-source-and-benchmark'},'sourceSnapshotSha256':SNAP,'verseCoverage':{'expected':13,'reviewed':13,'continuous':True,'verseNumbersSha256':'sha256:'+hashlib.sha256(nums).hexdigest()},'sourceLanguage':{'language':'greacă koine','text':'SBLGNT 1.2 + aparat; Textus Receptus ca martor suplimentar','result':'approved','scope':'Toate cele 13 versete au fost confruntate direct cu SBLGNT/aparat; TR numai martor, iar WEBP/BTF/Cornilescu 1924/Biblia Liberă auxiliare.'},'romanianLanguage':{'result':'approved','changesApplied':['Au fost reparate calcurile și frazele rupte din 8:5-6 și 8:13.','Citatul din Ieremia 31 a fost redat coerent și consecvent în română, păstrând structura textului grec din Evrei.','Termenii cultici și juridici au fost uniformizați fără parafraze confesionale.']},'theologicalContext':{'result':'approved','principles':['ὑπόδειγμα și σκιά din 8:5 sunt redate ca „reprezentare” și „umbră”, fără a transforma metafora într-o schemă doctrinară suplimentară.','La 8:8 textul principal urmează acuzativul αὐτούς din SBLGNT, iar la 8:12 nu importă adaosul RP despre fărădelegi.','διαθήκη este redat consecvent „legământ” în argumentul capitolului.']},'omissionAddition':{'result':'approved','omissions':0,'additions':0},'copyrightDistance':{'result':'approved','method':'redactare proprie din SBLGNT/aparat și verificări auxiliare fixate; fără copierea unei traduceri românești'},'criticalIssues':{'result':'approved','open':0}})
 a.pop('benchmarkEvidence',None); a.pop('modelEvidence',None)
 d['editorialNotes']=[note(2,'οὐκ ἄνθρωπος','„nu un om”',['RP: καὶ οὐκ ἄνθρωπος'],'SBLGNT nu are conjuncția suplimentară înainte de negație; româna păstrează opoziția directă.'),note(4,'οὖν … ὄντων … νόμον','„Dacă ar fi pe pământ … fiindcă sunt cei care aduc darurile potrivit Legii”',['RP: γὰρ; + „preoții”; articol înainte de νόμον'],'Textul principal nu importă explicit substantivul „preoții” adăugat în RP, deși referentul este clar din context.'),note(8,'μεμφόμενος … αὐτούς','„găsindu-le vină”',['Treg/RP: αὐτοῖς'],'SBLGNT/WH/NA28 au acuzativul αὐτούς; formularea românească păstrează oamenii ca obiect al mustrării, fără a altera citatul care urmează.'),note(9,'κἀγὼ ἠμέλησα αὐτῶν','„iar Eu nu M-am mai îngrijit de ei”',['„i-am disprețuit”'],'ἀμελέω indică neglijare/lipsa grijii; alegerea evită intensificarea semantică nejustificată.'),note(11,'ἀπὸ μικροῦ ἕως μεγάλου αὐτῶν','„de la cel mai mic până la cel mai mare dintre ei”',['RP: + αὐτῶν după μικροῦ'],'Textul principal nu are primul pronume suplimentar din RP; sensul distributiv este păstrat natural în română.'),note(12,'τῶν ἁμαρτιῶν αὐτῶν','„păcatele lor”',['RP: + „și fărădelegile lor”'],'Adaosul tradițional καὶ τῶν ἀνομιῶν αὐτῶν este absent din SBLGNT și nu este importat în textul principal.'),note(13,'πεπαλαίωκεν … ἐγγὺς ἀφανισμοῦ','„l-a făcut învechit … aproape de dispariție”',['„l-a desființat”'],'Verbele descriu învechirea și apropierea dispariției; formularea evită a anticipa o concluzie mai tare decât textul.')]
 val=runpy.run_path('scripts/check-biblia-emanus.py'); a['textDigest']=val['chapter_text_digest'](d); a['contentDigest']=val['chapter_content_digest'](d)
 CH.write_text(unicodedata.normalize('NFC',json.dumps(d,ensure_ascii=False,indent=2)+'\n'))
 lines=['# Revizie AI, lot Evrei 8','','Statut: `in_review` — **nu este aprobare de publicare**.','','Data: `2026-08-08`','','Reviewer: `codex-gpt-5` (`ai`; sistem: `Codex / GPT-5`; rulare: `'+RUN+'`)','','## Domeniu și surse','','Au fost revizuite semantic toate cele 13 versete din `HEB.8` direct cu snapshotul fixat SBLGNT 1.2 și aparatul lui. TR a fost folosit numai ca martor textual. WEBP, BTF, Cornilescu 1924 și Biblia Liberă au fost consultate auxiliar. NTR nu a fost consultată (`consultedInBatch: false`). Nicio traducere românească nu a fost copiată. Rezultatul validatorului automat nu a fost tratat drept verdict semantic.','','## Decizii pe verset','','| Referință BE | Ancoră SBLGNT verificată | Decizie editorială |','| --- | --- | --- |']
 for v in range(1,14): lines.append(f'| HEB.8.{v} | `{A[v]}` | {T[v]} |')
 lines += ['','## Concluzie de lot','','Toate cele 13 versete au fost confruntate individual cu textul grec fixat, aparatul și martorii declarați. Variantele materiale din 8:2, 8:4, 8:6, 8:8, 8:11 și 8:12 au fost verificate explicit. Capitolul rămâne `in_review` și `public: false`; acest lot nu autorizează publicarea.','']
 JR.write_text(unicodedata.normalize('NFC','\n'.join(lines)))
if __name__=='__main__': main()
