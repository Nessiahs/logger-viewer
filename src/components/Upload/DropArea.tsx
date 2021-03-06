import React, { useState } from "react";
import { TFileState } from ".";
import { readFile } from "./readFile";

const allowedFiles = ["application/json"];

type TDropAreaProps = {
  addFiles: (add: TFileState[]) => void;
};

export const DropArea: React.FunctionComponent<TDropAreaProps> = ({
  addFiles,
}) => {
  const [isDragOver, setDragOver] = useState(false);

  const dragover = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const dragEnter = () => {
    setDragOver(true);
  };

  const dragLeave = () => {
    setDragOver(false);
  };

  const fileDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const filesToAdd: TFileState[] = [];
    const transFiles = e.dataTransfer.files;

    for (let i = 0; i < transFiles.length; i++) {
      const allowed = allowedFiles.includes(transFiles[i].type);
      const info = {
        info: transFiles[i],
        allowed,
        json: {},
      };

      if (allowed === true) {
        info.json = await readFile(transFiles[i]);
      }

      filesToAdd.push(info);
    }

    addFiles(filesToAdd);
    setDragOver(false);
  };

  return (
    <div
      className="rounded-sm border-2 mt-5 border-gray-300 border-dashed h-36 hover:border-red-400"
      onDragOver={dragover}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
      onDrop={fileDrop}>
      <div
        className={`mt-5 container text-center${isDragOver ? " hidden" : ""}`}>
        Drop files to import
      </div>
    </div>
  );
};
