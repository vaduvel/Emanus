import { createClient, type SupabaseClient } from "@supabase/supabase-js"

// Client Supabase lazy. Dacă variabilele de mediu lipsesc (ex. în sandbox), rămâne null
// și aplicația funcționează anonim mai departe — login-ul e ultimul pas, opțional.
let cached: SupabaseClient | null | undefined

export function getSupabase(): SupabaseClient | null {
  if (cached !== undefined) return cached
  const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined
  if (!url || !key) {
    cached = null
    return cached
  }
  cached = createClient(url, key, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
    },
  })
  return cached
}

export function isAuthConfigured(): boolean {
  return getSupabase() !== null
}
