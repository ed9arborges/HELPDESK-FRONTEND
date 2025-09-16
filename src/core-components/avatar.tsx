import React from "react"
import Text from "@core-components/text"
import { cva, type VariantProps } from "class-variance-authority"
import { getAvatarUrl } from "@utils/get-avatar-url"

export const avatarVariants = cva(
  "rounded-full flex items-center justify-center overflow-hidden",
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

interface AvatarProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof avatarVariants> {
  imageUrl?: string
}

export default function Avatar({
  className,
  children,
  size,
  imageUrl,
  ...props
}: AvatarProps) {
  // Process the image URL through our utility function if needed
  const avatarSrc = imageUrl?.startsWith("http")
    ? imageUrl
    : getAvatarUrl(imageUrl)

  const [imgError, setImgError] = React.useState(false)

  // Handle image loading error
  const handleError = () => {
    console.warn("Failed to load avatar image:", avatarSrc)
    setImgError(true)
  }

  return (
    <div className={avatarVariants({ className, size })} {...props}>
      {avatarSrc && !imgError ? (
        <img
          src={avatarSrc}
          alt="Avatar"
          className="w-full h-full object-cover"
          onError={handleError}
        />
      ) : (
        <div className="w-full h-full bg-blue-dark flex items-center justify-center">
          <Text>{children}</Text>
        </div>
      )}
    </div>
  )
}
