import { useEffect, useState } from "react"
import type { CSSProperties, ReactNode } from "react"
import {
  Award,
  BookOpen,
  Calendar,
  Flame,
  HeartHandshake,
  Moon,
  Search,
  Sparkles,
  Sun,
  Users,
} from "lucide-react"
import {
  Avatar,
  Badge,
  Button,
  Card,
  Chip,
  Field,
  GradientPlaceholder,
  ListRow,
  ProgressBar,
  Row,
  SegmentedControl,
  Sheet,
  Skeleton,
  Stack,
  TextArea,
  ToastProvider,
  useToast,
} from "."

const wrap: CSSProperties = {
  maxWidth: 480,
  margin: "0 auto",
  padding: "var(--space-5)",
  minHeight: "100dvh",
  background: "var(--bg)",
}
const sectionStyle: CSSProperties = { marginTop: "var(--space-6)" }
const h1Style: CSSProperties = { fontSize: "var(--text-2xl)", margin: 0 }
const introStyle: CSSProperties = { fontSize: "var(--text-sm)", marginTop: "var(--space-2)" }
const cardTitleStyle: CSSProperties = { fontSize: "var(--text-lg)", margin: 0 }
const cardTextStyle: CSSProperties = { fontSize: "var(--text-sm)", margin: 0 }
const skelStackStyle: CSSProperties = { flex: 1 }
const spacerStyle: CSSProperties = { height: "var(--space-12)" }

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Stack gap={3} style={sectionStyle}>
      <span className="ds-eyebrow">{title}</span>
      {children}
    </Stack>
  )
}

function GalleryInner() {
  const toast = useToast()
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [seg, setSeg] = useState("lunar")
  const [chip, setChip] = useState("adolescenti")
  const [sheetOpen, setSheetOpen] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    return () => {
      delete document.documentElement.dataset.theme
    }
  }, [theme])

  return (
    <div style={wrap}>
      <Row justify="space-between">
        <h1 className="ds-display" style={h1Style}>
          Emanus DS
        </h1>
        <Button
          variant="secondary"
          size="sm"
          iconLeft={theme === "light" ? Moon : Sun}
          onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
        >
          {theme === "light" ? "Dark" : "Light"}
        </Button>
      </Row>
      <p className="ds-muted" style={introStyle}>
        Fundația vizuală — tokens, primitive, iconițe Lucide, placeholdere gradient.
      </p>

      <Section title="Butoane">
        <Stack gap={2}>
          <Row gap={2} wrap>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
          </Row>
          <Row gap={2} wrap>
            <Button variant="gold" iconLeft={HeartHandshake}>
              Dăruiește
            </Button>
            <Button variant="danger">Urgență</Button>
            <Button loading>Se încarcă</Button>
          </Row>
          <Button variant="primary" block iconLeft={Sparkles}>
            Începe lecția
          </Button>
        </Stack>
      </Section>

      <Section title="Card + placeholder">
        <Card variant="elevated">
          <Stack gap={3}>
            <GradientPlaceholder ratio="16 / 9" variant="hero" label="Ilustrație — vine la final" />
            <h2 className="ds-display" style={cardTitleStyle}>
              Cine sunt eu?
            </h2>
            <p className="ds-muted" style={cardTextStyle}>
              6 lecții despre identitate în Cristos.
            </p>
            <ProgressBar value={60} max={100} label="Progres" showValue />
          </Stack>
        </Card>
      </Section>

      <Section title="Segmented + chips">
        <SegmentedControl
          ariaLabel="Recurență"
          value={seg}
          onChange={setSeg}
          options={[
            { value: "odata", label: "O singură dată" },
            { value: "lunar", label: "Lunar" },
          ]}
        />
        <Row gap={2} wrap>
          {["copii", "adolescenti", "parinti"].map((v) => (
            <Chip key={v} selected={chip === v} onClick={() => setChip(v)}>
              {v}
            </Chip>
          ))}
        </Row>
      </Section>

      <Section title="List rows">
        <Stack gap={2}>
          <ListRow
            icon={BookOpen}
            title="Nu ești ce postezi"
            subtitle="4 min · Identitate"
            onClick={() => toast.show("Deschid lecția")}
          />
          <ListRow icon={Flame} title="Pace peste frică" subtitle="Emoții · 6 lecții" meta="Nou" onClick={() => {}} />
          <ListRow icon={Users} title="Prietenii & presiunea" subtitle="Blocat" locked />
        </Stack>
      </Section>

      <Section title="Formulare">
        <Stack gap={3}>
          <Field label="Email" placeholder="nume@email.com" icon={Search} hint="Nu-l facem public." />
          <Field label="Parolă" type="password" error="Minim 8 caractere" />
          <TextArea label="Ce ai pe suflet?" placeholder="Scrie liber…" />
        </Stack>
      </Section>

      <Section title="Badge, avatar, skeleton">
        <Row gap={2} wrap>
          <Badge tone="accent">Nivel 4</Badge>
          <Badge tone="gold" dot>
            Mentor
          </Badge>
          <Badge tone="success">Răspunsă</Badge>
          <Badge tone="danger" dot>
            Urgent
          </Badge>
        </Row>
        <Row gap={2}>
          <Avatar name="Andrei Marin" ring />
          <Avatar name="David" size="sm" />
          <Avatar name="Maria" size="lg" />
          <Award size={22} />
          <Calendar size={22} />
        </Row>
        <Card>
          <Row gap={3}>
            <Skeleton variant="circle" width={42} height={42} />
            <Stack gap={2} style={skelStackStyle}>
              <Skeleton variant="text" width="70%" />
              <Skeleton variant="text" width="40%" />
            </Stack>
          </Row>
        </Card>
      </Section>

      <Section title="Overlay">
        <Row gap={2} wrap>
          <Button variant="secondary" onClick={() => setSheetOpen(true)}>
            Deschide sheet
          </Button>
          <Button variant="ghost" onClick={() => toast.show("Salvat cu succes", "success")}>
            Toast succes
          </Button>
          <Button variant="ghost" onClick={() => toast.show("Ceva n-a mers", "danger")}>
            Toast eroare
          </Button>
        </Row>
      </Section>

      <div style={spacerStyle} />

      <Sheet open={sheetOpen} onClose={() => setSheetOpen(false)} title="Cerere de rugăciune">
        <Stack gap={4}>
          <TextArea placeholder="Pentru ce să ne rugăm?" />
          <Button variant="primary" block iconLeft={HeartHandshake} onClick={() => setSheetOpen(false)}>
            Trimite cererea
          </Button>
        </Stack>
      </Sheet>
    </div>
  )
}

export function Gallery() {
  return (
    <ToastProvider>
      <GalleryInner />
    </ToastProvider>
  )
}
