import React from "react";
import AppLogo from "../../../common/AppLogo";
import Button from "../../../common/Button";

export default function SidebarHeader() {
  return (
    <li className="flex items-center gap-5">
      <AppLogo />
      <Button
        buttonText={"Sign in or create account"}
        className="w-auto bg-blue-600 text-white py-2 px-4 rounded-full text-sm font-bold"
      />
    </li>
  );
}
