import { RouteComponentProps } from "@reach/router";
import React, { useState } from "react";
import { DropArea } from "./DropArea";

type TUploadProps = RouteComponentProps;

export type TFileState = {info: File, content?: string, allowed: boolean}

export const Upload: React.FunctionComponent<TUploadProps> = (props) => {

  const [files, setFiles] = useState<TFileState[]>([]);

  const addFiles = (add: TFileState[]) => {

    setFiles([
        ...files,
        ...add
    ])
  }

  return (
    <>
      <DropArea addFiles={addFiles}/>
    </>
  );
};
