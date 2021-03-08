import React, { useState } from "react";
import { IConsoleInfo, IConsoleLog, IConsoleWarning } from "../../db/logDb";
import { LogIcons, TLogIconsProps } from "../LogIcon";
import { OpenIndicator } from "../OpenIndicator";

type TLogDeatilEntryProps = { type: TLogIconsProps["type"] } & (
  | IConsoleLog
  | IConsoleInfo
  | IConsoleWarning
);

export const LogDetailEntry: React.FunctionComponent<TLogDeatilEntryProps> = (
  props
) => {
  const [isOpen, setIsOpen] = useState(false);

  const hasExtra = props.extras !== "";
  const date = new Date(props.time);

  return (
    <>
      <div
        className={`flex ml-6 border-b border-gray-400${
          hasExtra === true ? "cursor-pointer" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}>
        <div className="w-4 mt-1.5">
          <OpenIndicator hasEntry={hasExtra} isOpen={isOpen} />
        </div>
        <div className="mt-1">
          <LogIcons type={props.type} />
        </div>
        <div className="flex-1">{JSON.parse(props.message)}</div>
        <div>
          {date.toLocaleDateString()} {date.toLocaleTimeString()}
        </div>
      </div>
      <div
        className="transition-all overflow-y-auto ml-6"
        style={{ maxHeight: isOpen === true ? "9999px" : 0 }}>
        <pre>{JSON.stringify(JSON.parse(props.extras), undefined, 2)}</pre>
      </div>
    </>
  );
};
