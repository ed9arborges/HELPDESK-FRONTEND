import { api } from "./api"

// Upload avatar image
export const uploadAvatar = async (
  file: File
): Promise<{ user: any; message: string }> => {
  const formData = new FormData()
  formData.append("avatar", file)

  const response = await api.patch("/users/me/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })

  return response.data
}

// Delete avatar image
export const deleteAvatar = async (): Promise<{
  user: any
  message: string
}> => {
  const response = await api.delete("/users/me/avatar")
  return response.data
}
