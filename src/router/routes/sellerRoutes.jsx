import { lazy } from "react";
const SellerDashboard = lazy(() =>
  import("../../views/pages/sellerDashboard/SellerDashboard")
);
const sellerRoutes = [
  {
    path: "seller/dashboard",
    element: <SellerDashboard />,
  },
];

export default sellerRoutes;
