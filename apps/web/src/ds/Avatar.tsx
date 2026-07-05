type Size = "sm" | "md" | "lg"

export interface AvatarProps {
  name?: string
  src?: string
  size?: Size
  ring?: boolean
}

function initials(name?: string): string {
  if (!name) return ""
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
}

export function Avatar({ name, src, size = "md", ring = false }: AvatarProps) {
  const cls = ["ds-avatar", size !== "md" ? `ds-avatar--${size}` : null, ring ? "ds-avatar--ring" : null]
    .filter(Boolean)
    .join(" ")
  return (
    <span className={cls} aria-label={name}>
      {src ? <img src={src} alt={name ?? ""} /> : initials(name)}
    </span>
  )
}
