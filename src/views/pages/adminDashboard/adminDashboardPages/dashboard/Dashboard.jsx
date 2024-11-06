import React from "react";
import DashboardContainer from "../../../../../common/DashboardContainer";
import Summaries from "./components/Summaries";
import RecentOrders from "./components/RecentOrders";
import Statistics from "./components/Statistics";
import RecentChats from "./components/RecentChats";
import { useQuery } from "react-query";
import getCurrentYearSalesStatistics from "../../../../../services/orders/getCurrentYearSalesStatistics";
import getAllProducts from "../../../../../services/products/getAllProducts";
import getActiveSellers from "../../../../../services/seller/getActiveSellers";

const activeSellers = await getActiveSellers();
export default function Dashboard() {
  const { data: products } = useQuery(["allProducts"], getAllProducts);
  const { data: yearOrdersStatistics } = useQuery(
    ["year-orders-statistics"],
    getCurrentYearSalesStatistics
  );

  return (
    <DashboardContainer>
      <div className="flex flex-col gap-5">
        <Summaries
          productsCount={products?.data?.length}
          yearOrdersStatistics={yearOrdersStatistics?.data}
          activeSellers={activeSellers?.length}
        />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-1 w-full">
          <Statistics yearOrdersStatistics={yearOrdersStatistics?.data} />
          <RecentChats />
        </div>

        <RecentOrders />
      </div>
    </DashboardContainer>
  );
}
