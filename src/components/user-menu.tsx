import { useState } from "react"
import { Card } from "./card"
import Avatar from "@/core-components/avatar"
import { useAuth } from "@/hooks/useAuth"
import { getInitials } from "@/utils/get-initials"
import { getAvatarUrl } from "@/utils/get-avatar-url"

export function UserMenu() {
  const { session } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const name = session?.user.name ?? ""
  const email = session?.user.email ?? ""
  const initials = getInitials(name)
  const avatarUrl = getAvatarUrl(session?.user.avatarImg)

  return (
    <>
      <section className="flex gap-3 px-4 py-5 border-t border-gray-200 items-center relative">
        {" "}
        {menuOpen && (
          <>
            <Card
              className="hidden md:flex absolute left-full bottom-0 ml-2 w-[198px] z-50"
              onClose={() => setMenuOpen(false)}
            />
            <Card
              className="flex md:hidden fixed left-2 right-2 top-24 w-auto z-50"
              onClose={() => setMenuOpen(false)}
            />
          </>
        )}
        <Avatar
          className="mr-6 md:mr-0 hover:cursor-pointer"
          onClick={toggleMenu}
          imageUrl={avatarUrl}
        >
          <span className="text-sm text-gray-600 font-normal">{initials}</span>
        </Avatar>
        <div className="hidden md:flex flex-col flex-1">
          <span className="text-sm font-normal text-gray-600">
            {name || "—"}
          </span>

          <span className="text-xs font-normal text-gray-400 truncate">
            {email || ""}
          </span>
        </div>
      </section>
    </>
  )
}
