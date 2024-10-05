import React from "react";
import { NavLink } from "react-router-dom";

export default function SidebarLink({ to, children, label }) {
  return (
    <li>
      <NavLink
        end={true}
        to={to}
        className={({ isActive }) =>
          `flex items-center p-2 rounded-lg hover:bg-gray-100 ${
            isActive ? "text-blue-500 font-bold bg-gray-200" : "text-gray-900"
          }`
        }
      >
        {children}
        <span className="ms-3 text-[0.85rem] sm:text-[1rem] 2xl:text-lg">
          {label}
        </span>
      </NavLink>
    </li>
  );
}
