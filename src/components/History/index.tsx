import React, { useState } from "react";
import { ImportDb, IPagestart } from "../../db/logDb";
import { useGetScriptErrorByPage } from "../../hooks/getScriptErrorByPage";
import { useGetErrorByPage } from "../../hooks/useGetErrorByPage";
import { useGetInfoByPage } from "../../hooks/useGetInfoByPage";
import { useGetLogByPage } from "../../hooks/useGetLogByPage";
import { useGetWarningByPage } from "../../hooks/useGetWarningByPage";
import { Icon } from "../Icon";
import { LogDetail } from "../LogDetail";
import { OpenIndicator } from "../OpenIndicator";

export type THistoryProps = { db: ImportDb; hideEmpty: boolean } & IPagestart;

export const History: React.FunctionComponent<THistoryProps> = ({
  id,
  url,
  db,
  hideEmpty,
}) => {
  const info = useGetInfoByPage(db, id);
  const log = useGetLogByPage(db, id);
  const warning = useGetWarningByPage(db, id);
  const error = useGetErrorByPage(db, id);
  const scriptError = useGetScriptErrorByPage(db, id);
  const [isOpen, setIsOpen] = useState(false);

  const hasEntry =
    Math.max(
      info.length,
      log.length,
      warning.length,
      error.length,
      scriptError.length
    ) > 0;

  if (hideEmpty === true && hasEntry === false) {
    return null;
  }

  const toggleOpen = () => {
    if (hasEntry === false) {
      return;
    }

    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div
        className={`flex border-b border-gray-400${
          hasEntry ? " cursor-pointer" : ""
        }`}
        onClick={toggleOpen}>
        <div className="w-4 h-4 mt-1.5">
          <OpenIndicator isOpen={isOpen} hasEntry={hasEntry} />
        </div>

        <div className="flex-1">{url}</div>
        <div className="flex text-xs mt-1">
          <Icon icon="EXCLAMATION_CIRCLE_SOLID" className={["text-blue-500"]} />
          ({log.length})
          <Icon
            icon="EXCLAMATION_TRIANGLE_SOLID"
            className={["text-yellow-500"]}
          />
          ({info.length})
          <Icon
            icon="EXCLAMATION_TRIANGLE_SOLID"
            className={["text-yellow-600"]}
          />
          ({warning.length})
          <Icon
            icon="EXCLAMATION_TRIANGLE_SOLID"
            className={["text-red-500"]}
          />
          ({error.length})
          <Icon icon="BUG_SOLID" className={["text-red-700"]} />(
          {scriptError.length})
        </div>
      </div>
      <LogDetail
        hasEntry={hasEntry}
        isOpen={isOpen}
        log={log}
        info={info}
        warning={warning}
        error={error}
        scriptError={scriptError}
      />
    </div>
  );
};
