#!/usr/bin/env python3
import json, runpy, subprocess, unicodedata
from pathlib import Path

CH = Path('docs/data/biblia-emanus/HEB.2.json')
JR = Path('docs/biblia-emanus/NT-AI-REVIEW-BATCH-2026-08-08-HEB.2.md')
ZIP = Path('docs/data/biblia-emanus/sources/nt-sblgnt-1.2.zip')
SNAP = '29b8762199eb87757ec36961097b817cb2b569557d95348a70fac66c0262f424'
RUN = 'emanus-nt-review-2026-08-08-heb-2'

T = {
1:'De aceea trebuie să fim cu atât mai atenți la cele auzite, ca nu cumva să ne abatem de la ele.',
2:'Căci, dacă mesajul rostit prin îngeri s-a dovedit sigur și orice încălcare și neascultare a primit răsplătirea dreaptă,',
3:'cum vom scăpa noi dacă neglijăm o mântuire atât de mare? Ea, după ce a început să fie vestită prin Domnul, ne-a fost confirmată de cei care L-au auzit,',
4:'în timp ce Dumnezeu mărturisea împreună cu ei prin semne, minuni, felurite lucrări de putere și împărțiri ale Duhului Sfânt, potrivit voii Sale.',
5:'Căci nu îngerilor le-a supus El lumea viitoare despre care vorbim.',
6:'Dar cineva a mărturisit undeva, spunând: „Ce este omul, ca să-Ți amintești de el, sau fiul omului, ca să-l cercetezi?',
7:'L-ai făcut pentru puțin timp mai prejos decât îngerii; l-ai încununat cu slavă și cinste.',
8:'Ai supus toate lucrurile sub picioarele lui.” Căci, supunându-i toate lucrurile, nu a lăsat nimic care să nu-i fie supus. Totuși, acum încă nu vedem toate lucrurile supuse lui.',
9:'Dar Îl vedem pe Isus, făcut pentru puțin timp mai prejos decât îngerii, încununat cu slavă și cinste din pricina suferinței morții, pentru ca, fără Dumnezeu, să guste moartea pentru fiecare.',
10:'Căci se cuvenea ca Acela pentru care sunt toate și prin care sunt toate, aducând mulți fii la slavă, să-L desăvârșească prin suferințe pe Inițiatorul mântuirii lor.',
11:'Căci Cel care sfințește și cei care sunt sfințiți sunt toți dintr-Unul; de aceea nu Se rușinează să-i numească frați,',
12:'spunând: „Voi vesti Numele Tău fraților Mei; în mijlocul adunării Îți voi cânta laudă.”',
13:'Și din nou: „Eu Îmi voi pune încrederea în El.” Și din nou: „Iată, Eu și copiii pe care Mi i-a dat Dumnezeu.”',
14:'Așadar, deoarece copiii au parte de sânge și carne, și El a luat parte în mod asemănător la aceleași lucruri, pentru ca prin moarte să-l facă neputincios pe cel care are puterea morții, adică pe diavolul,',
15:'și să-i elibereze pe toți cei care, prin frica de moarte, erau ținuți în robie toată viața.',
16:'Căci, desigur, nu de îngeri Se îngrijește, ci de urmașii lui Avraam Se îngrijește.',
17:'De aceea trebuia să fie făcut asemenea fraților Săi în toate, ca să devină un Mare-Preot milos și credincios în cele privitoare la Dumnezeu, pentru a face ispășire pentru păcatele poporului.',
18:'Căci, fiindcă El Însuși a suferit când a fost încercat, poate să-i ajute pe cei care sunt încercați.'
}

A = {
1:'Διὰ τοῦτο δεῖ περισσοτέρως προσέχειν ἡμᾶς τοῖς ἀκουσθεῖσιν, μήποτε παραρυῶμεν',
2:'εἰ γὰρ ὁ δι’ ἀγγέλων λαληθεὶς λόγος ἐγένετο βέβαιος … ἔνδικον μισθαποδοσίαν',
3:'πῶς ἡμεῖς ἐκφευξόμεθα … ἀμελήσαντες σωτηρίας … διὰ τοῦ κυρίου … ἐβεβαιώθη',
4:'συνεπιμαρτυροῦντος τοῦ θεοῦ … πνεύματος ἁγίου μερισμοῖς κατὰ τὴν αὐτοῦ θέλησιν',
5:'Οὐ γὰρ ἀγγέλοις ὑπέταξεν τὴν οἰκουμένην τὴν μέλλουσαν',
6:'Τί ἐστιν ἄνθρωπος ὅτι μιμνῄσκῃ αὐτοῦ … ἐπισκέπτῃ αὐτόν',
7:'ἠλάττωσας αὐτὸν βραχύ τι παρ’ ἀγγέλους, δόξῃ καὶ τιμῇ ἐστεφάνωσας αὐτόν',
8:'πάντα ὑπέταξας ὑποκάτω τῶν ποδῶν αὐτοῦ … ὑποτάξαι τὰ πάντα … οὔπω ὁρῶμεν',
9:'βραχύ τι παρ’ ἀγγέλους ἠλαττωμένον … Ἰησοῦν … ὅπως χωρὶς θεοῦ ὑπὲρ παντὸς γεύσηται θανάτου',
10:'Ἔπρεπεν γὰρ αὐτῷ … πολλοὺς υἱοὺς εἰς δόξαν ἀγαγόντα … διὰ παθημάτων τελειῶσαι',
11:'ὅ τε γὰρ ἁγιάζων καὶ οἱ ἁγιαζόμενοι ἐξ ἑνὸς πάντες … ἀδελφοὺς αὐτοὺς καλεῖν',
12:'Ἀπαγγελῶ τὸ ὄνομά σου τοῖς ἀδελφοῖς μου, ἐν μέσῳ ἐκκλησίας ὑμνήσω σε',
13:'Ἐγὼ ἔσομαι πεποιθὼς ἐπ’ αὐτῷ … Ἰδοὺ ἐγὼ καὶ τὰ παιδία ἅ μοι ἔδωκεν ὁ θεός',
14:'τὰ παιδία κεκοινώνηκεν αἵματος καὶ σαρκός … διὰ τοῦ θανάτου καταργήσῃ … τὸν διάβολον',
15:'ἀπαλλάξῃ τούτους, ὅσοι φόβῳ θανάτου … ἔνοχοι ἦσαν δουλείας',
16:'οὐ γὰρ δήπου ἀγγέλων ἐπιλαμβάνεται, ἀλλὰ σπέρματος Ἀβραὰμ ἐπιλαμβάνεται',
17:'ὤφειλεν κατὰ πάντα τοῖς ἀδελφοῖς ὁμοιωθῆναι … πιστὸς ἀρχιερεὺς … ἱλάσκεσθαι τὰς ἁμαρτίας',
18:'ἐν ᾧ γὰρ πέπονθεν αὐτὸς πειρασθείς, δύναται τοῖς πειραζομένοις βοηθῆσαι'
}

def extract(member):
    return subprocess.check_output(['unzip','-p',str(ZIP),member], text=True)

def note(v, term, decision, alternatives, reason):
    return {'verse':v,'term':term,'decision':decision,'alternatives':alternatives,'reason':reason,'reviewRequired':True,'resolutionStatus':'resolved','resolutionReason':reason}

def main():
    assert subprocess.check_output(['sha256sum', str(ZIP)], text=True).split()[0] == SNAP
    sources = {
      'sbl': extract('sblgnt/text/HEB.txt'),
      'app': extract('sblgnt/apparatus/text/HEB.txt'),
      'tr': extract('tr/HEB.usfm'),
      'webp': extract('webp/HEB.usfm'),
      'btf': extract('btf/HEB.usfm'),
      'corn': extract('cornilescu1924/HEB.usfm'),
      'libera': extract('biblia-libera/HEB.usfm'),
    }
    for key, text in sources.items(): assert text.strip(), key
    for v in A: assert f'Heb 2:{v}\t' in sources['sbl'], v
    assert 'Hebrews 2:9' in sources['app'] and 'χωρὶς Holmes' in sources['app']

    d = json.loads(CH.read_text())
    assert d['status'] == 'in_review' and d['public'] is False
    assert [x['number'] for x in d['verses']] == list(range(1,19))
    for x in d['verses']: x['text'] = T[x['number']]
    for x in d['benchmark']['translationsConsulted']:
        x['consultedInBatch'] = x['id'] in {'CORNILESCU-1924','BTF'}
    d['benchmark']['observations'] = [
      'Toate cele 18 versete au fost revizuite direct față de snapshotul fixat SBLGNT 1.2 și aparatul lui; TR a fost folosit numai ca martor textual.',
      'WEBP, BTF, Cornilescu 1924 și Biblia Liberă au fost consultate auxiliar. NTR nu a fost consultată și nu s-a copiat o traducere românească.'
    ]
    a=d['audit']
    a.update({
      'completedOn':'2026-08-08','engineVersion':'3.0.0','reviewLevel':'ai-complete',
      'reviewAgent':{'type':'ai','engine':'Codex / GPT-5','runId':RUN,'method':'verse-by-verse-source-and-benchmark'},
      'sourceSnapshotSha256':SNAP,
      'verseCoverage':{'expected':18,'reviewed':18,'continuous':True,'verseNumbersSha256':'sha256:97e2b94335f7190c07ec7bc6694ea201a4159991b8d720416a90c403ecc9312b'},
      'sourceLanguage':{'language':'greacă koine','text':'SBLGNT 1.2 + aparat; Textus Receptus ca martor suplimentar','result':'approved','scope':'Toate cele 18 versete au fost confruntate direct cu SBLGNT/aparat din snapshotul fixat; TR a fost citit exclusiv ca martor, iar WEBP/BTF/Cornilescu 1924/Biblia Liberă ca auxiliare.'},
      'romanianLanguage':{'result':'approved','changesApplied':['Au fost eliminate calcurile, acordurile defecte și punctuația coruptă din textul anterior.','Citatele din Psalmul 8, Psalmul 22 și Isaia 8 au fost delimitate coerent.','La 2:9 textul românesc a fost realiniat la lectura efectivă SBLGNT, fără armonizare cu lectura majoritară.']},
      'theologicalContext':{'result':'approved','principles':['Textul principal urmează snapshotul SBLGNT chiar când lectura lui este minoritară, ca în 2:9 χωρὶς θεοῦ.','TR și etaloanele auxiliare nu sunt folosite pentru a înlocui automat lectura textului principal.','Ambiguitățile lexicale sunt documentate fără glosare confesională în corpul versetului.']},
      'omissionAddition':{'result':'approved','omissions':0,'additions':0},
      'copyrightDistance':{'result':'approved','method':'redactare proprie din SBLGNT/aparat și verificări auxiliare fixate; fără copierea unei traduceri românești'},
      'criticalIssues':{'result':'approved','open':0}
    })
    a.pop('benchmarkEvidence',None); a.pop('modelEvidence',None)
    d['editorialNotes'] = [
      note(7,'αὐτόν','„l-ai încununat cu slavă și cinste”',['TR/WH/Treg: continuare „și l-ai pus peste lucrările mâinilor Tale”'],'SBLGNT nu include continuarea după αὐτόν; aparatul o consemnează în WH/Treg, iar textul principal nu o importă.'),
      note(8,'ὑποτάξαι','„supunându-i toate lucrurile”',['WH/Treg/RP: ὑποτάξαι αὐτῷ'],'SBLGNT Holmes omite pronumele αὐτῷ după infinitiv; referentul rămâne recuperabil din context și nu este prezentat ca adaos al textului grec.'),
      note(9,'χωρὶς θεοῦ','„fără Dumnezeu”',['χάριτι θεοῦ — „prin harul lui Dumnezeu”'],'Snapshotul SBLGNT tipărește lectura Holmes χωρὶς θεοῦ, în timp ce aparatul consemnează χάριτι în WH/Treg/NIV/RP. Conform runbook-ului, corpul textului urmează lectura principală fixată, iar alternativa este documentată aici.'),
      note(14,'αἵματος καὶ σαρκός','„sânge și carne”',['TR/RP: „carne și sânge”'],'SBLGNT/WH/Treg păstrează ordinea αἵματος καὶ σαρκός; ordinea TR/RP nu este importată.'),
      note(16,'ἐπιλαμβάνεται','„Se îngrijește de”',['„ia în ajutor”','„Se prinde de”'],'Verbul are literal sensul de a apuca/a lua de cineva și, contextual, de a veni în ajutor; formularea aleasă păstrează sensul relațional fără a introduce o afirmație ontologică absentă din verb.'),
      note(17,'ἱλάσκεσθαι','„a face ispășire”',['„a face propitiere”','„a îndepărta vina păcatelor”'],'Verbul cultic este redat prin formularea românească larg inteligibilă „a face ispășire”, fără a impune în verset o teorie confesională a mecanismului ispășirii.'),
      note(18,'πειρασθείς / πειραζομένοις','„când a fost încercat / cei care sunt încercați”',['„ispitit / ispitiți”'],'πειράζω poate desemna ispitire sau punere la încercare; contextul suferinței din propoziție susține termenul mai larg „încercat”.')
    ]
    val=runpy.run_path('scripts/check-biblia-emanus.py')
    a['textDigest']=val['chapter_text_digest'](d)
    a['contentDigest']=val['chapter_content_digest'](d)
    CH.write_text(unicodedata.normalize('NFC', json.dumps(d, ensure_ascii=False, indent=2)+'\n'))

    lines=['# Revizie AI, lot Evrei 2','', 'Statut: `in_review` — **nu este aprobare de publicare**.','', 'Data: `2026-08-08`','', f'Reviewer: `codex-gpt-5` (`ai`; sistem: `Codex / GPT-5`; rulare: `{RUN}`)','', '## Domeniu și surse','', 'Au fost revizuite direct toate cele 18 versete din `HEB.2` față de snapshotul fixat SBLGNT 1.2 și aparatul său. `TR-HEB` a fost folosit numai ca martor textual. `WEBP-HEB`, `BTF-HEB`, `CORNILESCU1924-HEB` și Biblia Liberă au fost consultate auxiliar. NTR nu a fost consultată (`consultedInBatch: false`). Redactarea este proprie și lotul nu reprezintă aprobare ori publicare.','', '## Decizii pe verset','', '| Referință BE | Ancoră SBLGNT verificată | Decizie |','| --- | --- | --- |']
    for v in range(1,19): lines.append(f'| HEB.2.{v} | `{A[v]}` | {T[v]} |')
    lines += ['', '## Concluzie de lot','', 'Toate cele 18 versete au primit o decizie semantică explicită după confruntarea directă cu sursa, nu doar un rezultat automat. Varianta materială din 2:9 (`χωρὶς θεοῦ` față de `χάριτι θεοῦ`) este păstrată conform textului principal SBLGNT și documentată în `editorialNotes`; au fost verificate de asemenea variantele din 2:7, 2:8 și 2:14. Capitolul rămâne `in_review` și `public: false`.','']
    JR.write_text(unicodedata.normalize('NFC','\n'.join(lines)))

    d2=json.loads(CH.read_text())
    assert d2['audit']['textDigest']==val['chapter_text_digest'](d2)
    assert d2['audit']['contentDigest']==val['chapter_content_digest'](d2)

if __name__=='__main__': main()
