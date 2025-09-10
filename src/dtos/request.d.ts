type RequestAPIResponse = {
  id: string
  userId: string
  title: string
  category: CategoriesAPIEnum
  amount: number
  user: {
    name: string
  }
}

type RequestsPaginationAPIResponse = {
  requests: RequestAPIResponse[];
  pagination: {
    page: number;
    perPage: number;
    totalRecords: number;
    totalPages: number;
  };
};