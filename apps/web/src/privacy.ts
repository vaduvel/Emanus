import { cloudEnabled } from "./cloud"

export function privateWritingNotice(): string {
  return cloudEnabled()
    ? "Ce scrii este privat. Se păstrează pe dispozitiv și în copia ta de siguranță, accesibilă numai contului tău."
    : "Ce scrii este privat și rămâne numai pe acest dispozitiv."
}

/**
 * Strat editorial temporar pentru lecțiile scrise înaintea auditului. Corectează
 * afirmațiile care nu trebuie afișate nici măcar până la rescrierea definitivă
 * a fișierului sursă. Nu modifică versetele din câmpurile `scripture`.
 */
export function truthfulPrivacyCopy(text: string): string {
  const notice = privateWritingNotice()
  let reviewed = text

  const privacyPatterns = [
    /Ce scrii aici rămâne în telefonul tău[^.]*\.?/giu,
    /Ce scrii aici rămâne doar pe telefonul tău[^.]*\.?/giu,
    /Rămâne doar pe telefonul tău[^.]*\.?/giu,
    /Nu se trimite nicăieri[^.]*\.?/giu,
  ]
  reviewed = privacyPatterns.reduce((value, pattern) => value.replace(pattern, notice), reviewed)

  reviewed = reviewed.replace(
    /TelVerde antidrog:\s*0800\s*801\s*200\.\s*Sprijin emoțional:\s*116\s*123\.\s*Urgențe:\s*112\./giu,
    "Pentru alcool, droguri sau jocuri de noroc, cere ajutor medical și specializat. Pentru sprijin emoțional: 116 123. În pericol imediat: 112.",
  )

  reviewed = reviewed.replace(
    /Iuda a facut ceva mai mic si nu s-a intors\. Diferenta nu a fost gravitatea faptei, a fost intoarcerea\./giu,
    "Iuda și Petru au păcătuit în moduri diferite; textul nu ne cere să le măsurăm faptele una împotriva celeilalte. Aici accentul este pe faptul că Petru s-a întors la Hristos.",
  )

  reviewed = reviewed.replace(
    /«Mijlocul sa ieșiți» — in greaca, un cuvant folosit pentru o trecere printre munti, o ieșire din strâmtoare\./giu,
    "Expresia grecească vorbește despre o cale de ieșire. Imaginea unei treceri din strâmtorare poate ajuta, dar nu trebuie prezentată drept definiție lexicală obligatorie.",
  )

  reviewed = reviewed.replace(
    /E singurul loc din psalm in care omul nu vorbeste cu Dumnezeu\. Vorbeste cu el insuși\./giu,
    "Aici psalmistul nu vorbește direct cu Dumnezeu, ci își adresează propriului suflet adevărul pe care are nevoie să-l audă.",
  )

  reviewed = reviewed.replace(
    /Asta e in Biblie: primul raspuns al lui Dumnezeu la epuizarea unui om a fost somn si mâncare\./giu,
    "În această întâmplare, Dumnezeu a îngrijit mai întâi nevoile trupești ale lui Ilie: somn și mâncare.",
  )

  reviewed = reviewed.replace(
    /Nu e lipsa de credința si nu e pacat\. Un om cu piciorul rupt se roaga si merge si la doctor\. Fa amandoua\./giu,
    "Nu presupune automat că starea aceasta dovedește lipsă de credință sau un păcat anume. Un om cu piciorul rupt se roagă și merge la doctor; fă amândouă.",
  )

  reviewed = reviewed.replace(
    /Ce distruge oamenii nu e caderea\. E ce se intampla in urmatoarele douasprezece ore dupa ea\./giu,
    "Căderea este serioasă. Adesea, rușinea și ascunderea din orele de după o adâncesc și taie tocmai legăturile de care ai nevoie.",
  )

  reviewed = reviewed.replace(
    /Avem peste cinci mii de copii în greacă ale Noului Testament\. Cea mai veche bucată păstrată e un fragment din Ioan, datat pe la anul 125 — la vreo treizeci de ani după ce a fost scrisă cărticica\./giu,
    "Avem peste cinci mii de manuscrise grecești ale Noului Testament. Fragmentul P52 din Ioan este adesea datat în secolul al II-lea, dar data exactă este discutată; nu îl folosim ca pe un cronometru sigur la treizeci de ani de original.",
  )

  reviewed = reviewed.replace(
    /L-au pus lângă Isaia din Bibliile de azi, copiat o mie de ani mai târziu\. Același text\. Diferențele erau de ortografie\./giu,
    "Compararea sulului mare al lui Isaia cu tradiția masoretică arată o transmitere remarcabil de stabilă, dar există și variante textuale, nu numai diferențe de ortografie. Ele trebuie descrise cinstit, fără a pretinde identitate literă cu literă.",
  )

  reviewed = reviewed.replace(
    /Sincer: din documente nu ieși cu «Dumnezeu există»\. Ieși cu «nu m-a mințit nimeni despre ce s-a întâmplat»\. De acolo încolo e o întâlnire, nu o demonstrație\./giu,
    "Documentele pot arăta că textul este vechi, transmis și legat de mărturii timpurii. Ele nu pot demonstra singure că fiecare afirmație este adevărată și nici că niciun autor nu a putut greși sau minți. Întrebarea adevărului cere toate dovezile și întâlnirea cu Hristos.",
  )

  reviewed = reviewed.replace(
    /Ăsta e limbaj de reporter, nu de mitologie\./giu,
    "Acesta este limbajul unui autor care declară că a cercetat mărturii și a urmărit o relatare ordonată; afirmația lui trebuie evaluată, nu respinsă numai prin eticheta de mit.",
  )

  reviewed = reviewed.replace(
    /Toate religiile lumii funcționează așa\. Creștinismul e singurul care spune că balanța nu se poate echilibra — și că a fost plătită de altcineva\./giu,
    "Multe sisteme religioase și multe forme de religiozitate sunt trăite ca o balanță a meritelor. Evanghelia apostolică spune însă că mântuirea nu este câștigată prin fapte, ci primită prin har în Hristos.",
  )

  reviewed = reviewed.replace(
    /Cine se întoarce liniștit, n-a înțeles încă nimic\./giu,
    "Harul nu face pace cu păcatul. Totuși, nu putem vedea deplin inima altuia; urmărim dacă există pocăință și rod, fără să pronunțăm printr-o propoziție verdictul final asupra omului.",
  )

  return reviewed
}
