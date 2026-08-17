import { useEffect, useState } from "react"

/*
 * Rutele aplicației, după reducere. (docs/20 §8)
 *
 * Ecrane vii: /intrare, / (Azi), /lesson/:id, /rugaciuni, /biblioteca, /biblia,
 * /biblia/:carte/:capitol, /intreaba, /final, /criza.
 * Ecranele vechi (comunitate, familie, mentorat, dashboard, recomandare,
 * creștere) rămân în cod, dar nu mai sunt legate nicăieri: se reintroduc pe
 * rând, după ce parcursul e testat pe oameni reali. Din bara de jos lipsesc
 * încă „Ai mei" și „Eu" din machetă, tocmai pentru că ecranele lor așteaptă
 * rândul lor.
 *
 * Biblioteca e primul dintre ele care revine — ca raft pe subiect, nu ca poartă
 * de intrare și fără categorii de identitate.
 *
 * Biblia explicată e al doilea tab din machetă (Azi · Biblia · Întreabă · Ai
 * mei · Eu) și are două ecrane: raftul cărților și capitolul. Al treilea tab,
 * Întreabă, primește întrebarea și, când vine dintr-un capitol, ține minte
 * despre ce loc din Scriptură este vorba.
 *
 * Cele trei daruri de zi (docs/27) nu primesc tab propriu, ca să nu se umple
 * bara de jos: se intră din „Azi”. /mesaj/:id există ca link public — cine
 * primește un card ajunge direct la verset, nu la un ecran de reclamă.
 * /legamant e Legământul familiei (faza G): se intră din devoțional, nu din bară.
 */
export type Route =
  | { name: "today" }
  | { name: "doors" }
  | { name: "prayers" }
  | { name: "library" }
  | { name: "bible" }
  | { name: "bibleChooser"; testament?: "vt" | "nt"; bookId?: string }
  | { name: "bibleChapter"; bookId: string; chapter: number; verse?: number }
  | { name: "ask"; despre?: string; returnTo?: string }
  | { name: "pathend" }
  | { name: "crisis" }
  | { name: "ds" }
  | { name: "lesson"; id?: string }
  | { name: "program"; programId: string; showCompletion?: boolean }
  | { name: "programLesson"; programId: string; lessonId: string }
  | { name: "devotional" }
  | { name: "scroll" }
  | { name: "lamp" }
  | { name: "message"; id?: string }
  | { name: "covenant" }

function positiveInteger(value: string | null | undefined): number | undefined {
  if (!value || !/^[1-9]\d*$/u.test(value)) return undefined
  const parsed = Number(value)
  return Number.isSafeInteger(parsed) ? parsed : undefined
}

function decodePathPart(value: string | undefined): string {
  if (!value) return ""
  try {
    return decodeURIComponent(value)
  } catch {
    return ""
  }
}

export function parseRoute(): Route {
  const h = window.location.hash.replace(/^#/, "")
  if (h.startsWith("/program/")) {
    const semn = h.indexOf("?")
    const path = semn === -1 ? h : h.slice(0, semn)
    const cauta = new URLSearchParams(semn === -1 ? "" : h.slice(semn + 1))
    const parts = path.slice("/program/".length).split("/")
    const programId = decodePathPart(parts[0])
    const lessonId = decodePathPart(parts[2])
    if (programId && parts.length === 3 && parts[1] === "lesson" && lessonId) {
      return { name: "programLesson", programId, lessonId }
    }
    if (programId && parts.length === 1) {
      return { name: "program", programId, showCompletion: cauta.get("incheiere") === "1" }
    }
  }
  if (h.startsWith("/lesson/"))
    return { name: "lesson", id: decodePathPart(h.slice("/lesson/".length)) }
  if (h.startsWith("/mesaj/"))
    return { name: "message", id: decodePathPart(h.slice("/mesaj/".length)) }
  if (h === "/biblia/alege" || h.startsWith("/biblia/alege?")) {
    const semn = h.indexOf("?")
    const cauta = new URLSearchParams(semn === -1 ? "" : h.slice(semn + 1))
    const testament = cauta.get("testament")
    const bookId = cauta.get("carte")
    return {
      name: "bibleChooser",
      testament: testament === "vt" || testament === "nt" ? testament : undefined,
      bookId: bookId && bookId.length > 0 ? bookId : undefined,
    }
  }
  if (h.startsWith("/biblia/")) {
    const semn = h.indexOf("?")
    const path = semn === -1 ? h : h.slice(0, semn)
    const cauta = new URLSearchParams(semn === -1 ? "" : h.slice(semn + 1))
    const parts = path.slice("/biblia/".length).split("/")
    const bookId = decodePathPart(parts[0])
    const chapter = positiveInteger(parts[1])
    const verse = positiveInteger(cauta.get("verset"))
    if (bookId.length > 0 && chapter !== undefined)
      return { name: "bibleChapter", bookId, chapter, verse }
    return { name: "bible" }
  }
  if (h === "/biblia") return { name: "bible" }
  if (h === "/intreaba" || h.startsWith("/intreaba?")) {
    const semn = h.indexOf("?")
    if (semn === -1) return { name: "ask" }
    const cauta = new URLSearchParams(h.slice(semn + 1))
    const despre = cauta.get("despre")
    const requestedReturn = cauta.get("intoarcere")
    const returnTo = requestedReturn?.startsWith("/program/") ? requestedReturn : undefined
    return {
      name: "ask",
      despre: despre && despre.length > 0 ? despre : undefined,
      returnTo,
    }
  }
  if (h === "/intrare") return { name: "doors" }
  if (h === "/rugaciuni") return { name: "prayers" }
  if (h === "/biblioteca") return { name: "library" }
  if (h === "/final") return { name: "pathend" }
  if (h === "/criza" || h === "/crisis") return { name: "crisis" }
  if (h === "/devotional") return { name: "devotional" }
  if (h === "/pergament") return { name: "scroll" }
  if (h === "/candela") return { name: "lamp" }
  if (h === "/legamant") return { name: "covenant" }
  if (h === "/mesaj") return { name: "message" }
  if (h === "/ds") return { name: "ds" }
  return { name: "today" }
}

export function navigate(path: string): void {
  window.location.hash = path
}

export function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(parseRoute())
  useEffect(() => {
    const onChange = () => setRoute(parseRoute())
    window.addEventListener("hashchange", onChange)
    return () => window.removeEventListener("hashchange", onChange)
  }, [])
  return route
}
