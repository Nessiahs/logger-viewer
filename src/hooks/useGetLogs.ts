import { useEffect, useState } from "react";
import { appDb, IAppDB } from "../db/appDb";

export const useGetLogs = () => {
  const [logs, setLogs] = useState<IAppDB[]>([]);
  const [init, setInit] = useState(false);

  useEffect(() => {
    const getEntries = async () => {
      setLogs(await appDb.getAll());
    };

    if (init === false) {
      setInit(true);
      getEntries();
    }
  }, [init, setInit]);

  return logs;
};
