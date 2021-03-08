import { useEffect, useState } from "react";
import { ImportDb, IScriptError } from "../db/logDb";

export const useGetScriptErrorByPage = (db: ImportDb, page?: number) => {
  const [currentPage, setCurrentPage] = useState<number>();
  const [scriptError, setScriptError] = useState<IScriptError[]>([]);

  useEffect(() => {
    if (!page || page === currentPage || !db) {
      return;
    }

    const getInfo = async () => {
      setScriptError(await db.getScriptErrorByPage(page));
    };

    setCurrentPage(page);
    getInfo();
  }, [page, currentPage, setCurrentPage, db]);

  return scriptError;
};
