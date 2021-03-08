import React from "react";
import { Icon } from "../Icon";

type TOpenIndicator = {
  hasEntry: boolean;
  isOpen: boolean;
};

export const OpenIndicator: React.FunctionComponent<TOpenIndicator> = ({
  hasEntry,
  isOpen,
}) => {
  if (hasEntry === false) {
    return null;
  }

  return (
    <Icon
      icon={isOpen === true ? "CHEVRON_DOWN_SOLID" : "CHEVRON_RIGHT_SOLID"}
      size={isOpen === true ? 3 : 2}
    />
  );
};
