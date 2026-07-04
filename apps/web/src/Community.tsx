import { useEffect, useState } from "react"
import type { CommunityPostView, CrisisResource } from "@emanus/shared"
import { MAX_POST_LENGTH } from "@emanus/shared"
import { createPost, getCommunity } from "./api"
import type { CreatePostResult } from "./api"
import { getCategory } from "./session"

export function CrisisBanner({ resources }: { resources: CrisisResource[] }) {
  return (
    <div className="crisis">
      <h3>Nu ești singur 💙</h3>
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

export function Community({ onBack }: { onBack: () => void }) {
  const category = getCategory()
  const [posts, setPosts] = useState<CommunityPostView[] | null>(null)
  const [body, setBody] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState<CreatePostResult | null>(null)

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
      const res = await createPost(category, body.trim())
      setNotice(res)
      if (res.post.status === "visible") {
        setBody("")
        load()
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setBusy(false)
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
          placeholder="Împărtășește un gând, o rugăciune, o întrebare…"
        />
        <div className="composer__foot">
          <span className="muted">
            {body.length}/{MAX_POST_LENGTH}
          </span>
          <button type="button" disabled={!body.trim() || busy} onClick={submit}>
            {busy ? "Se trimite…" : "Postează"}
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
        {posts?.map((p) => (
          <article key={p.id} className="post">
            <div className="post__head">
              <span className="post__avatar">{p.author.avatar}</span>
              <b>{p.author.anonName}</b>
            </div>
            <p className="post__body">{p.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
