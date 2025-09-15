import React from "react"
import Text from "@core-components/text"
import Icon from "@core-components/icon"
import { cva, type VariantProps } from "class-variance-authority"

import IconBack from "@assets/icons/arrow-left.svg?react"

export const MainContentHeaderVariants = cva(
  "flex justify-between gap-4 w-full bg-transparent mb-6",
  {
    variants: {
      align: {
        start: "items-start",
        center: "items-center",
        end: "items-end",
      },
    },
    defaultVariants: {
      align: "start",
    },
  }
)

interface MainContentHeaderProps
  extends VariantProps<typeof MainContentHeaderVariants> {
  children: React.ReactNode
  subtitle?: React.ReactNode
  backNav?: boolean
  onBack?: () => void
  actions?: React.ReactNode
  className?: string
}

export const MainContentHeader = ({
  children,
  subtitle,
  backNav = false,
  onBack,
  actions,
  align,
  className,
}: MainContentHeaderProps) => {
  const handleBackClick = () => {
    if (onBack) return onBack()
    window.history.back()
  }

  const headerClass = `${MainContentHeaderVariants({ align })}${
    className ? ` ${className}` : ""
  }`

  return (
    <header className={headerClass}>
      <div className="gap-1 flex-1 grow flex flex-col items-start min-w-0">
        {backNav && (
          <button
            className="all-[unset] box-border inline-flex h-5 items-center justify-center gap-2 px-0.5 py-0 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={handleBackClick}
            type="button"
          >
            <Icon className="w-3.5 h-3.5" svg={IconBack} />
            <Text as="span" variant="text-xs" className="text-gray-300">
              Back
            </Text>
          </button>
        )}

        <div className="flex flex-col gap-0.5 w-full">
          <Text
            as="h1"
            variant="text-xl-bold"
            className="text-blue-dark truncate"
          >
            {children}
          </Text>
          {subtitle && (
            <Text as="p" variant="text-xs" className="text-gray-400 truncate">
              {subtitle}
            </Text>
          )}
        </div>
      </div>

      {actions && (
        <div className="flex items-center gap-2 shrink-0">{actions}</div>
      )}
    </header>
  )
}
