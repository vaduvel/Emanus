// Mesajul zilei — cardul distribuibil (docs/27 §3).
//
// REGULA (docs/00-DIRECTIE §7, D-005): nu punem cuvinte noi in gura lui Dumnezeu.
// Titlul e „Dumnezeu ti-a spus deja:”, iar referinta versetului apare pe card,
// la vedere, inclusiv in imaginea exportata. Fara referinta, cardul nu iese.
//
// Nu copiem carduri care circula pe retele: apartin autorilor lor (docs/27 §1.2).
import { useMemo, useRef, useState } from "react"
import {
  isCardAnchored,
  messageCardById,
  pickMessageCard,
  SCROLL_SECTIONS,
  scrollVerseById,
  type MessageCard,
} from "@emanus/shared"
import { lastMood, recentCardIds, rememberCard } from "../dailyGifts"
import { navigate } from "../router"

type Format = "post" | "story"

const SIZES: Record<Format, { w: number; h: number; label: string }> = {
  post: { w: 1080, h: 1350, label: "postare" },
  story: { w: 1080, h: 1920, label: "story" },
}

const PAPER = "#f6ecd7"
const INK = "#2f2617"

function wrap(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
): string[] {
  const words = text.split(/\s+/)
  const lines: string[] = []
  let line = ""
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word
    if (ctx.measureText(candidate).width > maxWidth && line) {
      lines.push(line)
      line = word
    } else {
      line = candidate
    }
  }
  if (line) lines.push(line)
  return lines
}

/** Desenam cardul pe canvas: iese o imagine, nu un screenshot cu butoane. */
function drawCard(canvas: HTMLCanvasElement, card: MessageCard, format: Format): void {
  const { w, h } = SIZES[format]
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext("2d")
  if (!ctx) return

  ctx.fillStyle = PAPER
  ctx.fillRect(0, 0, w, h)

  // umbra calda de pergament, pe margini
  const glow = ctx.createRadialGradient(w / 2, h * 0.42, 0, w / 2, h * 0.42, w * 0.85)
  glow.addColorStop(0, "rgba(255,255,255,0.55)")
  glow.addColorStop(1, "rgba(140,98,57,0.18)")
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, w, h)

  ctx.strokeStyle = "rgba(140,98,57,0.35)"
  ctx.lineWidth = 4
  ctx.strokeRect(56, 56, w - 112, h - 112)

  ctx.textAlign = "center"
  ctx.fillStyle = INK

  // titlul permis
  ctx.font = "500 40px Georgia, serif"
  const titleLines = wrap(ctx, card.title, w - 260)
  let y = h * 0.24
  for (const line of titleLines) {
    ctx.fillText(line, w / 2, y)
    y += 54
  }

  // parafraza, ancorata in verset
  ctx.font = "600 70px Georgia, serif"
  const bodyLines = wrap(ctx, `„${card.body}”`, w - 240)
  y += 60
  for (const line of bodyLines) {
    ctx.fillText(line, w / 2, y)
    y += 96
  }

  // referinta — obligatorie pe imagine
  ctx.font = "500 44px Georgia, serif"
  ctx.fillStyle = "rgba(47,38,23,0.8)"
  ctx.fillText(card.verseRef, w / 2, y + 40)

  // Versetul întreg se adaugă separat doar când mesajul este o parafrază.
  // Pentru un Pergament, corpul este deja chiar textul Scripturii.
  if (card.body !== card.verseText) {
    ctx.font = "400 32px Georgia, serif"
    ctx.fillStyle = "rgba(47,38,23,0.65)"
    const verseLines = wrap(ctx, card.verseText, w - 300)
    let vy = y + 110
    for (const line of verseLines) {
      ctx.fillText(line, w / 2, vy)
      vy += 42
    }
  }

  ctx.font = "400 30px Georgia, serif"
  ctx.fillStyle = "rgba(47,38,23,0.5)"
  ctx.fillText("emanus.app", w / 2, h - 90)
}

export default function Mesaj({ cardId, verseId }: { cardId?: string; verseId?: string }) {
  const [format, setFormat] = useState<Format>("post")
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const card = useMemo(() => {
    const scrollVerse = scrollVerseById(verseId)
    if (scrollVerse) {
      const need = SCROLL_SECTIONS.find((section) => section.id === scrollVerse.section)?.mood
      return {
        id: `scroll_${scrollVerse.id}`,
        title: "Astăzi, din Scriptură, pentru tine:" as const,
        body: scrollVerse.text,
        verseRef: scrollVerse.ref,
        verseText: scrollVerse.text,
        axis: scrollVerse.axis,
        needs: need ? [need] : [],
        background: "pergament" as const,
      }
    }
    const direct = cardId ? messageCardById(cardId) : null
    const chosen =
      direct ?? pickMessageCard({ mood: lastMood() ?? undefined, recentIds: recentCardIds() })
    if (!direct) rememberCard(chosen.id)
    return chosen
  }, [cardId, verseId])

  // Plasa de siguranta: un card fara verset nu se afiseaza si nu se distribuie.
  if (!isCardAnchored(card)) {
    return (
      <section className="today">
        <p>Cardul de azi nu are verset-ancora, deci nu iese din aplicatie.</p>
      </section>
    )
  }

  async function share() {
    const canvas = canvasRef.current
    if (!canvas) return
    drawCard(canvas, card, format)

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob((b) => resolve(b), "image/png"),
    )
    if (!blob) return

    const file = new File([blob], `emanus-${card.id}.png`, { type: "image/png" })
    const nav = navigator as Navigator & {
      canShare?: (data: { files: File[] }) => boolean
      share?: (data: { files?: File[]; text?: string; title?: string }) => Promise<void>
    }

    if (nav.canShare?.({ files: [file] }) && nav.share) {
      await nav.share({ files: [file], title: card.verseRef })
      return
    }

    // fara Web Share (desktop): descarcam imaginea
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = file.name
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <section className="today">
      <button className="today__back ghost" onClick={() => navigate(verseId ? "/pergament" : "/")}>
        ← {verseId ? "Pergament" : "Azi"}
      </button>

      <p className="today__kicker">{card.title}</p>
      <h1 className="scripture">„{card.body}”</h1>
      <p className="today__verse">{card.verseRef}</p>
      {card.body !== card.verseText ? <p className="muted">{card.verseText}</p> : null}

      <div className="today__chips">
        {(Object.keys(SIZES) as Format[]).map((f) => (
          <button
            key={f}
            className={f === format ? "tile" : "ghost"}
            onClick={() => setFormat(f)}
          >
            {SIZES[f].label}
          </button>
        ))}
      </div>

      <div className="today__invite-actions">
        <button className="today__cta" onClick={share}>
          Trimite mai departe
        </button>
        <button className="ghost" onClick={() => navigate("/pergament")}>
          Vreau un verset pentru mine
        </button>
      </div>

      {/* Cine primeste cardul ajunge la verset, nu la un ecran de reclama. */}
      <p className="muted today__promise">
        Cardul poarta referinta, ca oricine sa poata deschide Biblia si sa verifice.
      </p>

      <canvas ref={canvasRef} style={{ display: "none" }} aria-hidden="true" />
    </section>
  )
}
