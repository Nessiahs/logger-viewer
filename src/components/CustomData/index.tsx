import React from "react";
import { CustomEntry } from "./CustomEntry";

type TCustomData = { data: any };

export type TDisplay = {
  label: string | number;
  data: any;
};

export const CustomData: React.FunctionComponent<TCustomData> = ({ data }) => {
  if (!data) {
    return null;
  }
  let display: TDisplay[];

  if (data.constructor.name === "Object") {
    display = Object.keys(data).map((key) => ({
      label: key,
      data: data[key],
    }));
  } else if (Array.isArray(data)) {
    display = data.map((item) => ({
      label: 1,
      data: item,
    }));
  } else {
    display = [
      {
        label: "Your dump",
        data,
      },
    ];
  }

  return (
    <div>
      Custom dump data
      <br />
      {display.map((entry) => (
        <CustomEntry data={entry} />
      ))}
    </div>
  );
};
