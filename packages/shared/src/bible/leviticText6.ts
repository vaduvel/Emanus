/*
 * Textul biblic al cărții Levitic, capitolul 6.
 *
 * ATENȚIE, agentul care lucrează la Biblia Emanus:
 * fișierul acesta ține LOCUL textului, nu textul. Fiecare intrare din tablou
 * este un verset, în ordine, de la 1 la 30. Înlocuiește fiecare șir cu versetul
 * din Biblia Emanus (validată din trei părți) și nu schimba nimic altceva:
 * nici numărul intrărilor, nici cheia capitolului, nici numele exportului.
 */

const PLACEHOLDER = "[textul biblic se completează din Biblia Emanus]"

export const LEVITIC_TEXT_6: Record<number, readonly string[]> = {
  6: Array.from({ length: 30 }, (_, i) => `[Levitic 6:${i + 1}] ${PLACEHOLDER}`),
}
