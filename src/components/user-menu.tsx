import { useState } from "react";
import { Card } from "./card";
import Avatar from "@/core-components/avatar";


type UserProfile = {
  name: string;
  email: string;
  initials: string;
};

type UserMenuProps = {
  userProfile: UserProfile;
};

export function UserMenu({ userProfile }: UserMenuProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div className="relative mb-5">
        {menuOpen && (
          <>
            <Card className="hidden md:flex absolute left-full bottom-0 ml-2 w-[198px] z-50" />
            <Card className="flex md:hidden fixed left-2 right-2 top-24 w-auto z-50" />
          </>
        )}

        <section className="flex gap-3 px-4 py-5 border-t border-gray-200 items-center">
          <Avatar
            className="hover:cursor-pointer"
            onClick={toggleMenu}
          >
            <span className="text-sm text-gray-600 font-normal">
              {userProfile.initials}
            </span>
          </Avatar>

          <div className="hidden md:flex flex-col flex-1">
            <span className="text-sm font-normal text-gray-600">
              {userProfile.name}
            </span>

            <span className="text-xs font-normal text-gray-400 truncate">
              {userProfile.email}
            </span>
          </div>
        </section>
      </div>
    </>
  )
}
