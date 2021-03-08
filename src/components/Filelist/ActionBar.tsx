import React from "react";
import { Button } from "../Button";
import { TFileState } from "../Upload";

type TActionBarProps = {
  onPreview: () => void;
  onDelete: () => void;
  onImport: () => void;
} & TFileState;

export const ActionBar: React.FunctionComponent<TActionBarProps> = ({
  onPreview,
  onDelete,
  onImport,
  allowed,
  imported,
}) => {
  if (imported === true) {
    return <>Imported</>;
  }

  return (
    <div>
      <Button icon="EYE_REGULAR" onClick={onPreview} disabled={!allowed} />
      <Button
        icon="TRASH_ALT_REGULAR"
        className={["btn-danger"]}
        onClick={onDelete}
      />
      <Button
        disabled={!allowed}
        icon="CHECK_CIRCLE_REGULAR"
        iconProps={{ className: ["text-green-500"] }}
        onClick={onImport}
      />
    </div>
  );
};
