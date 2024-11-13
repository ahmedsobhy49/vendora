const PaymentRequestsData = [
  {
    id: 1,
    amount: 3243,
    requestStatus: "Pending",
    date: new Date().toLocaleDateString(),
  },
  {
    id: 2,
    amount: 3243,
    requestStatus: "Pending",
    date: new Date().toLocaleDateString(),
  },
  {
    id: 3,
    amount: 3243,
    requestStatus: "Pending",
    date: new Date().toLocaleDateString(),
  },
  {
    id: 4,
    amount: 3243,
    requestStatus: "Pending",
    date: new Date().toLocaleDateString(),
  },
  {
    id: 5,
    amount: 3243,
    requestStatus: "Pending",
    date: new Date().toLocaleDateString(),
  },
  {
    id: 6,
    amount: 3243,
    requestStatus: "Pending",
    date: new Date().toLocaleDateString(),
  },
  {
    id: 7,
    amount: 3243,
    requestStatus: "Pending",
    date: new Date().toLocaleDateString(),
  },
  {
    id: 8,
    amount: 3243,
    requestStatus: "Pending",
    date: new Date().toLocaleDateString(),
  },
  {
    id: 9,
    amount: 3243,
    requestStatus: "Pending",
    date: new Date().toLocaleDateString(),
  },
  {
    id: 10,
    amount: 3243,
    requestStatus: "Pending",
    date: new Date().toLocaleDateString(),
  },
  {
    id: 11,
    amount: 3243,
    requestStatus: "Pending",
    date: new Date().toLocaleDateString(),
  },
  {
    id: 12,
    amount: 3243,
    requestStatus: "Pending",
    date: new Date().toLocaleDateString(),
  },
];

import React, { useState } from "react";
import DashboardContainer from "../../../../../common/DashboardContainer";
import ScrollToTopOnPaginate from "../../../../../common/ScrollToTopOnPaginate";
import { GrView } from "react-icons/gr";
import Pagination from "../../../../../common/Pagination";
import TablesSelectDropdown from "../../../../../common/TablesSelectDropdown";
import { Link } from "react-router-dom";

export default function PaymentRequest() {
  const [searchQuery, setSearchQuery] = useState("");

  const [paymentsDataState, setPaymentsDataState] =
    useState(PaymentRequestsData);
  const [entriesNum, setEntriesNum] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const allEntriesNum = paymentsDataState.length;
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
          paymentsDataState={paymentsDataState}
          setPaymentsDataState={setPaymentsDataState}
          setCurrentPage={setCurrentPage}
          numberOfPages={numberOfPages}
          currentPage={currentPage}
        />
        <MobileTable
          showingFrom={showingFrom}
          showingTo={showingTo}
          paymentsDataState={paymentsDataState}
          createStatusClasses={createStatusClasses}
        />
        <DisktopTable
          showingFrom={showingFrom}
          showingTo={showingTo}
          createStatusClasses={createStatusClasses}
          searchQuery={searchQuery}
          paymentsDataState={paymentsDataState}
        />
        {paymentsDataState.length ? (
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
  paymentsDataState,
}) {
  return (
    <div className="overflow-auto bg-white rounded-lg min-h-[55rem]">
      <table className="hidden md:table min-w-full table-auto ">
        <thead>
          <tr>
            <th className="py-4 px-4">ID</th>
            <th className="py-4 px-4">Amount</th>
            <th className="py-4 px-4">Request Status</th>
            <th className="py-4 px-4">DATE</th>
            <th className="py-4 px-4">Action</th>
          </tr>
        </thead>
        {paymentsDataState.length ? (
          <tbody>
            {paymentsDataState.slice(showingFrom, showingTo).map((payment) => (
              <tr
                key={payment.id}
                className="border-t hover:bg-gray-100 first:border-t-4"
              >
                <td className="text-center py-5 px-4">#{payment.id}</td>
                <td className="text-center py-5 px-4 font-bold">
                  ${payment.amount}
                </td>
                <td className="text-center py-5 px-4">
                  <span
                    className={`py-2 px-3 rounded-3xl ${createStatusClasses(
                      payment.requestStatus
                    )}`}
                  >
                    {payment.requestStatus}
                  </span>
                </td>
                <td className="text-center py-5 px-4">{payment.date}</td>

                <td className="text-center px-4 py-5 flex justify-center space-x-2">
                  <Link
                    to={`/admin/dashboard/orders/${payment.id}`}
                    state={payment}
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
  setPaymentsDataState,
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
          placeholder="Search requests by ID..."
          value={searchQuery}
          onChange={(e) => {
            const query = e.target.value;
            setSearchQuery(query);

            const filteredData = PaymentRequestsData.filter((payment) => {
              return String(payment.id).includes(query);
            });

            setPaymentsDataState(filteredData);
          }}
        />
      </div>
    </div>
  );
}

function MobileTable({
  showingFrom,
  showingTo,
  paymentsDataState,
  createStatusClasses,
}) {
  return (
    <div className="block sm:hidden">
      {/* Mobile Table: Display as list on mobile */}
      {paymentsDataState.length ? (
        paymentsDataState.slice(showingFrom, showingTo).map((payment) => (
          <div
            key={payment.id}
            className="mb-2 p-4 border rounded-lg bg-gray-50 flex flex-col gap-2"
          >
            <dl>
              <div className="bg-gray-50 flex items-center justify-between px-4 py-4 lg:py-5 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-6">
                <dt className="text-sm sm:text-[1rem] font-medium text-gray-500">
                  ID
                </dt>
                <dd className="capitalize text-sm sm:text-[1rem] text-gray-900 sm:col-span-2">
                  #{payment.id}
                </dd>
              </div>
              <div className=" flex items-center justify-between px-4 py-4 lg:py-5 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-6">
                <dt className="text-sm sm:text-[1rem] font-medium text-gray-500">
                  Amount
                </dt>
                <dd className="capitalize text-sm sm:text-[1rem] text-gray-900 sm:col-span-2">
                  ${payment.amount}
                </dd>
              </div>
              <div className="bg-gray-50 flex items-center justify-between px-4 py-4 lg:py-5 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-6">
                <dt className="text-sm sm:text-[1rem] font-medium text-gray-500">
                  Request Status
                </dt>
                <dd
                  className={`capitalize text-sm sm:text-[1rem] text-gray-900 sm:col-span-2 ${createStatusClasses(
                    payment.requestStatus
                  )}`}
                >
                  {payment.requestStatus}
                </dd>
              </div>
              <div className="flex items-center justify-between px-4 py-4 lg:py-5 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-6">
                <dt className="text-sm sm:text-[1rem] font-medium text-gray-500">
                  Date
                </dt>
                <dd className="capitalize text-sm sm:text-[1rem] text-gray-900 sm:col-span-2">
                  {payment.date}
                </dd>
              </div>
              <div className="flex items-center justify-between px-4 py-4 lg:py-5 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-6">
                <dt className="text-sm sm:text-[1rem] font-medium text-gray-500">
                  Action
                </dt>
                <dd className="capitalize text-sm sm:text-[1rem] text-gray-900 sm:col-span-2">
                  <Link
                    to={`/admin/dashboard/sellers/${payment.id}`}
                    state={payment}
                    className="text-green-500 text-center 0"
                  >
                    <GrView size={25} />
                  </Link>
                </dd>
              </div>
            </dl>
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
