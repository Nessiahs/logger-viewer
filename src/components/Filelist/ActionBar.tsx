import { Link } from "@reach/router";
import React from "react";
import { Button } from "../Button";
import { Icon } from "../Icon";
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
    return (
      <Link to="/analyse/" className="btn btn-primary">
        <Icon icon="EYE_REGULAR" />
      </Link>
    );
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
