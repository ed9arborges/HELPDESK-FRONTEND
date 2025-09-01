import React from "react"
import Text from "@core-components/text"
import { cva, type VariantProps } from "class-variance-authority"

export const avatarVariants = cva(
  " bg-blue-dark rounded-full flex items-center justify-center text-sm text-gray-600",
  {
    variants: {
      size: {
        small: "w-5 h-5",
        medium: "w-8 h-8",        
      },
    },
    defaultVariants: {
      size: "medium",
    },
  }
)

interface AvatarProps extends React.ComponentProps<"div">, VariantProps<typeof avatarVariants> {}

export default function Avatar({
  className,
  children,
  size,
  ...props
}: AvatarProps) {
  return (
    <div className={avatarVariants({ className, size })} {...props}>
      <Text>{children}</Text>
    </div>
  )
}
