import type { ExplainedOverlayChapter } from "../explainedOverlay.js"

const n = {
  kind: "biblia-emanus" as const,
  note: "rezumat narativ fără doctrină adăugată" as const,
}

export const CANTAREA_TEXTUAL_CHAPTERS: Readonly<Record<number, ExplainedOverlayChapter>> = {
  3: {
    number: 3,
    title: "Căutare, găsire și procesiunea împărătească",
    summary: "Poemul trece de la căutarea nocturnă a celui iubit la o scenă publică de nuntă și procesiune regală. Dorul personal și celebrarea comunitară sunt așezate în aceeași poezie a iubirii.",
    units: [
      { from: 1, to: 5, heading: "Căutarea celui iubit și avertismentul de a nu forța iubirea", teaching: "Femeia descrie o noapte în care îl caută pe cel iubit, nu îl găsește în pat și pornește prin cetate, întrebând străjerii. Când îl găsește, îl ține aproape și îl aduce într-un loc al siguranței familiale. Refrenul repetat către fiicele Ierusalimului avertizează din nou să nu trezească iubirea înainte de vreme, păstrând relația departe de grabă și constrângere.", source: n },
      { from: 6, to: 11, heading: "Procesiunea lui Solomon și bucuria zilei nunții", teaching: "A doua scenă este publică și ceremonială: apar fumuri parfumate, garda de războinici, lectica regală și coroana. Poemul nu dezvoltă o doctrină despre lux, ci descrie onoarea și frumusețea unei procesiuni de nuntă, culminând cu ziua bucuriei inimii mirelui.", source: n },
    ],
  },
  4: {
    number: 4,
    title: "Admirația trupului iubit și imaginea grădinii păstrate",
    summary: "Capitolul este o poezie de admirație conjugală în care frumusețea trupului este descrisă prin imagini ale naturii. Finalul mută imaginea spre o grădină păstrată, plină de parfum și apă vie.",
    units: [
      { from: 1, to: 7, heading: "Frumusețea este exprimată prin apreciere, nu prin rușinare", teaching: "Mirele descrie ochii, părul, dinții, buzele, tâmplele și trupul iubitei folosind imagini poetice din lumea pastorală și urbană a epocii. Scopul nu este stabilirea unui standard universal de frumusețe, ci exprimarea admirației concrete pentru persoana iubită. Poemul tratează trupul conjugal fără rușine și fără limbaj de degradare.", source: n },
      { from: 8, to: 16, heading: "Iubirea, exclusivitatea și grădina care se deschide", teaching: "Limbajul trece de la chemarea iubitei la comparația cu o grădină închisă și un izvor pecetluit, sugerând exclusivitatea și intimitatea relației. Mirodeniile, apa și vântul transformă grădina într-o imagine a vieții și parfumului, iar finalul o lasă pe femeie să invite în mod activ iubitul; reciprocitatea rămâne parte din poezia iubirii.", source: n },
    ],
  },
  5: {
    number: 5,
    title: "Întârziere, pierdere și căutarea celui iubit",
    summary: "Capitolul schimbă tonul: o ezitare duce la absența celui iubit, iar căutarea devine dureroasă. Finalul nu se oprește în pierdere, ci o face pe femeie să descrie din nou ce anume iubește la el.",
    units: [
      { from: 1, to: 8, heading: "Ezitarea este urmată de absență și de o căutare care rănește", teaching: "După deschiderea scenei de intimitate, femeia descrie o ezitare de a răspunde chemării iubitului. Când în cele din urmă deschide, el a plecat, iar căutarea prin cetate nu aduce imediat restaurare; străjerii o lovesc și îi iau vălul. Textul descrie această violență fără să o aprobe și nu oferă un model pentru tratarea femeilor sau pentru «disciplinarea» relațională.", source: n },
      { from: 9, to: 16, heading: "Întrebarea altora o face să-și amintească frumusețea celui iubit", teaching: "Fiicele Ierusalimului întreabă ce are iubitul ei atât de deosebit, iar răspunsul devine un portret poetic amplu al feței, părului, ochilor, mâinilor, trupului și glasului lui. Capitolul se încheie nu cu o teorie despre iubire, ci cu mărturia personală: acesta este iubitul și prietenul ei.", source: n },
    ],
  },
  7: {
    number: 7,
    title: "Admirație reciprocă și dorința de a ieși împreună în câmp",
    summary: "Capitolul continuă aprecierea trupului iubit și se mută apoi spre inițiativa femeii de a merge împreună în natură. Iubirea este descrisă ca reciprocă, vie și legată de prezență, nu doar de discurs.",
    units: [
      { from: 1, to: 9, heading: "Trupul iubitei este celebrat prin imagini poetice ale frumuseții", teaching: "Poemul descrie pașii, coapsele, trupul, ochii, nasul, capul și părul femeii în limbajul metaforic al epocii. Nu este o listă de măsurători după care alte femei ar trebui evaluate, ci vocea unui iubit care privește persoana concretă cu admirație și dorință în cadrul relației lor.", source: n },
      { from: 10, to: 13, heading: "«Eu sunt a iubitului meu» și invitația de a trăi iubirea în reciprocitate", teaching: "Declarația apartenenței este urmată de afirmația că dorința iubitului este spre ea, apoi femeia propune să iasă împreună în câmp și să vadă rodirea vieții din jur. Inițiativa nu aparține unui singur partener; poemul prezintă reciprocitate și o iubire care vrea timp și spațiu împreună.", source: n },
    ],
  },
}
