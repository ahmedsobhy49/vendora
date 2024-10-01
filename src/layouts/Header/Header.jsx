import React from "react";
import BurgerIcon from "./components/BurgerIcon";
import AppLogo from "../../common/AppLogo";
import Search from "./components/Search";
import CartIcon from "./components/CartIcon";

export default function Header() {
  return (
    <div className="bg-blue-500 p-4 flex items-center justify-between fixed left-0 right-0 top-0">
      <BurgerIcon />
      <AppLogo />
      <Search />
      <CartIcon />
    </div>
  );
}
