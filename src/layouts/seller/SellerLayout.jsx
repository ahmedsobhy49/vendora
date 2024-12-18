import React, { useEffect, useState } from "react";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import ScrollToTopOnRoute from "../../common/ScrollToTopOnRoute";

export default function SellerLayout() {
  const [showSideBar, setShowSideBar] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setShowSideBar(false);
  }, [location.pathname, setShowSideBar]);

  return (
    <div className="flex min-h-screen">
      <Sidebar showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
      <div className="md:ml-auto w-full md:w-[70%] lg:w-3/4 xl:w-4/5  ">
        <Header setShowSideBar={setShowSideBar} />
        <Outlet />
        <ScrollToTopOnRoute />
      </div>
    </div>
  );
}
