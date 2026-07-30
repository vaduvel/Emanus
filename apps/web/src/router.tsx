import { useEffect, useState } from "react"

/*
 * Rutele aplicației, după reducere. (docs/20 §8)
 *
 * Ecrane vii: /intrare, / (Azi), /biblia, /intreaba, /ai-mei, /eu,
 * /lesson/:id, /final și /criza. Aliasurile vechi pentru bibliotecă și
 * rugăciuni rămân funcționale pentru linkurile deja distribuite.
 */
export type Route =
  | { name: "today" }
  | { name: "doors" }
  | { name: "bible" }
  | { name: "ask" }
  | { name: "people" }
  | { name: "profile" }
  | { name: "pathend" }
  | { name: "crisis" }
  | { name: "ds" }
  | { name: "lesson"; id?: string }

export function parseRoute(): Route {
  const h = window.location.hash.replace(/^#/, "")
  const path = h.split("?")[0] ?? ""
  if (path.startsWith("/lesson/"))
    return { name: "lesson", id: decodeURIComponent(path.slice("/lesson/".length)) }
  if (path === "/intrare") return { name: "doors" }
  if (path === "/biblia" || path === "/biblioteca") return { name: "bible" }
  if (path === "/intreaba") return { name: "ask" }
  if (path === "/ai-mei" || path === "/rugaciuni") return { name: "people" }
  if (path === "/eu") return { name: "profile" }
  if (path === "/final") return { name: "pathend" }
  if (path === "/criza" || path === "/crisis") return { name: "crisis" }
  if (path === "/ds") return { name: "ds" }
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
