import React from "react";
import { ordersData } from "../dashboard/components/RecentOrders";
import DashboardContainer from "../../../../../common/DashboardContainer";
import TableBodyContainer from "../../gen/TableBodyContainer";
import TableContainer from "../../gen/TableContainer";
import TableHeaderContainer from "../../gen/TableHeaderContainer";
import SearchInput from "../../gen/SearchInput";
import TableHeadContainer from "../../gen/TableHeadContainer";
import { Link } from "react-router-dom";
function OrdersTableHeader() {
  return (
    <TableHeaderContainer>
      <SearchInput placeholder={"search order"} id={"search-order"} />
    </TableHeaderContainer>
  );
}

export function OrdersTableHead() {
  return (
    <TableHeadContainer>
      <tr>
        <th scope="col" className="py-2 sm:pt-4 px-3 text-center ">
          ID
        </th>
        <th scope="col" className="py-2 sm:pt-4 px-3 text-center">
          Price
        </th>
        <th scope="col" className="py-2 sm:pt-4 px-3  text-center">
          Payment Status
        </th>
        <th scope="col" className="py-2 sm:pt-4 px-3 text-center">
          Order Status
        </th>
        <th scope="col" className="py-2 sm:pt-4 px-3 text-center">
          Action
        </th>
      </tr>
    </TableHeadContainer>
  );
}

export function OrdersTableRow({
  order,
  orderId,
  orderPrice,
  paymentStatus,
  orderStatus,
}) {
  return (
    <tr className="xl:h-16 text-xs text-gray-700 md:text-sm xl:text-[1rem] even:bg-slate-50">
      <td className="py-3 px-3 whitespace-nowrap font-bold text-gray-500 text-center">
        {orderId}
      </td>
      <td className="py-3 px-3 whitespace-nowrap text-center">${orderPrice}</td>
      <td
        className={`py-3 px-3 whitespace-nowrap text-center ${
          paymentStatus === "Pending" ? "text-red-500" : ""
        }`}
      >
        {paymentStatus}
      </td>
      <td
        className={`py-3 px-3 whitespace-nowrap  text-center ${
          orderStatus === "Pending" ? "text-red-500" : ""
        }`}
      >
        {orderStatus}
      </td>
      <td className="py-3 px-3 whitespace-nowrap text-center">
        <Link to={`/admin/dashboard/orders/${orderId}`} state={order}>
          View
        </Link>
      </td>
    </tr>
  );
}

export default function Orders() {
  return (
    <DashboardContainer>
      <div className="shadow-lg bg-white ">
        <OrdersTableHeader />
        <div className="pt-2 table-custom-hight overflow-auto hide-scrollbar">
          <TableContainer>
            <OrdersTableHead />

            <TableBodyContainer>
              {ordersData.map((order) => {
                return (
                  <OrdersTableRow
                    key={order.id}
                    order={order}
                    orderId={order.id}
                    orderPrice={order.totalPrice}
                    orderStatus={order.orderStatus}
                    paymentStatus={order.paymentStatus}
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
