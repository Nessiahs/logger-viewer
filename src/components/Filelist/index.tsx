import React, { useState } from "react";
import { appDb } from "../../db/appDb";
import { ImportDb } from "../../db/logDb";
import { Button } from "../Button";
import { Modal } from "../Modal";
import { TFileState } from "../Upload";

export type TFilelistProps = {
  list: TFileState[];
  removeFile: (fn: string) => void;
};

export const Filelist: React.FunctionComponent<TFilelistProps> = ({
  list,
  removeFile,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [preview, setPreview] = useState<TFileState>();

  const doImport = async (filename: string) => {
    const toImport = list.find((item) => item.info.name === filename);

    if (!toImport) {
      return;
    }

    try {
      const dbName = await appDb.addDump(toImport.info.name, toImport.json);
      if (!dbName) {
        throw new Error(`Cant't create basic db data`);
      }

      const importDb = new ImportDb(dbName);
      importDb.import(toImport.json);
    } catch (e) {
      console.log("Error at import", e);
    }
  };

  return (
    <>
      <div>
        {list.map((entry, i) => {
          return (
            <div
              key={`filelist-${i}`}
              className="flex justify-between m-0.5 p-0.5 flex-row border-gray-900 border-b border-solid">
              <div>{entry.info.name}</div>
              <div>
                <Button
                  icon="EYE_REGULAR"
                  onClick={() => {
                    setPreview(entry);
                    setPreviewOpen(true);
                  }}
                  disabled={!entry.allowed}
                />
                <Button
                  icon="TRASH_ALT_REGULAR"
                  className={["btn-danger"]}
                  onClick={() => removeFile(entry.info.name)}
                />
                <Button
                  disabled={!entry.allowed}
                  icon="CHECK_CIRCLE_REGULAR"
                  iconProps={{ className: ["text-green-500"] }}
                  onClick={() => doImport(entry.info.name)}
                />
              </div>
            </div>
          );
        })}
      </div>
      <Modal
        title={`Import preview ${preview?.info.name ?? ""}`}
        onClose={() => setPreviewOpen(false)}
        closeOnClick={true}
        isOpen={previewOpen}>
        <div className="max-h-full overflow-y-scroll">
          <pre>{JSON.stringify(preview?.json ?? "", undefined, 2)}</pre>
        </div>
      </Modal>
    </>
  );
};
