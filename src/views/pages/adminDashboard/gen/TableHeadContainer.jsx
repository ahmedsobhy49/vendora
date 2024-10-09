import React from "react";

export default function TableHeadContainer({ children }) {
  return (
    <thead className="w-full text-gray-700 text-[0.7rem] sm:text-[0.75rem] md:text-[0.77rem] lg:text-sm tracking-tighter md:tracking-normal uppercase">
      {children}
    </thead>
  );
}
