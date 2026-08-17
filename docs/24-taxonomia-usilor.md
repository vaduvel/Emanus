# Taxonomia ușilor — de la două sute de dureri la zece camere

Amendament la `Emanus_arhitectura_rutare_portare_usi_FINAL.md`, care este document canonic închis și cere ca orice schimbare ulterioară să vină prin amendament explicit, cu dovadă de cod sau decizie editorială nouă. Aceasta este o decizie editorială nouă.

Documentul canonic presupune cele 31 de uși ca dat. Nu explică ce se întâmplă când lista durerilor omenești este pusă pe masă întreagă: peste două sute de formulări, strânse din taxonomiile de consiliere ortodoxe și catolice românești, din documentele despre familie și din felul în care oamenii chiar scriu atunci când caută ajutor. Amendamentul acesta răspunde la o singură întrebare: **cum alege omul.**

---

## 1. Răspunsul scurt

Nu alege din două sute. Nu vede niciodată două sute.

Numărul de etichete, numărul de uși și numărul de drumuri sunt trei lucruri diferite, iar amestecarea lor este singurul motiv pentru care problema pare de nerezolvat.

| Nivel | Ce este | Câte | Cost |
| --- | --- | --- | --- |
| Etichetă | Cuvintele în care omul își numește durerea | 200+ | Aproape zero |
| Ușă | O intrare care schimbă conținutul primit | ~35 | Mic |
| Drum | O secvență de lecții | ~14 | Mare |
| Cameră | Gruparea vizibilă pe ecran | 10 | Mic |

Două sute de etichete nu înseamnă două sute de cursuri. Înseamnă un dicționar.

---

## 2. Cele cinci feluri de lucruri din listă

Lista durerilor nu conține un singur fel de lucru. Conține cinci, amestecate. Fiecare fel merge în altă parte, iar aceasta este observația care face restul posibil.

| Fel | Ce este | Unde merge | Exemple din listă |
| --- | --- | --- | --- |
| **Rană** | Ce doare înăuntru | Ușă în Poartă | rușine, vinovăție, anxietate, deznădejde, singurătate, mânie, îndoială |
| **Situație** | Împrejurare, nu rană | Intrare contextuală într-o ușă care există | șomaj, văduvie, infertilitate, părinți plecați, copil bolnav, pensionare, lipsa locuinței |
| **Robie** | Comportament repetat | O ușă cu întrebare de clarificare | alcool, droguri, jocuri de noroc, pornografie, internet |
| **Siguranță** | Pericol prezent | Canal separat, evaluat înaintea rutării | violență domestică, abuz, neglijare, trafic, suicid |
| **Întrebare** | Cerere de informație | Biblioteca și peretele de rugăciune | „ce spune Biblia despre…”, „rugăciune pentru bolnav”, „cum să mă rog” |

### Situația nu este drum

Aceasta este partea contraintuitivă și partea care salvează proiectul de la două sute de cursuri.

Șomajul nu are nevoie de un curs despre șomaj. El produce răni care au deja unde să meargă: frica de viitor, rușinea celui care nu-și mai ține casa, pierderea rostului. Infertilitatea produce doliu, întrebarea „de ce a permis” și rușine. Văduvia produce doliu și singurătate. Ce cere situația nu este un traseu propriu, ci **o intrare care o numește cu voce tare**, ca omul să știe că a fost recunoscut, și apoi lecțiile care i se potrivesc.

Regula: o situație primește etichetă și intrare contextuală. Primește drum propriu numai dacă lecțiile chiar diferă.

---

## 3. Regula care naște o ușă

O ușă se naște doar când **schimbă conținutul primit**. Trei cazuri, în ordinea costului:

1. **Același conținut, aceeași ordine** → o singură ușă, mai multe etichete. „Mă simt vinovat”, „am făcut ceva grav” și „mi-e rușine să mă spovedesc” sunt aceeași ușă cu trei nume.
2. **Același bazin de lecții, altă ordine** → uși diferite, același drum. Este tiparul deja adoptat în decizia 9 pentru doliu, boală și „de ce a permis”: un singur `path_suferinta`, trei secvențe.
3. **Conținut cu adevărat nou** → drum nou. Doar aici se cheltuiește efort editorial.

Orice ușă propusă trece prin întrebarea: *ce lecție primește omul acesta și nu o primește altcineva?* Dacă răspunsul este „aceleași lecții, dar simte că e despre el”, atunci răspunsul corect este o etichetă plus o intrare contextuală, nu o ușă nouă.

---

## 4. Cele trei straturi de alegere

**Stratul 1 — camerele.** Maximum zece plăci pe un ecran. Omul nu-și citește diagnosticul, își recunoaște **minciuna**. „Sunt prea murdar pentru El” este recunoscut de cineva care a avortat, de cineva care a înșelat și de cineva care se uită la pornografie: trei dureri diferite, aceeași minciună. Aici stă puterea camerei și motivul pentru care gruparea se face după minciună, nu după subiect. O grupare pe subiecte ar fi dat exact lista de două sute.

**Stratul 2 — ușile comune.** Cele marcate `common: true`, direct pe primul ecran, fără intrare în cameră. Aproximativ zece, alese după frecvență, nu după gravitate.

**Stratul 3 — scrisul liber.** Aici încap toate cele două sute. „Nu mai am chef de nimic”, „de ce mă simt gol”, „nu mai pot” nu devin uși, devin **sinonime** pe uși care există. Aceasta este singura piesă de cod pe care o cere tot amendamentul: un câmp `aliases: string[]` pe `Door`, plus potrivire simplă pe text normalizat.

**Al doilea mod de intrare, peste aceleași uși.** „Am nevoie să…” în loc de „Mă doare…”, pentru omul care nu vrea să-și numească rana. Cele opt formulări din listă cad pe cinci drumuri care există deja:

| „Am nevoie să…” | Drum |
| --- | --- |
| știu că Dumnezeu este aproape | `path_aproape` |
| știu dacă mă mai iartă | `path_acasa` |
| înțeleg de ce a permis | `path_suferinta` |
| ies dintr-o robie | `path_schimbare` |
| am speranță după pierdere | `path_suferinta` |
| știu cine este Iisus | `path_temelie` |
| revin după ce am căzut | `path_acasa` |
| învăț să mă rog | Biblioteca — nu este rană |

Șapte din opt cad pe drumuri existente. A opta nu este durere. Aceasta este dovada că arhitectura ține.

---

## 5. Cele zece camere

Opt există în cod. Două se adaugă prin acest amendament.

| Cameră | Minciuna | Acoperă | Stare |
| --- | --- | --- | --- |
| c1 | Sunt prea murdar pentru El. | vinovăție, rușine, păcate ascunse, iertarea primită | există |
| c2 | Dacă era bun, nu s-ar fi întâmplat. | doliu, boală, moarte, „de ce a permis”, neiertare | există |
| c3 | Poate e doar o poveste. | îndoială, criză de credință, Biblia, alte credințe | există |
| c4 | Am rămas singur pe drum. | uscăciune, rugăciune fără răspuns, Dumnezeu pare departe | există |
| c5 | Sunt defect, asta sunt. | dependențe, recăderi, mânie | există |
| c6 | Mă iubește cât de bun sunt. | legalism, obișnuință, frica de pedeapsă, epuizare în slujire | există |
| c7 | Nimeni nu înțelege și nimănui nu-i pasă. | singurătate, respingere, rană în biserică, nou-veniți | există |
| c8 | Dacă aș avea destulă credință, aș fi bine. | anxietate, tristețe, deznădejde | există |
| **c9** | **Cu ei nu se mai poate.** | căsnicie, părinte–copil, bunici, conflict, infidelitate suferită, părinți vârstnici | **nouă** |
| **c10** | **Valorez cât aduc în casă.** | șomaj, datorii, nesiguranță, migrație pentru muncă, familii despărțite | **nouă** |

### De ce c9 și c10, și de ce nu mai multe

Din cele zece grupe propuse editorial, șase erau deja camerele noastre sub alt nume, una fusese omisă din propunere (c6, harul), două nu sunt camere, iar două lipseau cu adevărat.

**c9 — relațiile apropiate.** Este cea mai mare gaură. Astăzi avem doar `divort`, ca drum fără cameră, și `familie_respinge` în c7. Nu avem nimic pentru omul care mai are relația, dar relația doare: soți care sunt străini în aceeași casă, părinți ai unui copil care s-a îndepărtat, copii adulți cu părinți îmbătrâniți. c7 este despre lipsa oamenilor; c9 este despre oamenii pe care îi ai.

**c10 — muncă, bani, migrație.** Nu avem absolut nimic, iar „părinți plecați la muncă în străinătate” este probabil cea mai românească durere din toată lista. Minciuna „valorez cât aduc în casă” este perechea socială a lui c6 („mă iubește cât de bun sunt”): una atacă valoarea înaintea lui Dumnezeu, cealaltă înaintea alor tăi.

**Ce nu devine cameră.** *Abuz și siguranță* nu este cameră, pentru că nu se alege niciodată dintr-o listă de dureri; decizia 5 spune că siguranța se evaluează înaintea rutării. *Etapele vieții* nu este cameră, pentru că nu este rană; aparține categoriilor de vârstă și Bibliotecii, conform deciziei 2.

---

## 6. Ușile noi și mutările

### c9 — Cu ei nu se mai poate

Drum nou: `path_legatura`, șapte lecții.

| Ușă | Etichetă | Observație |
| --- | --- | --- |
| `casnicie_rece` | „Suntem străini în aceeași casă” | `common: true` |
| `inselat` | „Am fost înșelat” | ușa-pereche cerută de documentul canonic, punctul 1 |
| `conflict_familie` | „Nu ne mai vorbim” | acoperă și conflictul cu prietenii sau colegii |
| `copil_departe` | „Copilul meu s-a îndepărtat” | |
| `crestere_copii` | „Nu știu cum să-l cresc” | |
| `parinti_varstnici` | „Ai mei au îmbătrânit și eu nu mai pot” | |

Se mută în c9: **`divort`**, care astăzi poartă `roomId: "c2"` din motive istorice, deși are drum propriu.

Rămâne în c1: **`infidelitate`**, pentru că acolo rana principală este rușinea celui care a făcut-o. `inselat` este cealaltă persoană, și de aceea sunt două uși, nu una.

Rămâne în c7: **`familie_respinge`**, pentru că acolo rana este respingerea pentru credință, nu relația care se stinge.

### c10 — Valorez cât aduc în casă

Drum nou: `path_paine`, șapte lecții.

| Ușă | Etichetă | Observație |
| --- | --- | --- |
| `fara_lucru` | „Mi-am pierdut slujba” | `common: true` |
| `datorii` | „Nu mai fac față la bani” | |
| `plecat_departe` | „Muncesc departe de familia mea” | |
| `ramas_acasa` | „Ai mei sunt plecați” | cealaltă parte a migrației |

**Lipsa locuinței nu primește ușă.** Este nevoie practică imediată, nu curs. Merge în canalul de Ajutor, alături de numerele de urgență.

---

## 7. Maparea listei complete

| Din listă | Fel | Destinație |
| --- | --- | --- |
| căsnicie, dificultăți de cuplu, singurătate în căsnicie | rană | c9 `casnicie_rece` |
| infidelitate, adulter — cel care a făcut-o | rană | c1 `infidelitate` |
| infidelitate, adulter — cel înșelat | rană | c9 `inselat` |
| divorț, separare | rană | c9 `divort` → `path_divort` |
| relația părinte–copil, adolescenți | rană | c9 `copil_departe` |
| dificultăți de educare a copiilor | rană | c9 `crestere_copii` |
| bunici, părinți vârstnici | rană | c9 `parinti_varstnici` |
| conflict cu familia, prietenii, colegii; reconciliere | rană | c9 `conflict_familie` |
| consiliere premaritală | situație | Biblioteca și etapele vieții, nu Poarta |
| anxietate, atacuri de panică, îngrijorare, teama de viitor | rană | c8 `anxietate` |
| depresie, descurajare profundă, „nu mai am chef de viață”, „nu mă mai pot bucura” | rană | c8 `tristete`, cu triaj de siguranță |
| depresie și suicid | siguranță | canal de siguranță, înaintea rutării |
| pierdere, doliu, „cum trec peste moartea cuiva” | rană | c2 `doliu` |
| văduvie | situație | c2 `doliu` + c7 `singuratate`, intrare contextuală |
| boală fizică, „mi-e frică de boală și moarte” | rană | c2 `boala` |
| copil bolnav sau cu nevoi speciale | situație | c2 `boala` + `de_ce_permis`, intrare contextuală |
| infertilitate | situație | c2, secvență de doliu peste `path_suferinta` |
| suferință, „de ce a permis” | rană | c2 `de_ce_permis` |
| vinovăție, pocăință, „am făcut ceva grav”, „mi-e rușine să mă spovedesc” | rană | c1 `rusine` |
| „Dumnezeu mă mai iartă”, „m-am îndepărtat” | rană | c1 `prea_departe` |
| neiertare, „nu pot să iert” | rană | c2 `neiertare` |
| mânie | rană | c5 `furie`, cu triaj de violență |
| alcool, droguri, substanțe | robie | c5 `dependenta` → clarificare |
| jocuri de noroc | robie | c5 `dependenta` → clarificare |
| internet, dependențe digitale | robie | c5 `dependenta` → clarificare |
| pornografie | robie | c1 `pornografie` → două lecții proprii → `path_schimbare` |
| recăderi | rană | c5 `recadere` |
| codependențe | rană | c9 `conflict_familie` + limite |
| criză spirituală, îndoială, pierderea credinței | rană | c3 `indoiala` |
| neînțelegerea Bibliei | rană | c3 `nu_inteleg` |
| „cum citesc Biblia” | întrebare | ușă de mutat din c4 în c3, deblocare imediată |
| uscăciune, rugăciune fără răspuns, „parcă Dumnezeu nu mă mai aude” | rană | c4 `perete`, `uscaciune` |
| „cum să mă apropii de Dumnezeu” | rană | c4 `perete` |
| alte credințe, ocult, new age | rană | c3 `alte_credinte` — depinde de ramura nerevizuită |
| singurătate, lipsa prietenilor | rană | c7 `singuratate` |
| respingere, oameni răniți în biserică | rană | c7 `respins_biserica` |
| nou-veniți fără comunitate | situație | c7 `nou_venit`, intrare scurtă, fără rană presupusă |
| familia respinge pentru credință | rană | c7 `familie_respinge` |
| violență domestică, control, abuz, neglijare, trafic | siguranță | canal de siguranță, niciodată în listă |
| șomaj, „după pierderea serviciului am căzut în deznădejde” | rană | c10 `fara_lucru` |
| datorii, stres și anxietate economică, nesiguranța viitorului | rană | c10 `datorii` |
| părinți plecați la muncă în străinătate | rană | c10 `plecat_departe` și `ramas_acasa` |
| familii despărțite geografic | rană | c10 `plecat_departe` |
| lipsa locuinței | situație | canal de Ajutor, nevoie practică |
| „simt că viața mea este un eșec”, „nu-mi găsesc rostul” | rană | c10 sau c6, după ce spune omul mai departe |
| „mă îndoiesc de toate deciziile” | rană | c8 `anxietate` |
| pensionare, bătrânețe, nașterea copiilor | situație | categoriile de vârstă și Biblioteca |
| „ce spune Biblia despre…” | întrebare | Biblioteca |
| „rugăciune pentru anxietate / familie / bolnav” | întrebare | peretele de rugăciune |
| „cum să mă rog” | întrebare | Biblioteca, `lib_rug_inceput` |

---

## 8. Stratul de sinonime

Câmp nou pe `Door`:

```ts
interface Door {
  // ...
  /** Formulări în care omul își numește durerea. Nu sunt uși. */
  aliases: string[]
}
```

Potrivirea se face pe text normalizat, fără diacritice și fără semne, pe potrivire parțială. Exemple:

- `tristete` → „nu mai am chef de nimic”, „nu mai am chef de viață”, „de ce mă simt gol”, „nu mă mai pot bucura de viață”, „nu mai pot”, „deznădejde”, „depresie”
- `rusine` → „mă simt vinovat”, „am făcut ceva grav”, „mi-e rușine să mă spovedesc”, „păcate ascunse”
- `perete` → „parcă Dumnezeu nu mă mai aude”, „de ce nu răspunde Dumnezeu”, „cum să mă apropii de Dumnezeu”
- `doliu` → „cum trec peste moartea cuiva”, „am pierdut pe cineva”, „văduvie”
- `fara_lucru` → „șomaj”, „mi-am pierdut slujba”, „nu-mi găsesc rostul”, „simt că viața mea este un eșec”

**Două reguli nenegociabile pentru sinonime.**

1. Formulările de pericol — „nu mai vreau să trăiesc”, „mă bate”, „mi-e frică de el”, „vreau să termin cu tot” — **nu se potrivesc niciodată cu o ușă**. Ele deschid canalul de siguranță, conform deciziei 5. Un sinonim care duce un om în pericol într-o lecție este defectul cel mai grav pe care îl poate avea sistemul acesta.
2. Un sinonim nu se adaugă fără să existe ușa și fără ca lecția ei să fi fost citită. Regula este aceeași cu cea scrisă în capul lui `doorEntries.ts`: o trimitere moartă este mai rea decât lipsa ei.

---

## 9. Ce nu este Poartă

- **Siguranța.** Evaluată înaintea rutării, canal separat, răspunsuri efemere prin construcție. Deciziile 5 și 6.
- **Întrebările.** Biblioteca și peretele de rugăciune. Decizia 2: Poarta și Biblioteca rămân produse editoriale distincte, iar niciun curs generic nu se deschide automat după un parcurs de durere.
- **Etapele vieții.** Categoriile de vârstă, care au deja conținut scris în `docs/08`–`docs/13`.
- **Nevoile practice.** Lipsa locuinței, lipsa hranei, actele, adăpostul. Canalul de Ajutor.

---

## 10. Ce conținut nou rezultă

Documentul canonic estimează 22–27 de lecții definitive, o ușă nouă și aproximativ 9 punți. Amendamentul acesta adaugă două camere, deci:

| Sursă | Lecții | Observație |
| --- | --- | --- |
| Documentul canonic, punctele 1–10 | 22–27 | Ușa `inselat` era deja numărată acolo, ca „infidelitate suferită” |
| `path_legatura` (c9) | 7 | Drum nou |
| `path_paine` (c10) | 7 | Drum nou |
| **Total** | **36–41** | plus aproximativ 14 punți, câte una per parcurs |

Cele două drumuri noi nu au sursă pe nicio ramură. Se scriu de la zero, iar `path_legatura` cere revizie pastorală, pentru că atinge căsnicia, unde regula globală este că niciun curs despre reconciliere nu se deschide înaintea siguranței.

---

## 11. Ce nu se schimbă

Toate cele 14 decizii finale din documentul canonic rămân în vigoare. Amendamentul acesta nu reinterpretează niciuna. Adaugă:

15. **Etichetele, ușile, drumurile și camerele sunt patru niveluri distincte.** O durere nouă primește etichetă în mod implicit; primește ușă numai dacă schimbă conținutul; primește drum numai dacă lecțiile chiar nu există.
16. **Situația nu este drum.** O împrejurare se rutează în rănile pe care le produce, printr-o intrare care o numește.
17. **Camerele sunt zece**, grupate după minciună, nu după subiect.
18. **Nicio formulare de pericol nu se potrivește cu o ușă.**
