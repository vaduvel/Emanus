# Vechiul Testament — review final de conținut

Data: 2026-08-08

## Verdict

**BLOCKED_FOR_FULL_PUBLICATION**

Vechiul Testament explicat este complet ca **acoperire explicativă**: 39/39 cărți canonice, Geneza–Maleahi. Acest fapt nu este însă echivalent cu aprobarea finală a traducerii și a doctrinei.

Review-ul final pe conținut a identificat două clase de blocaje reale:

1. traducerea Biblia Emanus nu este încă finală pentru întregul VT în corpusul canonic curent;
2. cele 10 cărți în format `legacy-full` nu păstrează uniform proveniența doctrinară la nivel de unitate, deci nu se poate demonstra pentru fiecare aplicație/studiu lexical dacă vine din sursa editorială aprobată sau dintr-o completare Emanus.

Niciun material explicativ nu este promovat la `published` prin acest review, iar PR-ul rămâne draft și nemerguit.

## 1. Traducere — starea verificată

Canonul protestant VT are 39 cărți / 929 capitole.

Manifestul canonic curent `docs/data/biblia-emanus/manifest.json` conține în VT numai:

- Geneza — 50 capitole;
- Exodul — 40;
- Leviticul — 27;
- Numeri — 36;
- Deuteronomul — 34;
- Iosua — 24;
- Osea — 14.

Total canonic curent: **7/39 cărți, 225/929 capitole**.

Judecători–Daniel existau ca un candidat Biblia Emanus istoric pe ramura `agent/biblia-emanus-ot-and-apocrypha`. Review-ul final nu îl mai tratează automat ca traducere finală doar pentru că vechiul candidat avea `published/public` și câmpuri automate `approved`.

În catalogul de lucru al celor 29 de cărți overlay:

- Osea rămâne `biblia-emanus`;
- Judecători–Daniel sunt `temporary-editorial` până la fresh re-audit;
- Ioel–Maleahi sunt `temporary-editorial` până la promovarea individuală.

Prin urmare: **1/29 carte overlay este în prezent etichetată Biblia Emanus, 28/29 sunt texte editoriale provizorii.** Cele șase cărți Geneza–Iosua sunt gestionate în fluxul legacy separat și există în canonul BE curent.

### De ce a fost retrasă eticheta finală pentru candidatul istoric

O verificare directă a găsit, de exemplu, în candidatul vechi Isaia 53:1 formularea:

`Cine a cunoscut brațul DOMNULUI?`

Aceasta nu păstrează bine ideea ebraică a lui `נִגְלָתָה` — brațul DOMNULUI este **descoperit/revelat cuiva**, nu „cunoscut” de cineva. Faptul că acel capitol purta deja marcaje automate `approved` demonstrează că vechiul status nu este suficient pentru aprobarea finală.

### Drift de sursă

Pipeline-ul fresh-source pentru profeții mici s-a oprit corect deoarece arhiva WLC disponibilă în prezent nu mai are SHA-256-ul pin-uit. Lock-ul nu trebuie actualizat automat. Mai întâi trebuie demonstrat dacă schimbarea este numai de ambalare/metadata sau dacă afectează textul folosit.

## 2. Corecții de traducere făcute în acest review

### Deuteronom 22

- 22:11: `Să nu porți-o haină` → `Să nu porți o haină`;
- digestul textului a fost recalculat după modificare.

### Numeri 31

- 31:3: `îplinească` → `împlinească`;
- 31:28, 37–41: ebraicul `מֶכֶס` (`mekhes`) este redat ca **tribut**, nu `dregătorie/datorie`;
- digestul textului a fost recalculat.

### Levitic 18

- 18:14: `să nu te meargă` → `să nu te apropii`;
- 18:19: `să nu te apropi` → `să nu te apropii`;
- 18:29: acordul plural a fost corectat: `sufletele ... vor fi nimicite`;
- 18:30: `să nu urmați din obiceiurile` → `să nu urmați obiceiurile`;
- digestul textului a fost recalculat.

### Deuteronom 20

Au fost corectate forme românești defecte, între care:

- `să nu te temeți` → `să nu te temi`;
- `Când vă veți merge la luptă` → `Când vă veți apropia de luptă`;
- `să Se luple` → `să lupte`;
- `vorbescă` → `vorbească`;
- `bati` → `bați`;
- `tăieci` / `tazi` → `tai`.

Digestul textului a fost recalculat.

Aceste probleme existau în fișiere care aveau deja review automat `approved`; de aceea o promovare a restului VT pe baza vechilor flag-uri ar fi nejustificată.

## 3. Doctrină — starea verificată

### Cele 29 de cărți overlay

Arhitectura nouă este potrivită pentru publicare după închiderea celorlalte gate-uri:

- unitatea din transcript Poonen/CFC este `exposition` și păstrează sursa;
- când Poonen/CFC nu dezvoltă pasajul, completarea este `textual-overview` Emanus;
- overview-ul textual nu primește doctrină nouă, aplicație pastorală sau studiu lexical inventat;
- interpretările profetice care depășesc afirmația explicită a textului sunt delimitate ca interpretări;
- pasajele despre război, abuz, violență sexuală și captivitate nu sunt transformate în permisiuni moderne pentru rău.

Review-ul a verificat în special zonele cu risc doctrinar ridicat din Psalmi, Cântarea Cântărilor, Isaia, Ieremia, Ezechiel, Daniel și profeții mici și nu a identificat în acest strat o contradicție doctrinară majoră care să ceară rescrierea întregii arhitecturi.

### Cele 10 cărți `legacy-full`

Rămân de reconciliat:

1. Geneza;
2. Exodul;
3. Leviticul;
4. Numeri;
5. Deuteronomul;
6. Iosua;
7. Rut;
8. 1 Samuel;
9. 2 Samuel;
10. 1 Împărați.

Helper-ele vechi nu păstrează uniform `explanationKind` și `explanationSource` la nivel de unitate. În același timp există unități care conțin `forYourHeart`, cross-reference-uri doctrinare și studii ebraice.

Aceasta nu dovedește că toate aceste unități sunt greșite. Dovedește că, în forma curentă, **proveniența doctrinei nu este demonstrabilă conform regulii de release**:

- doctrină/aplicație numai din Poonen/CFC sau sursa editorială explicit aprobată;
- gol de sursă = numai sens textual, fără doctrină/aplicație/lexic inventat.

Exod 21 și Deuteronom 20 sunt exemple concrete de unități legacy cu aplicații și studii lexicale, dar fără trasabilitatea noului model.

## 4. Corecții doctrinare făcute în acest review

### Deuteronom 22

- corectat un termen ebraic greșit în explicație;
- procedura antică privind „semnele fecioriei” nu mai este prezentată ca test medical modern;
- lipsa unui strigăt nu este tratată ca dovadă modernă de consimțământ;
- textul recunoaște că frica, amenințarea, reacția de îngheț sau incapacitatea pot împiedica o victimă să strige;
- Deuteronom 22:28–29 nu este folosit pentru a obliga o victimă modernă să se căsătorească cu agresorul.

### Numeri 31

Capitolul a fost reclasificat editorial ca `textual-overview`:

- uciderea copiilor și a captivilor nu este cosmetizată;
- textul nu este transformat în model pentru război religios modern;
- oamenii numărați în prada de război sunt descriși ca parte a cadrului antic, nu normalizați ca proprietate legitimă astăzi;
- a fost corectată și afirmația matematică despre 1/50 și 1/500: 1/50 este de zece ori mai mare proporțional decât 1/500.

## 5. Condițiile pentru verdict verde

VT poate primi verdict final de publicare numai după:

1. fresh re-audit al traducerii pentru toate cele 39 de cărți și promovarea lor în corpusul canonic curent;
2. reconcilierea driftului WLC/source-lock înainte de noi promovări;
3. normalizarea celor 10 cărți legacy la nivel de unitate cu `explanationKind` + proveniență explicită;
4. eliminarea aplicațiilor pastorale și a studiilor lexicale din orice pasaj legacy pentru care nu există sursă doctrinară aprobată;
5. verificarea din nou a pasajelor cu violență, abuz, sexualitate și profeție după normalizarea provenienței;
6. rerularea completă a validatoarelor de traducere, `check:vt-explained`, `check:vt-publication`, typecheck și build;
7. abia după toate acestea, schimbarea controlată `in_review` → `published`.

## Concluzie

**Acoperirea explicativă VT este terminată: 39/39.**

**Review-ul final de traducere + doctrină NU aprobă încă publicarea integrală.** A identificat și a corectat erori reale, a retras eticheta prea puternică de „Biblia Emanus” de pe candidatul istoric Judecători–Daniel și păstrează materialele explicative sub `in_review` până când traducerea și proveniența doctrinară sunt demonstrate cap-coadă.
