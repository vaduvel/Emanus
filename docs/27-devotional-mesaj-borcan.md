# 27 · Devoțional 365 · Mesajul zilei · Pergamentul cu versete — spec de implementare

> Spec pentru trei features noi, aliniate cu `docs/00-DIRECTIE.md` (sursă unică de adevăr). Unde acest document pare să contrazică `00`, `00` are prioritate.
>
> **Notă de stare:** ghidul nu mai are personaj cu nume. Codul folosește `GUIDE_NAME = "Emanus"` (`apps/web/src/LessonPlayer.tsx`). Referințele la „Daniel" din `README.md` și `00-DIRECTIE.md` (§4, §7, §10, §14) sunt istorice și urmează a fi curățate separat. În acest document, vocea aplicației se numește **vocea Emanus**.

---

## 0 · Ce construim

| # | Feature | Într-o propoziție |
|---|---|---|
| **F1** | **Devoțional 365** | Un traseu de un an, o intrare pe zi (3–4 min): verset → meditație → întrebare → rugăciune → pas. |
| **F2** | **Mesajul zilei** | Un card frumos, distribuibil, cu ce îți spune Dumnezeu **din Cuvântul Său** astăzi. Motor de creștere organică. |
| **F3** | **Pergamentul cu versete** | Versetul zilei ca gest, nu ca text: desfaci sulul dimineața, aprinzi candela seara. |

Cele trei nu sunt independente: **F3 este forma de prezentare** a versetului, **F2 este forma de share**, **F1 este una din sursele** de conținut zilnic. Se construiesc ca piese care se combină, nu ca trei ecrane paralele.

---

## 1 · Non-negociabile comune (se aplică toate trei)

1. **Nu punem cuvinte noi în gura lui Dumnezeu.** `00` §7 și `DECISIONS.md` D-005: aplicația nu se dă drept Dumnezeu și nu se inventează teologie. Orice mesaj la persoana I („Eu îți voi…") este **parafraza unui verset real**, cu **referința vizibilă pe card**. Fără verset-sursă, mesajul nu se publică.
2. **Zero conținut cu drepturi străine.** Referințele vizuale externe (ex. carduri de tip „Dumnezeu îți transmite astăzi" din social media, semnate de alți autori) se folosesc **doar ca inspirație de format**. Textele și imaginile sunt originale Emanus.
3. **Har, nu vină** (`00` §3). Nicio zi ratată nu prăbușește nimic. Fără serie ruptă în roșu, fără „ai pierdut". Ecranul de revenire sărbătorește întoarcerea.
4. **Fără paywall** (D-009). Toate trei sunt gratuite, integral, pentru toți.
5. **Performanță și offline** (workbook §15): sub 2s până la primul conținut; ziua curentă disponibilă offline; animațiile respectă `prefers-reduced-motion` și se pot sări cu un tap.
6. **O singură notificare pe zi**, la ora aleasă de utilizator. Mesajul notificării nu culpabilizează niciodată.
7. **Fără reclame, fără tracking**, mai ales pe minori (`00` §12).
8. **Un singur codebase, comportament prin config** (D-002): nimic din cele trei nu introduce cod separat per categorie de vârstă.

---

## 2 · F1 · Devoțional 365

### 2.1 Ce este și ce NU este

**Este:** un ritm de un an, secvențial, care hrănește ritualul zilnic. O intrare = 3–4 minute de citit.

**Nu este:** un curs (aceea e programa, `docs/02`), nu este predică, nu este comentariu biblic exhaustiv.

### 2.2 Regula de aur a numerotării: ziua ta, nu ziua din calendar

Devoționalul are 365 de intrări indexate `1…365`. Utilizatorul are propriul `dayIndex`.

- Începi la ziua 1 **în ziua în care instalezi**, nu pe 1 ianuarie.
- `dayIndex` avansează **doar când deschizi** o zi. Dacă lipsești o săptămână, revii exact unde ai rămas — nu ai „7 zile restante".
- Nu există recuperare obligatorie, nu există „zile pierdute". Poți naviga liber înainte/înapoi în arhivă.
- Motiv: `00` §3 și regula manei (§4.5). Un contor calendaristic care te lasă în urmă predă teologia orfanului prin interfață.

### 2.3 Model de date (`packages/shared`)

```ts
export type DevotionalTrackId = string // ex. "anul-1"

export interface DevotionalDay {
  id: string
  trackId: DevotionalTrackId
  dayNumber: number          // 1..365
  theme: string              // tema lunii, pentru grupare vizuală
  axis: GrowthAxisId         // una din cele 6 axe (radar)
  organ?: RelationOrganId    // opțional: unul din cele 6 organe ale relației (00 §8)
  verseRef: string           // "Matei 6:34" — obligatoriu
  verseText: string          // textul versetului, traducerea aprobată
  meditation: string         // 120–180 cuvinte; aplicare, nu exegeză
  question: string           // o singură întrebare, scurtă
  prayer: string             // 2–4 rânduri, cu un loc de completat de user
  step: string               // micro-pas pentru 24–48h
  ageVariants?: Partial<Record<AgeCategoryId, DevotionalAgeVariant>>
}

export interface DevotionalAgeVariant {
  meditation: string
  question: string
  prayer: string
  step: string
  // verseRef și verseText NU se schimbă pe vârste — vezi 2.5
}

export interface DevotionalProgress {
  userId: string
  trackId: DevotionalTrackId
  dayIndex: number           // unde a rămas
  completedDays: number[]    // zilele deschise, pentru arhivă
  lastOpenedAt: string
}
```

Regula de conținut: `verseRef` este **obligatoriu** și validat la seed. O zi fără verset-ancoră este invalidă și seed-ul trebuie să eșueze, nu să treacă cu avertisment.

### 2.4 Structura anului

12 luni tematice, câte 2 luni pe fiecare din cele 6 **axe** de creștere. Motiv: devoționalul măsoară creștere pe termen lung, deci se mapează pe axe (radar), nu pe organele ritualului.

| Luni | Axă | Fir tematic |
|---|---|---|
| 1–2 | `identity` | Din orfan în fiu — cine ești pentru că Iisus a făcut X |
| 3–4 | `emotional_peace` | Frica, grija, odihna |
| 5–6 | `relationships` | Iertare, familie, singurătate |
| 7–8 | `living_faith` | Rugăciune, încredere, când Dumnezeu tace |
| 9–10 | `character` | Ce crește pe nevăzut |
| 11–12 | `freedom` | Rușine, lanțuri, har la cădere |

Ordinea urmează `00` §13: **identitatea prima, comportamentul la urmă.**

### 2.5 Vârste

Același **verset** pentru toți în aceeași zi; se schimbă doar meditația, întrebarea, rugăciunea și pasul. Aceasta activează „Legământul familiei" (`00` §6) fără arhitectură nouă: toată familia primește aceeași temă, pe limba fiecăruia.

Pentru lansare: pista **adulți** completă + pista **copii 6–11**. Restul se adaugă pe parcurs, ca la cursuri (D-004).

### 2.6 Integrare cu ritualul zilnic

Ritualul zilnic (`00` §2, `apps/web/src/Daily.tsx`) are 4 pași și rămâne neschimbat ca formă. Devoționalul devine **o sursă selectabilă** pentru pasul „📖 Cuvântul de azi":

- **Mod „lupta mea de azi"** (implicit, comportamentul actual): versetul urmează check-in-ul emoțional și axa slabă din radar (`00` §14).
- **Mod „devoționalul de un an"**: versetul și meditația vin din `DevotionalDay` la `dayIndex`.

Comutarea stă în setări, e reversibilă oricând, și nu pierde progresul niciunui mod. Pasul 4 („👉 Continuă lecția") rămâne identic în ambele moduri.

### 2.7 API

```
GET  /devotional/tracks                     → listă piste (v1: una)
GET  /devotional/:trackId/today             → ziua la dayIndex-ul userului
GET  /devotional/:trackId/day/:n            → o zi anume (arhivă / navigare)
POST /devotional/:trackId/day/:n/complete   → marchează deschisă, avansează dayIndex
GET  /me/devotional                         → DevotionalProgress
```

Autentificare: header `x-user-id` ca restul API-ului (D-010).

---

## 3 · F2 · Mesajul zilei (cardul distribuibil)

### 3.1 De ce merită construit

Formatul „card cu pergament + o frază la persoana I" produce distribuire organică masivă în spațiul creștin românesc. E fix canalul din `00` (distribuție creator-led, nu prin biserici) și nu costă nimic. Fiecare share e o ușă de intrare (`00` §13).

### 3.2 Formularea — punctul cel mai sensibil din tot documentul

Formula „**Dumnezeu îți transmite astăzi: «...»**", urmată de o frază inventată, este **interzisă**: e revelație nouă atribuită lui Dumnezeu.

**Titluri permise:**

- „Dumnezeu ți-a spus deja:"
- „Ce îți spune Dumnezeu astăzi, din Cuvântul Său:"
- „Astăzi, din Scriptură, pentru tine:"

**Corpul cardului:** parafrază la persoana I, **fidelă versetului**, nu adăugată la el.

**Referința** apare pe card, mai mic, sub text. Nenegociabil.

Exemple:

| ✅ Corect | ❌ Greșit |
|---|---|
| „Ajunge zilei necazul ei." — *Matei 6:34* | „Eu nu întârzii niciodată, doar am pregătit-o cum trebuie." (fără sursă) |
| „Cuvântul Tău e o candelă pentru picioarele mele." — *Psalmul 119:105* | „Îți voi lumina fiecare pas." (parafrază frumoasă, dar prezentată ca vorbire directă nouă) |

A doua coloană nu e greșită *emoțional* — e greșită *ca atribuire*. Aceleași idei devin corecte în clipa în care poartă referința care le susține.

### 3.3 Model de date

```ts
export type MessageMood =
  | "obosit" | "speriat" | "vinovat" | "in_asteptare"
  | "singur" | "recunoscator" | "fara_directie"

export interface MessageCard {
  id: string
  title: string           // unul din titlurile permise (3.2)
  body: string            // parafraza ancorată
  verseRef: string        // obligatoriu
  verseText: string       // textul integral, pentru ecranul de detaliu
  axis: GrowthAxisId
  moods: MessageMood[]    // pentru cine e potrivit azi
  background: string      // id de template vizual, nu fișier
  ageVariants?: Partial<Record<AgeCategoryId, { title: string; body: string }>>
}
```

### 3.4 Alegerea cardului — nu random

Ordinea de decizie:
1. `mood` din check-in-ul de azi, dacă există (`00` §14);
2. altfel, axa cea mai slabă din radarul userului;
3. altfel, rotație care nu repetă un card în ultimele 60 de zile.

### 3.5 Randare și export

**Decizie: cardul se generează în client din HTML/CSS, nu ca imagine pre-făcută.**

- Un `<MessageCardView>` cu 3–5 fundaluri (texturi de pergament, ~40 KB fiecare, în `apps/web/public`).
- Export PNG cu `html-to-image` (sau canvas manual dacă bundle-ul crește prea mult).
- Formate: **1080×1350** (feed) și **1080×1920** (story), din același template, doar cu alt container.
- Fonturi: serif italic, cu `font-display: swap`; textul se auto-micșorează în trepte (clamp) ca să nu depășească niciodată caseta.
- **Watermark:** `emanus.app` discret jos + referința versetului. Fără watermark peste text, care e defectul referinței externe.
- Motiv: 1 template × N texte, nu N fișiere. Corectezi un text fără să regenerezi imagini; adaugi vârste gratis.

### 3.6 Share ca ușă de intrare

Cardul exportat conține un link scurt către **acel** card în app: `#/mesaj/:id`. Ecranul respectiv arată cardul, versetul întreg, contextul, și un singur buton: „👉 3 minute despre asta" → micro-lecția pe axa cardului. Share-ul nu e capăt de drum.

### 3.7 API

```
GET  /messages/today            → cardul de azi (selecție ca la 3.4)
GET  /messages/:id              → un card anume (ținta deep link-ului)
POST /messages/:id/shared       → contor agregat de share-uri (fără date personale)
```

---

## 4 · F3 · Pergamentul cu versete (dimineața) și candela (seara)

### 4.1 De ce NU borcan — decizie de produs, nu de estetică

Obiectul fizic „borcan / cutie cu versete" (*verse jar*, *promise box*) se vinde comercial de decenii și este vândut și de creatori creștini români cu care Emanus vrea să fie în parteneriat, nu în concurență. Un borcan digital gratuit în app subminează exact produsul partenerului.

**Decizie:** app-ul nu reproduce borcanul. Obiectul digital este **sulul (pergamentul)**; borcanul rămâne obiect fizic, al partenerului. Direcția de colaborare devine naturală: borcanul fizic poartă un cod/QR care deschide în app versetul și micro-lecția din spatele lui. Fiecare își păstrează teritoriul.

**De evitat pentru același motiv:** coșul / pâinea zilnică („Our Daily Bread Promise Box" e o cutie-pâine cu 240 de versete, produs existent).

### 4.2 Obiectul: sulul, și nu ca metaforă

Sulul **este** forma reală în care a existat Scriptura. În Luca 4:17, în sinagoga din Nazaret, lui Isus „I s-a dat cartea prorocului Isaia. Când a deschis-o…" — a desfășurat un sul. Deci nu inventăm un obiect drăguț cu versete înăuntru; ne întoarcem la obiectul original.

Avantaje colaterale: nimeni nu are drepturi pe el, și animația de desfășurare e mai simplă și mai fiabilă decât o carte 3D cu coperte care se rotesc pe `rotateY` (partea cea mai fragilă din versiunea anterioară a acestui spec, eliminată).

### 4.3 Secțiunile (sertarele de pergamente)

`când te doare` · `când ești speriat` · `când te simți vinovat` · `când aștepți` · `când ești singur` · `când mulțumești` · `când nu știi încotro`

Alegerea vine automat din check-in-ul emoțional, sau o face userul manual („azi vreau din altă parte"). **Aici e diferența față de orice obiect de raft: acela e random, al nostru te ascultă întâi** (`00` §14).

### 4.4 Animația de dimineață: sulul se desfășoară

Total **~2,3 s**, trei acte. Se poate sări cu un tap în orice moment.

| Timp | Ce se vede |
|---|---|
| **Act I — 0 → 500 ms** | Sulul legat cu șnur, centrat, „respiră" lent (`scale 1 → 1.02`, 3 s, alternate). Sub el: „Desfășoară Cuvântul pentru azi". |
| **Act II — 500 → 1500 ms** | Șnurul cade, sulul se desfășoară de sus în jos: mască CSS cu `height 0 → 100%`, easing `cubic-bezier(.22,.9,.24,1)`, plus o umbră moale care coboară cu marginea și un rulou care se micșorează sus. Lumină caldă difuză în spate (SVG `radialGradient` + `feGaussianBlur`), cu 8–12 particule fine de praf care urcă prin ea. |
| **Act III — 1500 → 2300 ms** | Textul apare **odată cu** pergamentul, rând cu rând (fiecare rând: `opacity 0 → 1`, `translateY 8px → 0`, decalaj 90 ms). Referința intră ultima, mai mică, dedesubt. |
| **După** | Nimic nu se mișcă, nimic nu expiră. Versetul stă. Acțiuni: „Citește contextul" · „Adaugă la Zidul de aducere-aminte" (`00` §5) · „Salvează cardul" (→ F2) · „Continuă lecția". |

### 4.5 Ritmul: mana (Exod 16)

Mana nu e un obiect în interfață, e **explicația ritmului**. În Exod 16 mana se strângea dimineața, ajungea exact pentru ziua aceea, și cine strângea pentru mâine găsea dimineața stricat.

Consecințe concrete în produs:
- Zilele lipsă **nu se acumulează** și nu apar ca datorie. Nu există „ai pierdut 5 zile" — mana de azi e pentru azi.
- Nu se poate „citi înainte" ca să acumulezi progres. Arhiva e deschisă pentru revăzut, dar `dayIndex` avansează câte o zi.
- Textul de revenire după o pauză: nu „te-ai întors după 12 zile", ci „estăzi e mana de azi". Formularea finală se decide la conținut, dar sensul e obligatoriu.
- Astfel regula harului (`00` §3) nu mai e un mesaj de UX, e Scriptură.

### 4.6 Animația de seară: candela și pașii

Psalmul 119:105 — *„Cuvântul Tău este o candelă pentru picioarele mele și o lumină pe cărarea mea."*

**Regulă de design derivată direct din verset:** candela nu e de admirat, e pentru **văzut unde calci**. Deci animația conține obligatoriu **drumul și pașii**, nu doar o flacără frumoasă cu text.

**Și a doua regulă, mai importantă:** o candelă luminează cam un metru. Nu-ți arată drumul, îți arată **pasul următor**. Cercul de lumină **nu dezvăluie niciodată tot drumul** — nici la finalul anului, nici ca recompensă, niciodată. Cine cere harta, primește candela. Aceasta este și replica directă la anxietate (Matei 6:34).

| Timp | Ce se vede |
|---|---|
| **Act I — 0 → 500 ms** | Ecran aproape negru. Un drum de piatră abia ghicit. Jos, o candelă stinsă. Text: „Aprinde candela pentru pasul de mâine". |
| **Act II — 500 → 1400 ms** | Tap → flacăra crește (două căi SVG suprapuse, `scale` + `blur`, culori caldă/albă). Cercul de lumină se deschide `scale .3 → 1` și dezvăluie **doar piatra următoare**, cu conturul unui pas pe ea. Restul drumului rămâne în întuneric. |
| **Act III — 1400 → 2300 ms** | Versetul apare pe drum, în lumină (`opacity`, `blur 6px → 0`). În urmă, 3–5 pietre deja luminate slab (~15% opacitate) = zilele umblate; se leagă vizual de Zidul de aducere-aminte (`Ebenezer.tsx`). |
| **După** | Flacăra pâlpâie continuu, discret (`opacity`/`scale` ±4%, 1,8 s, `ease-in-out`) — singurul lucru care se mișcă după final. Acțiuni: „Pasul de mâine" · jurnal de 2 rânduri („cum a fost ziua cu El?"). |

Astfel ziua are două capete fără conținut suplimentar: dimineața desfaci sulul (verset + pas), seara aprinzi candela (ce a fost + pasul următor).

### 4.7 Decizie tehnică: CSS + SVG + Web Animations API

**NU** Lottie, **NU** video, **NU** WebGL.

- Lumina = SVG cu `radialGradient` + `feGaussianBlur`, animată prin `transform`/`opacity` → rulează pe compositor, 60 fps și pe telefoane slabe.
- Sulul = mască pe înălțime + textură de pergament. Fără transformări 3D.
- Candela și drumul = SVG plat, cu cercul de lumină ca mască radială. Pietrele sunt elemente, deci pot fi luminate independent (utile pentru zilele umblate).
- Cost total estimat: **~15 KB**, zero request de rețea, funcționează offline.
- Motiv: cerințele de sub 2s / offline / deep links din workbook §15 exclud un video sau un Lottie greu. Un `<video>` de 2 MB pentru un gest de două secunde e exact tipul de decizie pe care o regretăm la a treia lună.

### 4.8 Accesibilitate — obligatoriu

- `prefers-reduced-motion: reduce` → fără particule, fără pâlpâire, fără desfășurare; versetul apare cu un fade de 200 ms, iar candela e statică.
- Tap oriunde = skip la starea finală. La a 40-a zi, animația nu trebuie să devină o taxă.
- Textul e text real (selectabil, citibil de screen reader), nu imagine. `aria-live="polite"` pe container.
- Contrast minim 4.5:1 între text și fundal — se verifică și pe pergamentul cel mai deschis, și pe drumul cel mai întunecat.

### 4.9 Componenta e reutilizabilă

```ts
interface ScriptureRevealProps {
  verseText: string
  verseRef: string
  variant?: "scroll" | "lamp" | "lesson"
  // scroll: sulul se desfășoară (dimineața)
  // lamp:   candela + drumul + pasul următor (seara)
  // lesson: doar lumina + text, fără obiect, ca să nu întrerupă conversația
  stepText?: string          // folosit de varianta "lamp"
  walkedDays?: number        // pietrele deja luminate în urmă (0–5 vizibile)
  autoPlay?: boolean
  onRevealed?: () => void
}
```

Se folosește în **trei** locuri, nu unul:
1. Pergamentul de dimineață (`variant: "scroll"`).
2. Candela de seară (`variant: "lamp"`).
3. Beat-ul `scripture` din player-ul de lecție — al 6-lea din cele 12 (`variant: "lesson"`).

Asta e justificarea reală a efortului: nu e un ecran decorativ, e felul în care Scriptura intră în scenă în toată aplicația.

### 4.10 API

```
GET /scroll/sections                 → secțiunile disponibile
GET /scroll/draw?section=&mood=      → un verset (fără repetare în ultimele 60 de zile)
GET /evening/today                   → versetul de seară + pasul de mâine
```

Extragerea se poate face și **complet local** din seed, ca să funcționeze offline. Serverul e doar sincronizare.

---

## 5 · Ce NU intră în scope

- Generare de text cu AI pentru meditații sau mesaje. Conținutul e scris și trecut prin QA teologic (`00` §9, D-005).
- Traduceri biblice multiple. Se folosește traducerea deja aprobată în seed.
- Monetizare de orice fel (D-009).
- Sunet obligatoriu la animație. Eventual mai târziu, implicit oprit.
- Reproducerea borcanului sau a cutiei-pâine cu versete (§4.1).

---

## 6 · Faze de livrare

| Fază | Livrabil | Depinde de |
|---|---|---|
| **A** | `<ScriptureReveal variant="scroll">` + integrare în beat-ul `scripture` (`variant="lesson"`) | nimic |
| **B** | Secțiunile pe stări + extragere locală + ecranul de dimineață | A |
| **C** | `variant="lamp"`: candela, drumul, pasul de mâine, jurnalul de seară | A |
| **D** | `MessageCard` + `<MessageCardView>` + export PNG + `#/mesaj/:id` | nimic |
| **E** | Devoțional: model, API, ecran, comutator în ritualul zilnic, regula manei | nimic |
| **F** | Conținut: 60 de zile de devoțional + 60 de carduri (suficient pentru validare reală) | D, E |
| **G** | Variante pe vârste + legarea la Legământul familiei | F |

Faza A prima, deliberat: e cea mai mică, se vede imediat cu ochii, și e piesa refolosită de toate celelalte.

---

## 7 · ADR propus — de adăugat în `DECISIONS.md`

> Nu am scris direct în `DECISIONS.md` ca să nu intru în conflict cu ceilalți agenți care lucrează pe fișierele comune. Textul de mai jos e gata de lipit ca **D-013**.

**D-013 · Devoțional 365, Mesajul zilei, Pergamentul cu versete**

- **Atribuire:** orice text la persoana I atribuit lui Dumnezeu este parafraza unui verset real, cu referința vizibilă. Formula „Dumnezeu îți transmite astăzi" + frază inventată este interzisă (`00` §7, D-005).
- **Obiectul digital este sulul, nu borcanul.** Borcanul și cutia-pâine cu versete sunt produse fizice existente pe piață, inclusiv la creatori creștini parteneri; app-ul nu le reproduce gratuit. Colaborarea se face invers: obiectul fizic trimite în app prin cod/QR.
- **Numerotare devoțional:** `dayIndex` per utilizator, nu zi calendaristică. Zilele lipsă nu se acumulează și nu se recuperează obligatoriu — regula manei, Exod 16 (`00` §3).
- **Candela implică pași.** Psalmul 119:105 cere drum și picioare în animație, nu doar flacără. Cercul de lumină nu dezvăluie niciodată tot drumul, ci doar pasul următor.
- **Carduri:** generate în client din HTML/CSS + export PNG; un template × N texte. Fără imagini pre-randate per mesaj.
- **Animație:** CSS + SVG + Web Animations API. Fără Lottie, video sau WebGL. Fără transformări 3D. `prefers-reduced-motion` respectat, skip la tap.
- **Reutilizare:** `<ScriptureReveal>` deservește dimineața (`scroll`), seara (`lamp`) și beat-ul `scripture` din player (`lesson`).
- **Conținut extern:** cardurile de tip „mesaj de la Dumnezeu" din social media aparțin autorilor lor; se folosesc doar ca referință de format, niciodată copiate.

---

## 8 · Idei parcate (nu în acest spec, dar merită reținute)

| Idee | De ce |
|---|---|
| **Widget iOS/Android** cu versetul zilei | Cel mai bun raport retenție/efort care există; prezență fără deschiderea app-ului. |
| **Audio: versetul citit** (~30 s, vocea Emanus) | Pentru cei care conduc, gătesc, alăptează; și pentru bunicii cu vederea slabă, ca înlocuitor al textului. |
| **Versetul de memorat cu fade progresiv** | Aceeași frază 7 zile, cu tot mai multe cuvinte ascunse. Mecanică veche, cost mic, funcționează. |
| **„Trimite versetul cuiva"** | Nu doar share public: „trimite-l mamei", cu o linie scrisă de tine. Leagă F2 de Legământul familiei. |
| **Pergamentul familiei** | Toți desfășoară același verset în aceeași zi și văd cine a deschis deja. „Am fost și eu azi", fără competiție. |
| **Cod/QR pe obiectul fizic al partenerului** | Borcanul cumpărat deschide în app versetul și micro-lecția din spatele lui. Parteneriat, nu concurență (§4.1). |
