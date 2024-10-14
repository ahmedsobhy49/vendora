import React, { useEffect, useState } from "react";
import DashboardContainer from "../../../../../common/DashboardContainer";
import { products as originaProductsData } from "../../../../../data/products.json";
import ScrollToTopOnPaginate from "../../../../../common/ScrollToTopOnPaginate";
import { GrView } from "react-icons/gr";
import Pagination from "../../../../../common/Pagination";
import TablesSelectDropdown from "../../../../../common/TablesSelectDropdown";
import { parentCategories } from "../../../../../data/parentCategories.json";
console.log(parentCategories);
export default function AllProducts() {
  const [productsDataState, setProductsDataState] =
    useState(originaProductsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesNum, setEntriesNum] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const allEntriesNum = productsDataState.length;
  const numberOfPages = Math.ceil(allEntriesNum / entriesNum);
  const showingFrom = entriesNum * (currentPage - 1);
  const showingTo =
    entriesNum * (currentPage - 1) + entriesNum < allEntriesNum
      ? entriesNum * (currentPage - 1) + entriesNum
      : allEntriesNum;

  return (
    <DashboardContainer>
      <ScrollToTopOnPaginate pageState={currentPage} />
      <div>
        <SellerTableHeader
          numberOfPages={numberOfPages}
          entriesNum={entriesNum}
          setEntriesNum={setEntriesNum}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          productsDataState={productsDataState}
          setProductsDataState={setProductsDataState}
        />
        <MobileTable
          showingFrom={showingFrom}
          showingTo={showingTo}
          productsDataState={productsDataState}
        />
        <DisktopTable
          showingFrom={showingFrom}
          showingTo={showingTo}
          searchQuery={searchQuery}
          productsDataState={productsDataState}
        />
        {productsDataState.length ? (
          <Pagination
            numberOfPages={numberOfPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            showingFrom={showingFrom}
            showingTo={showingTo}
            totalEntries={allEntriesNum}
          />
        ) : null}
      </div>
    </DashboardContainer>
  );
}

function DisktopTable({ showingFrom, showingTo, productsDataState }) {
  return (
    <div className="overflow-auto bg-white rounded-lg">
      <table className="hidden md:table min-w-full table-auto ">
        <thead>
          <tr>
            <th className="py-4 px-4">ID</th>
            <th className="py-4 px-4">Image</th>
            <th className="py-4 px-4">Name</th>
            <th className="py-4 px-4">Category</th>
            <th className="py-4 px-4">Brand</th>
            <th className="py-4 px-4">Price</th>
            <th className="py-4 px-4">Discount</th>
            <th className="py-4 px-4">Stock</th>
            <th className="py-4 px-4">Action</th>
          </tr>
        </thead>
        {productsDataState.length ? (
          <tbody>
            {productsDataState.slice(showingFrom, showingTo).map((product) => {
              // Find the parent category name
              const parentCategory = parentCategories.find(
                (parentCategory) =>
                  parentCategory.id === product.category.parentId
              );

              return (
                <tr key={product._id} className="border-t hover:bg-gray-100 ">
                  <td className="text-center py-0 px-4">#{product._id}</td>
                  <td className="text-center py-0 px-4">
                    <div className="w-12 mx-auto md:w-16 xl:w-20 rounded-full">
                      <img
                        src={product.images[0].url}
                        alt={product.images[0].altText}
                        className="w-full aspect-square rounded-full border-4 shadow-2xl"
                      />
                    </div>
                  </td>
                  <td className="text-center py-0 px-4">
                    <span className={`py-2 px-3 rounded-3xl`}>
                      {product.name}
                    </span>
                  </td>
                  <td className={`text-center py-0 px-4`}>
                    <span className={`py-2 px-3 rounded-3xl `}>
                      {parentCategory
                        ? parentCategory.name
                        : "Unknown Category"}
                    </span>
                  </td>
                  <td className={`text-center py-0 px-4`}>
                    <span className={`py-2 px-3 rounded-3xl `}>
                      {product.brand}
                    </span>
                  </td>
                  <td className={`text-center py-0 px-4`}>
                    <span className={`py-2 px-3 rounded-3xl `}>
                      ${product.price}
                    </span>
                  </td>
                  <td className={`text-center py-0 px-4`}>
                    <span className={`py-2 px-3 rounded-3xl `}>
                      %{product.discount.amount}
                    </span>
                  </td>
                  <td className={`text-center py-0 px-4`}>
                    <span className={`py-2 px-3 rounded-3xl `}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="text-center py-0 px-4 flex justify-center space-x-2 h-24">
                    <button className="text-green-500 text-center">
                      <GrView size={20} />
                    </button>
                    <button className="text-green-500 text-center">
                      <GrView size={20} />
                    </button>
                    <button className="text-green-500 text-center">
                      <GrView size={20} />
                    </button>
                  </td>
                </tr>
              );
            })}
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
  setCurrentPage,
  currentPage,
  numberOfPages,
  setProductsDataState,
}) {
  return (
    <div>
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

            const filteredData = originaProductsData.filter((product) => {
              return product.name.includes(query);
            });
            setCurrentPage(1); /// look again
            setProductsDataState(filteredData);
          }}
        />
      </div>
    </div>
  );
}

function MobileTable({ showingFrom, showingTo, productsDataState }) {
  return (
    <div className="block sm:hidden">
      {/* Mobile Table: Display as a list on mobile */}
      {productsDataState.length ? (
        productsDataState.slice(showingFrom, showingTo).map((product) => (
          <div
            key={product._id}
            className="mb-2 p-4 border rounded-lg bg-gray-50 flex flex-col gap-2"
          >
            <div className="flex justify-center items-center">
              <img
                src={product.images[0].url}
                alt={product.images[0].altText}
                className="w-20 h-20 object-cover rounded-full"
              />
            </div>
            <div className="flex justify-between">
              <strong>Product ID: </strong>
              <p className="p-2">#{product._id}</p>
            </div>
            <div className="flex justify-between">
              <strong>Name:</strong>
              <p className="p-2">{product.name}</p>
            </div>
            <div className="flex justify-between">
              <strong>Price:</strong>
              <p className="p-2">${product.price}</p>
            </div>
            <div className="flex justify-between">
              <strong>Category:</strong>
              <p className={`p-2`}>
                {parentCategories.find(
                  (category) => category.id === product.category.parentId
                )?.name || "N/A"}
              </p>
            </div>
            <div className="flex justify-between">
              <strong>Brand:</strong>
              <p className={`p-2`}>{product.brand}</p>
            </div>
            <div className="flex justify-between">
              <strong>Stock:</strong>
              <p className={`p-2`}>{product.stock}</p>
            </div>
            <div className="flex justify-between mt-4">
              <strong>Action</strong>
              <div className="flex gap-1 p-2">
                <button className="text-green-500">
                  <GrView size={22} />
                </button>
                {/* Add more action buttons as needed */}
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
