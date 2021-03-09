import React, { useState } from "react";
import { TDisplay } from ".";
import { Button } from "../Button";

export const CustomEntry: React.FunctionComponent<{ data: TDisplay }> = (
  props
) => {
  const toCopy =
    typeof props.data.data !== "string"
      ? JSON.stringify(props.data.data)
      : props.data.data;

  const [copyState, setCopyState] = useState("");

  return (
    <div className="flex">
      <div className="font-bold">{props.data.label}</div>
      <div className="ml-4 mr-4">
        <Button
          icon="COPY_REGULAR"
          className={["btn-normal"]}
          onClick={async () =>
            navigator.clipboard
              .writeText(toCopy)
              .then(() => setCopyState("copied"))
              .catch(() => setCopyState("Error on copy"))
          }
        />
      </div>
      <div>{copyState}</div>
    </div>
  );
};
