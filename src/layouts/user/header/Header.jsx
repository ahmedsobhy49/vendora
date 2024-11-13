import React from "react";
import BurgerIcon from "./components/BurgerIcon";
import AppLogo from "../../../common/AppLogo";
import Search from "./components/Search";
import CartIcon from "./components/CartIcon";
import UserIcon from "./components/UserIcon";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <div className=" grid grid-cols-12 p-4 lg:px-10 lg:py-2  md:grid-cols-8  items-center justify-between gap-4 bg-blue-500 ">
      <div className="col-span-1">
        <BurgerIcon />
      </div>
      <div className="col-span-2 md:col-span-1 lg:col-start-1 lg:w-32">
        <AppLogo width="100%" />
      </div>
      <div className="col-span-7 md:col-span-4 lg:col-span-5">
        <Search />
      </div>
      <div className="col-span-2 flex items-center gap-4 bg-red-50">
        <Link to={"/login"}>
          <UserIcon />
        </Link>
        <CartIcon />
      </div>
    </div>
  );
}
