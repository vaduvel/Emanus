const VBV = "https://www.cfcindia.com/verse-by-verse/Revelation"
const FINAL = "https://romanian.cfcindia.com/ro/books/the-final-triumph"

const vbv = [
  ["01","1:1–1:18"],["02","1:19–2:29"],["03","2:20–3:22"],["04","4:1–5:14"],
  ["05","6:1–6:17"],["06","7:1–7:10"],["07","7:9–10:7"],["08","10:7–11:15"],
  ["09","11:16–12:17"],["10","13:1–13:13"],["11","13:14–14:12"],["12","14:13–16:18"],
  ["13","16:16–18:20"],["14","18:21–20:6"],["15","20:4–21:27"],["16","21:22–22:21"],
].map(([n, range]) => ({
  id: `ev-vbv-rev-${n}`,
  sourceId: "vbv-revelation",
  sourceUrl: VBV,
  sourceTitle: "Verse By Verse - Revelation",
  locator: `${n}.Revelation Chapter ${range.replace("–", " to Chapter ")}`,
  evidenceKind: "official-source-coverage",
  verificationLevel: "source-locator-reviewed",
  claimSummary: `Studiul oficial CFC ${n} fixează acoperirea Verse By Verse pentru Apocalipsa ${range}.`,
}))

const chapterThemes = {
  1:"descoperirea dată robilor; Ioan ca frate și părtaș la necaz; Hristos în mijlocul sfeșnicelor",
  2:"Efes, Smirna, Pergam și începutul Tiatirei; Domnul judecă bisericile și caută biruitori",
  3:"Tiatira, Sardes, Filadelfia și Laodiceea; avertisment împotriva compromisului și căldicelii",
  4:"tronul lui Dumnezeu; profeția trebuie primită pentru ascultare, nu curiozitate; închinarea cere lepădarea propriei voințe",
  5:"sulul, Leul care este Miel și vrednicia lui Isus de a deschide planul lui Dumnezeu",
  6:"primele șase peceți, necazurile de pe pământ și persecuția sfinților înaintea mâniei lui Dumnezeu",
  7:"cei 144.000 din Israel și mulțimea din toate neamurile; biserica trece prin marele necaz și este luată înaintea mâniei",
  8:"pecetea a șaptea și începutul judecăților trimise din cer; rugăciunile sfinților înaintea lui Dumnezeu",
  9:"trâmbițele, puterile demonice și împietrirea oamenilor care nu se pocăiesc",
  10:"cărticica deschisă, limitele revelației și chemarea de a primi Cuvântul înainte de a-l proclama",
  11:"cei doi martori, mărturia în persecuție și trâmbița a șaptea care proclamă domnia lui Hristos",
  12:"femeia, copilul, balaurul și războiul ceresc; biruința prin sângele Mielului, mărturie și lepădarea iubirii de viața proprie",
  13:"fiara ca Antihrist și profetul fals; putere mondială, înșelare, închinare și semnul fiarei",
  14:"Mielul și biruitorii de pe Sion; fidelitate fără compromis, avertisment împotriva fiarei și secerișul final",
  15:"biruitorii și pregătirea ultimelor potire ale mâniei lui Dumnezeu",
  16:"cele șapte potire, împietrirea oamenilor, Armaghedonul și încheierea judecăților mâniei",
  17:"Babilonul ca sistem religios desfrânat, unit cu puterea lumii și opus Miresei lui Hristos",
  18:"Babilonul ca sistem comercial și lumesc; chemarea poporului lui Dumnezeu să iasă din el",
  19:"bucuria pentru judecata Babilonului, nunta Mielului și revenirea lui Hristos ca Rege biruitor",
  20:"legarea lui Satan, domnia de o mie de ani cu Hristos, răzvrătirea finală și judecata tronului alb",
  21:"cerul și pământul nou, Mireasa ca Noul Ierusalim și gloria lui Dumnezeu în cetate",
  22:"râul vieții, slujirea robilor lui Dumnezeu, apropierea venirii lui Isus și chemarea finală la fidelitate",
}

const chapters = Object.entries(chapterThemes).map(([chapter, theme]) => ({
  id: `ev-final-triumph-rev-${String(chapter).padStart(2,"0")}`,
  sourceId: "final-triumph",
  sourceUrl: FINAL,
  sourceTitle: "Triumful Final",
  locator: `Capitol ${chapter}`,
  evidenceKind: "official-written-chapter-locator",
  verificationLevel: "source-locator-reviewed",
  claimSummary: `Comentariul oficial Poonen pentru Apocalipsa ${chapter} dezvoltă: ${theme}.`,
}))

const themes = [{
  id: "ev-ttb-revelation-themes",
  sourceId: "ttb-revelation",
  sourceUrl: "https://www.cfcindia.com/books/through-the-bible",
  officialSeriesUrl: "https://www.cfcindia.com/bible",
  sourceTitle: "Through The Bible - Revelation",
  locator: "Table of Contents — Final Triumph; bondslaves; seven churches; Lion is a Lamb; woman and dragon; two beasts; Babylon; thousand-year reign; New Jerusalem",
  evidenceKind: "official-written-theme-locator",
  verificationLevel: "source-locator-reviewed",
  claimSummary: "Cuprinsul oficial Through The Bible fixează axele Poonen pentru Apocalipsa: biruitorii, necazul, cele două fiare, Babilonul, revenirea lui Hristos, mia de ani și Mireasa/Noul Ierusalim.",
}]

export const NT_SOURCE_EVIDENCE_WAVE_D = [...vbv, ...chapters, ...themes]
