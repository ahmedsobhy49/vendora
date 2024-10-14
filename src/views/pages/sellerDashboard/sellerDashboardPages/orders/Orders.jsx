import React, { useState } from "react";
import DashboardContainer from "../../../../../common/DashboardContainer";
import { orders as originalOrdersData } from "../../../../../data/orders.json";
import ScrollToTopOnPaginate from "../../../../../common/ScrollToTopOnPaginate";
import { GrView } from "react-icons/gr";
import Pagination from "../../../../../common/Pagination";
import TablesSelectDropdown from "../../../../../common/TablesSelectDropdown";
import { Link } from "react-router-dom";

export default function Orders() {
  const [searchQuery, setSearchQuery] = useState("");

  const [ordersDataState, setOrdersDataState] = useState(originalOrdersData);
  const [entriesNum, setEntriesNum] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const allEntriesNum = ordersDataState.length;
  const numberOfPages = Math.ceil(allEntriesNum / entriesNum);
  const showingFrom = entriesNum * (currentPage - 1);
  const showingTo =
    entriesNum * (currentPage - 1) + entriesNum < allEntriesNum
      ? entriesNum * (currentPage - 1) + entriesNum
      : allEntriesNum;

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
    <DashboardContainer>
      <ScrollToTopOnPaginate pageState={currentPage} />
      <div>
        <SellerTableHeader
          entriesNum={entriesNum}
          setEntriesNum={setEntriesNum}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          ordersDataState={ordersDataState}
          setOrdersDataState={setOrdersDataState}
          setCurrentPage={setCurrentPage}
          numberOfPages={numberOfPages}
          currentPage={currentPage}
        />
        <MobileTable
          showingFrom={showingFrom}
          showingTo={showingTo}
          ordersDataState={ordersDataState}
          createStatusClasses={createStatusClasses}
        />
        <DisktopTable
          showingFrom={showingFrom}
          showingTo={showingTo}
          createStatusClasses={createStatusClasses}
          searchQuery={searchQuery}
          ordersDataState={ordersDataState}
        />
        {ordersDataState.length ? (
          <Pagination
            numberOfPages={numberOfPages} // total number of pages that should be composed based on total number of entries (data length)
            currentPage={currentPage} // the current page are user in while pagination
            onPageChange={setCurrentPage}
            showingFrom={showingFrom}
            showingTo={showingTo}
            totalEntries={allEntriesNum} // total number of entries (data length)
          />
        ) : null}
      </div>
    </DashboardContainer>
  );
}

function DisktopTable({
  showingFrom,
  showingTo,
  createStatusClasses,
  ordersDataState,
}) {
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
        {ordersDataState.length ? (
          <tbody>
            {ordersDataState.slice(showingFrom, showingTo).map((order) => (
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
        ) : (
          <tr>
            <td colSpan={5}>
              <div className="flex justify-center">
                <p className="text-center p-12 text-gray-500 text-lg">
                  No Matched Data
                </p>
              </div>
            </td>
          </tr>
        )}
      </table>
    </div>
  );
}

function SellerTableHeader({
  entriesNum,
  setEntriesNum,
  searchQuery,
  setSearchQuery,
  setOrdersDataState,
  setCurrentPage,
  currentPage,
  numberOfPages,
}) {
  return (
    <div>
      {/* entries num  */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-gray-500">Show</span>
        <div>
          <TablesSelectDropdown
            entriesNum={entriesNum}
            setEntriesNum={setEntriesNum}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            numberOfPages={numberOfPages}
          />
        </div>
        <span className="text-gray-500">entries</span>
      </div>
      {/* search  */}
      <div className="w-full">
        <input
          type="seacrch"
          className="w-full px-4 py-2 rounded-lg mb-2 outline-none  md:py-3"
          placeholder="Search orders by ID..."
          value={searchQuery}
          onChange={(e) => {
            const query = e.target.value;
            setSearchQuery(query);

            const filteredData = originalOrdersData.filter((order) => {
              return order.id.includes(query);
            });

            setOrdersDataState(filteredData);
            setCurrentPage(1);
          }}
        />
      </div>
    </div>
  );
}

function MobileTable({
  showingFrom,
  showingTo,
  ordersDataState,
  createStatusClasses,
}) {
  return (
    <div className="block sm:hidden">
      {/* Mobile Table: Display as list on mobile */}
      {ordersDataState.length ? (
        ordersDataState.slice(showingFrom, showingTo).map((order) => (
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
        ))
      ) : (
        <div className="flex justify-center mb-2">
          <p className="text-center p-12 text-gray-500 text-lg">
            No Matched Data
          </p>
        </div>
      )}
    </div>
  );
}
