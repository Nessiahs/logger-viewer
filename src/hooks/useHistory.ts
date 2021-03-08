import { useEffect, useState } from "react";
import { ImportDb, IPagestart } from "../db/logDb";

export const useHistory = (db: ImportDb | undefined) => {
  const [history, setHistory] = useState<IPagestart[]>([]);

  useEffect(() => {
    if (!db) {
      return;
    }

    const getHistory = async () => {
      setHistory(await db.getHistory());
    };

    getHistory();
  }, [db, setHistory]);

  return history;
};
