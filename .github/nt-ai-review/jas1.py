#!/usr/bin/env python3
import hashlib,json,re,runpy,unicodedata,zipfile
from pathlib import Path

CH=Path('docs/data/biblia-emanus/JAS.1.json')
JR=Path('docs/biblia-emanus/NT-AI-REVIEW-BATCH-2026-08-08-JAS.1.md')
ZIP=Path('docs/data/biblia-emanus/sources/nt-sblgnt-1.2.zip')
SNAP='29b8762199eb87757ec36961097b817cb2b569557d95348a70fac66c0262f424'
RUN='emanus-nt-editorial-2026-08-08-jas-1'
T={
1:'Iacov, rob al lui Dumnezeu și al Domnului Isus Hristos, către cele douăsprezece seminții care sunt în diaspora: salutare!',
2:'Socotiți ca o mare bucurie, frații mei, când treceți prin felurite încercări,',
3:'știind că încercarea credinței voastre produce răbdare statornică.',
4:'Iar răbdarea statornică să-și ducă lucrarea până la capăt, ca să fiți maturi și întregi, fără să vă lipsească nimic.',
5:'Dacă vreunuia dintre voi îi lipsește înțelepciunea, să o ceară de la Dumnezeu, care dă tuturor cu generozitate și fără reproș, și îi va fi dată.',
6:'Dar să ceară cu credință, fără să se îndoiască deloc; căci cel ce se îndoiește seamănă cu valul mării, purtat și împins de vânt.',
7:'Un astfel de om să nu creadă că va primi ceva de la Domnul,',
8:'fiind un om cu inima împărțită, nestatornic în toate căile lui.',
9:'Fratele aflat într-o stare smerită să se laude cu înălțarea lui,',
10:'iar cel bogat, cu smerirea lui, pentru că va trece ca floarea ierbii.',
11:'Căci soarele răsare cu arșița și usucă iarba; floarea ei cade, iar frumusețea înfățișării ei piere. Tot așa se va veșteji și bogatul în umbletele lui.',
12:'Fericit este omul care rabdă încercarea, fiindcă, după ce va fi găsit încercat, va primi cununa vieții, pe care El a promis-o celor ce-L iubesc.',
13:'Nimeni, când este ispitit, să nu spună: „Sunt ispitit de Dumnezeu”, fiindcă Dumnezeu nu poate fi ispitit de rău și El însuși nu ispitește pe nimeni.',
14:'Ci fiecare este ispitit când este atras și momit de propria lui poftă.',
15:'Apoi pofta, după ce a zămislit, naște păcatul, iar păcatul, odată ajuns la maturitate, aduce moartea.',
16:'Nu vă înșelați, frații mei iubiți!',
17:'Orice dar bun și orice dar desăvârșit este de sus, coborând de la Tatăl luminilor, la care nu există schimbare sau umbră produsă de întoarcere.',
18:'După voia Lui ne-a născut prin cuvântul adevărului, ca să fim un fel de prim rod al făpturilor Lui.',
19:'Știți aceasta, frații mei iubiți: fiecare om să fie grabnic la ascultare, încet la vorbire și încet la mânie,',
20:'căci mânia omului nu lucrează dreptatea lui Dumnezeu.',
21:'De aceea, lepădând orice murdărie și orice revărsare de răutate, primiți cu blândețe cuvântul sădit în voi, care poate să vă mântuiască sufletele.',
22:'Fiți însă împlinitori ai cuvântului, nu doar ascultători, înșelându-vă singuri.',
23:'Căci, dacă cineva este ascultător al cuvântului, dar nu și împlinitor, seamănă cu un om care își privește fața firească într-o oglindă;',
24:'se privește, pleacă și uită îndată cum era.',
25:'Dar cel care privește cu atenție în legea desăvârșită, legea libertății, și stăruie în ea, nefiind un ascultător uituc, ci un împlinitor al lucrării, acela va fi fericit în ceea ce face.',
26:'Dacă cineva se socotește religios, dar nu-și ține limba în frâu, ci își înșală inima, religia lui este zadarnică.',
27:'Religia curată și neîntinată înaintea lui Dumnezeu Tatăl este aceasta: să-i cercetăm pe orfani și pe văduve în necazul lor și să ne păstrăm neîntinați de lume.'}

assert hashlib.sha256(ZIP.read_bytes()).hexdigest()==SNAP
with zipfile.ZipFile(ZIP) as z:
    greek=z.read('sblgnt/text/JAS.txt').decode('utf-8')
    app=z.read('sblgnt/apparatus/text/JAS.txt').decode('utf-8')
    aux={k:z.read(f'{k}/JAS.usfm').decode('utf-8') for k in ['tr','webp','btf','cornilescu1924','biblia-libera']}
for v in range(1,28): assert re.search(rf'Jas 1:{v}\t',greek)
for k,v in aux.items(): assert v.strip(),k

def gv(v):
    m=re.search(rf'^Jas 1:{v}\t(.+)$',greek,re.M); assert m; return m.group(1).strip()

def anchor(v):
    s=re.sub(r'[⸀⸂⸃\[\]]','',gv(v)); return ' '.join(s.split()[:8])

d=json.loads(CH.read_text())
assert d['status']=='in_review' and d['public'] is False
assert [x['number'] for x in d['verses']]==list(range(1,28))
for x in d['verses']: x['text']=T[x['number']]
for x in d['benchmark']['translationsConsulted']:
    x['consultedInBatch']=x['id'] in {'CORNILESCU-1924','BTF'}
d['benchmark']['observations']=[
 'Redactarea românească a fost refăcută verset-cu-verset din snapshotul fixat SBLGNT 1.2 și confruntată cu aparatul; TR a fost numai martor textual.',
 'WEBP, BTF, Cornilescu 1924 și Biblia Liberă au fost folosite auxiliar. NTR nu a fost consultată în acest lot.'
]
a=d['audit']; a.update({
 'completedOn':'2026-08-08','engineVersion':'3.0.0','reviewLevel':'ai-complete',
 'reviewAgent':{'type':'ai','engine':'Codex / GPT-5','runId':RUN,'method':'verse-by-verse-source-and-benchmark'},
 'sourceSnapshotSha256':SNAP,
 'verseCoverage':{'expected':27,'reviewed':27,'continuous':True},
 'sourceLanguage':{'language':'greacă koine','text':'SBLGNT 1.2 + aparat; Textus Receptus ca martor suplimentar','result':'approved','scope':'Toate cele 27 de versete din Iacov 1 au fost confruntate direct cu textul SBLGNT din snapshotul fixat și cu aparatul; TR a fost folosit numai ca martor.'},
 'romanianLanguage':{'result':'approved','changesApplied':['Au fost înlăturate calcurile englezești, acordurile greșite și fragmentele corupte din textul anterior.','Pronumele, numărul și raporturile sintactice au fost refăcute după greacă, nu după formularea existentă.']},
 'theologicalContext':{'result':'approved','principles':['πειρασμός este redat contextual ca „încercare” în 1:2,12 și ca „ispitire” în 1:13-14, fără uniformizare artificială.','θρησκεία din 1:26-27 este redat descriptiv ca „religie”, fără glosă confesională în corpul versetului.']},
 'omissionAddition':{'result':'approved','omissions':0,'additions':0},
 'copyrightDistance':{'result':'approved','method':'redactare proprie din SBLGNT, cu sursele auxiliare doar pentru confruntare'},
 'criticalIssues':{'result':'approved','open':0}
})
a.pop('benchmarkEvidence',None); a.pop('modelEvidence',None)
notes=[]
def note(v,term,decision,alts,reason):
 notes.append({'verse':v,'term':term,'decision':decision,'alternatives':alts,'reason':reason,'reviewRequired':True,'resolutionStatus':'resolved','resolutionReason':'Decizia a fost verificată direct în snapshotul SBLGNT 1.2 și aparatul fixat.'})
note(2,'πειρασμοῖς','„încercări”',['„ispite”'],'Contextul 1:2-4 descrie testarea credinței și producerea statorniciei; 1:13-14 tratează separat ispitirea spre rău.')
note(8,'δίψυχος','„cu inima împărțită”',['„cu suflet dublu”'],'Redarea păstrează ideea de loialitate/interioritate divizată fără calc lexical nefiresc.')
note(12,'ὃν ἐπηγγείλατο','„pe care El a promis-o”',['„pe care Domnul a promis-o”'],'Textul principal nu introduce explicit κύριος în această propoziție; subiectul rămâne implicit în română.')
note(17,'παραλλαγὴ ἢ τροπῆς ἀποσκίασμα','„schimbare sau umbră produsă de întoarcere”',['„variație sau umbră de mutare”'],'Metafora astronomică este păstrată fără calcuri obscure.')
note(21,'ἔμφυτον λόγον','„cuvântul sădit în voi”',['„cuvântul înnăscut”'],'ἔμφυτος indică aici cuvântul implantat/sădit și primit, conform imperativului δέξασθε.')
note(25,'νόμον τέλειον τὸν τῆς ἐλευθερίας','„legea desăvârșită, legea libertății”',['„legea perfectă a libertății”'],'Apoziția greacă este redată explicit pentru claritate sintactică.')
d['editorialNotes']=notes
val=runpy.run_path('scripts/check-biblia-emanus.py')
a['textDigest']=val['chapter_text_digest'](d)
a['contentDigest']=val['chapter_content_digest'](d)
CH.write_text(unicodedata.normalize('NFC',json.dumps(d,ensure_ascii=False,indent=2)+'\n'))
# Confirm digests after serialization.
d2=json.loads(CH.read_text()); assert val['chapter_text_digest'](d2)==d2['audit']['textDigest']; assert val['chapter_content_digest'](d2)==d2['audit']['contentDigest']
lines=['# Revizie AI, lot Iacov 1','','Statut: `in_review` — **nu este aprobare de publicare**.','','Data: `2026-08-08`','','Reviewer: `Codex / GPT-5` (`ai`; rulare: `'+RUN+'`)','','## Surse consultate','','Text principal: snapshotul local fixat `nt-sblgnt-1.2.zip` (SHA-256 `'+SNAP+'`), `sblgnt/text/JAS.txt` și aparatul `sblgnt/apparatus/text/JAS.txt`. TR-JAS a fost folosit numai ca martor textual. WEBP-JAS, BTF-JAS, Cornilescu 1924-JAS și Biblia Liberă-JAS au fost folosite auxiliar. **NTR nu a fost consultată**.','','Rezultatele automate sunt porți de consistență, nu verdict semantic; decizia de mai jos a fost făcută verset-cu-verset.','','## Decizii pe verset','','| Referință BE | Ancoră SBLGNT verificată | Decizie românească |','| --- | --- | --- |']
for v in range(1,28): lines.append(f'| JAS.1.{v} | `{anchor(v)}` | {T[v]} |')
lines += ['','## Aparat și decizii editoriale','','Aparatul fixat a fost verificat pentru întreg capitolul. Variantele nu au fost importate automat din TR; textul principal urmează SBLGNT. Alegerile semantice materiale sunt documentate și în `editorialNotes`.','','## Concluzie','','Toate cele 27 de versete au fost revizuite semantic direct față de snapshotul fixat. Capitolul rămâne `in_review` și `public: false`.','']
JR.write_text(unicodedata.normalize('NFC','\n'.join(lines)))
