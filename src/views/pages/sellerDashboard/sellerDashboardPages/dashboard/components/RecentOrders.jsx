import React, { useState } from "react";
import { GrView } from "react-icons/gr";
import { Link } from "react-router-dom";
import { orders as originalOrdersData } from "../../../../../../data/orders.json";

export default function Orders() {
  const [ordersDataState, setOrdersDataState] = useState(originalOrdersData);

  function createStatusClasses(state) {
    switch (state) {
      case "pending" && "Pending":
        return "bg-[#FEF2E5] text-[#CD6200]";
      case "Canceled" && "canceled ":
        return "bg-[#FBE7E8] text-[#A30D11]";
      case "delivered" && "Delivered":
        return "bg-[#EBF9F1] text-[#1F9254]";
      default:
        return "";
    }
  }

  return (
    <div>
      <MobileTable
        ordersDataState={ordersDataState}
        createStatusClasses={createStatusClasses}
      />
      <DisktopTable
        createStatusClasses={createStatusClasses}
        ordersDataState={ordersDataState}
      />
    </div>
  );
}

function DisktopTable({ createStatusClasses, ordersDataState }) {
  return (
    <div className="overflow-auto bg-white rounded-lg">
      <table className="hidden md:table min-w-full table-auto ">
        <thead>
          <tr>
            <th className="py-4 px-4">Order ID</th>
            <th className="py-4 px-4">Price</th>
            <th className="py-4 px-4">Payment Status</th>
            <th className="py-4 px-4">Order Status</th>
            <th className="py-4 px-4">Action</th>
          </tr>
        </thead>

        <tbody>
          {ordersDataState.slice(0, 5).map((order) => (
            <tr key={order.id} className="border-t hover:bg-gray-100 ">
              <td className="text-center py-5 px-4">#{order.id}</td>
              <td className="text-center py-5 px-4">${order.totalPrice}</td>
              <td className="text-center py-5 px-4">
                <span
                  className={`py-2 px-3 rounded-3xl ${createStatusClasses(
                    order.orderStatus
                  )}`}
                >
                  {order.paymentStatus}
                </span>
              </td>
              <td className={`text-center py-5 px-4`}>
                <span
                  className={`py-2 px-3 rounded-3xl ${createStatusClasses(
                    order.orderStatus
                  )}`}
                >
                  {order.orderStatus}
                </span>
              </td>
              <td className="text-center px-4 py-5 flex justify-center space-x-2">
                <Link
                  to={`/admin/dashboard/orders/${order.id}`}
                  state={order}
                  className="text-green-500 text-center"
                >
                  <GrView size={25} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MobileTable({ ordersDataState, createStatusClasses }) {
  return (
    <div className="block sm:hidden">
      {/* Mobile Table: Display as list on mobile */}
      {ordersDataState.slice(0, 5).map((order) => (
        <div
          key={order.id}
          className="mb-2 p-4 border rounded-lg bg-gray-50 flex flex-col gap-2"
        >
          <div className="flex justify-between">
            <strong>Order ID: </strong>
            <p className="p-2">#{order.id}</p>
          </div>
          <div className="flex justify-between">
            <strong>Price:</strong>
            <p className="p-2">${order.totalPrice}</p>
          </div>
          <div className="flex justify-between">
            <strong>Payment Status: </strong>
            <p
              className={`p-2 rounded-3xl ${createStatusClasses(
                order.paymentStatus
              )}`}
            >
              {order.paymentStatus}
            </p>
          </div>
          <div className="flex justify-between">
            <strong>Order Status: </strong>
            <p
              className={`p-2 rounded-3xl ${createStatusClasses(
                order.paymentStatus
              )}`}
            >
              {order.orderStatus}
            </p>
          </div>
          <div className="flex justify-between mt-4">
            <strong>Action</strong>
            <div className="flex gap-1 p-2">
              <button className="text-green-500">
                <GrView size={22} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
