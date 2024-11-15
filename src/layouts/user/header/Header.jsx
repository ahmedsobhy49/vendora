import React from "react";
import BurgerIcon from "./components/BurgerIcon";
import AppLogo from "../../../common/AppLogo";
import Search from "./components/Search";
import CartIcon from "./components/CartIcon";
import UserIcon from "./components/UserIcon";
import { Link } from "react-router-dom";
export default function Header({ handleSidebarVisibilityChange }) {
  return (
    <div className="grid items-center justify-between grid-cols-12 md:grid-cols-8 lg:grid-cols-12 gap-x-4 p-2 sm:px-8 lg:px-10 lg:py-2 bg-blue-500 ">
      {/* -- */}
      <div className="col-span-3 md:col-span-2 flex items-center gap-6 w-full">
        <div
          data-type="open"
          className="col-span-1"
          onClick={(e) => handleSidebarVisibilityChange(e)}
        >
          <BurgerIcon />
        </div>

        {/* -- */}
        <div className="col-span-2 md:col-span-1 lg:col-start-1  w-16 sm:w-20 ">
          <AppLogo width="100%" />
        </div>
      </div>

      {/* -- */}
      <div className="col-span-6 md:col-span-4 lg:col-span-8">
        <Search />
      </div>

      {/* -- */}
      <div className="col-span-3  md:col-span-2 flex items-center pe-4 justify-end gap-4 sm:gap-6 md:gap-10">
        <Link to={"/login"}>
          <UserIcon />
        </Link>
        <CartIcon />
      </div>
    </div>
  );
}
