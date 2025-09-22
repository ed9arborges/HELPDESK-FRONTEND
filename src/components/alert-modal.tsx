import Text from "@core-components/text"
import { Button } from "@core-components/button"
import { Modal } from "@core-components/modal"

type AlertModalProps = {
  title?: string
  description: string | React.ReactNode
  closeLabel?: string
  onClose?: () => void
}

export function AlertModal({
  title = "Alert",
  description,
  closeLabel = "OK",
  onClose,
}: AlertModalProps) {
  return (
    <Modal.Root onClose={onClose}>
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

        <Modal.Footer className="flex justify-end">
          <Button onClick={onClose}>{closeLabel}</Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  )
}
