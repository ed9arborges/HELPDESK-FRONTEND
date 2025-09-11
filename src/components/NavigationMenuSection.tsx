import React, { useState, type ReactElement } from "react"
import { useNavigate } from "react-router"
import { MenuLink } from "@core-components/menu-link"
import { Button } from "@core-components/button"
import Text from "@core-components/text"

import IconClipBoard from "@assets/icons/clipboard-list.svg?react"
import BurgerIcon from "../assets/icons/menu.svg?react";
import XIcon from "../assets/icons/x.svg?react";

import { HeaderNav } from "@core-components/header-nav"
import { UserMenu } from "./user-menu"

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
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [navigationItems] = useState<NavigationItem[]>([
    {
      id: "meus-chamados",
      icon: IconClipBoard,
      label: "My Requests",
      isActive: true,
      bgColor: "bg-blue-dark",
      textColor: "text-gray-600",
      link: "/",
    },
    {
      id: "criar-chamado",
      icon: IconClipBoard,
      label: "New Request",
      isActive: false,
      bgColor: "bg-gray-100",
      textColor: "text-gray-400",
      link: "/tickets/create",
    },
  ])

  const [userProfile] = useState<UserProfile>({
    initials: "UC",
    name: "Usuário Cliente",
    email: "user.client@test.com",
  })
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen)
  }
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
        <div >
          <Button
            onClick={handleMenuToggle}
            icon={isMenuOpen ? XIcon : BurgerIcon}
          />

          {isMenuOpen && (
            <aside className="flex flex-col items-start gap-4 px-5 py-4 absolute top-[100px] left-2 right-2 bg-gray-100 rounded-[10px] overflow-hidden border border-solid border-gray-400 shadow-[0px_0px_0px_#1e1e1e1a,0px_3px_7px_#1e1e1e1a,0px_13px_13px_#1e1e1e17,0px_29px_18px_#1e1e1e0d,0px_52px_21px_#1e1e1e03,0px_82px_23px_transparent] z-10">
              <Text
                as="h2"
                variant="text-xxs"
                className="relative w-fit mt-[-1.00px] text-gray-600"
              >
                MENU
              </Text>

              <ul className="flex flex-col items-start gap-1 relative self-stretch w-full flex-[0_0_auto]">
                {navigationItems.map((item) => (
                  <li key={item.id} className="relative self-stretch w-full">
                    <MenuLink
                      icon={item.icon}
                      variant={item.isActive ? "active" : "default"}
                      onClick={() => handleNavigationClick(item.link, item.id)}
                    >
                      {item.label}
                    </MenuLink>
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>
        <HeaderNav>Customer</HeaderNav>
        <UserMenu userProfile={userProfile} />
      </nav>
    </>
  )
}
