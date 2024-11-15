import React from "react";
import AppLogo from "../../../../common/AppLogo";
import Button from "../../../../common/Button";
import { Link } from "react-router-dom";

export default function SidebarHeader() {
  return (
    <li className="flex items-center gap-5">
      <div className="w-20">
        <AppLogo className="w-full" />
      </div>
      <div>
        <Link
          to={"/login"}
          className=" bg-blue-600 text-white p-4  rounded-full text-sm font-bold tracking-wide"
        >
          Sign in or create account
        </Link>
      </div>
    </li>
  );
}
