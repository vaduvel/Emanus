import type { Lesson } from "../domain.js"
import { ANXIETATE_LESSONS, ANXIETATE_PRACTICES } from "./anxietate.js"
import { AVORT_LESSONS, AVORT_PRACTICES } from "./avort.js"
import { aproapeL1, aproapeL2, aproapeL3, aproapeL4, aproapeL5, aproapeL6, aproapeL7 } from "./aproape.js"
import { CLARIFICAREA_DEPENDENTEI_LESSONS, CLARIFICAREA_DEPENDENTEI_PRACTICES } from "./clarificareaDependentei.js"
import { DIVORT_LESSONS, DIVORT_PRACTICES } from "./divort.js"
import { DIVORT_POZITII_LESSONS, DIVORT_POZITII_PRACTICES } from "./divortPozitii.js"
import { DOCTRINE_LESSONS } from "./doctrina.js"
import { FAMILIE_RESPINGE_LESSONS, FAMILIE_RESPINGE_PRACTICES } from "./familieRespinge.js"
import { GREUTATE_LESSONS, GREUTATE_PRACTICES } from "./greutate.js"
import { harL1, harL2, harL3, harL4, harL5, harL6, harL7 } from "./har.js"
import {
  impreunaL1,
  impreunaL2,
  impreunaL3,
  impreunaL4,
  impreunaL5,
  impreunaL6,
  impreunaL7,
} from "./impreuna.js"
import { neiertareL1, neiertareL2, neiertareL3 } from "./neiertareA.js"
import { neiertareL4, neiertareL5 } from "./neiertareB.js"
import { neiertareL6, neiertareL7 } from "./neiertareC.js"
import { neiertareO1, neiertareO2 } from "./neiertareOpen.js"
import { INSELAT_LESSONS, INSELAT_PRACTICES } from "./inselat.js"
import { LEGATURA_LESSONS, LEGATURA_PRACTICES } from "./legatura.js"
import { NOU_VENIT_LESSONS, NOU_VENIT_PRACTICES } from "./nouVenit.js"
import { PAINE_LESSONS, PAINE_PRACTICES } from "./paine.js"
import { PORNOGRAFIE_LESSONS, PORNOGRAFIE_PRACTICES } from "./pornografie.js"
import { RESPINS_BISERICA_LESSONS, RESPINS_BISERICA_PRACTICES } from "./respinsBiserica.js"
import { rusineL1, rusineL2, rusineL3, rusineL4 } from "./rusineA.js"
import { rusineL5, rusineL6, rusineL7 } from "./rusineB.js"
import { schimbareL1, schimbareL2, schimbareL3, schimbareL4 } from "./schimbareA.js"
import { schimbareL5, schimbareL6, schimbareL7 } from "./schimbareB.js"
import { SUFERINTA_LESSONS, SUFERINTA_PRACTICES } from "./suferinta.js"
import { TEMELIE_LESSONS, TEMELIE_PRACTICES } from "./temelie.js"
import { TRISTETE_LESSONS, TRISTETE_PRACTICES } from "./tristete.js"
import { umblareL1, umblareL2, umblareL3 } from "./umblareA.js"
import { umblareL4, umblareL5, umblareL6, umblareL7 } from "./umblareB.js"

export * from "./anxietate.js"
export * from "./aproape.js"
export * from "./avort.js"
export * from "./bridges.js"
export * from "./clarificareaDependentei.js"
export * from "./divort.js"
export * from "./divortPozitii.js"
export * from "./doctrina.js"
export * from "./doorEntries.js"
export * from "./familieRespinge.js"
export * from "./greutate.js"
export * from "./har.js"
export * from "./impreuna.js"
export * from "./inselat.js"
export * from "./legatura.js"
export * from "./neiertareOpen.js"
export * from "./nouVenit.js"
export * from "./paine.js"
export * from "./pornografie.js"
export * from "./respinsBiserica.js"
export * from "./rusineA.js"
export * from "./rusineB.js"
export * from "./schimbareA.js"
export * from "./schimbareB.js"
export * from "./suferinta.js"
export * from "./temelie.js"
export * from "./tristete.js"
export * from "./umblareA.js"
export * from "./umblareB.js"

/*
 * Uși, camere și parcursuri personal-generalizate.
 * Referință: docs/21-cum-lucreaza-Dumnezeu.md și docs/20-parcursuri-personal-generalizate.md
 * Siguranță și limite: docs/22-siguranta.md (are prioritate).
 * Inventarul conținutului pe fiecare ușă: docs/23-porti-continut.md
 * Taxonomia etichetă → ușă → drum → cameră: docs/24-taxonomia-usilor.md
 *
 * Modelul întreg stă pe un singur câmp salvat despre om: `pathId`.
 * Fără profil, fără scoruri, fără chestionar, fără memorie per utilizator.
 *
 * PRINCIPIUL: Dumnezeu întâlnește omul în mijlocul durerii lui. Nu există sală
 * de așteptare și nu există etape de trecut înainte de întâlnire. Omul intră
 * prin durerea lui, iar adevărul despre cine e Dumnezeu i se spune PRIN rană.
 *
 * GENERALIZAREA: nu grupăm după durere — durerile sunt infinite. Grupăm după
 * tiparul spiritual de dedesubt. Au fost șapte; sunt opt de când anxietatea și
 * tristețea au primit cameră proprie. Ușile rămân multe și în cuvintele omului;
 * camerele sunt puține.
 *
 * O CAMERĂ NU ÎNSEAMNĂ UN SINGUR DRUM. Camera adună oamenii care cred aceeași
 * minciună; drumul e răspunsul scris pentru ei. Când sub aceeași minciună stau
 * două suferințe care nu se tratează la fel, camera rămâne una și drumurile
 * sunt două. Așa e camera 8: `path_tristete` și `path_anxietate`. Ruta se ia
 * de pe ușă (`Door.pathId`), pe care `resolveDoorPath` o citește înaintea
 * camerei. `Room.pathId` rămâne doar implicitul, pentru o ușă nouă adăugată
 * fără drum.
 *
 * DE CE ZECE ȘI NU ȘAPTE (docs/22 §1 și amendamentul din docs/24): ușile `anxietate` și
 * `tristete` cădeau până acum în camera 5, "Nu mă pot schimba", a cărei minciună
 * este "Sunt defect, asta sunt". Adică omul care intra cu anxietate sau depresie
 * primea din prima secundă mesajul că problema lui e caracterul. docs/22 §1
 * interzice exact asta: anxietatea, tristețea, epuizarea și insomnia pot avea
 * cauze medicale. De aceea există camera 8.
 *
 * ATENȚIE, limită asumată: cele zece tipare sunt un instrument de orientare
 * inițială, NU un diagnostic. O durere poate avea și cauze medicale, relaționale
 * sau sociale. Nu spunem niciodată omului "boala ta e că nu crezi X" — ar fi o
 * vină în plus pusă pe cineva care deja suferă. Vezi docs/22-siguranta.md.
 *
 * TREI INTRĂRI, nu două (docs/21 §3):
 *   1. vine cu o durere        → camera lui (c1…c10)
 *   2. vine de la zero         → path_temelie
 *   3. vine să-și întărească relația → path_umblare
 *
 * DRUMURI FĂRĂ CAMERĂ: pe lângă cele zece camere există `path_umblare` (a treia
 * intrare) și două drumuri născute din uși ale camerei 2 cărora răspunsul
 * camerei nu li se potrivea: `path_divort` și `path_suferinta`. Se ajunge la ele
 * prin `pathId` pus direct pe ușă, pe care `resolveDoorPath` îl citește
 * înaintea camerei.
 *
 * STARE: toate cele zece camere au parcurs scris. `path_greutate` e RETRAS —
 * a fost înlocuit de cele două drumuri separate ale camerei 8; rămâne în cod
 * doar ca să nu rupă o stare salvată veche. `FALLBACK_PATH_ID` rămâne ca plasă
 * de siguranță, nu ca soluție pentru camere goale.
 */

/** Cele zece tipare de orientare pastorală în care sunt grupate ușile. */
export interface Room {
  id: string
  /** Numele camerei, cum îl vede omul. */
  title: string
  /** Ce crede omul care intră aici. Nu se afișează niciodată ca etichetă. */
  lie: string
  /**
   * Parcursul IMPLICIT al camerei; null = încă nescris.
   * Se folosește doar pentru ușile care nu au `pathId` propriu. Camera 8 are
   * două drumuri, deci aici stă cel pe care vrem să cadă o ușă nouă nescrisă.
   */
  pathId: string | null
}

export const ROOMS: Room[] = [
  {
    id: "c1",
    title: "Nu mă vrea așa cum sunt",
    lie: "Sunt prea murdar pentru El.",
    pathId: "path_acasa",
  },
  {
    id: "c2",
    title: "Nu e bun / m-a lăsat",
    lie: "Dacă era bun, nu s-ar fi întâmplat.",
    pathId: "path_neiertare",
  },
  {
    id: "c3",
    title: "Nu e real / nu se poate ști",
    lie: "Poate e doar o poveste.",
    pathId: "path_temelie",
  },
  {
    id: "c4",
    title: "E departe, nu mă aude",
    lie: "Am rămas singur pe drum.",
    pathId: "path_aproape",
  },
  {
    id: "c5",
    title: "Nu mă pot schimba",
    lie: "Sunt defect, asta sunt.",
    pathId: "path_schimbare",
  },
  {
    id: "c6",
    title: "Trebuie să merit",
    lie: "Mă iubește cât de bun sunt.",
    pathId: "path_har",
  },
  {
    id: "c7",
    title: "Sunt singur în asta",
    lie: "Nimeni nu înțelege și nimănui nu-i pasă.",
    pathId: "path_impreuna",
  },
  {
    /*
     * Camera 8 are DOUĂ drumuri: `path_tristete` și `path_anxietate`.
     * Implicitul e tristețea, nu pentru că ar fi mai importantă, ci pentru că
     * prima ei lecție face triajul complet de siguranță. Dacă cineva adaugă
     * mâine o ușă în camera asta și uită să-i pună drum, e mai bine să cadă
     * acolo unde întâi se întreabă dacă omul e în siguranță.
     */
    id: "c8",
    title: "Nu mai am putere / mi-e frică tot timpul",
    lie: "Dacă aș avea destulă credință, aș fi bine.",
    pathId: "path_tristete",
  },
  {
    id: "c9",
    title: "Cu ei nu se mai poate",
    lie: "Cu ei nu se mai poate.",
    pathId: "path_legatura",
  },
  {
    id: "c10",
    title: "Valorez cât aduc în casă",
    lie: "Valorez cât aduc în casă.",
    pathId: "path_paine",
  },
]

export function getRoom(roomId: string | null | undefined): Room | undefined {
  if (!roomId) return undefined
  return ROOMS.find((r) => r.id === roomId)
}

export interface Door {
  id: string
  /** Spus în cuvinte de om, nu religioase. Omul își vede propria propoziție. */
  label: string
  /** Camera în care duce ușa. `null` doar pentru ușile de la capătul listei. */
  roomId: string | null
  /**
   * Drumul către care duce ușa direct, sărind peste cameră.
   * `resolveDoorPath` îl citește ÎNAINTEA camerei, deci are prioritate.
   *
   * Se folosește în trei feluri:
   *   - ușile fără cameră (`inceput`, `umblare`, `nu_stiu`);
   *   - ușile care stau într-o cameră, dar au primit drum propriu pentru că
   *     răspunsul implicit al camerei nu li se potrivea: `divort` către
   *     `path_divort`, iar `doliu`, `boala` și `de_ce_permis` către
   *     `path_suferinta`;
   *   - ușile dintr-o cameră cu mai multe drumuri: `anxietate` și `tristete`
   *     stau amândouă în camera 8 și au fiecare drumul ei.
   */
  pathId?: string
  /** Formulări alternative folosite numai la căutare; nu creează uși noi. */
  aliases?: string[]
  /** True pentru cele 10 propoziții arătate înainte de "Arată-mi tot". */
  common?: boolean
}

/*
 * Cele 41 de uși. (docs/21 §3 și amendamentul din docs/24)
 * Omul nu alege o cameră — alege o propoziție. Nu află niciodată că e pe același
 * culoar cu alți patru. Ordinea e intenționat amestecată între camere, ca lista
 * să nu arate ca niște categorii.
 *
 * `common: true` = intră în primele 10 de pe ecran. Restul se văd la
 * "Arată-mi tot". 41 de opțiuni deodată obosesc pe telefon.
 */
export const DOORS: Door[] = [
  { id: "rusine", label: "Am făcut lucruri de care mi-e rușine", roomId: "c1", common: true, aliases: ["mă simt vinovat", "am făcut ceva grav", "păcate ascunse", "mi-e rușine să mă mărturisesc"] },
  { id: "neiertare", label: "Mi s-a făcut ceva și nu pot ierta", roomId: "c2", common: true },
  { id: "indoiala", label: "Nu știu dacă există Dumnezeu", roomId: "c3", common: true },
  { id: "perete", label: "Mă rog și parcă vorbesc în perete", roomId: "c4", common: true },
  { id: "dependenta", label: "Nu mă pot lăsa de un lucru", roomId: "c5", pathId: "path_schimbare", common: true, aliases: ["alcool", "droguri", "jocuri de noroc", "dependență digitală", "internet", "adicție"] },
  {
    id: "anxietate",
    label: "Trăiesc cu anxietate",
    roomId: "c8",
    pathId: "path_anxietate",
    common: true,
    aliases: ["atacuri de panică", "panică", "neliniște", "îngrijorare", "mi-e frică de viitor"],
  },
  {
    id: "doliu",
    label: "Am pierdut pe cineva",
    roomId: "c2",
    pathId: "path_suferinta",
    common: true,
    aliases: ["cum trec peste moartea cuiva", "văduvie", "am pierdut pe cineva drag"],
  },
  { id: "merit", label: "Fac tot ce trebuie și tot nu-mi ajunge", roomId: "c6", common: true },
  { id: "singuratate", label: "Nu am pe nimeni", roomId: "c7", common: true },
  { id: "nu_inteleg", label: "Sunt creștin, dar nu înțeleg ce citesc", roomId: "c3", common: true },
  { id: "obisnuinta", label: "Merg la biserică din obișnuință", roomId: "c6" },
  { id: "avort", label: "Am făcut un avort", roomId: "c1", pathId: "path_acasa", aliases: ["port un avort", "am pierdut copilul prin avort"] },
  { id: "biblia_inventata", label: "Cred că Biblia e inventată de oameni", roomId: "c3" },
  { id: "recadere", label: "Am promis de o sută de ori și tot cad", roomId: "c5" },
  { id: "uscaciune", label: "Nu mai simt nimic când mă rog", roomId: "c4" },
  { id: "familie_respinge", label: "Familia mea nu mă înțelege", roomId: "c7", pathId: "path_impreuna", aliases: ["familia mă respinge", "ai mei nu acceptă credința mea"] },
  {
    id: "boala",
    label: "Sunt bolnav sau e bolnav cineva drag",
    roomId: "c2",
    pathId: "path_suferinta",
  },
  { id: "infidelitate", label: "Mi-am înșelat soțul sau soția", roomId: "c1" },
  { id: "flacara", label: "Am fost aproape de Dumnezeu cândva", roomId: "c4" },
  { id: "frica_pedeapsa", label: "Mi-e frică să nu mă pedepsească", roomId: "c6" },
  { id: "respins_biserica", label: "M-am simțit respins în biserică", roomId: "c7", pathId: "path_impreuna", aliases: ["rănit în biserică", "abuz spiritual", "biserica m-a respins"] },
  {
    id: "de_ce_permis",
    label: "Nu înțeleg de ce a permis Dumnezeu asta",
    roomId: "c2",
    pathId: "path_suferinta",
  },
  { id: "pornografie", label: "Mă lupt cu pornografia", roomId: "c5", pathId: "path_schimbare", aliases: ["nu mă pot opri din pornografie", "conținut sexual", "masturbare"] },
  {
    id: "tristete",
    label: "Nu mai am chef de nimic",
    roomId: "c8",
    pathId: "path_tristete",
    aliases: ["nu mai am chef de viață", "de ce mă simt gol", "nu mă mai pot bucura", "deznădejde", "depresie"],
  },
  { id: "alte_credinte", label: "Am crezut alte lucruri înainte (energii, karma, univers)", roomId: "c3" },
  { id: "cum_citesc", label: "Nu știu cum să citesc Biblia", roomId: "c3", pathId: "path_temelie", aliases: ["cum înțeleg Biblia", "Biblia mi se pare grea"] },
  { id: "epuizat_slujire", label: "Sunt obosit de slujire", roomId: "c6" },
  { id: "nou_venit", label: "Sunt nou și nu cunosc pe nimeni", roomId: "c7", pathId: "path_impreuna", aliases: ["sunt nou în biserică", "nu cunosc pe nimeni la biserică"] },
  {
    id: "divort",
    label: "Am trecut printr-un divorț",
    roomId: "c9",
    pathId: "path_divort",
  },
  { id: "prea_departe", label: "Cred că sunt prea departe ca să mă mai întorc", roomId: "c1" },
  { id: "furie", label: "Mă enervez și rănesc oamenii din jur", roomId: "c5" },
  { id: "casnicie_rece", label: "Suntem străini în aceeași casă", roomId: "c9", common: true, aliases: ["căsnicie rece", "singur în căsnicie", "nu mai există iubire între noi"] },
  { id: "inselat", label: "Am fost înșelat", roomId: "c9", pathId: "path_legatura", aliases: ["soțul m-a înșelat", "soția m-a înșelat", "infidelitate suferită", "trădare în căsnicie"] },
  { id: "conflict_familie", label: "Nu ne mai vorbim", roomId: "c9", aliases: ["conflict în familie", "conflict cu prietenii", "conflict cu colegii"] },
  { id: "copil_departe", label: "Copilul meu s-a îndepărtat", roomId: "c9", aliases: ["copil rebel", "nu mai vorbesc cu copilul meu"] },
  { id: "crestere_copii", label: "Nu știu cum să-mi cresc copilul", roomId: "c9", aliases: ["educarea copiilor", "nu mă descurc ca părinte"] },
  { id: "parinti_varstnici", label: "Ai mei au îmbătrânit și eu nu mai pot", roomId: "c9", aliases: ["părinți vârstnici", "îngrijesc un părinte bolnav"] },
  { id: "fara_lucru", label: "Mi-am pierdut slujba", roomId: "c10", common: true, aliases: ["șomaj", "nu am de lucru", "nu-mi găsesc rostul"] },
  { id: "datorii", label: "Nu mai fac față la bani", roomId: "c10", aliases: ["datorii", "stres financiar", "nu ajung banii"] },
  { id: "plecat_departe", label: "Muncesc departe de familia mea", roomId: "c10", aliases: ["plecat la muncă în străinătate", "familie despărțită geografic"] },
  { id: "ramas_acasa", label: "Ai mei sunt plecați", roomId: "c10", aliases: ["părinți plecați la muncă", "soț plecat la muncă", "soție plecată la muncă"] },
]

export const COMMON_DOORS: Door[] = DOORS.filter((d) => d.common)
export const MORE_DOORS: Door[] = DOORS.filter((d) => !d.common)

/*
 * Ușile de la capătul listei: cine nu vine cu o rană anume. (docs/21 §3)
 * Nu îl forțăm într-o durere pe care nu o are.
 *
 * Sunt DOUĂ feluri de oameni aici și nu au nevoie de același lucru:
 *   - cel care nu știe nimic → De la zero (temelia)
 *   - cel care merge de ani și vrea mai adânc → Umblarea
 * Înainte aveam un singur drum pentru amândoi, adică îl trimiteam pe al doilea
 * la clasa întâia.
 */
export const EXPLORE_DOORS: Door[] = [
  { id: "inceput", label: "Vreau doar să-L cunosc", roomId: null, pathId: "path_temelie" },
  {
    id: "umblare",
    label: "Merg cu El, dar vreau mai aproape",
    roomId: null,
    pathId: "path_umblare",
  },
  { id: "nu_stiu", label: "Nu știu. Arată-mi tu.", roomId: null, pathId: "path_temelie" },
]

export const ALL_DOORS: Door[] = [...DOORS, ...EXPLORE_DOORS]

export function normalizeDoorQuery(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("ro")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

const SAFETY_SIGNALS = [
  "nu mai vreau sa traiesc",
  "vreau sa mor",
  "vreau sa termin cu tot",
  "imi fac rau",
  "m am ranit",
  "ma bate",
  "m a lovit",
  "ma ameninta",
  "mi e frica de el",
  "mi e frica de ea",
]

/** Pericolul nu este niciodată tratat ca sinonim pentru o ușă. */
export function hasSafetySignal(value: string): boolean {
  const query = normalizeDoorQuery(value)
  return SAFETY_SIGNALS.some((signal) => query.includes(signal))
}

export function searchDoors(value: string): Door[] {
  const query = normalizeDoorQuery(value)
  if (!query || hasSafetySignal(query)) return []
  return DOORS.filter((door) =>
    [door.label, ...(door.aliases ?? [])]
      .map(normalizeDoorQuery)
      .some((candidate) => candidate.includes(query) || query.includes(candidate)),
  )
}

export function getDoor(doorId: string | null | undefined): Door | undefined {
  if (!doorId) return undefined
  return ALL_DOORS.find((d) => d.id === doorId)
}

/** Plasă de siguranță, dacă apare vreodată o ușă fără drum. */
export const FALLBACK_PATH_ID = "path_temelie"

/**
 * Nicio ușă nu e fundătură. (docs/21 §7 pct. 5)
 * Toate cele zece camere au parcurs scris, deci fallback-ul nu se mai atinge
 * în practică. Rămâne pentru uși noi adăugate înainte de conțențutul lor.
 */
export function resolveDoorPath(doorId: string): string {
  const door = getDoor(doorId)
  if (door?.pathId) return door.pathId
  return getRoom(door?.roomId)?.pathId ?? FALLBACK_PATH_ID
}

/** True dacă ușa duce în drumul ei propriu, nu într-un înlocuitor. */
export function doorHasOwnRoom(doorId: string): boolean {
  const door = getDoor(doorId)
  if (door?.pathId) return true
  return getRoom(door?.roomId)?.pathId != null
}

export function doorsForRoom(roomId: string): Door[] {
  return DOORS.filter((d) => d.roomId === roomId)
}

export interface PathDef {
  id: string
  /** Camera căreia îi aparține parcursul; null pentru drumurile fără cameră. */
  roomId: string | null
  title: string
  /** Ce primește omul. O propoziție, fără promisiuni pe care nu le putem ține. */
  promise: string
  lessons: Lesson[]
  /** Ziua dintre lecții. Index aliniat cu lessons: practices[i] urmează după lessons[i]. */
  practices: string[]
  /** Modul în care lecțiile generale de doctrină se raportează la acest drum. */
  doctrineMode?: "parallel" | "embedded" | "none"
  /** Puntea contextuală afișată înaintea oricărei continuări opționale. */
  bridgeId?: string
  /** Secvențe care diferă pentru o ușă, fără a duplica întregul drum. */
  doorVariants?: Record<string, PathDoorVariant>
  review?: PathReviewGate
  /**
   * Dacă drumul are voie să fie PROPUS cuiva care tocmai a terminat alt drum.
   *
   * Nu e o setare de afișare, e o poartă de siguranță. Un drum ajunge aici cu
   * `false` în două situații:
   *   - e provizoriu, adică scris dar încă netrecut prin revizia cerută
   *     (clinică pentru tristețe și anxietate, pastorală pentru ce atinge
   *     căsnicia). Omul care l-a ales singur, prin ușa lui, îl primește; dar
   *     nu i-l punem în față cuiva care nu l-a cerut. Un curs nerevizuit oferit
   *     din proprie inițiativă e altceva decât unul cerut.
   *   - e retras din circulație și rămâne doar pentru stările salvate vechi.
   *
   * Câmpul e OBLIGATORIU intenționat. Cine adaugă un drum nou trebuie să
   * răspundă la întrebarea asta, nu să o uite.
   */
  offerAtPathEnd: boolean
}

export interface PathDoorVariant {
  title?: string
  promise?: string
  lessons: Lesson[]
  practices: string[]
  review?: PathReviewGate
}

export type PathReviewKind = "editorial" | "pastoral" | "clinical"
export interface PathReviewGate {
  required: PathReviewKind[]
  approved: PathReviewKind[]
}

/*
 * Camera 1: "Nu mă vrea așa cum sunt".
 * Intră aici rușinea, pornografia, infidelitatea, avortul, "sunt prea departe".
 *
 * ORDINEA (docs/21 §2): camera NU începe cu păcatul omului, ci cu faptul că El
 * S-a mișcat primul, când omul era încă murdar (Romani 5:8; Luca 15:20).
 * Cine crede că trebuie să se curețe înainte de a veni nu va veni niciodată.
 * Mărturisirea vine abia în lecția 5, după ce omul știe că nu e aruncat afară.
 *
 * SIGURANȚĂ: lecțiile 5 și 6 ating abuz, avort și autovătămare. Primul pas al
 * fiecăreia e avertisment cu numere reale (docs/22 §2). Lecția 5 spune explicit
 * că ce i s-a FĂCUT omului nu e păcatul lui și că nu ia legătura cu agresorul.
 */
export const pathAcasa: PathDef = {
  id: "path_acasa",
  roomId: "c1",
  title: "Drumul înapoi",
  promise:
    "Șapte lecții, una la două zile. Nu îți cerem să povestești nimănui ce ai făcut și nu îți cerem să promiți nimic.",
  lessons: [rusineL1, rusineL2, rusineL3, rusineL4, rusineL5, rusineL6, rusineL7],
  practices: [
    "Azi nu adaugă nimic. Când te prinzi că vrei să te cureți înainte să vii, spune o dată: «El a alergat primul».",
    "Azi doar observă: de câte ori spui «sunt» în loc de «am făcut». Nu te certa cu gândul — tradu-l într-o faptă anume.",
    "Azi, când îți revine fapta în minte, spune cu voce tare, o singură dată: «s-a plătit». Nu de zece ori.",
    "Azi ascultă cum te numești tu pe tine. Când vine eticheta, răspunde-i: «asta am făcut, nu asta sunt».",
    "Ieri ai spus cu voce tare ce ascundeai. Azi nu adăuga nimic. Dacă vrei să spui și unui om, gândește-te o zi — nu e obligatoriu și nu e o condiție.",
    "Azi citește singur Romani 8, primele patru versete. Încet. Dacă gândul te ține treaz nopțile, sună 116 123 — nu e lipsă de credință.",
    "Ai terminat drumul. Azi caută omul căruia îi poți spune «m-am întors» când se întâmplă. Și scrie undeva o rugăciune la care aștepți răspuns.",
  ],
  bridgeId: "path_acasa",
  doorVariants: {
    avort: {
      title: "După avort",
      promise: "Trei lecții care numesc păcatul, pierderea și iertarea fără să micșoreze niciuna dintre ele.",
      lessons: AVORT_LESSONS,
      practices: AVORT_PRACTICES,
      review: { required: ["pastoral"], approved: [] },
    },
  },
  offerAtPathEnd: true,
}

/*
 * Camera 2: "Nu e bun / m-a lăsat".
 * Intră aici nedreptatea și neiertarea. Doliul, boala și "unde era El?" pornesc
 * tot de aici ca tipar, dar primesc alt răspuns — vezi mai jos.
 *
 * ORDINEA CONTEAZĂ (docs/21 §2): camera începe cu cele două lecții despre cine e
 * Dumnezeu, spuse PRIN rana asta — "nu El ți-a făcut asta" (Iacov 1:17) și
 * "n-a privit de departe" (Ioan 11:35; Matei 27:46). Omul nedreptățit nu poate
 * ierta cât timp Îl bănuiește pe Dumnezeu că a fost de partea celui care l-a
 * rănit. Aceeași lumină, alt geam.
 *
 * DE FĂCUT: lecțiile 3-9 (fostele 1-7) își păstrează `order` 1-7 din vechea
 * numerotare, iar `neiertare_l1` mai conține prezentarea "Sunt Daniel", care
 * acum se face în `neiertare_o1`. De curățat la o trecere separată; ordinea
 * reală a drumului e array-ul `lessons`, nu `order`.
 *
 * REZOLVAT (docs/23 §3, defectul D2): patru uși cădeau aici și primeau un drum
 * despre iertare, deși nu aveau pe cine ierta. `divort` a primit `path_divort`,
 * iar `doliu`, `boala` și `de_ce_permis` au primit `path_suferinta`. Camera
 * rămâne cu ușa pentru care a fost scrisă: `neiertare`.
 *
 * DE CE NU AU FOST MUTATE ÎN ALTĂ CAMERĂ: tiparul spiritual e chiar cel de aici
 * — "dacă era bun, nu s-ar fi întâmplat". Nu tiparul era greșit, ci răspunsul.
 * De aceea `roomId` le rămâne "c2" și doar `pathId` diferă.
 */
export const pathNeiertare: PathDef = {
  id: "path_neiertare",
  roomId: "c2",
  title: "Când nu poți ierta",
  promise:
    "Nouă lecții, una la două zile. Nu îți cerem să uiți și nu îți cerem să spui că n-a fost grav.",
  lessons: [
    neiertareO1,
    neiertareO2,
    neiertareL1,
    neiertareL2,
    neiertareL3,
    neiertareL4,
    neiertareL5,
    neiertareL6,
    neiertareL7,
  ],
  practices: [
    "Azi nu adăuga nimic. Când te prinzi că Îl bănuiești, spune o dată: «nu Tu mi-ai făcut asta». Atât.",
    "Azi citește singur Ioan 11, de la versetul 17 la 44. Încet. Uită-te doar la ce face Iisus cu oamenii rămași în urmă.",
    "Ieri I-ai spus ce ți s-a făcut. Azi nu adăuga nimic. Citește versetul de două ori și stai un minut în liniște.",
    "Azi observă doar: de câte ori Îl bănuiești pe Dumnezeu că nu-ți vrea binele. Nu te certa cu gândul. Doar numără-l.",
    "Ai cerut iertare cuiva peste care s-a scurs amărăciunea? Dacă nu, azi e ziua. Două propoziții, fără explicații.",
    "Spune încă o dată, cu voce tare: numele lui, și «nu știa ce face». A doua oară sună altfel.",
    "Hârtia cu ce îți datorează — mai e la tine? Citește-o o dată și pune-o la loc. Mâine facem ceva cu ea.",
    "Azi roagă-te pentru el o dată. O propoziție. Dacă nu-ți iese, spune-I lui Dumnezeu că nu-ți iese.",
    "Ai terminat drumul. Azi doar mulțumește. Și scrie undeva o rugăciune la care aștepți răspuns.",
  ],
  bridgeId: "path_neiertare",
  offerAtPathEnd: true,
}

/*
 * DIVORȚUL. Ușă din camera relațiilor, cu drum propriu.
 *
 * DE CE ARE DRUM PROPRIU (docs/23 §3, defectul D2): `divort` cădea în
 * `path_neiertare`, adică omului care tocmai își pierduse casa i se dădea din
 * prima zi un drum despre iertarea celui care l-a rănit. Uneori chiar asta e.
 * De cele mai multe ori nu e: e doliu fără înmormântare, e vinovăție amestecată
 * cu nedreptate, sunt copii la mijloc și e o întrebare despre recăsătorire la
 * care nimeni nu i-a răspuns fără să-l judece.
 *
 * Camera relațiilor a fost adăugată ulterior prin amendamentul din docs/24.
 * `pathId` rămâne explicit pentru că răspunsul divorțului este distinct de
 * parcursul relațional general.
 *
 * ORDINEA: doliu fără înmormântare (nimeni nu-ți spune "condoleanțe") → ce a
 * spus Iisus, de fapt (Matei 19, "din pricina împietririi inimii voastre") →
 * nu Dumnezeu ți-a rupt casa (1 Corinteni 7:15) → vina care e a ta și vina care
 * nu e (Psalmul 51; 1 Ioan 1:9) → recăsătorirea → copiii, ceilalți, biserica
 * (Romani 12:18) → ce urmează (Ioan 8:10-11; Isaia 43:19).
 *
 * REGULA CARE NU SE SCHIMBĂ (lecția 5): la recăsătorire Emanus NU dă verdict.
 * Sunt puse pe masă trei citiri, toate ținute de creștini care iau Biblia în
 * serios, iar omul e trimis la un păstor care îl cunoaște pe el, nu la noi. E
 * singurul subiect din aplicație tratat așa. Nu se schimbă fără o decizie
 * explicită în docs/14-carta-doctrinara.md.
 *
 * SIGURANȚĂ: lecția 1 are `safety.topic: "mental_health"`, lecția 3 are
 * `"abuse"`. Nicăieri nu i se spune omului deja recăsătorit să-și rupă a doua
 * căsnicie, și nicăieri nu se arată cu degetul către vreo denominațiune
 * (docs/22 §6).
 *
 * NU E FUNDĂTURĂ (docs/21 §7 pct. 5): ultima practică trimite omul la ușa rănii
 * care i-a rămas după cele șapte lecții.
 */
export const pathDivort: PathDef = {
  id: "path_divort",
  roomId: null,
  title: "După divorț",
  promise:
    "Șapte lecții, una la două zile. Nu îți spunem noi dacă ai voie să te recăsătorești și nu îți cerem să spui cine a fost de vină.",
  lessons: DIVORT_LESSONS,
  practices: DIVORT_PRACTICES,
  bridgeId: "path_divort",
  review: { required: ["pastoral"], approved: [] },
  doorVariants: {
    divort: {
      lessons: [...DIVORT_POZITII_LESSONS, ...DIVORT_LESSONS],
      practices: [...DIVORT_POZITII_PRACTICES, ...DIVORT_PRACTICES],
    },
  },
  offerAtPathEnd: true,
}

/*
 * SUFERINȚA. Trei uși din camera 2, cu drum propriu: `doliu`, `boala`,
 * `de_ce_permis`.
 *
 * DE CE ARE DRUM PROPRIU (docs/23 §3, defectul D2): toate trei cădeau în
 * `path_neiertare`. Adică omul care tocmai își îngropase un părinte primea un
 * drum despre cum să ierte pe cineva. De cele mai multe ori nu există niciun
 * agresor de iertat. Moartea nu e o nedreptate făcută de o persoană, boala nu
 * are pe cine să ierte, iar "de ce a permis Dumnezeu?" nu e o rană de la un om.
 * `doliu` e ușă `common`, deci stătea în primele zece de pe ecran — era cel mai
 * vizibil răspuns greșit din toată aplicația.
 *
 * PROVENIENȚĂ: lecțiile sunt aduse de pe ramura `codex/nolan-short-courses`
 * (`suferinta.ts`, blob d0e68097), împărțite în `suferintaA.ts` și
 * `suferintaB.ts`. Practicile nu existau acolo și au fost scrise pentru drumul
 * ăsta.
 *
 * ORDINEA: pierderea e reală și are voie să fie numită (Psalmul 34:18) → e
 * pedeapsă sau e o lume ruptă? (Ioan 9:1-3) → Iisus a plâns (Ioan 11:35) → când
 * nu vine explicația (Iov 42:7; Psalmul 13) → ascultarea de astăzi, inclusiv
 * medicul și oamenii (Galateni 6:2; 1 Regi 19) → speranță fără promisiuni false
 * (Romani 8:22-25; Apocalipsa 21:4) → mergi mai departe fără să negi ce a fost
 * (Plângerile 3:22-23).
 *
 * REPARAT (docs/25, decizia 9): cele trei uși primesc SECVENȚE
 * diferite peste același bazin de lecții — `doliu` L1→L3→L4→L6→L7, `boala`
 * L1→L2→L3→L4→L5→L6, `de_ce_permis` L1→L2→L4→L6. Variantele sunt selectate
 * prin `PathDef.doorVariants`, păstrând bazinul canonic fără duplicarea textului.
 *
 * REGULA DOCTRINARĂ CARE NU SE SCHIMBĂ: Scriptura arată cazuri în care suferința
 * e consecință sau disciplinare (1 Corinteni 11:29-32; Ioan 5:14), dar refuză
 * transformarea lor în diagnostic universal (Iov 42:7; Ioan 9:1-3; Luca 13:1-5).
 * Lecția 2 ține ambele capete și nu îi pune omului o vină în plus.
 *
 * SIGURANȚĂ (docs/22 §1): lecțiile 1 și 5 au `safety.topic: "mental_health"`.
 * Nicio lecție nu promite vindecarea în viața aceasta, niciuna nu prezintă
 * consultul medical ca lipsă de credință și niciuna nu cere iertare acolo unde
 * nu există agresor.
 *
 * NU E FUNDĂTURĂ (docs/21 §7 pct. 5): ultima practică trimite omul către ușa
 * rănii rămase, dacă a rămas una.
 */
export const pathSuferinta: PathDef = {
  id: "path_suferinta",
  roomId: null,
  title: "Când doare și nu știi de ce",
  promise:
    "Șapte lecții, una la două zile. Nu îți promitem că se vindecă și nu îți spunem că suferi pentru că ai greșit undeva.",
  lessons: SUFERINTA_LESSONS,
  practices: SUFERINTA_PRACTICES,
  bridgeId: "path_suferinta",
  doorVariants: {
    doliu: {
      title: "După pierdere",
      promise: "Cinci lecții care lasă doliul să vorbească fără să îl transforme într-o acuzație.",
      lessons: [SUFERINTA_LESSONS[0], SUFERINTA_LESSONS[2], SUFERINTA_LESSONS[3], SUFERINTA_LESSONS[5], SUFERINTA_LESSONS[6]],
      practices: [SUFERINTA_PRACTICES[0], SUFERINTA_PRACTICES[2], SUFERINTA_PRACTICES[3], SUFERINTA_PRACTICES[5], SUFERINTA_PRACTICES[6]],
    },
    boala: {
      title: "Când boala intră în casă",
      promise: "Șase lecții despre boală, ajutor și speranță, fără diagnostice spirituale inventate.",
      lessons: [SUFERINTA_LESSONS[0], SUFERINTA_LESSONS[1], SUFERINTA_LESSONS[2], SUFERINTA_LESSONS[3], SUFERINTA_LESSONS[4], SUFERINTA_LESSONS[5]],
      practices: [SUFERINTA_PRACTICES[0], SUFERINTA_PRACTICES[1], SUFERINTA_PRACTICES[2], SUFERINTA_PRACTICES[3], SUFERINTA_PRACTICES[4], SUFERINTA_PRACTICES[5]],
    },
    de_ce_permis: {
      title: "De ce a permis Dumnezeu?",
      promise: "Patru lecții care țin împreună providența, lumea căzută și limitele explicațiilor noastre.",
      lessons: [SUFERINTA_LESSONS[0], SUFERINTA_LESSONS[1], SUFERINTA_LESSONS[3], SUFERINTA_LESSONS[5]],
      practices: [SUFERINTA_PRACTICES[0], SUFERINTA_PRACTICES[1], SUFERINTA_PRACTICES[3], SUFERINTA_PRACTICES[5]],
    },
  },
  offerAtPathEnd: true,
}

/*
 * Camera 4: "E departe, nu mă aude".
 * Intră aici peretele în rugăciune, uscăciunea, flăcăra stinsă, "nu știu să citesc".
 *
 * ORDINEA (docs/21 §2): începem cu faptul că El nu a plecat — promisiune, nu
 * senzație. Omul de aici nu are nevoie de o tehnică în prima zi, are nevoie să
 * afle că nu a fost abandonat. Metoda (cum se aude, cum se citește) vine de la
 * lecția 4 încolo.
 *
 * SIGURANȚĂ (docs/22 §1): lecția 3 atinge întrebarea "e ceva la mine?" și se
 * încheie explicit cu "foarte des nu e nimic de reparat". Pasul `a2_9` trimite la
 * medic pentru lipsa totală de simtire, insomnie și epuizare.
 */
export const pathAproape: PathDef = {
  id: "path_aproape",
  roomId: "c4",
  title: "Când pare departe",
  promise:
    "Șapte lecții, una la două zile. Fără să îți promitem că de mâine simți și fără să îți spunem că e vina ta.",
  lessons: [aproapeL1, aproapeL2, aproapeL3, aproapeL4, aproapeL5, aproapeL6, aproapeL7],
  practices: [
    "Azi spune-I o dată, cu voce tare: «nu Te simt, dar ai spus că ești aici». Amândouă părțile, în aceeași propoziție.",
    "Citește-ți psalmul pe care l-ai scris ieri. Cu voce tare, o dată. Și nu-l corecta.",
    "Lucrul care a ieșit la cercetare — dacă a ieșit — rezolvă-l azi. Dacă nu a ieșit nimic, azi nu te mai căuta. Chiar nu.",
    "Din nou cele trei minute de liniște, la aceeași oră. Telefonul în altă cameră.",
    "Un paragraf, patru întrebări, în scris. Zece minute. Dacă s-a terminat Ioan 1, mergi mai departe cu Ioan 2.",
    "Lucrul de la început pe care l-ai reluat ieri — fă-l și azi. A doua zi e mai greu decât prima.",
    "Ai terminat drumul. Azi ține întâlnirea de zece minute la ora pe care ai scris-o. Și scrie undeva o rugăciune la care aștepți răspuns.",
  ],
  bridgeId: "path_aproape",
  offerAtPathEnd: true,
}

/*
 * Camera 5: "Nu mă pot schimba".
 * Intră aici dependența, recăderea și furia.
 *
 * MODIFICAT (docs/22 §1, docs/23 §3 defectul D1): anxietatea și tristețea au fost
 * MUTATE de aici în camera 8. Camera asta spune omului "nu ești defect", dar
 * minciuna ei de intrare rămâne "Sunt defect, asta sunt" — iar pentru un om cu
 * anxietate sau depresie prima secundă conta cel mai mult.
 *
 * ORDINEA (docs/21 §2): nu începem cu "lasă-te de". Începem cu ce e omul — nu e
 * defect (Marcu 5; Psalmul 139). Apoi de ce cedează voința, apoi ce se taie, apoi
 * ce se pune în loc. Metoda vine după identitate, altfel e doar un alt program.
 *
 * SIGURANȚĂ (docs/22 §1, NENEGOCIABIL): și aici sunt simptome cu posibilă cauză
 * medicală. Lecțiile 5 și 6 trimit explicit la medic, la servicii competente
 * pentru adicții și la 116 123 pentru sprijin emoțional. Nicio lecție nu
 * spune omului că starea lui vine din lipsă de credință.
 */
export const pathSchimbare: PathDef = {
  id: "path_schimbare",
  roomId: "c5",
  title: "Când nu te poți schimba",
  promise:
    "Șapte lecții, una la două zile. Fără «strânge din dinți» și fără să îți cerem să promiți că nu mai faci.",
  lessons: [
    schimbareL1,
    schimbareL2,
    schimbareL3,
    schimbareL4,
    schimbareL5,
    schimbareL6,
    schimbareL7,
  ],
  practices: [
    "Azi nu încerca să te lași de nimic. Doar observă când îți spui «asa sunt eu» și taci la propoziția aia.",
    "Azi, când vine impulsul, scrie un singur cuvânt: ce simțeai în minutul dinainte.",
    "Lucrul pe care l-ai scos ieri — verifică dacă e chiar scos. Și vezi ce faci azi la ora aia.",
    "Azi ține programarea pe care ai scris-o. Zece minute cu El, la ora la care cădeai.",
    "Citește-ți protocolul de trei rânduri o dată, cu voce tare. Ca să ți-l amintești la ora două noaptea.",
    "Azi un lucru pentru corp, nu pentru suflet: somn, mâncare, o plimbare. Și, dacă durează, sună la medic — nu e lipsă de credință.",
    "Ai terminat drumul. Azi spune UNUI om că te lupți cu ceva. Nu detalii — doar atât.",
  ],
  bridgeId: "path_schimbare",
  doorVariants: {
    dependenta: {
      lessons: [...CLARIFICAREA_DEPENDENTEI_LESSONS, schimbareL1, schimbareL2, schimbareL3, schimbareL4, schimbareL5, schimbareL6, schimbareL7],
      practices: [...CLARIFICAREA_DEPENDENTEI_PRACTICES,
        "Azi nu încerca să te lași de nimic. Doar observă când îți spui «așa sunt eu» și oprește propoziția acolo.",
        "Azi, când vine impulsul, scrie un singur cuvânt: ce simțeai în minutul dinainte.",
        "Lucrul pe care l-ai scos ieri — verifică dacă e chiar scos. Și vezi ce faci azi la ora aia.",
        "Azi ține programarea pe care ai scris-o. Zece minute cu El, la ora la care cădeai.",
        "Citește-ți protocolul de trei rânduri o dată, cu voce tare.",
        "Azi un lucru pentru corp, nu pentru suflet: somn, mâncare, o plimbare.",
        "Ai terminat drumul. Azi spune unui om că te lupți cu ceva. Nu detalii — doar atât."],
    },
    pornografie: {
      title: "Ieșirea din ascundere",
      promise: "Două lecții despre rușine, acces și declanșatori, apoi drumul concret al schimbării.",
      lessons: [...PORNOGRAFIE_LESSONS, schimbareL1, schimbareL2, schimbareL3, schimbareL4, schimbareL5, schimbareL6, schimbareL7],
      practices: [...PORNOGRAFIE_PRACTICES,
        "Azi nu încerca să te lași de nimic. Observă doar propoziția «așa sunt eu».",
        "Când vine impulsul, scrie ce simțeai în minutul dinainte.",
        "Verifică dacă accesul pe care l-ai scos este chiar scos.",
        "Ține programarea scrisă, la ora la care cădeai.",
        "Citește-ți protocolul de trei rânduri o dată.",
        "Fă un lucru pentru corp și caută ajutor competent dacă lupta te depășește.",
        "Spune unui om de încredere că te lupți. Nu trebuie să dai detalii în aplicație."],
    },
  },
  offerAtPathEnd: true,
}

/*
 * TRISTEȚEA. Camera 8, drum propriu. Ușa `tristete`.
 *
 * DE CE EXISTĂ SEPARAT (docs/25, decizia 7): până acum `tristete` și `anxietate`
 * mergeau amândouă în `path_greutate`, adică primeau cuvânt cu cuvânt aceleași
 * șapte lecții. Era exact defectul pe care camera 8 fusese creată să-l repare,
 * doar mutat cu un nivel mai sus: în loc să le trimitem pe amândouă în `s1c_b`,
 * le trimiteam pe amândouă în același drum. Frica și lipsa de chef nu se ating
 * la fel. Unuia îi spui "doar până diseară"; celuilalt, care nu mai vede rostul
 * lui diseară, propoziția asta nu-i spune nimic.
 *
 * ORDINEA: întâi siguranța (triaj, apoi numere, apoi orice altceva) → nu e lene
 * și nu e lipsă de credință → trupul are cuvântul lui (Ilie primește somn și
 * mâncare, 1 Regi 19) → cui îi spui și ce îi spui (Galateni 6:2) → dimineața,
 * fără să mint (Plângerile 3:22-23).
 *
 * SIGURANȚĂ (docs/22 §1-§3, NENEGOCIABIL): lecția 1 începe cu ecran de
 * avertizare și cu 112, 116 123 și 116 111 ÎNAINTEA oricărui verset. Triajul din
 * `tr1_3` nu are niciun buton — nu e din lene, e ca să nu se salveze nimic
 * (decizia 6: răspunsurile de screening sunt efemere prin construcție). Nicio
 * lecție nu promite că trece, niciuna nu prezintă medicul sau psihologul ca
 * lipsă de credință și niciuna nu cere omului să se bucure.
 *
 * PROVIZORIU (`offerAtPathEnd: false`, decizia 11): drumul are nevoie de revizie
 * CLINICĂ înainte de merge, nu după. Omul care intră pe ușa lui îl primește;
 * nu i-l propunem cuiva care tocmai a terminat alt drum.
 *
 * DE FĂCUT ÎN UI: ecranul de final al drumurilor provizorii trebuie să ofere
 * Azi, Biblia, Ajutor ȘI Rugăciuni — `shouldInviteFirstPrayer()` nu se declanșează
 * singur la cinci lecții. `PathEnd.tsx`, separat.
 */
export const pathTristete: PathDef = {
  id: "path_tristete",
  roomId: "c8",
  title: "Când nu mai ai chef de nimic",
  promise:
    "Cinci lecții, una la două zile. Nu îți promitem că trece și nu îți spunem că e din lipsă de credință.",
  lessons: TRISTETE_LESSONS,
  practices: TRISTETE_PRACTICES,
  bridgeId: "path_tristete",
  review: { required: ["clinical"], approved: [] },
  offerAtPathEnd: false,
}

/*
 * ANXIETATEA. Camera 8, drum propriu. Ușa `anxietate`.
 *
 * DE CE EXISTĂ SEPARAT: vezi `pathTristete` mai sus. Aceeași cameră, aceeași
 * minciună de intrare — "dacă aș avea destulă credință, aș fi bine" — dar alt
 * răspuns.
 *
 * CE E INTERZIS AICI (docs/25, harta ușilor): "schimbarea comportamentului ca
 * ramă". Omului cu anxietate nu i se dă un program de îndreptare, pentru că
 * exact asta a fost defectul care ținea ușa în `path_schimbare`. Nu are nimic
 * de corectat la el; are nevoie de unelte care se folosesc în autobuz, la trei
 * noaptea.
 *
 * ORDINEA: frica nu e dovada că ai credință puțină (Isaia 41:10) → trupul tău nu
 * te minte, ce e un atac de panică (1 Regi 19) → doar până mâine dimineață
 * (Matei 6:34) → ce faci cu grija, concret (Filipeni 4:6-7) → nu e făcut să fie
 * dus singur (1 Petru 5:7).
 *
 * SIGURANȚĂ (docs/22 §1-§3): lecția 1 are `safety.topic: "mental_health"` și
 * numerele înaintea versetelor. Se spune explicit că anxietatea poate avea cauze
 * medicale, că tratamentul nu e lipsă de credință și că un atac de panică nu e
 * un atac spiritual.
 *
 * PROVIZORIU (`offerAtPathEnd: false`, decizia 11): la fel ca tristețea, cere
 * revizie clinică înainte de merge.
 */
export const pathAnxietate: PathDef = {
  id: "path_anxietate",
  roomId: "c8",
  title: "Când ți-e frică tot timpul",
  promise:
    "Cinci lecții, una la două zile. Nu îți cerem să te calmezi și nu îți spunem că frica e semn de credință slabă.",
  lessons: ANXIETATE_LESSONS,
  practices: ANXIETATE_PRACTICES,
  bridgeId: "path_anxietate",
  review: { required: ["clinical"], approved: [] },
  offerAtPathEnd: false,
}

/*
 * RETRAS. `path_greutate` a fost drumul comun al camerei 8 și nu mai e folosit
 * de nicio ușă.
 *
 * DE CE A FOST RETRAS (docs/25, decizia 7): dădea aceleași șapte lecții și
 * omului cu anxietate, și celui care nu mai are chef de nimic. Camera 8 a fost
 * făcută ca să repare exact genul ăsta de amestec; drumul comun îl reproducea
 * pe dinăuntru. Acum ușile merg în `path_tristete` și `path_anxietate`.
 *
 * DE CE NU E ȘTERS DE TOT: dacă cineva are deja `pathId: "path_greutate"` salvat
 * în `emanus_journey_v1`, `getPath` trebuie să-i întoarcă tot ceva, nu
 * `undefined`. Rămâne în `PATHS` ca stările vechi să se citească, dar cu
 * `offerAtPathEnd: false`, deci nu se propune nimănui. Ștergerea completă,
 * împreună cu `greutate.ts` și cu o migrare care mută stările vechi pe unul din
 * cele două drumuri noi, se face separat.
 *
 * NU SE ADAUGĂ UȘI AICI. Dacă îți trebuie o ușă nouă în camera 8, alege între
 * `path_tristete` și `path_anxietate` sau scrie un drum al treilea.
 */
export const pathGreutate: PathDef = {
  id: "path_greutate",
  roomId: "c8",
  title: "Când nu mai ai putere",
  promise:
    "Șapte lecții, una la două zile. Nu îți promitem că trece și nu îți spunem că e din lipsă de credință.",
  lessons: GREUTATE_LESSONS,
  practices: GREUTATE_PRACTICES,
  bridgeId: "path_greutate",
  offerAtPathEnd: false,
}

/*
 * Camera 6: "Trebuie să merit".
 * Intră aici meritul, obișnuința, frica de pedeapsă, epuizarea din slujire.
 *
 * ORDINEA (docs/21 §2): începem cu faptul că nu se poate cumpăra. Omul de aici nu
 * are nevoie de mai multă disciplină — are nevoie să afle că balanța din capul
 * lui nu există. Ascultarea (lecția 4) vine DUPĂ har, altfel drumul ar produce
 * exact ce vrea să vindece.
 *
 * ATENȚIE (docs/22 §6): nu arătăm cu degetul către nicio denominațiune. Lecția 6
 * vorbește despre mecanismul "forma fără relație", care funcționează identic în
 * orice tradiție — și în oameni care nu merg niciunde.
 */
export const pathHar: PathDef = {
  id: "path_har",
  roomId: "c6",
  title: "Nu se cumpără",
  promise:
    "Șapte lecții, una la două zile. Fără să îți cerem să faci mai mult și fără să îți spună nimeni că nu ești destul.",
  lessons: [harL1, harL2, harL3, harL4, harL5, harL6, harL7],
  practices: [
    "Azi roagă-te încă o dată fără să pomenești nici ce ai făcut, nici ce n-ai făcut. Doar «ai milă de mine» și mulțumește.",
    "Azi spune-I «Tata» la începutul rugăciunii. Dacă te blochează, spune-I și asta.",
    "Azi cere încă un lucru pentru tine. Cine se teme de pedeapsă nu cere niciodată pentru el.",
    "Azi fă din nou un bine despre care nu află nimeni. Alții nu au ce să pună la punctaj.",
    "Ziua de odihnă: nu adaugă nimic pe listă. Zece minute jos, ca Maria, și atât.",
    "Lucrul pe care l-ai umplut ieri — fă-l și azi la fel, încet, uitându-te la El.",
    "Ai terminat drumul. Azi primește ceva fără să dai nimic în schimb. Și scrie undeva o rugăciune la care aștepți răspuns.",
  ],
  bridgeId: "path_har",
  offerAtPathEnd: true,
}

/*
 * Camera 7: "Sunt singur în asta".
 * Intră aici singurătatea, familia care respinge, rana din biserică, cel nou venit.
 *
 * ORDINEA (docs/21 §2): începem cu faptul că El a fost părăsit de toți — nu cu
 * "du-te la biserică". Omului singur nu i se dă o sarcină socială în prima zi.
 * Pașii practici de găsire a oamenilor vin în lecțiile 6 și 7.
 *
 * SIGURANȚĂ (docs/22 §1-2, NENEGOCIABIL): `im1_1` are avertisment cu 116 123 și
 * 112. Lecția 3 spune explicit că răbdarea în familie nu înseamnă să rămâi în
 * pericol (112, 0800 500 333). Lecția 4 nu apără rana din biserică, nu trimite
 * omul înapoi și numește abuzul abuz (112, 119).
 */
export const pathImpreuna: PathDef = {
  id: "path_impreuna",
  roomId: "c7",
  title: "Să nu rămâi singur",
  promise:
    "Șapte lecții, una la două zile. Nu îți cerem să te întorci nicăieri și nu îți promitem că fabricăm oameni în șapte lecții.",
  lessons: [
    impreunaL1,
    impreunaL2,
    impreunaL3,
    impreunaL4,
    impreunaL5,
    impreunaL6,
    impreunaL7,
  ],
  practices: [
    "Azi spune-I încă o dată, fără să înfrumusețezi: «mi-e singur». Nu e o plângere nepotrivită.",
    "Azi cere încă un lucru mic unui om. Un orfan nu cere — tu nu ești orfan.",
    "Azi roagă-te pe nume pentru omul din casă care te înțelege cel mai puțin. Și nu-i explica nimic.",
    "Azi nu adăuga nimic la ce ai scris ieri. Dacă te ține treaz, sună 116 123 — nu e lipsă de credință.",
    "Cele două nume — mai sunt bune la lumina zilei? Dacă nu, caută azi un grup mic aproape de tine.",
    "Dacă ai trimis mesajul și ți-a răspuns, propune ceva concret: o cafea, o plimbare, o oră. Dacă nu ți-a răspuns, nu înseamnă nimic despre tine.",
    "Ai terminat drumul. Azi fă un lucru pentru cineva mai singur decât tine. Și scrie undeva o rugăciune la care aștepți răspuns.",
  ],
  bridgeId: "path_impreuna",
  doorVariants: {
    familie_respinge: {
      lessons: [...FAMILIE_RESPINGE_LESSONS, impreunaL1, impreunaL2, impreunaL3, impreunaL4, impreunaL5, impreunaL6, impreunaL7],
      practices: [...FAMILIE_RESPINGE_PRACTICES,
        "Spune-I simplu că te simți singur.", "Cere un lucru mic unui om sigur.", "Roagă-te pe nume pentru cineva din casă.",
        "Nu te întoarce într-un loc nesigur ca să dovedești iertarea.", "Scrie două nume de oameni siguri.",
        "Propune o întâlnire concretă unuia dintre ei.", "Fă un lucru pentru cineva care este singur."],
    },
    respins_biserica: {
      lessons: [...RESPINS_BISERICA_LESSONS, impreunaL1, impreunaL2, impreunaL3, impreunaL4, impreunaL5, impreunaL6, impreunaL7],
      practices: [...RESPINS_BISERICA_PRACTICES,
        "Spune-I simplu că te simți singur.", "Cere un lucru mic unui om sigur.", "Roagă-te pe nume pentru cineva care nu te-a rănit.",
        "Nu te întoarce într-un loc nesigur ca să dovedești credință.", "Scrie două nume de oameni siguri.",
        "Propune o întâlnire concretă unuia dintre ei.", "Fă un lucru pentru cineva care este singur."],
    },
    nou_venit: {
      title: "Primii pași într-o comunitate",
      promise: "Două lecții practice, fără să presupunem că ai fost abandonat sau rănit.",
      lessons: NOU_VENIT_LESSONS,
      practices: NOU_VENIT_PRACTICES,
    },
  },
  offerAtPathEnd: true,
}

export const pathLegatura: PathDef = {
  id: "path_legatura",
  roomId: "c9",
  title: "Când legătura s-a rupt",
  promise: "Șapte lecții despre partea ta, limite, iertare și ce rămâne când celălalt nu vine.",
  lessons: LEGATURA_LESSONS,
  practices: LEGATURA_PRACTICES,
  bridgeId: "path_legatura",
  review: { required: ["pastoral"], approved: [] },
  doorVariants: {
    inselat: {
      title: "După trădare",
      promise: "Trei lecții pentru omul înșelat, fără presiune spre împăcare și fără vina celui care a trădat.",
      lessons: INSELAT_LESSONS,
      practices: INSELAT_PRACTICES,
    },
  },
  offerAtPathEnd: true,
}

export const pathPaine: PathDef = {
  id: "path_paine",
  roomId: "c10",
  title: "Pâinea de astăzi",
  promise: "Șapte lecții despre muncă, bani, rușine și valoarea care nu se măsoară în ce aduci în casă.",
  lessons: PAINE_LESSONS,
  practices: PAINE_PRACTICES,
  bridgeId: "path_paine",
  offerAtPathEnd: true,
}

/*
 * Temelia. Camera 3 ("nu e real") și drumul propriu al omului care spune "vreau
 * doar să-L cunosc" — pentru el nu e supliment, e drumul.
 *
 * REZOLVAT (docs/23 §3, defectul D3): camera avea trei lecții împrumutate din
 * doctrina generală. Erau trei probleme, nu una:
 *   1. patru uși diferite — `indoiala`, `nu_inteleg`, `biblia_inventata` și
 *      `alte_credinte` — primeau același răspuns scurt;
 *   2. aceleași `doctrinaL1..L3` se dădeau oricum tuturor prin
 *      `DOCTRINE_UNLOCK_AFTER`, deci cine intra aici le primea de două ori;
 *   3. ușile `inceput` și `nu_stiu` cad tot aici, iar pentru ei ăsta e drumul,
 *      nu un supliment.
 * Acum sunt șapte lecții scrise, în `temelieA.ts`, `temelieB.ts`, `temelieC.ts`.
 *
 * ORDINEA: îndoiala are voie (Toma, Marcu 9:24) → ce se poate verifica (Luca 1:1-4)
 * → cine a scris Biblia și cum a ajuns la noi → nu o religie, un Om (Marcu 2) →
 * energii, karma, univers (Fapte 17, Areopag) → cum se citește ca să înțelegi
 * (Fapte 8, famenul) → ce faci cu ce ai aflat (Ioan 7:17).
 *
 * ONESTITATE (docs/22 §1): lecția 2 spune explicit că nimic din ce urmează nu
 * dovedește că Dumnezeu există, doar că documentele sunt documente. Lecția 3
 * recunoaște că manuscrisele diferă între ele și trimite omul la notele de
 * subsol din propria lui Biblie, la Marcu 16 și Ioan 8. Alternativa — să
 * pretindem că nu există diferențe — se sparge prima dată când omul citește o
 * notă de subsol și se simte mințit.
 *
 * FĂRĂ PRESIUNE: lecția 7 nu cere nicio rugăciune de decizie ca să treci mai
 * departe, iar pasul `t7_10` are "Nu acum" ca opțiune la fel de validă.
 *
 * NU E FUNDĂTURĂ (docs/21 §7 pct. 5): pasul `t7_11` trimite omul la camera rănii
 * care i-a ieșit la suprafață în cele șapte lecții, sau la Umblarea dacă vrea
 * mai adânc.
 *
 * SIGURANȚĂ: nicio lecție de aici nu are ecran de avertizare, pentru că niciuna
 * nu atinge abuz, autovătămare sau pierdere. Singura trimitere la ajutor real e
 * în lecția 5, pentru frica rămasă după practici oculte (docs/22 §1).
 */
export const pathTemelie: PathDef = {
  id: "path_temelie",
  roomId: "c3",
  title: "De la zero",
  promise:
    "Șapte lecții, una la două zile. Fără presupunerea că știi ceva dinainte și fără să te facă nimeni să te simți prost că întrebi.",
  lessons: TEMELIE_LESSONS,
  practices: TEMELIE_PRACTICES,
  doctrineMode: "embedded",
  bridgeId: "path_temelie",
  offerAtPathEnd: true,
}

/*
 * UMBLAREA — M7. A treia intrare.
 *
 * Pentru cine nu vine cu o rană, ci vine să întărească o relație care există.
 * Nu e o cameră: nu vindecăm nimic aici, ridicăm ștacheta. Presupunem experiență,
 * deci intrăm în text, în context și în metodă.
 *
 * E și drumul de după: cine termină camera lui în două-trei săptămâni ajunge
 * exact aici, altfel rămâne cu un ecran gol.
 */
export const pathUmblare: PathDef = {
  id: "path_umblare",
  roomId: null,
  title: "Umblarea",
  promise:
    "Șapte lecții pentru cine merge deja cu El: cum se ascultă, cum se citește, ce faci când nu simți nimic.",
  lessons: [umblareL1, umblareL2, umblareL3, umblareL4, umblareL5, umblareL6, umblareL7],
  practices: [
    "Azi, după ce termini de vorbit cu El, nu te ridica. Cinci minute fără să ceri nimic.",
    "Un singur paragraf, trecut prin cele patru întrebări, în scris. Nu un capitol.",
    "Lucrul mic pe care îl amâni — fă-l azi. Dacă nu poți singur, spune-I: «vreau, dar nu pot».",
    "Zece minute cu El fără să ceri și fără să citești. Doar spune-I de ce Îl iubești.",
    "O oră fără telefon, treaz, cu El. Când vine lista, scrie-o și taci.",
    "Azi fă exact ce ai face dacă ai simți. Și spune-I: «nu simt nimic și totuși sunt aici».",
    "Ai terminat drumul. Azi caută omul căruia îi spui cele trei propoziții. Întreabă-l ce mai face.",
  ],
  bridgeId: "path_umblare",
  offerAtPathEnd: true,
}

export const PATHS: PathDef[] = [
  pathAcasa,
  pathNeiertare,
  pathDivort,
  pathSuferinta,
  pathTemelie,
  pathAproape,
  pathSchimbare,
  pathTristete,
  pathAnxietate,
  pathGreutate,
  pathHar,
  pathImpreuna,
  pathLegatura,
  pathPaine,
  pathUmblare,
]

export function getPath(pathId: string | null | undefined): PathDef | undefined {
  if (!pathId) return undefined
  return PATHS.find((p) => p.id === pathId)
}

/** Aplică secvența ușii fără să modifice definiția canonică a parcursului. */
export function getPathForDoor(doorId: string | null | undefined): PathDef | undefined {
  if (!doorId) return undefined
  const path = getPath(resolveDoorPath(doorId))
  if (!path) return undefined
  const variant = path.doorVariants?.[doorId]
  return variant
    ? {
        ...path,
        title: variant.title ?? path.title,
        promise: variant.promise ?? path.promise,
        lessons: variant.lessons,
        practices: variant.practices,
        review: variant.review ?? path.review,
      }
    : path
}

export function isPathReviewed(path: PathDef | undefined): boolean {
  if (!path?.review) return true
  return path.review.required.every((kind) => path.review?.approved.includes(kind))
}

export function canStartDoor(doorId: string): boolean {
  return isPathReviewed(getPathForDoor(doorId))
}

export function getPathLesson(pathId: string, lessonId: string): Lesson | undefined {
  return getPath(pathId)?.lessons.find((l) => l.id === lessonId)
}

export function findLessonAnywhere(lessonId: string): Lesson | undefined {
  for (const p of PATHS) {
    const l = p.lessons.find((x) => x.id === lessonId)
    if (l) return l
    for (const variant of Object.values(p.doorVariants ?? {})) {
      const variantLesson = variant.lessons.find((x) => x.id === lessonId)
      if (variantLesson) return variantLesson
    }
  }
  return DOCTRINE_LESSONS.find((l) => l.id === lessonId)
}

/**
 * Drumurile pe care le poate începe cineva care tocmai a terminat `pathId`.
 *
 * Se filtrează pe `offerAtPathEnd`, nu doar pe id. (docs/25, decizia 11)
 * Un drum provizoriu sau retras nu se propune din inițiativa noastră: omul care
 * intră pe ușa lui l-a cerut, cel care tocmai a terminat altceva nu.
 */
export function otherPaths(pathId: string | null | undefined): PathDef[] {
  return PATHS.filter((p) => p.id !== pathId && p.offerAtPathEnd)
}

/*
 * Ritmul. Decizie de produs, nu limitare tehnică:
 * o lecție la două zile, cu o zi de pus în practică la mijloc.
 * Transformarea are nevoie de ziua dintre. Nu se poate "da binge".
 */
export type DayKind = "lesson" | "practice" | "done_today" | "path_complete"

export interface DayPlan {
  kind: DayKind
  /** Indexul lecției de azi sau al celei tocmai terminate (0-based). */
  lessonIndex: number
  lesson?: Lesson
  practiceText?: string
  /**
   * Câte zile a lipsit, dacă a lipsit mult (>= ABSENCE_DAYS).
   * Nu e o mustrare și nu se afișează ca statistică — e doar semnalul că ecranul
   * trebuie să-l primească altfel pe omul care se întoarce. (docs/20 §1)
   */
  awayDays?: number
}

/** De la câte zile de tăcere considerăm că omul "se întoarce", nu "continuă". */
export const ABSENCE_DAYS = 5

/**
 * @param path parcursul ales
 * @param lessonsDone câte lecții a terminat
 * @param daysSinceLastLesson zile calendaristice de la ultima lecție; null dacă n-a făcut niciuna
 */
export function planToday(
  path: PathDef,
  lessonsDone: number,
  daysSinceLastLesson: number | null,
): DayPlan {
  const away =
    daysSinceLastLesson !== null && daysSinceLastLesson >= ABSENCE_DAYS
      ? daysSinceLastLesson
      : undefined

  if (lessonsDone >= path.lessons.length) {
    return { kind: "path_complete", lessonIndex: path.lessons.length - 1 }
  }
  if (daysSinceLastLesson === null) {
    return { kind: "lesson", lessonIndex: 0, lesson: path.lessons[0] }
  }
  if (daysSinceLastLesson === 0) {
    return {
      kind: "done_today",
      lessonIndex: lessonsDone - 1,
      practiceText: path.practices[lessonsDone - 1],
    }
  }
  if (daysSinceLastLesson === 1) {
    return {
      kind: "practice",
      lessonIndex: lessonsDone - 1,
      practiceText: path.practices[lessonsDone - 1],
    }
  }
  return {
    kind: "lesson",
    lessonIndex: lessonsDone,
    lesson: path.lessons[lessonsDone],
    awayDays: away,
  }
}

/*
 * Doctrina generală, în paralel. (docs/20 §6)
 * Se deschide DUPĂ lecția 5 din parcursul personal — nu înainte.
 * Nimeni nu învață despre canonul Scripturii înainte să afle că e iubit.
 * Apoi: o lecție de doctrină la fiecare trei lecții personale.
 *
 * NOTĂ (docs/23 §3, D3): înainte, camera 3 servea `doctrinaL1..L3` ca parcurs
 * propriu, deci omul intrat pe `path_temelie` primea aceleași trei lecții și
 * aici, și prin deblocarea de mai jos. Acum camera 3 are lecțiile ei, iar
 * doctrina generală rămâne un singur canal, pentru toate camerele.
 *
 * DE ȘTIUT PENTRU DRUMURILE DE CINCI LECȚII: `path_tristete` și `path_anxietate`
 * au cinci lecții, iar deblocarea se face la a cincea. Cine termină drumul
 * primește doctrina exact atunci, nu mai devreme.
 */
export const DOCTRINE_UNLOCK_AFTER = 5

export function doctrineAllowance(path: PathDef, lessonsDone: number): number {
  if ((path.doctrineMode ?? "parallel") !== "parallel") return 0
  if (lessonsDone < DOCTRINE_UNLOCK_AFTER) return 0
  if (lessonsDone >= path.lessons.length) return DOCTRINE_LESSONS.length
  return Math.min(
    DOCTRINE_LESSONS.length,
    Math.max(0, Math.floor((lessonsDone - DOCTRINE_UNLOCK_AFTER) / 3) + 1),
  )
}

export function nextDoctrineLesson(
  path: PathDef,
  lessonsDone: number,
  completedDoctrineLessonIds: string[],
): Lesson | undefined {
  const completed = new Set(completedDoctrineLessonIds)
  return DOCTRINE_LESSONS
    .slice(0, doctrineAllowance(path, lessonsDone))
    .find((lesson) => !completed.has(lesson.id))
}
