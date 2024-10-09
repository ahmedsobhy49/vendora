import React from "react";
import DashboardContainer from "../../../../../common/DashboardContainer";
import Summaries from "./components/Summaries";
import RecentOrders from "../dashboard/components/RecentOrders";
import Statistics from "../dashboard/components/Statistics";
import RecentChats from "../dashboard/components/RecentChats";

export default function Dashboard() {
  return (
    <DashboardContainer>
      <div className="flex flex-col gap-5">
        <Summaries />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-1 w-full">
          <Statistics />
          <RecentChats />
        </div>
        <RecentOrders />
      </div>
    </DashboardContainer>
  );
}
