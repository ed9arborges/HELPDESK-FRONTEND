  export function statusVariant(status?: string) {
    if (!status) return "danger"
    if (status === "in_progress") return "info"
    if (status === "closed") return "success"
    return "new"
  }