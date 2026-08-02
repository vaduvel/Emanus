import type { User } from "@supabase/supabase-js"
import { getSupabase } from "./supabase"

type Listener = (user: User | null) => void

let currentUser: User | null | undefined
let pendingUser: Promise<User | null> | null = null
let listening = false
const listeners = new Set<Listener>()

function emit(user: User | null): void {
  for (const listener of listeners) listener(user)
}

function startListening(): void {
  const supabase = getSupabase()
  if (!supabase || listening) return
  listening = true
  supabase.auth.onAuthStateChange((_event, session) => {
    const next = session?.user ?? null
    if (currentUser?.id === next?.id) return
    currentUser = next
    pendingUser = null
    emit(next)
  })
}

/**
 * Intoarce identitatea Supabase curenta si creeaza una anonima numai daca nu
 * exista deja. Guard-ul comun impiedica doua module sa creeze conturi anonime
 * concurente la prima pornire.
 */
export async function ensureCloudUser(): Promise<User | null> {
  const supabase = getSupabase()
  if (!supabase) return null
  startListening()
  if (currentUser !== undefined) {
    if (currentUser) return currentUser
    // O iesire explicita poate fi urmata de o sesiune anonima noua.
  }
  if (pendingUser) return pendingUser

  pendingUser = (async () => {
    try {
      const { data, error } = await supabase.auth.getSession()
      if (error) return null
      if (data.session?.user) {
        currentUser = data.session.user
        return currentUser
      }
      const { data: anonymous, error: anonymousError } = await supabase.auth.signInAnonymously()
      if (anonymousError || !anonymous.user) return null
      currentUser = anonymous.user
      return currentUser
    } catch {
      return null
    } finally {
      pendingUser = null
    }
  })()

  return pendingUser
}

export function peekCloudUser(): User | null | undefined {
  startListening()
  return currentUser
}

export function cloudUserIsAnonymous(user: User | null | undefined): boolean {
  return Boolean(user?.is_anonymous)
}

export function onCloudUserChange(listener: Listener): () => void {
  startListening()
  listeners.add(listener)
  return () => listeners.delete(listener)
}

/** Folosit dupa autentificare/deconectare ca urmatoarea citire sa ia sesiunea reala. */
export function invalidateCloudUser(): void {
  currentUser = undefined
  pendingUser = null
}
