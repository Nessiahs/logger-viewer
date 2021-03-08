import { useEffect, useState } from "react";
import { ImportDb } from "../db/logDb";

export const useDB = (dbName: string | undefined) => {
  const [db, setDb] = useState<ImportDb>();
  const [currentName, setCurrentName] = useState("");

  useEffect(() => {
    if (!dbName || dbName === currentName) {
      return;
    }
    setCurrentName(dbName);
    setDb(new ImportDb(dbName));
  }, [currentName, setCurrentName, setDb, dbName]);

  return db;
};
