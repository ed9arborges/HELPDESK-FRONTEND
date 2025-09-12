// Formats an id to a fixed length (default 5), slicing then left-padding with zeros.
// Examples:
//  - formatId("123") => "00123"
//  - formatId("123456") => "12345"
//  - formatId(42, 6) => "000042"
export function formatId(value: string | number, size = 5): string {
  const str = String(value ?? "")
  const sliced = str.slice(0, size)
  return sliced.padStart(size, "0")
}
