import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineArrowUpRight } from "react-icons/hi2";

export function TableHead() {
  return (
    <thead className="w-full text-gray-700 text-[0.7rem] sm:text-[0.75rem] md:text-[0.77rem] lg:text-sm tracking-tighter md:tracking-normal uppercase">
      <tr>
        <th scope="col" className="py-2 sm:pt-4 text-start ">
          ID
        </th>
        <th scope="col" className="py-2 sm:pt-4 px-3 text-start">
          Price
        </th>
        <th scope="col" className="py-2 sm:pt-4 px-3  text-start">
          Payment Status
        </th>
        <th scope="col" className="py-2 sm:pt-4 px-3 text-start">
          Order Status
        </th>
        <th scope="col" className="py-2 sm:pt-4 text-end">
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
    <tr className="text-xs md:text-sm text-gray-700">
      <td className="py-3  whitespace-nowrap font-bold text-gray-500">
        {orderId}
      </td>
      <td className="py-3 px-3 whitespace-nowrap ">${orderPrice}</td>
      <td
        className={`py-3 px-3 whitespace-nowrap ${
          paymentStatus === "Pending" ? "text-red-500" : ""
        }`}
      >
        {paymentStatus}
      </td>
      <td
        className={`py-3 px-3 whitespace-nowrap  ${
          orderStatus === "Pending" ? "text-red-500" : ""
        }`}
      >
        {orderStatus}
      </td>
      <td className=" py-3  whitespace-nowrap text-end ">{active}</td>
    </tr>
  );
}

function TableHeader() {
  return (
    <div className="flex items-center justify-between p-4 lg:px-8 bg-blue-400 text-white">
      <h3 className="text-[0.95rem] sm:text-[1.1rem] md:tracking-wide font-bold">
        Recent Orders
      </h3>
      <Link
        to={"/admin/dashboard/orders"}
        className="text-xs sm:text-sm gap-1 flex items-center hover:underline"
      >
        <span> View all</span> <HiOutlineArrowUpRight />
      </Link>
    </div>
  );
}

export default function RecentOrders() {
  return (
    <div className="shadow-lg pb-4 bg-white">
      <TableHeader />
      <div className="pt-2 px-4 lg:px-8 max-h-60 sm:max-h-80 xl:max-h-[25rem] bg-white overflow-auto">
        <table className="w-full divide-y divide-gray-400 bg-white">
          <TableHead />

          <tbody className="divide-y divide-gray-300">
            <TableRow
              orderId={"#3443"}
              orderPrice={"2977"}
              orderStatus={"Pending"}
              paymentStatus={"Pending"}
              active={"view"}
            />
            <TableRow
              orderId={"#2128"}
              orderPrice={"9837"}
              orderStatus={"Pending"}
              paymentStatus={"Pending"}
              active={"view"}
            />
            <TableRow
              orderId={"#2128"}
              orderPrice={"9837"}
              orderStatus={"Pending"}
              paymentStatus={"Pending"}
              active={"view"}
            />
            <TableRow
              orderId={"#2128"}
              orderPrice={"9837"}
              orderStatus={"Pending"}
              paymentStatus={"Pending"}
              active={"view"}
            />
            <TableRow
              orderId={"#2128"}
              orderPrice={"9837"}
              orderStatus={"Pending"}
              paymentStatus={"Pending"}
              active={"view"}
            />
            <TableRow
              orderId={"#2128"}
              orderPrice={"9837"}
              orderStatus={"Pending"}
              paymentStatus={"Pending"}
              active={"view"}
            />
            <TableRow
              orderId={"#2128"}
              orderPrice={"9837"}
              orderStatus={"Pending"}
              paymentStatus={"Pending"}
              active={"view"}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}
