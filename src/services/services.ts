import { api } from "./api"

// Ticket service helper functions
export async function startTicket(id: string) {
  const { data } = await api.post(`/tickets/${id}/start`)
  return data.ticket as any
}

export async function closeTicket(id: string) {
  const { data } = await api.post(`/tickets/${id}/close`)
  return data.ticket as any
}

export async function reopenTicket(id: string) {
  const { data } = await api.post(`/tickets/${id}/reopen`)
  return data.ticket as any
}
