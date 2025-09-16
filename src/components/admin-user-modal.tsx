import Text from "@/core-components/text"
import { Button } from "@/core-components/button"
import IconX from "@/assets/icons/x.svg?react"
import Avatar from "@/core-components/avatar"
import { Modal } from "@/core-components/modal"
import { getAvatarUrl } from "@/utils/get-avatar-url"

type UserLike = {
  id: string
  name: string
  email: string
  role: "customer" | "tech" | "admin"
  avatarImg?: string
}

interface AdminUserModalProps {
  user: UserLike
  onClose: () => void
  onPromote?: (id: string) => Promise<void> | void
  onDemote?: (id: string) => Promise<void> | void
}

export function AdminUserModal({
  user,
  onClose,
  onPromote,
  onDemote,
}: AdminUserModalProps) {
  const canPromote = user.role === "customer"
  const canDemote = user.role === "tech"

  return (
    <Modal.Root onClose={onClose}>
      <Modal.Content>
        <Modal.Header>
          <h2 id="admin-user-modal-title" className="m-0 p-0">
            <Text as="span" variant="text-md" className="text-gray-200">
              User details
            </Text>
          </h2>
          <Button
            icon={IconX}
            size="sm"
            variant="link"
            onClick={onClose}
            aria-label="Close"
          />
        </Modal.Header>

        <Modal.Body>
          <div className="flex items-center gap-3">
            <Avatar size="medium" imageUrl={getAvatarUrl(user.avatarImg)}>
              {user.name?.charAt(0)?.toUpperCase()}
            </Avatar>
            <div className="min-w-0">
              <Text variant="text-sm" className="text-gray-200 truncate">
                {user.name}
              </Text>
              <Text variant="text-xs" className="text-gray-300 truncate">
                {user.email}
              </Text>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {canPromote && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onPromote?.(user.id)}
              >
                Promote to Tech
              </Button>
            )}
            {canDemote && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onDemote?.(user.id)}
              >
                Demote to Customer
              </Button>
            )}
          </div>
        </Modal.Body>

        <Modal.Footer className="flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  )
}
