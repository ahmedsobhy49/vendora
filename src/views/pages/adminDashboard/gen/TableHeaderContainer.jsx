import React from "react";

export default function TableHeaderContainer({ children }) {
  return (
    <div className="flex items-center justify-between p-4 lg:px-8 bg-[#338ffb] text-white">
      {children}
    </div>
  );
}
