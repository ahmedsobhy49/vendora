import React from "react";
import { RouterProvider } from "react-router-dom";
import Sidebar from "./layouts/sidebar/Sidebar";
import router from "./router/index";

export default function App() {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
      <Sidebar />
    </div>
  );
}
