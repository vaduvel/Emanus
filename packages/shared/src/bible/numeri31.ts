import { numeriChapter, teaching } from "./numeriHelpers.js"
import { numeriPassage } from "./numeriText.js"
import { NUMERI_STATUSES } from "./numeriPublication.js"

/*
 * Numeri 31 este unul dintre pasajele cele mai grele din Pentateuh.
 * Textul biblic rămâne separat în numeriText.ts; aici corectăm doar explicația.
 */

const TEXTUAL_SOURCE =
  "Emanus canonical exegesis — Numeri 31 + biblical cross-references"
const POONEN_BALAAM_SOURCE =
  "Zac Poonen — Through The Bible: Numbers (Balaam, Peor and Phinehas exposition) + Numeri 25/31 biblical text"

export const NUMERI_31 = numeriChapter({
  number: 31,
  title: "Numeri 31 — Madianul, Balaam și un război greu de citit",
  summary:
    "DOMNUL îi poruncește lui Moise răzbunarea asupra Madianului în legătură cu abaterea de la Peor. Israel atacă, îi omoară pe regii madianiți și pe Balaam, ia captivi și pradă, iar Moise dă apoi o poruncă extrem de severă privind femeile și copiii captivi. Capitolul continuă cu curățirea rituală, împărțirea prăzii și darul căpeteniilor după constatarea că nu lipsea niciun luptător israelit.",
  literaryContext:
    "Numeri 31 nu apare izolat. Numeri 25 descrie abaterea lui Israel la Peor, Numeri 25:16-18 poruncește ostilitatea față de madianiți, iar Numeri 31:16 explică rolul sfatului lui Balaam. Poonen dezvoltă tocmai această legătură: Balaam, iubitor de bani și incapabil să blesteme poporul pe care Dumnezeu îl binecuvântase, a indicat calea coruperii lui prin păcat. El leagă apoi episodul de Fineas. Transcriptul lui nu dezvoltă însă detaliat porunca din 31:13-18, deci nu îi atribuim o justificare pe care nu o dă.",
  historicalContext:
    "Capitolul aparține războaielor Israelului antic și include uciderea combatanților și necombatanților, captivi umani și împărțirea oamenilor împreună cu animalele în inventarul prăzii. Aceste elemente nu sunt ascunse. Nici nu sunt transformate într-un mandat pentru război religios, trafic de persoane sau violență modernă. Legătura cu Peor explică motivul narativ al conflictului, dar nu ne permite să atribuim automat fiecărei femei ori fiecărui copil capturat vina individuală pentru ceea ce s-a întâmplat în Numeri 25.",
  units: [
    {
      id: "numeri-31-1-2",
      ref: "Numeri 31:1-2",
      heading: "Ultima misiune dată lui Moise",
      text: numeriPassage(31, 1, 2),
      teaching: teaching(
        "DOMNUL îi spune lui Moise să răzbune pe fiii lui Israel împotriva madianiților și leagă această misiune de apropierea morții lui Moise: după aceea va fi adăugat la poporul său.",
        "Cuvântul «răzbunare» nu este lăsat la inițiativa privată a unui israelit. În narațiune este o poruncă particulară dată lui Moise într-o etapă precisă a istoriei legământului. Nu îi dă cititorului modern dreptul să identifice un popor drept «Madian» și să pornească violență în Numele lui Dumnezeu.",
        "Legătura imediată este Numeri 25:16-18, unde Madianul fusese numit în contextul înșelării lui Israel la Peor. Capitolul 31 trebuie citit împreună cu acel episod, nu ca o izbucnire militară fără context.",
      ),
      explanationKind: "exposition",
      explanationSource: TEXTUAL_SOURCE,
      crossRefs: ["Numeri 25:16-18", "Numeri 27:12-14", "Deuteronom 32:35"],
      forYourHeart:
        "Nu lua o poruncă istorică dată lui Moise și nu o transforma în dreptul tău de a te răzbuna. Scriptura însăși pune răzbunarea în mâna lui Dumnezeu, nu în pofta noastră de represalii.",
    },
    {
      id: "numeri-31-3-6",
      ref: "Numeri 31:3-6",
      heading: "Douăsprezece mii și Fineas în fruntea contingentului sacru",
      text: numeriPassage(31, 3, 6),
      teaching: teaching(
        "Moise transmite porunca sub formularea «răzbunarea DOMNULUI împotriva Madianului». Sunt trimiși câte o mie de oameni din fiecare seminție, douăsprezece mii în total.",
        "Fineas merge cu obiectele sfinte și cu trâmbițele de semnal. Numele lui nu este întâmplător în context: el fusese omul care intervenise la Peor în Numeri 25. Poonen amintește episodul lui Fineas când explică felul în care Balaam a corupt Israelul prin femeile Moabului/Madianului.",
        "Poonen este explicit în altă parte a aceleiași predici despre diferența dintre vechiul și noul legământ: «astăzi nu folosim sabia literală… nu suntem oameni ai violenței»; sabia credinciosului este Cuvântul. De aceea prezența lui Fineas în această campanie nu poate fi folosită ca pretext pentru violență religioasă creștină.",
      ),
      explanationKind: "exposition",
      explanationSource: POONEN_BALAAM_SOURCE,
      crossRefs: ["Numeri 25:6-13", "Efeseni 6:17", "Evrei 4:12"],
      forYourHeart:
        "Râvna pentru Dumnezeu în Noul Legământ nu se măsoară prin cât rău poți face unui adversar, ci prin cât de necruțător lași Cuvântul să judece compromisul din tine.",
    },
    {
      id: "numeri-31-7-12",
      ref: "Numeri 31:7-12",
      heading: "Balaam moare în războiul pe care l-a ajutat să-l provoace",
      text: numeriPassage(31, 7, 12),
      teaching: teaching(
        "Israel îi lovește pe bărbații Madianului menționați în campanie, inclusiv pe cei cinci regi, iar Balaam este ucis cu sabia. Femeile și copiii sunt luați captivi, animalele și bunurile sunt luate ca pradă, iar cetățile și taberele sunt arse. Narațiunea nu ascunde amploarea războiului.",
        "Moartea lui Balaam trebuie citită după capitolele 22–25. Poonen îl folosește drept avertisment despre un om care cunoscuse ceva din Dumnezeu, dar a ajuns orbit de bani și onoare. Dumnezeu îi spusese să nu meargă; când oferta devine mai atrăgătoare, Balaam caută din nou un răspuns. Poonen rezumă lecția foarte direct: Dumnezeu nu Își schimbă voia fiindcă salariul, avantajele sau onoarea au crescut.",
        "Când Balaam nu poate blestema Israelul, Poonen descrie sfatul lui astfel: dacă vrei să-i dobori, corupe-i; trimite femeile, ei vor păcătui, iar Dumnezeu Însuși îi va disciplina. Aceasta este exact legătura pe care Numeri 31:16 o va face explicit cu abaterea de la Peor.",
        "Așadar Balaam nu este aici un profet nevinovat prins întâmplător între tabere. Finalul lui aparține avertismentului canonic pe care 2 Petru, Iuda și Apocalipsa îl vor relua: darul spiritual, cuvintele corecte și chiar experiențele cu Dumnezeu nu protejează omul care își vinde inima pentru câștig.",
      ),
      explanationKind: "exposition",
      explanationSource: POONEN_BALAAM_SOURCE,
      crossRefs: ["Numeri 22:12", "Numeri 25:1-3", "Numeri 31:16", "2 Petru 2:15", "Iuda 1:11", "Apocalipsa 2:14"],
      forYourHeart:
        "Dacă Dumnezeu ți-a făcut limpede un lucru, nu-L întreba din nou doar fiindcă a crescut prețul compromisului. Balaam n-a pierdut fiindcă nu știa să vorbească spiritual, ci fiindcă a iubit ce i se oferea.",
    },
    {
      id: "numeri-31-13-18",
      ref: "Numeri 31:13-18",
      heading: "Peor explică mânia lui Moise; nu face pasajul mai puțin cumplit",
      text: numeriPassage(31, 13, 18),
      teaching: teaching(
        "Moise se mânie când vede că femeile au fost lăsate în viață și spune motivul: «ele sunt cele care, după cuvântul lui Balaam, i-au făcut pe fiii lui Israel să se abată de la DOMNUL în cazul lui Peor». Aici se confirmă legătura pe care Poonen o dezvoltă în predica lui despre Balaam: strategia nu fusese un blestem rostit, ci coruperea morală a poporului ca să ajungă sub judecata lui Dumnezeu.",
        "Dar trebuie să fim la fel de exacți cu următoarea propoziție. Textul nu spune că fiecare femeie adultă aflată acum printre captive fusese personal una dintre femeile care participaseră la Peor. Explicația nu are voie să inventeze vinovăție individuală ca să facă porunca mai ușor de suportat.",
        "Moise poruncește apoi uciderea fiecărui copil de parte bărbătească și a fiecărei femei care cunoscuse un bărbat, iar fetele care nu cunoscuseră bărbat sunt cruțate. Nu există niciun motiv să folosim eufemisme: acesta este unul dintre cele mai grele texte ale Vechiului Testament, fiindcă porunca îi include pe copii și pe femei despre care versetul nu ne dă o anchetă individuală a faptelor.",
        "Nu îl corectăm pe Moise ca și cum noi am putea rescrie Scriptura, dar nici nu inventăm o justificare pe care Scriptura nu o dă. Îl lăsăm în cadrul judecății vechi-testamentare, îl citim alături de severitatea judecăților din Canaan și refuzăm să-l mutăm ca mandat în mâna creștinului. Poonen însuși spune, când vorbește despre sabia leviților, că astăzi «nu suntem oameni ai violenței» și folosim sabia Scripturii.",
        "Noul Testament mută războiul credinciosului de la carne și sânge la păcat, minciună și puteri spirituale. A lua Numeri 31:17 drept autorizație pentru violență împotriva femeilor sau copiilor de astăzi ar însemna să ignori atât caracterul istoric al poruncii, cât și direcția explicită a Noului Legământ.",
      ),
      explanationKind: "exposition",
      explanationSource: POONEN_BALAAM_SOURCE,
      crossRefs: ["Numeri 25:1-18", "Numeri 31:16", "Efeseni 6:12", "2 Corinteni 10:3-5", "Romani 8:13"],
      forYourHeart:
        "Nu îndulci pasajul și nu-l folosi ca armă. Lasă-l să-ți arate cât de mortal tratează Dumnezeu coruperea poporului Său — iar în Noul Legământ întoarce sabia Cuvântului spre păcat, nu spre oameni.",
    },
    {
      id: "numeri-31-19-24",
      ref: "Numeri 31:19-24",
      heading: "După ucidere, chiar luptătorii trebuie curățiți",
      text: numeriPassage(31, 19, 24),
      teaching: teaching(
        "Cei care au ucis sau au atins un mort trebuie să rămână șapte zile în afara taberei și să urmeze curățirea prescrisă pentru contactul cu moartea. Hainele și obiectele capturate intră și ele în procedura de curățire.",
        "Acest detaliu împiedică o lectură triumfalistă simplă în care tot ce s-a făcut în război ar deveni prin definiție «curat» pentru că Israel a câștigat. Chiar după o campanie poruncită în contextul ei, contactul cu moartea cere curățire rituală.",
        "Eleazar precizează că metalele care rezistă focului trec prin foc și apoi prin apa de curățire, iar celelalte materiale trec prin apă. Accentul este sfințenia taberei și faptul că moartea și prada nu intră pur și simplu în viața sacră a poporului fără purificare.",
      ),
      explanationKind: "exposition",
      explanationSource: TEXTUAL_SOURCE,
      crossRefs: ["Numeri 19:11-22"],
      forYourHeart:
        "Nu numi automat curat tot ce ai atins într-o luptă pe care ai considerat-o dreaptă. Victoria nu înlocuiește cercetarea și curățirea înaintea lui Dumnezeu.",
    },
    {
      id: "numeri-31-25-31",
      ref: "Numeri 31:25-31",
      heading: "Două jumătăți și două cote diferite",
      text: numeriPassage(31, 25, 31),
      teaching: teaching(
        "Prada este numărată și împărțită în două jumătăți egale: una pentru luptători și una pentru restul adunării. Din jumătatea luptătorilor se ia pentru DOMNUL câte unul din cinci sute, dat preotului Eleazar.",
        "Din jumătatea adunării se ia apoi câte unul din cincizeci pentru leviți. Este important să nu inversăm cifrele: 1/50 este o cotă de zece ori mai mare proporțional decât 1/500, chiar dacă cele două jumătăți de bază sunt egale.",
        "Oamenii apar și ei în inventarul prăzii. Nu ștergem acest fapt din explicație și nici nu-l transformăm într-un precedent etic pentru tratarea oamenilor ca proprietate. Descriem cu cinste cadrul antic al pasajului și refuzăm să facem din el o practică creștină.",
      ),
      explanationKind: "exposition",
      explanationSource: TEXTUAL_SOURCE,
      crossRefs: ["Numeri 31:42-47"],
    },
    {
      id: "numeri-31-32-41",
      ref: "Numeri 31:32-41",
      heading: "Inventarul include animale și persoane captive",
      text: numeriPassage(31, 32, 41),
      teaching: teaching(
        "Textul enumeră 675.000 de oi, 72.000 de vite, 61.000 de măgari și 32.000 de fete care nu cunoscuseră un bărbat. Cifrele sunt inventarul oferit de narațiune; din ele singure nu construim o reconstrucție sigură a întregii populații ori economii madianite.",
        "Din jumătatea luptătorilor sunt calculate cotele de 1/500: 675 de oi, 72 de vite, 61 de măgari și 32 de persoane. Faptul că persoane captive sunt contabilizate alături de animale este tocmai unul dintre motivele pentru care pasajul este moral greu pentru cititorul modern.",
        "Nu reparăm dificultatea schimbând sensul cuvintelor și nu pretindem că acele persoane nu erau captive. Explicația fidelă începe prin a spune adevărul despre text înainte de a discuta cum se situează el în istoria legământului și față de învățătura Noului Testament.",
      ),
      explanationKind: "exposition",
      explanationSource: TEXTUAL_SOURCE,
      crossRefs: [],
    },
    {
      id: "numeri-31-42-47",
      ref: "Numeri 31:42-47",
      heading: "Una din cincizeci din jumătatea adunării",
      text: numeriPassage(31, 42, 47),
      teaching: teaching(
        "Cealaltă jumătate a prăzii revine adunării. Din ea, Moise ia câte unul din cincizeci dintre oameni și animale și îi dă leviților care îngrijeau Cortul DOMNULUI.",
        "Pasajul descrie distribuirea concretă a prăzii după un război antic. Nu există bază pentru a transforma raportul 1/50 într-o regulă financiară a bisericii sau într-un model pentru împărțirea câștigurilor moderne.",
      ),
      explanationKind: "exposition",
      explanationSource: TEXTUAL_SOURCE,
      crossRefs: ["Numeri 18:21-24"],
    },
    {
      id: "numeri-31-48-52",
      ref: "Numeri 31:48-52",
      heading: "Niciun luptător lipsă și un dar de aur",
      text: numeriPassage(31, 48, 52),
      teaching: teaching(
        "Căpeteniile raportează lui Moise că, după numărătoare, nu lipsește niciunul dintre oamenii aflați sub comanda lor. Apoi aduc înaintea DOMNULUI obiecte de aur luate în război, folosind limbajul ispășirii pentru sufletele lor.",
        "Faptul că niciun luptător israelit nu lipsea este extraordinar în narațiune, dar nu este o promisiune universală că orice armată care pretinde că luptă pentru Dumnezeu va fi protejată fără pierderi.",
        "Darul lor nu cumpără victoria și nici viața oamenilor pe care Dumnezeu i-ar fi protejat deja. El este răspunsul căpeteniilor după numărătoare și devine o aducere înaintea DOMNULUI.",
      ),
      explanationKind: "exposition",
      explanationSource: TEXTUAL_SOURCE,
      crossRefs: [],
    },
    {
      id: "numeri-31-53-54",
      ref: "Numeri 31:53-54",
      heading: "Aurul rămâne ca aducere aminte înaintea DOMNULUI",
      text: numeriPassage(31, 53, 54),
      teaching: teaching(
        "Ultimele versete observă că oamenii de război luaseră pradă fiecare pentru sine, iar Moise și Eleazar duc aurul căpeteniilor în Cortul Întâlnirii ca aducere aminte pentru Israel înaintea DOMNULUI.",
        "Capitolul se încheie nu cu un slogan militar, ci cu ceva adus înaintea lui Dumnezeu. Războiul, prada și salvarea luptătorilor sunt toate plasate în memoria cultică a poporului.",
        "Pentru cititorul creștin, fidelitatea față de text înseamnă două refuzuri simultane: nu ștergem severitatea capitolului și nu o folosim ca mandat pentru a repeta violența lui într-un alt legământ.",
      ),
      explanationKind: "exposition",
      explanationSource: TEXTUAL_SOURCE,
      crossRefs: ["Exod 30:16"],
    },
  ],
  prayer:
    "Doamne, păzește-ne de calea lui Balaam — de inima care știe adevărul, dar caută din nou permisiune când crește prețul compromisului. Dă-ne cinste față de Scriptură ca să nu ascundem nici pasajele ei cumplite și nici să nu le folosim pentru a justifica răul nostru. Învață-ne, în Noul Legământ, să purtăm sabia Cuvântului împotriva păcatului și minciunii, nu împotriva oamenilor. Amin.",
  status: NUMERI_STATUSES[31],
})