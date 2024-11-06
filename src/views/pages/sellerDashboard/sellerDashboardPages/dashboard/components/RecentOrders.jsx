import React, { useEffect, useState } from "react";
import { GrView } from "react-icons/gr";
import { Link } from "react-router-dom";
import { orders as originalOrdersData } from "../../../../../../data/orders.json";
import { getRecentOrdersBySellerId } from "../../../../../../services/orders/getRecentOrdersBySellerId";
import { useQuery } from "react-query";
import { authService } from "../../../../../../services/auth/auth";
import { BiSolidCreditCardAlt } from "react-icons/bi";
import { GiCash } from "react-icons/gi";

export default function Orders() {
  const [recentOrdersDataState, setRecentOrdersDataState] = useState([]);

  // Using useQuery to fetch user info
  const token = localStorage.getItem("token");
  const { data: seller } = useQuery(
    ["user", token],
    authService.fetchUserInfo,
    {
      enabled: !!token, // Only run the query if the token exists
    }
  );

  const { data: recentOrders } = useQuery(
    ["seller-recent-orders", seller?.user?._id],
    () => getRecentOrdersBySellerId(seller?.user?._id)
  );

  // Set recentOrdersDataState whenever orders?.data is available
  useEffect(() => {
    if (recentOrders?.data) {
      setRecentOrdersDataState(recentOrders?.data);
    }
  }, [recentOrders?.data]);
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
        recentOrdersDataState={recentOrdersDataState}
        createStatusClasses={createStatusClasses}
      />
      <DisktopTable
        createStatusClasses={createStatusClasses}
        recentOrdersDataState={recentOrdersDataState}
      />
    </div>
  );
}

function DisktopTable({ createStatusClasses, recentOrdersDataState }) {
  return (
    <div className="overflow-auto bg-white rounded-lg">
      <table className="hidden md:table min-w-full table-auto ">
        <thead>
          <tr className="border-b-4">
            <th className="py-4 px-4">Order ID</th>
            <th className="py-4 px-4">Date</th>
            <th className="py-4 px-4">Price</th>
            <th className="py-4 px-4">Order Status</th>
            <th className="py-4 px-4">Payment Status</th>
            <th className="py-4 px-4">Payment Method</th>
            <th className="py-4 px-4">Action</th>
          </tr>
        </thead>

        <tbody>
          {recentOrdersDataState?.length ? (
            recentOrdersDataState.map((order) => (
              <tr
                key={order._id}
                className="border-t hover:bg-gray-100 first:border-t-4"
              >
                <td className="text-center py-5 px-4">#{order?.orderId}</td>
                <td className="text-center py-5 px-4">
                  {new Date(order?.createdAt).toLocaleDateString()}
                </td>

                <td className="text-center py-5 px-4">
                  ${order?.sellers[0].totalPrice}
                </td>
                <td className="text-center py-5 px-4">
                  <span
                    className={`py-2 px-3 rounded-3xl ${createStatusClasses(
                      order?.orderStatus
                    )}`}
                  >
                    {order?.orderStatus}
                  </span>
                </td>
                <td className="text-center py-5 px-4">
                  <span
                    className={`py-2 px-3 rounded-3xl ${createStatusClasses(
                      order?.paymentStatus
                    )}`}
                  >
                    {order?.paymentStatus}
                  </span>
                </td>
                <td className="text-center py-5 px-4 flex justify-center">
                  {order?.paymentMethod === "COD" ? (
                    <div className="relative">
                      <span className="absolute text-xs -top-2 -right-3 text-gray-400">
                        COD
                      </span>
                      <GiCash size={40} />
                    </div>
                  ) : (
                    <div className="relative">
                      <span className="absolute text-xs -top-2 -right-3 text-gray-400">
                        Credit Card
                      </span>
                      <BiSolidCreditCardAlt size={40} />
                    </div>
                  )}
                </td>

                <td>
                  <Link
                    to={`/seller/dashboard/orders/${order?._id}`}
                    state={order}
                    className="text-green-500 text-center flex justify-center"
                  >
                    <GrView size={25} />
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8}>
                <div className="flex justify-center">
                  <p className="text-center p-12 text-gray-500 text-lg">
                    No Recent Orders Available
                  </p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function MobileTable({ recentOrdersDataState, createStatusClasses }) {
  return (
    <div className="block sm:hidden">
      {/* Mobile Table: Display as list on mobile */}
      {recentOrdersDataState.slice(0, 5).map((order) => (
        <div
          key={order._id}
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
