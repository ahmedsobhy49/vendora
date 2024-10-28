import { lazy } from "react";
import UserLayout from "../../layouts/user/UserLayout";

const AdminLogin = lazy(() => import("../../views/auth/AdminLogin"));
const Login = lazy(() => import("../../views/auth/Login"));
const Register = lazy(() => import("../../views/auth/Register"));
const Home = lazy(() => import("../../pages/Home"));
const SellerRegister = lazy(() =>
  import("../../views/auth/seller/SellerRegister")
);
const SellerLogin = lazy(() => import("../../views/auth/seller/SellerLogin"));

import RedirectIfAuthenticated from "./RedirectIfAuthenticated";

const publicRoutes = [
  {
    element: <UserLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <AdminLogin />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/admin/login",
        element: (
          <RedirectIfAuthenticated>
            <AdminLogin />
          </RedirectIfAuthenticated>
        ),
      },
      {
        path: "/seller/register",
        element: <SellerRegister />,
      },
      {
        path: "/seller/login",
        element: <SellerLogin />,
      },
    ],
  },
];

export default publicRoutes;
