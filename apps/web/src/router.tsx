import { useEffect, useState } from "react"

/*
 * Rutele aplicației, după reducere. (docs/20 §8)
 *
 * Ecrane vii: /intrare, / (Azi), /lesson/:id, /rugaciuni, /biblioteca, /biblia,
 * /biblia/:carte/:capitol, /final, /criza.
 * Ecranele vechi (comunitate, familie, mentorat, dashboard, recomandare,
 * creștere) rămân în cod, dar nu mai sunt legate nicăieri: se reintroduc pe
 * rând, după ce parcursul e testat pe oameni reali.
 *
 * Biblioteca e primul dintre ele care revine — ca raft pe subiect, nu ca poartă
 * de intrare și fără categorii de identitate.
 *
 * Biblia explicată e al doilea tab din machetă (Azi · Biblia · Întreabă · Ai
 * mei · Eu) și are două ecrane: raftul cărților și capitolul.
 */
export type Route =
  | { name: "today" }
  | { name: "doors" }
  | { name: "prayers" }
  | { name: "library" }
  | { name: "bible" }
  | { name: "bibleChapter"; bookId: string; chapter: number }
  | { name: "pathend" }
  | { name: "crisis" }
  | { name: "ds" }
  | { name: "lesson"; id?: string }

export function parseRoute(): Route {
  const h = window.location.hash.replace(/^#/, "")
  if (h.startsWith("/lesson/"))
    return { name: "lesson", id: decodeURIComponent(h.slice("/lesson/".length)) }
  if (h.startsWith("/biblia/")) {
    const parts = h.slice("/biblia/".length).split("/")
    const bookId = decodeURIComponent(parts[0] ?? "")
    const chapter = Number.parseInt(parts[1] ?? "", 10)
    if (bookId.length > 0 && Number.isFinite(chapter))
      return { name: "bibleChapter", bookId, chapter }
    return { name: "bible" }
  }
  if (h === "/biblia") return { name: "bible" }
  if (h === "/intrare") return { name: "doors" }
  if (h === "/rugaciuni") return { name: "prayers" }
  if (h === "/biblioteca") return { name: "library" }
  if (h === "/final") return { name: "pathend" }
  if (h === "/criza" || h === "/crisis") return { name: "crisis" }
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
