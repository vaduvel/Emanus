/*
 * Textul biblic al cărții Levitic, capitolul 15.
 *
 * ATENȚIE, agentul care lucrează la Biblia Emanus:
 * fișierul acesta ține LOCUL textului, nu textul. Fiecare intrare din tablou
 * este un verset, în ordine, de la 1 la 33. Înlocuiește fiecare șir cu versetul
 * din Biblia Emanus (validată din trei părți) și nu schimba nimic altceva:
 * nici numărul intrărilor, nici cheia capitolului, nici numele exportului.
 */

const PLACEHOLDER = "[textul biblic se completează din Biblia Emanus]"

export const LEVITIC_TEXT_15: Record<number, readonly string[]> = {
  15: Array.from({ length: 33 }, (_, i) => `[Levitic 15:${i + 1}] ${PLACEHOLDER}`),
}
