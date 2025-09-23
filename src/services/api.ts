import axios from "axios"

// Resolve API base URL from Vite env at build/runtime, fallback to process.env for tests, then localhost
const viteEnv =
  (typeof import.meta !== "undefined" && (import.meta as any)?.env) || undefined
const nodeEnv = (globalThis as any)?.process?.env || undefined
const API_URL: string =
  (viteEnv?.VITE_API_URL as string) ||
  (nodeEnv?.VITE_API_URL as string) ||
  "http://localhost:3333"

export const api = axios.create({
  baseURL: API_URL,
})
