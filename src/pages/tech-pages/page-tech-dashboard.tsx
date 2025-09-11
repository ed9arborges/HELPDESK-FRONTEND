import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { AxiosError } from "axios"

import Text from "@core-components/text"

import { api } from "@/services/api"

import { TicketLine } from "@/components/ticket-line"
import { formatCurrency } from "@/utils/format-currency"

const PER_PAGE = 5

export function PageTechDashboard() {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [tickets, setTickets] = useState<TicketItemProps[]>([])
  const [isLoading, setIsLoading] = useState(true)

  async function loadTickets() {
    setIsLoading(true)
    try {
      const { data } = await api.get<TicketsPaginationAPIResponse>(
        `/tickets?page=${page}&perPage=${PER_PAGE}`
      )

      setTickets(
        data.tickets.map((r) => ({
          id: r.id,
          userId: r.userId,
          title: r.title,
          category: r.category,
          estimate: formatCurrency(r.estimate),
          status: r.status,
          createdAt: r.createdAt,
          updatedAt: r.updatedAt,
          user: { name: r.user?.name },
        }))
      )
      setTotalPages(data.pagination.totalPages)
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError) {
        return alert(error.response?.data.message)
      }
      alert("Failed to load tickets")
    } finally {
      setIsLoading(false)
    }
  }

  function handlePagination(action: "next" | "previous") {
    setPage((prevPage) => {
      if (action === "next" && prevPage < totalPages) {
        return prevPage + 1
      }
      if (action === "previous" && prevPage > 1) {
        return prevPage - 1
      }
      return prevPage
    })
  }

  useEffect(() => {
    loadTickets()
  }, [page])

  const mdGridClass =
    "md:[grid-template-columns:minmax(6rem,12%)_minmax(4rem,8%)_1fr_minmax(8rem,16%)_minmax(6rem,10%)_minmax(8rem,12%)_minmax(8rem,12%)_minmax(3rem,4%)]"

  const viewHandle = (id: string) => {
    navigate(`/tickets/${id}`)
  }

  return (
    <>
      <div className="bg-blue-600 p-4">
        <Text>All Tickets</Text>
      </div>

      <main className="relative rounded-lg overflow-hidden border border-gray-500 w-full md:max-w-6xl mx-auto bg-white">
        <div
          className={`grid grid-cols-12 ${mdGridClass} items-center h-12 border-b border-gray-500 px-3 min-w-0`}
        >
          <div className="col-span-3 md:col-auto flex items-center min-w-0">
            <Text variant="text-sm" className="truncate">
              Updated at
            </Text>
          </div>

          <div className="hidden md:flex items-center min-w-0">
            <Text variant="text-sm" className="truncate">
              Id
            </Text>
          </div>

          <div className="col-span-6 md:col-auto flex items-center min-w-0">
            <Text variant="text-sm" className="truncate">
              Title
            </Text>
          </div>

          <div className="hidden md:flex items-center min-w-0">
            <Text variant="text-sm" className="truncate">
              Service
            </Text>
          </div>

          <div className="hidden md:flex items-center min-w-0">
            <Text variant="text-sm" className="truncate">
              Total
            </Text>
          </div>

          <div className="hidden md:flex items-center min-w-0">
            <Text variant="text-sm" className="truncate">
              Customer
            </Text>
          </div>

          <div className="col-span-2 md:col-auto flex items-center min-w-0">
            <Text variant="text-sm" className="truncate">
              Status
            </Text>
          </div>

          <div
            className="col-span-1 md:col-auto flex items-center justify-center"
            aria-hidden
          />
        </div>

        {isLoading && (
          <div
            className={`grid grid-cols-12 ${mdGridClass} items-center h-16 border-b border-gray-500 px-3`}
          >
            <div className="col-span-12 flex items-center justify-center">
              <Text variant="text-sm">Loading...</Text>
            </div>
          </div>
        )}

        {!isLoading && tickets.length === 0 && (
          <div
            className={`grid grid-cols-12 ${mdGridClass} items-center h-16 border-b border-gray-500 px-3`}
          >
            <div className="col-span-12 flex items-center justify-center">
              <Text variant="text-sm">No tickets found</Text>
            </div>
          </div>
        )}

        {!isLoading &&
          tickets.map((r) => (
            <TicketLine key={r.id} data={r} onView={() => viewHandle(r.id)} />
          ))}

        <div className="hidden md:block" />
      </main>

      <div className="flex gap-2 mt-4">
        <button
          className="px-3 py-2 bg-gray-500 text-white rounded"
          onClick={() => handlePagination("previous")}
        >
          Previous
        </button>
        <button
          className="px-3 py-2 bg-gray-500 text-white rounded"
          onClick={() => handlePagination("next")}
        >
          Next
        </button>
      </div>
    </>
  )
}
