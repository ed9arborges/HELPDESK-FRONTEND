import React, { useState, type ReactElement } from "react"
import { useNavigate } from "react-router"
import { MenuLink } from "../core-components/menu-link"

import IconClipBoard from "../assets/icons/clipboard-list.svg?react"

import { HeaderNav } from "../core-components/header-nav"
import { UserMenu } from "./user-menu"
import { MenuMobile } from "@core-components/menu-mobile"

interface NavigationItem {
  id: string
  icon: React.FC<React.ComponentProps<"svg">>
  label: string
  isActive: boolean
  bgColor: string
  textColor: string
  link: string
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
      link: "/dashboard",
    },
    {
      id: "criar-chamado",
      icon: IconClipBoard,
      label: "Criar chamado",
      isActive: false,
      bgColor: "bg-gray-100",
      textColor: "text-gray-400",
      link: "/requests/create",
    },
  ])

  const [userProfile] = useState<UserProfile>({
    initials: "UC",
    name: "Usuário Cliente",
    email: "user.client@test.com",
  })

  const navigate = useNavigate()

  // track active item by id instead of mutating the items array
  const [activeId, setActiveId] = useState<string>(
    () => navigationItems.find((i) => i.isActive)?.id ?? navigationItems[0].id
  )

  function handleNavigationClick(link: string, id: string) {
    setActiveId(id)
    navigate(link)
    console.log(`Navigation click: ${link}`)
  }

  return (
    <>
      <nav className="hidden md:flex flex-col w-52 bg-transparent min-h-screen justify-between">
        <div>
          <HeaderNav>Customer</HeaderNav>

          <main className="px-4 py-5 overflow-auto">
            <ul className="flex flex-col gap-1" role="list">
              {navigationItems.map((item) => (
                <li key={item.id} className="w-full">
                  <MenuLink
                    icon={item.icon}
                    variant={item.id === activeId ? "active" : "default"}
                    onClick={() => handleNavigationClick(item.link, item.id)}
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

      <nav className="md:hidden flex w-full justify-between gap-4 h-10 m-6">
        <MenuMobile />
        <HeaderNav>Customer</HeaderNav>
        <UserMenu userProfile={userProfile} />
      </nav>
    </>
  )
}
