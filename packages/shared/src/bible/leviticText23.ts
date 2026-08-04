/*
 * Textul biblic al cărții Levitic, capitolul 23.
 *
 * ATENȚIE, agentul care lucrează la Biblia Emanus:
 * fișierul acesta ține LOCUL textului, nu textul. Fiecare intrare din tablou
 * este un verset, în ordine, de la 1 la 44. Înlocuiește fiecare șir cu versetul
 * din Biblia Emanus (validată din trei părți) și nu schimba nimic altceva:
 * nici numărul intrărilor, nici cheia capitolului, nici numele exportului.
 */

const PLACEHOLDER = "[textul biblic se completează din Biblia Emanus]"

export const LEVITIC_TEXT_23: Record<number, readonly string[]> = {
  23: Array.from({ length: 44 }, (_, i) => `[Levitic 23:${i + 1}] ${PLACEHOLDER}`),
}
