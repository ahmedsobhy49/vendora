import React from "react";
import {
  TableHead,
  TableRow,
  ordersData,
} from "../dashboard/components/RecentOrders";
import DashboardContainer from "../../../../../common/DashboardContainer";
import Input from "../../../../../common/Input";
import TableBodyContainer from "../../gen/TableBodyContainer";
import TableContainer from "../../gen/TableContainer";

function TableHeader() {
  return (
    <div className="flex items-center justify-between p-4 py-4 lg:px-8 bg-[#338ffb]">
      <Input
        inputClassName="w-[170px] sm:w-1/3 lg:w-1/4 xl:w-1/5 py-1 sm:py-2 px-3 outline-none rounded-full placeholder:text-xs placeholder:sm:text-[0.85rem] lg:placeholder:text-[1rem]"
        placeholder="Search Orders..."
        id={"search-order"}
        name={"search-order"}
        type={"search"}
      />
    </div>
  );
}

export default function Orders() {
  return (
    <DashboardContainer>
      <div className="shadow-lg pb-4 bg-white">
        <TableHeader />
        <div className="pt-2 px-4 lg:px-8 h-[48.4rem] overflow-auto">
          <TableContainer>
            <TableHead />

            <TableBodyContainer>
              {ordersData.map((order) => {
                return (
                  <TableRow
                    orderId={order.id}
                    orderPrice={order.price}
                    orderStatus={order.orderStatus}
                    paymentStatus={order.paymentStatus}
                    active={order.active}
                  />
                );
              })}
            </TableBodyContainer>
          </TableContainer>
        </div>
      </div>
    </DashboardContainer>
  );
}
