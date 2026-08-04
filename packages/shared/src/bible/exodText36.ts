/*
 * Textul biblic al cărții Exod, capitolul 36.
 *
 * ATENȚIE, agentul care lucrează la Biblia Emanus:
 * fișierul acesta ține LOCUL textului, nu textul. Fiecare intrare din tablou
 * este un verset, în ordine, de la 1 la 38. Înlocuiește fiecare șir cu versetul
 * din Biblia Emanus (validată din trei părți) și nu schimba nimic altceva:
 * nici numărul intrărilor, nici cheia capitolului, nici numele exportului.
 */

const PLACEHOLDER = "[textul biblic se completează din Biblia Emanus]"

export const EXOD_TEXT_36: Record<number, readonly string[]> = {
  36: Array.from({ length: 38 }, (_, i) => `[Exod 36:${i + 1}] ${PLACEHOLDER}`),
}
