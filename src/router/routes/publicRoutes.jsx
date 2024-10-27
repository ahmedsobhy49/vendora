import { lazy } from "react";
import UserLayout from "../../layouts/user/UserLayout";

const AdminLogin = lazy(() => import("../../views/auth/AdminLogin"));
const Login = lazy(() => import("../../views/auth/Login"));
const Register = lazy(() => import("../../views/auth/Register"));
const Home = lazy(() => import("../../pages/Home"));
const SellerRegister = lazy(() =>
  import("../../views/auth/seller/SellerRegister")
);

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
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/admin/login",
        element: <AdminLogin />,
      },
      {
        path: "/seller/register",
        element: <SellerRegister />,
      },
    ],
  },
];

export default publicRoutes;
