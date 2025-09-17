/**
 * Generates a full URL for the user's avatar image
 * @param avatarImg The avatar image filename
 * @returns The full URL to the avatar image or undefined if no avatar is available
 */
export const getAvatarUrl = (avatarImg?: string): string | undefined => {
  if (!avatarImg) return undefined

  // Resolve API URL from common runtime locations (process.env for tests, Vite provides import.meta.env at build/runtime)
  // Avoid direct `import.meta` usage so ts-jest can compile this file.
  const env =
    (globalThis as any)?.process?.env || (globalThis as any)?.__VITE_ENV__ || {}
  const API_URL = env.VITE_API_URL || "http://localhost:3333"
  return `${API_URL}/uploads/avatars/${avatarImg}`
}
