import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import NoDataMessage from "../../../../../../common/NoDataMessage";

export const ordersData = [
  {
    id: "392",
    price: 9837,
    orderStatus: "Pending",
    paymentStatus: "Pending",
    active: "View",
  },
  {
    id: "392",
    price: 9837,
    orderStatus: "Pending",
    paymentStatus: "Pending",
    active: "View",
  },
  {
    id: "392",
    price: 9837,
    orderStatus: "Pending",
    paymentStatus: "Pending",
    active: "View",
  },
  {
    id: "392",
    price: 9837,
    orderStatus: "Pending",
    paymentStatus: "Pending",
    active: "View",
  },
  {
    id: "392",
    price: 9837,
    orderStatus: "Pending",
    paymentStatus: "Pending",
    active: "View",
  },
  {
    id: "392",
    price: 9837,
    orderStatus: "Pending",
    paymentStatus: "Pending",
    active: "View",
  },
  {
    id: "392",
    price: 9837,
    orderStatus: "Pending",
    paymentStatus: "Pending",
    active: "View",
  },
  {
    id: "392",
    price: 9837,
    orderStatus: "Pending",
    paymentStatus: "Pending",
    active: "View",
  },
  {
    id: "392",
    price: 9837,
    orderStatus: "Pending",
    paymentStatus: "Pending",
    active: "View",
  },
  {
    id: "392",
    price: 9837,
    orderStatus: "Pending",
    paymentStatus: "Pending",
    active: "View",
  },
  {
    id: "392",
    price: 9837,
    orderStatus: "Pending",
    paymentStatus: "Pending",
    active: "View",
  },
  {
    id: "392",
    price: 9837,
    orderStatus: "Pending",
    paymentStatus: "Pending",
    active: "View",
  },
];

const isThereOrders = Boolean(ordersData?.length);

export function TableHead() {
  return (
    <thead className="w-full text-gray-700 text-[0.7rem] sm:text-[0.75rem] md:text-[0.77rem] lg:text-sm tracking-tighter md:tracking-normal uppercase xl:h-[64.5px]">
      <tr>
        <th scope="col" className="py-2 sm:pt-4 text-center ">
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
        <th scope="col" className="py-2 sm:pt-4  text-center">
          Active
        </th>
      </tr>
    </thead>
  );
}

export function TableRow({
  orderId,
  orderPrice,
  paymentStatus,
  orderStatus,
  active,
}) {
  return (
    <tr className="xl:h-14 text-xs text-gray-700 md:text-sm">
      <td className="py-3 whitespace-nowrap font-bold text-gray-500 text-center">
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
      <td className=" py-3 whitespace-nowrap text-center">{active}</td>
    </tr>
  );
}

function TableHeader() {
  return (
    <div className="flex items-center justify-between p-4 lg:px-8 bg-[#338ffb] text-white">
      <h3 className="text-[0.95rem] sm:text-[1.1rem] md:tracking-wide font-bold">
        Recent Orders
      </h3>
      {isThereOrders && (
        <Link
          to={"/admin/dashboard/orders"}
          className="text-xs sm:text-sm gap-1 flex items-center hover:underline"
        >
          <span> View all</span> <HiOutlineArrowUpRight />
        </Link>
      )}
    </div>
  );
}

function TableBody() {
  return (
    <tbody className="divide-y divide-gray-300">
      {ordersData?.map((order) => {
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
    </tbody>
  );
}
export default function RecentOrders() {
  return (
    <div className="shadow-lg pb-4 bg-white">
      <TableHeader />
      <div className="pt-2 px-4 lg:px-8 min-h-40 max-h-60 sm:max-h-80 xl:max-h-[25rem] bg-white overflow-auto">
        {isThereOrders ? (
          <table className="w-full divide-y divide-gray-400 bg-white">
            <TableHead />
            <TableBody />
          </table>
        ) : (
          <NoDataMessage message={"No orders have been received"} />
        )}
      </div>
    </div>
  );
}
