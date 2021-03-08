import { RouteComponentProps } from "@reach/router";
import React, { useState } from "react";
import { IAppDB } from "../../db/appDb";
import { useGetLogs } from "../../hooks/useGetLogs";
import { LogInfo } from "../LogInfo";
import { LogView } from "../LogView";

type TAnalyseProps = RouteComponentProps;

export const Analyse: React.FunctionComponent<TAnalyseProps> = (props) => {
  const logs = useGetLogs();
  const [selected, setSelected] = useState<IAppDB | null>(null);
  return (
    <>
      <h1>Analyse</h1>
      <div className="flex">
        <label className="mr-4">Select a import</label>
        <select
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            const dataToShow = logs.find(
              (entry) => entry.dbName === e.target.value
            );
            if (!dataToShow) {
              return;
            }
            setSelected(dataToShow);
          }}>
          <option>Please select</option>
          {logs.map((item, i) => (
            <option key={`option-${i}`} value={item.dbName}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <LogInfo data={selected} />
        <LogView dbName={selected?.dbName} />
      </div>
    </>
  );
};
