// Drumul Emaus — motorul de progres.
//
// Spec: docs/43-drumul-emaus-centru-progres.md, revizuit de docs/43a-drumul-emaus-stil-vizual.md
// (ambele pe ramura spec/drumul-emaus). Aici e etapa 1 din 43 §16: datele si algoritmul, fara UI
// si fara ilustratii. Nu depinde de nimic si nu atinge gamification.ts, conform 43 §13.
//
// Patru abateri fata de spec, toate deliberate:
//
// 1. Tipul returnat se numeste EmmausJourney, nu JourneyState. In apps/web/src/journey.ts exista
//    deja un JourneyState — starea parcursului dintr-o usa. Ecranul hartii le importa pe amandoua,
//    deci nu pot purta acelasi nume.
//
// 2. Toate numele exportate sunt prefixate cu Emmaus sau EMMAUS. Fisierul intra in barrel-ul
//    packages/shared/src/index.ts, care re-exporta cu export *. Un nume duplicat acolo nu e
//    avertisment, e eroare de compilare. AxisProgress si StationId erau prea generice.
//
// 3. Statia poarta doar referinta versetului, nu si textul lui (verseRo in spec). Textul se ia din
//    Biblie la afisare. Motivul e docs/23-inlocuirea-textului.md: textul biblic are o singura sursa.
//    O a doua copie scrisa de mana se desincronizeaza — s-a intamplat deja de doua ori pe ramura asta.
//
// 4. Scorul numara si lectiile din Porti, nu doar modulele din library/. Specul presupunea ca tot
//    continutul e in library. Nu mai e. Fara EMMAUS_PATH_AXES de mai jos, cine termina cele sapte
//    lectii de suferinta deschide harta si vede zero la suta — adica exact mesajul ca nimic din ce
//    a facut nu conteaza.

import type { GrowthAxisId } from "./domain.js"
import { GROWTH_AXES } from "./domain.js"

export type EmmausStationId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

export type EmmausUnlock = "cross_meditation" | "thanksgiving_prayer" | "discipleship"

export interface EmmausStation {
  id: EmmausStationId
  slug: string
  labelRo: string
  /** Referinta, nu textul. Vezi abaterea 3 din antet. */
  verseRef: string
  /** Prag pe journeyScore, 0..1. */
  threshold: number
  /** Prag dur: cate axe trebuie sa aiba cel putin o unitate completa. Nu se compenseaza cu volum. */
  minAxesTouched?: number
  unlocks?: EmmausUnlock
  /** Cheie de asset, fara cale si fara extensie. */
  illustration: string
  /** Fractiune din inaltimea hartii, masurata de jos. docs/43a §2.1. */
  mapPosition: number
}

// Ordinea cronologica din 43 §2, principiul P2: Golgota este statia 4, la mijloc. Drumul nu se
// termina la cruce, pentru ca nici in Luca 24 nu se termina acolo.
export const EMMAUS_STATIONS: EmmausStation[] = [
  {
    id: 1,
    slug: "plecarea",
    labelRo: "Plecarea din Ierusalim",
    verseRef: "Luca 24:13",
    threshold: 0,
    illustration: "station-01-plecarea",
    mapPosition: 0.03,
  },
  {
    id: 2,
    slug: "drumul",
    labelRo: "Drumul și întrebările",
    verseRef: "Luca 24:17-21",
    threshold: 0.1,
    illustration: "station-02-drumul",
    mapPosition: 0.15,
  },
  {
    id: 3,
    slug: "dealul",
    labelRo: "Dealul se vede în depărtare",
    verseRef: "Luca 23:33",
    threshold: 0.22,
    illustration: "station-03-dealul",
    mapPosition: 0.28,
  },
  {
    id: 4,
    slug: "golgota",
    labelRo: "Golgota",
    verseRef: "Luca 23:44-46",
    threshold: 0.35,
    unlocks: "cross_meditation",
    illustration: "station-04-golgota",
    mapPosition: 0.4,
  },
  {
    id: 5,
    slug: "mormantul",
    labelRo: "Mormântul gol",
    verseRef: "Luca 24:2-6",
    threshold: 0.5,
    minAxesTouched: 4,
    illustration: "station-05-mormantul",
    mapPosition: 0.55,
  },
  {
    id: 6,
    slug: "strainul",
    labelRo: "Străinul Se apropie",
    verseRef: "Luca 24:15-16",
    threshold: 0.65,
    minAxesTouched: 5,
    illustration: "station-06-strainul",
    mapPosition: 0.68,
  },
  {
    id: 7,
    slug: "frangerea-painii",
    labelRo: "Frângerea pâinii",
    verseRef: "Luca 24:30-31",
    threshold: 0.8,
    minAxesTouched: 6,
    unlocks: "thanksgiving_prayer",
    // Specul scrie cheia de asset "station-07-franerea-painii". Lipseste un g. Aici e forma corecta;
    // cand se genereaza assetul, se foloseste numele de aici, nu cel din 43 §10.2.
    illustration: "station-07-frangerea-painii",
    mapPosition: 0.8,
  },
  {
    id: 8,
    slug: "intoarcerea",
    labelRo: "Întoarcerea la Ierusalim",
    verseRef: "Luca 24:33-35",
    threshold: 0.92,
    minAxesTouched: 6,
    unlocks: "discipleship",
    illustration: "station-08-intoarcerea",
    mapPosition: 0.94,
  },
]

// 43 §2, principiul P1. Crucea nu se blocheaza niciodata, in nicio stare, nici la scor zero.
// Daca deblocarea crucii ar depinde de procent, mesajul implicit al aplicatiei ar fi ca mantuirea
// vine dupa cursuri. Constanta exista ca sa se poata verifica runtime, nu doar la tipuri.
export const EMMAUS_CROSS_IS_ALWAYS_OPEN = true

/** O unitate de continut care contribuie la scor: un modul din library sau un drum din Porti. */
export type EmmausUnitKind = "module" | "course" | "path"

export interface EmmausUnit {
  id: string
  axis: GrowthAxisId
  kind: EmmausUnitKind
  lessonIds: string[]
  /** Secvențe echivalente ale aceleiași unități, alese contextual prin Porți. */
  lessonAlternatives?: string[][]
}

// Axa fiecarui drum din Porti. Modulele din library isi poarta axa in date; drumurile nu, pentru ca
// PathDef nu are camp de axa. Maparea de aici e o propunere de continut, nu un adevar tehnic — se
// schimba pe un rand per drum. Reperul folosit e firul tematic din docs/27 §2.4.
export const EMMAUS_PATH_AXES: Record<string, GrowthAxisId> = {
  path_acasa: "freedom",
  path_schimbare: "freedom",
  path_neiertare: "relationships",
  path_divort: "relationships",
  path_impreuna: "relationships",
  path_suferinta: "living_faith",
  path_temelie: "living_faith",
  path_aproape: "living_faith",
  path_tristete: "emotional_peace",
  path_anxietate: "emotional_peace",
  // Retras din alegere, dar pastrat: cine il are salvat isi vede in continuare progresul pe harta.
  path_greutate: "emotional_peace",
  path_har: "identity",
  path_legatura: "relationships",
  path_paine: "character",
  path_umblare: "character",
}

type ReviewShape = { required: ReadonlyArray<string>; approved: ReadonlyArray<string> }
type EmmausPathShape = {
  id: string
  lessons: ReadonlyArray<{ id: string }>
  offerAtPathEnd?: boolean
  review?: ReviewShape
  doorVariants?: Record<string, {
    lessons: ReadonlyArray<{ id: string }>
    review?: ReviewShape
  }>
}

function reviewIsClosed(review?: ReviewShape): boolean {
  if (!review) return true
  const approved = new Set(review.approved)
  return review.required.every((kind) => approved.has(kind))
}

/** Transforma doar drumurile publice din PATHS in unitati de scor. */
export function emmausUnitsFromPaths(
  paths: ReadonlyArray<EmmausPathShape>,
  options: { completedLessonIds?: ReadonlyArray<string> } = {},
): EmmausUnit[] {
  const units: EmmausUnit[] = []
  const completed = new Set(options.completedLessonIds ?? [])
  for (const path of paths) {
    const axis = EMMAUS_PATH_AXES[path.id]
    if (!axis || !reviewIsClosed(path.review)) continue
    const baseLessonIds = path.lessons.map((lesson) => lesson.id)
    // Un drum retras nu intră în numitorul unui utilizator nou, dar rămâne pe
    // hartă dacă omul are deja progres real în el.
    if (path.offerAtPathEnd === false && !baseLessonIds.some((id) => completed.has(id))) continue
    const alternatives = Object.values(path.doorVariants ?? {})
      .filter((variant) => reviewIsClosed(variant.review ?? path.review))
      .map((variant) => variant.lessons.map((lesson) => lesson.id))
      .filter((lessonIds) => lessonIds.length > 0)
    units.push({
      id: path.id,
      axis,
      kind: "path",
      lessonIds: baseLessonIds,
      ...(alternatives.length ? { lessonAlternatives: alternatives } : {}),
    })
  }
  return units
}

export const EMMAUS_LIBRARY_SHELF_AXES: Record<string, GrowthAxisId> = {
  lib_temelie: "identity",
  lib_intrebari: "living_faith",
  lib_cuvantul: "living_faith",
  lib_rugaciune: "living_faith",
  lib_casa: "relationships",
  lib_viata: "character",
  lib_cei_mici: "identity",
  lib_creatori: "character",
  lib_identitate_vocatie: "identity",
  lib_barbati: "character",
  lib_femei: "character",
  lib_relatii_comune: "relationships",
  lib_dependente: "freedom",
  lib_doliu_traumatic: "emotional_peace",
  lib_spiritual: "freedom",
}

/** Cursuri a căror temă principală diferă de axa generală a raftului. */
export const EMMAUS_LIBRARY_COURSE_AXES: Record<string, GrowthAxisId> = {
  lib_copii_emotii: "emotional_peace",
  barbati_c2_lupta: "emotional_peace",
  femei_c2_lupta: "emotional_peace",
  comun_c1_singuratate: "emotional_peace",
}

/** Leagă fiecare curs publicat de axa raftului său, fără a dubla lecțiile în UI. */
export function emmausUnitsFromLibraryShelves(
  shelves: ReadonlyArray<{
    id: string
    courses: ReadonlyArray<{ id: string; lessonIds: ReadonlyArray<string> }>
  }>,
): EmmausUnit[] {
  return shelves.flatMap((shelf) => {
    const axis = EMMAUS_LIBRARY_SHELF_AXES[shelf.id]
    if (!axis) return []
    return shelf.courses
      .filter((course) => course.lessonIds.length > 0)
      .map((course) => ({
        id: course.id,
        axis: EMMAUS_LIBRARY_COURSE_AXES[course.id] ?? axis,
        kind: "course" as const,
        lessonIds: [...course.lessonIds],
      }))
  })
}

/** Transforma modulele din library in unitati de scor. */
export function emmausUnitsFromModules(
  modules: ReadonlyArray<{ id: string; axis: GrowthAxisId; lessonIds: ReadonlyArray<string> }>,
): EmmausUnit[] {
  return modules.map((mod) => ({
    id: mod.id,
    axis: mod.axis,
    kind: "module" as const,
    lessonIds: [...mod.lessonIds],
  }))
}

export interface EmmausAxisProgress {
  axis: GrowthAxisId
  lessonsDone: number
  lessonsTotal: number
  unitsComplete: number
  unitsTotal: number
  /** lessonsDone / lessonsTotal, 0 daca axa nu are continut publicat. */
  ratio: number
}

export interface ComputeEmmausInput {
  units: EmmausUnit[]
  completedLessonIds: string[]
  /** Statia maxima atinsa vreodata, persistata. Scorul nu scade cand se publica continut nou. */
  maxStationReached?: EmmausStationId
}

export interface EmmausJourney {
  journeyScore: number
  breadth: number
  balance: number
  depth: number
  axisProgress: Record<GrowthAxisId, EmmausAxisProgress>
  axesTouched: number
  /** Cel mult doua, pentru cararea laterala si pentru recommendation.ts. */
  weakestAxes: GrowthAxisId[]
  currentStation: EmmausStation
  nextStation: EmmausStation | null
  progressToNext: number
  blockedByBalance: boolean
  crossAlwaysOpen: true
}

function clamp01(value: number): number {
  if (!Number.isFinite(value)) return 0
  if (value < 0) return 0
  if (value > 1) return 1
  return value
}

export function emmausStationById(id: EmmausStationId): EmmausStation {
  const found = EMMAUS_STATIONS.find((station) => station.id === id)
  return found ?? EMMAUS_STATIONS[0]
}

/**
 * Calculeaza pozitia pe Drumul Emaus.
 *
 * Nu masoara doar cat a parcurs cineva, ci si cat de echilibrat. Un om cu sase unitati pe o singura
 * axa e mai putin departe pe drum decat unul cu sase unitati pe sase axe. 43 §5.
 */
export function computeEmmausJourney(input: ComputeEmmausInput): EmmausJourney {
  const done = new Set(input.completedLessonIds)

  const axisProgress = {} as Record<GrowthAxisId, EmmausAxisProgress>
  for (const axis of GROWTH_AXES) {
    axisProgress[axis] = {
      axis,
      lessonsDone: 0,
      lessonsTotal: 0,
      unitsComplete: 0,
      unitsTotal: 0,
      ratio: 0,
    }
  }

  let lessonsDone = 0
  let lessonsTotal = 0
  let unitsComplete = 0
  let unitsTotal = 0

  // O lectie care apare in doua unitati se numara o singura data in totaluri. Altfel lectiile de
  // doctrina, care sunt progres global pe ID-uri, ar umfla numitorul.
  const counted = new Set<string>()

  for (const unit of input.units) {
    const bucket = axisProgress[unit.axis]
    if (!bucket) continue
    const candidates = [unit.lessonIds, ...(unit.lessonAlternatives ?? [])]
      .filter((lessonIds) => lessonIds.length > 0)
    if (candidates.length === 0) continue
    const lessonIds = candidates.reduce((best, candidate) => {
      const bestDone = best.filter((lessonId) => done.has(lessonId)).length
      const candidateDone = candidate.filter((lessonId) => done.has(lessonId)).length
      const bestRatio = bestDone / best.length
      const candidateRatio = candidateDone / candidate.length
      if (candidateRatio > bestRatio) return candidate
      if (candidateRatio === bestRatio && candidateDone > bestDone) return candidate
      return best
    })

    for (const lessonId of lessonIds) {
      if (counted.has(lessonId)) continue
      counted.add(lessonId)
      bucket.lessonsTotal += 1
      lessonsTotal += 1
      if (done.has(lessonId)) {
        bucket.lessonsDone += 1
        lessonsDone += 1
      }
    }

    // Completarea unitatii se judeca pe toate lectiile ei, inclusiv pe cele numarate in alta parte.
    const unitDone = lessonIds.filter((lessonId) => done.has(lessonId)).length
    bucket.unitsTotal += 1
    unitsTotal += 1
    if (unitDone === lessonIds.length) {
      bucket.unitsComplete += 1
      unitsComplete += 1
    }
  }

  for (const axis of GROWTH_AXES) {
    const progress = axisProgress[axis]
    progress.ratio = progress.lessonsTotal > 0 ? progress.lessonsDone / progress.lessonsTotal : 0
  }

  // O axa fara continut publicat se exclude din echilibru si din pragul dur. Altfel n-ar putea
  // trece nimeni de statia 5 pana nu scriem continut pe toate cele sase axe. 43 §5.6.
  const activeAxes = GROWTH_AXES.filter((axis) => axisProgress[axis].lessonsTotal > 0)
  const ratios = activeAxes.map((axis) => axisProgress[axis].ratio)

  const breadth = lessonsTotal > 0 ? lessonsDone / lessonsTotal : 0
  const depth = unitsTotal > 0 ? unitsComplete / unitsTotal : 0

  // Media geometrica impartita la media aritmetica. Proprietatea care conteaza: daca o singura axa
  // e la zero, media geometrica e zero, deci echilibrul e zero. Nu se compenseaza cu volum.
  let balance = 0
  if (ratios.length > 0) {
    const aritMean = ratios.reduce((sum, ratio) => sum + ratio, 0) / ratios.length
    let geoMean = 0
    if (ratios.every((ratio) => ratio > 0)) {
      // Prin logaritmi, ca sa nu se piarda precizia cand rapoartele sunt mici.
      const logSum = ratios.reduce((sum, ratio) => sum + Math.log(ratio), 0)
      geoMean = Math.exp(logSum / ratios.length)
    }
    balance = aritMean > 0 ? clamp01(geoMean / aritMean) : 0
  }

  const depthNorm = breadth > 0 ? Math.min(1, depth / breadth) : 0
  const journeyScore = clamp01(breadth * (0.55 + 0.3 * balance + 0.15 * depthNorm))

  // Atinsa inseamna cel putin o unitate completa pe axa aceea, nu o lectie razleata.
  const axesTouched = activeAxes.filter((axis) => axisProgress[axis].unitsComplete > 0).length

  let reached = EMMAUS_STATIONS[0]
  for (const station of EMMAUS_STATIONS) {
    const scoreOk = journeyScore >= station.threshold
    const axesOk = axesTouched >= (station.minAxesTouched ?? 0)
    if (!scoreOk || !axesOk) break
    reached = station
  }

  // Scorul nu da niciodata inapoi. Fara asta, fiecare carte biblica publicata ar retrograda oamenii
  // care erau deja departe pe drum. 43 §5.6, ultimul rand din tabel.
  const floorId: EmmausStationId = input.maxStationReached ?? 1
  const currentStation = reached.id >= floorId ? reached : emmausStationById(floorId)

  const nextStation =
    currentStation.id < 8 ? emmausStationById((currentStation.id + 1) as EmmausStationId) : null

  let progressToNext = 0
  if (nextStation) {
    const span = nextStation.threshold - currentStation.threshold
    progressToNext = span > 0 ? clamp01((journeyScore - currentStation.threshold) / span) : 1
  }

  // Scorul a trecut pragul, dar echilibrul nu. Statia urmatoare ramane in ceata si se deschide
  // cararea laterala catre axele slabe. Harta nu cearta pe nimeni. 43 §2, principiul P4.
  const blockedByBalance =
    nextStation !== null &&
    journeyScore >= nextStation.threshold &&
    axesTouched < (nextStation.minAxesTouched ?? 0)

  const weakestAxes = activeAxes
    .filter((axis) => axisProgress[axis].ratio < 1)
    .sort((a, b) => axisProgress[a].ratio - axisProgress[b].ratio)
    .slice(0, 2)

  return {
    journeyScore,
    breadth,
    balance,
    depth,
    axisProgress,
    axesTouched,
    weakestAxes,
    currentStation,
    nextStation,
    progressToNext,
    blockedByBalance,
    crossAlwaysOpen: true,
  }
}
