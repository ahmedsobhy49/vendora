import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import NoDataMessage from "../../../../../../common/NoDataMessage";
import {
  OrdersTableHead,
  OrdersTableRow,
} from "../../../../adminDashboard/adminDashboardPages/orders/Orders";
export const ordersData = [
  {
    id: "100000",
    totalPrice: 9837,
    orderStatus: "Pending",
    paymentStatus: "Pending",
    orderDate: new Date().toLocaleDateString(),
    toUser: {
      name: "mohsen",
      contant: {
        email: "mohsen@gmail.com",
        phone: "01002003022",
      },
      address: {
        country: "usa",
        street: "13 coe street",
        state: "ca",
        apartment: "13",
      },
    },
    fromSellers: [
      {
        id: "2",
        shopName: "wekf",
        products: [
          {
            id: "1",
            image:
              "data:image/jpeg;base64,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",
            name: "t-shirt",
            quantity: 3,
            price: 50,
          },
          {
            id: "2",
            name: "pants",
            image:
              "data:image/jpeg;base64,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",
            quantity: 1,
            price: 100,
          },
        ],
      },
      {
        id: "8",
        shopName: "zara",
        products: [
          {
            id: "093",
            name: "shirt",
            image:
              "data:image/jpeg;base64,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",
            quantity: 1,
            price: 10,
          },
        ],
      },
    ],
  },
  {
    id: "343",
    totalPrice: 9837,
    orderStatus: "Pending",
    paymentStatus: "Pending",
  },
  {
    id: "323",
    totalPrice: 9837,
    orderStatus: "Pending",
    paymentStatus: "Pending",
  },
  {
    id: "391232",
    totalPrice: 9837,
    orderStatus: "Pending",
    paymentStatus: "Pending",
  },
  {
    id: "322292",
    totalPrice: 9837,
    orderStatus: "Pending",
    paymentStatus: "Pending",
  },
  {
    id: "30992",
    totalPrice: 9837,
    orderStatus: "Pending",
    paymentStatus: "Pending",
  },
  {
    id: "39209",
    totalPrice: 9837,
    orderStatus: "Pending",
    paymentStatus: "Pending",
  },
  {
    id: "39216873i",
    totalPrice: 9837,
    orderStatus: "Pending",
    paymentStatus: "Pending",
  },
  {
    id: "3928372",
    totalPrice: 9837,
    orderStatus: "Pending",
    paymentStatus: "Pending",
  },
  {
    id: "311292",
    totalPrice: 9837,
    orderStatus: "Pending",
    paymentStatus: "Pending",
  },
  {
    id: "098392",
    totalPrice: 9837,
    orderStatus: "Pending",
    paymentStatus: "Pending",
  },
  {
    id: "39256",
    totalPrice: 9837,
    orderStatus: "Pending",
    paymentStatus: "Pending",
  },
  {
    id: "39762",
    totalPrice: 9837,
    orderStatus: "Pending",
    paymentStatus: "Pending",
  },
  {
    id: "38192",
    totalPrice: 9837,
    orderStatus: "Pending",
    paymentStatus: "Pending",
  },
  {
    id: "3129892",
    totalPrice: 9837,
    orderStatus: "Pending",
    paymentStatus: "Pending",
  },
  {
    id: "39562",
    totalPrice: 9837,
    orderStatus: "Pending",
    paymentStatus: "Pending",
  },
  {
    id: "3598792",
    totalPrice: 9837,
    orderStatus: "Pending",
    paymentStatus: "Pending",
  },
  {
    id: "123392",
    totalPrice: 9837,
    orderStatus: "Pending",
    paymentStatus: "Pending",
  },
  {
    id: "8765",
    totalPrice: 9837,
    orderStatus: "Pending",
    paymentStatus: "Pending",
  },
  {
    id: "456",
    totalPrice: 9837,
    orderStatus: "Pending",
    paymentStatus: "Pending",
  },
  {
    id: "5678",
    totalPrice: 9837,
    orderStatus: "Pending",
    paymentStatus: "Pending",
  },
  {
    id: "890",
    totalPrice: 9837,
    orderStatus: "Pending",
    paymentStatus: "Pending",
  },
  {
    id: "4567",
    totalPrice: 9837,
    orderStatus: "Pending",
    paymentStatus: "Pending",
  },
  {
    id: "09876",
    totalPrice: 9837,
    orderStatus: "Pending",
    paymentStatus: "Pending",
  },
  {
    id: "423411",
    totalPrice: 9837,
    orderStatus: "Pending",
    paymentStatus: "Pending",
  },
  {
    id: "0828992",
    totalPrice: 9837,
    orderStatus: "Pending",
    paymentStatus: "Pending",
  },
  {
    id: "239082782",
    totalPrice: 9837,
    orderStatus: "Pending",
    paymentStatus: "Pending",
  },
];

const isThereOrders = Boolean(ordersData?.length);

function TableHeader() {
  return (
    <div className="flex items-center justify-between p-4 lg:px-8 bg-[#338ffb] text-white">
      <h3 className="text-[0.95rem] sm:text-[1.1rem] md:tracking-wide font-bold">
        Recent Orders
      </h3>
      {isThereOrders && (
        <Link
          to={"/seller/dashboard/orders"}
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
      {ordersData?.slice(0, 6).map((order) => {
        return (
          <OrdersTableRow
            orderId={order.id}
            orderPrice={order.totalPrice}
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
    <div className="shadow-lg bg-white">
      <TableHeader />
      <div className="pt-2 bg-white ">
        {isThereOrders ? (
          <table className="w-full divide-y divide-gray-400 bg-white">
            <OrdersTableHead />
            <TableBody />
          </table>
        ) : (
          <NoDataMessage message={"No orders have been received"} />
        )}
      </div>
    </div>
  );
}
