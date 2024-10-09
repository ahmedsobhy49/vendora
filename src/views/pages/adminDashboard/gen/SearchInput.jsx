import React from "react";
import Input from "../../../../common/Input";

export default function SearchInput({ placeholder, id }) {
  return (
    <Input
      inputClassName="text-gray-800 w-[10.625rem] px-[1rem] py-[0.25rem] outline-none rounded-full sm:w-1/3 sm:py-[0.5rem] placeholder:text-[0.85rem] lg:placeholder:text-[1rem]"
      placeholder={placeholder}
      id={id}
      name={id}
      type="search"
    />
  );
}
