/*
 * Textul biblic al cărții Exod, capitolul 21.
 *
 * ATENȚIE, agentul care lucrează la Biblia Emanus:
 * fișierul acesta ține LOCUL textului, nu textul. Fiecare intrare din tablou
 * este un verset, în ordine, de la 1 la 36. Înlocuiește fiecare șir cu versetul
 * din Biblia Emanus (validată din trei părți) și nu schimba nimic altceva:
 * nici numărul intrărilor, nici cheia capitolului, nici numele exportului.
 */

const PLACEHOLDER = "[textul biblic se completează din Biblia Emanus]"

export const EXOD_TEXT_21: Record<number, readonly string[]> = {
  21: Array.from({ length: 36 }, (_, i) => `[Exod 21:${i + 1}] ${PLACEHOLDER}`),
}
