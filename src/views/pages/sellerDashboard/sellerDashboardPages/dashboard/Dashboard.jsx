import React from "react";
import DashboardContainer from "../../../../../common/DashboardContainer";
import Summaries from "./components/Summaries";
import RecentOrders from "../dashboard/components/RecentOrders";
import Statistics from "../dashboard/components/Statistics";
import RecentChats from "../dashboard/components/RecentChats";
import { useQuery } from "react-query";
import getRelatedSellerProducts from "../../../../../services/products/getRelatedSellerProducts";
import { authService } from "../../../../../services/auth/auth";
import getCurrentYearSalesStatisticsBySellerId from "../../../../../services/orders/getCurrentYearSalesStatisticsBySellerId";
import getProductsStatisticsBySellerId from "../../../../../services/products/getProductsStatisticsBySellerId";
const token = localStorage.getItem("token");

export default function Dashboard() {
  const { data: seller } = useQuery(
    ["user", token],
    authService.fetchUserInfo,
    {
      enabled: !!token, // Only run the query if the token exists
    }
  );

  const { data: products } = useQuery(
    ["products", seller?.user._id],
    () => getRelatedSellerProducts(seller?.user._id), // Passing as a function
    { enabled: !!seller?.user._id } // Only run if seller's ID is available
  );

  const { data: sellerYearOrdersStatistics } = useQuery(
    ["seller-year-orders-statistics", seller?.user?._id],
    () => getCurrentYearSalesStatisticsBySellerId(seller?.user?._id)
  );

  const { data: productsStatistics } = useQuery(
    ["seller-products-statistics", seller?.user._id],
    () => getProductsStatisticsBySellerId(seller?.user?._id)
  );

  console.log("sellerYearOrdersStatistics", sellerYearOrdersStatistics);

  return (
    <DashboardContainer>
      <div className="flex flex-col gap-5">
        <Summaries
          productsCount={products?.data?.length}
          sellerYearOrdersStatistics={sellerYearOrdersStatistics?.data}
        />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-1 w-full">
          <Statistics
            ordersStatistics={sellerYearOrdersStatistics?.data?.monthlyStats}
            productsStatistics={productsStatistics?.data?.monthlyStatistics}
          />
          <RecentChats />
        </div>
        <RecentOrders />
      </div>
    </DashboardContainer>
  );
}
