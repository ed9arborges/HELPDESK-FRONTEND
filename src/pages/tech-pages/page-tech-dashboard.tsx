import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router"
import { AxiosError } from "axios"

import Text from "@core-components/text"
import MainContent from "@core-components/main-content"

import { api } from "@services/api"
import { startTicket, closeTicket } from "@services/services"

import { TicketCard } from "@components/ticket-card"
import { formatCurrency } from "@utils/format-currency"
import Tag from "@core-components/tag"

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
          serviceId: r.serviceId,
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
  const handlePrimary = async (ticket: TicketItemProps) => {
    try {
      setAssigningId(ticket.id)
      if (ticket.status === "open") {
        await startTicket(ticket.id)
        // After start, navigate to detail maybe for action
        await loadTickets()
        navigate(`/tickets/${ticket.id}`)
      } else if (ticket.status === "in_progress") {
        await closeTicket(ticket.id)
        await loadTickets()
      } else if (ticket.status === "closed") {
        navigate(`/tickets/${ticket.id}`)
      }
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError) {
        return alert(error.response?.data.message)
      }
      alert("Action failed")
    } finally {
      setAssigningId(null)
    }
  }

  return (
    <MainContent>
      <MainContent.Header>Available Tickets</MainContent.Header>

      {isLoading && (
        <div className="p-6">
          <Text variant="text-sm">Loading...</Text>
        </div>
      )}

      {!isLoading && (
        <div className="pb-12 flex flex-col gap-6">
          {/* In progress */}
          <div className="flex flex-col gap-4">
            <Tag variant="info" className="self-start">
              In Progress
            </Tag>
            <div className="flex flex-wrap gap-4">
              {groups.in_progress.map((t) => {
                return (
                  <TicketCard
                    key={t.id}
                    ticket={t}
                    primaryLabel="Close"
                    onPrimary={() => handlePrimary(t)}
                    onEdit={handleEdit}
                    disabledPrimary={assigningId === t.id}
                    disabledEdit={assigningId === t.id}
                  />
                )
              })}
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
                  onPrimary={() => handlePrimary(t)}
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
                  onPrimary={() => handlePrimary(t)}
                  onEdit={handleEdit}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </MainContent>
  )
}

//
