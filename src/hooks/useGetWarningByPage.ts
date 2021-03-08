import { useEffect, useState } from "react";
import { IConsoleWarning, ImportDb } from "../db/logDb";

export const useGetWarningByPage = (db: ImportDb, page?: number) => {
  const [currentPage, setCurrentPage] = useState<number>();
  const [warning, setWarning] = useState<IConsoleWarning[]>([]);

  useEffect(() => {
    if (!page || page === currentPage || !db) {
      return;
    }

    const getInfo = async () => {
      setWarning(await db.getWarningByPage(page));
    };

    setCurrentPage(page);
    getInfo();
  }, [page, currentPage, setCurrentPage, db]);

  return warning;
};
