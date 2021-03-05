import React, { useState } from "react";
import { TFileState } from ".";

const allowedFiles = ["application/json"];

type TDropAreaProps = {
    addFiles: (add: TFileState[]) => void
}

export const DropArea: React.FunctionComponent<TDropAreaProps> = ({addFiles}) => {
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

  const fileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const filesToAdd: TFileState[] = [];
    const transFiles = e.dataTransfer.files;

    for (let i = 0; i < transFiles.length; i++) {
      filesToAdd.push({ info: transFiles[i], allowed: allowedFiles.includes(transFiles[i].type) });
    }

    addFiles(filesToAdd);
    setDragOver(false)
  };
  return (
    <div
      className="rounded-sm border border-gray-50 border-dashed h-36"
      onDragOver={dragover}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
      onDrop={fileDrop}>
      <div className={`container text-center${isDragOver ? " hidden" : ""}`}>
        Drop files to import
      </div>
    </div>
  );
};
