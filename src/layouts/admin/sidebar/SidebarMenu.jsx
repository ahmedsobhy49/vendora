import React from "react";
import { IoLogOut } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import SidebarLink from "./SidebarLink";
import adminNavigation from "../../../navigation/admin";
import api from "../../../api/api";
import { useNavigate } from "react-router-dom";
export default function SidebarMenu({ setShowSideBar }) {
const navigate = useNavigate();
  async function logOut() {
    await api.post("/auth/logout");
    localStorage.removeItem("accessToken");
    navigate("/admin/login");
  }
  return (
    <div className="h-full  flex flex-col">
      {/* Close Button */}
      <span
        className="flex justify-end p-2 text-2xl md:hidden"
        onClick={() => setShowSideBar(false)}
      >
        <IoMdClose />
      </span>

      {/* Navigation Links */}
      <ul className="flex flex-col gap-5 flex-grow">
        {adminNavigation.map((nav) => (
          <SidebarLink key={nav.id} to={nav.path} label={nav.label}>
            <span className="text-[1.2rem] md:text-xl xl:text-2xl 2xl:text-3xl">
              {nav.icon}
            </span>
          </SidebarLink>
        ))}
      </ul>

      {/* Log Out Button */}
      <button
      onClick={logOut}

        className="flex font-bold items-center p-2 rounded-lg hover:bg-gray-100 text-gray-900 mt-auto"
      >
        <IoLogOut size={25} />
        <span className="ms-3 text-[0.85rem] sm:text-[1rem] 2xl:text-lg">
          Log Out
        </span>
      </button>
    </div>
  );
}
