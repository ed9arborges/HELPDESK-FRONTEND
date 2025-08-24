import React, { Children } from "react"

import { cx, cva, type VariantProps } from "class-variance-authority"
import Text from "../core-components/text"

export const AuthSectionContainerVariants = cva(
  "border border-gray-500 rounded-[0.625rem] p-7 md:min-w-100",
  {
    variants: {
      variant: {
        base: "",
      },
    },
    defaultVariants: {
      variant: "base",
    },
  }
)

interface AuthSectionContainerProps
  extends React.ComponentProps<"section">,
    VariantProps<typeof AuthSectionContainerVariants> {
  tittle?: string
  description?: string
}

export default function AuthSectionContainer({
  variant,
  children,
  className,
  title,
  description,
  ...props
}: AuthSectionContainerProps) {
  return (
    <section
      className={cx(
        AuthSectionContainerVariants({ variant: "base" }),
        className
      )}
      {...props}
    >
      <div className="flex flex-col items-start gap-1 pl-0 pb-8">
        {title && (
          <Text as="h1" variant="text-lg-bold">
            {title}
          </Text>
        )}
        {description && (
          <Text as="p" variant="text-xs">
            {description}
          </Text>
        )}
      </div>
      {children}
    </section>
  )
}
