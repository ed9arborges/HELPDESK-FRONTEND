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
  user: { name?: string }
}

type TicketsPaginationAPIResponse = {
  tickets: TicketAPIResponse[];
  pagination: {
    page: number;
    perPage: number;
    totalRecords: number;
    totalPages: number;
  };
};

type TicketItemProps = {
  id: string
  userId: string
  title: string
  category: string
  estimate: string
  status: string
  createdAt: string
  updatedAt: string
  user?: { name?: string }
}


enum TicketStatusEnum {
  open = "open",
  in_progress = "in_progress",
  closed = "closed",
}


