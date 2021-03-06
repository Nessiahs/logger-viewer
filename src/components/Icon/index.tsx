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
  if (!icon) {
    return null;
  }

  return (
    <div
      className={`h-${size} w-${size} fill ${className.join(
        ","
      )} ml-auto mr-auto mt-0`}
      dangerouslySetInnerHTML={{ __html: Icons[icon] }}></div>
  );
};
