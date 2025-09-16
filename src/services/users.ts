import { api } from "./api"

export type SimpleUser = {
  id: string
  name: string
  email: string
  role: "customer" | "tech" | "admin"
  avatarImg?: string
}

export type UsersListResponse = {
  users: SimpleUser[]
  pagination: {
    page: number
    perPage: number
    totalRecords: number
    totalPages: number
  }
}

export async function listUsers(params?: {
  role?: "customer" | "tech" | "admin"
  page?: number
  perPage?: number
  search?: string
}) {
  const { data } = await api.get<UsersListResponse>(`/users`, { params })
  return data
}

export async function updateUserRole(id: string, role: "customer" | "tech") {
  const { data } = await api.patch<{ user: SimpleUser }>(`/users/${id}/role`, {
    role,
  })
  return data.user
}

export async function deleteUser(id: string) {
  await api.delete(`/users/${id}`)
}
