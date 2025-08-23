import React, { type ReactElement, useState } from "react"

import { ProfileFormSection } from "./ProfileFormSection"
import { Button } from "../components/button"

import IconX from "../assets/icons/x.svg?react"
import Icon from "../components/icon"

export const PerfilDesktop = (): ReactElement => {
  const [isModalOpen, setIsModalOpen] = useState(true)

  const handleCloseModal = () => setIsModalOpen(false)
  const handleSave = () => {
    console.log("Saving profile...")
    setIsModalOpen(false)
  }

  return (
    <>
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#000000]/50 flex items-start md:items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="w-full max-w-[440px] mt-36 md:mt-0 bg-white rounded-lg border border-gray-500 shadow-lg overflow-hidden bg-gray-600">
            <header className="flex items-center justify-between px-6 py-4 border-b border-gray-500">
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
                
            </header>

            <ProfileFormSection />

            <footer className="px-6 py-4 border-t border-gray-500 bg-transparent">
              <Button
                className="w-full h-10 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-bluedark focus:ring-offset-2"
                onClick={handleSave}
                type="button"
              >
                Salvar
              </Button>
            </footer>
          </div>
        </div>
      )}
    </>
  )
}
