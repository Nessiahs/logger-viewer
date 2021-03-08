import React from "react";
import { Icon } from "../Icon";
import { TIconNames } from "../Icon/IconNames";

type TIconConfig = {
  log: TConfig;
  info: TConfig;
  warning: TConfig;
  error: TConfig;
  scriptError: TConfig;
};

type TConfig = {
  icon: TIconNames;
  color: string;
};

const iconConfig: TIconConfig = {
  log: {
    icon: "EXCLAMATION_CIRCLE_SOLID",
    color: "text-blue-500",
  },
  info: {
    icon: "EXCLAMATION_TRIANGLE_SOLID",
    color: "text-yellow-500",
  },
  warning: {
    icon: "EXCLAMATION_TRIANGLE_SOLID",
    color: "text-yellow-600",
  },
  error: {
    icon: "EXCLAMATION_TRIANGLE_SOLID",
    color: "text-red-500",
  },
  scriptError: {
    icon: "EXCLAMATION_TRIANGLE_SOLID",
    color: "text-red-700",
  },
};

export type TLogIconsProps = { type: keyof TIconConfig };

export const LogIcons: React.FunctionComponent<TLogIconsProps> = ({ type }) => {
  const { icon, color } = iconConfig[type];
  return (
    <>
      <Icon icon={icon} className={[color]} />
    </>
  );
};
