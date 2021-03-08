import React from "react";
import { ImportDb, IPagestart } from "../../db/logDb";
import { useGetScriptErrorByPage } from "../../hooks/getScriptErrorByPage";
import { useGetErrorByPage } from "../../hooks/useGetErrorByPage";
import { useGetInfoByPage } from "../../hooks/useGetInfoByPage";
import { useGetLogByPage } from "../../hooks/useGetLogByPage";
import { useGetWarningByPage } from "../../hooks/useGetWarningByPage";
import { Icon } from "../Icon";

export type THistoryProps = { db: ImportDb } & IPagestart;

export const History: React.FunctionComponent<THistoryProps> = ({
  id,
  url,
  db,
}) => {
  const info = useGetInfoByPage(db, id);
  const log = useGetLogByPage(db, id);
  const warning = useGetWarningByPage(db, id);
  const error = useGetErrorByPage(db, id);
  const scriptError = useGetScriptErrorByPage(db, id);

  return (
    <div className="flex justify-between">
      <div>{url}</div>
      <div className="flex text-xs">
        <Icon icon="EXCLAMATION_CIRCLE_SOLID" className={["text-blue-500"]} />(
        {log.length})
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
        <Icon icon="EXCLAMATION_TRIANGLE_SOLID" className={["text-red-500"]} />(
        {error.length})
        <Icon icon="BUG_SOLID" className={["text-red-700"]} />(
        {scriptError.length})
      </div>
    </div>
  );
};
