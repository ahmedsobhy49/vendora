import { lazy } from "react";
import SellerLayout from "../../layouts/seller/SellerLayout";
import CustomSuspense from "../../common/CustomSuspense";
import RedirectIfNotAuthenticated from "./RedirectIfNotAuthenticated";
import OrderDetails from "../../views/pages/sellerDashboard/sellerDashboardPages/orders/OrdersDetails";

const AddProductMainForm = lazy(() =>
  import(
    "../../views/pages/sellerDashboard/sellerDashboardPages/addProduct/AddProductMainForm"
  )
);
const AllProducts = lazy(() =>
  import(
    "../../views/pages/sellerDashboard/sellerDashboardPages/allProducts/AllProducts"
  )
);
const DiscountProducts = lazy(() =>
  import(
    "../../views/pages/sellerDashboard/sellerDashboardPages/discountProducts/DiscountProducts"
  )
);
const Orders = lazy(() =>
  import("../../views/pages/sellerDashboard/sellerDashboardPages/orders/Orders")
);
const Payments = lazy(() =>
  import(
    "../../views/pages/sellerDashboard/sellerDashboardPages/payments/Payments"
  )
);
const ChatCustomer = lazy(() =>
  import(
    "../../views/pages/sellerDashboard/sellerDashboardPages/chatCustomer/ChatCustomer"
  )
);
const ChatSupport = lazy(() =>
  import(
    "../../views/pages/sellerDashboard/sellerDashboardPages/chatSupport/ChatSupport"
  )
);

const Dashboard = lazy(() =>
  import(
    "../../views/pages/sellerDashboard/sellerDashboardPages/dashboard/Dashboard"
  )
);

const rootPath = "/seller/dashboard/:sellerId";

const sellerRoutes = [
  {
    element: (
      <RedirectIfNotAuthenticated allowedRoles={["seller"]}>
        <SellerLayout />
      </RedirectIfNotAuthenticated>
    ),
    role: "seller",

    children: [
      {
        path: `${rootPath}`,
        element: (
          <CustomSuspense>
            <Dashboard />
          </CustomSuspense>
        ),
      },
      {
        path: `${rootPath}/add-product`,
        element: (
          <CustomSuspense>
            <AddProductMainForm />
          </CustomSuspense>
        ),
      },
      {
        path: `${rootPath}/all-products`,
        element: (
          <CustomSuspense>
            <AllProducts />
          </CustomSuspense>
        ),
      },
      {
        path: `${rootPath}/discount-products`,
        element: (
          <CustomSuspense>
            <DiscountProducts />
          </CustomSuspense>
        ),
      },
      {
        path: `${rootPath}/orders`,
        element: (
          <CustomSuspense>
            <Orders />
          </CustomSuspense>
        ),
      },
      {
        path: `${rootPath}/orders/:orderId`,
        element: (
          <CustomSuspense>
            <OrderDetails />
          </CustomSuspense>
        ),
      },
      {
        path: `${rootPath}/payments`,
        element: (
          <CustomSuspense>
            <Payments />
          </CustomSuspense>
        ),
      },
      {
        path: `${rootPath}/chat-customer`,
        element: (
          <CustomSuspense>
            <ChatCustomer />
          </CustomSuspense>
        ),
      },
      {
        path: `${rootPath}/chat-support`,
        element: (
          <CustomSuspense>
            <ChatSupport />
          </CustomSuspense>
        ),
      },
    ],
  },
];

export default sellerRoutes;
