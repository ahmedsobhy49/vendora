import React from "react";
import Input from "../../../common/Input";
import { IoSearchOutline } from "react-icons/io5";

export default function Search() {
  return (
    <div className="relative">
      <Input
        id={"searc"}
        placeholder="Search Vendora"
        inputClassName="rounded-full py-4 px-3 outline-none"
      />
      <div className="bg-blue-600 w-fit p-1 rounded-full absolute right-2 top-1/2 -translate-y-1/2">
        <IoSearchOutline size={30} color="white" />
      </div>
    </div>
  );
}
