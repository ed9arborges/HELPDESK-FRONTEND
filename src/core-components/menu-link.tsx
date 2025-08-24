import React from "react"
import Icon from "./icon"
import Text from "./text"
import { cva, type VariantProps } from "class-variance-authority"

export const buttonVariants = cva(
  "flex items-center justify-center cursor-pointer transition rounded-[5px] group gap-3 p-3",
  {
    variants: {
      variant: {
        default: "bg-gray-100 hover:bg-gray-200",
        active: "bg-blue-dark hover:bg-gray-400",
      },
      disabled: {
        true: "opacity-50 pointer-events-none",
      },
    },
    defaultVariants: {
      variant: "default",
      disabled: false,
    },
  }
)

export const buttonTextVariants = cva("text-sm", {
  variants: {
    variant: {
      default: "text-gray-400 group-hover:text-gray-500",
      active: "text-gray-600 group-hover:text-gray-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export const buttonIconVariants = cva("w-5 h-5 transition", {
  variants: {
    variant: {
      default: "fill-gray-400 group-hover:fill-gray-500",
      active: "fill-gray-600 group-hover:fill-gray-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

interface MenuLinkProps
  extends Omit<React.ComponentProps<"button">, "size" | "disabled">,
    VariantProps<typeof buttonVariants> {
  icon?: React.ComponentProps<typeof Icon>["svg"]
}

export function MenuLink({
  variant,
  disabled,
  className,
  children,
  icon: IconComponent,
  ...props
}: MenuLinkProps) {
  return (
    <button
      className={buttonVariants({ variant, disabled, className })}
      {...props}
    >
      {IconComponent && (
        <Icon svg={IconComponent} className={buttonIconVariants({ variant })} />
      )}
      {children && (
        <Text
          variant="text-sm-bold"
          className={buttonTextVariants({ variant })}
        >
          {children}
        </Text>
      )}
    </button>
  )
}
