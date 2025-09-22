import Text from "@/components/core/text"
import { Button } from "@/components/core/button"
import Avatar from "@/components/core/avatar"
import { formatDate } from "@utils/format-date"
import IconPen from "@assets/icons/pen-line.svg?react"
import IconClock from "@assets/icons/clock-2.svg?react"
import IconCheck from "@assets/icons/check.svg?react"
import IconEye from "@assets/icons/eye.svg?react"
import Tag from "@/components/core/tag"
import { getInitials } from "@utils/get-initials"
import { formatId } from "@utils/format-id"
import SectionContainer from "@layouts/section-container"
import { useServicesCatalog } from "@/hooks/useServicesCatalog"

type Props = {
  ticket: TicketItemProps
  primaryLabel: string
  onPrimary?: (id: string) => void
  onEdit?: (id: string) => void
  disabledPrimary?: boolean
  disabledEdit?: boolean
}

export function TicketCard({
  ticket,
  primaryLabel,
  onPrimary,
  onEdit,
  disabledPrimary,
  disabledEdit,
}: Props) {
  const { getNameById } = useServicesCatalog()
  const serviceLabel = getNameById((ticket as any)?.serviceId)
  const PrimaryIcon =
    primaryLabel === "Iniciar"
      ? IconClock
      : primaryLabel === "Encerrar"
      ? IconCheck
      : IconEye

  return (
    <SectionContainer className="md:min-w-87 flex flex-col gap-4 relative w-full">
      {/* Heading: id and title */}
      <div className="flex items-start justify-between">
        <Text variant="text-xs-bold" className="text-gray-400">
          {formatId(ticket.id, 5)}
        </Text>
      </div>

      {/* Title and category */}
      <div className="flex flex-col items-start justify-between">
        <Text variant="text-md-bold" className="text-gray-100">
          {ticket.title}
        </Text>
        <Text variant="text-xs" className="text-gray-200">
          {serviceLabel}
        </Text>
      </div>

      {/* Date and total */}
      <div className="flex items-center justify-between">
        <Text variant="text-xs" className="text-gray-200">
          {formatDate(ticket.updatedAt || ticket.createdAt)}
        </Text>
        <Text variant="text-xs" className="text-gray-200">
          {ticket.totalValue || ticket.estimate}
        </Text>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-gray-500" />

      {/* Customer and status icon */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <Avatar size="small">
            <span className="text-xs text-gray-600 font-normal">
              {getInitials(ticket.user?.name)}
            </span>
          </Avatar>
          <Text variant="text-sm-bold" className="truncate text-gray-700">
            {ticket.user?.name || "--"}
          </Text>
        </div>
        <span>
          <Tag
            variant={
              ticket.status === "open"
                ? "new"
                : ticket.status === "in_progress"
                ? "info"
                : ticket.status === "closed"
                ? "success"
                : "danger"
            }
          />
        </span>
      </div>

      {/* Actions (overlay top-right) */}
      <div className="absolute top-3 right-3 inline-flex items-center gap-1">
        <Button
          size="sm"
          variant="secondary"
          onClick={() => onEdit?.(ticket.id)}
          disabled={disabledEdit}
          icon={IconPen}
          aria-label="Editar chamado"
        />
        <Button
          size="sm"
          variant="primary"
          onClick={() => onPrimary?.(ticket.id)}
          disabled={disabledPrimary}
          icon={PrimaryIcon}
        >
          {primaryLabel}
        </Button>
      </div>
    </SectionContainer>
  )
}
