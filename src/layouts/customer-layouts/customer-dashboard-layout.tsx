import React from "react"
import Text from "../../components/text"
import {Button} from "../../components/button"
import Tag from "../../components/tag"
import IconView from "../../assets/icons/eye.svg?react"
import IconQuestion from "../../assets/icons/circle-help.svg?react"
import IconCheck from "../../assets/icons/circle-check.svg?react"

export function CustomerDashboardLayout() {
  return (
    <>
    <div className="bg-blue-600 p-4">
        <Text>My Requests</Text>
      </div>
    <main className="flex flex-col items-center justify-center relative rounded-lg overflow-hidden border border-grayscalegray-500">
      {/* Table Header */}
      <div className="flex h-12 items-center w-full border-b border-grayscalegray-500">
      <div className="flex w-28 items-center gap-2 px-3">
        <Text variant="text-sm">
        Atualizado em
        </Text>
      </div>
      <div className="flex w-16 items-center gap-2 px-3">
        <Text variant="text-sm">
        Id
        </Text>
      </div>
      <div className="flex flex-1 items-center gap-2 px-3">
        <Text variant="text-sm">
        Título
        </Text>
      </div>
      <div className="flex w-52 items-center gap-2 px-3">
        <Text variant="text-sm">
        Serviço
        </Text>
      </div>
      <div className="flex w-28 items-center gap-2 px-3">
        <Text variant="text-sm">
        Valor total
        </Text>
      </div>
      <div className="flex w-40 items-center gap-2 px-3">
        <Text variant="text-sm">
        Técnico
        </Text>
      </div>
      <div className="flex w-36 items-center gap-2 px-3">
        <Text variant="text-sm">
        Status
        </Text>
      </div>
      <div className="w-14" />
      </div>

      {/* Table Row */}
      <div className="flex h-16 items-center w-full border-b border-grayscalegray-500">
      <div className="flex w-28 items-center gap-2 px-3">
        <Text variant="text-xs">
        11/04/25 15:16
        </Text>
      </div>
      <div className="flex w-16 items-center gap-2 px-3">
        <Text variant="text-xs">
        00005
        </Text>
      </div>
      <div className="flex flex-1 items-center gap-2 px-3">
        <Text variant="text-sm" className="truncate">
        Meu fone não conecta no computador
        </Text>
      </div>
      <div className="flex w-52 items-center gap-2 px-3">
        <Text variant="text-sm" className="truncate">
        Suporte de Software
        </Text>
      </div>
      <div className="flex w-28 items-center gap-2 px-3">
        <Text variant="text-sm">
        R$ 80,00
        </Text>
      </div>
      <div className="flex w-40 items-center gap-2 px-3">
        <div className="relative w-5 h-5 bg-bluedark rounded-full flex items-center justify-center">
        <span className="text-xs text-grayscalegray-600 font-normal">AO</span>
        </div>
        <Text variant="text-sm" className="truncate">
        Ana Oliveira
        </Text>
      </div>
      <div className="flex w-36 items-center gap-2 px-3">
        <Tag
        className="flex-shrink-0"
        iconAdd={IconQuestion}
        variant="success"
        >
        Close
        </Tag>
      </div>
      <div className="flex w-14 items-center justify-center px-3">
        <Button icon={IconView} className="flex-shrink-0" size="sm" variant="secondary" />
      </div>
      </div>
    </main>
    </>
  )
}
