import { useEffect, useState } from "react"
import type { CSSProperties } from "react"
import { HandHeart } from "lucide-react"
import type { CommunityPostView, CrisisResource } from "@emanus/shared"
import { MAX_POST_LENGTH } from "@emanus/shared"
import { createPost, getCommunity, prayForPost } from "./api"
import type { CreatePostResult } from "./api"
import { getCategory } from "./session"
import { Avatar } from "./ds"

export function CrisisBanner({ resources }: { resources: CrisisResource[] }) {
  return (
    <div className="crisis">
      <h3>Nu ești singur</h3>
      <p>
        Pare că treci prin ceva greu. Nu e nevoie să duci asta singur — te rugăm vorbește acum cu
        cineva care te poate ajuta:
      </p>
      <ul>
        {resources.map((r) => (
          <li key={r.phone}>
            <b>{r.phone}</b> — {r.label}
            <br />
            <span className="muted">{r.note}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function PostNotice({ result }: { result: CreatePostResult }) {
  if (result.crisisResources) return <CrisisBanner resources={result.crisisResources} />
  if (result.post.status === "pending")
    return <div className="notice">Mulțumim! Postarea ta e în verificare înainte să apară.</div>
  if (result.post.status === "removed")
    return (
      <div className="notice notice--warn">
        Postarea nu respectă regulile comunității și nu a fost publicată.
      </div>
    )
  return null
}

const prayerPostStyle: CSSProperties = { borderLeft: "3px solid var(--accent)" }
const prayRowStyle: CSSProperties = { display: "flex", alignItems: "center", gap: 10, marginTop: 2 }
const prayBtnStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  background: "var(--accent-soft)",
  color: "var(--accent-strong)",
  border: "1px solid var(--accent)",
  borderRadius: "var(--radius-pill)",
  padding: "6px 14px",
  fontSize: "0.85rem",
  fontWeight: 600,
  boxShadow: "none",
  cursor: "pointer",
}
const prayCountStyle: CSSProperties = { fontSize: "0.8rem" }

export function Community({ onBack }: { onBack: () => void }) {
  const category = getCategory()
  const [posts, setPosts] = useState<CommunityPostView[] | null>(null)
  const [body, setBody] = useState("")
  const [asPrayer, setAsPrayer] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState<CreatePostResult | null>(null)
  const [prayCounts, setPrayCounts] = useState<Record<string, number>>({})
  const [prayedIds, setPrayedIds] = useState<Record<string, boolean>>({})

  function load() {
    getCommunity(category)
      .then((r) => setPosts(r.posts))
      .catch((e: unknown) => setError(e instanceof Error ? e.message : String(e)))
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function submit() {
    if (!body.trim()) return
    setBusy(true)
    setError(null)
    setNotice(null)
    try {
      const res = await createPost(category, body.trim(), asPrayer ? "prayer_request" : "post")
      setNotice(res)
      if (res.post.status === "visible") {
        setBody("")
        setAsPrayer(false)
        load()
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setBusy(false)
    }
  }

  async function pray(postId: string) {
    if (prayedIds[postId]) return
    setPrayedIds((s) => ({ ...s, [postId]: true }))
    try {
      const r = await prayForPost(postId)
      setPrayCounts((m) => ({ ...m, [postId]: r.prayCount }))
    } catch (e: unknown) {
      setPrayedIds((s) => ({ ...s, [postId]: false }))
      setError(e instanceof Error ? e.message : String(e))
    }
  }

  return (
    <section className="community">
      <header className="dashboard__head">
        <h1>Comunitate</h1>
        <button type="button" className="ghost" onClick={onBack}>
          ← Înapoi
        </button>
      </header>
      <p className="muted">Un spațiu sigur. Fii bun și încurajator. Postările sunt moderate.</p>

      <div className="composer">
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          maxLength={MAX_POST_LENGTH}
          rows={3}
          placeholder={
            asPrayer
              ? "Pentru ce ai nevoie de rugăciune?…"
              : "Împărtășește un gând, o rugăciune, o întrebare…"
          }
        />
        <label className="consent">
          <input
            type="checkbox"
            checked={asPrayer}
            onChange={(e) => setAsPrayer(e.target.checked)}
          />
          <span>Marchează ca cerere de rugăciune — comunitatea se poate ruga pentru tine.</span>
        </label>
        <div className="composer__foot">
          <span className="muted">
            {body.length}/{MAX_POST_LENGTH}
          </span>
          <button type="button" disabled={!body.trim() || busy} onClick={submit}>
            {busy ? "Se trimite…" : asPrayer ? "Cere rugăciune" : "Postează"}
          </button>
        </div>
      </div>

      {notice && <PostNotice result={notice} />}
      {error && <p className="error">{error}</p>}

      <div className="posts">
        {!posts && <p className="muted">Se încarcă…</p>}
        {posts && posts.length === 0 && (
          <p className="muted">Încă nu e nimic aici. Fii primul care începe o conversație bună.</p>
        )}
        {posts?.map((p) => {
          if (p.kind === "prayer_request") {
            const count = prayCounts[p.id] ?? p.prayCount
            const didPray = Boolean(prayedIds[p.id])
            return (
              <article key={p.id} className="post" style={prayerPostStyle}>
                <div className="post__head">
                  <Avatar name={p.author.anonName} size="sm" />
                  <span>
                    <b>{p.author.anonName}</b> a cerut rugăciune
                  </span>
                </div>
                <p className="post__body">{p.body}</p>
                <div style={prayRowStyle}>
                  <button
                    type="button"
                    style={prayBtnStyle}
                    disabled={didPray}
                    onClick={() => pray(p.id)}
                  >
                    <HandHeart size={15} aria-hidden />
                    {didPray ? "Te-ai rugat" : "Mă rog pentru tine"}
                  </button>
                  {count > 0 && (
                    <span className="muted" style={prayCountStyle}>
                      {count}{" "}
                      {count === 1 ? "persoană s-a rugat" : "persoane s-au rugat"}
                    </span>
                  )}
                </div>
              </article>
            )
          }
          return (
            <article key={p.id} className="post">
              <div className="post__head">
                <Avatar name={p.author.anonName} size="sm" />
                <b>{p.author.anonName}</b>
              </div>
              <p className="post__body">{p.body}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}
