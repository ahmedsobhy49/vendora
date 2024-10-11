import React, { useEffect, useState } from "react";
import DashboardContainer from "../../../../../common/DashboardContainer";
import { ordersData as originalOrdersData } from "../../../adminDashboard/adminDashboardPages/dashboard/components/RecentOrders";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import ScrollToTopOnPaginate from "../../../../../common/ScrollToTopOnPaginate";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";

export default function Orders() {
  const [ordersDataState, setOrdersDataState] = useState(originalOrdersData);
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesNum, setEntriesNum] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const allEntriesNum = ordersDataState.length;
  const numberOfPages = Math.trunc(allEntriesNum / entriesNum) + 1;
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
            numberOfPages={numberOfPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            showingFrom={showingFrom}
            showingTo={showingTo}
            allEntriesNum={allEntriesNum}
            ordersDataState={ordersDataState}
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
                <td className="text-center py-0 px-4">#{order.id}</td>
                <td className="text-center py-0 px-4">${order.totalPrice}</td>
                <td className="text-center py-0 px-4">{order.paymentStatus}</td>
                <td className={`text-center py-0 px-4`}>
                  <span
                    className={`py-2 px-3 rounded-3xl ${createStatusClasses(
                      order.orderStatus
                    )}`}
                  >
                    {order.orderStatus}
                  </span>
                </td>
                <td className="text-center py-0 px-4 flex justify-center space-x-2 h-16">
                  <button className="text-purple-600 text-center">
                    <FaEdit size={20} />
                  </button>
                  <button className="text-red-600 text-center">
                    <RiDeleteBin6Fill size={20} />
                  </button>
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
          <SelectDropdown
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
          }}
        />
      </div>
    </div>
  );
}

function MobileTable({ showingFrom, showingTo, ordersDataState }) {
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
              {order.id}
            </div>
            <div className="flex justify-between">
              <strong>Price: </strong>
              {order.totalPrice}
            </div>
            <div className="flex justify-between">
              <strong>Payment Status: </strong>
              {order.paymentStatus}
            </div>
            <div className="flex justify-between">
              <strong>Order Status: </strong>
              {order.orderStatus}
            </div>
            <div className="flex justify-between mt-4">
              <strong>Action</strong>
              <div className="flex gap-1">
                <button className="text-purple-600">
                  <FaEdit size={22} />
                </button>
                <button className="text-red-600">
                  <RiDeleteBin6Fill size={22} />
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

function Pagination({
  numberOfPages,
  currentPage,
  setCurrentPage,
  showingFrom,
  showingTo,
  allEntriesNum,
  ordersDataState,
}) {
  return (
    <div className="mt-4 flex justify-between items-center">
      <span className="text-gray-500 text-xs sm:text-[1rem]">
        {ordersDataState.length
          ? `Showing ${
              showingFrom + 1
            } to ${showingTo} of ${allEntriesNum} entries`
          : ""}
      </span>
      <div className="flex space-x-1">
        <button
          onClick={() =>
            currentPage > 1
              ? setCurrentPage((currStata) => currStata - 1)
              : () => {}
          }
          className="rounded-md border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg hover:bg-black  hover:text-white  bg-white text-black  ml-2 flex items-center justify-center"
        >
          <GrFormPrevious className="text-lg" />
        </button>
        {Array.from({ length: numberOfPages }).map((_, i) => {
          return (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`${
                currentPage === i + 1
                  ? "bg-black text-white"
                  : "bg-white text-black"
              } min-w-9 rounded-md  py-2 px-3 border border-transparent text-center text-sm  transition-all shadow-md hover:shadow-lg  focus:shadow-none  hover:bg-black hover:text-white active:shadow-none  ml-2 `}
            >
              {i + 1}
            </button>
          );
        })}

        <button
          onClick={() =>
            currentPage < numberOfPages
              ? setCurrentPage((currStata) => currStata + 1)
              : () => {}
          }
          className="rounded-md border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg hover:bg-black  hover:text-white  bg-white text-black  ml-2 flex items-center justify-center"
        >
          <GrFormNext className="text-lg" />
        </button>
      </div>
    </div>
  );
}

function SelectDropdown({
  entriesNum,
  setEntriesNum,
  setCurrentPage,
  currentPage,
  numberOfPages,
}) {
  const options = [5, 10, 15];
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    // If the current page is greater than the total number of pages after entriesNum changes
    if (currentPage > numberOfPages) {
      setCurrentPage(1); // Reset to the first page
    }
  }, [entriesNum, numberOfPages, currentPage, setCurrentPage]);

  return (
    <div className="relative w-full">
      {/* Toggle button */}
      <button
        type="button"
        onClick={toggleDropdown}
        className="outline-none hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-2 ps-4 pe-9 flex gap-x-2 text-nowrap w-full cursor-pointer bg-white rounded-lg text-start text-sm  dark:bg-neutral-900 dark:border-neutral-700 dark:text-white "
        aria-expanded={isOpen}
      >
        {entriesNum || "Select option..."}
        <span className="absolute top-1/2 end-3 -translate-y-1/2">
          <svg
            className="shrink-0 size-3.5 text-gray-500 dark:text-neutral-500"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m7 15 5 5 5-5" />
            <path d="m7 9 5-5 5 5" />
          </svg>
        </span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="mt-2 z-50 absolute w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto dark:bg-neutral-900 dark:border-neutral-700">
          {options.map((option) => (
            <div
              key={option}
              className={`py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 ${
                option.disabled ? "pointer-events-none opacity-50" : ""
              }`}
              onClick={() => {
                setIsOpen(false);
                setEntriesNum(option);
              }}
            >
              <span>{option}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
