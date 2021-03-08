import React from "react";
import { Icons, TIconNames } from "./IconNames";

export type TIconProps = {
  icon?: TIconNames;
  className?: string[];
  size?: number;
};

export const Icon: React.FunctionComponent<TIconProps> = ({
  icon,
  className = [],
  size = 4,
}) => {
  if (!icon || Object.keys(Icons).includes(icon) === false) {
    return null;
  }

  const cIcon = Icons[icon];
  return (
    <div
      className={`h-${size} w-${size} fill ${className.join(
        " "
      )} ml-auto mr-auto mt-0`}
      dangerouslySetInnerHTML={{ __html: cIcon }}
    />
  );
};
