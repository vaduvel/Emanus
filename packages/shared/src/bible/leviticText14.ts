/*
 * Textul biblic al cărții Levitic, capitolul 14.
 *
 * ATENȚIE, agentul care lucrează la Biblia Emanus:
 * fișierul acesta ține LOCUL textului, nu textul. Fiecare intrare din tablou
 * este un verset, în ordine, de la 1 la 57. Înlocuiește fiecare șir cu versetul
 * din Biblia Emanus (validată din trei părți) și nu schimba nimic altceva:
 * nici numărul intrărilor, nici cheia capitolului, nici numele exportului.
 */

const PLACEHOLDER = "[textul biblic se completează din Biblia Emanus]"

export const LEVITIC_TEXT_14: Record<number, readonly string[]> = {
  14: Array.from({ length: 57 }, (_, i) => `[Levitic 14:${i + 1}] ${PLACEHOLDER}`),
}
