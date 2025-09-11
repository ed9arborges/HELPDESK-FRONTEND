import { type ReactElement } from "react"
import SectionContainer from "../../components/section-container"
import IconQuestion from "@assets/icons/circle-help.svg?react"
import Tag from "@components/tag"
import Text from "@core-components/text"
import Avatar from "@/core-components/avatar"

interface TicketData {
  id: string
  title: string
  description: string
  category: string
  status: string
  createdAt: string
  updatedAt: string
}
interface TechnicianData {
  initials: string
  name: string
  email: string
}
interface PricingItem {
  label: string
  value: string
}
interface PricingData {
  basePrice: string
  additionalItems: PricingItem[]
  total: string
}

export const TicketDetailsContent = (): ReactElement => {
  const ticketData: TicketData = {
    id: "00004",
    title: "Backup não está funcionando",
    description:
      "O sistema de backup automático parou de funcionar. Última execução bem-sucedida foi há uma semana.",
    category: "Recuperação de Dados",
    status: "Aberto",
    createdAt: "12/04/25 09:12",
    updatedAt: "12/04/25 15:20",
  }

  const technicianData: TechnicianData = {
    initials: "CS",
    name: "Carlos Silva",
    email: "carlos.silva@test.com",
  }

  const pricingData: PricingData = {
    basePrice: "€ 200,00",
    additionalItems: [
      { label: "Assinatura de backup", value: "€ 120,00" },
      { label: "Formatação do PC", value: "€ 75,00" },
    ],
    total: "€ 395,00",
  }

  return (
    <section className="flex flex-row gap-6 flex-wrap w-full">
      <SectionContainer variant="large">
        <header className="w-full flex flex-col gap-3">
          <div className="flex items-center justify-between w-full">
            <Text
              variant="text-xs"
              className=" text-gray-300 whitespace-nowrap"
            >
              {ticketData.id}
            </Text>

            <Tag
              className="flex-shrink-0"
              iconAdd={IconQuestion}
              variant="success"
            >
              {ticketData.status}
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
          <p className="mt-1 text-sm text-gray-200">{ticketData.description}</p>
        </div>

        <div>
          <Text as="label" variant="text-xs" className="text-gray-400">
            Category
          </Text>
          <div className="mt-1 text-sm text-gray-200">
            {ticketData.category}
          </div>
        </div>

        <div className="flex gap-8">
          <div className="flex-1">
            <Text as="label" variant="text-xs" className=" text-gray-400">
              Created at
            </Text>
            <time className="block mt-1 text-xs text-gray-200">
              {ticketData.createdAt}
            </time>
          </div>

          <div className="flex-1">
            <Text as="label" variant="text-xs" className="text-gray-400">
              Updated at
            </Text>
            <time className="block mt-1 text-xs text-gray-200">
              {ticketData.updatedAt}
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
            <Avatar>{technicianData.initials}</Avatar>

            <div className="min-w-0">
              <div className="text-sm text-gray-200 truncate">
                {technicianData.name}
              </div>
              <a
                className="text-xs text-gray-300 hover:underline truncate"
                href={`mailto:${technicianData.email}`}
              >
                {technicianData.email}
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-xs text-gray-400">Valores</h3>

            <div className="mt-2 flex items-center justify-between">
              <div className="text-xs text-gray-200">Preço base</div>
              <div className="text-xs text-gray-200">
                {pricingData.basePrice}
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs text-gray-400">Adicionais</h4>

            <div className="mt-2 flex flex-col gap-2">
              {pricingData.additionalItems.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="text-xs text-gray-200 truncate">
                    {item.label}
                  </div>
                  <div className="text-xs text-gray-200">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-gray-500 flex items-center justify-between">
            <div className="text-sm text-gray-200">Total</div>
            <div className="text-sm text-gray-200">{pricingData.total}</div>
          </div>
        </div>
      </SectionContainer>
    </section>
  )
}
