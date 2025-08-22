import React, { useState } from "react"
import type { ReactElement } from "react"
// Adjust this import to match the actual location of your Button component in the project
import { Button } from "../components/button"
import IconUpload from "../assets/icons/upload.svg?react"

export const ProfileFormSection = (): ReactElement => {
  const [formData, setFormData] = useState({
    name: "André Costa",
    email: "andre.costa@client.com",
    password: "••••••••",
  })

  const [showPassword, setShowPassword] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = () => {
    console.log("Upload new image")
  }

  const handleImageDelete = () => {
    console.log("Delete image")
  }

  const handlePasswordChange = () => {
    console.log("Change password")
  }

  return (
    <section className="flex flex-col gap-5 pt-7 pb-8 px-7 w-full ">
      <div className="flex items-center gap-3">
        <div
          role="img"
          aria-label="Profile avatar"
          className="w-12 h-12 rounded-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://c.animaapp.com/OW9LC940/img/avatar@2x.png)",
          }}
        />

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            type="button"
            aria-label="Upload new profile image"
            onClick={handleImageUpload}
            className=""
            icon={IconUpload}
          >
            <span className="text-xs font-text-xxs text-grayscalegray-200">
              Nova imagem
            </span>
          </Button>

          <Button
            variant="secondary"
            size="sm"
            type="button"
            aria-label="Delete profile image"
            onClick={handleImageDelete}
            className=""
          >
            <img
              aria-hidden
              alt=""
              src="https://c.animaapp.com/OW9LC940/img/icon-trash.svg"
              className="w-3.5 h-3.5"
            />
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <div className="w-full">
          <label
            htmlFor="name-input"
            className="block text-xs text-grayscalegray-300 font-text-xxs"
          >
            NaME
          </label>

          <div className="flex items-center h-10 gap-2 border-b border-grayscalegray-500">
            <input
              id="name-input"
              type="text"
              aria-label="Name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="flex-1 bg-transparent border-0 p-0 text-base text-[#1e1f24] focus:outline-none"
            />
          </div>
        </div>

        <div className="w-full">
          <label
            htmlFor="email-input"
            className="block text-xs text-grayscalegray-300 font-text-xxs"
          >
            E-MAIL
          </label>

          <div className="flex items-center h-10 gap-2 border-b border-grayscalegray-500">
            <input
              id="email-input"
              type="email"
              aria-label="Email"
              placeholder="andre.costa@client.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="flex-1 bg-transparent border-0 p-0 text-sm text-grayscalegray-200 focus:outline-none font-text-md"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 w-full">
          <div className="flex-1">
            <label
              htmlFor="password-input"
              className="block text-xs text-grayscalegray-300 font-text-xxs"
            >
              SENHA
            </label>

            <div className="flex items-center h-10 gap-2 border-b border-grayscalegray-500">
              <input
                id="password-input"
                type={showPassword ? "text" : "password"}
                aria-label="Password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="flex-1 bg-transparent border-0 p-0 text-sm text-grayscalegray-200 focus:outline-none font-text-md"
              />
            </div>
          </div>

          <div className="flex-shrink-0">
            <Button
              variant="secondary"
              size="sm"
              aria-label="Change password"
              onClick={handlePasswordChange}
              className="h-7 px-2 bg-grayscalegray-500 rounded-md hover:bg-grayscalegray-400 focus:outline-2 focus:outline-bluebase transition-colors text-xs text-grayscalegray-200"
            >
              Alterar
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
