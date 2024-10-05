import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header/Header";

export default function UserLayout() {
  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col items-center justify-center px-4 mx-auto">
        <Outlet />
      </div>
    </>
  );
}
