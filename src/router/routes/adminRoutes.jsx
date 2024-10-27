import { lazy } from "react";
import AdminLayout from "../../layouts/admin/AdminLayout";
import CustomSuspense from "../../common/CustomSuspense";
import OrderDetails from "../../views/pages/adminDashboard/adminDashboardPages/orders/OrderDetails";
import {jwtDecode} from 'jwt-decode';
import { Navigate } from "react-router-dom";
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

const CategoriesInfo = lazy(() =>
  import(
    "../../views/pages/adminDashboard/adminDashboardPages/category/CategoriesInfo"
  )
);

const Brands = lazy(() =>
  import("../../views/pages/adminDashboard/adminDashboardPages/brands/Brands")
);

const adminRoutes = [
  {
    element:<ProtectAdminRoutes>
      <AdminLayout />
    </ProtectAdminRoutes> ,
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
        path: "/admin/dashboard/orders/:orderId",
        element: (
          <CustomSuspense>
            <OrderDetails />
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
        path: "/admin/dashboard/top-brands",
        element: (
          <CustomSuspense>
            <Brands />
          </CustomSuspense>
        ),
      },
      {
        path: "/admin/dashboard/category/:categoryId",
        element: (
          <CustomSuspense>
            <CategoriesInfo />
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



function ProtectAdminRoutes({ children }) {

  const token = localStorage.getItem("accessToken"); // Get the token directly

  // Check if the token exists
  if (!token) {
    return <Navigate to="/admin/login" />; // Redirect to login if no token
  }

  try {
    const decodedToken = jwtDecode(token); // Decode the token

    // Example: Check if the user has the admin role
    if (decodedToken.role !== 'admin') {
      return <Navigate to="/unauthorized" /> // Redirect if not admin
    }

    return children; // Render the children if admin
  } catch (error) {
    console.error("Invalid token", error);
    return <Navigate to="/admin/login" />; // Redirect to login if token is invalid
  }
}

export default adminRoutes;