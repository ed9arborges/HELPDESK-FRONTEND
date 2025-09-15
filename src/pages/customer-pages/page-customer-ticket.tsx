import { type ReactElement, useEffect, useMemo, useState } from "react"
import { useParams } from "react-router"
import SectionContainer from "@components/section-container"
import { statusVariant } from "@utils/status-variants"

import Tag from "@core-components/tag"
import Text from "@core-components/text"
import Avatar from "@core-components/avatar"
import { api } from "@services/api"
import { AxiosError } from "axios"
import { formatDate } from "@utils/format-date"
import { formatCurrency } from "@utils/format-currency"
import { getInitials } from "@utils/get-initials"
import MainContent from "@core-components/main-content"
import { useServicesCatalog } from "@/hooks/useServicesCatalog"

type TicketData = TicketAPIResponse

export function PageCustomerRequest() {
  const { id } = useParams<{ id: string }>()
  const [ticketData, setTicketData] = useState<TicketData>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    async function fetchTicket(ticketId?: string) {
      if (!ticketId) {
        setIsLoading(false)
        return
      }
      try {
        setIsLoading(true)
        const { data } = await api.get<TicketAPIResponse>(
          `/tickets/${ticketId}`
        )
        setTicketData(data as TicketAPIResponse)
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
    fetchTicket(id)
  }, [id])

  const { byId: catalogById } = useServicesCatalog()
  const extras = ticketData?.service || []
  const base = ticketData?.estimate || 0
  const baseServiceName = useMemo(() => {
    const id = (ticketData as any)?.serviceId as string | undefined
    if (!id) return "-"
    return catalogById.get(id)?.name ?? "-"
  }, [ticketData, catalogById])
  const totalExtras = extras.reduce((sum, p) => sum + (p.amount || 0), 0)
  const total = base + totalExtras

  function statusLabel(status?: string) {
    if (!status) return "--"
    if (status === "in_progress") return "In progress"
    if (status === "closed") return "Closed"
    if (status === "open") return "Open"
    return status
  }

  if (isLoading) {
    return (
      <section className="flex flex-row gap-6 flex-wrap w-full">
        <SectionContainer variant="large">
          <Text variant="text-sm" className="text-gray-300">
            Loading...
          </Text>
        </SectionContainer>
      </section>
    )
  }

  if (!ticketData) {
    return (
      <section className="flex flex-row gap-6 flex-wrap w-full">
        <SectionContainer variant="large">
          <Text variant="text-sm" className="text-gray-300">
            Ticket not found or invalid ID.
          </Text>
        </SectionContainer>
      </section>
    )
  }

  return (
    <MainContent className="w-full md:max-w-[800px] px-4 md:px-12">
      <MainContent.Header backNav>Ticket Details</MainContent.Header>
      <section className="flex flex-row gap-6 flex-wrap w-full">
        <SectionContainer variant="large">
          <header className="w-full flex flex-col gap-3">
            <div className="flex items-center justify-between w-full">
              <Text
                variant="text-xs"
                className=" text-gray-300 whitespace-nowrap"
              >
                {ticketData.id?.slice(0, 5)}
              </Text>

              <Tag
                className="flex-shrink-0"
                variant={statusVariant(ticketData.status)}
              >
                {statusLabel(ticketData.status)}
              </Tag>
            </div>

            <Text
              as="h1"
              variant="text-lg-bold"
              className="text-gray-200 leading-tight"
            >
              {ticketData.title}
            </Text>
          </header>

          <div>
            <Text as="label" variant="text-xs" className="text-gray-400">
              Description
            </Text>
            <p className="mt-1 text-sm text-gray-200">
              {ticketData.description || "--"}
            </p>
          </div>

          <div>
            <Text as="label" variant="text-xs" className="text-gray-400">
              Service
            </Text>
            <div className="mt-1 text-sm text-gray-200">{baseServiceName}</div>
          </div>

          <div className="flex gap-8">
            <div className="flex-1">
              <Text as="label" variant="text-xs" className=" text-gray-400">
                Created at
              </Text>
              <time className="block mt-1 text-xs text-gray-200">
                {formatDate(ticketData.createdAt)}
              </time>
            </div>

            <div className="flex-1">
              <Text as="label" variant="text-xs" className="text-gray-400">
                Updated at
              </Text>
              <time className="block mt-1 text-xs text-gray-200">
                {formatDate(ticketData.updatedAt || ticketData.createdAt)}
              </time>
            </div>
          </div>
        </SectionContainer>
        <SectionContainer variant="small">
          <div className="flex flex-col gap-2">
            <Text as="h2" variant="text-xs" className="text-gray-400">
              Responsible Technician
            </Text>

            <div className="flex items-center gap-3">
              <Avatar>{getInitials(ticketData.tech?.name)}</Avatar>

              <div className="min-w-0">
                <div className="text-sm text-gray-200 truncate">
                  {ticketData.tech?.name || "--"}
                </div>
                {/* Tech email not available in API response; show placeholder */}
                <span className="text-xs text-gray-300 truncate">&nbsp;</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <h3 className="text-xs text-gray-400">Valores</h3>

              <div className="mt-2 flex items-center justify-between">
                <div className="text-xs text-gray-200">Preço base</div>
                <div className="text-xs text-gray-200">
                  {formatCurrency(base)}
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs text-gray-400">Adicionais</h4>

              <div className="mt-2 flex flex-col gap-2">
                {extras.length === 0 && (
                  <div className="text-xs text-gray-300">--</div>
                )}
                {extras.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between"
                  >
                    <div className="text-xs text-gray-200 truncate">
                      {item.name}
                    </div>
                    <div className="text-xs text-gray-200">
                      {formatCurrency(item.amount)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-gray-500 flex items-center justify-between">
              <div className="text-sm text-gray-200">Total</div>
              <div className="text-sm text-gray-200">
                {formatCurrency(total)}
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>
    </MainContent>
  )
}
