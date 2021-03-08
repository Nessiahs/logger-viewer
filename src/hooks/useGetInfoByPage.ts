import { useEffect, useState } from "react";
import { IConsoleInfo, ImportDb } from "../db/logDb";

export const useGetInfoByPage = (db: ImportDb, page?: number) => {
  const [currentPage, setCurrentPage] = useState<number>();
  const [info, setInfo] = useState<IConsoleInfo[]>([]);

  useEffect(() => {
    if (!page || page === currentPage || !db) {
      return;
    }

    const getInfo = async () => {
      setInfo(await db.getInfoByPage(page));
    };

    setCurrentPage(page);
    getInfo();
  }, [page, currentPage, setCurrentPage, db]);

  return info;
};
