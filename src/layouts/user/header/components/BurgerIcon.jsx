import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";

export default function BurgerIcon() {
  return (
    <div className="lg:hidden w-full  ">
      <RxHamburgerMenu className="text-[2rem] sm:text-[3rem]" color="white" />
    </div>
  );
}
