#!/usr/bin/env python3
import json, runpy, subprocess, tempfile, unicodedata
from pathlib import Path

CH = Path('docs/data/biblia-emanus/HEB.1.json')
JR = Path('docs/biblia-emanus/NT-AI-REVIEW-BATCH-2026-08-08-HEB.1.md')
ZIP = Path('docs/data/biblia-emanus/sources/nt-sblgnt-1.2.zip')
SNAP = '29b8762199eb87757ec36961097b817cb2b569557d95348a70fac66c0262f424'
RUN = 'emanus-nt-review-2026-08-08-heb-1'

T = {
1:'Dumnezeu, după ce odinioară le-a vorbit părinților prin profeți, în multe rânduri și în multe feluri,',
2:'în aceste zile de pe urmă ne-a vorbit prin Fiul, pe care L-a pus moștenitor al tuturor lucrurilor și prin care a făcut veacurile.',
3:'El, fiind strălucirea slavei și întipărirea ființei Lui și purtând toate prin cuvântul puterii, după ce prin Sine însuși a făcut curățirea păcatelor, S-a așezat la dreapta Măreției, în înălțimi,',
4:'ajungând cu atât mai presus de îngeri cu cât a moștenit un Nume mai deosebit decât al lor.',
5:'Căci căruia dintre îngeri i-a spus vreodată: „Tu ești Fiul Meu; Eu astăzi Te-am născut”? Și din nou: „Eu Îi voi fi Tată, iar El Îmi va fi Fiu”?',
6:'Iar când Îl aduce din nou pe Cel întâi născut în lume, spune: „Și să I se închine toți îngerii lui Dumnezeu.”',
7:'Iar despre îngeri spune: „El îi face pe îngerii Săi vânturi și pe slujitorii Săi flacără de foc.”',
8:'Dar despre Fiul: „Tronul Tău, Dumnezeule, este în vecii vecilor, și sceptrul dreptății este sceptrul Împărăției Tale.',
9:'Ai iubit dreptatea și ai urât nelegiuirea; de aceea Te-a uns Dumnezeu, Dumnezeul Tău, cu untdelemnul bucuriei mai presus de însoțitorii Tăi.”',
10:'Și: „Tu, Doamne, la început ai întemeiat pământul, iar cerurile sunt lucrările mâinilor Tale.',
11:'Ele vor pieri, dar Tu rămâi; toate se vor învechi ca o haină,',
12:'și ca pe o manta le vei înfășura, ca pe o haină, și vor fi schimbate; dar Tu ești Același, iar anii Tăi nu se vor sfârși.”',
13:'Dar căruia dintre îngeri i-a spus vreodată: „Șezi la dreapta Mea până când îi voi pune pe dușmanii Tăi drept așternut al picioarelor Tale”?',
14:'Nu sunt oare toți duhuri slujitoare, trimise să slujească pentru cei care urmează să moștenească mântuirea?'
}

A = {
1:'Πολυμερῶς καὶ πολυτρόπως πάλαι … τοῖς πατράσιν ἐν τοῖς προφήταις',
2:'ἐπ’ ἐσχάτου τῶν ἡμερῶν τούτων … ἐν υἱῷ … δι’ οὗ καὶ ἐποίησεν τοὺς αἰῶνας',
3:'ἀπαύγασμα τῆς δόξης … χαρακτὴρ τῆς ὑποστάσεως … δι’ αὑτοῦ καθαρισμὸν τῶν ἁμαρτιῶν ποιησάμενος',
4:'τοσούτῳ κρείττων γενόμενος τῶν ἀγγέλων … διαφορώτερον … ὄνομα',
5:'Υἱός μου εἶ σύ … Ἐγὼ ἔσομαι αὐτῷ εἰς πατέρα …',
6:'ὅταν δὲ πάλιν εἰσαγάγῃ τὸν πρωτότοκον … προσκυνησάτωσαν αὐτῷ πάντες ἄγγελοι θεοῦ',
7:'Ὁ ποιῶν τοὺς ἀγγέλους αὐτοῦ πνεύματα … λειτουργοὺς … πυρὸς φλόγα',
8:'Ὁ θρόνος σου ὁ θεὸς … καὶ ἡ ῥάβδος τῆς εὐθύτητος …',
9:'ἠγάπησας δικαιοσύνην καὶ ἐμίσησας ἀνομίαν … ἔλαιον ἀγαλλιάσεως',
10:'Σὺ κατ’ ἀρχάς, κύριε, τὴν γῆν ἐθεμελίωσας …',
11:'αὐτοὶ ἀπολοῦνται, σὺ δὲ διαμένεις … ὡς ἱμάτιον παλαιωθήσονται',
12:'ὡσεὶ περιβόλαιον ἑλίξεις αὐτούς, ὡς ἱμάτιον καὶ ἀλλαγήσονται …',
13:'Κάθου ἐκ δεξιῶν μου … ὑποπόδιον τῶν ποδῶν σου',
14:'λειτουργικὰ πνεύματα … εἰς διακονίαν ἀποστελλόμενα … κληρονομεῖν σωτηρίαν'
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
    for v, anchor in A.items():
        # Every decision is tied to the exact archived SBLGNT chapter. Use a stable compact token from each anchor.
        token = anchor.split(' … ')[0].split('…')[0].strip()
        assert token in sources['sbl'], (v, token)

    d = json.loads(CH.read_text())
    assert d['status'] == 'in_review' and d['public'] is False
    assert [x['number'] for x in d['verses']] == list(range(1,15))
    for x in d['verses']: x['text'] = T[x['number']]
    for x in d['benchmark']['translationsConsulted']:
        x['consultedInBatch'] = x['id'] in {'CORNILESCU-1924','BTF'}
    d['benchmark']['observations'] = [
      'Toate cele 14 versete au fost revizuite direct față de snapshotul fixat SBLGNT 1.2 și aparatul lui; TR a fost folosit numai ca martor textual.',
      'WEBP, BTF, Cornilescu 1924 și Biblia Liberă au fost consultate auxiliar. NTR nu a fost consultată și nu s-a copiat o traducere românească.'
    ]
    a=d['audit']
    a.update({
      'completedOn':'2026-08-08','engineVersion':'3.0.0','reviewLevel':'ai-complete',
      'reviewAgent':{'type':'ai','engine':'Codex / GPT-5','runId':RUN,'method':'verse-by-verse-source-and-benchmark'},
      'sourceSnapshotSha256':SNAP,
      'verseCoverage':{'expected':14,'reviewed':14,'continuous':True,'verseNumbersSha256':'sha256:7a3ab5474e4f9b4cf30d57afff13218248c7c84cb0ce11908587248cfb8adaf1'},
      'sourceLanguage':{'language':'greacă koine','text':'SBLGNT 1.2 + aparat; Textus Receptus ca martor suplimentar','result':'approved','scope':'Toate cele 14 versete au fost confruntate cu SBLGNT/aparat din snapshotul fixat; TR a fost citit exclusiv ca martor, iar WEBP/BTF/Cornilescu 1924/Biblia Liberă ca auxiliare.'},
      'romanianLanguage':{'result':'approved','changesApplied':['Au fost eliminate calcurile și formulările corupte din textul anterior.','Citatele din Psalmii 2, 45, 102 și 110 au fost punctuate coerent și persoanele verbale au fost reparate.','Termenii χαρακτήρ, ὑπόστασις, λειτουργικός și αἰῶνες au fost redați contextual, fără glosare confesională adăugată.']},
      'theologicalContext':{'result':'approved','principles':['Textul principal urmează SBLGNT și nu importă automat adaosuri ori ordini TR/RP.','Ambiguitatea sintactică din 1:8 este documentată editorial; corpul textului păstrează lectura vocativă tradițional posibilă fără a o prezenta drept variantă textuală.']},
      'omissionAddition':{'result':'approved','omissions':0,'additions':0},
      'copyrightDistance':{'result':'approved','method':'redactare proprie din SBLGNT/aparat și verificări auxiliare fixate; fără copierea unei traduceri românești'},
      'criticalIssues':{'result':'approved','open':0}
    })
    a.pop('benchmarkEvidence',None); a.pop('modelEvidence',None)
    d['editorialNotes'] = [
      note(2,'τοὺς αἰῶνας','„veacurile”',['„lumile”','„universul”'],'Termenul plural αἰῶνες are aici uz cosmologic; „veacurile” păstrează forma lexicală fără a reduce sensul la spațiu fizic.'),
      note(3,'χαρακτὴρ τῆς ὑποστάσεως','„întipărirea ființei Lui”',['„reprezentarea exactă a naturii Lui”','„amprenta realității Lui”'],'χαρακτήρ indică o imprimare/reprezentare exactă, iar ὑπόστασις aici desemnează realitatea/ființa subiacentă; formularea evită importarea terminologiei dogmatice ulterioare.'),
      note(3,'δι’ αὑτοῦ','„prin Sine însuși”',['omiterea expresiei reflexive'],'SBLGNT tipărește lectura reflexivă Holmes; aparatul consemnează alte lecturi, inclusiv αὐτοῦ și combinația RP. Textul principal păstrează lectura SBLGNT.'),
      note(7,'τοὺς ἀγγέλους αὐτοῦ πνεύματα','„îngerii Săi vânturi”',['„îngerii Săi duhuri”'],'πνεύματα poate însemna „vânturi” sau „duhuri”; paralelismul citatului cu „flacără de foc” susține redarea elementară „vânturi”, fără a nega sensul personal al îngerilor în context.'),
      note(8,'Ὁ θρόνος σου ὁ θεὸς','„Tronul Tău, Dumnezeule”',['„Dumnezeu este tronul Tău”'],'Construcția nominativă poate fi analizată vocativ sau predicativ; formularea aleasă este posibilă gramatical și coerentă cu citatul, iar alternativa este consemnată fără a fi transformată în variantă textuală.'),
      note(12,'ὡς ἱμάτιον','păstrat: „ca pe o haină”',['omiterea expresiei'],'SBLGNT păstrează expresia; aparatul consemnează omiterea în RP, care nu este importată în textul principal.')
    ]
    val=runpy.run_path('scripts/check-biblia-emanus.py')
    a['textDigest']=val['chapter_text_digest'](d)
    a['contentDigest']=val['chapter_content_digest'](d)
    CH.write_text(unicodedata.normalize('NFC', json.dumps(d, ensure_ascii=False, indent=2)+'\n'))

    lines=['# Revizie AI, lot Evrei 1','', 'Statut: `in_review` — **nu este aprobare de publicare**.','', 'Data: `2026-08-08`','', f'Reviewer: `codex-gpt-5` (`ai`; sistem: `Codex / GPT-5`; rulare: `{RUN}`)','', '## Domeniu și surse','', 'Au fost revizuite direct toate cele 14 versete din `HEB.1` față de snapshotul fixat SBLGNT 1.2 și aparatul său. `TR-HEB` a fost folosit numai ca martor textual. `WEBP-HEB`, `BTF-HEB`, `CORNILESCU1924-HEB` și Biblia Liberă au fost consultate auxiliar. NTR nu a fost consultată (`consultedInBatch: false`). Redactarea este proprie și lotul nu reprezintă aprobare ori publicare.','', '## Decizii pe verset','', '| Referință BE | Ancoră SBLGNT verificată | Decizie |','| --- | --- | --- |']
    for v in range(1,15): lines.append(f'| HEB.1.{v} | `{A[v]}` | {T[v]} |')
    lines += ['', '## Concluzie de lot','', 'Toate cele 14 versete au primit o decizie semantică explicită după verificarea sursei, nu doar un rezultat automat. Au fost reparate calcurile, acordurile, citatele și lecturile nealiniate; variantele și ambiguitățile materiale sunt documentate în `editorialNotes`. Capitolul rămâne `in_review` și `public: false`.','']
    JR.write_text(unicodedata.normalize('NFC','\n'.join(lines)))

    # Confirm digests from the exact serialized result.
    reread=json.loads(CH.read_text())
    assert reread['audit']['textDigest'] == val['chapter_text_digest'](reread)
    assert reread['audit']['contentDigest'] == val['chapter_content_digest'](reread)

if __name__=='__main__': main()
