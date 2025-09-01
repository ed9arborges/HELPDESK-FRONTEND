import React, { type ReactElement } from "react"
import SectionContainer from "./section-container"
import IconQuestion from "@assets/icons/circle-help.svg?react"
import Tag from "./tag"

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

export const RequestDetailsContent = (): ReactElement => {
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
    basePrice: "R$ 200,00",
    additionalItems: [
      { label: "Assinatura de backup", value: "R$ 120,00" },
      { label: "Formatação do PC", value: "R$ 75,00" },
    ],
    total: "R$ 395,00",
  }

  return (
    <section className="flex flex-row gap-6 flex-wrap w-full">
      <SectionContainer variant="large">
        <header className="w-full flex flex-col gap-3">
          <div className="flex items-center justify-between w-full">
            <div className="text-xs text-gray-300 whitespace-nowrap">
              {ticketData.id}
            </div>

            <Tag
              className="flex-shrink-0"
              iconAdd={IconQuestion}
              variant="success"
            >
              {ticketData.status}
            </Tag>
          </div>

          <h1 className="text-lg text-gray-200 font-semibold leading-tight">
            {ticketData.title}
          </h1>
        </header>

        <div>
          <label className="text-xs text-gray-400">Descrição</label>
          <p className="mt-1 text-sm text-gray-200">{ticketData.description}</p>
        </div>

        <div>
          <label className="text-xs text-gray-400">Categoria</label>
          <div className="mt-1 text-sm text-gray-200">
            {ticketData.category}
          </div>
        </div>

        <div className="flex gap-8">
          <div className="flex-1">
            <label className="text-xs text-gray-400">Criado em</label>
            <time className="block mt-1 text-xs text-gray-200">
              {ticketData.createdAt}
            </time>
          </div>

          <div className="flex-1">
            <label className="text-xs text-gray-400">Atualizado em</label>
            <time className="block mt-1 text-xs text-gray-200">
              {ticketData.updatedAt}
            </time>
          </div>
        </div>
      </SectionContainer>
      <SectionContainer variant="medium">
        <div className="flex flex-col gap-2">
          <h2 className="text-xs text-gray-400">Técnico responsável</h2>

          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 bg-bluedark rounded-full flex items-center justify-center text-sm text-gray-600"
              role="img"
              aria-label={`Avatar de ${technicianData.name}`}
            >
              {technicianData.initials}
            </div>

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
