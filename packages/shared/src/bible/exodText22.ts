/*
 * Textul biblic al cărții Exod, capitolul 22.
 *
 * ATENȚIE, agentul care lucrează la Biblia Emanus:
 * fișierul acesta ține LOCUL textului, nu textul. Fiecare intrare din tablou
 * este un verset, în ordine, de la 1 la 31. Înlocuiește fiecare șir cu versetul
 * din Biblia Emanus (validată din trei părți) și nu schimba nimic altceva:
 * nici numărul intrărilor, nici cheia capitolului, nici numele exportului.
 */

const PLACEHOLDER = "[textul biblic se completează din Biblia Emanus]"

export const EXOD_TEXT_22: Record<number, readonly string[]> = {
  22: Array.from({ length: 31 }, (_, i) => `[Exod 22:${i + 1}] ${PLACEHOLDER}`),
}
