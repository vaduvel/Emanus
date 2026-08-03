import { galateniChapter, teaching } from "./galateniHelpers.js"

/*
 * Textul biblic este materializat separat din RCCV.
 * Explicațiile sunt redactate în română pe baza studiilor verse-by-verse
 * ale lui Zac Poonen, fără copiere 1:1. Daniel rămâne reviewerul final.
 */

export const GALATENI_2 = galateniChapter({
  number: 2,
  title: "Galateni 2 — Îndreptățiți prin credință, crucificați cu Hristos",
  summary: "Pavel apără libertatea Evangheliei, recunoaște diversitatea chemărilor și îl confruntă pe Petru când teama de oameni produce ipocrizie. Capitolul culminează cu viața crucificată împreună cu Hristos și trăită prin credință.",
  literaryContext: "Pavel continuă relatarea autobiografică pentru a arăta că mesajul său a fost recunoscut de apostolii din Ierusalim, dar nu depindea de autoritatea lor. Adevărul Evangheliei este criteriul chiar și când un lider respectat greșește.",
  historicalContext: "Masa comună dintre iudei și neamuri era un semn concret al unității în Hristos. Retragerea lui Petru, sub presiunea grupului circumciziei, amenința această unitate și sugera că neamurile erau credincioși de rang inferior.",
  units: [
    {
      verses: [1, 10],
      heading: "Libertatea nu se negociază",
      teaching: teaching(
        "Pavel merge la Ierusalim în ascultare de Dumnezeu și își prezintă lucrarea cu smerenie, fără independență mândră. Totuși, el refuză presiunea ca Tit să fie circumcis, pentru ca adevărul Evangheliei să rămână intact.",
        "Unitatea bisericii nu înseamnă uniformitate de misiune. Iacov, Chifa și Ioan recunosc harul dat lui Pavel și părtășia se exprimă și prin grija față de săraci.",
      ),
      crossRefs: ["Faptele 15:1-29", "1 Corinteni 12:4-6", "2 Corinteni 8:13-15"],
      forYourHeart: "Păstrează libertatea în Hristos fără să disprețuiești părtășia și responsabilitatea.",
    },
    {
      verses: [11, 16],
      heading: "Adevărul mai presus de teama de oameni",
      teaching: teaching(
        "Pavel îl confruntă pe Petru nu pentru o diferență de personalitate, ci fiindcă purtarea lui contrazicea Evanghelia. Teama de opinia unui grup l-a făcut să separe ceea ce Hristos unise.",
        "Îndreptățirea nu vine prin respectabilitate religioasă, origine sau faptele Legii, ci prin credința în Isus Hristos. Aceasta nu autorizează umilirea publică, controlul sau atacul personal; corectarea biblică urmărește adevărul și restaurarea, nu dominația.",
      ),
      crossRefs: ["Proverbe 29:25", "Faptele 10:34-35", "Romani 3:21-28"],
      forYourHeart: "Nu lăsa frica de oameni să te facă să tratezi pe cineva ca inferior în Hristos.",
    },
    {
      verses: [17, 21],
      heading: "Hristos trăiește în mine",
      teaching: teaching(
        "A fi eliberat de Lege nu înseamnă a reconstrui o viață de păcat. Pavel a murit față de sistemul prin care încerca să se justifice și trăiește acum pentru Dumnezeu.",
        "«Am fost răstignit împreună cu Hristos» unește partea negativă și cea pozitivă: eul nu mai conduce, iar Hristos locuiește și lucrează în credincios. Harul nu este anulat, iar crucea nu devine inutilă.",
      ),
      crossRefs: ["Romani 6:1-14", "2 Corinteni 5:14-17", "Filipeni 3:7-10"],
      forYourHeart: "Predă-I lui Hristos dreptul de a conduce alegerile, reacțiile și ambițiile tale.",
    },
  ],
  prayer: "Tată, păzește libertatea Evangheliei în mine. Eliberează-mă de teama de oameni, de ipocrizie și de orice încercare de a mă justifica singur. Fă ca Hristos să trăiască în mine. Amin.",
})
