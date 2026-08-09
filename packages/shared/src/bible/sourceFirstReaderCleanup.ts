const SOURCE_EXTERNAL_SENTENCE_PATTERNS: RegExp[] = [
  // Meta despre procesul editorial / produs — nu aparține explicației biblice.
  /\bEmanus\b/iu,
  /\boverlay(?:-ul)?\b/iu,
  /\b(?:meta|editorial)(?:ă|e|i)?\b/iu,
  /\btranscript(?:ul|ului|e)?\b.{0,80}\b(?:nu dezvoltă|nu intră|nu oferă|nu spune)\b/iu,

  // Balansări moderne introduse de noi peste sursă.
  /\b(?:violenț(?:ă|ei)|război(?:ul)? religios|ostilitat(?:e|ea) etnică|eliminarea adversarilor).{0,120}\bmodern(?:ă|e|i)?\b/iu,
  /\bmodern(?:ă|e|i)?\b.{0,120}\b(?:violenț(?:ă|ei)|război(?:ul)? religios|ostilitat(?:e|ea) etnică|eliminarea adversarilor)\b/iu,
  /\b(?:rasism|segregare etnică)\b/iu,
  /\b(?:abuziv(?:ă|e)?|abuzului)\b.{0,100}\b(?:relați|căsători|violen)\b/iu,
  /\b(?:relați|căsători)\w*\b.{0,100}\b(?:abuziv(?:ă|e)?|abuzului)\b/iu,

  // Disclaimer-e editoriale recognoscibile prin universalizări artificiale.
  /\bnu (?:este|devine|constituie|oferă) (?:o|un) (?:promisiune|formulă|contract|scală|schemă|indicator|mandat|model|metodă|regulă)\b/iu,
  /\bnu (?:înseamnă|spune|garantează|promite) că (?:orice|fiecare|toți|toate)\b/iu,
  /\bnu trebuie (?:transformat(?:ă)?|folosit(?:ă)?|citit(?:ă)?|convertit(?:ă)?)\b.{0,120}\b(?:formulă|teorie|model|mandat|violen|răzbunare|diagnostic|numerolog|succes|prosperitate)\w*/iu,
  /\bnu (?:se )?transfer(?:ă|ăm) automat\b/iu,
  /\bnu autorizează\b/iu,
  /\bnu justifică\b/iu,
  /\bnu idealizează\b/iu,
  /\bnu sfințește orice\b/iu,
  /\bnu transformă automat\b/iu,
  /\bnu trebuie diagnosticat(?:ă)?\b/iu,
  /\bnu este (?:un|o) (?:raport medical modern|bază numerologică|hartă geopolitică modernă|schemă de investiție)\b/iu,
  /\bnu este o garanție (?:automată|universală)\b/iu,
  /\bnu este o regulă pentru toți\b/iu,
  /\bnu este un ideal conjugal\b/iu,
  /\bnu este un tratat despre mântuirea veșnică\b/iu,
  /\bnu este o doctrină despre inferioritatea femeii\b/iu,
  /\bnu spune că orice prieten necredincios\b/iu,
  /\bnu înseamnă că fiecare faptă rea\b/iu,
  /\bnu înseamnă că fiecare copil mort\b/iu,
  /\bnu înseamnă că toate formele\b/iu,
  /\bnu înseamnă că orice afirmație profetică\b/iu,
  /\bnu înseamnă că orice calamitate\b/iu,
  /\bnu înseamnă că orice eșec politic\b/iu,

  // Relativizări pe care userul le-a exclus expres din materialul Poonen.
  /\b(?:tradițiile|modelele|creștinii)\b.{0,100}\b(?:interpretează|interpretări|lecturi)\b.{0,100}\b(?:diferit|diferite)\b/iu,
  /\bmai multe (?:interpretări|lecturi|modele)\b/iu,
  /\bpoate fi interpretat(?:ă)? diferit\b/iu,
  /\b(?:doar|numai) o (?:posibilă )?(?:lectură|interpretare)\b/iu,
]

function isSourceExternalSentence(sentence: string): boolean {
  return SOURCE_EXTERNAL_SENTENCE_PATTERNS.some((pattern) => pattern.test(sentence))
}

/**
 * Curățare exclusiv pentru unități cu provenance Poonen.
 *
 * Nu reformulează doctrina. Elimină numai propoziții/clauze editoriale care au
 * fost introduse ulterior pentru balansare, relativizare sau meta-explicații.
 * Dacă o propoziție este mixtă, încearcă mai întâi să păstreze clauzele care nu
 * poartă semnalul editorial. Gate-ul ultra-final verifică apoi că reader-ul a
 * păstrat suficient din materialul-sursă.
 */
export function sourceFirstPoonenReaderText(value: string): string {
  const sentences = value
    .split(/(?<=[.!?])\s+/u)
    .map((part) => part.trim())
    .filter(Boolean)

  const kept: string[] = []
  for (const sentence of sentences) {
    if (!isSourceExternalSentence(sentence)) {
      kept.push(sentence)
      continue
    }

    const clauses = sentence
      .split(/;\s+|\s+[—–-]\s+/u)
      .map((part) => part.trim())
      .filter(Boolean)
    const cleanClauses = clauses.filter((clause) => !isSourceExternalSentence(clause))
    if (cleanClauses.length > 0 && cleanClauses.length < clauses.length) {
      const clean = cleanClauses.join("; ").replace(/[,:;]\s*$/u, "").trim()
      if (clean.length >= 25) kept.push(/[.!?]$/u.test(clean) ? clean : `${clean}.`)
    }
  }

  // Un filtru generic nu are voie să golească o explicație. Dacă se întâmplă,
  // păstrăm materialul pentru ca auditul să eșueze explicit și să ceară review manual.
  return kept.length ? kept.join(" ").replace(/\s+/gu, " ").trim() : value.trim()
}
