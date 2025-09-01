import React, { Children } from "react"

import { cx, cva, type VariantProps } from "class-variance-authority"
import Text from "../core-components/text"

export const SectionContainerVariants = cva(
  "border border-gray-500 rounded-[0.625rem] p-7",
  {
    variants: {
      variant: {
        base: "w-full md:w-auto ",
        small: "w-full md:w-auto md:max-w-50",
        medium: "w-full md:w-auto md:max-w-74",
        large: "w-full md:w-auto md:max-w-120",
      },
    },
    defaultVariants: {
      variant: "base",
    },
  }
)

interface SectionContainerProps
  extends React.ComponentProps<"section">,
    VariantProps<typeof SectionContainerVariants> {
  tittle?: string
  description?: string
}

export default function SectionContainer({
  variant,
  children,
  className,
  title,
  description,
  ...props
}: SectionContainerProps) {
  return (
    <article
      className={cx(
        SectionContainerVariants({ variant }),
        className
      )}
      {...props}
    >
      {title || description && <div className="flex flex-col items-start gap-1 pl-0 pb-8">
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
      </div>}
      {children}
    </article>
  )
}
