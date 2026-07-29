import { currentPath, load } from "./journey"

/*
 * Notificarea. (docs/18)
 *
 * REGULI, în ordinea importanței:
 *  1. Maximum UNA pe zi. Niciodată două.
 *  2. Nu spune „ai pierdut seria”, „nu uita”, „revino”. Nu șantajăm pe nimeni
 *     cu vinovăție ca să deschidă o aplicație despre har.
 *  3. Conține ce urmează, pe nume — titlul lecției de mâine — nu „Emanus te așteaptă”.
 *  4. Se cere voie o singură dată. Dacă omul refuză, nu mai întrebăm niciodată.
 *
 * Deocamdată e local (Notification API), fără server: e programată când aplicația
 * e deschisă și se declanșează la ora aleasă dacă fila mai trăiește, altfel la
 * prima redeschidere din ziua următoare. Când apare serverul cu VAPID (push.ts),
 * se înlocuiește doar `fire()`, restul rămâne.
 */

const K_ASKED = "emanus_reminder_asked"
const K_ON = "emanus_reminder_on"
const K_LAST = "emanus_reminder_last"

/** Ora la care se trimite, local. Dimineața devreme, nu noaptea. */
export const REMINDER_HOUR = 8

export function reminderSupported(): boolean {
  return typeof window !== "undefined" && "Notification" in window
}

export function reminderAsked(): boolean {
  return localStorage.getItem(K_ASKED) === "1"
}

export function reminderOn(): boolean {
  return localStorage.getItem(K_ON) === "1"
}

/** Se afișează propunerea doar după prima lecție și doar o dată în viață. */
export function shouldOfferReminder(): boolean {
  if (!reminderSupported() || reminderAsked()) return false
  return load().lessonsDone >= 1
}

export function declineReminder(): void {
  localStorage.setItem(K_ASKED, "1")
  localStorage.setItem(K_ON, "0")
}

export async function enableReminder(): Promise<boolean> {
  localStorage.setItem(K_ASKED, "1")
  if (!reminderSupported()) return false
  try {
    const perm = await Notification.requestPermission()
    const ok = perm === "granted"
    localStorage.setItem(K_ON, ok ? "1" : "0")
    if (ok) scheduleNext()
    return ok
  } catch {
    localStorage.setItem(K_ON, "0")
    return false
  }
}

/** Textul de mâine: titlul lecției care urmează, sau pasul de pus în practică. */
export function tomorrowText(): { title: string; body: string } | null {
  const s = load()
  const path = currentPath()
  if (!path) return null
  const lesson = path.lessons[s.lessonsDone]
  if (lesson) {
    return {
      title: lesson.title,
      body: `${lesson.estMinutes} minute. Un singur lucru azi.`,
    }
  }
  const practice = path.practices[s.lessonsDone - 1]
  if (practice) return { title: "Ziua dintre", body: practice }
  return null
}

function todayKey(): string {
  return new Date().toISOString().slice(0, 10)
}

function fire(): void {
  if (!reminderOn() || Notification.permission !== "granted") return
  if (localStorage.getItem(K_LAST) === todayKey()) return // maximum una pe zi
  const t = tomorrowText()
  if (!t) return
  localStorage.setItem(K_LAST, todayKey())
  try {
    new Notification(t.title, { body: t.body, tag: "emanus-zi", icon: "/icon-192.png" })
  } catch {
    /* browserul poate refuza în afara unui gest de utilizator; nu insistăm */
  }
}

let timer: number | undefined

/** Programează următoarea notificare la REMINDER_HOUR. Idempotentă. */
export function scheduleNext(): void {
  if (!reminderOn() || typeof window === "undefined") return
  if (timer) window.clearTimeout(timer)

  const now = new Date()
  const next = new Date(now)
  next.setHours(REMINDER_HOUR, 0, 0, 0)
  if (next.getTime() <= now.getTime()) next.setDate(next.getDate() + 1)

  const delay = Math.min(next.getTime() - now.getTime(), 2_147_000_000)
  timer = window.setTimeout(() => {
    fire()
    scheduleNext()
  }, delay)
}

/**
 * De apelat o dată la pornirea aplicației.
 * Dacă ora a trecut deja azi și n-am trimis nimic, trimitem acum — o singură dată.
 */
export function initReminder(): void {
  if (!reminderOn()) return
  const h = new Date().getHours()
  if (h >= REMINDER_HOUR && localStorage.getItem(K_LAST) !== todayKey()) fire()
  scheduleNext()
}
