import React from "react";
import Input from "../../../../common/Input";
import { IoSearchOutline } from "react-icons/io5";

export default function Search() {
  return (
    <div className="relative">
      <Input
        id={"searc"}
        placeholder="Search Vendora"
        inputClassName="rounded-full py-2 sm:py-4 px-3 sm:ps-6 lg:px-8 outline-none w-full"
      />
      <div className="bg-blue-600 w-fit p-1 rounded-full absolute right-1 top-1 bottom-1 aspect-square cursor-pointer flex justify-center items-center">
        <IoSearchOutline size={20} color="white" />
      </div>
    </div>
  );
}
