import React, { useState } from "react";
import { Button } from "../Button";
import { Modal } from "../Modal";
import { TFileState } from "../Upload";

export type TFilelistProps = {
  list: TFileState[];
};

export const Filelist: React.FunctionComponent<TFilelistProps> = ({ list }) => {
  const [previewOpen, setPreviewOpen] = useState(false);

  return (
    <>
      <div>
        {list.map((entry, i) => {
          return (
            <div
              key={`filelist-${i}`}
              className="flex justify-between m-0.5 p-0.5 flex-row border-gray-100 border-b-2 border-solid">
              <div>{entry.info.name}</div>

              <div>
                <Button
                  icon="EYE_REGULAR"
                  onClick={() => {
                    setPreviewOpen(true);
                  }}
                />
                <Button icon="TRASH_ALT_REGULAR" className={["btn-danger"]} />
                <Button
                  disabled={!entry.allowed}
                  icon="CHECK_CIRCLE_REGULAR"
                  iconProps={{ className: ["text-green-500"] }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <Modal
        onClose={() => setPreviewOpen(false)}
        closeOnClick={true}
        isOpen={previewOpen}>
        <div>This is my modal content</div>
      </Modal>
    </>
  );
};
