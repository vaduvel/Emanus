// Compatibilitate pentru API-ul vechi de dezvoltare.
//
// Noul produs Emanus nu folosește categorii identitare, diagnostic, XP, nivel,
// streak, radar, comunitate, familie sau mentorat. Aceste exporturi rămân într-un
// entrypoint separat până când API-ul vechi este retras complet. Codul web nou
// nu trebuie să importe niciodată din `@emanus/shared/legacy`.

export * from "./domain.js"
export * from "./categoryConfig.js"
export * from "./seed.js"
export * from "./daily.js"
export * from "./gamification.js"
export * from "./diagnostic.js"
export * from "./recommendation.js"
export * from "./moderation.js"
export * from "./community.js"
export * from "./prayer.js"
export * from "./family.js"
export * from "./growthProfile.js"
export * from "./mentor.js"
export * from "./mentorship.js"
