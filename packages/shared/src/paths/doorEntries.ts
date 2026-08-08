export interface DoorEntrySelection {
  lessonId: string
  stepId: string
  optionId: string
}

/*
 * INTRAREA CONTEXTUALĂ. (documentul de rutare, pasul 3 din "ușă → siguranță →
 * intrare contextuală → parcurs pastoral")
 *
 * Ușa e deja o propoziție aleasă de om. Dacă a apasat "Am pierdut pe cineva",
 * playerul nu are voie să-l întrebe în primul pas ce l-a adus aici — tocmai i-a
 * spus. Harta de mai jos preselectează opțiunea potrivită în pasul de ramificare
 * al primei lecții, ca omul să primească direct ramura lui.
 *
 * PROVENIENȚĂ ȘI DE CE NU E ÎNTREAGĂ: pe `codex/nolan-short-courses` există un
 * `doorEntries.ts` (blob 46f93aa3) care mapează toate cele 31 de uși. NU a fost
 * adus întreg, intenționat. Harta de acolo a fost scrisă pentru rutarea de
 * dinaintea reparațiilor D1 și D2, iar o parte din ea trimite acum în gol:
 *   - `anxietate` și `tristete` trimit la `schimbare_l1`, deși au trecut în
 *     camera 8 (`path_greutate`);
 *   - `pornografie` trimite tot la `schimbare_l1`, deși ușa stă în camera 1;
 *   - `indoiala`, `biblia_inventata` și `alte_credinte` trimit la `doctrina_l1`,
 *     deși camera 3 are acum lecțiile ei în `temelieA/B/C`;
 *   - `nu_inteleg` și `cum_citesc` trimit la `aproape_l1`, iar primul a trecut
 *     între timp în camera 3;
 *   - `divort` trimite la `neiertare_o1`, deși are drum propriu.
 *
 * REGULA: nu se adaugă o intrare aici fără să fie deschis fișierul lecției și
 * verificate `stepId` și `optionId` pe litere. O trimitere moartă e mai rea
 * decât lipsa ei: omul cade într-un pas care nu există, exact ca la
 * `unlocksModuleId: "teens_m2_emotional_peace"` din `seed.ts`. Când ușa nu are
 * intrare, playerul pune întrebarea normal — e mai puțin elegant, dar funcționează.
 *
 * CE E VERIFICAT AICI: cele trei uși mutate pe `path_suferinta`. Pasul
 * `sf1_focus` și opțiunile `sf1_loss`, `sf1_illness`, `sf1_why` sunt în
 * `suferintaA.ts`, lecția 1, și au fiecare ramura ei (`sf1_branch_loss`,
 * `sf1_branch_illness`, `sf1_branch_why`).
 */
export const DOOR_ENTRY_OPTIONS: Record<string, DoorEntrySelection> = {
  doliu: { lessonId: "suferinta_l1", stepId: "sf1_focus", optionId: "sf1_loss" },
  boala: { lessonId: "suferinta_l1", stepId: "sf1_focus", optionId: "sf1_illness" },
  de_ce_permis: { lessonId: "suferinta_l1", stepId: "sf1_focus", optionId: "sf1_why" },
}

/** Intrarea contextuală a ușii, dacă există una verificată. */
export function getDoorEntry(
  doorId: string | null | undefined,
): DoorEntrySelection | undefined {
  if (!doorId) return undefined
  return DOOR_ENTRY_OPTIONS[doorId]
}
