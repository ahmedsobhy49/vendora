import React from "react";

export default function SidebarLink({ children, onClick }) {
  return (
    <li
      className="flex items-center justify-between pe-4 py-6 "
      onClick={onClick}
    >
      {children}
    </li>
  );
}
