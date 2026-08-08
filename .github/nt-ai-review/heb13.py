#!/usr/bin/env python3
import hashlib, json, runpy, subprocess, unicodedata
from pathlib import Path
CH=Path('docs/data/biblia-emanus/HEB.13.json')
JR=Path('docs/biblia-emanus/NT-AI-REVIEW-BATCH-2026-08-08-HEB.13.md')
ZIP=Path('docs/data/biblia-emanus/sources/nt-sblgnt-1.2.zip')
SNAP='29b8762199eb87757ec36961097b817cb2b569557d95348a70fac66c0262f424'
RUN='emanus-nt-review-2026-08-08-heb-13'
T={
1:'Dragostea frățească să rămână.',
2:'Nu uitați ospitalitatea, căci prin ea unii, fără să știe, au găzduit îngeri.',
3:'Aduceți-vă aminte de cei întemnițați ca și cum ați fi întemnițați împreună cu ei, și de cei chinuiți, ca unii care sunteți și voi în trup.',
4:'Căsătoria să fie cinstită în toate și patul conjugal neîntinat, căci Dumnezeu îi va judeca pe cei desfrânați și pe adulteri.',
5:'Felul vostru de viață să fie fără iubire de bani; mulțumiți-vă cu ce aveți, fiindcă El Însuși a spus: „Nicidecum nu te voi lăsa și nicidecum nu te voi părăsi.”',
6:'Astfel putem spune cu îndrăzneală: „Domnul este ajutorul meu; nu mă voi teme. Ce-mi va face omul?”',
7:'Aduceți-vă aminte de conducătorii voștri, care v-au vorbit cuvântul lui Dumnezeu; privind la sfârșitul felului lor de viață, urmați-le credința.',
8:'Isus Hristos este același ieri și astăzi și în veci.',
9:'Nu vă lăsați purtați de învățături felurite și străine; căci este bine ca inima să fie întărită prin har, nu prin mâncăruri, din care n-au avut folos cei care umblă în ele.',
10:'Avem un altar din care n-au dreptul să mănânce cei care slujesc cortului.',
11:'Căci trupurile animalelor al căror sânge este adus de marele preot în Locul Sfânt pentru păcat sunt arse în afara taberei.',
12:'De aceea și Isus, ca să sfințească poporul prin propriul Său sânge, a suferit în afara porții.',
13:'Să ieșim, deci, la El, în afara taberei, purtând ocara Lui.',
14:'Căci aici nu avem o cetate care rămâne, ci o căutăm pe cea viitoare.',
15:'Prin El, deci, să-I aducem neîncetat lui Dumnezeu o jertfă de laudă, adică rodul buzelor care mărturisesc Numele Lui.',
16:'Nu uitați binefacerea și părtășia, căci astfel de jertfe Îi sunt plăcute lui Dumnezeu.',
17:'Ascultați de conducătorii voștri și supuneți-vă lor, căci ei veghează asupra sufletelor voastre ca unii care vor da socoteală, pentru ca să facă aceasta cu bucurie și nu suspinând, căci aceasta nu v-ar fi de folos.',
18:'Rugați-vă pentru noi, căci suntem convinși că avem o conștiință bună, dorind să ne purtăm bine în toate.',
19:'Vă îndemn cu atât mai mult să faceți aceasta, ca să vă fiu redat mai curând.',
20:'Iar Dumnezeul păcii, care L-a adus dintre morți pe marele Păstor al oilor, pe Domnul nostru Isus, prin sângele legământului veșnic,',
21:'să vă înzestreze cu tot ce este bun ca să faceți voia Lui, lucrând în noi ceea ce este plăcut înaintea Lui, prin Isus Hristos, căruia să-I fie slava în veci. Amin.',
22:'Vă îndemn, fraților, să primiți cu răbdare cuvântul de îndemn, căci v-am scris pe scurt.',
23:'Să știți că fratele nostru Timotei a fost eliberat; dacă vine curând, vă voi vedea împreună cu el.',
24:'Salutați-i pe toți conducătorii voștri și pe toți sfinții. Vă salută cei din Italia.',
25:'Harul să fie cu voi toți.'
}
A={1:'Ἡ φιλαδελφία μενέτω',2:'τῆς φιλοξενίας μὴ',3:'μιμνῄσκεσθε τῶν δεσμίων',4:'τίμιος ὁ γάμος',5:'ἀφιλάργυρος ὁ τρόπος',6:'ὥστε θαρροῦντας ἡμᾶς',7:'Μνημονεύετε τῶν ἡγουμένων',8:'Ἰησοῦς Χριστὸς ἐχθὲς',9:'διδαχαῖς ποικίλαις καὶ ξέναις',10:'ἔχομεν θυσιαστήριον',11:'ὧν γὰρ εἰσφέρεται',12:'διὸ καὶ Ἰησοῦς',13:'τοίνυν ἐξερχώμεθα',14:'οὐ γὰρ ἔχομεν ὧδε',15:'ἀναφέρωμεν θυσίαν αἰνέσεως',16:'τῆς δὲ εὐποιΐας',17:'Πείθεσθε τοῖς ἡγουμένοις',18:'Προσεύχεσθε περὶ ἡμῶν',19:'περισσοτέρως δὲ παρακαλῶ',20:'Ὁ δὲ θεὸς τῆς εἰρήνης',21:'καταρτίσαι ὑμᾶς',22:'Παρακαλῶ δὲ ὑμᾶς',23:'Τιμόθεον ἀπολελυμένον',24:'ἀσπάσασθε πάντας τοὺς ἡγουμένους',25:'ἡ χάρις μετὰ πάντων'}
def extract(member): return subprocess.check_output(['unzip','-p',str(ZIP),member],text=True)
def note(v,term,decision,alts,reason): return {'verse':v,'term':term,'decision':decision,'alternatives':alts,'reason':reason,'reviewRequired':True,'resolutionStatus':'resolved','resolutionReason':reason}
def main():
 assert subprocess.check_output(['sha256sum',str(ZIP)],text=True).split()[0]==SNAP
 src={k:extract(p) for k,p in {'sbl':'sblgnt/text/HEB.txt','app':'sblgnt/apparatus/text/HEB.txt','tr':'tr/HEB.usfm','webp':'webp/HEB.usfm','btf':'btf/HEB.usfm','corn':'cornilescu1924/HEB.usfm','libera':'biblia-libera/HEB.usfm'}.items()}
 for k,t in src.items(): assert t.strip(),k
 for v in range(1,26): assert f'Heb 13:{v}\t' in src['sbl']
 s=unicodedata.normalize('NFC',src['sbl'])
 for v,a0 in A.items(): assert unicodedata.normalize('NFC',a0) in s,(v,a0)
 for marker in ['Hebrews 13:4','Hebrews 13:5','Hebrews 13:6','Hebrews 13:9','Hebrews 13:15','Hebrews 13:18','Hebrews 13:21','Hebrews 13:23','Hebrews 13:25']: assert marker in src['app'],marker
 d=json.loads(CH.read_text()); assert d['status']=='in_review' and d['public'] is False; assert [x['number'] for x in d['verses']]==list(range(1,26))
 for x in d['verses']: x['text']=T[x['number']]
 for x in d['benchmark']['translationsConsulted']: x['consultedInBatch']=x['id'] in {'CORNILESCU-1924','BTF'}
 d['benchmark']['observations']=['Toate cele 25 de versete au fost revizuite semantic direct față de snapshotul fixat SBLGNT 1.2 și aparatul lui; rezultatul automat „0 probleme” nu a fost folosit drept verdict semantic.','TR a fost folosit numai ca martor textual. WEBP, BTF, Cornilescu 1924 și Biblia Liberă au fost consultate auxiliar. NTR nu a fost consultată; textul românesc a fost redactat independent.']
 nums='\n'.join(str(i) for i in range(1,26)).encode(); a=d['audit']
 a.update({'completedOn':'2026-08-08','engineVersion':'3.0.0','reviewLevel':'ai-complete','reviewAgent':{'type':'ai','engine':'Codex / GPT-5','runId':RUN,'method':'verse-by-verse-source-and-benchmark'},'sourceSnapshotSha256':SNAP,'verseCoverage':{'expected':25,'reviewed':25,'continuous':True,'verseNumbersSha256':'sha256:'+hashlib.sha256(nums).hexdigest()},'sourceLanguage':{'language':'greacă koine','text':'SBLGNT 1.2 + aparat; Textus Receptus ca martor suplimentar','result':'approved','scope':'Toate cele 25 de versete au fost confruntate direct cu SBLGNT/aparat; TR numai martor, iar WEBP/BTF/Cornilescu 1924/Biblia Liberă auxiliare.'},'romanianLanguage':{'result':'approved','changesApplied':['Au fost refăcute pasajele corupte și calcurile din textul anterior în română naturală.','Persoanele, numărul, imperativele, citatele și referenții au fost verificate verset cu verset.','Formulările din 13:3-6, 13:9, 13:15-21 și 13:23-25 au fost rezolvate direct din greacă și aparat.']},'theologicalContext':{'result':'approved','principles':['Textul principal urmează SBLGNT și nu importă automat lecturile TR/RP.','La 13:21 nu este introdus substantivul „lucrare”, absent din textul principal SBLGNT, iar ἡμῖν este redat „în noi”.','La 13:25 nu este adăugat „Amin”, prezent în tradiția Treg/RP, dar absent din SBLGNT.']},'omissionAddition':{'result':'approved','omissions':0,'additions':0},'copyrightDistance':{'result':'approved','method':'redactare proprie din SBLGNT/aparat și verificări auxiliare fixate; fără copierea unei traduceri românești'},'criticalIssues':{'result':'approved','open':0}})
 a.pop('benchmarkEvidence',None); a.pop('modelEvidence',None)
 d['editorialNotes']=[
  note(4,'γὰρ','„căci Dumnezeu îi va judeca...”',['RP: δὲ, „dar”'],'SBLGNT păstrează particula explicativă γάρ; relația logică este redată prin „căci”.'),
  note(6,'οὐ φοβηθήσομαι','„nu mă voi teme”',['Treg/RP: καὶ οὐ φοβηθήσομαι'],'SBLGNT nu are καί înaintea negației; nu se adaugă o coordonare absentă.'),
  note(9,'οἱ περιπατοῦντες','„cei care umblă în ele”',['RP: οἱ περιπατήσαντες, aorist'],'SBLGNT are participiu prezent, nu aorist; traducerea evită schimbarea aspectului în trecut încheiat.'),
  note(15,'οὖν','„Prin El, deci...”',['WH: omite οὖν'],'SBLGNT include particula; legătura inferențială este redată prin „deci”.'),
  note(18,'πειθόμεθα','„suntem convinși”',['RP: πεποίθαμεν'],'SBLGNT are forma de prezent; traducerea nu importă perfectul RP.'),
  note(21,'ἐν παντὶ ἀγαθῷ','„cu tot ce este bun”',['Treg/RP adaugă ἔργῳ, „lucrare”'],'SBLGNT nu are ἔργῳ; nu se introduce „orice lucrare bună” în textul principal.'),
  note(21,'ποιῶν ἐν ἡμῖν','„lucrând în noi”',['Treg/RP: ἐν ὑμῖν, „în voi”'],'SBLGNT are pronumele de persoana I plural; referentul este păstrat.'),
  note(21,'εἰς τοὺς αἰῶνας','„în veci”',['WH/Treg/RP: + τῶν αἰώνων'],'SBLGNT nu are extensia „veacurilor”; formula românească nu o adaugă.'),
  note(23,'τὸν ἀδελφὸν ἡμῶν Τιμόθεον','„fratele nostru Timotei”',['RP: omite ἡμῶν'],'SBLGNT păstrează posesivul „nostru”.'),
  note(25,'ἡ χάρις μετὰ πάντων ὑμῶν','„Harul să fie cu voi toți.”',['Treg/RP: + ἀμήν'],'SBLGNT nu are adaosul final „Amin”; acesta nu este importat.')]
 val=runpy.run_path('scripts/check-biblia-emanus.py'); a['textDigest']=val['chapter_text_digest'](d); a['contentDigest']=val['chapter_content_digest'](d)
 CH.write_text(unicodedata.normalize('NFC',json.dumps(d,ensure_ascii=False,indent=2)+'\n'))
 d2=json.loads(CH.read_text()); assert d2['audit']['textDigest']==val['chapter_text_digest'](d2); assert d2['audit']['contentDigest']==val['chapter_content_digest'](d2)
 lines=['# Revizie AI, lot Evrei 13','', 'Statut: `in_review` — **nu este aprobare de publicare**.','', 'Data: `2026-08-08`','', 'Reviewer: `codex-gpt-5` (`ai`; sistem: `Codex / GPT-5`; rulare: `'+RUN+'`)','', '## Domeniu și surse','', 'Au fost revizuite semantic toate cele 25 de versete din `HEB.13` direct cu snapshotul fixat SBLGNT 1.2 și aparatul lui. TR a fost folosit numai ca martor textual. WEBP, BTF, Cornilescu 1924 și Biblia Liberă au fost consultate auxiliar. NTR nu a fost consultată (`consultedInBatch: false`). Nicio traducere românească nu a fost copiată. Rezultatul validatorului automat nu a fost tratat drept verdict semantic.','', '## Decizii pe verset','', '| Referință BE | Ancoră SBLGNT verificată | Decizie editorială |','| --- | --- | --- |']
 for v in range(1,26): lines.append(f'| HEB.13.{v} | `{A[v]}` | {T[v]} |')
 lines += ['', '## Concluzie de lot','', 'Toate cele 25 de versete au fost confruntate individual cu textul grec fixat și cu aparatul. Variantele materiale din 13:4-6, 13:9, 13:15, 13:18, 13:21, 13:23 și 13:25 au fost verificate explicit. Capitolul rămâne `in_review` și `public: false`; acest lot nu autorizează publicarea.','']
 JR.write_text(unicodedata.normalize('NFC','\n'.join(lines)))
if __name__=='__main__': main()
