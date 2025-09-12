import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router"
import { AxiosError } from "axios"

import Text from "@core-components/text"
import { MainContentHeader } from "@/components/main-content-header"

import { api } from "@/services/api"

import { TicketCard } from "@/components/ticket-card"
import { formatCurrency } from "@/utils/format-currency"
import Tag from "@/core-components/tag"

const PER_PAGE = 30

export function PageTechDashboard() {
  const navigate = useNavigate()
  const [tickets, setTickets] = useState<TicketItemProps[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [assigningId, setAssigningId] = useState<string | null>(null)

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
          category: r.category,
          estimate: formatCurrency(r.estimate),
          status: r.status,
          createdAt: r.createdAt,
          updatedAt: r.updatedAt,
          user: { name: r.user?.name },
        }))
      )
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

  useEffect(() => {
    loadTickets()
  }, [])

  const groups = useMemo(() => {
    return {
      in_progress: tickets.filter((t) => t.status === "in_progress"),
      open: tickets.filter((t) => t.status === "open"),
      closed: tickets.filter((t) => t.status === "closed"),
    }
  }, [tickets])

  const handleEdit = (id: string) => navigate(`/tickets/${id}`)
  const handleStart = async (id: string) => {
    // Tech can self-assign to start working on an open ticket
    try {
      setAssigningId(id)
      await api.post(`/tickets/${id}/assign-self`)
      // Refresh list and go to detail
      await loadTickets()
      navigate(`/tickets/${id}`)
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError) {
        return alert(error.response?.data.message)
      }
      alert("Fail to start the service")
    } finally {
      setAssigningId(null)
    }
  }

  return (
    <section className="w-full">
      <div className="flex flex-col items-start gap-6 pt-13 md:px-12 pb-12">
        <MainContentHeader>Available Tickets</MainContentHeader>
      </div>

      {isLoading && (
        <div className="p-6">
          <Text variant="text-sm">Loading...</Text>
        </div>
      )}

      {!isLoading && (
        <div className="md:px-12 pb-12 flex flex-col gap-6">
          {/* In progress */}
          <div className="flex flex-col gap-4">
            <Tag variant="info" className="self-start">
              In Progress
            </Tag>
            <div className="flex flex-wrap gap-4">
              {groups.in_progress.map((t) => (
                <TicketCard
                  key={t.id}
                  ticket={t}
                  primaryLabel="Close"
                  onPrimary={handleEdit}
                  onEdit={handleEdit}
                />
              ))}
            </div>
          </div>

          {/* Open */}
          <div className="flex flex-col gap-4">
            <Tag variant="new" className="self-start">
              Open
            </Tag>
            <div className="flex flex-wrap gap-4">
              {groups.open.map((t) => (
                <TicketCard
                  key={t.id}
                  ticket={t}
                  primaryLabel="Process"
                  onPrimary={handleStart}
                  disabledPrimary={assigningId === t.id}
                  disabledEdit={assigningId === t.id}
                  onEdit={handleEdit}
                />
              ))}
            </div>
          </div>

          {/* Closed */}
          <div className="flex flex-col gap-4">
            <Tag variant="success" className="self-start">
              Closed
            </Tag>
            <div className="flex flex-wrap gap-4">
              {groups.closed.map((t) => (
                <TicketCard
                  key={t.id}
                  ticket={t}
                  primaryLabel="Ver"
                  onPrimary={handleEdit}
                  onEdit={handleEdit}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

//
