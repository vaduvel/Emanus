import { useEffect, useState } from "react"

export type Route =
  | { name: "home" }
  | { name: "dashboard" }
  | { name: "daily" }
  | { name: "onboarding" }
  | { name: "recommendation" }
  | { name: "prayer" }
  | { name: "ebenezer" }
  | { name: "family" }
  | { name: "community" }
  | { name: "growth" }
  | { name: "mentorat" }
  | { name: "crisis" }
  | { name: "ds" }
  | { name: "lesson"; id?: string }

export function parseRoute(): Route {
  const h = window.location.hash.replace(/^#/, "")
  if (h.startsWith("/lesson/")) return { name: "lesson", id: decodeURIComponent(h.slice("/lesson/".length)) }
  if (h === "/lesson") return { name: "lesson" }
  if (h === "/dashboard") return { name: "dashboard" }
  if (h === "/daily") return { name: "daily" }
  if (h === "/onboarding") return { name: "onboarding" }
  if (h === "/recommendation") return { name: "recommendation" }
  if (h === "/prayer") return { name: "prayer" }
  if (h === "/ebenezer") return { name: "ebenezer" }
  if (h === "/family") return { name: "family" }
  if (h === "/community") return { name: "community" }
  if (h === "/growth") return { name: "growth" }
  if (h === "/mentorat") return { name: "mentorat" }
  if (h === "/crisis") return { name: "crisis" }
  if (h === "/ds") return { name: "ds" }
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
