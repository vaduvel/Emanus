/*
 * Textul biblic al cărții Levitic, capitolul 9.
 *
 * ATENȚIE, agentul care lucrează la Biblia Emanus:
 * fișierul acesta ține LOCUL textului, nu textul. Fiecare intrare din tablou
 * este un verset, în ordine, de la 1 la 24. Înlocuiește fiecare șir cu versetul
 * din Biblia Emanus (validată din trei părți) și nu schimba nimic altceva:
 * nici numărul intrărilor, nici cheia capitolului, nici numele exportului.
 */

const PLACEHOLDER = "[textul biblic se completează din Biblia Emanus]"

export const LEVITIC_TEXT_9: Record<number, readonly string[]> = {
  9: Array.from({ length: 24 }, (_, i) => `[Levitic 9:${i + 1}] ${PLACEHOLDER}`),
}
