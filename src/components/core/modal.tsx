import React from "react"
import { cva, type VariantProps } from "class-variance-authority"

export const overlayVariants = cva(
  "fixed inset-0 z-50 bg-[#000000]/50 flex items-start md:items-center justify-center",
  {
    variants: {
      alignment: {
        center: "",
        top: "items-start",
      },
      spacing: {
        none: "",
        topGap: "mt-36 md:mt-0",
      },
    },
    defaultVariants: {
      alignment: "center",
      spacing: "topGap",
    },
  }
)

export const contentVariants = cva(
  "w-full max-w-[440px] bg-gray-600 rounded-[10px] border border-gray-500 overflow-hidden shadow-lg",
  {
    variants: {
      size: {
        sm: "max-w-[360px]",
        md: "max-w-[440px]",
        lg: "max-w-[640px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

type ModalRootProps = React.ComponentProps<"div"> &
  VariantProps<typeof overlayVariants> & { onClose?: () => void }

export function ModalRoot({
  children,
  className,
  alignment,
  spacing,
  onClose,
  ...props
}: ModalRootProps) {
  return (
    <div
      className={overlayVariants({ alignment, spacing, className })}
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (e.currentTarget === e.target) onClose?.()
      }}
      {...props}
    >
      {children}
    </div>
  )
}

type ModalContentProps = React.ComponentProps<"div"> &
  VariantProps<typeof contentVariants>
export function ModalContent({
  children,
  className,
  size,
  ...props
}: ModalContentProps) {
  return (
    <div className={contentVariants({ size, className })} {...props}>
      {children}
    </div>
  )
}

export function ModalHeader({
  children,
  className,
  ...props
}: React.ComponentProps<"header">) {
  return (
    <header
      className={`flex items-center justify-between px-6 py-4 border-b border-gray-500 ${
        className ?? ""
      }`}
      {...props}
    >
      {children}
    </header>
  )
}

export function ModalBody({
  children,
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={`flex flex-col gap-5 pt-7 pb-8 px-7 w-full ${className ?? ""}`}
      {...props}
    >
      {children}
    </section>
  )
}

export function ModalFooter({
  children,
  className,
  ...props
}: React.ComponentProps<"footer">) {
  return (
    <footer
      className={`px-6 py-4 border-t border-gray-500 bg-transparent ${
        className ?? ""
      }`}
      {...props}
    >
      {children}
    </footer>
  )
}

export const Modal = {
  Root: ModalRoot,
  Content: ModalContent,
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
}
