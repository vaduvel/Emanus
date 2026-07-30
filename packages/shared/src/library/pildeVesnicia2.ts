import type { Lesson } from "../domain.js"
import { PILDE_VESNICIA_PART_A } from "./pildeVesnicia.js"

export const pildaNunta: Lesson = {
  id: "pilda_nunta_imparatului", courseId: "parables_c4_vesnicia", order: 4,
  title: "Nunta fiului de împărat", estMinutes: 11,
  anchorRefs: ["Matei 22:1-14", "Matei 22:9"], memoryVerseRef: "Matei 22:9",
  steps: [
    { id: "e4_1", type: "hook", order: 1, bubbles: [
      { from: "guide", text: "Un împărat pregătește nunta fiului său. Invitații refuză: unul pleacă la ogor, altul la negoț, iar alții îi bat și îi omoară pe mesageri. Atunci sala este umplută cu oameni adunați de la răspântii." },
      { from: "guide", text: "Pilda nu este, în primul rând, despre cine n-a primit invitație. Este despre oameni invitați, care au tratat ospățul ca pe ceva mai puțin important decât programul lor." },
    ]},
    { id: "e4_2", type: "name_struggle", order: 2, bubbles: [
      { from: "guide", text: "Cui i-a fost spusă: conducătorilor religioși din Templu, după ce au întrebat cu ce autoritate lucrează Iisus. Ei înțeleg că pildele din acest șir îi privesc." },
      { from: "guide", text: "Două propoziții de context: invitația la o nuntă regală era o onoare publică, iar refuzul deliberat era insultă față de rege. Chemarea de la răspântii răstoarnă lista de onoare: sala se umple cu cei pe care nimeni nu-i pusese primii." },
    ]},
    { id: "e4_3", type: "scripture", order: 3, scripture: { text: "Duceți-vă, dar, la răspântiile drumurilor și chemați la nuntă pe toți aceia pe care-i veți găsi.", ref: "Matei 22:9" } },
    { id: "e4_4", type: "truth_simple", order: 4, bubbles: [
      { from: "guide", text: "Punctul principal: refuzul celor care se credeau aproape nu oprește ospățul; invitația ajunge la cei neașteptați. Dar intrarea în sală cere un răspuns real, nu doar prezența fizică." },
      { from: "guide", text: "Pilda ține împreună două adevăruri pe care noi le despărțim: invitația este uimitor de largă — «pe toți» — și totuși invitația nu este tratată ca un lucru fără greutate." },
    ]},
    { id: "e4_5", type: "world_vs_truth", order: 5, bubbles: [
      { from: "guide", text: "Citirea greșită: «Dumnezeu caută un motiv să te dea afară». Nu acesta este centrul poveștii. Împăratul a trimis mesager după mesager și a umplut sala cu oameni luați de pe drum." },
      { from: "guide", text: "Alta: haina de nuntă nu este o invitație să inventăm o listă de detalii ascunse. Textul nu explică de unde venea haina. Spune doar că omul a vrut ospățul fără să răspundă onoarei celui care l-a chemat." },
    ]},
    { id: "e4_6", type: "choice", order: 6, choice: { prompt: "Care parte a invitației îți este mai greu de primit?", options: [
      { id: "e4a", label: "Că e și pentru mine, nu doar pentru oamenii «buni»." },
      { id: "e4b", label: "Că nu pot păstra totul exact cum era înainte." },
      { id: "e4c", label: "Că oamenii pe care eu nu i-aș alege sunt chemați și ei." },
    ]}},
    { id: "e4_7", type: "how_god_helps", order: 7, bubbles: [
      { from: "guide", text: "Dacă te îndoiești că e și pentru tine: oamenii de la răspântii n-au avut CV și n-au trecut interviu. Au răspuns invitației." },
      { from: "guide", text: "Dacă te temi de schimbare: răspunsul nu cumpără locul la masă. Locul a fost oferit. Schimbarea este felul în care primești onoarea de a fi acolo." },
    ]},
    { id: "e4_8", type: "step", order: 8, bubbles: [
      { from: "guide", text: "Un lucru azi: numește invitația pe care ai tot amânat-o sub un motiv respectabil — muncă, cumpărături, oboseală, «mai târziu». Fă primul pas de cinci minute." },
    ]},
    { id: "e4_9", type: "how_god_helps", order: 9, bubbles: [
      { from: "guide", text: "Limita cinstită: finalul rămâne sever. Nu îl ștergem, dar nici nu îl transformăm într-un verdict despre tine sau despre un om anume." },
      { from: "guide", text: "Pilda nu ne spune să verificăm hainele altora. Le-a fost spusă tocmai unor oameni ocupați să verifice cine merită să intre." },
    ]},
    { id: "e4_10", type: "memory_verse", order: 10, scripture: { text: "Chemați la nuntă pe toți aceia pe care-i veți găsi.", ref: "Matei 22:9" } },
  ],
}

export const pildaJudecatorul: Lesson = {
  id: "pilda_judecatorul_nedrept", courseId: "parables_c4_vesnicia", order: 5,
  title: "Judecătorul nedrept", estMinutes: 10,
  anchorRefs: ["Luca 18:1-8", "Luca 18:1"], memoryVerseRef: "Luca 18:1",
  steps: [
    { id: "e5_1", type: "hook", order: 1, bubbles: [
      { from: "guide", text: "O văduvă vine iar și iar la un judecător care nu se teme de Dumnezeu și nu respectă oamenii. El o ignoră, apoi îi face dreptate doar fiindcă nu mai vrea să fie deranjat." },
      { from: "guide", text: "Dacă ai auzit pilda ca pe «bate suficient la ușă până Îl convingi pe Dumnezeu», ai primit exact opusul punctului ei." },
    ]},
    { id: "e5_2", type: "name_struggle", order: 2, bubbles: [
      { from: "guide", text: "Cui i-a fost spusă: ucenicilor. Luca scrie scopul înainte să înceapă povestea: să se roage necurmat și să nu se lase." },
      { from: "guide", text: "Două propoziții de context: o văduvă fără sprijin masculin avea foarte puțină putere economică și juridică. Judecătorul ar fi trebuit să fie ultimul ei apărător; tocmai el era corupt și indiferent." },
    ]},
    { id: "e5_3", type: "scripture", order: 3, scripture: { text: "Isus le-a spus o pildă, ca să le arate că trebuie să se roage necurmat și să nu se lase.", ref: "Luca 18:1" } },
    { id: "e5_4", type: "truth_simple", order: 4, bubbles: [
      { from: "guide", text: "Punctul principal: dacă până și un judecător nedrept răspunde stăruinței, cu cât mai mult Dumnezeu, care aude strigătul oamenilor Lui. Este contrast, nu comparație." },
      { from: "guide", text: "Dumnezeu nu este judecătorul rece din poveste. El este opusul lui. Văduva nu are acces; tu ești numit copil. Ea nu are avocat; Noul Testament spune că Iisus mijlocește." },
    ]},
    { id: "e5_5", type: "world_vs_truth", order: 5, bubbles: [
      { from: "guide", text: "Citirea greșită: «dacă n-ai primit răspuns, nu te-ai rugat destul». Pilda nu pune vina pe văduvă și nu oferă o formulă prin care numărul rugăciunilor obligă un răspuns." },
      { from: "guide", text: "Alta: «Dumnezeu întârzie fiindcă nu-I pasă». Întrebarea grea a pildei este tocmai cum rămâne credința vie în intervalul în care dreptatea pare întârziată." },
    ]},
    { id: "e5_6", type: "choice", order: 6, choice: { prompt: "Unde ești acum în așteptare?", options: [
      { id: "e5a", label: "Încă mă rog, dar sunt obosit." }, { id: "e5b", label: "M-am oprit fiindcă m-am simțit ignorat." }, { id: "e5c", label: "Nu cer ceva pentru mine, ci dreptate pentru altcineva." },
    ]}},
    { id: "e5_7", type: "how_god_helps", order: 7, bubbles: [
      { from: "guide", text: "Stăruința nu înseamnă să repeți aceeași propoziție până o spui perfect. Înseamnă să continui să vii cu adevărul întreg: cererea, furia, oboseala și faptul că încă nu vezi." },
      { from: "guide", text: "Poți cere și ajutor omenesc. Pentru abuz, fraudă, violență sau pericol, rugăciunea nu înlocuiește poliția, avocatul, medicul ori 112. Uneori dreptatea începe cu un telefon." },
    ]},
    { id: "e5_8", type: "prayer", order: 8, bubbles: [
      { from: "guide", text: "Spune-I simplu: «Doamne, aici am obosit. Nu vreau să prefac așteptarea în credință frumoasă. Ține Tu vie în mine propoziția pe care eu nu mai pot s-o țin.»" },
    ]},
    { id: "e5_9", type: "how_god_helps", order: 9, bubbles: [
      { from: "guide", text: "Limita cinstită: pilda promite că Dumnezeu face dreptate; nu ne dă calendarul și nu explică de ce unele răspunsuri întârzie până dincolo de viața aceasta." },
      { from: "guide", text: "Nu vom inventa motivul pentru care a permis ce s-a întâmplat. Pilda îți dă voie să strigi și îți spune doar că strigătul nu ajunge la un judecător indiferent." },
    ]},
    { id: "e5_10", type: "memory_verse", order: 10, scripture: { text: "Trebuie să se roage necurmat și să nu se lase.", ref: "Luca 18:1" } },
  ],
}

export const PILDE_VESNICIA_LESSONS: Lesson[] = [...PILDE_VESNICIA_PART_A, pildaNunta, pildaJudecatorul]
