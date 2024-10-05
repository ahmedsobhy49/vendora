import React from "react";

export default function TableContainer({ children }) {
  return (
    <table className="w-full  divide-y divide-gray-400 bg-white ">
      {children}
    </table>
  );
}
