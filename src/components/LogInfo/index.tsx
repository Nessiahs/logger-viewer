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

  console.log(data);

  return (
    <div>
      <div>Browser</div>
      <div className="flex flex-row flex-wrap">
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
      <div>
        Screen:
        <div className="flex">
          <div className="w-1/2">width: {data.screen.width}</div>
          <div className="w-1/2">height: {data.screen.height}</div>
        </div>
      </div>
    </div>
  );
};
