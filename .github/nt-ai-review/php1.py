#!/usr/bin/env python3
from __future__ import annotations

import json
import runpy
from pathlib import Path

CHAPTER = Path('docs/data/biblia-emanus/PHP.1.json')
JOURNAL = Path('docs/biblia-emanus/NT-AI-REVIEW-BATCH-2026-08-07-PHP.1.md')
RUN_ID = 'emanus-nt-publication-audit-2026-08-07-php-1'
SNAPSHOT_SHA256 = '29b8762199eb87757ec36961097b817cb2b569557d95348a70fac66c0262f424'

TEXT = {
    1: 'Pavel și Timotei, robi ai lui Hristos Isus, către toți sfinții în Hristos Isus care sunt în Filipi, împreună cu supraveghetorii și diaconii:',
    2: 'har vouă și pace de la Dumnezeu, Tatăl nostru, și de la Domnul Isus Hristos.',
    3: 'Îi mulțumesc Dumnezeului meu ori de câte ori îmi amintesc de voi,',
    4: 'întotdeauna, în fiecare rugăciune a mea pentru voi toți, rugându-mă cu bucurie,',
    5: 'pentru părtășia voastră la Evanghelie, din prima zi până acum,',
    6: 'fiind încredințat de aceasta: Cel care a început în voi o lucrare bună o va duce la capăt până în ziua lui Hristos Isus.',
    7: 'Este drept să gândesc astfel despre voi toți, pentru că vă port în inimă, întrucât, atât în lanțurile mele, cât și în apărarea și întărirea Evangheliei, voi toți sunteți părtași împreună cu mine la har.',
    8: 'Căci Dumnezeu îmi este martor cât de mult tânjesc după voi toți cu afecțiunea lui Hristos Isus.',
    9: 'Și mă rog ca dragostea voastră să prisosească tot mai mult în cunoaștere deplină și în orice discernământ,',
    10: 'ca să deosebiți lucrurile care sunt mai bune, pentru a fi curați și fără pricină de poticnire până în ziua lui Hristos,',
    11: 'plini de rodul dreptății care vine prin Isus Hristos, spre slava și lauda lui Dumnezeu.',
    12: 'Vreau să știți, fraților, că lucrurile prin care am trecut au dus mai degrabă la înaintarea Evangheliei,',
    13: 'astfel încât a devenit cunoscut întregului pretoriu și tuturor celorlalți că lanțurile mele sunt legate de Hristos,',
    14: 'iar cei mai mulți dintre frați, încrezători în Domnul datorită lanțurilor mele, îndrăznesc cu atât mai mult să vestească fără teamă cuvântul.',
    15: 'Unii îl vestesc pe Hristos chiar din invidie și rivalitate, iar alții din bunăvoință.',
    16: 'Aceștia din urmă o fac din dragoste, știind că sunt pus aici pentru apărarea Evangheliei;',
    17: 'ceilalți îl vestesc pe Hristos din ambiție egoistă, nu cu gând curat, crezând că îmi vor spori necazul în lanțuri.',
    18: 'Și ce dacă? În orice fel, fie din motive prefăcute, fie în adevăr, Hristos este vestit, iar în aceasta mă bucur. Și mă voi bucura,',
    19: 'căci știu că aceasta va duce la mântuirea mea, prin rugăciunea voastră și prin ajutorul Duhului lui Isus Hristos,',
    20: 'potrivit așteptării mele arzătoare și speranței mele că nu voi fi făcut de rușine în nimic, ci, cu toată îndrăzneala, ca întotdeauna, și acum Hristos va fi preamărit în trupul meu, fie prin viață, fie prin moarte.',
    21: 'Căci pentru mine a trăi este Hristos, iar a muri este câștig.',
    22: 'Dar dacă voi continua să trăiesc în trup, aceasta înseamnă pentru mine o lucrare roditoare; și ce voi alege nu știu.',
    23: 'Sunt constrâns de amândouă: doresc să plec și să fiu împreună cu Hristos, căci aceasta este cu mult mai bine;',
    24: 'dar să rămân în trup este mai necesar pentru voi.',
    25: 'Și, fiind încredințat de aceasta, știu că voi rămâne și voi continua alături de voi toți, pentru înaintarea și bucuria voastră în credință,',
    26: 'pentru ca, prin venirea mea din nou la voi, motivul vostru de laudă în Hristos Isus să prisosească datorită mie.',
    27: 'Numai purtați-vă ca cetățeni într-un chip vrednic de Evanghelia lui Hristos, pentru ca, fie că vin să vă văd, fie că lipsesc, să aud despre voi că stați tari într-un singur duh, luptând împreună, cu un singur suflet, pentru credința Evangheliei,',
    28: 'fără să vă lăsați înspăimântați în nimic de potrivnici. Pentru ei, aceasta este o dovadă a pieirii, iar pentru voi, a mântuirii — și aceasta vine de la Dumnezeu.',
    29: 'Căci vouă vi s-a dăruit, pentru Hristos, nu numai să credeți în El, ci și să suferiți pentru El,',
    30: 'având aceeași luptă pe care ați văzut-o la mine și despre care auziți că o am și acum.',
}


def note(verse: int, term: str, decision: str, alternatives: list[str], reason: str) -> dict:
    return {
        'verse': verse,
        'term': term,
        'decision': decision,
        'alternatives': alternatives,
        'reason': reason,
        'reviewRequired': True,
        'resolutionStatus': 'resolved',
        'resolutionReason': 'SBLGNT-PHP, aparatul și TR-PHP din snapshot au fost confruntate direct; textul principal urmează lectura SBLGNT.',
    }


def main() -> None:
    data = json.loads(CHAPTER.read_text(encoding='utf-8'))
    if data['status'] != 'in_review' or data['public'] is not False:
        raise SystemExit('PHP.1 must remain in_review/public:false')
    if [v['number'] for v in data['verses']] != list(range(1, 31)):
        raise SystemExit('PHP.1 verse numbering changed unexpectedly')

    for verse in data['verses']:
        verse['text'] = TEXT[verse['number']]

    for item in data['benchmark']['translationsConsulted']:
        item['consultedInBatch'] = item['id'] in {'CORNILESCU-1924', 'BTF'}
    data['benchmark']['observations'] = [
        'Textul a fost revizuit direct din SBLGNT; WEBP, BTF, Cornilescu 1924 și Biblia Liberă au fost consultate auxiliar pentru sens și română, fără copierea unei traduceri românești.',
        'Câmpurile consultedInBatch disting etaloanele configurate de cele efectiv confruntate în acest lot; NTR nu a fost consultată.',
    ]

    audit = data['audit']
    audit['completedOn'] = '2026-08-07'
    audit['engineVersion'] = '3.0.0'
    audit['reviewLevel'] = 'ai-complete'
    audit['reviewAgent'] = {
        'type': 'ai',
        'engine': 'Codex / GPT-5',
        'runId': RUN_ID,
        'method': 'verse-by-verse-source-and-benchmark',
    }
    audit['sourceSnapshotSha256'] = SNAPSHOT_SHA256
    audit.pop('benchmarkEvidence', None)
    audit.pop('modelEvidence', None)
    audit['verseCoverage'] = {
        'expected': 30,
        'reviewed': 30,
        'continuous': True,
        'verseNumbersSha256': 'sha256:a8da6dc1099b8b38805d26f04c1e8a49b9d3870506f9586535105a3c3be64fdb',
    }
    audit['sourceLanguage'] = {
        'language': 'greacă koine',
        'text': 'SBLGNT 1.2 + aparat; Textus Receptus ca martor suplimentar',
        'result': 'approved',
        'scope': 'SBLGNT și aparatul au fost confruntate direct verset cu verset; TR a fost verificat ca martor de variante, iar WEBP, BTF, Cornilescu 1924 și Biblia Liberă au fost consultate auxiliar. NTR nu a fost consultată în acest lot.',
    }
    audit['romanianLanguage'] = {
        'result': 'approved',
        'changesApplied': [
            'Au fost corectate ordinea textuală SBLGNT în 1:16–17, acordurile de persoană din 1:24 și 1:30 și formulările românești defecte ori calchiate.',
            'Au fost netezite sintaxa și coeziunea în 1:3–14 și 1:18–28 fără a importa lecturi din etaloanele auxiliare.',
            'Locurile cu variante textuale urmează SBLGNT și nu folosesc automat Textus Receptus sau etaloanele tradiționale drept text principal.',
        ],
    }
    audit['theologicalContext'] = {
        'result': 'approved',
        'principles': [
            'Textul principal urmează SBLGNT și nu importă automat adaosuri sau transpuneri din Textus Receptus.',
            'Termenii teologici au fost redați lexical, fără glosarea confesională a ambiguităților în corpul versetului.',
            'Etaloanele românești au fost folosite numai pentru verificare, după redactarea din sursele fixate.',
        ],
    }
    audit['omissionAddition'] = {'result': 'approved', 'omissions': 0, 'additions': 0}
    audit['copyrightDistance'] = {
        'result': 'approved',
        'method': 'redactare prin revizie directă din SBLGNT, cu WEBP și etaloanele românești numai ca verificare auxiliară; fără copierea unei traduceri românești',
    }
    audit['criticalIssues'] = {'result': 'approved', 'open': 0}

    data['editorialNotes'] = [
        note(1, 'variantă SBLGNT/TR: Χριστοῦ Ἰησοῦ / Ἰησοῦ Χριστοῦ', '„Hristos Isus”', ['TR-PHP inversează ordinea.'], 'Se păstrează ordinea din SBLGNT.'),
        note(5, 'τῆς πρώτης ἡμέρας / omiterea lui τῆς', '„din prima zi”', ['RP/TR omit articolul.'], 'Diferența nu cere o opoziție artificială în română.'),
        note(6, 'Χριστοῦ Ἰησοῦ / Ἰησοῦ Χριστοῦ', '„ziua lui Hristos Isus”', ['WH inversează ordinea.'], 'SBLGNT păstrează Χριστοῦ Ἰησοῦ.'),
        note(8, 'μου / μου ἐστιν și ordinea numelui', '„Dumnezeu îmi este martor … Hristos Isus”', ['TR adaugă ἐστιν și inversează ordinea numelui.'], 'Adaosul și ordinea TR nu sunt importate.'),
        note(11, 'καρπὸν / καρπῶν δικαιοσύνης', '„rodul dreptății”', ['RP/TR au pluralul.'], 'SBLGNT are singularul καρπὸν.'),
        note(14, 'λόγον / λόγον τοῦ θεοῦ', '„să vestească fără teamă cuvântul”', ['WH/Treg și unele etaloane au „cuvântul lui Dumnezeu”.'], 'SBLGNT tipărește numai λόγον.'),
        note(16, 'ordinea SBLGNT 1:16–17 față de TR', '1:16 redă grupul care vestește din dragoste.', ['TR și unele etaloane pun aici grupul din ambiție egoistă.'], 'SBLGNT are ἐξ ἀγάπης și apărarea Evangheliei la 1:16.'),
        note(17, 'ordinea SBLGNT 1:16–17 și ἐγείρειν', '1:17 redă ambiția egoistă și sporirea necazului în lanțuri.', ['TR transpune cele două enunțuri.'], 'Textul este realiniat cu versificarea SBLGNT.'),
        note(18, 'ὅτι / omiterea lui ὅτι', '„În orice fel … Hristos este vestit”', ['RP/TR omit particula.'], 'Structura SBLGNT este păstrată fără diferență lexicală forțată.'),
        note(23, 'γὰρ / omiterea lui γὰρ', '„căci aceasta este cu mult mai bine”', ['RP omite γὰρ.'], 'Conectorul cauzal SBLGNT este redat.'),
        note(25, 'παραμενῶ / συμπαραμενῶ', '„voi continua alături de voi toți”', ['RP/TR au συμπαραμενῶ.'], 'Textul principal urmează παραμενῶ.'),
        note(27, 'ἀκούω / ἀκούσω', '„să aud despre voi”', ['RP/TR au viitorul ἀκούσω.'], 'SBLGNT are ἀκούω.'),
        note(28, 'ἐστὶν αὐτοῖς / αὐτοῖς μέν ἐστιν și ὑμῶν / ὑμῖν', '„Pentru ei … pieirii, iar pentru voi, a mântuirii”', ['RP/TR schimbă ordinea și cazul în a doua expresie.'], 'Se păstrează opoziția SBLGNT.'),
        {
            'verse': 22,
            'term': 'elipsa εἰ δὲ τὸ ζῆν ἐν σαρκί, τοῦτό μοι καρπὸς ἔργου',
            'decision': '„dacă voi continua să trăiesc în trup, aceasta înseamnă pentru mine o lucrare roditoare”',
            'alternatives': ['Construcția greacă este eliptică și admite mai multe punctuații/redări.'],
            'reason': 'Se explicitează minim legătura sintactică dintre viața în trup și rodul lucrării.',
            'reviewRequired': True,
            'resolutionStatus': 'resolved',
            'resolutionReason': 'SBLGNT-PHP 1:22 și martorii auxiliari au fost confruntați; ambiguitatea este consemnată pentru registrul final.',
        },
    ]

    validator = runpy.run_path('scripts/check-biblia-emanus.py')
    audit['textDigest'] = validator['chapter_text_digest'](data)
    audit['contentDigest'] = validator['chapter_content_digest'](data)
    CHAPTER.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    reloaded = json.loads(CHAPTER.read_text(encoding='utf-8'))
    assert reloaded['audit']['textDigest'] == validator['chapter_text_digest'](reloaded)
    assert reloaded['audit']['contentDigest'] == validator['chapter_content_digest'](reloaded)

    decisions = [
        ('1', 'Παῦλος καὶ Τιμόθεος … Χριστοῦ Ἰησοῦ … ἐπισκόποις καὶ διακόνοις', 'Se păstrează salutul, ordinea „Hristos Isus” și cele două slujiri.'),
        ('2', 'χάρις ὑμῖν καὶ εἰρήνη … κυρίου Ἰησοῦ Χριστοῦ', 'Harul și pacea vin de la Tatăl și de la Domnul Isus Hristos.'),
        ('3', 'Εὐχαριστῶ … ἐπὶ πάσῃ τῇ μνείᾳ ὑμῶν', 'Mulțumirea este redată natural ori de câte ori Pavel își amintește de ei.'),
        ('4', 'πάντοτε … ὑπὲρ πάντων ὑμῶν, μετὰ χαρᾶς', 'Rugăciunea pentru toți este făcută cu bucurie.'),
        ('5', 'κοινωνίᾳ ὑμῶν … ἀπὸ τῆς πρώτης ἡμέρας', 'κοινωνία este părtășia lor la Evanghelie din prima zi.'),
        ('6', 'ὁ ἐναρξάμενος … ἐπιτελέσει … Χριστοῦ Ἰησοῦ', 'Lucrarea bună va fi dusă la capăt până în ziua lui Hristos Isus.'),
        ('7', 'ἐν τῇ καρδίᾳ ὑμᾶς … συγκοινωνούς μου τῆς χάριτος', 'Destinatarii sunt purtați în inimă și părtași cu Pavel la har.'),
        ('8', 'μάρτυς γάρ μου ὁ θεός … σπλάγχνοις Χριστοῦ Ἰησοῦ', 'Dumnezeu este martorul dorului exprimat prin afecțiunea lui Hristos.'),
        ('9', 'ἡ ἀγάπη ὑμῶν … ἐπιγνώσει καὶ πάσῃ αἰσθήσει', 'Dragostea trebuie să prisosească în cunoaștere și discernământ.'),
        ('10', 'δοκιμάζειν … τὰ διαφέροντα … εἰλικρινεῖς καὶ ἀπρόσκοποι', 'Se deosebesc lucrurile mai bune pentru curăție și lipsa poticnirii.'),
        ('11', 'καρπὸν δικαιοσύνης … διὰ Ἰησοῦ Χριστοῦ', 'Singularul SBLGNT este păstrat: rodul dreptății.'),
        ('12', 'τὰ κατʼ ἐμὲ … εἰς προκοπὴν τοῦ εὐαγγελίου', 'Împrejurările lui Pavel duc la înaintarea Evangheliei.'),
        ('13', 'δεσμούς μου … ἐν Χριστῷ … πραιτωρίῳ', 'Legătura lanțurilor cu Hristos devine cunoscută în pretoriu.'),
        ('14', 'πεποιθότας τοῖς δεσμοῖς μου … τὸν λόγον λαλεῖν', 'Frații vestesc fără teamă „cuvântul”, fără adaosul variantei.'),
        ('15', 'διὰ φθόνον καὶ ἔριν … διʼ εὐδοκίαν', 'Se păstrează contrastul dintre invidie/rivalitate și bunăvoință.'),
        ('16', 'ἐξ ἀγάπης … εἰς ἀπολογίαν τοῦ εὐαγγελίου κεῖμαι', 'Versetul este realiniat cu SBLGNT: grupul din dragoste.'),
        ('17', 'ἐξ ἐριθείας … οὐχ ἁγνῶς … θλῖψιν ἐγείρειν', 'Versetul este realiniat cu SBLGNT: grupul din ambiție egoistă.'),
        ('18', 'παντὶ τρόπῳ … Χριστὸς καταγγέλλεται … χαρήσομαι', 'Hristos este vestit indiferent de motiv; Pavel se bucură.'),
        ('19', 'ἀποβήσεται εἰς σωτηρίαν … ἐπιχορηγίας τοῦ πνεύματος', 'Mântuirea este legată de rugăciune și ajutorul Duhului.'),
        ('20', 'ἀποκαραδοκίαν … μεγαλυνθήσεται Χριστὸς ἐν τῷ σώματί μου', 'Hristos va fi preamărit în trup, prin viață sau moarte.'),
        ('21', 'τὸ ζῆν Χριστὸς … τὸ ἀποθανεῖν κέρδος', 'Paralelismul este păstrat concis.'),
        ('22', 'τὸ ζῆν ἐν σαρκί … καρπὸς ἔργου', 'Elipsa este desfășurată minim ca viață în trup și lucrare roditoare.'),
        ('23', 'συνέχομαι … ἀναλῦσαι καὶ σὺν Χριστῷ εἶναι', 'Pavel este constrâns între opțiuni și dorește să fie cu Hristos.'),
        ('24', 'ἐπιμένειν ἐν τῇ σαρκὶ … διʼ ὑμᾶς', 'Se repară persoana: rămânerea este necesară „pentru voi”.'),
        ('25', 'μενῶ καὶ παραμενῶ … προκοπὴν καὶ χαρὰν τῆς πίστεως', 'Rămânerea urmărește înaintarea și bucuria lor în credință.'),
        ('26', 'τὸ καύχημα ὑμῶν … παρουσίας πάλιν πρὸς ὑμᾶς', 'Revenirea lui Pavel face să prisosească lauda lor în Hristos.'),
        ('27', 'ἀξίως … πολιτεύεσθε … στήκετε ἐν ἑνὶ πνεύματι', 'πολιτεύεσθε este redat civic: purtare ca cetățeni vrednici.'),
        ('28', 'μὴ πτυρόμενοι … ἔνδειξις ἀπωλείας … σωτηρίας', 'Lipsa fricii este dovadă a pieirii pentru ei și a mântuirii pentru voi.'),
        ('29', 'ὑμῖν ἐχαρίσθη … πιστεύειν … καὶ … πάσχειν', 'Credința și suferința pentru Hristos sunt prezentate ca dar.'),
        ('30', 'τὸν αὐτὸν ἀγῶνα … εἴδετε ἐν ἐμοὶ … ἀκούετε ἐν ἐμοί', 'Se repară pluralul și se păstrează aceeași luptă văzută și auzită la Pavel.'),
    ]
    lines = [
        '# Revizie AI, lot Filipeni 1', '',
        'Statut: `in_review` — **nu este aprobare de publicare**.', '',
        'Data: `2026-08-07`', '',
        'Reviewer: `codex-gpt-5` (`ai`; sistem: `Codex / GPT-5`; rulare:',
        f'`{RUN_ID}`)', '',
        '## Domeniu și surse', '',
        'Au fost revizuite direct toate cele 30 de versete Emanus din `PHP.1`. Textul',
        'principal a fost confruntat verset cu verset cu `SBLGNT-PHP` și aparatul său;',
        '`TR-PHP` a fost verificat ca martor al variantelor. `WEBP-PHP`, `BTF-PHP`,',
        '`CORNILESCU1924-PHP` și `BIBLIA-LIBERA-PHP` au fost consultate numai ca',
        'verificări auxiliare ale sensului și ale românei. Redactarea urmează lectura',
        'SBLGNT, fără copierea unei traduceri românești de referință.', '',
        'NTR nu a fost consultată pentru acest lot. Ea rămâne configurată ca etalon',
        'extern al corpusului, iar câmpurile `consultedInBatch` din capitol consemnează',
        'explicit această limită. Jurnalul nu este registrul final per-verset și nu',
        'promovează niciun verset ori capitol.', '',
        '## Decizii pe verset', '',
        '| Referință BE | Ancoră SBLGNT verificată | Decizie de redactare |',
        '| --- | --- | --- |',
    ]
    lines.extend(f'| PHP.1.{n} | `{anchor}` | {decision} |' for n, anchor, decision in decisions)
    lines += [
        '', '## Concluzie de lot', '',
        'Textul anterior transpunea 1:16–17 după tradiția TR în locul ordinii SBLGNT,',
        'avea schimbări greșite de persoană în 1:24 și 1:30 și mai multe formulări',
        'românești defecte ori calchiate. Toate cele 30 de versete au fost confruntate',
        'direct cu sursele fixate și revizuite; capitolul rămâne `in_review` și',
        '`public: false` până la registrul final de aprobare pentru întregul NT.', '',
    ]
    JOURNAL.write_text('\n'.join(lines), encoding='utf-8')
    print('PHP.1 textDigest:', audit['textDigest'])
    print('PHP.1 contentDigest:', audit['contentDigest'])


if __name__ == '__main__':
    main()
