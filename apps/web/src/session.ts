// Sesiune client (Faza 4). Fără auth real încă — id-ul utilizatorului stă în
// localStorage și se trimite ca header x-user-id. Se înlocuiește cu Supabase Auth.
const K_USER = "emanus_user_id"
const K_CAT = "emanus_category"
const K_ONB = "emanus_onboarded"

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
