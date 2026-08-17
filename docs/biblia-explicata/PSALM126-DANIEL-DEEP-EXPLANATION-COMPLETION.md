# Biblia explicată — aprofundare Psalmul 126–Daniel

## Domeniu

Acest checkpoint acoperă continuarea editorială începută după Psalmul 125 și duce explicația până la finalul cărții Daniel:

- Psalmii 126–150 — 25 capitole
- Proverbele — 31 capitole
- Eclesiastul — 12 capitole
- Cântarea Cântărilor — 8 capitole
- Isaia — 66 capitole
- Ieremia — 52 capitole
- Plângerile lui Ieremia — 5 capitole
- Ezechiel — 48 capitole
- Daniel — 12 capitole

**Total segment aprofundat: 259 capitole.**

## Regula editorială

1. Expunerea Zac Poonen rămâne prioritară oriunde transcriptul tratează pasajul.
2. Un interval pe care Poonen nu îl dezvoltă primește numai `textual-overview` Emanus, derivat din pasajul biblic, fără doctrină nouă atribuită lui Poonen.
3. Nu se inventează tipologie, aplicație pastorală sau studiu lexical pentru a umple golurile transcriptului.
4. Capitolele aprofundate sunt împărțite în unități de sens mai mici; un singur rezumat generic al întregului capitol nu este considerat explicație finală pentru acest segment.
5. Unitatea textuală trebuie să acopere intervale continue de versete, fără goluri sau suprapuneri.

## Protecții de interpretare

### Violență și judecată

Textele de război, judecată, imprecație și execuție sunt descrise în contextul lor literar și istoric. Ele nu sunt transformate în permisiuni moderne pentru răzbunare privată, violență religioasă sau vătămarea civililor.

Această regulă este explicită în special pentru Psalmii 137 și 149, Isaia 13 și 34, Ieremia 18–21 și oracolele împotriva națiunilor, Ezechiel 9, 16, 23, 38–39.

### Sexualitate și abuz

Cântarea Cântărilor este tratată în primul rând în sensul ei literar conjugal. Atracția și intimitatea sunt reciproce și nu sunt transformate în posesivitate sau drept unilateral asupra trupului celuilalt.

Metaforele sexualizate de judecată din Ezechiel 16 și 23 descriu infidelitatea Ierusalimului/Samariei în alegoria profetică și nu justifică abuzul, violența sexuală sau rușinarea victimelor.

### Profeție și escatologie

Unde textul oferă identificări explicite, acestea sunt păstrate. Unde există mai multe modele creștine de interpretare, explicația distinge textul de schema interpretativă.

Exemple:

- Isaia 7 — contextul imediat al lui Ahaz este păstrat; folosirea creștină din Matei este menționată distinct.
- Isaia 14 — referentul imediat este regele Babilonului; lectura despre mândria satanică este tratată ca analogie/tradiție secundară, nu ca înlocuitor al contextului.
- Ezechiel 28 — lamentația rămâne adresată regelui Tirului; o lectură satanică suplimentară nu este prezentată drept singurul sens.
- Ezechiel 38 — identificarea lui Gog cu state moderne nu este declarată certitudine.
- Daniel 8 — identificările Medo-Persia și Grecia din explicația îngerului sunt păstrate; Antioh IV este cadrul istoric principal pentru multe detalii ulterioare.
- Daniel 11 — conflictul Ptolemei–Seleucizi și profanarea asociată lui Antioh IV sunt separate de extensiile escatologice disputate; o singură schemă a versetelor 36–45 nu este declarată doctrină Emanus.

## Completări în capitole Poonen parțiale

Când transcriptul Poonen tratează numai o parte din capitol, unitățile lui sunt păstrate și doar intervalele rămase primesc explicație textuală Emanus.

Cazuri tratate explicit în acest val:

- Proverbe 6 — Poonen: 20–35; completare Emanus: 1–19.
- Ezechiel 33 — Poonen: 1–20; completare Emanus: 21–33.
- Ezechiel 36 — Poonen: 22–38; completare Emanus: 1–21.
- Ezechiel 37 — Poonen: 1–14; completare Emanus: 15–28.
- Ezechiel 47 — Poonen: 1–12; completare Emanus: 13–23.

## Porți automate

`sectionedPsalm()` și `sectionedTextualChapter()` validează continuitatea intervalelor în noile explicații.

`scripts/check-vt-deep-explanations.mjs` verifică segmentul Psalmii 126–150 + Proverbe–Daniel și respinge intervalele care au rămas doar pe rezumatul generic al capitolului.

Workflow-ul `VT Deep Explanation Completion` rulează build-ul shared, poarta de profunzime și `check:vt-explained`. Pentru Proverbe 6, workflow-ul conectează completarea 1–19 înainte de validare și o comite numai dacă toate porțile trec.

## Stare de publicare

Acest checkpoint descrie **profunzimea și acoperirea explicației**, nu aprobarea editorială umană pentru publicare. Statusurile existente `in_review` și protecțiile de producție nu sunt ridicate de această lucrare.

PR #85 rămâne draft și nu se face merge în `main` prin acest checkpoint.
