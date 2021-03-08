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
  const [hideEmpty, setHideEmpty] = useState(false);
  return (
    <>
      <h1>Analyse</h1>
      <div className="flex">
        <label className="mr-4 ">Select a import</label>
        <select
          className="p-1 pr-5"
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
        <div className="pl-5 flex">
          <label>Hide Pages with no log:</label>
          <input
            className="m-1.5"
            type="checkbox"
            checked={hideEmpty}
            onChange={() => setHideEmpty(!hideEmpty)}
          />
        </div>
      </div>
      <div>
        <LogInfo data={selected} />
        <LogView dbName={selected?.dbName} hideEmpty={hideEmpty} />
      </div>
    </>
  );
};
