import React, { useState, type ReactElement } from "react"
import { MenuLink } from "../core-components/menu-link"

import IconClipBoard from "../assets/icons/clipboard-list.svg?react"
import { Header } from "./Header"
import { HeaderNav } from "../core-components/header-nav"
import { UserMenu } from "../core-components/user-menu"

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
      className="flex flex-col w-52 bg-transparent min-h-screen justify-between"
      role="navigation"
      aria-label="Menu principal"
    >
      <div>
        <HeaderNav>Customer</HeaderNav>

        <main className="px-4 py-5 overflow-auto">
          <ul className="flex flex-col gap-1" role="list">
            {navigationItems.map((item) => (
              <li key={item.id} className="w-full">
                <MenuLink
                  icon={item.icon}
                  variant={item.isActive ? "active" : "default"}
                  onClick={() => handleNavigationClick(item.id)}
                >
                  {item.label}
                </MenuLink>
              </li>
            ))}
          </ul>
        </main>
      </div>

      <UserMenu userProfile={userProfile} />
    </nav>
  )
}
