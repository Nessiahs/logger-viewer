import { useEffect, useState } from "react";
import { IConsoleLog, ImportDb } from "../db/logDb";

export const useGetLogByPage = (db: ImportDb, page?: number) => {
  const [currentPage, setCurrentPage] = useState<number>();
  const [log, setLog] = useState<IConsoleLog[]>([]);

  useEffect(() => {
    if (!page || page === currentPage || !db) {
      return;
    }

    const getInfo = async () => {
      setLog(await db.getLogByPage(page));
    };

    setCurrentPage(page);
    getInfo();
  }, [page, currentPage, setCurrentPage, db]);

  return log;
};
