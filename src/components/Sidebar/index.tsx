import { Link } from "@reach/router";
import React from "react";
import { Icon } from "../Icon";

export const Sidebar = () => {
  return (
    <div className="container w-8 pt-4 ">
      <Link to="/import/">
        <div
          className="btn h-8 bg-gray-100 text-gray-500 border border-gray-300 hover:bg-blue-600 hover:text-white "
          title="Import JSON">
          <Icon icon="FILE_IMPORT_SOLID" />
        </div>
      </Link>

      <Link to="/analyse/">
        <div
          className="btn h-8 bg-gray-100 text-gray-500 border border-gray-300 hover:bg-blue-600 hover:text-white mt-3"
          title="View Logfiles">
          <Icon icon="EYE_REGULAR" />
        </div>
      </Link>
    </div>
  );
};
