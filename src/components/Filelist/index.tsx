import React from "react";
import { Button } from "../Button";
import { TFileState } from "../Upload";

export type TFilelistProps = {
  list: TFileState[];
};

export const Filelist: React.FunctionComponent<TFilelistProps> = ({ list }) => {
  return (
    <div>
      {list.map((entry, i) => {
        console.log(entry);
        return (
          <div
            key={`filelist-${i}`}
            className="flex justify-between m-0.5 p-0.5 flex-row border-gray-100 border-b-2 border-solid">
            <div>{entry.info.name}</div>

            <div>
              <Button
                text="Import"
                icon="CHECK_CIRCLE_REGULAR"
                iconProps={{ className: ["text-green-500"] }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
