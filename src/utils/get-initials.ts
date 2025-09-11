// Returns initials derived from a person's full name.
// Examples:
//  - "John Doe" -> "JD"
//  - "Ana" -> "AN"
//  - "  maria   das  dores  " -> "MD"
export function getInitials(name?: string): string {
  if (!name) return "?"
  const parts = name.trim().split(/\s+/).filter(Boolean)

  if (parts.length === 0) return "?"
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}
