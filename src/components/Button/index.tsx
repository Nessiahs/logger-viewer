import React from "react";
import { Icon, TIconProps } from "../Icon";
import { TIconNames } from "../Icon/IconNames";

type TButtonProps = {
  text?: string;
  icon?: TIconNames;
  iconProps?: TIconProps;
  disabled?: boolean;
  className?: string[];
  onClick?: (...props: any) => void;
};

export const Button: React.FunctionComponent<TButtonProps> = ({
  text = "",
  icon,
  disabled = false,
  iconProps,
  className = ["btn-primary"],
  onClick,
}) => {
  return (
    <>
      <button
        className={`btn ${className.join(" ")}`}
        disabled={disabled}
        onClick={() => {
          if (typeof onClick === "function") {
            onClick();
          }
        }}>
        <Icon icon={icon} {...iconProps} /> {text}
      </button>
    </>
  );
};
