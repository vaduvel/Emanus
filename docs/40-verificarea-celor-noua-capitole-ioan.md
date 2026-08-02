# Verificarea celor noua capitole din Ioan cu text provizoriu

## De unde vine datoria aceasta

PR #11 (ramura `draft/ioan-kickoff`) a recunoscut in corpul lui:

> pentru Ioan 2, 4, 7, 9, 11, 13, 14, 19 si 20, bootstrap-ul textului a folosit
> provizoriu RMNN din BibleGateway din cauza timeout-urilor la eBible

PR #12 a repetat avertismentul si a cerut colationarea inainte de publicare.

Intre timp, `docs/38-inlocuirea-textului-rccv.md` raporteaza ca textul a fost
inlocuit cu RCCV pe toate cele trei carti: Geneza 320 de unitati, Matei 1071 de
versete, Ioan 65 de unitati, "Sarite: Nimic."

Documentul de fata inchide verificarea.

## Ce s-a verificat

S-a citit campul `text` al fiecarei unitati din cele noua capitole semnalate,
pe ramura `codex/matei-verse-by-verse`, la commit `a9360e54`.

Capitolul 2 nu are fisier propriu; el sta in `ioan.ts`, impreuna cu capitolul 1.

| Capitol | Fisier | Unitati | Rezultat |
| --- | --- | --- | --- |
| Ioan 2 | `ioan.ts` | 3 | curat |
| Ioan 4 | `ioan4.ts` | 3 | curat |
| Ioan 7 | `ioan7.ts` | 3 | curat |
| Ioan 9 | `ioan9.ts` | 3 | curat |
| Ioan 11 | `ioan11.ts` | 3 | curat |
| Ioan 13 | `ioan13.ts` | 3 | curat |
| Ioan 14 | `ioan14.ts` | 3 | curat |
| Ioan 19 | `ioan19.ts` | 3 | curat |
| Ioan 20 | `ioan20.ts` | 3 | curat |

## Semnele dupa care s-a facut deosebirea

RMNN si Cornilescu se despart la vedere in cateva locuri statornice. S-au
cautat anume acestea:

- **"Hristos" fata de "Cristos".** RMNN scrie "Cristos". In toate cele noua
  capitole apare "Hristos" si "Hristosul". Acesta este semnul cel mai sigur.
- **Topica veche a lui Cornilescu.** "Mantuirea vine de la iudei" (4:22),
  "scaldatoarea Siloamului" (9:7), "Iata Omul" (19:5), "S-a ispravit" (19:30),
  "Rabuni" (20:16), "Ferice de cei ce n-au vazut, si au crezut" (20:29).
- **Formulele de la Cana** (2:4-5): "Femeie, ce am a face Eu cu tine?" si
  "Sa faceti orice va va zice".
- **"Ravna pentru Casa Ta Ma mananca pe Mine"** (2:17), citat dupa Psalmul 69:9
  in forma lui Cornilescu.
- **"un alt Mangaietor"** (14:16), unde RMNN foloseste alt cuvant.

Nu s-a gasit nicio urma de RMNN. Agentul de desktop a facut inlocuirea corect.
Datoria semnalata in PR #11 si PR #12 se poate socoti inchisa.

## Ce a ramas totusi de indreptat

Verificarea a scos la iveala trei lucruri care nu tin de sursa textului, dar
care tin de curatenia lui.

### 1. Sedilele

Tot textul biblic din cele noua capitole foloseste inca s si t cu sedila in loc
de s si t cu virgula dedesubt:

- `s` cu sedila este U+015F; forma buna este U+0219.
- `t` cu sedila este U+0163; forma buna este U+021B.

Asa apare peste tot: "fantana", "viata vesnica", "Imparatia", "praznicul".
Pe telefoanele si in fonturile de azi, sedila se vede altfel decat virgula si
nu este ortografia romaneasca in vigoare. Aceasta este singura piedica reala
care a mai ramas intre textul acesta si un cititor de astazi.

Indreptarea este mecanica, dintr-o singura trecere, si trebuie facuta pe toate
cele trei carti deodata, nu numai pe cele noua capitole. Se cuvine facuta de
agentul care are scriptul de inlocuire, nu prin rescrierea fisierelor cu mana.

### 2. Doua feluri de scriere in explicatii

Explicatiile nu sunt scrise la fel peste tot:

- fara diacritice: `ioan.ts`, `ioan4.ts`, `ioan7.ts`, `ioan9.ts`, `ioan11.ts`,
  `ioan13.ts`;
- cu diacritice depline: `ioan14.ts`, `ioan19.ts`, `ioan20.ts`.

Textul biblic nu este atins de asta, dar cititorul va vedea deosebirea de la un
capitol la altul. Trebuie ales un singur fel si dus pana la capat.

### 3. O despartire in silabe ramasa in text

In `ioan.ts`, unitatea `ioan-2-13-22`, in `teaching`, sta scris:

> Si aici se cuvine sa luam mangaie-re.

Cratima aceea nu are ce cauta acolo. Trebuie sa scrie "mangaiere".

## Nota despre drepturi

Antetul din `ioan.ts` spune "RCCV, domeniu public". La fel spun `types.ts`,
`docs/21-biblia-explicata.md` si `docs/38`. Afirmatia aceasta nu este dovedita
pentru Romania. Vezi `docs/39-biblia-intreaga-text-rccv.md`, unde este cantarita
pe larg: Cornilescu a murit in 1975, iar hotararea Tribunalului Bucuresti din
2008 nu aseaza traducerea lui in domeniul public la noi. Formularea trebuie
indreptata in toate cele patru locuri.
