import React from "react";
import SidebarLink from "./components/SidebarLink";
import SidebarHeader from "./components/SidebarHeader";

import { IoMdPaper } from "react-icons/io";

export default function Sidebar() {
  return (
    <div className="min-h-screen shadow-2xl bg-slate-100 py-14 px-4">
      <ul>
        <SidebarHeader />
        <SidebarLink>
          <IoMdPaper />
          <p>Purchase History</p>
        </SidebarLink>
        <SidebarLink>
          <IoMdPaper />
          <p>Purchase History</p>
        </SidebarLink>
      </ul>
    </div>
  );
}
