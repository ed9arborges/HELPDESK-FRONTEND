export function formatCurrency(value: number | string) {
  const currency = Intl.NumberFormat("pt-pt", {
    style: "currency",
    currency: "EUR",
  })
  if (typeof value === "string") {
    const parsed = parseFloat(value)
    if (isNaN(parsed)) return "--"
    return currency.format(parsed)
  }
  return currency.format(value)
}

/*
 function formatCurrency(value?: number) {
    if (typeof value !== "number") return "--"
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
  }
*/
