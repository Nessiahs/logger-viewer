import React from "react";
import { useDB } from "../../hooks/useDB";
import { useHistory } from "../../hooks/useHistory";
import { History } from "../History";
export type TLogView = {
  dbName: string | undefined;
  hideEmpty: boolean;
};

export const LogView: React.FunctionComponent<TLogView> = ({
  dbName,
  hideEmpty,
}) => {
  const db = useDB(dbName);
  const history = useHistory(db);
  if (!db) {
    return null;
  }

  return (
    <>
      <h1 className="font-bold text-2xl mt-6">Logview</h1>
      {history.map((item, i) => (
        <History {...item} db={db} key={`histoty-${i}`} hideEmpty={hideEmpty} />
      ))}
    </>
  );
};
