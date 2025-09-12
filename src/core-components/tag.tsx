import React from "react"
import Text from "../core-components/text"

import Icon from "../core-components/icon"
import IconQuestion from "@assets/icons/circle-help.svg?react"
import IconCheck from "@assets/icons/circle-check.svg?react"
import IconClock from "@assets/icons/clock-2.svg?react"

import { cva, type VariantProps } from "class-variance-authority"

export const tagVariants = cva(
  "inline-flex items-center justify-center transition group rounded-full gap-2",
  {
    variants: {
      variant: {
        new: "bg-feedback-open-20",
        info: "bg-feedback-progress-20",
        success: "bg-feedback-done-20",
        danger: "bg-feedback-danger-20",
      },
      size: {
        sm: "py-1.5 px-1.5",
      },
    },
    defaultVariants: {
      variant: "new",
      size: "sm",
    },
  }
)

export const tagTextVariants = cva("hidden md:flex pr-2", {
  variants: {
    variant: {
      new: "text-feedback-open",
      info: "text-feedback-progress",
      success: "text-feedback-done",
      danger: "text-feedback-danger",
    },
  },
  defaultVariants: {
    variant: "new",
  },
})

export const tagIconVariants = cva("size-4", {
  variants: {
    variant: {
      new: "fill-feedback-open",
      info: "fill-feedback-progress",
      success: "fill-feedback-done",
      danger: "fill-feedback-danger",
    },
    size: {
      sm: "",
    },
  },
  defaultVariants: { variant: "new" },
})

interface TagProps
  extends Omit<React.ComponentProps<"div">, "size" | "disabled">,
    VariantProps<typeof tagVariants> {

}

export default function Tag({
  variant,
  size,
  className,
  children,
  ...props
}: TagProps) {
  return (
    <div className={tagVariants({ variant, size, className })} {...props}>
      <Icon
        svg={variant === "new" ? IconQuestion : variant === "info" ? IconClock : variant === "success" ? IconCheck : IconQuestion}
        className={tagIconVariants({ variant, size })}
      />
      {children && <Text className={tagTextVariants({ variant })}>{children}</Text>}
    </div>
  )
}
