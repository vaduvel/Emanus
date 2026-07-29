import { createClient, type SupabaseClient } from "@supabase/supabase-js"

/*
 * Client Supabase lazy.
 *
 * Cheia de aici e PUBLICĂ prin definiție (publishable / anon) — ajunge în browserul
 * fiecărui om și nu poate face nimic fără politicile RLS din supabase/schema.sql.
 * Cheia secretă (service_role / sb_secret_...) NU are ce căuta în apps/web,
 * niciodată: ocolește RLS și ar da oricui jurnalele și rugăciunile tuturor.
 *
 * Dacă variabilele lipsesc (sandbox, build de test), rămâne null și aplicația
 * merge complet local. Sincronizarea e un plus, nu o condiție de intrare.
 */
let cached: SupabaseClient | null | undefined

export function getSupabase(): SupabaseClient | null {
  if (cached !== undefined) return cached
  const env = import.meta.env
  const url = env.VITE_SUPABASE_URL as string | undefined
  const key = (env.VITE_SUPABASE_PUBLISHABLE_KEY ?? env.VITE_SUPABASE_ANON_KEY) as
    | string
    | undefined
  if (!url || !key) {
    cached = null
    return cached
  }
  cached = createClient(url, key, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  })
  return cached
}

export function isAuthConfigured(): boolean {
  return getSupabase() !== null
}
