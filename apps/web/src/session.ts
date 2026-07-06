// Sesiune client. Id-ul utilizatorului stă în localStorage și se trimite ca header
// x-user-id. La login (ultimul pas) id-ul anonim e înlocuit cu id-ul stabil Supabase,
// iar progresul se leagă pe server (POST /me/link).
const K_USER = "emanus_user_id"
const K_CAT = "emanus_category"
const K_ONB = "emanus_onboarded"
const K_STAGE = "emanus_faith_stage"
const K_EMAIL = "emanus_email"

export function getUserId(): string {
  try {
    return localStorage.getItem(K_USER) ?? ""
  } catch {
    return ""
  }
}

export function setUserId(id: string): void {
  try {
    localStorage.setItem(K_USER, id)
  } catch {
    /* ignore */
  }
}

export function getCategory(): string {
  try {
    return localStorage.getItem(K_CAT) ?? "teens12_18"
  } catch {
    return "teens12_18"
  }
}

export function setCategory(c: string): void {
  try {
    localStorage.setItem(K_CAT, c)
  } catch {
    /* ignore */
  }
}

export function getFaithStage(): string {
  try {
    return localStorage.getItem(K_STAGE) ?? "seeking"
  } catch {
    return "seeking"
  }
}

export function setFaithStage(s: string): void {
  try {
    localStorage.setItem(K_STAGE, s)
  } catch {
    /* ignore */
  }
}

export function isOnboarded(): boolean {
  try {
    return localStorage.getItem(K_ONB) === "1"
  } catch {
    return false
  }
}

export function setOnboarded(): void {
  try {
    localStorage.setItem(K_ONB, "1")
  } catch {
    /* ignore */
  }
}

// --- Autentificare (login LAST) ---
export function getEmail(): string {
  try {
    return localStorage.getItem(K_EMAIL) ?? ""
  } catch {
    return ""
  }
}

export function setEmail(email: string): void {
  try {
    localStorage.setItem(K_EMAIL, email)
  } catch {
    /* ignore */
  }
}

export function clearEmail(): void {
  try {
    localStorage.removeItem(K_EMAIL)
  } catch {
    /* ignore */
  }
}

export function isSignedIn(): boolean {
  return getEmail().length > 0
}
