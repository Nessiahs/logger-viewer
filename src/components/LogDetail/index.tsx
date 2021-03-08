import React from "react";
import {
  IConsoleError,
  IConsoleInfo,
  IConsoleLog,
  IConsoleWarning,
  IScriptError,
} from "../../db/logDb";
import { LogDetailEntry } from "./logDetailEntry";

type TLogDetailProps = {
  isOpen: boolean;
  hasEntry: boolean;
  log: IConsoleLog[];
  info: IConsoleInfo[];
  warning: IConsoleWarning[];
  error: IConsoleError[];
  scriptError: IScriptError[];
};

export const LogDetail: React.FunctionComponent<TLogDetailProps> = ({
  isOpen,
  log,
  info,
  warning,
  error,
  scriptError,
  hasEntry,
}) => {
  if (hasEntry === false) {
    return null;
  }

  return (
    <div
      className="transition-all overflow-hidden"
      style={{ maxHeight: isOpen === true ? "999px" : 0 }}>
      {log.map((item) => (
        <LogDetailEntry {...item} />
      ))}
      {info.map((item) => (
        <LogDetailEntry {...item} />
      ))}
      {warning.map((item) => (
        <LogDetailEntry {...item} />
      ))}
    </div>
  );
};
