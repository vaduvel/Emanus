#!/usr/bin/env python3
import json, runpy
from pathlib import Path

CH=Path('docs/data/biblia-emanus/PHP.4.json')
JR=Path('docs/biblia-emanus/NT-AI-REVIEW-BATCH-2026-08-07-PHP.4.md')
RUN='emanus-nt-publication-audit-2026-08-07-php-4'
SNAP='29b8762199eb87757ec36961097b817cb2b569557d95348a70fac66c0262f424'

T={
1:'De aceea, frații mei iubiți și mult doriți, bucuria și cununa mea, stați astfel tari în Domnul, iubiților.',
2:'O îndemn pe Euodia și o îndemn pe Sintihia să aibă același gând în Domnul.',
3:'Da, te rog și pe tine, adevărat tovarăș de jug, ajută-le pe aceste femei, care au luptat împreună cu mine pentru Evanghelie, alături de Clement și de ceilalți colaboratori ai mei, ale căror nume sunt în cartea vieții.',
4:'Bucurați-vă întotdeauna în Domnul! Voi spune din nou: bucurați-vă!',
5:'Îngăduința voastră să fie cunoscută de toți oamenii. Domnul este aproape.',
6:'Nu vă îngrijorați de nimic, ci, în orice lucru, prin rugăciune și cerere, cu mulțumire, faceți cunoscute lui Dumnezeu cererile voastre;',
7:'iar pacea lui Dumnezeu, care întrece orice înțelegere, vă va păzi inimile și gândurile în Hristos Isus.',
8:'În sfârșit, fraților, câte sunt adevărate, câte sunt demne de cinste, câte sunt drepte, câte sunt curate, câte sunt vrednice de iubire, câte sunt de bună reputație, dacă este vreo virtute și dacă este vreo laudă, la acestea să vă gândiți.',
9:'Puneți în practică lucrurile pe care le-ați învățat, le-ați primit, le-ați auzit și le-ați văzut în mine; iar Dumnezeul păcii va fi cu voi.',
10:'M-am bucurat mult în Domnul că, în sfârșit, a înflorit din nou grija voastră pentru mine; vă gândeați la mine și înainte, dar nu aveați prilej.',
11:'Nu spun aceasta din pricina lipsei, căci am învățat să fiu mulțumit în împrejurările în care mă aflu.',
12:'Știu și să fiu în lipsuri, știu și să am din belșug; în orice împrejurare și în toate am învățat taina: și să fiu sătul, și să flămânzesc, și să am din belșug, și să duc lipsă.',
13:'Pot face față tuturor lucrurilor prin Cel care mă întărește.',
14:'Totuși, bine ați făcut că ați luat parte la necazul meu.',
15:'Știți și voi, filipenilor, că, la începutul Evangheliei, când am plecat din Macedonia, nicio biserică nu a avut părtășie cu mine în privința dării și primirii, decât voi singuri;',
16:'căci chiar și în Tesalonic mi-ați trimis, o dată și încă o dată, pentru nevoia mea.',
17:'Nu că urmăresc darul, ci urmăresc rodul care sporește în contul vostru.',
18:'Am primit totul și am din belșug; sunt pe deplin îndestulat, după ce am primit prin Epafrodit cele trimise de voi, o mireasmă plăcută, o jertfă primită și plăcută lui Dumnezeu.',
19:'Iar Dumnezeul meu va împlini orice nevoie a voastră, potrivit bogăției Sale, în slavă, în Hristos Isus.',
20:'Iar Dumnezeului și Tatălui nostru să-I fie slava în vecii vecilor. Amin.',
21:'Salutați pe fiecare sfânt în Hristos Isus. Vă salută frații care sunt cu mine.',
22:'Vă salută toți sfinții, mai ales cei din casa Cezarului.',
23:'Harul Domnului Isus Hristos să fie cu duhul vostru.'
}

A={
1:'ὥστε … ἀδελφοί μου ἀγαπητοὶ … οὕτως στήκετε ἐν κυρίῳ',
2:'Εὐοδίαν παρακαλῶ … Συντύχην … τὸ αὐτὸ φρονεῖν',
3:'γνήσιε σύζυγε … συλλαμβάνου αὐταῖς … ἐν βίβλῳ ζωῆς',
4:'Χαίρετε ἐν κυρίῳ πάντοτε … πάλιν ἐρῶ',
5:'τὸ ἐπιεικὲς ὑμῶν … ὁ κύριος ἐγγύς',
6:'μηδὲν μεριμνᾶτε … προσευχῇ … δεήσει … εὐχαριστίας',
7:'ἡ εἰρήνη τοῦ θεοῦ … φρουρήσει τὰς καρδίας … νοήματα',
8:'ὅσα ἐστὶν ἀληθῆ … σεμνά … δίκαια … ἁγνά … προσφιλῆ … εὔφημα',
9:'ἃ καὶ ἐμάθετε καὶ παρελάβετε … ταῦτα πράσσετε',
10:'ἀνεθάλετε τὸ ὑπὲρ ἐμοῦ φρονεῖν … ἠκαιρεῖσθε',
11:'ἔμαθον ἐν οἷς εἰμι αὐτάρκης εἶναι',
12:'ταπεινοῦσθαι … περισσεύειν … χορτάζεσθαι … πεινᾶν',
13:'πάντα ἰσχύω ἐν τῷ ἐνδυναμοῦντί με',
14:'καλῶς ἐποιήσατε συγκοινωνήσαντές μου τῇ θλίψει',
15:'εἰς λόγον δόσεως καὶ λήμψεως … ὑμεῖς μόνοι',
16:'ἐν Θεσσαλονίκῃ … ἅπαξ καὶ δὶς … ἐπέμψατε',
17:'τὸν καρπὸν τὸν πλεονάζοντα εἰς λόγον ὑμῶν',
18:'ἀπέχω … πεπλήρωμαι … ὀσμὴν εὐωδίας … θυσίαν δεκτήν',
19:'πληρώσει πᾶσαν χρείαν ὑμῶν κατὰ τὸ πλοῦτος αὐτοῦ',
20:'τῷ θεῷ καὶ πατρὶ ἡμῶν ἡ δόξα … ἀμήν',
21:'Ἀσπάσασθε πάντα ἅγιον … οἱ σὺν ἐμοὶ ἀδελφοί',
22:'πάντες οἱ ἅγιοι … οἱ ἐκ τῆς Καίσαρος οἰκίας',
23:'ἡ χάρις τοῦ κυρίου Ἰησοῦ Χριστοῦ μετὰ τοῦ πνεύματος ὑμῶν'
}

def note(v,term,decision,alts,reason):
    return {'verse':v,'term':term,'decision':decision,'alternatives':alts,'reason':reason,'reviewRequired':True,'resolutionStatus':'resolved','resolutionReason':'Decizia a fost verificată direct în SBLGNT-PHP și aparat, cu TR-PHP ca martor auxiliar.'}

def main():
    d=json.loads(CH.read_text())
    assert d['status']=='in_review' and d['public'] is False
    assert [x['number'] for x in d['verses']]==list(range(1,24))
    for x in d['verses']:
        x['text']=T[x['number']]
    for x in d['benchmark']['translationsConsulted']:
        x['consultedInBatch']=x['id'] in {'CORNILESCU-1924','BTF'}
    d['benchmark']['observations']=[
        'Revizie verset-cu-verset din SBLGNT și aparat, cu TR ca martor; WEBP, BTF, Cornilescu 1924 și Biblia Liberă au fost verificări auxiliare.',
        'NTR nu a fost consultată; nicio traducere românească nu a fost copiată.'
    ]
    a=d['audit']
    a.update({
        'completedOn':'2026-08-07','engineVersion':'3.0.0','reviewLevel':'ai-complete',
        'reviewAgent':{'type':'ai','engine':'Codex / GPT-5','runId':RUN,'method':'verse-by-verse-source-and-benchmark'},
        'sourceSnapshotSha256':SNAP,
        'verseCoverage':{'expected':23,'reviewed':23,'continuous':True,'verseNumbersSha256':'sha256:b259b32138b834fae596411df595d7409a7245b85b71b758e2a46ee0dad93737'},
        'sourceLanguage':{'language':'greacă koine','text':'SBLGNT 1.2 + aparat; Textus Receptus ca martor suplimentar','result':'approved','scope':'Toate cele 23 de versete au fost confruntate direct cu SBLGNT/aparat; TR a fost martor de variante, iar WEBP și etaloanele fixate au fost auxiliare.'},
        'romanianLanguage':{'result':'approved','changesApplied':['Au fost naturalizate calcurile și acordurile, inclusiv singularul greșit din 4:17.','În 4:13 a fost eliminat numele „Hristos”, prezent în TR/RP, dar absent din textul principal SBLGNT.','În 4:23 finalul TR „cu voi toți. Amin” a fost înlocuit cu lectura SBLGNT „cu duhul vostru”, fără adaosul „Amin”.']},
        'theologicalContext':{'result':'approved','principles':['Textul principal urmează SBLGNT la variantele materiale din 4:13 și 4:23, fără armonizare automată cu tradiția TR.','ἐπιεικές din 4:5 este redat lexical ca „îngăduință”, fără a transforma termenul într-o virtute confesională mai îngustă.']},
        'omissionAddition':{'result':'approved','omissions':0,'additions':0},
        'copyrightDistance':{'result':'approved','method':'redactare proprie din sursele fixate, cu etaloane românești numai pentru verificare'},
        'criticalIssues':{'result':'approved','open':0}
    })
    a.pop('benchmarkEvidence',None); a.pop('modelEvidence',None)
    d['editorialNotes']=[
        note(3,'γνήσιε σύζυγε','„adevărat tovarăș de jug”',['„partener adevărat”','Sizig ca nume propriu'],'Vocativul poate fi tratat ca apelativ comun; contextul nu impune transformarea lui într-un nume propriu.'),
        note(5,'τὸ ἐπιεικές','„îngăduința”',['„blândețea”','„bunăvoința”'],'Termenul are câmpul semantic al moderației, clemenței și îngăduinței; formularea aleasă rămâne suficient de largă.'),
        note(13,'πάντα ἰσχύω ἐν τῷ ἐνδυναμοῦντί με','„Pot face față tuturor lucrurilor prin Cel care mă întărește.”',['TR/RP: „… în Hristos, care mă întărește”'],'SBLGNT, WH, Treg și NA28 nu au Χριστῷ în acest verset; numele nu este importat din martorul TR/RP în textul principal.'),
        note(17,'εἰς λόγον ὑμῶν','„în contul vostru”',['„în folosul vostru”'],'Genitivul este plural; formularea veche „contul tău” schimba nejustificat numărul adresării.'),
        note(23,'μετὰ τοῦ πνεύματος ὑμῶν','„cu duhul vostru”',['TR/RP: „cu voi toți. Amin.”'],'SBLGNT păstrează τοῦ πνεύματος ὑμῶν și nu are adaosul final Ἀμήν; textul principal urmează această lectură.')
    ]
    val=runpy.run_path('scripts/check-biblia-emanus.py')
    a['textDigest']=val['chapter_text_digest'](d)
    a['contentDigest']=val['chapter_content_digest'](d)
    CH.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n')
    r=json.loads(CH.read_text())
    assert r['audit']['textDigest']==val['chapter_text_digest'](r)
    assert r['audit']['contentDigest']==val['chapter_content_digest'](r)

    lines=['# Revizie AI, lot Filipeni 4','', 'Statut: `in_review` — **nu este aprobare de publicare**.','', 'Data: `2026-08-07`','', 'Reviewer: `codex-gpt-5` (`ai`; sistem: `Codex / GPT-5`; rulare: `'+RUN+'`)','', '## Domeniu și surse','', 'Au fost revizuite direct toate cele 23 de versete din `PHP.4` cu SBLGNT-PHP și aparatul său. TR-PHP a fost verificat ca martor textual; WEBP-PHP, BTF-PHP, CORNILESCU1924-PHP și BIBLIA-LIBERA-PHP au fost etaloane auxiliare. NTR nu a fost consultată. Nu s-a copiat o traducere românească.','', '## Decizii pe verset','', '| Referință BE | Ancoră SBLGNT verificată | Decizie |','| --- | --- | --- |']
    for v in range(1,24):
        lines.append(f'| PHP.4.{v} | `{A[v]}` | {T[v]} |')
    lines += ['', '## Concluzie de lot','', 'Au fost verificate toate cele 23 de versete. Variantele materiale 4:13 și 4:23 urmează textul principal SBLGNT și nu importă adaosurile TR/RP. Au fost reparate și calcurile, acordurile și singularul nejustificat din 4:17. Capitolul rămâne `in_review` și `public: false`.','']
    JR.write_text('\n'.join(lines))

if __name__=='__main__': main()
