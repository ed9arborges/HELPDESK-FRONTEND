import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { AxiosError } from "axios"

import MainContent from "@core-components/main-content"
import Text from "@core-components/text"
import Tag from "@core-components/tag"
import Avatar from "@core-components/avatar"
import { Button } from "@/core-components/button"

import IconPen from "@assets/icons/pen-line.svg?react"

import { api } from "@/services/api"
import { formatDate } from "@/utils/format-date"
import { formatCurrency } from "@/utils/format-currency"
import { getInitials } from "@/utils/get-initials"
import { formatId } from "@/utils/format-id"
import { useServicesCatalog } from "@/hooks/useServicesCatalog"
import { AlertModal } from "@/components/alert-modal"

const PER_PAGE = 30

export function PageAdminTickets() {
  const navigate = useNavigate()
  const [tickets, setTickets] = useState<TicketItemProps[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [alertMsg, setAlertMsg] = useState<string | null>(null)
  const { getNameById } = useServicesCatalog()

  async function loadTickets() {
    setIsLoading(true)
    try {
      const { data } = await api.get<TicketsPaginationAPIResponse>(
        `/tickets?page=1&perPage=${PER_PAGE}`
      )

      setTickets(
        data.tickets.map((r) => ({
          id: r.id,
          userId: r.userId,
          title: r.title,
          serviceId: (r as any).serviceId,
          estimate: r.estimate,
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
        setAlertMsg(error.response?.data.message || "Failed to load tickets")
      } else {
        setAlertMsg("Failed to load tickets")
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadTickets()
  }, [])

  const mdGridClass =
    "md:[grid-template-columns:minmax(7rem,12%)_minmax(4rem,8%)_1fr_minmax(8rem,14%)_minmax(10rem,16%)_minmax(10rem,16%)_minmax(8rem,12%)_minmax(3rem,4%)]"

  const statusLabel = (status?: string) => {
    if (!status) return "--"
    if (status === "in_progress") return "In progress"
    if (status === "closed") return "Closed"
    return "Open"
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
      <MainContent.Header>Tickets</MainContent.Header>

      <main className="relative rounded-lg overflow-hidden border border-gray-500 w-full md:max-w-6xl mx-auto bg-white">
        {/* Header */}
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
              Title & Service
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
          />
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
          tickets.map((t) => {
            return (
              <div
                key={t.id}
                className={`grid grid-cols-12 ${mdGridClass} items-center h-16 border-b border-gray-500 px-3 min-w-0`}
              >
                {/* Updated at */}
                <div className="col-span-3 md:col-auto flex items-center min-w-0">
                  <Text variant="text-xs" className="truncate">
                    {formatDate(t.updatedAt || t.createdAt)}
                  </Text>
                </div>

                {/* Id */}
                <div className="hidden md:flex items-center min-w-0">
                  <Text variant="text-xs" className="truncate">
                    {formatId(t.id, 5)}
                  </Text>
                </div>

                {/* Title & Service */}
                <div className="col-span-6 md:col-auto flex flex-col min-w-0">
                  <Text variant="text-sm" className="truncate">
                    {t.title}
                  </Text>
                  <Text variant="text-xs" className="truncate">
                    {getNameById((t as any)?.serviceId)}
                  </Text>
                </div>

                {/* Total */}
                <div className="hidden md:flex items-center min-w-0">
                  <Text variant="text-sm" className="truncate">
                    {formatCurrency(Number(t.estimate) as number)}
                  </Text>
                </div>

                {/* Customer */}
                <div className="hidden md:flex items-center min-w-0">
                  <Avatar size="small">
                    <span className="text-xs text-gray-600 font-normal">
                      {getInitials(t.user?.name || "--")}
                    </span>
                  </Avatar>
                  <Text variant="text-sm" className="truncate ml-2">
                    {t.user?.name || "--"}
                  </Text>
                </div>

                {/* Technician */}
                <div className="hidden md:flex items-center min-w-0">
                  <Avatar size="small">
                    <span className="text-xs text-gray-600 font-normal">
                      {getInitials(t.tech?.name || "--")}
                    </span>
                  </Avatar>
                  <Text variant="text-sm" className="truncate ml-2">
                    {t.tech?.name || "--"}
                  </Text>
                </div>

                {/* Status */}
                <div className="col-span-2 md:col-auto flex items-center min-w-0">
                  <Tag
                    variant={
                      t.status === "open"
                        ? "new"
                        : t.status === "in_progress"
                        ? "info"
                        : t.status === "closed"
                        ? "success"
                        : "danger"
                    }
                  >
                    {statusLabel(t.status)}
                  </Tag>
                </div>

                {/* Action */}
                <div className="col-span-1 md:col-auto flex items-center justify-center min-w-0">
                  <Button
                    onClick={() => navigate(`/tickets/${t.id}`)}
                    icon={IconPen}
                    className="flex-shrink-0"
                    size="sm"
                    variant="secondary"
                    aria-label="Edit ticket"
                  />
                </div>
              </div>
            )
          })}
      </main>
    </MainContent>
  )
}

export default PageAdminTickets
