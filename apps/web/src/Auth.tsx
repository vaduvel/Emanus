import { useState } from "react"
import type { CSSProperties } from "react"
import { LogOut, Mail, ShieldCheck } from "lucide-react"
import { linkAccount } from "./api"
import { navigate } from "./router"
import { clearEmail, getEmail, setEmail as saveEmail, setUserId } from "./session"
import { getSupabase, isAuthConfigured } from "./supabase"
import { Button } from "./ds"

function msg(e: unknown): string {
  return e instanceof Error ? e.message : String(e)
}

const iconWrapStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 56,
  height: 56,
  borderRadius: "var(--radius-lg)",
  background: "var(--accent-soft)",
  color: "var(--accent-strong)",
  marginBottom: 4,
}
const inputStyle: CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  fontSize: "1rem",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-lg)",
  background: "var(--surface)",
  color: "var(--text)",
  marginBottom: 10,
}
const codeInputStyle: CSSProperties = {
  ...inputStyle,
  textAlign: "center",
  letterSpacing: "0.4em",
  fontSize: "1.3rem",
  fontWeight: 600,
}
const infoStyle: CSSProperties = {
  background: "var(--accent-soft)",
  color: "var(--accent-strong)",
  borderRadius: "var(--radius-lg)",
  padding: "10px 12px",
  fontSize: "0.85rem",
  marginBottom: 10,
}
const signedRowStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  fontWeight: 600,
  color: "var(--text)",
  marginBottom: 12,
}
const outBtnStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  alignSelf: "flex-start",
  background: "var(--surface)",
  color: "var(--text)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-pill)",
  padding: "8px 14px",
  fontSize: "0.85rem",
  fontWeight: 600,
  boxShadow: "none",
  cursor: "pointer",
  marginBottom: 12,
}

export function Auth() {
  const configured = isAuthConfigured()
  const existing = getEmail()
  const [phase, setPhase] = useState<"email" | "code">("email")
  const [email, setEmailInput] = useState("")
  const [code, setCode] = useState("")
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)

  async function sendCode() {
    const sb = getSupabase()
    if (!sb) return
    const addr = email.trim()
    if (!addr) return
    setBusy(true)
    setError(null)
    try {
      const { error: err } = await sb.auth.signInWithOtp({
        email: addr,
        options: { shouldCreateUser: true },
      })
      if (err) throw err
      setInfo(`Ți-am trimis un cod de conectare la ${addr}. Verifică-ți e-mailul.`)
      setPhase("code")
    } catch (e) {
      setError(msg(e))
    } finally {
      setBusy(false)
    }
  }

  async function verify() {
    const sb = getSupabase()
    if (!sb) return
    setBusy(true)
    setError(null)
    try {
      const { data, error: err } = await sb.auth.verifyOtp({
        email: email.trim(),
        token: code.trim(),
        type: "email",
      })
      if (err) throw err
      const uid = data.user?.id
      if (uid) {
        // Leagă progresul anonim de contul autentificat ÎNAINTE de a schimba id-ul local.
        try {
          await linkAccount(uid)
        } catch {
          /* best-effort: chiar dacă legarea eșuează, continuăm cu login-ul */
        }
        setUserId(uid)
        saveEmail(email.trim())
      }
      navigate("/")
    } catch (e) {
      setError(msg(e))
    } finally {
      setBusy(false)
    }
  }

  async function signOut() {
    const sb = getSupabase()
    if (sb) {
      try {
        await sb.auth.signOut()
      } catch {
        /* ignore */
      }
    }
    clearEmail()
    navigate("/")
  }

  return (
    <section className="auth">
      <header className="dashboard__head">
        <h1>Contul meu</h1>
        <button type="button" className="ghost" onClick={() => navigate("/")}>
          ← Acasă
        </button>
      </header>

      <div style={iconWrapStyle}>
        <ShieldCheck size={28} strokeWidth={1.7} aria-hidden />
      </div>

      {existing ? (
        <>
          <p style={signedRowStyle}>
            <Mail size={16} aria-hidden /> {existing}
          </p>
          <p className="muted">
            Ești conectat. Progresul tău e legat de acest cont și te urmează pe orice dispozitiv.
          </p>
          <button type="button" style={outBtnStyle} onClick={signOut}>
            <LogOut size={15} aria-hidden />
            Deconectează-te
          </button>
        </>
      ) : !configured ? (
        <>
          <p className="muted">
            Conectarea nu e disponibilă în acest mediu (lipsesc cheile Supabase). Poți folosi
            aplicația anonim — progresul e salvat local până la prima conectare.
          </p>
          <Button variant="secondary" block onClick={() => navigate("/")}>
            Înapoi la Acasă
          </Button>
        </>
      ) : (
        <>
          <p className="muted">
            Salvează-ți progresul și regăsește-l pe orice dispozitiv. Îți trimitem un cod pe e-mail
            — fără parolă de reținut.
          </p>

          {error && <p className="error">{error}</p>}
          {info && <p style={infoStyle}>{info}</p>}

          {phase === "email" ? (
            <>
              <input
                style={inputStyle}
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="nume@exemplu.ro"
                value={email}
                onChange={(e) => setEmailInput(e.target.value)}
              />
              <Button variant="primary" block disabled={busy || !email.trim()} onClick={sendCode}>
                {busy ? "Se trimite…" : "Trimite-mi codul"}
              </Button>
            </>
          ) : (
            <>
              <input
                style={codeInputStyle}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                placeholder="000000"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ""))}
              />
              <Button variant="primary" block disabled={busy || code.trim().length < 6} onClick={verify}>
                {busy ? "Se verifică…" : "Confirmă și intră"}
              </Button>
              <button
                type="button"
                className="ghost"
                onClick={() => {
                  setPhase("email")
                  setCode("")
                  setInfo(null)
                }}
              >
                Am greșit e-mailul
              </button>
            </>
          )}
        </>
      )}
    </section>
  )
}
