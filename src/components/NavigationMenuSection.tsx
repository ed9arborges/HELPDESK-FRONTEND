import React, { useState, type ReactElement } from "react"
import { useNavigate } from "react-router"
import { MenuLink } from "@core-components/menu-link"
import { Button } from "@core-components/button"
import Text from "@core-components/text"

import IconClipBoard from "@assets/icons/clipboard-list.svg?react"
import IconCustomers from "@assets/icons/briefcase-business.svg?react"
import IconServices from "@assets/icons/wrench.svg?react"
import IconTechs from "@assets/icons/users.svg?react"
import IconAdd from "@assets/icons/plus.svg?react"
import BurgerIcon from "../assets/icons/menu.svg?react"
import XIcon from "../assets/icons/x.svg?react"

import { HeaderNav } from "@core-components/header-nav"
import { UserMenu } from "./user-menu"
import { useAuth } from "@/hooks/useAuth"

interface NavigationItem {
  id: string
  icon: React.FC<React.ComponentProps<"svg">>
  label: string
  isActive: boolean
  link: string
}

//

export const NavigationMenuSection = (): ReactElement => {
  const { session } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const role = session?.user.role
  const isCustomer = role === "customer"
  const isAdmin = role === "admin"
  const [navigationItems] = useState<NavigationItem[]>(
    isCustomer
      ? [
          {
            id: "meus-chamados",
            icon: IconClipBoard,
            label: "My Requests",
            isActive: true,
            link: "/",
          },
          {
            id: "criar-chamado",
            icon: IconAdd,
            label: "New Request",
            isActive: false,
            link: "/tickets/create",
          },
        ]
      : [
          {
            id: "todos-chamados",
            icon: IconClipBoard,
            label: "All Tickets",
            isActive: true,
            link: "/",
          },
          ...(isAdmin
            ? [
                {
                  id: "admin-users",
                  icon: IconCustomers,
                  label: "Customers",
                  isActive: false,
                  link: "/admin/users",
                },
                {
                  id: "admin-techs",
                  icon: IconTechs,
                  label: "Technicians",
                  isActive: false, 
                  link: "/admin/techs",
                },
                {
                  id: "admin-services",
                  icon: IconServices,
                  label: "Category Services",
                  isActive: false,                
                  link: "/admin/services",
                },
              ]
            : []),
        ]
  )

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  const navigate = useNavigate()

  // track active item by id 
  const [activeId, setActiveId] = useState<string>(
    () => navigationItems.find((i) => i.isActive)?.id ?? navigationItems[0].id
  )

  function handleNavigationClick(link: string, id: string) {
    setActiveId(id)
    navigate(link)
  }

  return (
    <>
      <nav className="hidden md:flex flex-col w-52 bg-transparent min-h-screen justify-between">
        <div>
          <HeaderNav>
            {isCustomer ? "Customer" : role === "admin" ? "Admin" : "Tech"}
          </HeaderNav>

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

        <UserMenu />
      </nav>

      <nav className="md:hidden flex w-full justify-between gap-4 h-10 m-6">
        <div>
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
        <HeaderNav>
          {isCustomer ? "Customer" : role === "admin" ? "Admin" : "Tech"}
        </HeaderNav>
        <UserMenu />
      </nav>
    </>
  )
}
