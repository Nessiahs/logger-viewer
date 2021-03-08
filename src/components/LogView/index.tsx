import React from "react";
import { useDB } from "../../hooks/useDB";
import { useHistory } from "../../hooks/useHistory";
import { History } from "../History";
export type TLogView = {
  dbName: string | undefined;
};

export const LogView: React.FunctionComponent<TLogView> = ({ dbName }) => {
  const db = useDB(dbName);
  const history = useHistory(db);
  if (!db) {
    return null;
  }

  return (
    <>
      <div>Logview</div>
      {history.map((item, i) => (
        <History {...item} db={db} key={`histoty-${i}`} />
      ))}
    </>
  );
};
