export function formatCurrency(value: number) {
  const currency = Intl.NumberFormat("pt-pt", {
    style: "currency",
    currency: "EUR",
  })

  return currency.format(value).replace("€","")
}