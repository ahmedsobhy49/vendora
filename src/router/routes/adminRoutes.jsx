import { lazy } from "react";
import AdminLayout from "../../layouts/admin/AdminLayout";
import CustomSuspense from "../../common/CustomSuspense";

const Dashboard = lazy(() =>
  import(
    "../../views/pages/adminDashboard/adminDashboardPages/dashboard/Dashboard"
  )
);
const Orders = lazy(() =>
  import("../../views/pages/adminDashboard/adminDashboardPages/orders/Orders")
);
const LiveChat = lazy(() =>
  import(
    "../../views/pages/adminDashboard/adminDashboardPages/liveChat/LiveChat"
  )
);
const DeactiveSellers = lazy(() =>
  import(
    "../../views/pages/adminDashboard/adminDashboardPages/deactiveSeller/DeactiveSellers"
  )
);
const Category = lazy(() =>
  import(
    "../../views/pages/adminDashboard/adminDashboardPages/category/Category"
  )
);
const Sellers = lazy(() =>
  import("../../views/pages/adminDashboard/adminDashboardPages/seller/Sellers")
);
const SellerDetails = lazy(() =>
  import(
    "../../views/pages/adminDashboard/adminDashboardPages/seller/SellerDetails"
  )
);
const PaymentRequest = lazy(() =>
  import(
    "../../views/pages/adminDashboard/adminDashboardPages/paymentRequest/PaymentRequest"
  )
);
const SellersRequest = lazy(() =>
  import(
    "../../views/pages/adminDashboard/adminDashboardPages/sellersRequest/SellersRequest"
  )
);

const adminRoutes = [
  {
    element: <AdminLayout />,
    role: "admin",

    children: [
      {
        path: "/admin/dashboard",
        element: (
          <CustomSuspense>
            <Dashboard />
          </CustomSuspense>
        ),
      },
      {
        path: "/admin/dashboard/orders",
        element: (
          <CustomSuspense>
            <Orders />
          </CustomSuspense>
        ),
      },
      {
        path: "/admin/dashboard/category",
        element: (
          <CustomSuspense>
            <Category />
          </CustomSuspense>
        ),
      },
      {
        path: "/admin/dashboard/sellers",
        element: (
          <CustomSuspense>
            <Sellers />
          </CustomSuspense>
        ),
      },
      {
        path: "/admin/dashboard/sellers/:sellerId",
        element: (
          <CustomSuspense>
            <SellerDetails />
          </CustomSuspense>
        ),
      },
      {
        path: "/admin/dashboard/payment-request",
        element: (
          <CustomSuspense>
            <PaymentRequest />
          </CustomSuspense>
        ),
      },
      {
        path: "/admin/dashboard/deactive-seller",
        element: (
          <CustomSuspense>
            <DeactiveSellers />
          </CustomSuspense>
        ),
      },
      {
        path: "/admin/dashboard/sellers-request",
        element: (
          <CustomSuspense>
            <SellersRequest />
          </CustomSuspense>
        ),
      },
      {
        path: "/admin/dashboard/chat-seller",
        element: (
          <CustomSuspense>
            <LiveChat />
          </CustomSuspense>
        ),
      },
    ],
  },
];

export default adminRoutes;
