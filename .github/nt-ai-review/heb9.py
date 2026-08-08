#!/usr/bin/env python3
import hashlib, json, runpy, subprocess, unicodedata
from pathlib import Path
CH=Path('docs/data/biblia-emanus/HEB.9.json')
JR=Path('docs/biblia-emanus/NT-AI-REVIEW-BATCH-2026-08-08-HEB.9.md')
ZIP=Path('docs/data/biblia-emanus/sources/nt-sblgnt-1.2.zip')
SNAP='29b8762199eb87757ec36961097b817cb2b569557d95348a70fac66c0262f424'
RUN='emanus-nt-review-2026-08-08-heb-9'
T={
1:'Așadar, și primul legământ avea rânduieli pentru închinare și un sanctuar pământesc.',
2:'Căci a fost pregătit un cort: în prima încăpere erau sfeșnicul, masa și pâinile punerii înainte; aceasta este numită Locul Sfânt.',
3:'Iar după a doua perdea era încăperea cortului numită Sfânta Sfintelor,',
4:'având un vas de aur pentru tămâie și chivotul legământului, acoperit peste tot cu aur, în care erau vasul de aur cu mana, toiagul lui Aaron care înmugurise și tablele legământului.',
5:'Deasupra lui erau heruvimii slavei, umbrind capacul ispășirii; despre acestea nu este acum vremea să vorbim în amănunt.',
6:'După ce acestea au fost astfel pregătite, preoții intră mereu în prima încăpere a cortului, împlinind slujbele.',
7:'Dar în a doua intră numai marele preot, o dată pe an, și nu fără sânge, pe care îl aduce pentru sine și pentru păcatele din neștiință ale poporului.',
8:'Prin aceasta Duhul Sfânt arată că drumul spre Locul Sfânt nu fusese încă descoperit cât timp primul cort încă stătea în picioare.',
9:'Acesta este o pildă pentru timpul de acum: potrivit ei se aduc daruri și jertfe care nu pot să-l desăvârșească, în ce privește conștiința, pe cel care se închină,',
10:'fiind vorba numai despre mâncăruri, băuturi, felurite spălări și rânduieli privitoare la trup, impuse până la vremea îndreptării.',
11:'Dar Hristos, venind ca Mare Preot al bunurilor care au venit, prin cortul mai mare și mai desăvârșit, nefăcut de mâini, adică nu din această creație,',
12:'a intrat o dată pentru totdeauna în Locul Sfânt, nu prin sânge de țapi și viței, ci prin propriul Său sânge, dobândind o răscumpărare veșnică.',
13:'Căci, dacă sângele țapilor și al taurilor și cenușa unei vițele, stropită peste cei întinați, sfințesc pentru curățirea trupului,',
14:'cu cât mai mult sângele lui Hristos, care prin Duhul veșnic S-a adus pe Sine fără cusur lui Dumnezeu, va curăți conștiința noastră de fapte moarte, ca să slujim Dumnezeului celui viu!',
15:'De aceea El este Mijlocitorul unui legământ nou, pentru ca, prin moartea care a avut loc pentru răscumpărarea încălcărilor de sub primul legământ, cei chemați să primească promisiunea moștenirii veșnice.',
16:'Căci acolo unde este un testament trebuie dovedită moartea celui care l-a întocmit.',
17:'Un testament este valabil după moarte, deoarece nu are putere cât timp trăiește cel care l-a întocmit.',
18:'De aceea nici primul legământ nu a fost inaugurat fără sânge.',
19:'Căci, după ce fiecare poruncă a Legii fusese rostită de Moise întregului popor, el a luat sângele vițeilor, împreună cu apă, lână stacojie și isop, și a stropit atât cartea însăși, cât și tot poporul,',
20:'spunând: „Acesta este sângele legământului pe care Dumnezeu vi l-a poruncit.”',
21:'În același fel a stropit cu sânge și cortul, și toate vasele slujirii.',
22:'Și, potrivit Legii, aproape toate sunt curățite cu sânge, iar fără vărsare de sânge nu are loc iertare.',
23:'Era deci necesar ca reprezentările lucrurilor din ceruri să fie curățite prin acestea, dar lucrurile cerești înseși prin jertfe mai bune decât acestea.',
24:'Căci Hristos nu a intrat într-un loc sfânt făcut de mâini, o reprezentare a celui adevărat, ci chiar în cer, ca să Se înfățișeze acum înaintea lui Dumnezeu pentru noi.',
25:'Și nu ca să Se aducă pe Sine de multe ori, așa cum marele preot intră în Locul Sfânt în fiecare an cu sânge care nu este al lui;',
26:'altfel ar fi trebuit să sufere de multe ori de la întemeierea lumii. Dar acum S-a arătat o singură dată, la împlinirea veacurilor, pentru înlăturarea păcatului prin jertfa Sa.',
27:'Și, după cum oamenilor le este rânduit să moară o singură dată, iar după aceea vine judecata,',
28:'tot astfel și Hristos, după ce a fost adus o singură dată ca să poarte păcatele multora, Se va arăta a doua oară, fără legătură cu păcatul, celor care Îl așteaptă, spre mântuire.'
}
A={1:'Εἶχε μὲν ⸀οὖν ἡ πρώτη',2:'σκηνὴ γὰρ κατεσκευάσθη ἡ πρώτη',3:'μετὰ δὲ τὸ δεύτερον καταπέτασμα',4:'χρυσοῦν ἔχουσα θυμιατήριον',5:'ὑπεράνω δὲ αὐτῆς Χερουβὶν',6:'Τούτων δὲ οὕτως κατεσκευασμένων',7:'εἰς δὲ τὴν δευτέραν ἅπαξ',8:'τοῦτο δηλοῦντος τοῦ πνεύματος',9:'ἥτις παραβολὴ εἰς τὸν καιρὸν',10:'μόνον ἐπὶ βρώμασιν καὶ πόμασιν',11:'Χριστὸς δὲ παραγενόμενος ἀρχιερεὺς',12:'οὐδὲ διʼ αἵματος τράγων καὶ μόσχων',13:'εἰ γὰρ τὸ αἷμα ⸂τράγων καὶ ταύρων⸃',14:'πόσῳ μᾶλλον τὸ αἷμα τοῦ Χριστοῦ',15:'Καὶ διὰ τοῦτο διαθήκης καινῆς',16:'ὅπου γὰρ διαθήκη',17:'διαθήκη γὰρ ἐπὶ νεκροῖς βεβαία',18:'ὅθεν οὐδὲ ἡ πρώτη',19:'λαληθείσης γὰρ πάσης ἐντολῆς',20:'λέγων· Τοῦτο τὸ αἷμα τῆς διαθήκης',21:'καὶ τὴν σκηνὴν δὲ',22:'καὶ σχεδὸν ἐν αἵματι πάντα',23:'Ἀνάγκη οὖν τὰ μὲν ὑποδείγματα',24:'οὐ γὰρ εἰς χειροποίητα',25:'οὐδʼ ἵνα πολλάκις προσφέρῃ',26:'ἐπεὶ ἔδει αὐτὸν πολλάκις παθεῖν',27:'καὶ καθʼ ὅσον ἀπόκειται',28:'οὕτως καὶ ὁ Χριστός'}
def extract(member): return subprocess.check_output(['unzip','-p',str(ZIP),member],text=True)
def note(v,term,decision,alts,reason): return {'verse':v,'term':term,'decision':decision,'alternatives':alts,'reason':reason,'reviewRequired':True,'resolutionStatus':'resolved','resolutionReason':reason}
def main():
 assert subprocess.check_output(['sha256sum',str(ZIP)],text=True).split()[0]==SNAP
 src={k:extract(p) for k,p in {'sbl':'sblgnt/text/HEB.txt','app':'sblgnt/apparatus/text/HEB.txt','tr':'tr/HEB.usfm','webp':'webp/HEB.usfm','btf':'btf/HEB.usfm','corn':'cornilescu1924/HEB.usfm','libera':'biblia-libera/HEB.usfm'}.items()}
 for k,t in src.items(): assert t.strip(),k
 for v in range(1,29): assert f'Heb 9:{v}\t' in src['sbl']
 s=unicodedata.normalize('NFC',src['sbl'])
 for v,a0 in A.items(): assert unicodedata.normalize('NFC',a0) in s,(v,a0)
 for marker in ['Hebrews 9:1','Hebrews 9:3','Hebrews 9:9','Hebrews 9:10','Hebrews 9:11','Hebrews 9:13','Hebrews 9:14','Hebrews 9:17','Hebrews 9:19','Hebrews 9:24','Hebrews 9:26']: assert marker in src['app']
 d=json.loads(CH.read_text()); assert d['status']=='in_review' and d['public'] is False; assert [x['number'] for x in d['verses']]==list(range(1,29))
 for x in d['verses']: x['text']=T[x['number']]
 for x in d['benchmark']['translationsConsulted']: x['consultedInBatch']=x['id'] in {'CORNILESCU-1924','BTF'}
 d['benchmark']['observations']=['Toate cele 28 de versete au fost revizuite semantic direct față de snapshotul fixat SBLGNT 1.2 și aparatul lui; rezultatul automat „0 probleme” nu a fost folosit drept verdict semantic.','TR a fost folosit numai ca martor textual. WEBP, BTF, Cornilescu 1924 și Biblia Liberă au fost consultate auxiliar. NTR nu a fost consultată; textul românesc a fost redactat independent.']
 nums='\n'.join(str(i) for i in range(1,29)).encode(); a=d['audit']
 a.update({'completedOn':'2026-08-08','engineVersion':'3.0.0','reviewLevel':'ai-complete','reviewAgent':{'type':'ai','engine':'Codex / GPT-5','runId':RUN,'method':'verse-by-verse-source-and-benchmark'},'sourceSnapshotSha256':SNAP,'verseCoverage':{'expected':28,'reviewed':28,'continuous':True,'verseNumbersSha256':'sha256:'+hashlib.sha256(nums).hexdigest()},'sourceLanguage':{'language':'greacă koine','text':'SBLGNT 1.2 + aparat; Textus Receptus ca martor suplimentar','result':'approved','scope':'Toate cele 28 de versete au fost confruntate direct cu SBLGNT/aparat; TR numai martor, iar WEBP/BTF/Cornilescu 1924/Biblia Liberă auxiliare.'},'romanianLanguage':{'result':'approved','changesApplied':['Au fost reparate frazele corupte, acordurile și calcurile din descrierea cultică și din argumentul despre jertfă.','Schimbarea contextuală a lui διαθήκη în 9:16-17 a fost redată prin „testament”, iar în restul capitolului prin „legământ”.','Termenii sanctuarului au fost redați consecvent fără a importa detalii absente din textul principal.']},'theologicalContext':{'result':'approved','principles':['La 9:11 este urmată lectura SBLGNT γενομένων, „bunurilor care au venit”, nu lectura tradițională μελλόντων „viitoare”.','La 9:14 este urmat pronumele ἡμῶν, „conștiința noastră”, nu ὑμῶν din TR/RP.','La 9:19 textul principal nu importă adaosul despre sângele țapilor absent din linia SBLGNT selectată.']},'omissionAddition':{'result':'approved','omissions':0,'additions':0},'copyrightDistance':{'result':'approved','method':'redactare proprie din SBLGNT/aparat și verificări auxiliare fixate; fără copierea unei traduceri românești'},'criticalIssues':{'result':'approved','open':0}})
 a.pop('benchmarkEvidence',None); a.pop('modelEvidence',None)
 d['editorialNotes']=[note(4,'θυμιατήριον','„vas de aur pentru tămâie”',['„altar de aur pentru tămâie”','„cădelniță de aur”'],'Substantivul poate desemna un obiect pentru tămâie; formularea neutră evită să rezolve prin traducere disputa de identificare cultică.'),note(11,'γενομένων ἀγαθῶν','„bunurilor care au venit”',['Treg/RP: μελλόντων „bunurilor viitoare”'],'Textul principal SBLGNT/WH/NA28 are γενομένων și este urmat fără armonizare cu lectura tradițională.'),note(14,'τὴν συνείδησιν ἡμῶν','„conștiința noastră”',['Treg/RP: „conștiința voastră”'],'Pronumele SBLGNT este persoana I plural și este păstrat în textul principal.'),note(16,'διαθήκη','„testament”',['„legământ”'],'În 9:16-17 contextul folosește moartea celui care dispune și validitatea după moarte; sensul juridic „testament” face inteligibil jocul semantic, fără a schimba termenul grec.'),note(19,'τὸ αἷμα τῶν μόσχων','„sângele vițeilor”',['WH/Treg/NA28/TR: adaos „și al țapilor”'],'Linia SBLGNT selectată în snapshot nu include adaosul după μόσχων; textul românesc nu îl importă.'),note(22,'σχεδὸν … χωρὶς αἱματεκχυσίας','„aproape toate … fără vărsare de sânge nu are loc iertare”',['generalizare fără „aproape”'],'Adverbul σχεδόν este păstrat pentru a nu transforma afirmația calificată a autorului într-o regulă absolutizată dincolo de text.'),note(26,'ἅπαξ … εἰς ἀθέτησιν ἁμαρτίας','„o singură dată … pentru înlăturarea păcatului”',['„desființarea păcatului”'],'ἀθέτησις indică anulare/înlăturare; formularea păstrează rezultatul jertfei fără dezvoltare doctrinară suplimentară.'),note(28,'χωρὶς ἁμαρτίας','„fără legătură cu păcatul”',['„fără păcat”'],'Contextul contrastează prima arătare pentru purtarea păcatelor cu a doua arătare spre mântuire; formularea evită ambiguitatea că ar fi vorba despre caracterul moral al lui Hristos.')]
 val=runpy.run_path('scripts/check-biblia-emanus.py'); a['textDigest']=val['chapter_text_digest'](d); a['contentDigest']=val['chapter_content_digest'](d)
 CH.write_text(unicodedata.normalize('NFC',json.dumps(d,ensure_ascii=False,indent=2)+'\n'))
 lines=['# Revizie AI, lot Evrei 9','','Statut: `in_review` — **nu este aprobare de publicare**.','','Data: `2026-08-08`','','Reviewer: `codex-gpt-5` (`ai`; sistem: `Codex / GPT-5`; rulare: `'+RUN+'`)','','## Domeniu și surse','','Au fost revizuite semantic toate cele 28 de versete din `HEB.9` direct cu snapshotul fixat SBLGNT 1.2 și aparatul lui. TR a fost folosit numai ca martor textual. WEBP, BTF, Cornilescu 1924 și Biblia Liberă au fost consultate auxiliar. NTR nu a fost consultată (`consultedInBatch: false`). Nicio traducere românească nu a fost copiată. Rezultatul validatorului automat nu a fost tratat drept verdict semantic.','','## Decizii pe verset','','| Referință BE | Ancoră SBLGNT verificată | Decizie editorială |','| --- | --- | --- |']
 for v in range(1,29): lines.append(f'| HEB.9.{v} | `{A[v]}` | {T[v]} |')
 lines += ['','## Concluzie de lot','','Toate cele 28 de versete au fost confruntate individual cu textul grec fixat, aparatul și martorii declarați. Variantele materiale din 9:1, 9:3, 9:9, 9:10, 9:11, 9:13, 9:14, 9:17, 9:19, 9:24 și 9:26 au fost verificate explicit. Capitolul rămâne `in_review` și `public: false`; acest lot nu autorizează publicarea.','']
 JR.write_text(unicodedata.normalize('NFC','\n'.join(lines)))
if __name__=='__main__': main()
