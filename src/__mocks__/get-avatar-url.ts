export const getAvatarUrl = (avatarImg?: string): string | undefined => {
  if (!avatarImg) return undefined
  return `http://localhost:3333/uploads/avatars/${avatarImg}`
}

export default getAvatarUrl
