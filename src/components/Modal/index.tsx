import React from "react";
import { Button } from "../Button";
import { Portal, TPortalProps } from "../Portal";

export type TModalProps = {
  title?: string;
} & TPortalProps;
export const Modal: React.FunctionComponent<TModalProps> = (props) => {
  return (
    <>
      <Portal {...props}>
        <div
          className="left-1/4 right-1/4 fixed top-7 opacity-100 bg-white z-20 modal overflow-hidden"
          max-h-full
        >
          <header className="flex justify-between h-10 bg-gray-400">
            <div className="font-bold pt-2 pl-3">{props.title}</div>{" "}
            <Button icon="TIMES_SOLID" className={["btn-minimal -mt-2"]} />
          </header>
          <div className="p-3 overflow-y-scroll max-h-full">
            {props.children}
          </div>
        </div>
      </Portal>
    </>
  );
};
