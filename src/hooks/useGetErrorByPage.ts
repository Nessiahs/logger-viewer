import { useEffect, useState } from "react";
import { IConsoleError, ImportDb } from "../db/logDb";

export const useGetErrorByPage = (db: ImportDb, page?: number) => {
  const [currentPage, setCurrentPage] = useState<number>();
  const [error, setError] = useState<IConsoleError[]>([]);

  useEffect(() => {
    if (!page || page === currentPage || !db) {
      return;
    }

    const getInfo = async () => {
      setError(await db.getErrorByPage(page));
    };

    setCurrentPage(page);
    getInfo();
  }, [page, currentPage, setCurrentPage, db]);

  return error;
};
