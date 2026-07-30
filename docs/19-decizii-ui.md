# 19 · Decizii UI/UX

**Statut:** decis · 28 iulie 2026
**Decizia centrală:** tema **light „Marea de cristal”** este baza aplicației. Nu se începe un limbaj vizual nou.

Documentul acesta închide o ambiguitate reală: setul de design al primei iterații era light, aplicația care rulează pe `localhost:5173` era dark teal, iar `apps/web/src/ds/tokens.css` conține un singur set de tokens. De acum, un singur adevăr: light.

---

## 1 · De ce light, și de ce e avantaj competitiv

Nu e o preferință estetică. Sunt trei motive verificabile:

1. **Ne diferențiază.** YouVersion e negru-corporate cu accent roșu. Hallow e violet-mistic. Un fundal crem cald cu teal adânc și aur pe versete arată a scris de om, nu a produs de fabrică.
2. **Lizibilitate pentru publicul real.** O parte importantă din oamenii pe care îi vizăm au peste 40 de ani. Text închis pe fond deschis se citește mai bine, mai ales corp de text lung — și noi livrăm text lung.
3. **Tonul.** Aplicația spune „vino așa cum ești, e lumină aici”. Un ecran negru spune altceva.

Serif-ul pe titluri și pe versete (Fraunces) e cea mai bună decizie din tot setul primei iterații. Rămâne. Inter pentru UI și corp.

---

## 2 · Tokens (sursa de adevăr pentru `ds/tokens.css`)

### Fundaluri și suprafețe
| Token | Valoare | Folosire |
| --- | --- | --- |
| `--bg` | `#f5f9f8` | fundal de ecran |
| `--bg2` | `#eef5f4` | fundal secundar, secțiuni |
| `--surface` | `#ffffff` | carduri |
| `--surface2` | `#f0f7f6` | carduri secundare, câmpuri |
| `--line` | `#dbe8e6` | borduri |
| `--line2` | `#c9dedb` | borduri accentuate, chips |

### Teal
| Token | Valoare | Folosire |
| --- | --- | --- |
| `--teal` | `#0f6b68` | butonul primar, tab activ |
| `--teal-strong` | `#12807b` | capătul gradientului |
| `--teal-soft` | `#e2f1ef` | carduri de accent, chip activ |
| `--teal-ink` | `#0b4e4c` | titluri de secțiune |

Banda de sus (hero) e gradient `140deg, #0d5f5e → #14837c`, cu text `#eaf7f5`.

### Aur — rezervat
| Token | Valoare | Folosire |
| --- | --- | --- |
| `--gold` | `#b3862a` | bordura versetului, butonul „Amin” |
| `--gold-soft` | `#f8f0dc` | fundal Ebenezer, memorie |

**Regulă:** aurul nu e culoare decorativă. Marchează două lucruri: **Scriptura** și **ce a spus omul și a fost păstrat** (Ebenezer, memoria). Nimic altceva nu are voie să fie auriu.

### Text
| Token | Valoare |
| --- | --- |
| `--text` | `#13302e` |
| `--text-body` | `#33534f` |
| `--muted` | `#6c8b88` |

### Excepții de paletă — exact două
| Context | Culoare | Motiv |
| --- | --- | --- |
| Ecranul de criză | teracotă `#b4544f`, gradient `#8c4a3c → #b4544f`, fundal moale `#fbeceb` | pe crem, ecranul de criză arăta prea calm pentru ce e |
| Modul noapte | aproape negru `#050f10`, suprafață `#0a1a1a`, linie `#16302e`, text `#a8d6d0` | trecerea de la crem la negru la 2 dimineața nu e inconsecvență, e mesaj |

Nicio a treia excepție nu se adaugă fără o decizie scrisă aici.

### Formă
- Raze: carduri `16px`, carduri mici `13–14px`, butoane `12px`, chips `20px`, telefon `30px`
- Umbre: `0 3px 10px rgba(16,66,64,.045)` pe carduri; `0 10px 26px rgba(16,66,64,.10)` doar pe containere mari
- Bule de conversație: `15px`, cu colțul de origine la `5px` (dreapta pentru om, stânga pentru aplicație)

---

## 3 · Ce se păstrează din prima iterație, fără modificare

| Element | Motiv |
| --- | --- |
| Paleta, serif-ul, cardurile | Vezi §1 |
| **Lecția conversațională** (bule, bula teal a omului) | Era deja ecranul-cheie al produsului. Nu se atinge. |
| **Banda teal cu salutul** | Singurul loc cu culoare plină. Corect ca ierarhie. |
| **„Cum e cu sufletul tău azi?” cu cele 5 fețe** | Nu e decorativ. E cea mai ieftină cale prin care aplicația află că a fost o zi grea, fără să ceară cuiva să scrie. |
| **Rugăciunea pe 5 niveluri** | Progresie fără punctaj. Exact ce trebuie. |
| **Ebenezer „Trece cererea în piatră”** + Doar eu / Familia / Comunitatea | Metaforă bună (1 Samuel 7:12) și control de intimitate corect. |
| **Ecranul de criză** | Numere RO reale (112 · 116 111 · 116 123 · 0800 801 200), ton corect. |

O singură schimbare de fond la fețe: **capătă consecință**. Ce apeși acolo intră în motorul de memorie (`docs/18-prezenta-proactiva.md`) și schimbă ce ți se propune mâine. Altfel e un buton fără urmări, adică minciună.

---

## 4 · Ce se scoate — verdict ecran cu ecran

| Din prima iterație | Verdict | De ce |
| --- | --- | --- |
| `🔥 12 zile` · `340 XP` · `Nivel 4 (60/100)` pe Acasă | **Scoase** | Exact ce am criticat la YouVersion. O relație nu se numără. |
| Radarul hexagonal pe 6 axe (apărea pe 2 ecrane) | **Scos din navigare** | Formulă cu ponderi inventate (`0.5·selfReport + 0.3·moduleReview + 0.2·behaviorSignal`). Nu măsoară nimic real și dă impresia că măsoară. |
| Onboarding în 5 ecrane + diagnostic 3/6 + radar + recomandare | **Comprimat într-un singur ecran:** „Ce te-a adus aici?” cu cele 8 uși | Omul care vine de pe TikTok la 11 seara nu ajunge la ecranul 5. |
| Câmpul liber „Ce te apasă cel mai mult acum?” | **Păstrat — singura piesă salvată din diagnostic** | O propoziție reală („Mă simt nesigur pe mine și îmi e greu între colegi”) valorează mai mult decât toate cele 6 axe. La ea revine aplicația peste două săptămâni. |
| „Cuvântul de azi” (verset + gând, deconectat) | **Înlocuit** | Devine pasul din modulul tău. Un verset care nu are legătură cu ce trăiești azi e zgomot frumos. |
| Acasă cu 6 blocuri | **Rescris: „un singur lucru”** | Un lucru sus, restul dedesubt. |
| Taburi: Acasă · Parcurs · Rugăc. · Comun. · Profil | **Remapate:** Azi · Biblia · Întreabă · Ai mei · Eu | Vezi `docs/05-harta-aplicatiei.md`. |

---

## 5 · Ecrane care lipseau complet din setul de design

Desenate acum în același limbaj. Sunt muncă de ecrane, nu de sistem — tokenii nu se schimbă.

| # | Ecran | Rolul lui |
| --- | --- | --- |
| 1 | **Ecranul deciziei** (`fund_l7`) | Trei butoane cu greutate vizuală egală, intenționat: „Am spus-o acum” · „Am spus-o cândva, demult” · „Încă nu sunt acolo”. Toate trei duc mai departe. |
| 2 | **Dimineața de după** | „Nu trebuie să simți nimic special azi.” Momentul în care se pierd cei mai mulți oameni. |
| 3 | **Ecranul de revenire** | „Bine că te-ai întors. Nu ai pierdut nimic.” În locul flăcării stinse. |
| 4 | **Întreabă** | Bibliotecă curatoriată + un om real care răspunde în 24 de ore la coada lungă. |
| 5 | **Biblia** | Intrarea se face prin durere („Când nu poți dormi”), nu prin cuprins. |

### Stare runtime — 30 iulie 2026

- `Azi` este ritualul și continuarea drumului.
- `Biblia` deschide biblioteca biblică și cursurile publicate.
- `Întreabă` caută exclusiv în conținutul verificat; nu generează răspunsuri
  spirituale când nu există unul.
- `Ai mei` deschide memorialul de rugăciune. Relațiile între utilizatori rămân
  blocate până există moderare și operare umană.
- `Eu` arată drumul și adevărul despre stocarea datelor.
| 6 | **Modul noapte** | Fără cont, fără notificări, ecran întunecat, audio care se oprește singur. |
| 7 | **Cardul de dat mai departe** | Fiecare lecție produce ceva de dat. Umple poziția „Dă mai departe”, care era goală. |

---

## 6 · Reguli de scris pe ecran

- Titlurile sunt propoziții, nu etichete. „Poți să-I spui acum.” nu „Decizie”.
- Nicio cifră care măsoară un om. Zile, puncte, niveluri, procente de creștere — nu apar.
- Fiecare ecran care cere ceva oferă și ieșirea: „Sar peste azi”, „Nu pierzi nimic dacă sari”.
- Când aplicația își amintește ceva, spune de unde știe: „Sâmbătă ai scris că…”. Niciodată memorie fără sursă.
- Jurnalul e privat și se spune explicit pe ecran. Aplicația nu îl citește.
- Nu se folosesc emoji ca iconuri de interfață (Lucide only). Cele 5 fețe din check-in sunt singura excepție, pentru că acolo emoția *e* conținutul.

---

## 7 · Ce urmează în cod

1. `apps/web/src/ds/tokens.css` — un singur set, valorile din §2. Se elimină setul dark teal.
2. Se adaugă un scope `.night` separat, nu o temă alternativă globală.
3. Se scot din `Home.tsx`: rândul `🔥 / XP / Nivel`, `GrowthRadar` din navigare.
4. `Onboarding.tsx` → un ecran, cu cele 8 uși; câmpul liber se păstrează și se salvează.
5. Ecranele noi din §5, în ordinea din sprintul de la `docs/05-harta-aplicatiei.md`.

**Referințe:** `docs/05-harta-aplicatiei.md` (harta și taburile) · `docs/18-prezenta-proactiva.md` (memoria din spatele fețelor) · `docs/06-curs-fundamentul.md` (`fund_l7`, ecranul deciziei)
