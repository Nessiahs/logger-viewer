import React, { useState } from "react";
import { IScriptError } from "../../db/logDb";
import { LogIcons, TLogIconsProps } from "../LogIcon";
import { OpenIndicator } from "../OpenIndicator";

type TLogDeatilEntryProps = {
  type: TLogIconsProps["type"];
} & IScriptError;

export const ScriptErrorDetailEntry: React.FunctionComponent<TLogDeatilEntryProps> = (
  props
) => {
  const [isOpen, setIsOpen] = useState(false);

  const date = new Date(props.time);

  return (
    <>
      <div
        className="flex ml-6 border-b border-gray-400 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}>
        <div className="w-4 mt-1.5">
          <OpenIndicator hasEntry={true} isOpen={isOpen} />
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
        <pre>{JSON.stringify(JSON.parse(props.stacktrace), undefined, 2)}</pre>
        <pre>{JSON.stringify(JSON.parse(props.react_info), undefined, 2)}</pre>
      </div>
    </>
  );
};
