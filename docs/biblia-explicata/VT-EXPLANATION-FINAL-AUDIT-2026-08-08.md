# Vechiul Testament explicat — audit final al explicațiilor

Data: 2026-08-08

## Verdict

**EXPLANATIONS_APPROVED_FOR_PUBLICATION**

Acest verdict privește **numai stratul explicativ** al Vechiului Testament.

Nu declară traducerea Biblia Emanus terminată și nu folosește stadiul traducerii drept criteriu de adevăr pentru explicații. Pentru verificarea explicațiilor s-a folosit textul biblic de lucru disponibil în repo și sursele biblice/editoriale deja stabilite de proiect. Textul biblic afișat poate fi înlocuit ulterior cu Biblia Emanus fără refacerea review-ului explicativ, atât timp cât referințele și versificația folosite de explicație rămân compatibile.

Review-ul final consemnat aici este **review editorial AI**, nu este prezentat drept review uman.

## Acoperire

- 39 / 39 de cărți canonice VT au strat explicativ complet.
- 929 / 929 de capitole canonice sunt reprezentate în catalogul explicativ.
- 10 cărți folosesc formatul `legacy-full`.
- 29 de cărți folosesc formatul `full-overlay`, total 637 de capitole overlay.
- Cele 29 de overlay-uri finale sunt `coverageMode = full` și `status = published` la nivelul **explicației**.
- `VT_EXPLAINED_COVERAGE` marchează 39 / 39 de cărți ca `published` la nivelul explicației.

## Separarea obligatorie: explicație vs. text biblic

Aprobarea explicației nu deschide automat un text biblic provizoriu în reader.

`overlayBibleBooks.ts` aplică regula:

- explicație `published` + text `biblia-emanus` → capitolul poate fi `published` în reader;
- explicație `published` + text `temporary-editorial` → capitolul rămâne `in_review` în reader;
- când textul de lucru este înlocuit cu Biblia Emanus, explicația deja aprobată nu cere un nou review doctrinar doar din cauza schimbării traducerii.

Prin urmare, **traducerea nu este blocker al review-ului explicației**, dar poate rămâne un gate separat pentru afișarea publică a textului biblic asociat.

## Regula editorială finală

1. Expunerea din materialul editorial principal poate fi folosită acolo unde dezvoltă pasajul, dar nu are autoritate peste textul biblic.
2. Explicația poate fi completată sau corectată prin exegeză canonică verificată atunci când este necesar pentru precizie, context sau pentru a evita o concluzie greșită.
3. Când sursa doctrinară nu dezvoltă un pasaj și nu există nevoie de dezvoltare suplimentară, se folosește `textual-overview`: explicație directă a textului, fără doctrină, aplicație pastorală sau studiu lexical inventat.
4. `canonical-exegesis` este permisă când afirmația este verificată în textul biblic, în trimiteri canonice și, unde este relevant, în WLC-OSHB.
5. Interpretările disputate sunt etichetate ca interpretări. Sensul istoric/literar explicit nu este înlocuit de tipologie sau schemă doctrinară.
6. Cititorul primește explicația direct. Numele autorilor moderni, transcriptul, ancorele și provenance-ul editorial rămân interne.
7. Textul biblic nu se modifică în review-urile de explicație.

## Proveniența celor 10 cărți legacy

Blocker-ul vechi privind lipsa provenienței nu mai este actual.

`check-vt-legacy-provenance` cere pentru fiecare unitate din cele 10 cărți legacy:

- `explanationKind` explicit: `exposition` sau `textual-overview`;
- `explanationSource` intern;
- niciun `forYourHeart` sau studiu lexical inventat într-un `textual-overview`;
- `wordSource = WLC-OSHB` pentru notele ebraice.

Helper-ele legacy normalizează aceste câmpuri, iar review-urile dedicate au prioritate acolo unde un pasaj a cerut corecții.

## Zone cu risc ridicat revizuite

### Violență și război

Au fost verificate și/sau rescrise explicit:

- Numeri 31 — captive, copii, război și limita aplicației pentru Noul Legământ;
- Iosua 6 — Ierihon, `herem`, Rahab, judecată și interdicția folosirii textului ca mandat modern de violență;
- Iosua 7 — Acan, solidaritate de legământ și imposibilitatea de a inventa vina familiei lui;
- Iosua 10–11 — campaniile din sud/nord, limbajul de cucerire, împietrirea și diferența dintre războiul istoric și lupta creștinului;
- Judecători și cărțile istorice — review-uri dedicate pentru conducere, abuz și violență;
- Psalmii imprecaționali — păstrarea strigătului după dreptate fără transformarea lui în permis de răzbunare personală.

### Robie, putere și legi dificile

- Exod 21 — revizuit integral ca explicație: robul evreu este delimitat de alte forme de servitute; Exod 21:21 nu mai este redat fals; răscumpărarea din 21:30 este inclusă; `onah`, lex talionis și răpirea de persoane sunt tratate fără supralicitare.
- Levitic 25 — Jubileul nu mai este confundat cu anularea generică a tuturor datoriilor; vv. 44–46 sunt prezentate fără cosmetizare ca permisiune pentru sclavia permanentă a străinilor în acea ordine juridică; lectura creștină este separată de sensul juridic imediat.
- Deuteronom 22 — procedurile sexuale antice nu sunt folosite pentru a învinovăți victime moderne; lipsa strigătului nu este echivalată cu consimțământul.

### Sexualitate și abuz

- Levitic 18 și 20 păstrează evaluarea morală a textului, dar separă sancțiunile civile ale Israelului de disciplina bisericii.
- Geneza 38 nu transformă păcatul lui Onan într-o doctrină generică despre contracepție și nu inventează motive/culpe pe care narațiunea nu le afirmă.
- Cântarea Cântărilor păstrează diferența dintre poezie erotică, context și aplicația spirituală.

### Suveranitate, ocult și judecată

- 1 Samuel 16 — duhul vătămător «de la DOMNUL» este explicat fără a-L face pe Dumnezeu autor moral al păcatului și fără diagnosticarea suferinței psihice moderne ca demonizare.
- 1 Samuel 28 — naratorul îl numește Samuel; episodul nu legitimează necromanția și nu este transformat într-un tratat complet despre starea morților.
- 2 Samuel 24 — mânia DOMNULUI, agentul advers și răspunderea lui David sunt ținute împreună; recensământul nu este declarat păcat în orice context.
- 1 Împărați 22 — judecata prin duhul de minciună nu Îl transformă pe Dumnezeu în mincinos și nu este folosită pentru a eticheta arbitrar adversarii drept «înșelați de Dumnezeu».

### Profeție, Mesia și escatologie

Au fost revizuite explicit, între altele:

- Psalmii 22, 32, 51, 110;
- Isaia 7, 9, 10–11, 14, 45, 53;
- Ieremia 23, 29, 31;
- Ezechiel 14, 16, 18, 28, 36, 43, 47, 48;
- Daniel 3, 4, 6, 7, 9, 10, 12;
- Iov 29, 31, 38, 40, 42.

Tipologia și schemele escatologice nu sunt prezentate ca sens lexical obligatoriu când textul nu le afirmă direct.

## Protecția copy-ului cititorului

`publicationBible.ts`:

- transformă atribuirea nominală în formulare neutră și gramaticală, nu doar șterge numele;
- elimină `explanationSource` înainte de afișare;
- curăță limbajul intern despre transcript/sursa de cercetare;
- respinge la runtime numele moderne interzise rămase în câmpurile vizibile;
- verifică titlu, rezumat, contexte, rugăciune, heading, `teaching`, `forYourHeart` și sensurile lexicale.

Regula produsului este: **provenance intern, explicație directă în UI**.

## Gate-uri tehnice

`check:vt-explained` trebuie să confirme:

- 39 / 39 cărți cu explicația `published`;
- 10 `legacy-full` + 29 `full-overlay`;
- 637 / 637 capitole overlay cu acoperire completă;
- statusul textului biblic separat de statusul explicației.

`check:vt-publication` trebuie să confirme:

- 29 / 29 overlay-uri finale `published` la nivel explicativ;
- 39 / 39 cărți și 929 / 929 capitole prezente în catalog;
- textele `temporary-editorial` rămân `in_review` în reader chiar dacă explicația este aprobată;
- `textual-overview` fără doctrină/aplicație/lexic inventat;
- provenance intern valid pentru `exposition` și `canonical-exegesis`;
- note ebraice WLC-OSHB;
- zero atribuire nominală și zero limbaj de transcript în copy-ul public.

`check:vt-legacy-provenance`, typecheck și build rămân obligatorii înainte de merge/release.

## Starea gate-urilor în acest audit

La momentul acestui update, GitHub nu raporta încă workflow-uri asociate ultimului commit de review. Mediul local folosit pentru verificare nu a putut clona repo-ul din cauza lipsei de rezoluție DNS către GitHub. Prin urmare **nu declarăm CI verde fără dovadă**.

Aceasta este o stare de verificare tehnică, nu un blocker editorial de conținut.

## Concluzie

**Stratul explicativ VT este aprobat editorial pentru publicare: 39 / 39 cărți.**

Textul biblic canonic rămâne un flux separat. Cărțile care folosesc încă text provizoriu rămân închise public până când acel text este înlocuit/aprobat, fără a pierde aprobarea explicațiilor.

Merge/release se face numai după trecerea gate-urilor automate și rezolvarea eventualelor conflicte de integrare; nu se presupune că acestea au trecut doar din verdictul editorial.
