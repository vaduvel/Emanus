import { useEffect, useMemo, useState } from "react"
import { BookOpen, Search } from "lucide-react"
import { contentManifest, visibleContentShelves } from "../content"
import { navigate } from "../router"

const SUGGESTIONS = [
  "Cum pot ierta?",
  "De ce a permis Dumnezeu asta?",
  "De ce nu Îl simt pe Dumnezeu?",
  "Cum încep să mă rog?",
  "Pot avea încredere în Biblie?",
]

const STOP_WORDS = new Set(["am", "ca", "ce", "cum", "de", "eu", "in", "il", "la", "ma", "mai", "nu", "o", "pe", "pot", "sa", "si"])

const PATH_SEARCH_ALIASES: Record<string, string> = {
  path_neiertare: "iert ierta iertare neiertare rana ranit",
  path_suferinta: "doliu moarte pierdere pierdut boala bolnav suferinta durere de ce a permis dumnezeu pedeapsa",
  path_aproape: "nu il simt pe dumnezeu absent departe tacere",
  path_umblare: "cum incep sa ma rog rugaciune citirea bibliei",
  path_temelie: "pot avea incredere in biblie scriptura adevarata",
}

const CURATED_QUERY_TARGETS: Record<string, string> = {
  "cum pot ierta": "path_neiertare",
  "de ce a permis dumnezeu asta": "path_suferinta",
  "am pierdut pe cineva": "path_suferinta",
  "sunt bolnav": "path_suferinta",
  "de ce nu il simt pe dumnezeu": "path_aproape",
  "cum incep sa ma rog": "path_umblare",
  "pot avea incredere in biblie": "path_temelie",
}

interface SearchResult {
  id: string
  title: string
  forWhom: string
  lessonIds: string[]
  searchText: string
}

function normalize(value: string): string {
  return value.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase()
}

function searchableTerms(value: string): string[] {
  return normalize(value)
    .replace(/[^\p{Letter}\p{Number}]+/gu, " ")
    .split(/\s+/)
    .filter((term) => term.length > 1 && !STOP_WORDS.has(term))
}

export function Ask({ despre }: { despre?: string }) {
  const [query, setQuery] = useState("")
  const manifest = contentManifest()

  useEffect(() => {
    setQuery("")
  }, [despre])

  const resources = useMemo<SearchResult[]>(() => {
    const paths = manifest.paths.map((path) => ({
      id: path.id,
      title: path.title,
      forWhom: path.promise,
      lessonIds: path.lessons.map((lesson) => lesson.id),
      searchText: normalize([path.title, path.promise, ...path.lessons.map((lesson) => lesson.title), PATH_SEARCH_ALIASES[path.id] ?? ""].join(" ")),
    }))
    const courses = visibleContentShelves().flatMap((shelf) => shelf.courses).map((course) => ({
      id: course.id,
      title: course.title,
      forWhom: course.forWhom,
      lessonIds: course.lessonIds,
      searchText: normalize(`${course.title} ${course.forWhom}`),
    }))
    return [...paths, ...courses]
  }, [manifest])

  const results = useMemo(() => {
    const term = normalize(query.trim())
    if (!term) return []
    const words = searchableTerms(term)
    const preferredId = CURATED_QUERY_TARGETS[term.replace(/[^\p{Letter}\p{Number}]+$/u, "")]
    return resources
      .filter((resource) => resource.searchText.includes(term) || (words.length > 0 && words.every((word) => resource.searchText.includes(word))))
      .sort((a, b) => Number(b.id === preferredId) - Number(a.id === preferredId))
  }, [query, resources])

  function openCourse(resource: SearchResult) {
    const first = resource.lessonIds[0]
    if (first) navigate(`/lesson/${first}`)
  }

  return (
    <section className="ask-screen">
      <header className="today__head">
        <Search size={22} strokeWidth={1.7} aria-hidden />
        <h1>Întreabă</h1>
      </header>
      <p className="muted">Scrie întrebarea în cuvintele tale. Îți arătăm numai răspunsuri din cursurile verificate; când nu avem unul, nu inventăm.</p>
      {despre ? <p className="muted">Întrebi despre: <strong>{despre}</strong></p> : null}
      <label className="ask-screen__search">
        <span>Întrebarea ta</span>
        <div>
          <Search size={18} aria-hidden />
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="De exemplu: cum pot ierta?" />
        </div>
      </label>
      {!query ? <div className="ask-screen__suggestions" aria-label="Întrebări frecvente">{SUGGESTIONS.map((suggestion) => <button key={suggestion} type="button" className="ghost" onClick={() => setQuery(suggestion)}>{suggestion}</button>)}</div> : null}
      {query && results.length > 0 ? <div className="ask-screen__results"><p className="today__kicker">Răspunsuri găsite</p>{results.slice(0, 12).map((resource) => <button key={resource.id} type="button" className="tile ask-result" disabled={resource.lessonIds.length === 0} onClick={() => openCourse(resource)}><BookOpen size={19} aria-hidden /><span><strong>{resource.title}</strong><small>{resource.forWhom}</small></span></button>)}</div> : null}
      {query && results.length === 0 ? <div className="tile ask-screen__empty"><h2>Nu avem încă un răspuns verificat</h2><p className="muted">Nu trimitem întrebarea nimănui și nu generăm automat un răspuns spiritual.</p></div> : null}
    </section>
  )
}
