/*
 * Textul biblic al cărții Exod, capitolul 9.
 *
 * ATENȚIE, agentul care lucrează la Biblia Emanus:
 * fișierul acesta ține LOCUL textului, nu textul. Fiecare intrare din tablou
 * este un verset, în ordine, de la 1 la 35. Înlocuiește fiecare șir cu versetul
 * din Biblia Emanus (validată din trei părți) și nu schimba nimic altceva:
 * nici numărul intrărilor, nici cheia capitolului, nici numele exportului.
 * Explicația din exod9.ts citește versetele prin exodPassage(9, from, to) și
 * se sprijină pe faptul că sunt exact 35.
 */

const PLACEHOLDER = "[textul biblic se completează din Biblia Emanus]"

export const EXOD_TEXT_9: Record<number, readonly string[]> = {
  9: Array.from({ length: 35 }, (_, i) => `[Exod 9:${i + 1}] ${PLACEHOLDER}`),
}
