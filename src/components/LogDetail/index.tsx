import React from "react";
import {
  IConsoleError,
  IConsoleInfo,
  IConsoleLog,
  IConsoleWarning,
  IScriptError,
} from "../../db/logDb";
import { ErrorDetailEntry } from "./errorDetail";
import { LogDetailEntry } from "./logDetailEntry";
import { ScriptErrorDetailEntry } from "./scriptErrorDetail";

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
        <LogDetailEntry {...item} type="log" />
      ))}

      {info.map((item) => (
        <LogDetailEntry {...item} type="info" />
      ))}

      {warning.map((item) => (
        <LogDetailEntry {...item} type="warning" />
      ))}

      {error.map((item) => (
        <ErrorDetailEntry {...item} type="error" />
      ))}

      {scriptError.map((item) => (
        <ScriptErrorDetailEntry {...item} type="scriptError" />
      ))}
    </div>
  );
};
