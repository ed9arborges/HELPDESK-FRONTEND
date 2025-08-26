import React, { useState, type ReactElement } from "react"
import { cx } from "class-variance-authority"

import Text from "../core-components/text"
import { PerfilDesktop } from "../layouts/PerfilDesktop"

import IconProfile from "../assets/icons/circle-user.svg?react"
import IconOut from "../assets/icons/log-out.svg?react"
import Icon from "../core-components/icon"

interface MenuOptionProps {
  id: string
  icon: React.ComponentProps<typeof Icon>["svg"]
  label: string
  textColor: string
  onClick?: () => void
}

export const Card = ({ className }: { className: string }): ReactElement => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const menuOptions: MenuOptionProps[] = [
    {
      id: "profile",
      icon: IconProfile,
      label: "Profile",
      textColor: "text-gray-500",
      onClick: () => {
        setSelectedOption("profile")        
      },
    },
    {
      id: "logout",
      icon: IconOut,
      label: "Sair",
      textColor: "text-feedbackdanger",
      onClick: () => {
        setSelectedOption("logout")
        console.log("Logout clicked")
      },
    },
  ]

  return (
    <>
      <fieldset
        className={cx(
          className,
          "flex flex-col items-start gap-4 px-5 py-4 bg-gray-100 rounded-[10px] overflow-hidden"
        )}
      >
        <Text
          variant="text-xxs"
          className="relative w-fit mt-[-1.00px] text-gray-500"
        >
          Options
        </Text>

        <ul className="flex-col items-start flex-[0_0_auto] flex relative self-stretch w-full">
          {menuOptions.map((option) => (
            <li key={option.id} className="contents">
                <button
                className={`h-10 items-center gap-2 flex relative self-stretch w-full hover:bg-gray-200 focus:bg-gray-200 rounded transition-colors duration-200 ${
                  selectedOption === option.id ? "bg-gray-200" : ""
                }`}
                onClick={option.onClick}
                aria-label={option.label}
                type="button"
                >
                <Icon
                  className={`relative w-5 h-5 ${option.id === "logout" ? "fill-feedback-danger" : "fill-gray-600"}`}
                  svg={option.icon}
                />

                <Text variant="text-md" className={`relative flex-1 text-left ${option.id === "logout" ? "text-feedback-danger" : "text-gray-600"}`}>
                  {option.label}
                </Text>
                </button>
            </li>
          ))}
        </ul>
      </fieldset>
      { selectedOption === "profile" && <PerfilDesktop /> }
    </>
  )
}
