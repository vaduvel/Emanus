import type { BibleBook } from "./types.js"
import { lucaChapter, teaching } from "./lucaHelpers.js"

/*
 * Textul biblic este materializat separat din RCCV, cu sursa si hash-ul
 * declarate in docs/data/luca-rccv-import.json.
 * Explicatiile redau in romana, prin reformulare editoriala, firul studiilor
 * verse-by-verse ale lui Zac Poonen. Daniel ramane reviewerul uman final.
 */

const LUCA_1 = lucaChapter({
  number: 1,
  title: "Luca 1 — Niciun cuvânt de la Dumnezeu nu este lipsit de putere",
  summary:
    "Luca își începe relatarea cercetată cu nașterile făgăduite ale lui Ioan și Isus. Capitolul pune în lumină lucrarea Duhului Sfânt, credința smerită a Mariei și venirea unei mântuiri prin care oamenii Îi pot sluji lui Dumnezeu fără frica pedepsei.",
  literaryContext:
    "Luca scrie o relatare ordonată pentru Teofil și urmărește venirea Domnului Isus de la zămislire până la înviere. Primul capitol pregătește întreaga Evanghelie prin două vestiri, două răspunsuri și mai multe mărturii date sub lucrarea Duhului Sfânt.",
  historicalContext:
    "Zaharia slujea ca preot în templu, iar lipsa copiilor era o durere profundă în societatea vremii. Maria era o tânără logodită din Nazaret; acceptarea chemării lui Dumnezeu putea aduce neînțelegere și rușine publică. Cântările capitolului folosesc limbajul făgăduințelor făcute lui Avraam și lui David.",
  units: [
    {
      verses: [1, 4],
      heading: "O relatare cercetată cu grijă",
      teaching: teaching(
        "Luca nu prezintă credința ca pe o poveste vagă. El spune că a cercetat lucrurile cu grijă și le așază într-o ordine care să-i dea lui Teofil certitudine. Credința creștină este legată de venirea reală, viața reală, moartea și învierea reală ale Domnului Isus.",
        "Poonen observă că Luca urmărește în mod special umanitatea Domnului și împlinirea scopului lui Dumnezeu într-o viață omenească. Evanghelia nu ne cheamă doar să admirăm o doctrină, ci să vedem cum a trăit Isus ca Om și să-L urmăm.",
      ),
      crossRefs: ["Fapte 1:1-3", "Ioan 20:30-31", "1 Ioan 1:1-3"],
      forYourHeart:
        "Credința ta nu trebuie să se sprijine pe zvonuri sau emoții trecătoare. Întoarce-te la mărturia cercetată despre Isus și lasă adevărul să-ți dea stabilitate.",
    },
    {
      verses: [5, 25],
      heading: "Ioan va fi umplut de Duhul Sfânt",
      teaching: teaching(
        "Zaharia și Elisabeta erau drepți înaintea lui Dumnezeu, dar purtau o durere veche. Faptul că o rugăciune nu fusese încă împlinită nu însemna că Dumnezeu îi uitase. La vremea Lui, răspunsul avea să slujească unui plan mai mare decât dorința lor personală.",
        "Îngerul spune că Ioan va fi umplut de Duhul Sfânt încă din pântecele mamei. Poonen folosește această imagine pentru a arăta că plinătatea Duhului este lucrarea lui Dumnezeu, nu o stare emoțională produsă de om. Dovada ei nu este senzația, ci puterea pentru o viață și o slujire care Îl înalță pe Dumnezeu.",
        "Zaharia cere un semn deși avea înainte exemplul lui Avraam și Sara. Responsabilitatea crește odată cu lumina primită: celui care a cunoscut mult din Scriptură i se cere să răspundă cu o credință mai matură.",
      ),
      crossRefs: ["Geneza 18:9-14", "Luca 3:15-17", "Fapte 1:8", "Efeseni 5:18"],
      forYourHeart:
        "Nu confunda întârzierea cu uitarea. Dumnezeu poate folosi chiar anii tăcerii ca să pregătească un răspuns care Îi slujește planului.",
    },
    {
      verses: [26, 38],
      heading: "Fie-mi după cuvântul tău",
      teaching: teaching(
        "Maria întreabă cum se va împlini făgăduința fiindcă nu exista niciun precedent omenesc pentru o naștere din fecioară. Întrebarea ei caută lumină; nu refuză cuvântul. Dumnezeu nu tratează la fel neștiința sinceră și necredința care respinge lumina deja primită.",
        "Duhul Sfânt avea să vină peste ea, iar puterea Celui Preaînalt avea să lucreze. Poonen leagă această imagine de scopul lucrării Duhului în credincios: nu spectacolul, ci formarea caracterului lui Hristos în noi. Așa cum trupul copilului a crescut în timp, asemănarea cu Isus se formează printr-o lucrare continuă.",
        "Maria răspunde ca o roabă a Domnului, deși ascultarea putea aduce bârfă, neînțelegere și pierderea reputației. Poonen subliniază că zidirea trupului lui Hristos este legată de disponibilitatea de a purta ocara, nu de căutarea onoarei omenești.",
        "Afirmația îngerului poate fi redată și astfel: niciun cuvânt rostit de Dumnezeu nu este lipsit de putere. Maria nu se sprijină pe posibilitățile ei, ci pe puterea Cuvântului și se predă lui Dumnezeu.",
      ),
      words: [
        {
          original: "ῥῆμα",
          transliteration: "rhema",
          language: "greaca",
          meaning:
            "cuvânt rostit. În context, făgăduința lui Dumnezeu nu este goală, ci poartă puterea necesară împlinirii ei.",
        },
      ],
      crossRefs: ["Romani 6:14", "Fapte 1:8", "Galateni 4:19", "Evrei 13:12-13"],
      forYourHeart:
        "Ascultarea poate costa reputație și confort. Poți totuși să spui: «Sunt al Domnului; fie-mi după cuvântul Tău», fiindcă puterea împlinirii vine de la El.",
    },
    {
      verses: [39, 56],
      heading: "Sufletul meu mărește pe Domnul",
      teaching: teaching(
        "Elisabeta este umplută de Duhul Sfânt și recunoaște lucrarea lui Dumnezeu în Maria. Capitolul repetă această temă: viața Noului Legământ nu poate fi trăită prin puterea firii, ci prin Duhul care deschide ochii și Îl mărește pe Hristos.",
        "Maria nu se așază în centru. Cântarea ei Îl mărește pe Domnul, vorbește despre smerenia ei și despre mila Lui. Harul primit nu o face să caute rang, ci adâncește închinarea.",
        "Dumnezeu răstoarnă evaluările lumii: mândria este risipită, cei puternici sunt coborâți, cei smeriți sunt înălțați, iar cei flămânzi sunt săturați. Împărăția nu este construită prin ambiție religioasă, ci prin oameni care știu că totul vine din mila lui Dumnezeu.",
      ),
      crossRefs: ["1 Samuel 2:1-10", "Iacov 4:6", "1 Corinteni 1:26-31"],
      forYourHeart:
        "Când Dumnezeu face ceva prin tine, nu transforma darul într-un titlu. Mărește-L pe El și rămâi mic în ochii tăi.",
    },
    {
      verses: [57, 66],
      heading: "Mâna Domnului era cu el",
      teaching: teaching(
        "Nașterea lui Ioan stârnește bucurie, dar numele copilului nu este ales după tradiția familiei. Elisabeta și Zaharia ascultă de cuvântul primit. Credința adevărată este gata să rupă o tradiție atunci când porunca lui Dumnezeu este limpede.",
        "Când Zaharia confirmă numele, glasul îi este redat și primul lui răspuns este lauda. Disciplina lui Dumnezeu nu urmărea distrugerea, ci vindecarea necredinței și pregătirea unei mărturii curate.",
        "Oamenii întreabă ce va fi copilul, fiindcă mâna Domnului era cu el. Valoarea vieții nu va veni din numele familiei, din poziție sau din popularitate, ci din prezența lui Dumnezeu.",
      ),
      crossRefs: ["Isaia 49:1", "Fapte 5:29", "Evrei 12:10-11"],
      forYourHeart:
        "Nu lăsa tradiția să aibă ultimul cuvânt atunci când Dumnezeu a vorbit clar. Ascultarea poate deschide din nou un glas care fusese închis de necredință.",
    },
    {
      verses: [67, 80],
      heading: "Să-I slujim fără frică",
      teaching: teaching(
        "Zaharia este umplut de Duhul Sfânt și vede în venirea lui Mesia eliberarea poporului. Poonen arată că dușmanii cei mai adânci nu sunt oamenii din jur, ci păcatele care ne țin robi. Isus vine să ne izbăvească pentru o viață de sfințenie și dreptate.",
        "Profeția spune că Îi putem sluji lui Dumnezeu fără frică. Sub Noul Legământ, ascultarea nu este întreținută de groaza pedepsei, ci de dragostea unui om răscumpărat. Isus repetă adesea «nu te teme» fiindcă Își conduce poporul spre încredere în Tatăl.",
        "Ioan crește și rămâne în pustiu până la vremea arătării sale. Anii ascunși nu sunt ani pierduți. Dumnezeu pregătește în taină omul înainte să-i încredințeze o lucrare publică.",
      ),
      crossRefs: ["Matei 1:21", "Romani 6:17-22", "1 Ioan 4:18", "Galateni 1:15-17"],
      forYourHeart:
        "Dumnezeu nu te eliberează doar de vină, ci și pentru a-I sluji. Vino la El din dragoste, nu ca un rob care trăiește mereu sub amenințare.",
    },
  ],
  prayer:
    "Doamne, fă-mă disponibil ca Maria și credincios Cuvântului Tău. Umple-mă cu Duhul Sfânt ca să se formeze caracterul lui Isus în mine. Izbăvește-mă de păcat și învață-mă să-Ți slujesc din dragoste, fără frica osândei. Amin.",
})

export const LUCA: BibleBook = {
  id: "luca",
  name: "Luca",
  testament: "nt",
  order: 42,
  blurb:
    "Relatarea cercetată despre Domnul Isus ca Om desăvârșit, plin de Duhul Sfânt, venit să caute și să mântuiască ce era pierdut.",
  chapters: [LUCA_1],
}
