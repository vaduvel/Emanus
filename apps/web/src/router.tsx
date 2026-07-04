import { useEffect, useState } from "react"

export type Route =
  | { name: "home" }
  | { name: "dashboard" }
  | { name: "onboarding" }
  | { name: "lesson"; id?: string }

export function parseRoute(): Route {
  const h = window.location.hash.replace(/^#/, "")
  if (h.startsWith("/lesson/")) return { name: "lesson", id: decodeURIComponent(h.slice("/lesson/".length)) }
  if (h === "/lesson") return { name: "lesson" }
  if (h === "/dashboard") return { name: "dashboard" }
  if (h === "/onboarding") return { name: "onboarding" }
  return { name: "home" }
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
