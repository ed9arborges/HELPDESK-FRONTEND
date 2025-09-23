import axios from "axios"

// Use only Vite env; set VITE_API_URL in Vercel/production
const API_URL: string =
  ((import.meta as any)?.env?.VITE_API_URL as string) || "http://localhost:3333"

// Normalize trailing slash for consistency
const baseURL = API_URL.replace(/\/$/, "")

export const api = axios.create({
  baseURL,
})
