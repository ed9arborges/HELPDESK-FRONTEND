import { useEffect, useMemo, useState } from "react"
import { useParams } from "react-router"
import { AxiosError } from "axios"

import { api } from "@services/api"
import { Button } from "@core-components/button"
import Text from "@core-components/text"
import SectionContainer from "@components/section-container"
import Avatar from "@core-components/avatar"
import Tag from "@core-components/tag"
import { statusVariant } from "@utils/status-variants"
import { getInitials } from "@utils/get-initials"
import { formatDate } from "@utils/format-date"
import { formatCurrency } from "@utils/format-currency"
import { formatId } from "@utils/format-id"

import MainContent from "@core-components/main-content"
import CircleCheckBigIcon from "@assets/icons/circle-check-big.svg?react"
import Clock2Icon from "@assets/icons/clock-2.svg?react"
import PlusIcon from "@assets/icons/plus.svg?react"
import TrashIcon from "@assets/icons/trash.svg?react"
import WrenchIcon from "@assets/icons/wrench.svg?react"
import XIcon from "@assets/icons/x.svg?react"
import { useServicesCatalog } from "@/hooks/useServicesCatalog"
import { AlertModal } from "@/components/alert-modal"
// import { useAuth } from "@hooks/useAuth"

const statusMap: Record<string, string> = {
  open: "Open",
  in_progress: "In Progress",
  closed: "Closed",
}

// Catalog services are managed separately; map ticket.serviceId -> catalog name

export function PageTechTicket() {
  const { id } = useParams<{ id: string }>()
  // const { session } = useAuth()

  const [ticket, setTicket] = useState<TicketAPIResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [busy, setBusy] = useState<string | null>(null)
  const [alertMsg, setAlertMsg] = useState<string | null>(null)
  const [parts, setParts] = useState<
    Array<{ id: string; name: string; amount: number }>
  >([])
  const [isPartsModalOpen, setIsPartsModalOpen] = useState(false)
  const [newPartName, setNewPartName] = useState("")
  const [newPartAmount, setNewPartAmount] = useState("")
  const { getNameById } = useServicesCatalog()

  useEffect(() => {
    async function load() {
      if (!id) return
      try {
        setIsLoading(true)
        const { data } = await api.get<TicketAPIResponse>(`/tickets/${id}`)
        setTicket(data)
        setParts(
          (data.service || []).map((p) => ({
            id: p.id,
            name: p.name,
            amount: p.amount,
          }))
        )
      } catch (error) {
        console.log(error)
        if (error instanceof AxiosError) {
          setAlertMsg(
            error.response?.data.message || "Falha ao carregar o chamado"
          )
        } else {
          setAlertMsg("Falha ao carregar o chamado")
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

  const baseServiceName = useMemo(() => {
    const id = (ticket as any)?.serviceId as string | undefined
    return getNameById(id)
  }, [ticket, getNameById])

  const canModifyParts = useMemo(() => {
    const status = (ticket as any)?.status as string | undefined
    return status === "in_progress"
  }, [ticket])

  // back navigation handled by MainContentHeader

  async function handleClose() {
    if (!id) return
    try {
      setBusy("close")
      const { data } = await api.post<{
        message: string
        ticket: TicketAPIResponse
      }>(`/tickets/${id}/close`)
      setTicket(data.ticket)
      setAlertMsg("Ticket Closed")
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError) {
        return setAlertMsg(
          error.response?.data.message || "Failed to close ticket"
        )
      }
      setAlertMsg("Failed to close ticket")
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
      setParts(
        (data.ticket.service || []).map((p) => ({
          id: p.id,
          name: p.name,
          amount: p.amount,
        }))
      )
      // Optional UX: open add service immediately
      setIsPartsModalOpen(true)
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError)
        return setAlertMsg(
          error.response?.data.message || "Failed to start ticket"
        )
      setAlertMsg("Failed to start ticket")
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
      setAlertMsg("Ticket reopened")
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError)
        return setAlertMsg(
          error.response?.data.message || "Failed to reopen ticket"
        )
      setAlertMsg("Failed to reopen ticket")
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

  const additionalsTotal = parts.reduce((acc, p) => acc + (p.amount || 0), 0)
  const pricing = {
    basePrice: toDisplayCurrency((ticket as any).estimate ?? 0),
    additionals: toDisplayCurrency(additionalsTotal),
    total: toDisplayCurrency(
      ((ticket as any).estimate ?? 0) + additionalsTotal
    ),
  }

  async function addPart() {
    if (!id) return
    const name = newPartName.trim()
    const amount = parseFloat(newPartAmount.replace(/,/g, "."))
    if (!name || isNaN(amount)) {
      return setAlertMsg("Enter name and amount")
    }
    try {
      setBusy("add-part")
      const { data } = await api.post<{
        message: string
        part: { id: string; name: string; amount: number }
      }>(`/tickets/${id}/parts`, { name, amount })
      setParts((prev) => [data.part, ...prev])
      setIsPartsModalOpen(false)
      setNewPartName("")
      setNewPartAmount("")
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError)
        return setAlertMsg(
          error.response?.data.message || "Failed to add service"
        )
      setAlertMsg("Failed to add service")
    } finally {
      setBusy(null)
    }
  }

  async function removePart(partId: string) {
    if (!id) return
    try {
      setBusy(`rm-${partId}`)
      await api.delete(`/tickets/${id}/parts/${partId}`)
      setParts((prev) => prev.filter((p) => p.id !== partId))
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError)
        return setAlertMsg(
          error.response?.data.message || "Failed to remove service"
        )
      setAlertMsg("Failed to remove service")
    } finally {
      setBusy(null)
    }
  }

  return (
    <MainContent className="w-full md:max-w-[800px] px-4 md:px-12">
      {alertMsg && (
        <AlertModal
          title="Alert"
          description={alertMsg}
          onClose={() => setAlertMsg(null)}
        />
      )}
      {/* Header section */}
      <MainContent.Header
        backNav
        actions={(() => {
          const status = (ticket as any).status as string
          const canStart = status === "open"
          const canClose = status === "in_progress"
          const canReopen = status === "closed"

          return (
            <nav className="flex items-center gap-2">
              {canClose && (
                <Button
                  onClick={handleClose}
                  disabled={busy === "close"}
                  variant="secondary"
                  icon={CircleCheckBigIcon}
                  aria-label="Encerrar chamado"
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
                  aria-label="Reabrir chamado"
                >
                  {busy === "reopen" ? "Reopening..." : "Reopen"}
                </Button>
              )}
            </nav>
          )
        })()}
      >
        Ticket Details
      </MainContent.Header>

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
                  Service
                </Text>
                <Text variant="text-sm" className="text-gray-200">
                  {baseServiceName}
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
                title={
                  canModifyParts
                    ? "Add an additional service"
                    : "Only in-progress tickets assigned to you (or admin) can add services"
                }
                disabled={!canModifyParts}
                onClick={() => canModifyParts && setIsPartsModalOpen(true)}
              />
            </header>

            {parts.length === 0 ? (
              <Text variant="text-xs" className="text-gray-400">
                No additional services
              </Text>
            ) : (
              <ul className="flex flex-col gap-2">
                {parts.map((service) => (
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
                      {toDisplayCurrency(service.amount)}
                    </Text>
                    <Button
                      variant="secondary"
                      size="sm"
                      icon={TrashIcon}
                      aria-label="Remove"
                      disabled={!canModifyParts || busy === `rm-${service.id}`}
                      onClick={() => canModifyParts && removePart(service.id)}
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

      {isPartsModalOpen && canModifyParts && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-20"
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-part-title"
          onMouseDown={(e) => {
            if (e.currentTarget === e.target) setIsPartsModalOpen(false)
          }}
        >
          <div className="flex flex-col w-[440px] bg-gray-600 rounded-[10px] overflow-hidden border border-gray-500">
            <header className="flex items-center gap-3 p-5">
              <h3 id="add-part-title" className="m-0 p-0">
                <Text as="span" variant="text-md" className="text-gray-200">
                  Add service
                </Text>
              </h3>
              <button
                type="button"
                className="ml-auto w-6 h-6 flex items-center justify-center rounded hover:bg-gray-500"
                aria-label="Close"
                onClick={() => setIsPartsModalOpen(false)}
              >
                <XIcon className="w-4.5 h-4.5 fill-gray-300" />
              </button>
            </header>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                addPart()
              }}
              className="flex flex-col gap-5 px-7 pb-8 pt-7 border-y border-gray-500"
            >
              <div className="flex flex-col gap-4">
                <label className="block">
                  <Text variant="text-xxs" className="text-gray-300">
                    Name
                  </Text>
                  <input
                    className="w-full bg-transparent border-b border-gray-200 h-10 outline-none text-md text-gray-200"
                    placeholder="Service name"
                    value={newPartName}
                    onChange={(e) => setNewPartName(e.target.value)}
                  />
                </label>
                <label className="block">
                  <Text variant="text-xxs" className="text-gray-300">
                    Amount
                  </Text>
                  <input
                    className="w-full bg-transparent border-b border-gray-200 h-10 outline-none text-md text-gray-200"
                    placeholder="0.00"
                    inputMode="decimal"
                    value={newPartAmount}
                    onChange={(e) => setNewPartAmount(e.target.value)}
                  />
                </label>
              </div>
            </form>
            <footer className="flex items-center justify-center gap-2 p-7">
              <Button
                className="flex-1"
                onClick={addPart}
                disabled={busy === "add-part"}
              >
                Save
              </Button>
            </footer>
          </div>
        </div>
      )}
    </MainContent>
  )
}
