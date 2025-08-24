import React, { useState, type ReactElement } from "react"
import { MenuLink } from "../core-components/menu-link"

import IconClipBoard from "../assets/icons/clipboard-list.svg?react"
import { Header } from "./Header"
import { HeaderNav } from "../core-components/header-nav"

interface NavigationItem {
  id: string
  icon: React.FC<React.ComponentProps<"svg">>
  label: string
  isActive: boolean
  bgColor: string
  textColor: string
}

interface UserProfile {
  initials: string
  name: string
  email: string
}

export const NavigationMenuSection = (): ReactElement => {
  const [navigationItems] = useState<NavigationItem[]>([
    {
      id: "meus-chamados",
      icon: IconClipBoard,
      label: "Meus chamados",
      isActive: true,
      bgColor: "bg-blue-dark",
      textColor: "text-gray-600",
     
    },
    {
      id: "criar-chamado",
      icon: IconClipBoard,
      label: "Criar chamado",
      isActive: false,
      bgColor: "bg-gray-100",
      textColor: "text-gray-400",
      
    },
  ])

  const [userProfile] = useState<UserProfile>({
    initials: "UC",
    name: "Usuário Cliente",
    email: "user.client@test.com",
  })

  const handleNavigationClick = (itemId: string) => {
    console.log(`Navigation clicked: ${itemId}`)
  }

  return (
    <nav
      className="flex flex-col w-52 bg-transparent"
      role="navigation"
      aria-label="Menu principal"
    >
      <HeaderNav >Customer</HeaderNav>

      <main className="flex-1 px-4 py-5">
        <ul className="flex flex-col gap-1" role="list">
          {navigationItems.map((item) => (
            <li key={item.id} className="w-full">
              <MenuLink icon={item.icon} variant={item.isActive ? "active" : "default"} onClick={() => handleNavigationClick(item.id)}>{item.label}</MenuLink>
            </li>
          ))}
        </ul>
      </main>

      <footer className="flex items-center gap-3 px-4 py-5 w-full border-t border-gray-200">
        <div
          className="w-8 h-8 bg-bluedark rounded-full flex items-center justify-center"
          aria-hidden="true"
        >
          <span className="text-sm text-gray-600 font-normal">
            {userProfile.initials}
          </span>
        </div>

        <div className="flex flex-col flex-1">
          <span className="text-sm font-normal text-gray-600">
            {userProfile.name}
          </span>

          <span className="text-xs font-normal text-gray-400 truncate">
            {userProfile.email}
          </span>
        </div>
      </footer>
    </nav>
  )
}
