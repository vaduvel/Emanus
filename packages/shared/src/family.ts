// Legământul familiei (docs/00-DIRECTIE §6): o temă comună + un zid de rugăciune al familiei.

export interface FamilyThemeOption {
  id: string
  title: string
  verseText: string
  verseRef: string
  focus: string
}

export const FAMILY_THEMES: FamilyThemeOption[] = [
  {
    id: "recunostinta",
    title: "Recunoștință",
    verseText: "Mulțumiți totdeauna lui Dumnezeu Tatăl pentru toate.",
    verseRef: "Efeseni 5:20",
    focus: "În fiecare seară spunem un lucru pentru care mulțumim.",
  },
  {
    id: "iertare",
    title: "Iertare",
    verseText: "Îngăduiți-vă unii pe alții și iertați-vă.",
    verseRef: "Coloseni 3:13",
    focus: "Nu lăsăm soarele să apună peste supărarea noastră.",
  },
  {
    id: "slujire",
    title: "Slujire",
    verseText: "Prin dragoste slujiți-vă unii altora.",
    verseRef: "Galateni 5:13",
    focus: "Facem săptămânal un gest de ajutor, fără să ni se ceară.",
  },
  {
    id: "credinta",
    title: "Credință",
    verseText: "Eu și casa mea vom sluji Domnului.",
    verseRef: "Iosua 24:15",
    focus: "Avem un timp scurt de rugăciune împreună.",
  },
  {
    id: "blandete",
    title: "Blândețe",
    verseText: "Un răspuns blând potolește mânia.",
    verseRef: "Proverbe 15:1",
    focus: "Vorbim unii cu alții cu respect, chiar când nu suntem de acord.",
  },
]

export function getFamilyTheme(id: string): FamilyThemeOption | undefined {
  return FAMILY_THEMES.find((t) => t.id === id)
}

export interface FamilyMember {
  name: string
  avatar: string
}

export interface FamilyPrayer {
  id: string
  author: string
  text: string
  createdAt: string
  answered: boolean
  answeredAt?: string
}

export interface Family {
  id: string
  name: string
  themeId: string
  covenant: string
  members: FamilyMember[]
  createdAt: string
}

export interface FamilyView {
  family: Family | null
  theme: FamilyThemeOption | null
  prayers: FamilyPrayer[]
}
