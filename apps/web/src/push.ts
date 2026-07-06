// Push notifications în client (docs/00-DIRECTIE): opt-in pentru cereri de rugăciune.
// Funcționează doar dacă serverul are VAPID configurat și browserul suportă Push API.
import { getPushPublicKey, subscribePush, unsubscribePush } from "./api"

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/")
  const raw = atob(base64)
  const out = new Uint8Array(raw.length)
  for (let i = 0; i < raw.length; i += 1) out[i] = raw.charCodeAt(i)
  return out
}

export function pushSupported(): boolean {
  return (
    typeof navigator !== "undefined" &&
    "serviceWorker" in navigator &&
    typeof window !== "undefined" &&
    "PushManager" in window &&
    "Notification" in window
  )
}

export async function isPushEnabled(): Promise<boolean> {
  if (!pushSupported()) return false
  try {
    const reg = await navigator.serviceWorker.ready
    const sub = await reg.pushManager.getSubscription()
    return Boolean(sub)
  } catch {
    return false
  }
}

export type EnablePushReason = "unsupported" | "not_configured" | "denied" | "error"
export interface EnablePushResult {
  ok: boolean
  reason?: EnablePushReason
}

export async function enablePush(): Promise<EnablePushResult> {
  if (!pushSupported()) return { ok: false, reason: "unsupported" }
  try {
    const { key, enabled } = await getPushPublicKey()
    if (!enabled || !key) return { ok: false, reason: "not_configured" }
    const permission = await Notification.requestPermission()
    if (permission !== "granted") return { ok: false, reason: "denied" }
    const reg = await navigator.serviceWorker.ready
    const existing = await reg.pushManager.getSubscription()
    const sub =
      existing ??
      (await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(key),
      }))
    await subscribePush(sub.toJSON())
    return { ok: true }
  } catch {
    return { ok: false, reason: "error" }
  }
}

export async function disablePush(): Promise<{ ok: boolean }> {
  if (!pushSupported()) return { ok: false }
  try {
    const reg = await navigator.serviceWorker.ready
    const sub = await reg.pushManager.getSubscription()
    if (sub) {
      await unsubscribePush(sub.endpoint)
      await sub.unsubscribe()
    }
    return { ok: true }
  } catch {
    return { ok: false }
  }
}
