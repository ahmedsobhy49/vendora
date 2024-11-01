import { lazy } from "react";
import UserLayout from "../../layouts/user/UserLayout";
import CustomSuspense from "../../common/CustomSuspense";
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
        element: (
          <CustomSuspense>
            <Home />
          </CustomSuspense>
        ),
      },
      {
        path: "*",
        element: (
          <CustomSuspense>
            <Error404 />
          </CustomSuspense>
        ),
      },
      {
        path: "/login",
        element: (
          <RedirectIfAuthenticated>
            <CustomSuspense>
              <Login />
            </CustomSuspense>
          </RedirectIfAuthenticated>
        ),
      },
      {
        path: "/register",
        element: (
          <CustomSuspense>
            <Register />
          </CustomSuspense>
        ),
      },
      {
        path: "/seller/register",

        element: (
          <CustomSuspense>
            <SellerRegister />
          </CustomSuspense>
        ),
      },
    ],
  },
];

export default publicRoutes;
