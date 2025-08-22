import React, { type ReactElement, useState } from "react"

import { ProfileFormSection } from "./ProfileFormSection"
import { Button } from "../components/button"

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

              <button
                className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100"
                onClick={handleCloseModal}
                aria-label="Fechar modal"
                type="button"
              >
                <img
                  className="w-4 h-4"
                  alt="Fechar"
                  src="https://c.animaapp.com/OW9LC940/img/icon-x.svg"
                />
              </button>
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
