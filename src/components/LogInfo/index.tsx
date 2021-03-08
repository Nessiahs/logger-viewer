import React from "react";
import { IAppDB } from "../../db/appDb";
import { Icon } from "../Icon";

export type TLogInfoProps = {
  data: IAppDB | null;
};

export const LogInfo: React.FunctionComponent<TLogInfoProps> = ({ data }) => {
  if (data === null) {
    return null;
  }

  return (
    <div className="mt-2.5">
      <div className="font-bold text-2xl mt-6">Browser</div>
      <div className="flex flex-row flex-wrap border-b border-gray-400">
        <div className="whitespace-nowrap w-1/2">OS: {data.browser.os}</div>
        <div className="whitespace-nowrap w-1/2">
          Browser: {data.browser.name}{" "}
        </div>

        <div className="whitespace-nowrap w-1/2">
          Browser version: {data.browser.version}
        </div>

        <div className="flex whitespace-nowrap w-1/2">
          Mobile: {data.browser.mobile}
          <div className="w-7">
            <Icon
              icon={
                data.browser.mobile === true
                  ? "CHECK_CIRCLE_REGULAR"
                  : "TIMES_SOLID"
              }
            />
          </div>
        </div>
      </div>
      <div className=" font-bold text-2xl mt-6">Screen:</div>
      <div className="flex border-b border-gray-400 mt-2.5">
        <div className="w-1/2">width: {data.screen.width}px</div>
        <div className="w-1/2">height: {data.screen.height}px</div>
      </div>
    </div>
  );
};
