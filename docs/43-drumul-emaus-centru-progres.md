# 43 — Drumul Emaus: centrul de progres

> Status: **SPEC. Neimplementat.** Branch: `spec/drumul-emaus`.
> Nu se intra peste `gamification.ts` de pe `main` fara aprobare explicita.

---

## 1. Ce rezolva

Centrul de progres actual (`buildDashboard` din `packages/shared/src/gamification.ts`) este **liniar**: modulul N+1 este blocat pana cand N este complet. Asta produce trei probleme:

1. Userul poate termina aplicatia mergand pe o singura axa (de ex. numai Libertate) si sa creada ca a parcurs tot.
2. Progresul nu are nicio legatura cu identitatea aplicatiei.
3. Nu exista niciun semnal catre user ca studiul trebuie sa fie echilibrat.

Specul asta inlocuieste ecranul principal de progres cu **Drumul Emaus**: o harta cu 8 statii, alimentata de un algoritm care masoara nu doar *cat* a parcurs userul, ci *cat de echilibrat*.

XP-ul, nivelul, streak-ul si badge-urile din `gamification.ts` **raman neatinse**. Trec doar in plan secund, pe cardul de profil.

---

## 2. Principii care nu se negociaza

**P1 — Crucea nu se blocheaza niciodata.**
Exista un buton permanent, vizibil de la 0%, pe fiecare ecran al hartii: *Vreau sa ajung la Cruce acum*. Duce direct la Evanghelie si la rugaciunea de pocainta. Daca deblocarea crucii ar depinde de procent, mesajul implicit al aplicatiei ar fi ca mantuirea vine dupa cursuri. Aceeasi eroare identificata in review-ul doctrinar la `lessonMohler.ts`.

**P2 — Drumul e cronologic corect.**
Golgota → mormantul gol → Emaus. Crucea este statia 4, la mijloc, nu la final. Userul incepator chiar merge spre cruce si trece prin ea, dar drumul nu se termina acolo, pentru ca nici in Luca 24 nu se termina acolo.

**P3 — Echilibru, nu viteza.**
Algoritmul penalizeaza specializarea. Un user cu 6 module intr-o singura axa este mai putin avansat pe drum decat un user cu 6 module in 6 axe diferite.

**P4 — Harta nu cearta.**
Cand userul e blocat de dezechilibru, nu i se spune ca a gresit. I se arata o carare laterala neumblata.

**P5 — Gamificare tacuta.**
Fara confetti, fara sunete de fanfara, fara clasamente intre useri, fara comparatii sociale. Recompensa vizuala este **drumul care se deschide**.

---

## 3. Traseul — cele 8 statii

| # | Statie | Prag `journeyScore` | Referinta | Ce se deblocheaza |
|---|--------|---------------------|-----------|-------------------|
| 1 | Plecarea din Ierusalim | 0.00 | Luca 24:13 | Harta insasi |
| 2 | Drumul si intrebarile | 0.10 | Luca 24:17-21 | — |
| 3 | Dealul se vede in departare | 0.22 | Luca 23:33 | — |
| 4 | **Golgota** | 0.35 | Luca 23:44-46 | Meditatia la cruce |
| 5 | Mormantul gol | 0.50 | Luca 24:2-6 | **Primul prag de echilibru** |
| 6 | Strainul Se apropie | 0.65 | Luca 24:15-16 | A doua silueta pe harta |
| 7 | Frangerea painii | 0.80 | Luca 24:30-31 | **Rugaciunea de multumire** |
| 8 | Intoarcerea la Ierusalim | 0.92 | Luca 24:33-35 | Pasii de ucenicie |

De la statia 8 harta nu se mai umple. Ce urmeaza este ucenicia, care nu are procent.

---

## 4. Model de date

Fisier nou: `packages/shared/src/emmausRoad.ts`

```ts
import type { GrowthAxisId } from "./domain"

export type StationId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

export type Station = {
  id: StationId
  slug: string
  labelRo: string
  verseRef: string
  verseRo: string
  threshold: number          // prag pe journeyScore, 0..1
  minAxesTouched?: number    // prag dur suplimentar
  unlocks?: "cross_meditation" | "thanksgiving_prayer" | "discipleship"
  illustration: string       // cheie asset, ex. "station-04-golgota"
}

export type AxisProgress = {
  axis: GrowthAxisId
  lessonsDone: number
  lessonsTotal: number
  modulesComplete: number
  ratio: number              // 0..1, lessonsDone / lessonsTotal
}

export type JourneyState = {
  journeyScore: number                       // 0..1
  breadth: number                            // amplitudine
  balance: number                            // echilibru, 0..1
  depth: number                              // profunzime
  axisProgress: Record<GrowthAxisId, AxisProgress>
  axesTouched: number
  weakestAxes: GrowthAxisId[]                // maxim 2, pentru recomandari
  currentStation: Station
  nextStation: Station | null
  progressToNext: number                     // 0..1 intre statii
  blockedByBalance: boolean                  // pragul dur nu e trecut
  crossAlwaysOpen: true                      // literal, niciodata false
}

export type ComputeJourneyInput = {
  modules: ModuleSummary[]        // toate modulele publicate
  completedLessonIds: string[]    // ce a terminat userul
}

export type ModuleSummary = {
  id: string
  axis: GrowthAxisId
  lessonIds: string[]
}

export declare function computeJourney(
  input: ComputeJourneyInput,
): JourneyState
```

`ModuleSummary.axis` exista deja pe modulele din `library/`. Nu se adauga camp nou.

---

## 5. Algoritmul

### 5.1 De ce pe axe, nu pe categorii

`CATEGORY_CONFIGS` din `categoryConfig.ts` are 9 intrari, dar acelea sunt **audiente** (`kids0_5`, `women`, `men`, `parents`, `doctrine`...), nu domenii de studiu. Balansul se calculeaza pe `GROWTH_AXES` — cele 6 axe din `domain.ts`:

`identity` · `emotional_peace` · `relationships` · `living_faith` · `character` · `freedom`

### 5.2 Cele trei dimensiuni

**Amplitudine (`breadth`)** — cat la suta din tot continutul publicat a parcurs userul.

```
breadth = lectiiTerminate / lectiiTotalePublicate
```

**Echilibru (`balance`)** — cat de uniform e distribuit efortul pe cele 6 axe. Se foloseste raportul dintre media geometrica si media aritmetica a rapoartelor pe axa:

```
r_i     = lectiiTerminate(axa_i) / lectiiTotale(axa_i)
geoMean = (r_1 * r_2 * ... * r_6) ^ (1/6)
aritMean= (r_1 + r_2 + ... + r_6) / 6
balance = aritMean > 0 ? geoMean / aritMean : 0
```

Proprietatea care conteaza: **daca o singura axa este la zero, media geometrica este zero, deci `balance` este zero.** Un user care ignora complet o axa nu poate obtine echilibru, indiferent cat de mult face in celelalte.

**Profunzime (`depth`)** — module *complete*, nu lectii razlete.

```
depth = moduleComplete / moduleTotale
```

### 5.3 Scorul final

```
journeyScore = breadth * (0.55 + 0.30 * balance + 0.15 * depthNorm)

unde depthNorm = breadth > 0 ? min(1, depth / breadth) : 0
```

Interpretare: amplitudinea da masa scorului. Multiplicatorul variaza intre **0.55** (parcurgere complet dezechilibrata si superficiala) si **1.00** (parcurgere echilibrata si dusa pana la capat pe module).

Consecinta practica: doi useri cu acelasi numar de lectii terminate pot fi la statii diferite. Cel echilibrat e mai departe pe drum. Diferenta maxima este de aproape doua ori.

### 5.4 Pragul dur de echilibru

Pe langa `journeyScore`, statiile 5 si mai sus cer o conditie care nu se poate compensa cu volum:

```
minAxesTouched(5) = 4
minAxesTouched(6) = 5
minAxesTouched(7) = 6
minAxesTouched(8) = 6
```

Unde *touched* inseamna **cel putin un modul complet** in acea axa, nu o lectie.

Daca `journeyScore` depaseste pragul dar `axesTouched` nu, `blockedByBalance = true`. Harta arata userul oprit chiar in fata statiei urmatoare, care ramane in ceata, si deschide cararea laterala catre `weakestAxes`.

### 5.5 `weakestAxes`

Cele mai mici doua `r_i` dintre axele cu `lessonsTotal > 0`. Se dau mai departe la `recommendation.ts`, care le foloseste ca filtru la sugestiile de curs urmator.

### 5.6 Cazuri limita

| Situatie | Comportament |
|---|---|
| User nou, 0 lectii | `journeyScore = 0`, statia 1, harta vizibila integral in ceata |
| O axa fara continut publicat (`lessonsTotal = 0`) | Se exclude din calculul `balance` si din `minAxesTouched` |
| Toate lectiile terminate | `journeyScore = 1`, statia 8 |
| Se publica continut nou dupa ce userul era la statia 7 | Scorul **nu scade niciodata**. Se pastreaza `maxStationReached` persistat; statia afisata este `max(calculata, maxStationReached)` |

Ultimul rand este obligatoriu. Fara el, fiecare lansare de carte biblica noua ar da inapoi userii fideli.

---

## 6. Crucea — mereu deschisa

- Buton fix pe harta, vizibil in orice stare, inclusiv la `journeyScore = 0`.
- Text: *Vreau sa ajung la Cruce acum*.
- Duce la un ecran scurt: ce a facut Iisus, de ce, si o rugaciune de pocainta.
- Nu are procent, nu are XP, nu se marcheaza ca lectie terminata, nu apare in statistici.
- Statia 4 (Golgota) este altceva: **meditatia** la cruce in contextul drumului. Aceea are prag. Crucea in sine nu.

Distinctia trebuie sa fie vizibila si in copy, nu doar in cod.

---

## 7. Statia 7 — rugaciunea de multumire

Se deblocheaza la `journeyScore >= 0.80` **si** `axesTouched = 6`.

Este retrospectiva, nu conditie de mantuire. Continutul se uita inapoi peste drum:

- multumire pentru ca a fost cu userul pe drum, chiar cand userul nu L-a recunoscut
- multumire pentru ce a facut la cruce
- recunoasterea ca ochii s-au deschis, si ca nu prin efortul userului

Fraza care ancoreaza tot modulul, din discutia de proiectare:

> Iisus nu ne-a lasat un razboi de purtat, ne-a lasat o victorie de trait.

**Copy interzis** in acest modul: orice formulare care leaga procentul parcurs de statutul spiritual al userului. Nu *Acum esti gata*, nu *Ai ajuns la mantuire*, nu *Ai meritat*.

---

## 8. Statia 8 — ucenicia

Dupa intoarcerea la Ierusalim, harta nu mai are procent. Se deschide o sectiune separata, fara bara de progres:

- reluarea unui curs deja facut, la alt nivel de adancime
- invitatia de a insoti pe altcineva la inceputul drumului
- ritm zilnic: devotionalul de 365 de zile si Candela

Ucenicia nu se termina, deci nu se masoara.

---

## 9. Interfata — harta

### 9.1 Structura

Harta verticala, se deruleaza cu degetul de jos in sus. Trei straturi:

1. **Fundal** — dealuri geometrice plate, parallax lent la scroll (~0.3x).
2. **Poteca** — un singur `<path>` SVG serpuit. Portiunea parcursa este plina, restul punctata. Umplerea se anima cu `stroke-dasharray` / `stroke-dashoffset`.
3. **Statii si calator** — nodurile celor 8 statii plus silueta care se deplaseaza pe potecă.

### 9.2 Stari vizuale

| Stare | Randare |
|---|---|
| Statie parcursa | Ilustratie color, nod plin auriu |
| Statia curenta | Ilustratie color, nod pulsand lent |
| Statia urmatoare | Silueta gri-albastruie in ceata, contur vizibil |
| Statii mai indepartate | Doar nodul, foarte estompat, fara forma |
| Blocat de echilibru | Statia urmatoare ramane in ceata + apare cararea laterala |

### 9.3 Calatorul

Silueta userului, vazuta din spate, se pozitioneaza pe poteca dupa `journeyScore`. Trei variante de asset, pe fundal transparent: `stand`, `walk`, `run`.

- statiile 1-5: o silueta
- **statia 6: apar doua siluete** — a doua putin in urma, cu un rim-light cald pe contur
- statia 8: silueta in varianta `run`, lumina venind din fata, nu din spate

A doua silueta nu se explica nicaieri in interfata. Userul o observa singur.

### 9.4 Animatii

| Eveniment | Animatie | Durata |
|---|---|---|
| Lectie terminata | Calatorul face cativa pasi inainte | 900 ms |
| Modul complet | Pasi + o scurta sclipire pe nodul urmator | 1400 ms |
| Statie noua atinsa | Ceata se retrage, ilustratia se coloreaza | 2000 ms |
| Statia 6 | A doua silueta apare in fade | 1600 ms |

Toate respecta `prefers-reduced-motion`. Cu reduced motion, tranzitiile devin instantanee, fara sa se piarda vreo informatie.

### 9.5 Cardul de statie

La atingerea unui nod deblocat se deschide un card cu:

- ilustratia scenei, 16:9
- versetul din Luca 24 si referinta
- 2-3 fraze despre ce inseamna etapa
- **ce l-a adus acolo**: „3 module din Libertate, 2 din Identitate"
- daca e cazul, ce mai lipseste pana la statia urmatoare

Ultimele doua puncte sunt esentiale. Fara ele harta e decor.

---

## 10. Ilustratii

### 10.1 Stil

Flat vector, forme geometrice cu muchii clare, blocuri de culoare plate, strat uniform de grain peste toata imaginea. Paleta restransa: chihlimbar / ocru / teracota pentru lumina, indigo inchis spre negru pentru siluete si cadrul din prim-plan, verde masliniu stins doar pentru frunzis. O singura sursa de lumina joasa la orizont, contralumina. Personajele sunt intotdeauna siluete complete, vazute din spate, **fara chip vizibil, niciodata**.

Regula despre chip nu este doar estetica. In Luca 24:16, ochii ucenicilor erau impiedicati sa-L cunoasca. Faptul ca nu se vede chipul este fidel textului.

Ancora de stil este imaginea statiei 1, deja aprobata. Toate celelalte se genereaza cu ea ca referinta vizuala, nu doar cu prompt text.

### 10.2 Assets

```
apps/web/public/illustrations/emmaus/
  station-01-plecarea.webp
  station-02-drumul.webp
  station-03-dealul.webp
  station-04-golgota.webp
  station-05-mormantul.webp
  station-06-strainul.webp
  station-07-franerea-painii.webp
  station-08-intoarcerea.webp
  traveller-stand.webp        (fundal transparent)
  traveller-walk.webp
  traveller-run.webp
```

WebP, latime maxima 1600px, tinta sub 120 KB per scena. Fiecare scena are si un `-blur.webp` de 32px latime pentru placeholder la incarcare.

### 10.3 Generat vs. construit

| Element | Cum |
|---|---|
| Cele 8 scene, siluetele calatorului | Generat raster (Gemini), export WebP |
| Poteca, nodurile, ceata, parallax, deplasarea siluetei | SVG + CSS + JS |

Motivul impartirii: o imagine generata nu poate sti ca userul e la 47%. Poteca trebuie sa fie un `<path>` animabil, cateva kiloocteti, redimensionabil pe orice ecran.

---

## 11. Video intro pe usi

La alegerea unei usi, inainte de prima lectie, ruleaza un clip scurt (12-20 secunde), fara naratiune, in acelasi stil flat vector, animat minimal (parallax pe straturi + o miscare de camera lenta).

Exista 20 de `NeedId`, dar nu sunt necesare 20 de clipuri. **12 scenarii acopera tot:**

| Scena | Acopera |
|---|---|
| Fiul risipitor intorcandu-se | `departe`, `vinovat` |
| Femeia cu scurgere de sange | `boala` |
| Marta si Maria | `obosit` |
| Iov pe cenusa | `de_ce`, `doliu` |
| Furtuna pe mare potolita | `speriat`, `frica_moarte` |
| Ilie sub ienupar | `singur`, `rugaciune_fara_raspuns` |
| Vaduva cu doi banuti | `bani` |
| Oaia pierduta cautata | `copil_departat` |
| Iosif imbratisandu-si fratii | `neiertare`, `casa_rupta` |
| Vindecarea demonizatului din Gadara | `ocult`, `patima_bautura` |
| David pe acoperis, apoi Psalmul 51 | `pofta` |
| Avraam plecand fara sa stie unde | `fara_directie`, `in_asteptare`, `recunoscator` |

Clipul se poate sari oricand. Se ruleaza o singura data per usa, per user; ramane accesibil dupa aceea din cardul usii.

---

## 12. Ilustratie per curs si lectie

Se adauga camp optional in `packages/shared/src/domain.ts`:

```ts
// pe Course si pe Lesson
illustration?: string   // cheie asset, fara extensie si fara cale
```

Rezolvarea caii se face intr-un singur loc, nu la fiecare consumator:

```
/illustrations/lessons/{illustration}.webp
```

Fallback in ordine: ilustratia lectiei → ilustratia cursului → ilustratia axei → un pattern generic.

**Nota de cost:** campul e ieftin acum si scump dupa inca 60 de carti scrise. Se adauga in acelasi PR cu specul, chiar daca assets-urile vin treptat. Fara asset, fallback-ul acopera.

---

## 13. Integrare cu ce exista deja

| Fisier | Ce se schimba |
|---|---|
| `gamification.ts` | Nimic sters. `buildDashboard` ramane si continua sa alimenteze cardul de profil. XP, nivel, streak, badge-uri, certificate — neatinse. |
| `emmausRoad.ts` | **Nou.** Consuma aceleasi module si lectii terminate. Nu depinde de `gamification.ts`. |
| `recommendation.ts` | Primeste `weakestAxes` din `JourneyState` si il foloseste ca filtru la sugestii. |
| `domain.ts` | Se adauga `illustration?: string` pe `Course` si `Lesson`. |
| Ecranul de progres | Harta devine principala; dashboard-ul actual trece pe cardul de profil. |

Dependenta merge intr-o singura directie: `emmausRoad.ts` nu importa din `gamification.ts`, iar `gamification.ts` nu afla de existenta hartii. Cele doua sisteme pot fi testate separat.

---

## 14. Persistenta

De stocat per user:

```ts
type JourneyPersisted = {
  maxStationReached: StationId
  stationSeenAt: Partial<Record<StationId, string>>  // ISO, pentru animatia "prima data"
  thanksgivingPrayerSaid: boolean
  crossVisitedAt?: string                            // doar informativ, nu conditioneaza nimic
}
```

`journeyScore` **nu se persista**. Se recalculeaza mereu din lectiile terminate, ca sa nu apara desincronizari. Se persista doar maximul atins, ca sa nu dea nimeni inapoi.

---

## 15. Teste minime

1. User nou → `journeyScore = 0`, statia 1, `crossAlwaysOpen = true`.
2. Toate lectiile dintr-o singura axa → `balance = 0`, `journeyScore = breadth * 0.55`.
3. Distributie perfect uniforma pe 6 axe → `balance = 1`.
4. `journeyScore = 0.55` dar `axesTouched = 3` → statia ramane 4, `blockedByBalance = true`.
5. Se publica un modul nou dupa ce userul era la statia 7 → statia afisata ramane 7.
6. O axa fara continut publicat → exclusa din `balance`, nu blocheaza statia 7.
7. Toate lectiile terminate → `journeyScore = 1`, statia 8.
8. `crossAlwaysOpen` nu poate fi `false` in nicio stare (test de tip + test runtime).

---

## 16. Etape de implementare

| Etapa | Continut | Dependente |
|---|---|---|
| 1 | `emmausRoad.ts` + teste, fara UI | niciuna |
| 2 | `illustration?` in `domain.ts` + fallback | niciuna |
| 3 | Harta SVG cu placeholder-uri gri | etapa 1 |
| 4 | Cele 8 scene generate, integrate | assets |
| 5 | Silueta calatorului + animatii | etapele 3, 4 |
| 6 | Statia 7 — rugaciunea de multumire | continut scris |
| 7 | Statia 8 — ucenicia | continut scris |
| 8 | Clipurile de intro pe usi | assets |

Etapele 1 si 2 nu depind de nicio ilustratie si pot incepe imediat.

---

## 17. Ce nu facem

- Nu blocam crucea. Niciodata, sub nicio forma, in nicio stare.
- Nu comparam useri intre ei. Fara clasamente, fara „esti in primii 10%".
- Nu punem streak-uri agresive pe harta. Streak-ul ramane unde este.
- Nu punem confetti, sunete de fanfara sau limbaj de joc video.
- Nu spunem nicaieri ca un procent inseamna maturitate spirituala.
- Nu facem harta obligatorie. Userul poate merge direct la cursuri si sa nu o deschida niciodata.

---

## 18. Intrebari deschise

1. Pragurile numerice (0.10 / 0.22 / 0.35 / 0.50 / 0.65 / 0.80 / 0.92) sunt propuneri. Se calibreaza dupa ce se stie volumul final de continut per axa.
2. Coeficientii 0.55 / 0.30 / 0.15 sunt propuneri. De testat cu profile reale.
3. Ilustratiile de lectie: cate acceptam sa lipseasca inainte de lansare, si cat de bun trebuie sa fie fallback-ul.
4. Clipurile de intro: animatie proprie sau doar ken-burns peste ilustratia statica? A doua varianta e de zece ori mai ieftina si probabil suficienta.
