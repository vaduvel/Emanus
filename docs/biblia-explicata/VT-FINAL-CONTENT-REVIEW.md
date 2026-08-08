# Vechiul Testament — review final de conținut

Data: 2026-08-08

## Verdict

**EXPLANATION_LAYER_APPROVED**

Acest document consemnează review-ul stratului **Biblia explicată VT**. Traducerea Biblia Emanus este un flux separat și nu mai este folosită ca blocker pentru aprobarea explicațiilor.

Acoperirea explicativă este completă:

- 39 / 39 cărți canonice VT;
- 929 / 929 capitole în catalogul explicativ;
- 10 `legacy-full`;
- 29 `full-overlay`, total 637 / 637 capitole overlay.

Statusul `published` folosit de registry-ul explicației înseamnă **explicație aprobată editorial**. El nu obligă reader-ul să afișeze un text biblic care este încă `temporary-editorial`.

## 1. Ce intră și ce nu intră în verdict

### Intră

- fidelitatea explicației față de pasajul biblic folosit pentru lucru;
- separarea sensului explicit de tipologie și interpretări disputate;
- coerența canonică;
- protecțiile pentru violență, abuz, sexualitate, sclavie, ocult și profeție;
- provenance intern al explicației;
- note lexicale ebraice numai cu WLC-OSHB;
- copy public fără atribuirea nominală a sursei editoriale.

### Nu intră

- aprobarea finală a traducerii Biblia Emanus;
- fresh re-auditul textului canonic;
- promovarea fișierelor de traducere;
- reconcilierea source-lock/WLC pentru fluxul de traducere.

Explicațiile pot fi verificate pe textul biblic de lucru și apoi păstrate când textul afișat este înlocuit cu Biblia Emanus.

## 2. Blocker-ul legacy este închis

Cele 10 cărți `legacy-full` folosesc acum normalizare de provenance la nivel de unitate.

Gate-ul `check-vt-legacy-provenance` cere:

- `explanationKind`;
- `explanationSource` intern;
- lipsa aplicației și a lexicului inventat în `textual-overview`;
- WLC-OSHB pentru notele ebraice.

Prin urmare vechiul verdict conform căruia cele 10 cărți nu pot demonstra proveniența nu mai descrie starea actuală a codului.

## 3. Corecții doctrinare și exegetice finale

Pe lângă review-urile deja existente pentru Geneza, Deuteronom, Numeri, Samuel, Împărați, Psalmii, profeții mari și cărțile sapiențiale, această trecere finală a identificat și reparat următoarele zone:

### Exod 21

- regula celor șase ani este delimitată la robul evreu din cazul descris;
- nu se mai afirmă fals că toate formele antice de servitute aveau aici un sfârșit automat;
- Exod 21:21 este explicat conform formulării despre statutul economic al robului, nu printr-o parafrază inventată;
- `onah` este tratat prudent ca drept/datorie conjugală, fără definiții moderne introduse în lexic;
- răpirea de persoane este tratată ca infracțiune capitală fără a fi declarată identică în toate privințele cu omorul;
- 21:30, prețul de răscumpărare al proprietarului boului cunoscut ca periculos, nu mai este omis;
- cei treizeci de sicli sunt prezentați drept rezonanță canonică, nu profeție explicită inventată despre trădarea lui Isus.

### Levitic 25

- Jubileul nu mai este confundat cu remiterea generică a tuturor datoriilor; Deuteronom 15 este păstrat separat;
- nu se mai inventează că surplusul anului al șaselea trebuia obligatoriu păstrat și nu putea fi vândut;
- vv. 44–46 sunt prezentate direct: legea permite cumpărarea, moștenirea și slujirea permanentă a robilor străini;
- această permisiune nu este rescrisă ca simplă servitute temporară și nici folosită pentru justificarea sclaviei moderne;
- fraternitatea în Hristos și textele Noului Testament sunt prezentate ca lectură canonică ulterioară, nu ca traducere alternativă a legii vechi.

### Iosua 6, 7, 10, 11

- judecata Canaanului nu este redusă la o analogie medicală care ar rezolva automat toate întrebările morale;
- Rahab, Deuteronom 9 și exilul ulterior al Israelului limitează lectura de superioritate etnică;
- războiul Canaanului nu devine mandat pentru violență religioasă creștină;
- familia lui Acan nu este declarată nici inocentă, nici complice fără afirmația textului; tensiunea cu Deuteronom 24:16 este recunoscută;
- «toată țara» și «odihna de război» sunt citite împreună cu Iosua 13 și cu teritoriile rămase;
- distrugerea cailor și carelor nu este transformată într-o doctrină anti-tehnologie;
- împietrirea din Iosua 11 este tratată ca judecată divină fără concluzia că Dumnezeu produce arbitrar răul moral în oameni inocenți.

## 4. Zone sensibile deja validate în review-urile dedicate

Sunt păstrate review-urile dedicate pentru, între altele:

- Geneza 38;
- Levitic 18 și 20;
- Numeri 31;
- Deuteronom 20 și 22;
- 1 Samuel 16 și 28;
- 2 Samuel 24;
- 1 Împărați 22;
- Iov 29, 31, 38, 40, 42;
- Psalmii 22, 32, 51, 69, 73, 74, 103, 105, 110;
- Proverbe 3, 22, 23, 31;
- Isaia 7, 9, 10, 11, 14, 45, 53;
- Ieremia 23, 29, 31;
- Ezechiel 14, 16, 18, 28, 36, 43, 47, 48;
- Daniel 3, 4, 6, 7, 9, 10, 12.

## 5. Copy public și provenance

Provenance-ul cu numele autorilor/surselor rămâne intern.

`publicationBible.ts` transformă formulările de atribuire în formulări directe și neutre, elimină `explanationSource` din obiectul public și verifică să nu rămână nume moderne ori limbaj despre transcript în copy-ul cititorului.

Nu ne bazăm numai pe ștergerea numelui, deoarece aceasta putea produce fraze rupte. Formulele sunt neutralizate semantic, de exemplu în termeni precum «Se subliniază că…», «O posibilă lectură…» sau «În această interpretare…».

## 6. Publicarea explicației este separată de text

Cele 29 de overlay-uri finale sunt `published` la nivel explicativ.

Reader-ul aplică separat stadiul textului:

- `biblia-emanus` → poate propaga statusul explicației;
- `temporary-editorial` → capitolul rămâne `in_review` și nu este deschis în producție.

Astfel nu publicăm accidental o traducere provizorie doar pentru că explicația ei este gata.

## 7. Gate-uri obligatorii înainte de merge/release

Verdictul editorial nu înlocuiește CI.

Trebuie să treacă:

1. `check:vt-legacy-provenance`;
2. `check:vt-explained`;
3. `check:vt-publication`;
4. typecheck pentru `@emanus/shared` și aplicațiile afectate;
5. build-ul proiectului;
6. verificările normale ale PR-ului și rezolvarea conflictelor de integrare.

La momentul actual GitHub nu raporta încă workflow-uri pentru ultimul head, iar mediul local nu a putut clona repo-ul din cauza lipsei DNS. Din acest motiv gate-urile nu sunt declarate verzi fără dovadă.

## Concluzie

**Review-ul explicațiilor VT este închis editorial și aprobat: 39 / 39.**

**Traducerea Bibliei nu face parte din acest verdict.** Cărțile cu text biblic provizoriu rămân închise în reader până la înlocuirea textului, dar explicația lor nu mai cere un nou review de conținut doar pentru această înlocuire.
