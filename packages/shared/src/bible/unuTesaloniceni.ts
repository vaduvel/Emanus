import type { BibleBook } from "./types.js"
import { teaching, unuTesaloniceniChapter } from "./unuTesaloniceniHelpers.js"
import { UNU_TESALONICENI_2 } from "./unuTesaloniceni2.js"
import { UNU_TESALONICENI_3 } from "./unuTesaloniceni3.js"
import { UNU_TESALONICENI_4 } from "./unuTesaloniceni4.js"
import { UNU_TESALONICENI_5 } from "./unuTesaloniceni5.js"

/*
 * Textul biblic este materializat separat din RCCV.
 * Explicațiile sunt redactate în română pe baza studiilor verse-by-verse
 * ale lui Zac Poonen, fără copiere 1:1. Daniel rămâne reviewerul final.
 */

const UNU_TESALONICENI_1 = unuTesaloniceniChapter({
  number: 1,
  title: "1 Tesaloniceni 1 — Credință vie și așteptarea Fiului",
  summary: "Pavel mulțumește pentru o comunitate în care credința lucrează, dragostea se ostenește, iar nădejdea rabdă. Evanghelia nu a rămas informație, ci a produs întoarcere de la idoli, slujire Dumnezeului viu și așteptarea lui Isus.",
  literaryContext: "Scrisoarea începe cu roadele vizibile ale convertirii tesalonicenilor. Aceste roade pregătesc apărarea slujirii curate a lui Pavel din capitolul 2 și explică de ce biserica a devenit un exemplu în Macedonia și Ahaia.",
  historicalContext: "Biserica se născuse într-un context de opoziție și presiune. Pavel plecase mai devreme decât și-ar fi dorit, iar această scrisoare răspunde grijii sale pentru credincioși tineri care trebuiau să rămână statornici fără prezența lui fizică.",
  units: [
    {
      verses: [1, 3],
      heading: "Har, pace și cele trei roade ale vieții noi",
      teaching: teaching(
        "Pavel, Silvan și Timotei se adresează bisericii ca unei comunități aflate în Dumnezeu Tatăl și în Domnul Isus Hristos. Identitatea lor nu se sprijină pe statut social, vechime sau performanță, ci pe harul care îi așază în Hristos și produce pace.",
        "Poonen subliniază triada practică: credința adevărată lucrează, dragostea adevărată se ostenește, iar nădejdea adevărată rabdă. Credința nu este doar acord intelectual, dragostea nu este doar sentiment, iar nădejdea nu este optimism; fiecare devine vizibilă în alegeri, sacrificiu și perseverență.",
      ),
      crossRefs: ["1 Corinteni 13:13", "Iacov 2:17-18", "Evrei 6:10-12"],
      forYourHeart: "Privește la ultima săptămână: unde a lucrat credința ta, pentru cine s-a ostenit dragostea ta și în ce încercare a răbdat nădejdea ta?",
    },
    {
      verses: [4, 5],
      heading: "Alegerea cunoscută prin puterea Evangheliei",
      teaching: teaching(
        "Pavel nu speculează despre alegerea lui Dumnezeu într-un mod rece. El o recunoaște prin felul în care Evanghelia a venit nu numai prin cuvinte, ci cu putere, cu Duhul Sfânt și cu o convingere adâncă ce a schimbat viața ascultătorilor.",
        "Puterea spirituală nu se măsoară prin volum, spectacol sau presiune emoțională. Mesagerii au trăit între oameni într-un fel care confirma mesajul. Nicio pretinsă ungere nu autorizează manipularea, intimidarea, minciuna sau controlul conștiinței; caracterul și adevărul trebuie să însoțească lucrarea Duhului.",
      ),
      crossRefs: ["1 Corinteni 2:1-5", "2 Corinteni 4:2", "Galateni 5:22-23"],
      forYourHeart: "Caută roada concretă a Evangheliei în caracter, nu doar intensitatea unei experiențe religioase.",
    },
    {
      verses: [6, 8],
      heading: "Cuvântul primit în necaz, cu bucuria Duhului",
      teaching: teaching(
        "Tesalonicenii au devenit imitatori ai apostolilor și ai Domnului deoarece au primit Cuvântul în mijlocul necazului, dar cu bucuria dată de Duhul Sfânt. Imitarea creștină nu înseamnă copierea personalității unui lider, ci urmarea credinței și caracterului care Îl reflectă pe Isus.",
        "Viața lor a devenit un model, iar mesajul Domnului a răsunat dincolo de cetate. Mărturia cea mai puternică nu este publicitatea despre sine, ci o comunitate schimbată care rămâne smerită și credincioasă sub presiune. Necazul pentru Evanghelie nu trebuie confundat cu abuzul pe care un lider sau un membru al familiei îl cere să fie suportat în tăcere; protecția și raportarea răului sunt legitime.",
      ),
      crossRefs: ["Faptele 17:1-9", "1 Corinteni 11:1", "1 Petru 2:19-23"],
      forYourHeart: "Urmează exemplul oamenilor care te conduc spre caracterul lui Hristos, nu spre dependență de persoana lor.",
    },
    {
      verses: [9, 10],
      heading: "Întorși de la idoli ca să slujim și să așteptăm",
      teaching: teaching(
        "Convertirea tesalonicenilor avea două direcții: s-au întors de la idoli și s-au întors spre Dumnezeu ca să-I slujească. Un idol poate fi o imagine religioasă, dar și banii, reputația, confortul, succesul, o relație sau propria voință. Pocăința reală schimbă stăpânul vieții.",
        "Ei Îl așteptau pe Fiul lui Dumnezeu din cer, pe Isus înviat, Cel care ne scapă de mânia viitoare. Așteptarea nu este pasivitate, panică sau calcularea datelor, ci slujire fidelă în prezent. Venirea Domnului produce curăție, perseverență și speranță, nu frică exploatată de predicatori sau teorii care domină viața.",
      ),
      crossRefs: ["Faptele 14:15", "1 Ioan 3:2-3", "Tit 2:11-14"],
      forYourHeart: "Numește un lucru care concurează cu Dumnezeu pentru loialitatea ta și fă un pas concret de întoarcere spre slujirea Lui.",
    },
  ],
  prayer: "Doamne Isuse, fă ca credința mea să lucreze, dragostea mea să se ostenească și nădejdea mea să rabde. Întoarce-mă de la orice idol, păzește-mă de manipulare și ajută-mă să Te slujesc cu bucurie până la venirea Ta. Amin.",
})

export const UNU_TESALONICENI: BibleBook = {
  id: "1-tesaloniceni",
  name: "1 Tesaloniceni",
  testament: "nt",
  order: 52,
  blurb: "O biserică tânără învață să rămână în credință, dragoste și sfințire, așteptând venirea lui Isus cu speranță, trezvie și responsabilitate.",
  chapters: [
    UNU_TESALONICENI_1,
    UNU_TESALONICENI_2,
    UNU_TESALONICENI_3,
    UNU_TESALONICENI_4,
    UNU_TESALONICENI_5,
  ],
}
