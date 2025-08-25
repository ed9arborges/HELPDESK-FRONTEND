import React, { useState, type ReactElement } from "react";
import { Button } from "./button";
import Text from "./text";

import BurgerIcon from "../assets/icons/menu.svg?react";
import XIcon from "../assets/icons/x.svg?react";
import { MenuLink } from "./menu-link";

import IconClipBoard from "../assets/icons/clipboard-list.svg?react"

interface MenuItem {
  id: string;
  label: string;
  icon: React.FC<React.ComponentProps<"svg">>;
  isActive: boolean;
}

export const MenuMobile = (): ReactElement => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems: MenuItem[] = [
    {
      id: "chamados",
      label: "Chamados",
      icon: IconClipBoard,
      isActive: true,
    },
    {
      id: "tecnicos",
      label: "Técnicos",
      icon: IconClipBoard,
      isActive: false,
    },
    {
      id: "servicos",
      label: "Serviços",
      icon: IconClipBoard,
      isActive: false,
    },
  ];

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = (itemId: string) => {
    console.log(`Menu item clicked: ${itemId}`);
  };

  return (
    <>
      <Button
          onClick={handleMenuToggle}
          icon={isMenuOpen ? XIcon : BurgerIcon}
        />
        
      {isMenuOpen && (
        <aside
          className="flex flex-col items-start gap-4 px-5 py-4 absolute top-[100px] left-2 right-2 bg-gray-100 rounded-[10px] overflow-hidden border border-solid border-gray-400 shadow-[0px_0px_0px_#1e1e1e1a,0px_3px_7px_#1e1e1e1a,0px_13px_13px_#1e1e1e17,0px_29px_18px_#1e1e1e0d,0px_52px_21px_#1e1e1e03,0px_82px_23px_transparent] z-10"
         
        >
          <Text as="h2" variant="text-xxs" className="relative w-fit mt-[-1.00px] text-gray-600">
            MENU
          </Text>

          <ul className="flex flex-col items-start gap-1 relative self-stretch w-full flex-[0_0_auto]">
            {menuItems.map((item) => (
              <li key={item.id} role="none" className="relative self-stretch w-full">
                <MenuLink 
                  icon={item.icon}
                  variant={item.isActive ? "active" : "default"}
                  onClick={() => handleMenuItemClick(item.id)}
                >
                  {item.label}
                </MenuLink>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </>
  );
};
