# Emanus Design System (`src/ds`)

Premium, real-world UI foundation for the Emanus app. Theme: **Marea de cristal** (light default + dark).

## Principles
- **Tokens first.** Components only read semantic CSS variables from `tokens.css`
  (`--surface`, `--text`, `--accent`, `--space-*`, `--radius-*`, `--shadow-*`,
  motion + type scale). Never hardcode hex values in components or screens.
- **No emoji.** All iconography uses [Lucide](https://lucide.dev) line icons via
  the `Icon` wrapper (consistent 1.75 stroke weight + a11y).
- **Gradient placeholders.** Use `GradientPlaceholder` anywhere real
  illustration or animation will land. These get swapped for custom assets at
  the end of the project.
- **Accessible by default.** Focus rings, ARIA roles, reduced-motion support.

## Usage
```tsx
import { Button, Card, Stack, GradientPlaceholder } from "./ds"
import { HeartHandshake } from "lucide-react"

<Card variant="elevated">
  <Stack gap={3}>
    <GradientPlaceholder ratio="16 / 9" label="Ilustrație — vine la final" />
    <Button variant="primary" block iconLeft={HeartHandshake}>Susține Emanus</Button>
  </Stack>
</Card>
```

## Live gallery
Run the app and open `#/ds` to browse every component with a light/dark toggle.

## Components
Button · Card · Field / TextArea · ListRow · Chip · Badge · ProgressBar ·
Avatar · SegmentedControl · GradientPlaceholder · Skeleton · Stack / Row / Spacer ·
Sheet · Toast (`ToastProvider` + `useToast`).

## Roadmap
1. Foundation (this commit).
2. Migrate existing screens (Home, Onboarding, Lesson, Prayer, …) onto DS primitives, removing emoji.
3. Replace gradient placeholders with custom art + micro-animations.
