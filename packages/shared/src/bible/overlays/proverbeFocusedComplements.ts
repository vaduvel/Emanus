import type { ExplainedOverlayUnit } from "../explainedOverlay.js"

const n = {
  kind: "biblia-emanus" as const,
  note: "rezumat textual fără doctrină adăugată" as const,
}

export const PROVERBE_FOCUSED_COMPLEMENTS: Readonly<Record<number, readonly ExplainedOverlayUnit[]>> = {
  6: [
    { from: 1, to: 5, heading: "Garanția financiară pripită cere acțiune rapidă pentru ieșirea din capcană", teaching: "Capitolul începe cu omul care s-a pus garant pentru aproapele sau străinul lui și s-a legat prin propriile cuvinte. Sfatul este să nu trateze obligația cu nepăsare: să meargă, să se smerească și să insiste pentru eliberarea din promisiunea riscantă. Imaginea gazelei care scapă de vânător arată urgența, nu lipsa de responsabilitate față de datoriile legitime deja asumate.", source: n },
    { from: 6, to: 11, heading: "Furnica devine profesor pentru omul care amână munca până când lipsa îl surprinde", teaching: "Leneșul este trimis să observe furnica, care fără supraveghetor vizibil își pregătește hrana la timpul potrivit. Întrebările despre cât va mai dormi sunt urmate de imaginea puținului somn și a mâinilor încrucișate repetate până când sărăcia vine ca un tâlhar. Proverbul critică neglijența obișnuită, nu odihna necesară sau incapacitatea produsă de boală.", source: n },
    { from: 12, to: 15, heading: "Omul rău comunică înșelarea prin gură, privire și gesturi până când nenorocirea îl ajunge", teaching: "Persoana fără valoare umblă cu vorbire strâmbă și folosește ochii, picioarele și degetele pentru semnale înșelătoare. Inima lui pregătește răul și seamănă certuri. Dezastrul este descris ca venind brusc, iar ruptura lui ca una fără remediu omenesc.", source: n },
    { from: 16, to: 19, heading: "Șapte lucruri urâte de DOMNUL unesc mândria, minciuna, violența și provocarea conflictului", teaching: "Lista numerică trece de la ochii trufași și limba mincinoasă la mâinile care varsă sânge nevinovat, inima care plănuiește răul, picioarele grăbite spre răutate, martorul fals și omul care seamănă discordie între frați. Caracterul este privit ca întreg: gândirea, vorbirea și acțiunea pot participa toate la aceeași orientare spre rău.", source: n },
  ],
}
