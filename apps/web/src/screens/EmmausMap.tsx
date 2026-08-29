import { useEffect, useMemo, useState } from "react"
import {
  EMMAUS_STATIONS,
  GROWTH_AXIS_LABELS_RO,
  PATHS,
  computeEmmausJourney,
  emmausUnitsFromLibraryShelves,
  emmausUnitsFromPaths,
} from "@emanus/shared"
import type { EmmausStation, EmmausStationId } from "@emanus/shared"
import { SHELVES, courseIsOpen } from "@emanus/shared/library"
import { load, markCrossVisited, recordEmmausStation } from "../journey"
import { getLearningProgressSnapshot } from "../learningProgress"
import { navigate } from "../router"

/*
 * Drumul Emaus — harta. (docs/43, stil vizual docs/43a)
 *
 * Ce NU face ecranul ăsta, deliberat:
 *
 * Nu arată procent. Specul spune, în §17, că nicăieri nu are voie să apară ideea
 * că procentul înseamnă maturitate spirituală. Motorul calculează un număr; omul
 * vede o stație și o ceată care se retrage. Nu e același lucru.
 *
 * Nu are confetti, sunete, serii de zile sau comparații cu alții. Gamificare
 * tăcută (§2, P5).
 *
 * Nu cearta pe nimeni. Când cineva a strâns destule lecții dar toate pe o singură
 * axă, harta nu-i spune "ești dezechilibrat". Deschide o cărare laterală și
 * numeste blând ce lipsește (§2, P4).
 *
 * Crucea stă jos, fixă, vizibilă de la zero la sută, și nu poate fi acoperită de
 * ceată (§2, P1). Dacă deblocarea ei ar depinde de progres, mesajul tăcut al
 * aplicației ar fi că mântuirea vine după cursuri. Aceea e singura linie pe care
 * ecranul ăsta nu are voie să o treacă.
 *
 * ASSETURI CARE ÎNCĂ NU EXISTĂ: docs/43a cere o singură imagine fațetată,
 * `map-dawn.webp`, plus opt ilustrații de stație. Niciuna nu e în repo. Până
 * atunci fundalul e un gradient construit din paleta impusă — aceleași șapte
 * culori, nimic inventat. Când vin asseturile, se schimbă doar stratul de fundal;
 * pozițiile, ceata și nodurile rămân cum sunt.
 */

const AMBER = "#E8A13A"
const OCHRE = "#C97B2E"
const TERRA = "#A64B2A"
const INDIGO = "#1B2237"
const CHARCOAL = "#0E1220"
const OLIVE = "#6B7A4A"
const MIST = "#3A4055"

function asStationId(n: number): EmmausStationId {
  const v = Math.min(8, Math.max(1, Math.round(n)))
  return v as EmmausStationId
}

function prefersCalm(): boolean {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
  } catch {
    return false
  }
}

export function EmmausMap() {
  const state = useMemo(() => load(), [])
  const libraryProgress = useMemo(() => getLearningProgressSnapshot(), [])
  const calm = useMemo(() => prefersCalm(), [])

  const completedLessonIds = useMemo(() => [...new Set([
    ...state.completedLessonIds,
    ...Object.values(libraryProgress).flatMap((progress) => progress.completedLessonIds),
  ])], [libraryProgress, state.completedLessonIds])

  const units = useMemo(() => [
    ...emmausUnitsFromPaths(PATHS, { completedLessonIds }),
    ...emmausUnitsFromLibraryShelves(SHELVES.map((shelf) => ({
      id: shelf.id,
      courses: shelf.courses.filter(courseIsOpen),
    }))),
  ], [completedLessonIds])

  const journey = useMemo(
    () =>
      computeEmmausJourney({
        units,
        completedLessonIds,
        maxStationReached: asStationId(state.emmausMaxStation),
      }),
    [completedLessonIds, state.emmausMaxStation, units],
  )

  const [selected, setSelected] = useState<EmmausStation | null>(null)
  const [crossOpen, setCrossOpen] = useState(false)

  const current = journey.currentStation
  const next = journey.nextStation

  useEffect(() => {
    recordEmmausStation(current.id)
  }, [current.id])

  /*
   * Ceata nu sare din stație în stație, se retrage continuu între ele. Așa, cine
   * termină o singură lecție vede că s-a mișcat ceva, chiar dacă nu a ajuns încă
   * la următorul nume de pe hartă. docs/43a §3.
   */
  const fogFrom = next
    ? current.mapPosition + (next.mapPosition - current.mapPosition) * journey.progressToNext
    : 1

  function stationState(s: EmmausStation): "passed" | "current" | "next" | "distant" {
    if (s.id < current.id) return "passed"
    if (s.id === current.id) return "current"
    if (next && s.id === next.id) return "next"
    return "distant"
  }

  const weakest = journey.weakestAxes.map((a) => GROWTH_AXIS_LABELS_RO[a].toLowerCase())

  return (
    <section className="emmaus">
      <p className="today__kicker">Drumul Emaus</p>
      <h1 style={{ marginTop: 4 }}>{current.labelRo}</h1>
      <p className="muted" style={{ marginTop: -6 }}>{current.verseRef}</p>

      {/* --- Harta --- */}
      <div
        style={{
          position: "relative",
          height: "62vh",
          minHeight: 400,
          marginTop: 16,
          borderRadius: 16,
          overflow: "hidden",
          background: `linear-gradient(to top, ${TERRA} 0%, ${OCHRE} 9%, ${AMBER} 16%, ${MIST} 46%, ${INDIGO} 78%, ${CHARCOAL} 100%)`,
        }}
      >
        {/* Nodurile. Stânga/dreapta alternativ, ca drumul să pară drum, nu listă. */}
        {EMMAUS_STATIONS.map((s, i) => {
          const st = stationState(s)
          const reachable = st !== "distant"
          const size = st === "current" ? 18 : 12
          return (
            <button
              key={s.id}
              type="button"
              className="emmaus-map__station"
              disabled={!reachable}
              onClick={() => reachable && setSelected(s)}
              aria-label={reachable ? s.labelRo : "Încă în ceață"}
              style={{
                position: "absolute",
                bottom: `${s.mapPosition * 100}%`,
                left: i % 2 === 0 ? "22%" : "62%",
                display: "grid",
                placeItems: "center",
                width: 44,
                height: 44,
                padding: 0,
                transform: "translate(-50%, 50%)",
                borderRadius: "50%",
                border: "none",
                background: "transparent",
                cursor: reachable ? "pointer" : "default",
                zIndex: 3,
              }}
            >
              <span
                aria-hidden
                style={{
                  display: "block",
                  width: size,
                  height: size,
                  borderRadius: "50%",
                  border: st === "current" ? `2px solid ${AMBER}` : "none",
                  background: st === "passed" ? AMBER : st === "current" ? "#FFF7EA" : MIST,
                  boxShadow: st === "current" ? `0 0 14px ${AMBER}` : "none",
                  transition: calm ? "none" : "background 600ms ease, box-shadow 600ms ease",
                }}
              />
            </button>
          )
        })}

        {/*
          * Silueta. Din spate, fără chip, niciodată — docs/43a §1.3, pentru că în
          * Luca 24:16 tocmai asta e ideea: nu L-au recunoscut. De la stația 6 sunt
          * două, și nu se explică nicăieri de ce.
          */}
        <div
          style={{
            position: "absolute",
            bottom: `calc(${current.mapPosition * 100}% + 14px)`,
            left: current.id % 2 === 1 ? "20%" : "60%",
            display: "flex",
            gap: 4,
            zIndex: 4,
          }}
          aria-hidden
        >
          <span style={{ width: 6, height: 16, borderRadius: 3, background: CHARCOAL }} />
          {current.id >= 6 && (
            <span
              style={{
                width: 6,
                height: 16,
                borderRadius: 3,
                background: CHARCOAL,
                boxShadow: `1px 0 3px ${AMBER}`,
              }}
            />
          )}
        </div>

        {/* Ceata peste porțiunea neparcursă, cu margine în gradient de 12%. */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: `${Math.min(100, fogFrom * 100)}%`,
            backdropFilter: "blur(3px) saturate(0.6)",
            background: `linear-gradient(to top, transparent 0%, ${INDIGO}D1 12%, ${INDIGO}D1 100%)`,
            transition: calm ? "none" : "bottom 1400ms ease",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
      </div>

      {/* --- Cărarea laterală --- */}
      {journey.blockedByBalance && weakest.length > 0 && (
        <div
          style={{
            marginTop: 14,
            padding: 14,
            borderRadius: 12,
            border: `1px dashed ${OLIVE}`,
          }}
        >
          <p style={{ margin: 0 }}>
            Ai mers mult, dar tot pe aceleași cărări. Înainte de{" "}
            {next ? next.labelRo.toLowerCase() : "ce urmează"} e o cotitură pe unde nu ai trecut
            încă: {weakest.join(" și ")}.
          </p>
          <button type="button" className="ghost" style={{ marginTop: 10 }} onClick={() => navigate("/biblioteca")}>
            Vezi ce e pe partea aia
          </button>
        </div>
      )}

      {/* --- Stația aleasă --- */}
      {selected && (
        <div style={{ marginTop: 16, padding: 16, borderRadius: 12, border: `1px solid ${MIST}` }}>
          <p className="today__kicker">Stația {selected.id}</p>
          <h2 style={{ marginTop: 4 }}>{selected.labelRo}</h2>
          <p className="muted">{selected.verseRef}</p>
          <button type="button" className="ghost" onClick={() => setSelected(null)}>
            Închide
          </button>
        </div>
      )}

      {/* --- Ucenicia --- */}
      {current.id === 8 && (
        <div style={{ marginTop: 16, padding: 16, borderRadius: 12, border: `1px solid ${AMBER}` }}>
          <p className="today__kicker">Se deschide un capitol nou</p>
          <h2 style={{ marginTop: 4 }}>Ucenicia</h2>
          <p>
            Cei doi nu au rămas la Emaus. În aceeași noapte s-au ridicat de la masă și s-au
            întors la Ierusalim, să spună și celorlalți. După ce Iisus li S-a descoperit, i-a
            trimis. Aici se termină drumul și începe trimiterea.
          </p>
          <p className="muted">{EMMAUS_STATIONS[7].verseRef}</p>
        </div>
      )}

      {/* --- Crucea: fixă, permanentă, niciodată sub ceată --- */}
      <button
        type="button"
        style={{
          marginTop: 18,
          width: "100%",
          background: TERRA,
          color: "#FFF7EA",
          border: "none",
          borderRadius: 12,
          padding: "14px 16px",
        }}
        onClick={() => {
          markCrossVisited()
          setCrossOpen((v) => !v)
        }}
      >
        Vreau să ajung la Cruce acum
      </button>

      {crossOpen && (
        /*
         * REVIZIE PASTORALĂ OBLIGATORIE înainte de merge în main.
         *
         * Textul de mai jos nu citeăză Scriptura, doar trimite la ea prin referință —
         * regula din docs/23: textul biblic are o singură sursă și se aduce la afișare,
         * nu se scrie de mână a doua oară. Rugăciunea e în cuvinte simple, nu e Scriptură.
         */
        <div style={{ marginTop: 12, padding: 16, borderRadius: 12, border: `1px solid ${TERRA}` }}>
          <p>
            Nu trebuie să ajungi la o anumită stație ca să vii aici. Nu se deschide cu procent și
            nu se închide niciodată. Crucea nu e răsplata pentru cine a mers destul, e locul unde
            se poate veni exact așa cum ești, astăzi.
          </p>
          <p>
            Iisus a murit în locul tău și a înviat. Nu ai de plătit nimic și nu ai de reparat
            nimic înainte. Ai de primit. (Ioan 3:16; Romani 5:8; 1 Ioan 1:9)
          </p>
          <p className="today__kicker">Dacă vrei, spune-I în cuvintele tale. Sau spune așa:</p>
          <blockquote className="pathend__quote">
            Doamne Iisuse, nu vin cu nimic în mâini. Știu ce am făcut și știu ce nu pot repara.
            Cred că ai murit pentru mine și că ai înviat. Iartă-mă și ia-mă al Tău. De azi
            înainte, vreau să merg cu Tine. Amin.
          </blockquote>
          <button type="button" className="ghost" onClick={() => navigate("/rugaciuni")}>
            Scrie ce I-ai spus
          </button>
        </div>
      )}

      <button type="button" className="ghost" style={{ marginTop: 14 }} onClick={() => navigate("/")}>
        Înapoi la ziua de azi
      </button>

      <p className="muted" style={{ marginTop: 16, fontSize: "0.85rem" }}>
        Harta nu e obligatorie. Poți merge mai departe fără să te uiți niciodată la ea.
      </p>
    </section>
  )
}
