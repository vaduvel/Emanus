/*
 * Textul biblic al cărții Levitic, capitolul 20.
 *
 * ATENȚIE, agentul care lucrează la Biblia Emanus:
 * fișierul acesta ține LOCUL textului, nu textul. Fiecare intrare din tablou
 * este un verset, în ordine, de la 1 la 27. Înlocuiește fiecare șir cu versetul
 * din Biblia Emanus (validată din trei părți) și nu schimba nimic altceva:
 * nici numărul intrărilor, nici cheia capitolului, nici numele exportului.
 */

const PLACEHOLDER = "[textul biblic se completează din Biblia Emanus]"

export const LEVITIC_TEXT_20: Record<number, readonly string[]> = {
  20: Array.from({ length: 27 }, (_, i) => `[Levitic 20:${i + 1}] ${PLACEHOLDER}`),
}
