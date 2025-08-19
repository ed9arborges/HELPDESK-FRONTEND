import React, { Children } from "react"

import { cx } from "class-variance-authority"
import Text from "./text"

interface AuthSectionContainerProps extends React.ComponentProps<"section"> {}

export default function AuthSectionContainer({
  children,
  className,
  ...props
}: AuthSectionContainerProps) {
  return (
    <section className={cx("border border-gray-500 rounded-[0.625rem] p-7 md:min-w-100", className)} {...props}>
      <div className="flex flex-col items-start gap-1 pl-0 pb-8">
        <Text as="h1" variant="text-lg-bold" >Acesse o Portal</Text>
        <Text as="p" variant="text-xs">
          Faça login para acessar sua conta.
        </Text>
      </div>
      {children}
    </section>
  )
}
