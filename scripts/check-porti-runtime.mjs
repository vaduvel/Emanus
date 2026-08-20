import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import {
  ALL_DOORS,
  DOORS,
  PATHS,
  bridgeForPath,
  doctrineAllowance,
  findLessonAnywhere,
  getDoor,
  getPath,
  getPathForDoor,
  hasSafetySignal,
  isPathReviewed,
  nextDoctrineLesson,
  resolveDoorPath,
  searchDoors,
} from "../packages/shared/dist/paths/index.js"
import { SAFETY_RESOURCES } from "../packages/shared/dist/safetyResources.js"

const requiredDoorIds = [
  "rusine", "neiertare", "indoiala", "perete", "dependenta", "anxietate",
  "doliu", "merit", "singuratate", "nu_inteleg", "obisnuinta", "avort",
  "biblia_inventata", "recadere", "uscaciune", "familie_respinge", "boala",
  "infidelitate", "flacara", "frica_pedeapsa", "respins_biserica",
  "de_ce_permis", "pornografie", "tristete", "alte_credinte", "cum_citesc",
  "epuizat_slujire", "nou_venit", "divort", "prea_departe", "furie",
  "casnicie_rece", "inselat", "conflict_familie", "copil_departe",
  "crestere_copii", "parinti_varstnici", "fara_lucru", "datorii",
  "plecat_departe", "ramas_acasa",
]

for (const doorId of requiredDoorIds) {
  assert.ok(getDoor(doorId), `ușa ${doorId} lipsește`)
  assert.ok(getPath(resolveDoorPath(doorId)), `ușa ${doorId} nu are rută rezolvabilă`)
  const path = getPathForDoor(doorId)
  assert.ok(path, `ușa ${doorId} nu produce un parcurs`)
  assert.ok(path.lessons.length > 0, `ușa ${doorId} produce un parcurs gol`)
  assert.equal(path.lessons.length, path.practices.length, `ușa ${doorId} are lecții/practici nealiniate`)
  for (const lesson of path.lessons) {
    assert.equal(findLessonAnywhere(lesson.id)?.id, lesson.id, `lecția ${lesson.id} nu poate fi redeschisă din rută`)
  }
}

assert.equal(new Set(ALL_DOORS.map((door) => door.id)).size, ALL_DOORS.length, "există ID-uri de ușă duplicate")
assert.equal(DOORS.length, requiredDoorIds.length, "inventarul ușilor nu corespunde contractului")

const lessonIds = (doorId) => getPathForDoor(doorId).lessons.map((lesson) => lesson.id)
assert.deepEqual(lessonIds("doliu"), ["suferinta_l1", "suferinta_l3", "suferinta_l4", "suferinta_l6", "suferinta_l7"])
assert.deepEqual(lessonIds("boala"), ["suferinta_l1", "suferinta_l2", "suferinta_l3", "suferinta_l4", "suferinta_l5", "suferinta_l6"])
assert.deepEqual(lessonIds("de_ce_permis"), ["suferinta_l1", "suferinta_l2", "suferinta_l4", "suferinta_l6"])
assert.deepEqual(lessonIds("avort"), ["avort_l1", "avort_l2", "avort_l3"])
assert.deepEqual(lessonIds("inselat"), ["inselat_l1", "inselat_l2", "inselat_l3"])
assert.deepEqual(lessonIds("nou_venit"), ["nou_venit_l1", "nou_venit_l2"])
assert.deepEqual(lessonIds("pornografie").slice(0, 2), ["pornografie_l1", "pornografie_l2"])
assert.equal(lessonIds("dependenta")[0], "clarificarea_dependentei_l1")
assert.deepEqual(lessonIds("divort").slice(0, 3), ["divort_pozitii_l0", "divort_pozitii_l1", "divort_pozitii_l2"])

assert.equal(resolveDoorPath("casnicie_rece"), "path_legatura")
assert.equal(resolveDoorPath("fara_lucru"), "path_paine")
assert.equal(resolveDoorPath("pornografie"), "path_schimbare")
assert.equal(resolveDoorPath("cum_citesc"), "path_temelie")

assert.ok(searchDoors("șomaj").some((door) => door.id === "fara_lucru"))
assert.ok(searchDoors("atacuri de panica").some((door) => door.id === "anxietate"))
for (const signal of ["vreau să mor", "mă bate", "mi-e frică de el", "vreau să termin cu tot"]) {
  assert.equal(hasSafetySignal(signal), true, `semnalul de siguranță nu este detectat: ${signal}`)
  assert.deepEqual(searchDoors(signal), [], `semnalul de siguranță a fost rutat către o ușă: ${signal}`)
}

for (const path of PATHS.filter((candidate) => candidate.id !== "path_greutate")) {
  assert.ok(bridgeForPath(path.bridgeId ?? path.id), `lipsește puntea pentru ${path.id}`)
}

assert.equal(isPathReviewed(getPathForDoor("tristete")), false)
assert.equal(isPathReviewed(getPathForDoor("anxietate")), false)
assert.equal(isPathReviewed(getPathForDoor("avort")), false)
assert.equal(isPathReviewed(getPathForDoor("inselat")), false)
assert.equal(isPathReviewed(getPathForDoor("doliu")), true)

const temelie = getPath("path_temelie")
const acasa = getPath("path_acasa")
assert.equal(doctrineAllowance(temelie, temelie.lessons.length), 0, "Temelia nu poate dubla doctrina")
assert.equal(doctrineAllowance(acasa, 5), 1)
const firstDoctrine = nextDoctrineLesson(acasa, 5, [])
assert.ok(firstDoctrine)
assert.notEqual(nextDoctrineLesson(acasa, 5, [firstDoctrine.id])?.id, firstDoctrine.id)

const pathEndSource = readFileSync(new URL("../apps/web/src/screens/PathEnd.tsx", import.meta.url), "utf8")
assert.ok(!pathEndSource.includes("otherPaths"), "PathEnd reintroduce lista celorlalte răni")
assert.ok(pathEndSource.includes("bridgeForPath"), "PathEnd nu folosește puntea contextuală")

const doorsSource = readFileSync(new URL("../apps/web/src/screens/Doors.tsx", import.meta.url), "utf8")
assert.ok(doorsSource.includes("chooseDoor(doorId)"), "identitatea ușii se pierde înainte de salvare")
assert.ok(doorsSource.includes("Răspunsul tău nu este salvat"), "lipsește contractul vizibil de nepersistență")
assert.ok(
  doorsSource.includes('{!danger ? <ul className="doors__list doors__list--quiet">'),
  "intervenția de siguranță are prioritate față de ușile generale",
)

const playerSource = readFileSync(new URL("../apps/web/src/LessonPlayer.tsx", import.meta.url), "utf8")
assert.ok(playerSource.includes("lesson.safety"), "playerul ignoră metadatele de siguranță")
assert.ok(playerSource.includes('step.type === "multi_choice"'), "playerul ignoră multi-choice")

const journeyCss = readFileSync(new URL("../apps/web/src/journey.css", import.meta.url), "utf8")
assert.ok(journeyCss.includes("flex-direction: column"), "shell-ul pune Ajutor lângă conținut pe mobil")
assert.ok(journeyCss.includes("repeat(5, minmax(0, 1fr))"), "bara principală nu păstrează cele cinci destinații actuale")
const motionCss = readFileSync(new URL("../apps/web/src/components/motion.css", import.meta.url), "utf8")
assert.ok(motionCss.includes("ema-rise var(--dur-3) var(--ease-emphasized) backwards"), "animația rupe poziționarea fixed a taburilor")
assert.ok(
  SAFETY_RESOURCES.some((resource) => resource.id === "116123" && resource.dial === "116123"),
  "registrul canonic de criză nu oferă linia 116 123",
)
assert.ok(!readFileSync(new URL("../packages/shared/src/paths/schimbareB.ts", import.meta.url), "utf8").includes("TelVerde antidrog"), "linia antisuicid este prezentată greșit drept antidrog")

console.log(`Porți runtime OK: ${DOORS.length} uși, ${PATHS.length} parcursuri, rutare și siguranță validate.`)
