import React, { type ReactElement } from "react"
import SectionContainer from "../../components/section-container"
import IconQuestion from "@assets/icons/circle-help.svg?react"
import Tag from "@components/tag"
import Text from "@core-components/text"
import Avatar from "@/core-components/avatar"
import InputText from "@/core-components/input"
import InputSelect from "@/core-components/input-select"

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

export const RequestCreate = (): ReactElement => {
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
      <SectionContainer
        title="Create Request"
        description="Please fill out the form below to create a new request."
        variant="large"
        className="flex flex-col justify-start min-h-100 w-full"
      >
        <div className="flex flex-col h-full justify-between">
          <div>
            <InputText label="Title" value={ticketData.title} />
            <InputText label="Description" value={ticketData.description} />
          </div>
          <InputSelect
            label="Service Category"
            value={ticketData.category}
            className="mb-2 mt-auto self-end"
          />
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
