/*
 * Textul biblic al cărții Levitic, capitolul 10.
 *
 * ATENȚIE, agentul care lucrează la Biblia Emanus:
 * fișierul acesta ține LOCUL textului, nu textul. Fiecare intrare din tablou
 * este un verset, în ordine, de la 1 la 20. Înlocuiește fiecare șir cu versetul
 * din Biblia Emanus (validată din trei părți) și nu schimba nimic altceva:
 * nici numărul intrărilor, nici cheia capitolului, nici numele exportului.
 */

const PLACEHOLDER = "[textul biblic se completează din Biblia Emanus]"

export const LEVITIC_TEXT_10: Record<number, readonly string[]> = {
  10: Array.from({ length: 20 }, (_, i) => `[Levitic 10:${i + 1}] ${PLACEHOLDER}`),
}
