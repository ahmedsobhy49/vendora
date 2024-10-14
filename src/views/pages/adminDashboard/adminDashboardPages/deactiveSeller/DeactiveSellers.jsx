import React, { useState } from "react";
import DashboardContainer from "../../../../../common/DashboardContainer";
import { sellers as originalSellersData } from "../../../../../data/sellers.json";
import ScrollToTopOnPaginate from "../../../../../common/ScrollToTopOnPaginate";
import { GrView } from "react-icons/gr";
import Pagination from "../../../../../common/Pagination";
import TablesSelectDropdown from "../../../../../common/TablesSelectDropdown";
import { Link } from "react-router-dom";

const deactiveSeller = originalSellersData.filter(
  (seller) => seller.status === "deactive"
);
export default function DeactiveSellers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sellersDataState, setSellersDataState] = useState(deactiveSeller);
  const [entriesNum, setEntriesNum] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const allEntriesNum = sellersDataState.length;
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
          sellersDataState={sellersDataState}
          setSellersDataState={setSellersDataState}
          setCurrentPage={setCurrentPage}
          numberOfPages={numberOfPages}
          currentPage={currentPage}
        />
        <MobileTable
          showingFrom={showingFrom}
          showingTo={showingTo}
          sellersDataState={sellersDataState}
          createStatusClasses={createStatusClasses}
        />
        <DisktopTable
          showingFrom={showingFrom}
          showingTo={showingTo}
          createStatusClasses={createStatusClasses}
          searchQuery={searchQuery}
          sellersDataState={sellersDataState}
        />
        {sellersDataState.length ? (
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
  sellersDataState,
}) {
  return (
    <div className="overflow-auto bg-white rounded-lg">
      <table className="hidden md:table min-w-full table-auto">
        <thead>
          <tr>
            <th className="py-4 px-4">ID</th>
            <th className="py-4 px-4">Image</th>
            <th className="py-4 px-4">Name</th>
            <th className="py-4 px-4">Email</th>
            <th className="py-4 px-4">Shop Name</th>
            <th className="py-4 px-4">Payment Status</th>
            <th className="py-4 px-4">Division</th>
            <th className="py-4 px-4">Districts</th>
            <th className="py-4 px-4">Action</th>
          </tr>
        </thead>
        {sellersDataState.length ? (
          <tbody>
            {sellersDataState.slice(showingFrom, showingTo).map((seller) => (
              <tr
                key={seller.id}
                className="border-t hover:bg-gray-100 first:border-t-4"
              >
                <td className="text-center py-1 px-4">#{seller.id}</td>
                <td className="text-center py-1 px-4">
                  <div className="w-12 mx-auto md:w-16 xl:w-20 rounded-full">
                    <img
                      src={seller.image}
                      alt="category"
                      className="w-full aspect-square rounded-full border-4 shadow-2xl"
                    />
                  </div>
                </td>
                <td className="text-center py-1 px-4 capitalize">
                  {seller.name}
                </td>
                <td className="text-center py-1 px-4">{seller.email}</td>
                <td className="text-center py-1 px-4 capitalize">
                  {seller.shopName}
                </td>

                <td className="text-center py-1 px-4">
                  <span
                    className={`py-1 px-3 rounded-3xl capitalize ${createStatusClasses(
                      seller.paymentStatus
                    )}`}
                  >
                    {seller.paymentStatus}
                  </span>
                </td>
                <td className="text-center py-1 px-4 capitalize">
                  {seller.division}
                </td>
                <td className="text-center py-1 px-4 capitalize">
                  {seller.district}
                </td>
                <td className="text-center px-4 py-1 flex justify-center space-x-2">
                  <Link
                    to={`/admin/dashboard/sellers/${seller.id}`}
                    state={seller}
                    className="text-green-500 text-center 0 py-7"
                  >
                    <GrView size={25} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tr>
            <td colSpan={9}>
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
  setSellersDataState,
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

            const filteredData = deactiveSeller.filter((seller) => {
              return seller.name.includes(query);
            });

            setSellersDataState(filteredData);
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
  sellersDataState,
  createStatusClasses,
}) {
  return (
    <div className="block sm:hidden">
      {/* Mobile Table: Display as list on mobile */}
      {sellersDataState.length ? (
        sellersDataState.slice(showingFrom, showingTo).map((seller) => (
          <div
            key={seller.id}
            className="mb-2 p-4 border rounded-lg bg-white flex flex-col gap-2"
          >
            <dl>
              <div className="w-1/3 mx-auto mb-4">
                <img
                  src={seller.image}
                  alt="category"
                  className="w-full aspect-square rounded-full border-4 shadow-xl"
                />
              </div>
              <div className="bg-gray-50 flex items-center justify-between px-4 py-4 lg:py-5 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-6">
                <dt className="text-sm sm:text-[1rem] font-medium text-gray-500">
                  ID
                </dt>
                <dd className="capitalize text-sm sm:text-[1rem] text-gray-900 sm:col-span-2">
                  #{seller.id}
                </dd>
              </div>
              <div className=" flex items-center justify-between px-4 py-4 lg:py-5 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-6">
                <dt className="text-sm sm:text-[1rem] font-medium text-gray-500">
                  Name
                </dt>
                <dd className="capitalize text-sm sm:text-[1rem] text-gray-900 sm:col-span-2">
                  {seller.name}
                </dd>
              </div>
              <div className="bg-gray-50 flex items-center justify-between px-4 py-4 lg:py-5 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-6">
                <dt className="text-sm sm:text-[1rem] font-medium text-gray-500">
                  Email
                </dt>
                <dd className="capitalize text-sm sm:text-[1rem] text-gray-900 sm:col-span-2">
                  {seller.email}
                </dd>
              </div>
              <div className="flex items-center justify-between px-4 py-4 lg:py-5 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-6">
                <dt className="text-sm sm:text-[1rem] font-medium text-gray-500">
                  Shop Name
                </dt>
                <dd className="capitalize text-sm sm:text-[1rem] text-gray-900 sm:col-span-2">
                  {seller.shopName}
                </dd>
              </div>
              <div className="bg-gray-50 flex items-center justify-between px-4 py-4 lg:py-5 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-6">
                <dt className="text-sm sm:text-[1rem] font-medium text-gray-500">
                  Payment Status
                </dt>
                <dd
                  className={`capitalize text-sm sm:text-[1rem] text-gray-900 sm:col-span-2 ${createStatusClasses(
                    seller.paymentStatus
                  )}`}
                >
                  {seller.paymentStatus}
                </dd>
              </div>
              <div className="flex items-center justify-between px-4 py-4 lg:py-5 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-6">
                <dt className="text-sm sm:text-[1rem] font-medium text-gray-500">
                  Division
                </dt>
                <dd className="capitalize text-sm sm:text-[1rem] text-gray-900 sm:col-span-2">
                  {seller.division}
                </dd>
              </div>
              <div className=" bg-gray-50 flex items-center justify-between px-4 py-4 lg:py-5 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-6">
                <dt className="text-sm sm:text-[1rem] font-medium text-gray-500">
                  District
                </dt>
                <dd className="capitalize text-sm sm:text-[1rem] text-gray-900 sm:col-span-2">
                  {seller.district}
                </dd>
              </div>
              <div className="flex items-center justify-between px-4 py-4 lg:py-5 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-6">
                <dt className="text-sm sm:text-[1rem] font-medium text-gray-500">
                  Action
                </dt>
                <dd className="capitalize text-sm sm:text-[1rem] text-gray-900 sm:col-span-2">
                  <Link
                    to={`/admin/dashboard/sellers/${seller.id}`}
                    state={seller}
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
