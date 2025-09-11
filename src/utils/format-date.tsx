

export function formatDate(value?: string) {
    if (!value) return "--"
    try {
      const d = new Date(value)
      return d.toLocaleString("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
      })
    } catch {
      return value
    }
  }