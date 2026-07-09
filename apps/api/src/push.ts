// Push notifications (docs/00-DIRECTIE): la o cerere de rugăciune vizibilă anunțăm comunitatea.
// Scaffold web-push/VAPID: activ DOAR când VAPID_PUBLIC_KEY + VAPID_PRIVATE_KEY sunt setate.
// Abonamentele se țin în memorie (se persistă la login real / într-un tabel dedicat — TODO).
//
// Generează o pereche de chei: `npx web-push generate-vapid-keys`.
import webpush from "web-push"
import type { PushSubscription } from "web-push"

const publicKey = process.env.VAPID_PUBLIC_KEY ?? ""
const privateKey = process.env.VAPID_PRIVATE_KEY ?? ""
const subject = process.env.VAPID_SUBJECT ?? "mailto:contact@emanus.app"

const enabled = Boolean(publicKey && privateKey)
if (enabled) {
  try {
    webpush.setVapidDetails(subject, publicKey, privateKey)
  } catch (err) {
    console.error("VAPID invalid, push dezactivat:", err)
  }
}

export interface PushPayload {
  title: string
  body: string
  url?: string
}

// endpoint -> { userId, subscription }
const subscriptions = new Map<string, { userId: string; sub: PushSubscription }>()

export function pushEnabled(): boolean {
  return enabled
}

export function pushPublicKey(): string {
  return publicKey
}

export function savePushSubscription(
  userId: string,
  sub: PushSubscription,
): { ok: boolean; enabled: boolean } {
  if (!sub || typeof sub.endpoint !== "string") return { ok: false, enabled }
  subscriptions.set(sub.endpoint, { userId, sub })
  return { ok: true, enabled }
}

export function removePushSubscription(_userId: string, endpoint: string): { ok: boolean } {
  if (endpoint) subscriptions.delete(endpoint)
  return { ok: true }
}

// La login, mutăm abonamentele de pe id-ul anonim pe id-ul stabil (Supabase).
export function reassignPushSubscriptions(fromUserId: string, toUserId: string): void {
  if (!fromUserId || !toUserId || fromUserId === toUserId) return
  for (const rec of subscriptions.values()) {
    if (rec.userId === fromUserId) rec.userId = toUserId
  }
}

export async function sendPushToAll(
  payload: PushPayload,
  opts: { excludeUserId?: string } = {},
): Promise<{ sent: number }> {
  if (!enabled) return { sent: 0 }
  const data = JSON.stringify(payload)
  let sent = 0
  await Promise.all(
    [...subscriptions.entries()].map(async ([endpoint, rec]) => {
      if (opts.excludeUserId && rec.userId === opts.excludeUserId) return
      try {
        await webpush.sendNotification(rec.sub, data)
        sent += 1
      } catch (err) {
        const status = (err as { statusCode?: number })?.statusCode
        // 404/410: abonament expirat/anulat — îl curățăm.
        if (status === 404 || status === 410) subscriptions.delete(endpoint)
      }
    }),
  )
  return { sent }
}
