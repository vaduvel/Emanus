import { useEffect, useState } from "react"

/*
 * Rutele aplicației, după reducere. (docs/20 §8)
 *
 * Ecrane vii: /intrare, / (Azi), /lesson/:id, /rugaciuni, /biblioteca, /final, /criza.
 * Ecranele vechi (comunitate, familie, mentorat, dashboard, recomandare,
 * creștere) rămân în cod, dar nu mai sunt legate nicăieri: se reintroduc pe
 * rând, după ce parcursul e testat pe oameni reali.
 *
 * Biblioteca e primul dintre ele care revine — ca raft pe subiect, nu ca poartă
 * de intrare și fără categorii de identitate.
 */
export type Route =
  | { name: "today" }
  | { name: "doors" }
  | { name: "prayers" }
  | { name: "library" }
  | { name: "pathend" }
  | { name: "crisis" }
  | { name: "ds" }
  | { name: "lesson"; id?: string }

export function parseRoute(): Route {
  const h = window.location.hash.replace(/^#/, "")
  if (h.startsWith("/lesson/"))
    return { name: "lesson", id: decodeURIComponent(h.slice("/lesson/".length)) }
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
