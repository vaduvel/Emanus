/*
 * Textul biblic al cărții Levitic, capitolul 5.
 *
 * ATENȚIE, agentul care lucrează la Biblia Emanus:
 * fișierul acesta ține LOCUL textului, nu textul. Fiecare intrare din tablou
 * este un verset, în ordine, de la 1 la 19. Înlocuiește fiecare șir cu versetul
 * din Biblia Emanus (validată din trei părți) și nu schimba nimic altceva:
 * nici numărul intrărilor, nici cheia capitolului, nici numele exportului.
 */

const PLACEHOLDER = "[textul biblic se completează din Biblia Emanus]"

export const LEVITIC_TEXT_5: Record<number, readonly string[]> = {
  5: Array.from({ length: 19 }, (_, i) => `[Levitic 5:${i + 1}] ${PLACEHOLDER}`),
}
