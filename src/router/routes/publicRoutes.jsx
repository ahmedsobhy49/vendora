import { lazy } from "react";
import UserLayout from "../../layouts/user/UserLayout";

const Login = lazy(() => import("../../views/auth/Login"));
const Register = lazy(() => import("../../views/auth/Register"));
const Home = lazy(() => import("../../pages/Home"));
const SellerRegister = lazy(() =>
  import("../../views/auth/seller/SellerRegister")
);

const Error404 = lazy(() => import("../../common/Error404"));
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
        path: "*",
        element: <Error404 />,
      },
      {
        path: "/login",
        element: (
          <RedirectIfAuthenticated>
            <Login />
          </RedirectIfAuthenticated>
        ),
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/seller/register",
        element: <SellerRegister />,
      },
    ],
  },
];

export default publicRoutes;
