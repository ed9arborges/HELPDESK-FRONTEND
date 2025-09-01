import React, { type ReactElement } from "react";
import Text from "../core-components/text";
import Icon from "../core-components/icon";
import IconBack from "../assets/icons/arrow-left.svg?react";

export const MainContentHeader = (): ReactElement => {
  const handleBackClick = () => {
    // Handle back navigation
    window.history.back();
  };

  return (
    <header className="flex w-[800px] items-end gap-4 relative flex-[0_0_auto] bg-transparent">
      <div className="gap-1 flex-1 grow flex flex-col items-start relative">
        <button
          className="all-[unset] box-border inline-flex h-5 items-center justify-center gap-2 px-0.5 py-0 relative cursor-pointer hover:opacity-80 transition-opacity"
          onClick={handleBackClick}
          type="button"
        >
          <Icon
            className="relative w-3.5 h-3.5"
            svg={IconBack}
          />

          <Text as="span" variant="text-xs" className="text-gray-300 relative w-fit whitespace-nowrap">
            Back
          </Text>
        </button>

        <Text as="h1" variant="text-xl-bold" className="relative self-stretch text-blue-dark">
          Detailed Request
        </Text>
      </div>
    </header>
  );
};
