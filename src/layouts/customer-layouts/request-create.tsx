import React, { type ReactElement } from "react"
import SectionContainer from "../../components/section-container"
import IconQuestion from "@assets/icons/circle-help.svg?react"
import Tag from "@components/tag"
import Text from "@core-components/text"
import Avatar from "@/core-components/avatar"
import InputText from "@/core-components/input"
import InputSelect from "@/core-components/input-select"
import { Button } from "@/core-components/button"

interface TicketData {
  id: string
  title: string
  description: string
  category: string
  price: string
  status: string
  createdAt: string
  updatedAt: string
}

export const RequestCreate = (): ReactElement => {
  const ticketData: TicketData = {
    id: "00004",
    title: "Backup não está funcionando",
    description:
      "O sistema de backup automático parou de funcionar. Última execução bem-sucedida foi há uma semana.",
    category: "Recuperação de Dados",
    price: "€ 200,00",
    status: "Aberto",
    createdAt: "12/04/25 09:12",
    updatedAt: "12/04/25 15:20",
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
          <div className="flex flex-col gap-4">
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
      <SectionContainer
        title="Resume"
        description="Values and Details."
        variant="small"
      >
        <div className="flex flex-col gap-6">
          <div>
            <Text as="h3" variant="text-xs" className=" text-gray-400">
              Service Category
            </Text>
            <Text variant="text-sm" className="text-gray-200">
              {ticketData.category}
            </Text>
          </div>
          <div>
            <Text as="h3" variant="text-xs" className=" text-gray-400">
              Initial Cost
            </Text>
            <Text variant="text-lg-bold" className="text-gray-200">
              {ticketData.price}
            </Text>
          </div>          
            <Text as="span" variant="text-xs" className=" text-gray-400">
              The request will be automatically assigned to an available
              technician
            </Text>
         <Button>Create Request</Button>

        </div>
      </SectionContainer>
    </section>
  )
}
