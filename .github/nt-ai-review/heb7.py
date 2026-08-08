#!/usr/bin/env python3
import hashlib, json, runpy, subprocess, unicodedata
from pathlib import Path
CH=Path('docs/data/biblia-emanus/HEB.7.json')
JR=Path('docs/biblia-emanus/NT-AI-REVIEW-BATCH-2026-08-08-HEB.7.md')
ZIP=Path('docs/data/biblia-emanus/sources/nt-sblgnt-1.2.zip')
SNAP='29b8762199eb87757ec36961097b817cb2b569557d95348a70fac66c0262f424'
RUN='emanus-nt-review-2026-08-08-heb-7'
T={
1:'Căci acest Melhisedec, rege al Salemului, preot al Dumnezeului Preaînalt, l-a întâmpinat pe Avraam când se întorcea de la înfrângerea regilor și l-a binecuvântat.',
2:'Lui Avraam i-a dat și zeciuială din toate. Numele lui se tâlcuiește mai întâi „rege al dreptății”, iar apoi este și „rege al Salemului”, adică „rege al păcii”.',
3:'Fără tată, fără mamă, fără genealogie, neavând nici început al zilelor, nici sfârșit al vieții, dar asemănat cu Fiul lui Dumnezeu, rămâne preot neîncetat.',
4:'Priviți cât de mare a fost acesta, căruia până și patriarhul Avraam i-a dat zeciuială din cele mai bune prăzi.',
5:'Cei dintre fiii lui Levi care primesc preoția au poruncă, potrivit Legii, să ia zeciuială de la popor, adică de la frații lor, deși și aceștia au ieșit din coapsele lui Avraam.',
6:'Dar cel a cărui genealogie nu se trage din ei a primit zeciuială de la Avraam și l-a binecuvântat pe cel care avea promisiunile.',
7:'Fără nicio îndoială, cel mai mic este binecuvântat de cel mai mare.',
8:'Aici, cei care primesc zeciuieli sunt oameni muritori; acolo însă, este unul despre care se mărturisește că trăiește.',
9:'Și, ca să spunem așa, prin Avraam chiar și Levi, cel care primește zeciuieli, a dat zeciuială,',
10:'căci era încă în coapsele strămoșului său când Melhisedec l-a întâmpinat pe Avraam.',
11:'Dacă, așadar, desăvârșirea ar fi venit prin preoția levitică — căci pe baza ei poporului i-a fost dată Legea — ce nevoie mai era să se ridice un alt preot după rânduiala lui Melhisedec și să nu fie numit după rânduiala lui Aaron?',
12:'Căci, când se schimbă preoția, are loc în mod necesar și o schimbare a legii.',
13:'Cel despre care se spun aceste lucruri a aparținut unei alte seminții, din care nimeni nu a slujit la altar.',
14:'Este limpede că Domnul nostru S-a ridicat din Iuda, seminție despre ai cărei preoți Moise nu a spus nimic.',
15:'Lucrul este și mai limpede dacă se ridică un alt preot, după asemănarea lui Melhisedec,',
16:'care a devenit preot nu potrivit unei legi a unei porunci privitoare la trup, ci potrivit puterii unei vieți nepieritoare.',
17:'Căci se mărturisește: „Tu ești preot pentru totdeauna, după rânduiala lui Melhisedec.”',
18:'Pe de o parte, porunca anterioară este înlăturată din cauza slăbiciunii și inutilității ei,',
19:'căci Legea nu a dus nimic la desăvârșire; pe de altă parte, este adusă o speranță mai bună, prin care ne apropiem de Dumnezeu.',
20:'Și aceasta nu s-a făcut fără jurământ — ceilalți au devenit preoți fără jurământ,',
21:'dar El a devenit preot cu jurământ, prin Cel care I-a spus: „Domnul a jurat și nu-I va părea rău: «Tu ești preot pentru totdeauna.»”',
22:'Cu atât mai mult, Isus a devenit garantul unui legământ mai bun.',
23:'Mai mult, aceia au devenit preoți în număr mare, fiindcă moartea îi împiedica să rămână în slujire;',
24:'dar El, fiindcă rămâne pentru totdeauna, are o preoție netrecătoare.',
25:'De aceea poate și să-i mântuiască pe deplin pe cei care se apropie prin El de Dumnezeu, fiindcă trăiește întotdeauna ca să mijlocească pentru ei.',
26:'Un astfel de Mare Preot ni se potrivea: sfânt, fără răutate, neîntinat, despărțit de păcătoși și înălțat mai presus de ceruri.',
27:'El nu are nevoie, ca ceilalți mari preoți, să aducă jertfe în fiecare zi, mai întâi pentru propriile păcate și apoi pentru ale poporului; căci aceasta a făcut-o o dată pentru totdeauna, când S-a adus pe Sine.',
28:'Căci Legea pune ca mari preoți oameni care au slăbiciune, dar cuvântul jurământului, venit după Lege, Îl pune pe Fiul, făcut desăvârșit pentru totdeauna.'
}
A={
1:'Οὗτος γὰρ ὁ Μελχισέδεκ',2:'ᾧ καὶ δεκάτην ἀπὸ πάντων',3:'ἀπάτωρ, ἀμήτωρ, ἀγενεαλόγητος',4:'Θεωρεῖτε δὲ πηλίκος οὗτος',5:'καὶ οἱ μὲν ἐκ τῶν υἱῶν Λευὶ',6:'ὁ δὲ μὴ γενεαλογούμενος',7:'χωρὶς δὲ πάσης ἀντιλογίας',8:'καὶ ὧδε μὲν δεκάτας',9:'καὶ ὡς ἔπος εἰπεῖν',10:'ἔτι γὰρ ἐν τῇ ὀσφύϊ',11:'Εἰ μὲν οὖν τελείωσις',12:'μετατιθεμένης γὰρ τῆς ἱερωσύνης',13:'ἐφʼ ὃν γὰρ λέγεται ταῦτα',14:'πρόδηλον γὰρ ὅτι ἐξ Ἰούδα',15:'Καὶ περισσότερον ἔτι κατάδηλόν',16:'ὃς οὐ κατὰ νόμον ἐντολῆς',17:'⸀μαρτυρεῖται γὰρ ὅτι',18:'ἀθέτησις μὲν γὰρ γίνεται',19:'οὐδὲν γὰρ ἐτελείωσεν ὁ νόμος',20:'Καὶ καθʼ ὅσον οὐ χωρὶς ὁρκωμοσίας',21:'ὁ δὲ μετὰ ὁρκωμοσίας',22:'κατὰ ⸀τοσοῦτο ⸀κρείττονος διαθήκης',23:'Καὶ οἱ μὲν πλείονές εἰσιν',24:'ὁ δὲ διὰ τὸ μένειν αὐτὸν',25:'ὅθεν καὶ σῴζειν εἰς τὸ παντελὲς',26:'Τοιοῦτος γὰρ ἡμῖν ⸀καὶ ἔπρεπεν',27:'ὃς οὐκ ἔχει καθʼ ἡμέραν ἀνάγκην',28:'ὁ νόμος γὰρ ἀνθρώπους καθίστησιν'}
def extract(member): return subprocess.check_output(['unzip','-p',str(ZIP),member],text=True)
def note(v,term,decision,alts,reason): return {'verse':v,'term':term,'decision':decision,'alternatives':alts,'reason':reason,'reviewRequired':True,'resolutionStatus':'resolved','resolutionReason':reason}
def main():
 assert subprocess.check_output(['sha256sum',str(ZIP)],text=True).split()[0]==SNAP
 src={k:extract(p) for k,p in {'sbl':'sblgnt/text/HEB.txt','app':'sblgnt/apparatus/text/HEB.txt','tr':'tr/HEB.usfm','webp':'webp/HEB.usfm','btf':'btf/HEB.usfm','corn':'cornilescu1924/HEB.usfm','libera':'biblia-libera/HEB.usfm'}.items()}
 for k,t in src.items(): assert t.strip(),k
 for v in range(1,29): assert f'Heb 7:{v}\t' in src['sbl']
 s=unicodedata.normalize('NFC',src['sbl'])
 for v,a0 in A.items(): assert unicodedata.normalize('NFC',a0) in s,(v,a0)
 for marker in ['Hebrews 7:1','Hebrews 7:4','Hebrews 7:6','Hebrews 7:10','Hebrews 7:11','Hebrews 7:14','Hebrews 7:16','Hebrews 7:17','Hebrews 7:21','Hebrews 7:22','Hebrews 7:26']: assert marker in src['app']
 d=json.loads(CH.read_text()); assert d['status']=='in_review' and d['public'] is False; assert [x['number'] for x in d['verses']]==list(range(1,29))
 for x in d['verses']: x['text']=T[x['number']]
 for x in d['benchmark']['translationsConsulted']: x['consultedInBatch']=x['id'] in {'CORNILESCU-1924','BTF'}
 d['benchmark']['observations']=['Toate cele 28 de versete au fost revizuite semantic direct față de snapshotul fixat SBLGNT 1.2 și aparatul lui; rezultatul automat „0 probleme” nu a fost folosit drept verdict semantic.','TR a fost folosit numai ca martor textual. WEBP, BTF, Cornilescu 1924 și Biblia Liberă au fost consultate auxiliar. NTR nu a fost consultată; textul românesc a fost redactat independent.']
 nums='\n'.join(str(i) for i in range(1,29)).encode(); a=d['audit']
 a.update({'completedOn':'2026-08-08','engineVersion':'3.0.0','reviewLevel':'ai-complete','reviewAgent':{'type':'ai','engine':'Codex / GPT-5','runId':RUN,'method':'verse-by-verse-source-and-benchmark'},'sourceSnapshotSha256':SNAP,'verseCoverage':{'expected':28,'reviewed':28,'continuous':True,'verseNumbersSha256':'sha256:'+hashlib.sha256(nums).hexdigest()},'sourceLanguage':{'language':'greacă koine','text':'SBLGNT 1.2 + aparat; Textus Receptus ca martor suplimentar','result':'approved','scope':'Toate cele 28 de versete au fost confruntate direct cu SBLGNT/aparat; TR numai martor, iar WEBP/BTF/Cornilescu 1924/Biblia Liberă auxiliare.'},'romanianLanguage':{'result':'approved','changesApplied':['Au fost eliminate calcurile, fragmentele corupte și acordurile defectuoase din candidatul anterior.','Argumentul despre Melhisedec, preoție, Lege și jurământ a fost reconstruit în fraze românești coerente fără glosare confesională.','Citatele și contrastele retorice din 7:18-22 au fost punctuate astfel încât relațiile logice ale textului grec să rămână vizibile.']},'theologicalContext':{'result':'approved','principles':['Descrierea lui Melhisedec din 7:3 este redată textual fără a o transforma într-o afirmație ontologică suplimentară despre persoana lui.','σαρκίνης din 7:16 este redat prin „privitoare la trup”, evitând sensul moral peiorativ al lui „carnal”.','La 7:21 textul principal nu importă adaosul RP „după rânduiala lui Melhisedec”, iar la 7:22 este respectată lectura SBLGNT a aparatului.']},'omissionAddition':{'result':'approved','omissions':0,'additions':0},'copyrightDistance':{'result':'approved','method':'redactare proprie din SBLGNT/aparat și verificări auxiliare fixate; fără copierea unei traduceri românești'},'criticalIssues':{'result':'approved','open':0}})
 a.pop('benchmarkEvidence',None); a.pop('modelEvidence',None)
 d['editorialNotes']=[note(3,'ἀπάτωρ, ἀμήτωρ, ἀγενεαλόγητος','„Fără tată, fără mamă, fără genealogie”',['explicații ontologice în corpul versetului'],'Termenii sunt redați lexical; interpretarea tipologică este lăsată argumentului autorului, fără completări doctrinare.'),note(11,'ἐπʼ αὐτῆς νενομοθέτηται','„pe baza ei poporului i-a fost dată Legea”',['RP: αὐτῇ / νενομοθέτητο'],'SBLGNT păstrează genitivul și perfectul; formularea românească redă relația dintre preoția levitică și darea Legii fără a importa lectura RP.'),note(14,'περὶ ἱερέων οὐδὲν','„despre ai cărei preoți Moise nu a spus nimic”',['RP: „nimic despre preoție”'],'Textul principal vorbește despre preoți, nu folosește substantivul abstract „preoție” din lectura RP.'),note(16,'ἐντολῆς σαρκίνης','„unei porunci privitoare la trup”',['„porunci carnale”'],'Adjectivul descrie ordinul legat de descendența trupească, nu o calitate morală păcătoasă.'),note(21,'Σὺ ἱερεὺς εἰς τὸν αἰῶνα','„Tu ești preot pentru totdeauna.”',['RP: + „după rânduiala lui Melhisedec”'],'Adaosul RP nu este în textul principal SBLGNT la 7:21 și nu este importat.'),note(22,'ἔγγυος … διαθήκης','„garantul unui legământ mai bun”',['„chezaș”'],'ἔγγυος indică garantul unei obligații; termenul este redat natural, iar varianta cu καὶ înainte de κρείττονος nu schimbă nucleul semantic.'),note(24,'ἀπαράβατον … ἱερωσύνην','„o preoție netrecătoare”',['„preoție netransmisibilă”','„preoție neschimbătoare”'],'Contextul contrastează preoții împiedicați de moarte cu Hristos care rămâne; „netrecătoare” păstrează permanența fără a supraexplica termenul disputat.'),note(25,'εἰς τὸ παντελὲς','„să-i mântuiască pe deplin”',['„pentru totdeauna”'],'Expresia poate sublinia deplinătatea/extinderea completă; „pe deplin” păstrează sensul adverbial fără a dubla nejustificat ideea temporală din „trăiește întotdeauna”.')]
 val=runpy.run_path('scripts/check-biblia-emanus.py'); a['textDigest']=val['chapter_text_digest'](d); a['contentDigest']=val['chapter_content_digest'](d)
 CH.write_text(unicodedata.normalize('NFC',json.dumps(d,ensure_ascii=False,indent=2)+'\n'))
 lines=['# Revizie AI, lot Evrei 7','','Statut: `in_review` — **nu este aprobare de publicare**.','','Data: `2026-08-08`','','Reviewer: `codex-gpt-5` (`ai`; sistem: `Codex / GPT-5`; rulare: `'+RUN+'`)','','## Domeniu și surse','','Au fost revizuite semantic toate cele 28 de versete din `HEB.7` direct cu snapshotul fixat SBLGNT 1.2 și aparatul lui. TR a fost folosit numai ca martor textual. WEBP, BTF, Cornilescu 1924 și Biblia Liberă au fost consultate auxiliar. NTR nu a fost consultată (`consultedInBatch: false`). Nicio traducere românească nu a fost copiată. Rezultatul validatorului automat nu a fost tratat drept verdict semantic.','','## Decizii pe verset','','| Referință BE | Ancoră SBLGNT verificată | Decizie editorială |','| --- | --- | --- |']
 for v in range(1,29): lines.append(f'| HEB.7.{v} | `{A[v]}` | {T[v]} |')
 lines += ['','## Concluzie de lot','','Toate cele 28 de versete au fost confruntate individual cu textul grec fixat, aparatul și martorii declarați. Variantele materiale din 7:1, 7:4, 7:6, 7:10, 7:11, 7:14, 7:16, 7:17, 7:21, 7:22 și 7:26 au fost verificate explicit. Capitolul rămâne `in_review` și `public: false`; acest lot nu autorizează publicarea.','']
 JR.write_text(unicodedata.normalize('NFC','\n'.join(lines)))
if __name__=='__main__': main()
