/**
 * Generates a full URL for the user's avatar image
 * @param avatarImg The avatar image filename
 * @returns The full URL to the avatar image or undefined if no avatar is available
 */
export const getAvatarUrl = (avatarImg?: string): string | undefined => {
  if (!avatarImg) return undefined

  // Get the API URL from environment or use default
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3333"
  return `${API_URL}/uploads/avatars/${avatarImg}`
}
