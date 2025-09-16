import Text from "@/core-components/text"
import { Button } from "@/core-components/button"
import { Modal } from "@/core-components/modal"

type ConfirmModalProps = {
  title?: string
  description?: string | React.ReactNode
  confirmLabel?: string
  cancelLabel?: string
  onConfirm?: () => void | Promise<void>
  onCancel?: () => void
}

export function ConfirmModal({
  title = "Confirm",
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <Modal.Root onClose={onCancel}>
      <Modal.Content>
        <Modal.Header>
          <Text as="span" variant="text-md" className="text-gray-200">
            {title}
          </Text>
        </Modal.Header>

        <Modal.Body>
          {typeof description === "string" ? (
            <Text variant="text-sm" className="text-gray-200">
              {description}
            </Text>
          ) : (
            description
          )}
        </Modal.Body>

        <Modal.Footer className="flex justify-end gap-2">
          <Button variant="secondary" size="sm" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button size="sm" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  )
}
