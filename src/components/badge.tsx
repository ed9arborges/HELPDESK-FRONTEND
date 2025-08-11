import React from "react"
import Text from "./text"

import Icon from "./icon"

import CircleIcon from "../assets/icons/circle-check.svg?react"
import TrashIcon from "../assets/icons/trash.svg?react"

import { cva, type VariantProps } from "class-variance-authority"

export const badgeVariants = cva("inline-flex items-center rounded-full gap-2", {
  variants: {
    variant: {
      primary: "bg-feedback-open-20",
      secondary: "bg-feedback-done-20",
    },
    size: {
      sm: "py-0.5 px-2",
    },
    iconAdd: {
      none: "",
      done: "done",
      open: "done",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "sm",
    iconAdd: "done",
  },
})

export const badgeTextVariants = cva("", {
  variants: {
    variant: {
      primary: "text-feedback-open",
      secondary: "text-feedback-done",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
})

export const badgeIconVariants = cva("size-4", {
  variants: {
    iconAdd: {
      none: "",
      done:  "fill-feedback-done" ,
      open:  "fill-feedback-open" ,
    },
  },
  defaultVariants: { iconAdd: "done" },
})

interface BadgeProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof badgeVariants> {}

export default function Badge({
  variant,
  size,
  className,
  iconAdd,
  children,
  ...props
}: BadgeProps) {
  return (
    <div
      className={badgeVariants({ variant, size, iconAdd, className })}
      {...props}
        >
      {iconAdd !== "none" && (
        <Icon svg={CircleIcon} className={badgeIconVariants({ iconAdd })} />
      )}
      <Text variant="text-xs" className={badgeTextVariants({ variant })}>
        {children}
      </Text>
    </div>
  )
}
