/**
 * Generates a full URL for the user's avatar image
 * @param avatarImg The avatar image filename
 * @returns The full URL to the avatar image or undefined if no avatar is available
 */
export const getAvatarUrl = (avatarImg?: string): string | undefined => {
  if (!avatarImg) return undefined

  // Use Vite's env only; ensure VITE_API_URL is set in builds (Vercel/preview/prod)
  const API_URL: string =
    ((import.meta as any)?.env?.VITE_API_URL as string) ||
    "http://localhost:3333"

  // Normalize trailing slash to avoid double slashes
  const base = API_URL.replace(/\/$/, "")
  return `${base}/uploads/avatars/${avatarImg}`
}
