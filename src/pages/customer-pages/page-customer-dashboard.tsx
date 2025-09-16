import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { AxiosError } from "axios"

import Text from "@core-components/text"

import { api } from "@/services/api"

import { TicketLine } from "@/components/ticket-line"
import { formatCurrency } from "@/utils/format-currency"
import { AlertModal } from "@/components/alert-modal"

import MainContent from "@core-components/main-content"

const PER_PAGE = 5

export function PageCustomerDashboard() {
  const navigate = useNavigate()
  // const [name, setName] = useState("")
  const [page] = useState(1)
  const [tickets, setTickets] = useState<TicketItemProps[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [alertMsg, setAlertMsg] = useState<string | null>(null)

  async function loadRequests() {
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
          serviceId: r.serviceId,
          estimate: formatCurrency(r.estimate),
          // Format the total value if available, otherwise use the estimate
          totalValue: r.totalValue ? formatCurrency(r.totalValue) : undefined,
          status: r.status,
          createdAt: r.createdAt,
          updatedAt: r.updatedAt,
          user: { name: r.user?.name },
          tech: r.tech ? { name: r.tech.name } : undefined,
        }))
      )
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError) {
        return setAlertMsg(
          error.response?.data.message || "Failed to load tickets"
        )
      }
      setAlertMsg("Failed to load tickets")
    } finally {
      setIsLoading(false)
    }
  }

  // function handlePagination(action: "next" | "previous") {
  //   setPage((prevPage) => {
  //     if (action === "next" && prevPage < totalPages) {
  //       return prevPage + 1
  //     }
  //     if (action === "previous" && prevPage > 1) {
  //       return prevPage - 1
  //     }
  //     return prevPage
  //   })
  // }

  useEffect(() => {
    loadRequests()
  }, [page])

  // Tailwind arbitrary grid template for md+ (keeps header and rows aligned)
  const mdGridClass =
    "md:[grid-template-columns:minmax(6rem,12%)_minmax(4rem,8%)_1fr_minmax(8rem,16%)_minmax(6rem,10%)_minmax(8rem,12%)_minmax(8rem,12%)_minmax(3rem,4%)]"

  const viewHandle = (id: string) => {
    // Adjust route when detail page exists
    navigate(`/tickets/${id}`)
  }

  return (
    <MainContent>
      {alertMsg && (
        <AlertModal
          title="Error"
          description={alertMsg}
          onClose={() => setAlertMsg(null)}
        />
      )}
      <MainContent.Header>My Tickets</MainContent.Header>

      <main className="relative rounded-lg overflow-hidden border border-gray-500 w-full md:max-w-6xl mx-auto bg-white">
        {/* Header (mobile: 12-col layout showing only Atualizado em, Título, Status, View; md+: explicit template) */}
        <div
          className={`grid grid-cols-12 ${mdGridClass} items-center h-12 border-b border-gray-500 px-3 min-w-0`}
        >
          <div className="col-span-3 md:col-auto flex items-center min-w-0">
            <Text variant="text-sm" className="truncate">
              Updated at
            </Text>
          </div>

          {/* id hidden on mobile */}
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

          {/* serviço hidden on mobile */}
          <div className="hidden md:flex items-center min-w-0">
            <Text variant="text-sm" className="truncate">
              Service
            </Text>
          </div>

          {/* valor total hidden on mobile */}
          <div className="hidden md:flex items-center min-w-0">
            <Text variant="text-sm" className="truncate">
              Total
            </Text>
          </div>

          {/* técnico hidden on mobile */}
          <div className="hidden md:flex items-center min-w-0">
            <Text variant="text-sm" className="truncate">
              Technician
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
          >
            {/* actions column */}
          </div>
        </div>

        {/* Rows */}
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

        {/* Mobile stacked list fallback (if you want full card style, keep below — else remove) */}
        <div className="hidden md:block" />
      </main>
    </MainContent>
  )
}
