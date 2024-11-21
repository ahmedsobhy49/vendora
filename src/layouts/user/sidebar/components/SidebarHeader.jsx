import React from "react";
import AppLogo from "../../../../common/AppLogo";
import Button from "../../../../common/Button";
import { Link } from "react-router-dom";
import formatName from "../../../../utils/formatName";

export default function SidebarHeader({ decodedToken, userInfo }) {
  return (
    <li className="flex items-center gap-5">
      <div className="w-20">
        <AppLogo className="w-full" />
      </div>
      {!decodedToken?.id ? (
        <div>
          <Link
            to={"/login"}
            className=" bg-blue-600 text-white p-4  rounded-full text-sm font-bold tracking-wide"
          >
            Sign in or create account
          </Link>
        </div>
      ) : (
        <h3 className="capitalize text-lg">
          welcome, &nbsp;
          <span className="font-semibold">
            {formatName(userInfo?.user?.firstName, userInfo?.user?.lastName)}
          </span>
        </h3>
      )}
    </li>
  );
}
