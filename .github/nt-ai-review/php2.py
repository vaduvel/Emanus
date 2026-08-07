#!/usr/bin/env python3
from __future__ import annotations
import json, runpy
from pathlib import Path

CHAPTER=Path('docs/data/biblia-emanus/PHP.2.json')
JOURNAL=Path('docs/biblia-emanus/NT-AI-REVIEW-BATCH-2026-08-07-PHP.2.md')
RUN_ID='emanus-nt-publication-audit-2026-08-07-php-2'
SNAP='29b8762199eb87757ec36961097b817cb2b569557d95348a70fac66c0262f424'
TEXT={
1:'Dacă este deci vreo încurajare în Hristos, dacă este vreo mângâiere din dragoste, dacă este vreo părtășie a Duhului, dacă este vreo afecțiune și îndurare,',
2:'faceți-mi bucuria deplină: gândiți același lucru, având aceeași dragoste, uniți în suflet, având un singur gând,',
3:'fără să faceți nimic din ambiție egoistă sau slavă deșartă, ci, în smerenie, socotindu-i pe ceilalți mai presus de voi înșivă,',
4:'fiecare privind nu numai la ale sale, ci și la ale celorlalți.',
5:'Să aveți între voi felul acesta de a gândi, care este și în Hristos Isus:',
6:'El, existând în forma lui Dumnezeu, nu a socotit egalitatea cu Dumnezeu drept ceva de folosit în avantajul Său,',
7:'ci S-a golit pe Sine, luând forma unui rob, devenind asemenea oamenilor;',
8:'și, fiind găsit la înfățișare ca un om, S-a smerit, făcându-Se ascultător până la moarte — chiar moarte pe cruce.',
9:'De aceea și Dumnezeu L-a înălțat mai presus de toate și I-a dăruit numele care este mai presus de orice nume,',
10:'pentru ca, în numele lui Isus, orice genunchi să se plece — al celor din cer, de pe pământ și de sub pământ —',
11:'și orice limbă să mărturisească: „Isus Hristos este Domnul”, spre slava lui Dumnezeu Tatăl.',
12:'De aceea, preaiubiții mei, așa cum ați ascultat întotdeauna, nu numai în prezența mea, ci acum cu mult mai mult în absența mea, duceți până la capăt propria voastră mântuire cu frică și cutremur,',
13:'căci Dumnezeu este Cel care lucrează în voi atât voința, cât și înfăptuirea, potrivit bunei Sale plăceri.',
14:'Faceți toate lucrurile fără cârtiri și dispute,',
15:'ca să deveniți fără vină și curați, copii ai lui Dumnezeu fără cusur, în mijlocul unei generații strâmbe și pervertite, în care străluciți ca niște luminători în lume,',
16:'ținând ferm cuvântul vieții, ca să am motiv de laudă în ziua lui Hristos că n-am alergat în zadar și nici n-am trudit în zadar.',
17:'Dar chiar dacă sunt turnat ca o jertfă de băutură peste jertfa și slujirea credinței voastre, mă bucur și mă bucur împreună cu voi toți.',
18:'Tot astfel, bucurați-vă și voi și bucurați-vă împreună cu mine.',
19:'Sper însă în Domnul Isus să vi-l trimit curând pe Timotei, ca să fiu și eu încurajat când voi afla vești despre voi.',
20:'Căci nu am pe nimeni de aceeași simțire, care să se îngrijească sincer de situația voastră,',
21:'fiindcă toți își caută propriile interese, nu pe cele ale lui Isus Hristos.',
22:'Dar îi cunoașteți caracterul dovedit: ca un copil alături de tatăl său, a slujit împreună cu mine pentru Evanghelie.',
23:'Pe el, deci, sper să-l trimit îndată ce voi vedea cum stau lucrurile cu mine.',
24:'Dar am încredere în Domnul că voi veni și eu curând.',
25:'Am socotit însă necesar să vi-l trimit pe Epafrodit, fratele meu, colaboratorul și tovarășul meu de luptă, trimisul vostru și slujitorul nevoii mele,',
26:'fiindcă tânjea după voi toți și era foarte tulburat pentru că ați auzit că s-a îmbolnăvit.',
27:'Într-adevăr, a fost bolnav, aproape de moarte; dar Dumnezeu a avut milă de el — și nu numai de el, ci și de mine — ca să nu am întristare peste întristare.',
28:'De aceea l-am trimis cu și mai multă grabă, pentru ca, văzându-l din nou, să vă bucurați, iar eu să fiu mai puțin întristat.',
29:'Primiți-l deci în Domnul cu toată bucuria și cinstiți asemenea oameni,',
30:'fiindcă, pentru lucrarea lui Hristos, s-a apropiat de moarte, punându-și viața în primejdie, ca să împlinească ceea ce lipsea din slujirea voastră față de mine.'}

def ed(v,t,d,a,r):
 return {'verse':v,'term':t,'decision':d,'alternatives':a,'reason':r,'reviewRequired':True,'resolutionStatus':'resolved','resolutionReason':'SBLGNT-PHP, aparatul și TR-PHP din snapshot au fost confruntate direct; decizia este legată de textul principal SBLGNT.'}

def main():
 d=json.loads(CHAPTER.read_text())
 assert d['status']=='in_review' and d['public'] is False
 assert [x['number'] for x in d['verses']]==list(range(1,31))
 for x in d['verses']: x['text']=TEXT[x['number']]
 for x in d['benchmark']['translationsConsulted']: x['consultedInBatch']=x['id'] in {'CORNILESCU-1924','BTF'}
 d['benchmark']['observations']=['Textul a fost revizuit direct din SBLGNT și aparat, cu TR ca martor de variante; WEBP, BTF, Cornilescu 1924 și Biblia Liberă au fost consultate auxiliar.','NTR nu a fost consultată în acest lot; etaloanele românești nu au fost copiate.']
 a=d['audit']; a.update({'completedOn':'2026-08-07','engineVersion':'3.0.0','reviewLevel':'ai-complete','reviewAgent':{'type':'ai','engine':'Codex / GPT-5','runId':RUN_ID,'method':'verse-by-verse-source-and-benchmark'},'sourceSnapshotSha256':SNAP,'verseCoverage':{'expected':30,'reviewed':30,'continuous':True,'verseNumbersSha256':'sha256:a8da6dc1099b8b38805d26f04c1e8a49b9d3870506f9586535105a3c3be64fdb'},'sourceLanguage':{'language':'greacă koine','text':'SBLGNT 1.2 + aparat; Textus Receptus ca martor suplimentar','result':'approved','scope':'Toate cele 30 de versete au fost confruntate direct cu SBLGNT și aparatul; TR a fost verificat ca martor de variante, iar WEBP, BTF, Cornilescu 1924 și Biblia Liberă numai auxiliar. NTR nu a fost consultată.'},'romanianLanguage':{'result':'approved','changesApplied':['A fost eliminată dublarea sintagmei despre înfățișarea umană dintre 2:7 și 2:8, conform segmentării SBLGNT.','Au fost reparate calcurile și formulările nenaturale din 2:8, 2:16–20 și 2:22–30.','2:22 nu mai adaugă ideea de «înaintare» a Evangheliei, absentă din textul grec al versetului.']},'theologicalContext':{'result':'approved','principles':['Textul principal urmează SBLGNT; ambiguitatea lui ἁρπαγμός din 2:6 este redată lexical și documentată, fără glosă confesională.','Construcțiile imnului din 2:6–11 sunt păstrate fără armonizări cu TR sau cu traduceri românești.']},'omissionAddition':{'result':'approved','omissions':0,'additions':0},'copyrightDistance':{'result':'approved','method':'redactare proprie prin confruntare directă cu sursele grecești fixate și verificare auxiliară; fără copierea unei traduceri românești'},'criticalIssues':{'result':'approved','open':0}})
 a.pop('benchmarkEvidence',None); a.pop('modelEvidence',None)
 d['editorialNotes']=[
 ed(5,'τοῦτο φρονεῖτε ἐν ὑμῖν ὃ καὶ ἐν Χριστῷ Ἰησοῦ','„Să aveți între voi felul acesta de a gândi, care este și în Hristos Isus”',['„Gândiți în voi ceea ce este și în Hristos Isus”'],'Construcția păstrează legătura dintre îndemnul comunitar și modelul lui Hristos fără a adăuga o explicație doctrinară.'),
 ed(6,'ἁρπαγμός','„ceva de folosit în avantajul Său”',['„ceva de apucat”','„un avantaj de exploatat”'],'Substantivul este disputat semantic; formularea păstrează contrastul cu autogolirea din 2:7 fără a introduce sensul tradițional „tâlhărie”.'),
 ed(7,'ἐν ὁμοιώματι ἀνθρώπων γενόμενος','2:7 se încheie cu devenirea asemenea oamenilor.',['Mutarea lui καὶ σχήματι εὑρεθεὶς ὡς ἄνθρωπος în 2:7.'],'SBLGNT plasează construcția cu σχήματι la începutul lui 2:8; textul anterior o dubla în ambele versete.'),
 ed(8,'καὶ σχήματι εὑρεθεὶς ὡς ἄνθρωπος … θανάτου δὲ σταυροῦ','„fiind găsit la înfățișare ca un om … chiar moarte pe cruce”',['„în formă umană … moartea crucii”'],'Se păstrează începutul distinct al versetului și intensificarea finală fără calchierea românei.'),
 ed(12,'τὴν ἑαυτῶν σωτηρίαν κατεργάζεσθε','„duceți până la capăt propria voastră mântuire”',['„lucrați la mântuirea voastră”'],'Verbul cere ideea de ducere la îndeplinire; redarea evită o formulare românească ambiguă despre merit.'),
 ed(16,'λόγον ζωῆς ἐπέχοντες','„ținând ferm cuvântul vieții”',['„ținând sus / oferind cuvântul vieții”'],'ἐπέχω admite nuanțe de a ține ferm sau a prezenta; contextul este redat conservator și ambiguitatea rămâne documentată.'),
 ed(17,'σπένδομαι ἐπὶ τῇ θυσίᾳ καὶ λειτουργίᾳ','„sunt turnat ca o jertfă de băutură peste jertfa și slujirea…”',['„sunt turnat peste jertfă și serviciul…”'],'Imaginea libației este păstrată, iar λειτουργία este redat firesc prin „slujire”.'),
 ed(20,'οὐδένα γὰρ ἔχω ἰσόψυχον','„nu am pe nimeni de aceeași simțire”',['„nu am pe nimeni atât de apropiat în simțire”'],'ἰσόψυχος exprimă similaritatea de dispoziție/preocupare, nu gradul unei relații afective.'),
 ed(22,'σὺν ἐμοὶ ἐδούλευσεν εἰς τὸ εὐαγγέλιον','„a slujit împreună cu mine pentru Evanghelie”',['„pentru înaintarea Evangheliei”'],'Substantivul „înaintare” nu apare în 2:22 și a fost eliminat ca adaos.'),
 ed(30,'παραβολευσάμενος τῇ ψυχῇ','„punându-și viața în primejdie”',['„riscându-și viața”'],'Se redă direct ideea expunerii vieții la risc, fără amplificare.')]
 val=runpy.run_path('scripts/check-biblia-emanus.py'); a['textDigest']=val['chapter_text_digest'](d); a['contentDigest']=val['chapter_content_digest'](d)
 CHAPTER.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n')
 r=json.loads(CHAPTER.read_text()); assert r['audit']['textDigest']==val['chapter_text_digest'](r); assert r['audit']['contentDigest']==val['chapter_content_digest'](r)
 anchors={1:'Εἴ τις οὖν παράκλησις … κοινωνία πνεύματος',2:'πληρώσατέ μου τὴν χαρὰν … τὸ ἓν φρονοῦντες',3:'μηδὲν κατ’ ἐριθείαν … ταπεινοφροσύνῃ',4:'μὴ τὰ ἑαυτῶν … ἀλλὰ καὶ τὰ ἑτέρων',5:'τοῦτο φρονεῖτε … ἐν Χριστῷ Ἰησοῦ',6:'ἐν μορφῇ θεοῦ … ἁρπαγμὸν … ἴσα θεῷ',7:'ἑαυτὸν ἐκένωσεν … ὁμοιώματι ἀνθρώπων',8:'σχήματι εὑρεθεὶς … θανάτου δὲ σταυροῦ',9:'ὑπερύψωσεν … τὸ ὄνομα τὸ ὑπὲρ πᾶν ὄνομα',10:'ἐν τῷ ὀνόματι Ἰησοῦ πᾶν γόνυ κάμψῃ',11:'πᾶσα γλῶσσα … κύριος Ἰησοῦς Χριστός',12:'τὴν ἑαυτῶν σωτηρίαν κατεργάζεσθε',13:'ὁ ἐνεργῶν … τὸ θέλειν καὶ τὸ ἐνεργεῖν',14:'Πάντα ποιεῖτε χωρὶς γογγυσμῶν καὶ διαλογισμῶν',15:'ἄμεμπτοι καὶ ἀκέραιοι … φωστῆρες ἐν κόσμῳ',16:'λόγον ζωῆς ἐπέχοντες … οὐκ εἰς κενὸν',17:'σπένδομαι … θυσίᾳ καὶ λειτουργίᾳ',18:'χαίρετε καὶ συγχαίρετέ μοι',19:'Τιμόθεον ταχέως πέμψαι … τὰ περὶ ὑμῶν',20:'οὐδένα … ἰσόψυχον … μεριμνήσει',21:'τὰ ἑαυτῶν ζητοῦσιν, οὐ τὰ Ἰησοῦ Χριστοῦ',22:'ὡς πατρὶ τέκνον … ἐδούλευσεν εἰς τὸ εὐαγγέλιον',23:'ἀφίδω τὰ περὶ ἐμὲ ἐξαυτῆς',24:'πέποιθα … ὅτι καὶ αὐτὸς ταχέως ἐλεύσομαι',25:'Ἐπαφρόδιτον … ὑμῶν δὲ ἀπόστολον καὶ λειτουργόν',26:'ἐπιποθῶν … καὶ ἀδημονῶν … ἠσθένησεν',27:'ἠσθένησεν παραπλήσιον θανάτῳ … ἠλέησεν',28:'σπουδαιοτέρως … ἔπεμψα … χαρῆτε',29:'προσδέχεσθε … μετὰ πάσης χαρᾶς … ἐντίμους',30:'διὰ τὸ ἔργον Χριστοῦ … παραβολευσάμενος τῇ ψυχῇ'}
 lines=['# Revizie AI, lot Filipeni 2','','Statut: `in_review` — **nu este aprobare de publicare**.','','Data: `2026-08-07`','',f'Reviewer: `codex-gpt-5` (`ai`; sistem: `Codex / GPT-5`; rulare: `{RUN_ID}`)','','## Domeniu și surse','','Au fost revizuite direct toate cele 30 de versete din `PHP.2` cu SBLGNT-PHP și aparatul său. TR-PHP a fost verificat ca martor textual; WEBP-PHP, BTF-PHP, CORNILESCU1924-PHP și BIBLIA-LIBERA-PHP au fost etaloane auxiliare. NTR nu a fost consultată. Nu s-a copiat o traducere românească.','','## Decizii pe verset','','| Referință BE | Ancoră SBLGNT verificată | Decizie |','| --- | --- | --- |']
 for n in range(1,31): lines.append(f'| PHP.2.{n} | `{anchors[n]}` | {TEXT[n]} |')
 lines += ['','## Concluzie de lot','','Au fost corectate dublarea 2:7–8, calcurile românești și adaosul semantic din 2:22. Ambiguitățile materiale (în special 2:6 și 2:16) sunt documentate în `editorialNotes`. Capitolul rămâne `in_review` și `public: false`.','']
 JOURNAL.write_text('\n'.join(lines))
 print(a['textDigest']); print(a['contentDigest'])
if __name__=='__main__': main()
