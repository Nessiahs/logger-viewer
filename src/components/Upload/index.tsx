import { RouteComponentProps } from "@reach/router";
import React, { useState } from "react";
import { Filelist } from "../Filelist";
import { DropArea } from "./DropArea";

type TUploadProps = RouteComponentProps;

export type TFileState = {
  info: File;
  content?: string;
  allowed: boolean;
  imported: boolean;
  json?: object;
};

export const Upload: React.FunctionComponent<TUploadProps> = (props) => {
  const [files, setFiles] = useState<TFileState[]>([]);

  const addFiles = (add: TFileState[]) => {
    setFiles([...files, ...add]);
  };

  const removeFile = (filename: string) => {
    setFiles(files.filter((item) => item.info.name !== filename));
  };

  const setImported = (filename: string) => {
    setFiles(
      files.map((file) => {
        if (file.info.name === filename) {
          return {
            ...file,
            imported: true,
          };
        }
        return file;
      })
    );
  };

  return (
    <>
      <DropArea addFiles={addFiles} />
      <Filelist
        list={files}
        removeFile={(filename: string) => removeFile(filename)}
        setImported={(fn: string) => setImported(fn)}
      />
    </>
  );
};
