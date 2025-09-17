// jest-dom adds custom jest matchers for asserting on DOM nodes.
import "@testing-library/jest-dom"

// Polyfill TextEncoder/TextDecoder for Jest (some libs like react-router expect them)
// Node's util provides these in modern versions; ensure they exist on the global object.
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
  const { TextEncoder, TextDecoder } = require("util")
  // @ts-ignore - augment global for test environment
  if (typeof (global as any).TextEncoder === "undefined")
    (global as any).TextEncoder = TextEncoder
  // @ts-ignore
  if (typeof (global as any).TextDecoder === "undefined")
    (global as any).TextDecoder = TextDecoder
} catch (e) {
  // If util.TextEncoder isn't available, tests may run on very old Node versions.
  // In that case leave it and let the test error guide the user to upgrade Node or add a polyfill package.
}
