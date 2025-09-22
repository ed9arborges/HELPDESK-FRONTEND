import Icon from "@/components/core/icon"
import IconLogo from "@assets/Logo_IconLight2.svg?react"

import { cva, type VariantProps } from "class-variance-authority"

export const headerNavVariants = cva(
  "flex items-center gap-3 px-5 py-6 w-full border-b border-gray-200",
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-md",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

interface HeaderNavProps
  extends React.ComponentProps<"header">,
    VariantProps<typeof headerNavVariants> {}

export function HeaderNav({ children }: HeaderNavProps) {
  return (
    <header className={headerNavVariants()}>
      <Icon className="w-11 h-11" alt="Logo HelpDesk" svg={IconLogo} />

      <div className="flex flex-col">
        <h1 className="text-lg text-md text-gray-600 leading-tight">
          HelpDesk
        </h1>

        <span className="text-xs uppercase text-blue-light">{children}</span>
      </div>
    </header>
  )
}
