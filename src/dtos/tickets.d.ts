type TicketAPIResponse = {
  id: string
  userId: string
  title: string
  description?: string
  status: RequestStatusEnum
  createdAt: string
  updatedAt: string
  user: { id?: string; name?: string }
  tech?: { id?: string; name?: string } | null
  estimate: number
  // extras added to ticket (ex-Services)
  service?: Array<{
    id: string
    name: string
    amount: number
    createdAt?: string
    updatedAt?: string
  }>
}

type TicketsPaginationAPIResponse = {
  tickets: TicketAPIResponse[]
  pagination: {
    page: number
    perPage: number
    totalRecords: number
    totalPages: number
  }
}

type TicketItemProps = {
  id: string
  userId: string
  title: string
  // reference to catalog service category
  serviceId?: string
  // Optional loaded relation with service details (API may return as array)
  service?: Array<{
    id: string
    name?: string
    amount?: number
    createdAt?: string
    updatedAt?: string
  }>
  // Some endpoints/mappers may provide a pre-resolved label
  serviceName?: string
  estimate: number | string
  status: TicketStatusEnum
  createdAt: string
  updatedAt: string
  user?: { name?: string }
  tech?: { name?: string }
}

enum TicketStatusEnum {
  open = "open",
  in_progress = "in_progress",
  closed = "closed",
}

type TechTicketUpdate = {
  title?: string
  description?: string
  status?: keyof typeof TicketStatusEnum
  estimate?: number
  techId?: string | null
}
