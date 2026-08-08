#!/usr/bin/env python3
import hashlib, json, runpy, subprocess, unicodedata
from pathlib import Path
CH=Path('docs/data/biblia-emanus/HEB.6.json')
JR=Path('docs/biblia-emanus/NT-AI-REVIEW-BATCH-2026-08-08-HEB.6.md')
ZIP=Path('docs/data/biblia-emanus/sources/nt-sblgnt-1.2.zip')
SNAP='29b8762199eb87757ec36961097b817cb2b569557d95348a70fac66c0262f424'
RUN='emanus-nt-review-2026-08-08-heb-6'
T={
1:'De aceea, lăsând învățătura de început despre Hristos, să înaintăm spre maturitate, fără să punem din nou temelia pocăinței de faptele moarte și a credinței în Dumnezeu,',
2:'a învățăturii despre spălări, a punerii mâinilor, a învierii morților și a judecății veșnice.',
3:'Și vom face aceasta, dacă Dumnezeu îngăduie.',
4:'Căci este imposibil ca aceia care au fost luminați o dată, au gustat darul ceresc și au devenit părtași ai Duhului Sfânt,',
5:'au gustat cuvântul bun al lui Dumnezeu și puterile veacului viitor,',
6:'iar apoi au căzut, să fie înnoiți din nou spre pocăință, deoarece Îl răstignesc din nou, pentru ei înșiși, pe Fiul lui Dumnezeu și Îl expun rușinii publice.',
7:'Căci pământul care bea ploaia ce cade adesea peste el și produce plante folositoare celor pentru care este și cultivat primește binecuvântare de la Dumnezeu;',
8:'dar dacă produce spini și mărăcini, este fără valoare și aproape de blestem, iar sfârșitul lui este arderea.',
9:'Dar, iubiților, cu privire la voi suntem convinși de lucruri mai bune, lucruri care țin de mântuire, chiar dacă vorbim astfel.',
10:'Căci Dumnezeu nu este nedrept ca să uite lucrarea voastră și dragostea pe care ați arătat-o față de Numele Lui, slujindu-i pe sfinți și continuând să-i slujiți.',
11:'Dorim însă ca fiecare dintre voi să arate aceeași sârguință pentru deplina încredințare a speranței până la sfârșit,',
12:'ca să nu deveniți nepăsători, ci imitatori ai celor care, prin credință și îndelungă răbdare, moștenesc promisiunile.',
13:'Căci, când Dumnezeu i-a făcut promisiunea lui Avraam, pentru că nu avea pe nimeni mai mare pe care să jure, a jurat pe Sine Însuși,',
14:'spunând: „Cu adevărat, te voi binecuvânta și te voi înmulți.”',
15:'Și astfel, după ce a așteptat cu îndelungă răbdare, Avraam a dobândit promisiunea.',
16:'Oamenii jură pe cineva mai mare decât ei, iar jurământul de confirmare pune capăt oricărei dispute dintre ei.',
17:'De aceea Dumnezeu, dorind să le arate și mai limpede moștenitorilor promisiunii caracterul neschimbător al hotărârii Sale, a garantat-o printr-un jurământ,',
18:'pentru ca, prin două lucruri neschimbătoare, în care este imposibil ca Dumnezeu să mintă, noi, cei care am fugit la adăpost, să avem o puternică încurajare să ținem cu tărie speranța pusă înaintea noastră.',
19:'Pe aceasta o avem ca ancoră a sufletului, sigură și trainică, o speranță care intră dincolo de perdea, în partea dinăuntru,',
20:'unde Isus a intrat pentru noi ca înainte-mergător, devenind Mare Preot pentru totdeauna, după rânduiala lui Melhisedec.'
}
A={1:'Διὸ ἀφέντες τὸν τῆς ἀρχῆς τοῦ Χριστοῦ λόγον',2:'βαπτισμῶν ⸀διδαχὴν',3:'καὶ τοῦτο ⸀ποιήσομεν',4:'Ἀδύνατον γὰρ τοὺς ἅπαξ φωτισθέντας',5:'καὶ καλὸν γευσαμένους θεοῦ ῥῆμα',6:'καὶ παραπεσόντας, πάλιν ἀνακαινίζειν',7:'γῆ γὰρ ἡ πιοῦσα',8:'ἐκφέρουσα δὲ ἀκάνθας καὶ τριβόλους',9:'Πεπείσμεθα δὲ περὶ ὑμῶν',10:'οὐ γὰρ ἄδικος ὁ θεὸς',11:'ἐπιθυμοῦμεν δὲ ἕκαστον ὑμῶν',12:'ἵνα μὴ νωθροὶ γένησθε',13:'Τῷ γὰρ Ἀβραὰμ ἐπαγγειλάμενος ὁ θεός',14:'⸀Εἰ μὴν εὐλογῶν εὐλογήσω σε',15:'καὶ οὕτως μακροθυμήσας',16:'⸀ἄνθρωποι γὰρ κατὰ τοῦ μείζονος ὀμνύουσιν',17:'ἐν ᾧ περισσότερον βουλόμενος ὁ θεὸς',18:'ἵνα διὰ δύο πραγμάτων ἀμεταθέτων',19:'ἣν ὡς ἄγκυραν ἔχομεν τῆς ψυχῆς',20:'ὅπου πρόδρομος ὑπὲρ ἡμῶν εἰσῆλθεν Ἰησοῦς'}
def extract(member): return subprocess.check_output(['unzip','-p',str(ZIP),member],text=True)
def note(v,term,decision,alts,reason): return {'verse':v,'term':term,'decision':decision,'alternatives':alts,'reason':reason,'reviewRequired':True,'resolutionStatus':'resolved','resolutionReason':reason}
def main():
 assert subprocess.check_output(['sha256sum',str(ZIP)],text=True).split()[0]==SNAP
 src={k:extract(p) for k,p in {'sbl':'sblgnt/text/HEB.txt','app':'sblgnt/apparatus/text/HEB.txt','tr':'tr/HEB.usfm','webp':'webp/HEB.usfm','btf':'btf/HEB.usfm','corn':'cornilescu1924/HEB.usfm','libera':'biblia-libera/HEB.usfm'}.items()}
 for k,t in src.items(): assert t.strip(),k
 for v in range(1,21): assert f'Heb 6:{v}\t' in src['sbl']
 s=unicodedata.normalize('NFC',src['sbl'])
 for v,a0 in A.items(): assert unicodedata.normalize('NFC',a0) in s,(v,a0)
 for marker in ['Hebrews 6:2','Hebrews 6:3','Hebrews 6:7','Hebrews 6:10','Hebrews 6:14','Hebrews 6:16','Hebrews 6:18','Hebrews 6:19']: assert marker in src['app']
 d=json.loads(CH.read_text()); assert d['status']=='in_review' and d['public'] is False; assert [x['number'] for x in d['verses']]==list(range(1,21))
 for x in d['verses']: x['text']=T[x['number']]
 for x in d['benchmark']['translationsConsulted']: x['consultedInBatch']=x['id'] in {'CORNILESCU-1924','BTF'}
 d['benchmark']['observations']=['Toate cele 20 de versete au fost revizuite semantic direct față de snapshotul fixat SBLGNT 1.2 și aparatul lui; rezultatul automat „0 probleme” nu a fost folosit drept verdict semantic.','TR a fost folosit numai ca martor textual. WEBP, BTF, Cornilescu 1924 și Biblia Liberă au fost consultate auxiliar. NTR nu a fost consultată; textul românesc a fost redactat independent.']
 nums='\n'.join(str(i) for i in range(1,21)).encode(); a=d['audit']
 a.update({'completedOn':'2026-08-08','engineVersion':'3.0.0','reviewLevel':'ai-complete','reviewAgent':{'type':'ai','engine':'Codex / GPT-5','runId':RUN,'method':'verse-by-verse-source-and-benchmark'},'sourceSnapshotSha256':SNAP,'verseCoverage':{'expected':20,'reviewed':20,'continuous':True,'verseNumbersSha256':'sha256:'+hashlib.sha256(nums).hexdigest()},'sourceLanguage':{'language':'greacă koine','text':'SBLGNT 1.2 + aparat; Textus Receptus ca martor suplimentar','result':'approved','scope':'Toate cele 20 de versete au fost confruntate direct cu SBLGNT/aparat; TR numai martor, iar WEBP/BTF/Cornilescu 1924/Biblia Liberă auxiliare.'},'romanianLanguage':{'result':'approved','changesApplied':['Au fost eliminate calcurile, dezacordurile și formulările corupte din candidatul anterior.','Fraza dificilă 6:4-6 a fost reconstruită ca o singură structură logică, fără inserții doctrinare.','Metaforele agricole, juridice și cultice au fost păstrate în română naturală.']},'theologicalContext':{'result':'approved','principles':['6:4-6 este redat sintactic după greacă fără a decide în corpul versetului o controversă soteriologică.','βαπτισμοί din 6:2 este redat generic „spălări”, fără a-l identifica automat exclusiv cu botezul creștin.','La 6:10 nu este importat adaosul RP/TR „osteneala” absent din textul principal SBLGNT.']},'omissionAddition':{'result':'approved','omissions':0,'additions':0},'copyrightDistance':{'result':'approved','method':'redactare proprie din SBLGNT/aparat și verificări auxiliare fixate; fără copierea unei traduceri românești'},'criticalIssues':{'result':'approved','open':0}})
 a.pop('benchmarkEvidence',None); a.pop('modelEvidence',None)
 d['editorialNotes']=[note(2,'βαπτισμῶν διδαχὴν','„învățăturii despre spălări”',['TR/NA28/RP: διδαχῆς'],'SBLGNT urmează aici acuzativul διδαχήν; βαπτισμοί este păstrat generic, fără restrângere confesională.'),note(3,'ποιήσομεν','„vom face aceasta”',['RP: ποιήσωμεν „să facem”'],'Textul principal are indicativ viitor, nu conjunctiv; româna păstrează afirmația condiționată de îngăduința lui Dumnezeu.'),note(6,'παραπεσόντας … ἀνακαινίζειν','„iar apoi au căzut, să fie înnoiți din nou spre pocăință”',['parafraze doctrinare despre imposibilitatea mântuirii'],'Participiul este integrat în seria începută la 6:4; textul nu primește explicații confesionale suplimentare.'),note(10,'τοῦ ἔργου ὑμῶν καὶ τῆς ἀγάπης','„lucrarea voastră și dragostea”',['RP/TR: adaos „osteneala”'],'SBLGNT nu conține τοῦ κόπου; adaosul martorului tradițional nu este importat.'),note(14,'Εἰ μὴν εὐλογῶν εὐλογήσω … πληθύνων πληθυνῶ','„Cu adevărat, te voi binecuvânta și te voi înmulți.”',['redare mecanică a infinitivului intern'],'Construcțiile semitizante intensive sunt redate idiomatic, păstrând certitudinea jurământului.'),note(17,'ἐμεσίτευσεν ὅρκῳ','„a garantat-o printr-un jurământ”',['„a mijlocit cu un jurământ”'],'Verbul descrie intervenția confirmatoare a jurământului; „a garantat” redă funcția în context juridic fără a introduce un mediator separat.'),note(19,'εἰς τὸ ἐσώτερον τοῦ καταπετάσματος','„dincolo de perdea, în partea dinăuntru”',['„în interiorul vălului”'],'Imaginea cultică este păstrată fără identificări explicative care aparțin argumentului următor.')]
 val=runpy.run_path('scripts/check-biblia-emanus.py'); a['textDigest']=val['chapter_text_digest'](d); a['contentDigest']=val['chapter_content_digest'](d)
 CH.write_text(unicodedata.normalize('NFC',json.dumps(d,ensure_ascii=False,indent=2)+'\n'))
 lines=['# Revizie AI, lot Evrei 6','','Statut: `in_review` — **nu este aprobare de publicare**.','','Data: `2026-08-08`','','Reviewer: `codex-gpt-5` (`ai`; sistem: `Codex / GPT-5`; rulare: `'+RUN+'`)','','## Domeniu și surse','','Au fost revizuite semantic toate cele 20 de versete din `HEB.6` direct cu snapshotul fixat SBLGNT 1.2 și aparatul lui. TR a fost folosit numai ca martor textual. WEBP, BTF, Cornilescu 1924 și Biblia Liberă au fost consultate auxiliar. NTR nu a fost consultată (`consultedInBatch: false`). Nicio traducere românească nu a fost copiată. Rezultatul validatorului automat nu a fost tratat drept verdict semantic.','','## Decizii pe verset','','| Referință BE | Ancoră SBLGNT verificată | Decizie editorială |','| --- | --- | --- |']
 for v in range(1,21): lines.append(f'| HEB.6.{v} | `{A[v]}` | {T[v]} |')
 lines += ['','## Concluzie de lot','','Toate cele 20 de versete au fost confruntate individual cu textul grec fixat, aparatul și martorii declarați. Variantele materiale din 6:2, 6:3, 6:7, 6:10, 6:14, 6:16, 6:18 și 6:19 au fost verificate explicit. Capitolul rămâne `in_review` și `public: false`; acest lot nu autorizează publicarea.','']
 JR.write_text(unicodedata.normalize('NFC','\n'.join(lines)))
if __name__=='__main__': main()
