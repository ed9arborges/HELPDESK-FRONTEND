type TicketAPIResponse = {
  id: string
  userId: string
  title: string
  description?: string
  category: CategoriesAPIEnum
  estimate: number
  status: RequestStatusEnum
  createdAt: string
  updatedAt: string
  user: { id?: string; name?: string }
  tech?: { id?: string; name?: string } | null
  parts?: Array<{
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
  category: string
  estimate: string
  status: TicketStatusEnum
  createdAt: string
  updatedAt: string
  user?: { name?: string }
}

enum TicketStatusEnum {
  open = "open",
  in_progress = "in_progress",
  closed = "closed",
}

type TechTicketUpdate = {
  title?: string
  description?: string
  category?: keyof typeof CategoriesAPIEnum
  status?: keyof typeof TicketStatusEnum
  estimate?: number
  techId?: string | null
}
