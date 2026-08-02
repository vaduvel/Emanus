import { useState } from "react"
import type { CSSProperties } from "react"
import { LogOut, Mail, ShieldCheck } from "lucide-react"
import { clearBiblePersonalLocal, syncBiblePersonal } from "./biblePersonal"
import { ensureCloudUser, invalidateCloudUser } from "./cloudSession"
import { pushState } from "./cloud"
import { clearJourneyLocal, load } from "./journey"
import { navigate } from "./router"
import { clearEmail, clearUserId, getEmail, setEmail as saveEmail, setUserId } from "./session"
import { getSupabase, isAuthConfigured } from "./supabase"
import { Button } from "./ds"

function message(error: unknown): string {
  return error instanceof Error ? error.message : String(error)
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
  const [verification, setVerification] = useState<"signin" | "email_change">("signin")
  const [email, setEmailInput] = useState("")
  const [code, setCode] = useState("")
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)

  async function sendCode(): Promise<void> {
    const supabase = getSupabase()
    const address = email.trim()
    if (!supabase || !address) return
    setBusy(true)
    setError(null)
    try {
      const current = await ensureCloudUser()
      if (current?.is_anonymous) {
        const { error: updateError } = await supabase.auth.updateUser({ email: address })
        if (!updateError) {
          setVerification("email_change")
        } else if (/already|registered|exists/i.test(updateError.message)) {
          const { error: signInError } = await supabase.auth.signInWithOtp({
            email: address,
            options: { shouldCreateUser: false },
          })
          if (signInError) throw signInError
          setVerification("signin")
        } else {
          throw updateError
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithOtp({
          email: address,
          options: { shouldCreateUser: true },
        })
        if (signInError) throw signInError
        setVerification("signin")
      }
      setInfo(`Ți-am trimis un cod de conectare la ${address}. Verifică-ți e-mailul.`)
      setPhase("code")
    } catch (cause) {
      setError(message(cause))
    } finally {
      setBusy(false)
    }
  }

  async function verify(): Promise<void> {
    const supabase = getSupabase()
    if (!supabase) return
    setBusy(true)
    setError(null)
    try {
      let result = await supabase.auth.verifyOtp({
        email: email.trim(),
        token: code.trim(),
        type: verification,
      })
      if (result.error && verification === "email_change") {
        result = await supabase.auth.verifyOtp({
          email: email.trim(),
          token: code.trim(),
          type: "email",
        })
      }
      if (result.error) throw result.error
      const userId = result.data.user?.id
      if (userId) {
        setUserId(userId)
        saveEmail(email.trim())
        invalidateCloudUser()
        await Promise.all([syncBiblePersonal(), pushState(load())])
      }
      navigate("/")
    } catch (cause) {
      setError(message(cause))
    } finally {
      setBusy(false)
    }
  }

  async function signOut(): Promise<void> {
    const supabase = getSupabase()
    setBusy(true)
    setError(null)
    try {
      if (supabase) {
        await Promise.all([syncBiblePersonal(), pushState(load())])
        const { error: signOutError } = await supabase.auth.signOut()
        if (signOutError) throw signOutError
        invalidateCloudUser()
      }
      clearBiblePersonalLocal()
      clearJourneyLocal()
      clearEmail()
      clearUserId()
      navigate("/")
    } catch (cause) {
      setError(message(cause))
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="auth">
      <header className="dashboard__head">
        <h1>Contul meu</h1>
        <button type="button" className="ghost" onClick={() => navigate("/")}>← Acasă</button>
      </header>

      <div style={iconWrapStyle}>
        <ShieldCheck size={28} strokeWidth={1.7} aria-hidden />
      </div>

      {existing ? (
        <>
          <p style={signedRowStyle}><Mail size={16} aria-hidden /> {existing}</p>
          <p className="muted">Ești conectat. Progresul tău este asociat acestui cont.</p>
          <button type="button" style={outBtnStyle} disabled={busy} onClick={() => void signOut()}>
            <LogOut size={15} aria-hidden />
            {busy ? "Se deconectează…" : "Deconectează-te"}
          </button>
        </>
      ) : !configured ? (
        <>
          <p className="muted">Conectarea nu este disponibilă în acest mediu. Aplicația rămâne utilizabilă local.</p>
          <Button variant="secondary" block onClick={() => navigate("/")}>Înapoi la Acasă</Button>
        </>
      ) : (
        <>
          <p className="muted">Leagă progresul de e-mail printr-un cod, fără parolă.</p>
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
                onChange={(event) => setEmailInput(event.target.value)}
              />
              <Button variant="primary" block disabled={busy || !email.trim()} onClick={() => void sendCode()}>
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
                onChange={(event) => setCode(event.target.value.replace(/[^0-9]/g, ""))}
              />
              <Button variant="primary" block disabled={busy || code.trim().length < 6} onClick={() => void verify()}>
                {busy ? "Se verifică…" : "Confirmă și intră"}
              </Button>
              <button type="button" className="ghost" onClick={() => {
                setPhase("email")
                setCode("")
                setInfo(null)
              }}>Am greșit e-mailul</button>
            </>
          )}
        </>
      )}
    </section>
  )
}
