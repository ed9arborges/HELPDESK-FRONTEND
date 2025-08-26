import React, { useState, type ReactElement } from "react";
import { cx } from "class-variance-authority";

import Text from "../core-components/text";

interface MenuOption {
  id: string;
  icon: string;
  label: string;
  textColor: string;
  onClick?: () => void;
}

export const Card = ({className}: {className: string}): ReactElement => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const menuOptions: MenuOption[] = [
    {
      id: "profile",
      icon: "https://c.animaapp.com/hANDwgrJ/img/icon-circle-user.svg",
      label: "Profile",
      textColor: "text-gray-500",
      onClick: () => {
        setSelectedOption("profile");
        console.log("Profile clicked");
      },
    },
    {
      id: "logout",
      icon: "https://c.animaapp.com/hANDwgrJ/img/icon-log-out.svg",
      label: "Sair",
      textColor: "text-feedbackdanger",
      onClick: () => {
        setSelectedOption("logout");
        console.log("Logout clicked");
      },
    },
  ];

  return (
    <fieldset
      className={cx(className,"flex flex-col items-start gap-4 px-5 py-4 bg-gray-100 rounded-[10px] overflow-hidden")}
    >
      <Text variant="text-xxs" className="relative w-fit mt-[-1.00px] text-gray-500">
        Options
      </Text>

      <ul className="flex-col items-start flex-[0_0_auto] flex relative self-stretch w-full">
        {menuOptions.map((option) => (
          <li key={option.id} className="contents">
            <button
              className={`h-10 items-center gap-2 flex relative self-stretch w-full hover:bg-grayscalegray-200 focus:bg-grayscalegray-200 focus:outline-none focus:ring-2 focus:ring-bluebase focus:ring-opacity-50 rounded transition-colors duration-200 ${
                selectedOption === option.id ? "bg-grayscalegray-200" : ""
              }`}
              onClick={option.onClick}
              aria-label={option.label}
              type="button"
            >
              <img
                className="relative w-5 h-5"
                alt=""
                src={option.icon}
                role="presentation"
              />

              <span
                className={`relative flex-1 font-text-md font-[number:var(--text-md-font-weight)] ${option.textColor} text-[length:var(--text-md-font-size)] tracking-[var(--text-md-letter-spacing)] leading-[var(--text-md-line-height)] [font-style:var(--text-md-font-style)] text-left`}
              >
                {option.label}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </fieldset>
  );
};
