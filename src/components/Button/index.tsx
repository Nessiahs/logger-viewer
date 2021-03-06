import React from "react";
import { Icon, TIconProps } from "../Icon";
import { TIconNames } from "../Icon/IconNames";

type TButtonProps = {
  text?: string;
  icon?: TIconNames;
  iconProps?: TIconProps;
};

export const Button: React.FunctionComponent<TButtonProps> = ({
  text = "",
  icon,
  iconProps,
}) => {
  return (
    <button className="btn btn-blue">
      <Icon icon={icon} {...iconProps} /> {text}
    </button>
  );
};
