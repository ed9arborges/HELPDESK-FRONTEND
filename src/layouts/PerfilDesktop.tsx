import { type ReactElement, useRef, useState } from "react"

import {
  ProfileFormSection,
  type ProfileFormSectionRef,
} from "./ProfileFormSection"
import { Button } from "@core-components/button"
import { Modal } from "@/core-components/modal"

import IconX from "@assets/icons/x.svg?react"

interface PerfilDesktopProps {
  onCloseCard?: () => void
}

export const PerfilDesktop = ({
  onCloseCard,
}: PerfilDesktopProps): ReactElement => {
  const [isModalOpen, setIsModalOpen] = useState(true)
  const formRef = useRef<ProfileFormSectionRef>(null)

  const handleCloseModal = () => {
    setIsModalOpen(false)
    onCloseCard?.()
  }
  const handleSave = async () => {
    await formRef.current?.save()
    setIsModalOpen(false)
    onCloseCard?.()
  }

  return (
    <>
      {isModalOpen && (
        <Modal.Root onClose={handleCloseModal}>
          <Modal.Content>
            <Modal.Header>
              <h2
                id="modal-title"
                className="text-lg font-semibold text-gray-800 truncate"
              >
                Profile
              </h2>
              <Button
                icon={IconX}
                size="sm"
                onClick={handleCloseModal}
                aria-label="Fechar modal"
                type="button"
                variant="link"
              />
            </Modal.Header>

            <ProfileFormSection ref={formRef} />

            <Modal.Footer>
              <Button
                className="w-full h-10 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-bluedark focus:ring-offset-2"
                onClick={handleSave}
                type="button"
              >
                Salvar
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal.Root>
      )}
    </>
  )
}
