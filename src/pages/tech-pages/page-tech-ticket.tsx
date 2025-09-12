import { useEffect, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { AxiosError } from "axios"

import { api } from "@/services/api"
import { Button } from "@/core-components/button"
import Text from "@/core-components/text"
import SectionContainer from "@/components/section-container"
import Avatar from "@/core-components/avatar"
import Tag from "@/core-components/tag"
import { statusVariant } from "@/utils/status-variants"
import Container from "@/core-components/container"
import { getInitials } from "@/utils/get-initials"
import { formatDate } from "@/utils/format-date"
import { formatCurrency } from "@/utils/format-currency"
import { formatId } from "@/utils/format-id"

import ArrowLeftIcon from "@assets/icons/arrow-left.svg?react"
import CircleCheckBigIcon from "@assets/icons/circle-check-big.svg?react"
import Clock2Icon from "@assets/icons/clock-2.svg?react"
import PlusIcon from "@assets/icons/plus.svg?react"
import TrashIcon from "@assets/icons/trash.svg?react"
import WrenchIcon from "@assets/icons/wrench.svg?react"

const statusMap: Record<string, string> = {
  open: "Open",
  in_progress: "In Progress",
  closed: "Closed",
}

const categoryItems = [
  { value: "hardware", label: "Hardware" },
  { value: "data", label: "Data Recovery" },
  { value: "software", label: "Software" },
  { value: "web", label: "Web" },
  { value: "network", label: "Network" },
  { value: "virus", label: "VVirus" },
  { value: "peripherals", label: "Peripherals" },
  { value: "systems", label: "Systems" },
]

export function PageTechTicket() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [ticket, setTicket] = useState<TicketAPIResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [busy, setBusy] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      if (!id) return
      try {
        setIsLoading(true)
        const { data } = await api.get<TicketAPIResponse>(`/tickets/${id}`)
        setTicket(data)
      } catch (error) {
        console.log(error)
        if (error instanceof AxiosError) {
          alert(error.response?.data.message)
        } else {
          alert("Failed to load ticket data")
        }
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [id])

  const techId = (ticket as any)?.tech?.id as string | undefined

  function toDisplayCurrency(n?: number) {
    const num = typeof n === "number" && !isNaN(n) ? n : 0
    return formatCurrency(num)
  }

  const categoryLabel = useMemo(() => {
    const value = (ticket as any)?.category as string | undefined
    return categoryItems.find((c) => c.value === value)?.label ?? value ?? "-"
  }, [ticket])

  async function handleBack() {
    navigate(-1)
  }

  async function handleClose() {
    if (!id) return
    try {
      setBusy("close")
      const { data } = await api.post<{
        message: string
        ticket: TicketAPIResponse
      }>(`/tickets/${id}/close`)
      setTicket(data.ticket)
      alert("Ticket Closed")
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError)
        return alert(error.response?.data.message)
      alert("Failed to close ticket")
    } finally {
      setBusy(null)
    }
  }

  async function handleStart() {
    if (!id) return
    try {
      setBusy("start")
      const { data } = await api.post<{
        message: string
        ticket: TicketAPIResponse
      }>(`/tickets/${id}/start`)
      setTicket(data.ticket)
      alert("Ticket in progress")
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError)
        return alert(error.response?.data.message)
      alert("Failed to start ticket")
    } finally {
      setBusy(null)
    }
  }

  async function handleReopen() {
    if (!id) return
    try {
      setBusy("reopen")
      const { data } = await api.post<{
        message: string
        ticket: TicketAPIResponse
      }>(`/tickets/${id}/reopen`)
      setTicket(data.ticket)
      alert("Ticket reopened")
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError)
        return alert(error.response?.data.message)
      alert("Failed to reopen ticket")
    } finally {
      setBusy(null)
    }
  }

  if (isLoading || !ticket) {
    return (
      <section className="flex flex-col items-center gap-6 pt-[52px] pb-12 px-6 relative bg-gray-600 w-full">
        <div className="text-gray-300">Loading...</div>
      </section>
    )
  }

  const client = (ticket as any).user || (ticket as any).customer || {}
  const tech = (ticket as any).tech || {}

  const pricing = {
    basePrice: toDisplayCurrency((ticket as any).estimate ?? 0),
    additionals: toDisplayCurrency(0),
    total: toDisplayCurrency((ticket as any).estimate ?? 0),
  }

  // Placeholder additional services list (not in current schema)
  const additionalServices: Array<{ id: number; name: string; price: string }> =
    []

  return (
    <section className="flex flex-col items-center gap-6 pt-[52px] pb-12 px-6 relative bg-gray-600 w-full">
      <Container className="w-full max-w-[800px]">
        {/* Header section */}
        <header className="flex items-end justify-between gap-4 w-full">
          <div className="flex-1">
            <Button
              onClick={handleBack}
              aria-label="Back to previous page"
              variant="link"
              size="linksm"
              icon={ArrowLeftIcon}
            >
              Back
            </Button>
            <Text as="h1" variant="text-xl-bold" className="text-blue-dark">
              Ticket Details
            </Text>
          </div>

          <nav className="flex items-center gap-2">
            {(() => {
              const status = (ticket as any).status as string
              const canStart = status === "open"
              const canClose = status === "in_progress"
              const canReopen = status === "closed"

              return (
                <>
                  {canClose && (
                    <Button
                      onClick={handleClose}
                      disabled={busy === "close"}
                      variant="secondary"
                      icon={CircleCheckBigIcon}
                      aria-label="Close ticket"
                    >
                      {busy === "close" ? "Closing..." : "Close"}
                    </Button>
                  )}

                  {canStart && (
                    <Button
                      onClick={handleStart}
                      disabled={busy === "start"}
                      variant="primary"
                      icon={Clock2Icon}
                      aria-label="Begin ticket processing"
                    >
                      {busy === "start" ? "Processing..." : "Process"}
                    </Button>
                  )}

                  {canReopen && (
                    <Button
                      onClick={handleReopen}
                      disabled={busy === "reopen"}
                      variant="secondary"
                      icon={WrenchIcon}
                      aria-label="Reopen ticket"
                    >
                      {busy === "reopen" ? "Reopening..." : "Reopen"}
                    </Button>
                  )}
                </>
              )
            })()}
          </nav>
        </header>

        {/* Details section */}
        <div className="w-full flex flex-col md:flex-row items-stretch gap-6">
          <div className="w-full md:max-w-[480px] md:flex-none flex flex-col gap-3">
            <SectionContainer>
              <header className="flex items-start justify-between">
                <Text variant="text-xs" className="text-gray-400">
                  {formatId((ticket as any).id, 5)}
                </Text>
                <Tag variant={statusVariant((ticket as any).status)}>
                  {statusMap[(ticket as any).status] ?? (ticket as any).status}
                </Tag>
              </header>

              <Text as="h2" variant="text-md-bold" className="text-gray-100">
                {(ticket as any).title}
              </Text>

              <section>
                <Text variant="text-xs" className="text-gray-400">
                  Description
                </Text>
                <Text as="p" variant="text-sm" className="text-gray-200">
                  {(ticket as any).description || "-"}
                </Text>
              </section>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                <li>
                  <Text variant="text-xs" className="text-gray-400">
                    Category
                  </Text>
                  <Text variant="text-sm" className="text-gray-200">
                    {categoryLabel}
                  </Text>
                </li>
                <li>
                  <Text variant="text-xs" className="text-gray-400">
                    Created at
                  </Text>
                  <Text variant="text-xs" className="text-gray-200">
                    {formatDate((ticket as any).createdAt)}
                  </Text>
                </li>
                <li>
                  <Text variant="text-xs" className="text-gray-400">
                    Updated at
                  </Text>
                  <Text variant="text-xs" className="text-gray-200">
                    {formatDate((ticket as any).updatedAt)}
                  </Text>
                </li>
              </ul>

              <section className="mt-2">
                <Text variant="text-xs" className="text-gray-400">
                  Customer
                </Text>
                <div className="flex items-center gap-2">
                  <Avatar size="small">{getInitials(client.name)}</Avatar>
                  <Text
                    as="span"
                    variant="text-sm"
                    className="text-gray-200 truncate"
                  >
                    {client.name || "-"}
                  </Text>
                </div>
              </section>
            </SectionContainer>

            <SectionContainer>
              <header className="flex items-center justify-between">
                <Text variant="text-xs" className="text-gray-400">
                  Additional services
                </Text>
                <Button
                  variant="primary"
                  size="sm"
                  icon={PlusIcon}
                  aria-label="Add service"
                />
              </header>

              {additionalServices.length === 0 ? (
                <Text variant="text-xs" className="text-gray-400">
                  No additional services
                </Text>
              ) : (
                <ul className="flex flex-col gap-2">
                  {additionalServices.map((service) => (
                    <li key={service.id} className="flex items-center gap-6">
                      <Text
                        variant="text-xs"
                        className="text-gray-200 flex-1 truncate"
                      >
                        {service.name}
                      </Text>
                      <Text
                        variant="text-xs"
                        className="text-gray-200 w-20 text-right"
                      >
                        {service.price}
                      </Text>
                      <Button
                        variant="secondary"
                        size="sm"
                        icon={TrashIcon}
                        aria-label="Remove"
                      />
                    </li>
                  ))}
                </ul>
              )}
            </SectionContainer>
          </div>

          <SectionContainer className="flex-1">
            <section className="flex items-center gap-2">
              <Avatar>{getInitials(tech.name)}</Avatar>
              <div>
                <Text as="h3" variant="text-sm" className="text-gray-200">
                  {tech.name || (techId ? "-" : "Não atribuído")}
                </Text>
                <Text variant="text-xs" className="text-gray-300">
                  {tech.email || ""}
                </Text>
              </div>
            </section>

            <section className="mt-4">
              <Text variant="text-xs" className="text-gray-400">
                Values
              </Text>
              <ul className="mt-2 space-y-2">
                <li className="flex items-center justify-between">
                  <Text variant="text-xs" className="text-gray-200">
                    Base price
                  </Text>
                  <Text variant="text-xs" className="text-gray-200">
                    {pricing.basePrice}
                  </Text>
                </li>
                <li className="flex items-center justify-between">
                  <Text variant="text-xs" className="text-gray-200">
                    Additional
                  </Text>
                  <Text variant="text-xs" className="text-gray-200">
                    {pricing.additionals}
                  </Text>
                </li>
              </ul>
              <hr className="my-3 border-gray-500" />
              <div className="flex items-center justify-between">
                <Text variant="text-sm" className="text-gray-200">
                  Total
                </Text>
                <Text variant="text-sm" className="text-gray-200">
                  {pricing.total}
                </Text>
              </div>
            </section>
          </SectionContainer>
        </div>
      </Container>
    </section>
  )
}
