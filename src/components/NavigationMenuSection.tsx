import React, { useState, type ReactElement } from "react"

interface NavigationItem {
  id: string
  icon: string
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
      icon: "https://c.animaapp.com/OW9LC940/img/icon-clipboard-list.svg",
      label: "Meus chamados",
      isActive: true,
      bgColor: "bg-blue-dark",
      textColor: "text-gray-600",
    },
    {
      id: "criar-chamado",
      icon: "https://c.animaapp.com/OW9LC940/img/icon-plus.svg",
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
      <header className="flex items-center gap-3 px-5 py-6 w-full border-b border-gray-200">
        <img
          className="w-11 h-11"
          alt="Logo HelpDesk"
          src="https://c.animaapp.com/OW9LC940/img/logo-iconlight.svg"
        />

        <div className="flex flex-col">
          <h1 className="text-lg text-md text-gray-600 leading-tight">
            HelpDesk
          </h1>

          <span className="text-xs uppercase text-blue-light">CLIENTE</span>
        </div>
      </header>

      <main className="flex-1 px-4 py-5">
        <ul className="flex flex-col gap-1" role="list">
          {navigationItems.map((item) => (
            <li key={item.id} className="w-full">
              <button
                className={`flex items-center gap-3 w-full p-3 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-bluebase focus:ring-offset-2 ${item.bgColor}`}
                onClick={() => handleNavigationClick(item.id)}
                aria-current={item.isActive ? "page" : undefined}
                type="button"
              >
                <img
                  className="w-5 h-5"
                  alt=""
                  src={item.icon}
                  aria-hidden="true"
                />

                <span
                  className={`flex-1 text-sm ${item.textColor} ${
                    item.id === "criar-chamado" ? "whitespace-nowrap" : "truncate"
                  }`}
                >
                  {item.label}
                </span>
              </button>
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
