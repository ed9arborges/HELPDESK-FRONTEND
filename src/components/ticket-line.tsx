import Avatar from "@core-components/avatar"
import Text from "@core-components/text"
import Tag from "@core-components/tag"
import { useNavigate } from "react-router"
import { useServicesCatalog } from "@/hooks/useServicesCatalog"

import { Button } from "@/core-components/button"
import { statusVariant } from "@/utils/status-variants"

import IconView from "@assets/icons/eye.svg?react"

import { formatCurrency } from "@/utils/format-currency"
import { formatDate } from "@/utils/format-date"
import { getInitials } from "@/utils/get-initials"

type Props = React.ComponentProps<"div"> & {
  data: TicketItemProps
  onView: (id: string) => void
}

function statusLabel(status?: string) {
  if (!status) return "--"
  if (status === "in_progress") return "In progress"
  if (status === "closed") return "Closed"
  return "Open"
}

export function TicketLine({ data, onView, ...rest }: Props) {
  const navigate = useNavigate()
  const { getNameById } = useServicesCatalog()
  const mdGridClass =
    "md:[grid-template-columns:minmax(6rem,12%)_minmax(4rem,8%)_1fr_minmax(8rem,16%)_minmax(6rem,10%)_minmax(8rem,12%)_minmax(8rem,12%)_minmax(3rem,4%)]"
  const viewHandle = (id: string) => {
    // Adjust route when detail page exists
    navigate(`/tickets/${id}`)
  }

  return (
    <div
      className={`grid grid-cols-12 ${mdGridClass} items-center h-16 border-b border-gray-500 px-3 min-w-0`}
      {...rest}
    >
      <div className="col-span-3 md:col-auto flex items-center min-w-0">
        <Text variant="text-xs" className="truncate">
          {formatDate(data.updatedAt || data.createdAt)}
        </Text>
      </div>

      <div className="hidden md:flex items-center min-w-0">
        <Text variant="text-xs" className="truncate">
          {data.id.slice(0, 5)}
        </Text>
      </div>

      <div className="col-span-6 md:col-auto flex items-center min-w-0">
        <Text variant="text-sm" className="truncate">
          {data.title}
        </Text>
      </div>

      <div className="hidden md:flex items-center min-w-0">
        <Text variant="text-sm" className="truncate">
          {getNameById((data as any)?.serviceId)}
        </Text>
      </div>

      <div className="hidden md:flex items-center min-w-0">
        <Text variant="text-sm" className="truncate">
          {formatCurrency(data.estimate)}
        </Text>
      </div>

      <div className="hidden md:flex items-center min-w-0">
        <Avatar size="small">
          <span className="text-xs text-gray-600 font-normal">
            {getInitials(data.tech?.name || "--")}
          </span>
        </Avatar>
        <Text variant="text-sm" className="truncate ml-2">
          {data.tech?.name || "--"}
        </Text>
      </div>

      <div className="col-span-2 md:col-auto flex items-center min-w-0">
        <Tag className="flex-shrink-0" variant={statusVariant(data.status)}>
          {statusLabel(data.status)}
        </Tag>
      </div>

      <div className="col-span-1 md:col-auto flex items-center justify-center min-w-0">
        <Button
          onClick={() => viewHandle(data.id)}
          icon={IconView}
          className="flex-shrink-0"
          size="sm"
          variant="secondary"
        />
      </div>
    </div>
  )
}
