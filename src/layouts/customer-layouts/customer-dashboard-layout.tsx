import React from "react"
import Text from "../../components/text"
import { Button } from "../../components/button"
import Tag from "../../components/tag"
import IconView from "../../assets/icons/eye.svg?react"
import IconQuestion from "../../assets/icons/circle-help.svg?react"
import IconCheck from "../../assets/icons/circle-check.svg?react"

export function CustomerDashboardLayout() {
  // Tailwind arbitrary grid template for md+ (keeps header and rows aligned)
  const mdGridClass =
    "md:[grid-template-columns:minmax(6rem,12%)_minmax(4rem,8%)_1fr_minmax(8rem,16%)_minmax(6rem,10%)_minmax(8rem,12%)_minmax(8rem,12%)_minmax(3rem,4%)]"

  return (
    <>
      <div className="bg-blue-600 p-4">
        <Text>My Requests</Text>
      </div>

      <main className="relative rounded-lg overflow-hidden border border-gray-500 w-full md:max-w-6xl mx-auto bg-white">
        {/* Header (mobile: 12-col layout showing only Atualizado em, Título, Status, View; md+: explicit template) */}
        <div
          className={`grid grid-cols-12 ${mdGridClass} items-center h-12 border-b border-gray-500 px-3 min-w-0`}
        >
          <div className="col-span-3 md:col-auto flex items-center min-w-0">
            <Text variant="text-sm" className="truncate">
              Atualizado em
            </Text>
          </div>

          {/* id hidden on mobile */}
          <div className="hidden md:flex items-center min-w-0">
            <Text variant="text-sm" className="truncate">
              Id
            </Text>
          </div>

          <div className="col-span-6 md:col-auto flex items-center min-w-0">
            <Text variant="text-sm" className="truncate">
              Título
            </Text>
          </div>

          {/* serviço hidden on mobile */}
          <div className="hidden md:flex items-center min-w-0">
            <Text variant="text-sm" className="truncate">
              Serviço
            </Text>
          </div>

          {/* valor total hidden on mobile */}
          <div className="hidden md:flex items-center min-w-0">
            <Text variant="text-sm" className="truncate">
              Valor total
            </Text>
          </div>

          {/* técnico hidden on mobile */}
          <div className="hidden md:flex items-center min-w-0">
            <Text variant="text-sm" className="truncate">
              Técnico
            </Text>
          </div>

          <div className="col-span-2 md:col-auto flex items-center min-w-0">
            <Text variant="text-sm" className="truncate">
              Status
            </Text>
          </div>

          <div
            className="col-span-1 md:col-auto flex items-center justify-center"
            aria-hidden
          >
            {/* actions column */}
          </div>
        </div>

        {/* Row (same responsive visibility and alignment) */}
        <div
          className={`grid grid-cols-12 ${mdGridClass} items-center h-16 border-b border-gray-500 px-3 min-w-0`}
        >
          <div className="col-span-3 md:col-auto flex items-center min-w-0">
            <Text variant="text-xs" className="truncate">
              11/04/25 15:16
            </Text>
          </div>

          <div className="hidden md:flex items-center min-w-0">
            <Text variant="text-xs" className="truncate">
              00005
            </Text>
          </div>

          <div className="col-span-6 md:col-auto flex items-center min-w-0">
            <Text variant="text-sm" className="truncate">
              Meu fone não conecta no computador
            </Text>
          </div>

          <div className="hidden md:flex items-center min-w-0">
            <Text variant="text-sm" className="truncate">
              Suporte de Software
            </Text>
          </div>

          <div className="hidden md:flex items-center min-w-0">
            <Text variant="text-sm" className="truncate">
              R$ 80,00
            </Text>
          </div>

          <div className="hidden md:flex items-center min-w-0">
            <div className="relative w-5 h-5 bg-blue-dark rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-xs text-gray-600 font-normal">AO</span>
            </div>
            <Text variant="text-sm" className="truncate ml-2">
              Ana Oliveira
            </Text>
          </div>

          <div className="col-span-2 md:col-auto flex items-center min-w-0">
            <Tag
              className="flex-shrink-0"
              iconAdd={IconQuestion}
              variant="success"
            >
              Close
            </Tag>
          </div>

          <div className="col-span-1 md:col-auto flex items-center justify-center min-w-0">
            <Button
              icon={IconView}
              className="flex-shrink-0"
              size="sm"
              variant="secondary"
            />
          </div>
        </div>

        {/* Mobile stacked list fallback (if you want full card style, keep below — else remove) */}
        <div className="hidden md:block" />
      </main>
    </>
  )
}
