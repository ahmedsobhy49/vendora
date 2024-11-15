import React from "react";
import { FiShoppingCart } from "react-icons/fi";

export default function CartIcon() {
  return (
    <div className="cursor-pointer">
      <FiShoppingCart
        color="white"
        className="text-[1.7rem]  sm:text-[2.2rem]"
      />
    </div>
  );
}
