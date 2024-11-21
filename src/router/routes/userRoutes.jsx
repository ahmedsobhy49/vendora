import { lazy } from "react";
import CustomSuspense from "../../common/CustomSuspense";
import RedirectIfNotAuthenticated from "./RedirectIfNotAuthenticated";
import UserLayout from "../../layouts/user/UserLayout";
import AccoutCenterLayout from "../../pages/accountCenter/AccoutCenterLayout";

const Profile = lazy(() => import("../../pages/accountCenter/Profile"));
const Wishlist = lazy(() => import("../../pages/accountCenter/Wishlist"));
const Orders = lazy(() => import("../../pages/accountCenter/Orders"));
const Addresses = lazy(() => import("../../pages/accountCenter/Addresses"));
const Payments = lazy(() => import("../../pages/accountCenter/payments"));
const Returns = lazy(() => import("../../pages/accountCenter/Returns"));

const userRoutes = [
  {
    element: <UserLayout />,
    children: [
      {
        path: `/account-center`,
        element: (
          <RedirectIfNotAuthenticated allowedRoles={["user"]}>
            <AccoutCenterLayout />
          </RedirectIfNotAuthenticated>
        ),
        children: [
          {
            path: `/account-center/profile`,
            element: (
              <RedirectIfNotAuthenticated allowedRoles={["user"]}>
                <CustomSuspense>
                  <Profile />
                </CustomSuspense>
              </RedirectIfNotAuthenticated>
            ),
          },
          {
            path: `/account-center/wishlist`,
            element: (
              <RedirectIfNotAuthenticated allowedRoles={["user"]}>
                <CustomSuspense>
                  <Wishlist />
                </CustomSuspense>
              </RedirectIfNotAuthenticated>
            ),
          },
          {
            path: `/account-center/orders`,
            element: (
              <RedirectIfNotAuthenticated allowedRoles={["user"]}>
                <CustomSuspense>
                  <Orders />
                </CustomSuspense>
              </RedirectIfNotAuthenticated>
            ),
          },
          {
            path: `/account-center/addresses`,
            element: (
              <RedirectIfNotAuthenticated allowedRoles={["user"]}>
                <CustomSuspense>
                  <Addresses />
                </CustomSuspense>
              </RedirectIfNotAuthenticated>
            ),
          },
          {
            path: `/account-center/payments`,
            element: (
              <RedirectIfNotAuthenticated allowedRoles={["user"]}>
                <CustomSuspense>
                  <Payments />
                </CustomSuspense>
              </RedirectIfNotAuthenticated>
            ),
          },
          {
            path: `/account-center/returns`,
            element: (
              <RedirectIfNotAuthenticated allowedRoles={["user"]}>
                <CustomSuspense>
                  <Returns />
                </CustomSuspense>
              </RedirectIfNotAuthenticated>
            ),
          },
        ],
      },
    ],
  },
];

export default userRoutes;
