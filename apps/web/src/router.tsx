import { useEffect, useState } from "react"

export type Route =
  | { name: "today" }
  | { name: "doors" }
  | { name: "bible" }
  | { name: "bibleChapter"; bookId: string; chapter: number }
  | { name: "library" }
  | { name: "ask"; despre?: string }
  | { name: "people" }
  | { name: "prayers" }
  | { name: "profile" }
  | { name: "pathend" }
  | { name: "crisis" }
  | { name: "ds" }
  | { name: "lesson"; id?: string }

export function parseRoute(): Route {
  const hash = window.location.hash.replace(/^#/, "")
  const [path, query = ""] = hash.split("?", 2)

  if (path.startsWith("/lesson/")) {
    return { name: "lesson", id: decodeURIComponent(path.slice("/lesson/".length)) }
  }
  if (path.startsWith("/biblia/")) {
    const [encodedBookId, encodedChapter] = path.slice("/biblia/".length).split("/", 2)
    const bookId = decodeURIComponent(encodedBookId ?? "")
    const chapter = Number.parseInt(encodedChapter ?? "", 10)
    return bookId && Number.isFinite(chapter) ? { name: "bibleChapter", bookId, chapter } : { name: "bible" }
  }
  if (path === "/biblia") return { name: "bible" }
  if (path === "/biblioteca") return { name: "library" }
  if (path === "/intreaba") {
    const despre = new URLSearchParams(query).get("despre")
    return despre ? { name: "ask", despre } : { name: "ask" }
  }
  if (path === "/intrare") return { name: "doors" }
  if (path === "/ai-mei") return { name: "people" }
  if (path === "/rugaciuni") return { name: "prayers" }
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
