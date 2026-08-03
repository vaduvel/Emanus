# 43a — Drumul Emaus: stil vizual si mecanica hartii

> Completeaza `docs/43-drumul-emaus-centru-progres.md`.
> **Inlocuieste sectiunile 9.1, 9.4 si 10.3** din acel document.
> Status: SPEC. Branch `spec/drumul-emaus`.

---

## 1. Decizie: doua stiluri, cu roluri fixe

Se folosesc doua stiluri vizuale. Nu se amesteca niciodata in aceeasi imagine. Fiecare are un rol strict, stabilit de constrangeri tehnice, nu de gust.

| Stil | Unde | De ce acolo |
|---|---|---|
| **Fatetat atmosferic** — low-poly, gradiente moi, glow, adancime pictata | **Numai harta.** O singura imagine. | Un singur ecran, incarcat o data, privit de departe. Isi permite complexitate. |
| **Flat vector** — blocuri de culoare plate, muchii dure, grain, fara gradient | Cardurile de statie, ilustratiile de curs si lectie, clipurile de intro pe usi, siluetele calatorului. | Zeci sau sute de imagini mici, incarcate constant pe mobil. Se comprima de cateva ori mai bine si raman citibile sub 300px latime, unde glow-ul si gradientul se fac noroi. |

### 1.1 Ce le tine impreuna

Doua stiluri cu **o singura paleta** citesc ca o decizie. Doua palete citesc ca o scapare. Obligatoriu in ambele stiluri:

```
--amber:    #E8A13A
--ochre:    #C97B2E
--terra:    #A64B2A
--indigo:   #1B2237
--charcoal: #0E1220
--olive:    #6B7A4A
--mist:     #3A4055
```

- Nicio alta nuanta. In special **fara cer albastru deschis si fara verde saturat**. Cerul de zi se face din amber palid spre ocru.
- Siluetele umane sunt intotdeauna vazute din spate, **fara chip vizibil, niciodata**.
- O singura sursa de lumina dominanta per imagine, contralumina.
- Fara text in imagine, in nicio limba. Textul se pune peste, din aplicatie.
- Fara halouri, fara aure, fara iconografie religioasa conventionala.

Regula chipului nu este estetica. In Luca 24:16, ochii ucenicilor erau impiedicati sa-L cunoasca.

---

## 2. Harta: o singura imagine, in zori

Specul initial prevedea trei panouri stivuite plus o poteca SVG animata deasupra. **Se renunta la ambele.** Panourile aduceau cusaturi de racordat, iar poteca SVG dubla o informatie deja pictata in imagine.

In loc de asta: **o singura imagine verticala continua, in lumina de zori.**

```
apps/web/public/illustrations/emmaus/
  map-dawn.webp        imaginea hartii, o singura stare
  map-dawn-blur.webp   32px latime, placeholder la incarcare
```

WebP, latime 1024px, inaltime proportionala (raport aproximativ 1:3.5). Tinta sub 400 KB.

### 2.1 Reperele si unde cad statiile

Harta se deruleaza de jos in sus. Reperele sunt pictate in imagine; **nodurile interactive se deseneaza de aplicatie peste ele**, ca sa poata avea stari.

| Statie | Reper in imagine | Pozitie verticala aproximativa |
|---|---|---|
| 1 — Plecarea din Ierusalim | poarta cu arcada luminata, jos | 0.03 |
| 2 — Drumul si intrebarile | prima cotitura larga deasupra portii | 0.15 |
| 3 — Dealul in departare | ultima cotitura inainte de deal | 0.28 |
| 4 — Golgota | dealul cu cele trei cruci | 0.40 |
| 5 — Mormantul gol | intrarea in stanca, piatra rostogolita | 0.55 |
| 6 — Strainul Se apropie | portiunea dreapta dintre mormant si sat | 0.68 |
| 7 — Frangerea painii | casa cu fereastra galbena aprinsa | 0.80 |
| 8 — Intoarcerea la Ierusalim | orasul luminat de pe creasta | 0.94 |

Pozitiile sunt fractiuni din inaltimea imaginii, masurate de jos. Se calibreaza exact pe randarea finala si se stocheaza intr-un singur tabel de constante in `emmausRoad.ts`.

### 2.2 Mecanica progresului

Imaginea este o singura stare. Progresul se randeaza prin **retragerea cetei**:

```
1. map-dawn.webp este stratul de baza, la culoare plina
2. deasupra, un strat de ceata: indigo #1B2237 la opacitate 0.82,
   combinat cu un filtru de desaturare si un blur usor
3. stratul de ceata acopera portiunea NEPARCURSA, adica de la
   journeyScore in sus
4. marginea cetei nu este o linie dreapta, ci un gradient vertical
   de 12% din inaltimea ecranului, ca sa nu se vada o taietura
5. pe masura ce creste journeyScore, ceata se retrage de jos in sus
```

Rezultat: drumul parcurs este in zori, la culoare plina; drumul ramas este inca in intuneric. **Recompensa vizuala este ca se lumineaza tot mai mult din drum.** Nu badge, nu confetti — lumina care inainteaza.

Un singur asset, o singura masca animata, zero cod de animatie pe poteca.

### 2.3 Cazul special al statiei blocate de echilibru

Cand `blockedByBalance = true`, ceata **nu** se retrage peste statia urmatoare, chiar daca `journeyScore` a depasit pragul. In schimb apare o carare laterala punctata, in olive, care se desprinde din drumul principal si iese din cadru catre axele slabe. La atingere, deschide recomandarile de curs pentru `weakestAxes`.

Harta nu afiseaza niciun mesaj de reprosare. Doar arata o carare neumblata.

---

## 3. Straturile de randare

| Strat | Continut | Comportament |
|---|---|---|
| 1 | `map-dawn.webp` | static, parallax 0.85x la scroll |
| 2 | ceata pe portiunea neparcursa | animata dupa `journeyScore` |
| 3 | nodurile celor 8 statii | SVG, stari: passed / current / next / distant / blocked |
| 4 | silueta / siluetele calatorului | pozitionate pe procent, flat vector, fundal transparent |
| 5 | cararea laterala | SVG punctat, numai cand `blockedByBalance` |
| 6 | butonul Cruce, fixat jos | **vizibil in orice stare, inclusiv la 0%** |

Stratul 6 nu depinde de niciun strat de deasupra si nu poate fi acoperit de ceata. Vezi principiul P1 din documentul 43.

---

## 4. Siluetele calatorului

Flat vector, fundal transparent, carbune plin cu grain, fara contur.

```
traveller-stand.webp
traveller-walk.webp
traveller-run.webp
```

Acelasi personaj in toate trei, vazut din spate, roba simpla, acoperamant de cap, toiag.

- statiile 1–5: o silueta
- **statia 6 si mai departe: doua siluete**, a doua putin in urma si lateral, cu un rim-light cald pe contur
- statia 8: varianta `run`, inclinata inainte

A doua silueta **nu se explica nicaieri** in interfata. Fara eticheta, fara tooltip, fara notificare. Userul o observa singur.

---

## 5. Animatii

| Eveniment | Animatie | Durata |
|---|---|---|
| Lectie terminata | Calatorul avanseaza pe poteca | 900 ms |
| Modul complet | Avans plus o sclipire scurta pe nodul urmator | 1400 ms |
| Statie noua atinsa | Ceata se retrage peste reperul respectiv | 2000 ms |
| Statia 6 | A doua silueta apare in fade | 1600 ms |

Toate respecta `prefers-reduced-motion: reduce`. Cu reduced motion, tranzitiile devin instantanee, fara pierdere de informatie.

---

## 6. Prompt de referinta pentru regenerarea hartii

De folosit daca harta trebuie randata din nou. Se da imaginea aprobata ca referinta vizuala, nu doar textul.

```
Single continuous VERTICAL illustration, extreme portrait ratio 1:3.5.
Low-poly faceted style: angular geometric rock and terrain facets, soft
atmospheric gradients, warm volumetric glow, painted depth and haze.

DAWN light throughout. Palette limited to warm amber, golden ochre,
burnt orange, terracotta, with deep indigo-navy only in shadow.
NO light blue sky, NO saturated green. The sky is pale amber to ochre.

A single winding pale road runs unbroken from the very bottom edge to
the very top edge, catching the warm light along its whole length.
Dark angular rock walls frame the left and right margins throughout.

From bottom to top, in this exact order:
  - an arched stone city gate, backlit, light spilling onto the road
  - open dry hills, the road exposed and winding
  - a bare rounded hill crowned with THREE CROSSES in silhouette,
    the central one taller; shape and shadow only, nothing graphic
  - a rock-cut tomb with the round stone rolled aside, warm light
    spilling OUTWARD from the dark opening
  - a small village of flat-roofed stone houses; ONE house set apart
    with a single window glowing intense amber
  - on the far horizon at the top, a walled city glowing warm,
    small and distant

NO text, letters, numbers, icons, markers, pins, labels, watermarks.
NO human figures. NO faces. NO halos or auras.

AVOID: isometric game map, cartoon board-game look, anime,
photorealism, heavy black outlines, saturated primary colours,
religious kitsch.
```

---

## 7. Ce se schimba fata de documentul 43

| Sectiunea din 43 | Stare |
|---|---|
| 9.1 Structura in trei straturi cu poteca SVG | **Inlocuita** de sectiunea 3 de aici |
| 9.4 Animatii | **Inlocuita** de sectiunea 5 de aici |
| 10.3 Generat vs. construit | **Inlocuita** de sectiunile 1 si 2 de aici |
| 10.2 Lista de assets — cele 8 scene de statie | Ramane valabila. Scenele se folosesc pe cardurile de statie, in flat vector. |
| Tot restul (algoritm, praguri, persistenta, teste, anti-goals) | Neschimbat |
