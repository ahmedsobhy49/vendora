import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import fetchUserInfo from "../../../services/getLoggedUserInfo";
import { useQuery } from "react-query";

export default function Header({ setShowSideBar }) {
  const token = localStorage.getItem("token");

  // Using useQuery to fetch user info
  const { data } = useQuery(["user", token], fetchUserInfo, {
    enabled: !!token, // Only run the query if the token exists
  });

  return (
    <div className="fixed  z-20 w-full h-20 bg-white shadow-2xl px-4 md:px-6 lg:px-10 md:w-[70%] lg:w-3/4 xl:w-4/5 lg:h-24">
      <div className="flex items-center gap-5 sm:gap-10 w-full h-full">
        <GiHamburgerMenu
          className="md:hidden"
          size={30}
          onClick={() => setShowSideBar(true)}
        />
        <input
          type="search"
          id="admin-search"
          placeholder="Search"
          className="px-5 py-1 sm:py-2 rounded-3xl outline-none w-44 sm:w-64 lg:w-80 placeholder:text-[0.95rem] placeholder:sm:text-[1rem] bg-blue-gray-50"
        />
        <div className="ml-auto w-14 lg:w-16">
          <img
            src="https://img.freepik.com/premium-photo/stylish-man-flat-vector-profile-picture-ai-generated_606187-310.jpg"
            alt="profile"
            className="w-full rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
