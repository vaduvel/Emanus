import { ArrowLeft, ExternalLink, LifeBuoy, Mail, Phone, ShieldAlert } from "lucide-react"
import { crisisResourcesFor, type CrisisIntent } from "./crisisResources"

function situationCopy(intents: CrisisIntent[]): string {
  if (intents.includes("suicide")) {
    return "Dacă te gândești să îți faci rău, nu rămâne singur și îndepărtează-te de orice mijloc cu care te-ai putea răni. Sună acum o persoană de încredere și una dintre liniile de mai jos."
  }
  if (intents.includes("child")) {
    return "Dacă un copil este abuzat, neglijat sau în pericol, nu păstra situația secretă. Cere intervenția unui adult sigur și folosește liniile de mai jos."
  }
  if (intents.includes("violence")) {
    return "Dacă ești amenințat sau agresat, mergi într-un loc sigur dacă poți face asta fără să te expui unui pericol mai mare și cere ajutor direct."
  }
  if (intents.includes("drugs")) {
    return "O posibilă supradoză este o urgență medicală. Sună la 112 acum; nu aștepta să vezi dacă simptomele trec și nu încerca să gestionezi singur situația."
  }
  if (intents.includes("gambling")) {
    return "Dacă jocurile de noroc te-au adus la gânduri de suicid sau la pericol imediat, sună la 112. Pentru oprire și consiliere folosește resursa specializată de mai jos."
  }
  return "Alege resursa potrivită situației. Dacă există un pericol imediat, sună mai întâi la 112."
}

export function Crisis({ intents, onBack }: { intents: CrisisIntent[]; onBack: () => void }) {
  const resources = crisisResourcesFor(intents)

  return (
    <main className="app route-anim">
      <section className="crisis-screen">
        <div className="prayer__head">
          <div>
            <h1 className="title-icon">
              <LifeBuoy size={22} strokeWidth={1.8} aria-hidden />
              Ai nevoie de ajutor acum?
            </h1>
            <span className="muted">Nu aștepta ca un curs să rezolve o urgență.</span>
          </div>
          <button type="button" className="ghost" onClick={onBack} aria-label="Înapoi">
            <ArrowLeft size={20} aria-hidden />
          </button>
        </div>

        <div className="crisis-screen__notice" role="alert">
          <ShieldAlert size={20} aria-hidden />
          <p>{situationCopy(intents)}</p>
        </div>

        <ul className="crisis-screen__list">
          {resources.map((resource) => (
            <li
              className={"crisis-resource" + (resource.id === "112" ? " crisis-resource--urgent" : "")}
              key={resource.id}
            >
              <div className="crisis-resource__body">
                <p className="crisis-resource__number">{resource.phone}</p>
                <h2>{resource.label}</h2>
                <p className="crisis-resource__availability">{resource.availability}</p>
                <p className="muted">{resource.note}</p>
                {resource.email ? (
                  <a className="crisis-resource__meta" href={"mailto:" + resource.email}>
                    <Mail size={14} aria-hidden />
                    {resource.email}
                  </a>
                ) : null}
                <a
                  className="crisis-resource__meta"
                  href={resource.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <ExternalLink size={14} aria-hidden />
                  Sursă: {resource.sourceLabel}
                </a>
              </div>
              <a className="crisis-resource__call" href={"tel:" + resource.dial}>
                <Phone size={16} aria-hidden />
                Sună
              </a>
            </li>
          ))}
        </ul>

        <p className="crisis-screen__foot">
          Programele liniilor se pot schimba. Verifică sursa afișată; la pericol imediat folosește 112.
        </p>
      </section>
    </main>
  )
}
