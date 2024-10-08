import React from "react";
import DashboardContainer from "../../../../../common/DashboardContainer";
import TableContainer from "../../gen/TableContainer";
import TableBodyContainer from "../../gen/TableBodyContainer";
import Input from "../../../../../common/Input";
import { IoEyeOutline } from "react-icons/io5";
import sellers from "../../../../../data/sellers.json";
import { Link } from "react-router-dom";

const isThereSellers = Boolean(sellers.sellers?.length);

export default function Sellers() {
  return (
    <DashboardContainer>
      <div>
        <SellerTableHeader />
      </div>
      <div className="h-[49.4rem] overflow-auto px-10 bg-white">
        <TableContainer>
          <SellerTableHead />
          <TableBodyContainer>
            {sellers.sellers
              ?.filter((seller) => {
                return seller.status === "active";
              })
              .map((seller) => {
                return (
                  <SellerTableRow
                    seller={seller}
                    key={seller.id}
                    sellerId={seller.id}
                    name={seller.name}
                    shopName={seller.shopName}
                    image={seller.image}
                    email={seller.email}
                    district={seller.district}
                    division={seller.division}
                    paymentStatus={seller.paymentStatus}
                  />
                );
              })}
          </TableBodyContainer>
        </TableContainer>
      </div>
    </DashboardContainer>
  );
}

function SellerTableRow({
  sellerId,
  image,
  name,
  shopName,
  paymentStatus,
  email,
  division,
  district,
  seller,
}) {
  return (
    <tr className="h-20 text-xs text-gray-700 md:text-sm">
      <td className="py-3 font-bold text-gray-700 whitespace-nowrap xl:w-5">
        {sellerId}
      </td>
      <td className="px-[2.5rem] py-[0.75rem] text-center whitespace-nowrap xl:w-5">
        <div className="w-12 mx-auto md:w-16 xl:w-20">
          <img src={image} alt="category" className="w-full aspect-square" />
        </div>
      </td>
      <td className="px-[2.5rem] py-[0.75rem] text-center whitespace-nowrap xl:w-5">
        {name}
      </td>
      <td className="px-[2.5rem] py-[0.75rem] text-center whitespace-nowrap xl:w-5">
        {shopName}
      </td>
      <td className="px-[2.5rem] py-[0.75rem] text-center whitespace-nowrap xl:w-5">
        {paymentStatus}
      </td>
      <td className="px-[2.5rem] py-[0.75rem] text-center whitespace-nowrap xl:w-5">
        {email}
      </td>
      <td className="px-[2.5rem] py-[0.75rem] text-center whitespace-nowrap xl:w-5">
        {division}
      </td>
      <td className="px-[2.5rem] py-[0.75rem] text-center whitespace-nowrap xl:w-5">
        {district}
      </td>
      <td className="py-3 text-center whitespace-nowrap gap-5 xl:w-5">
        <Link
          to={`/admin/dashboard/sellers/${sellerId}`}
          state={seller}
          className=" flex bg-green-400 py-1 px-2 justify-center items-center"
        >
          <IoEyeOutline size={20} color="#fff" />
        </Link>
      </td>
    </tr>
  );
}

function SellerTableHead() {
  return (
    <thead className="tracking-tighter text-gray-700 uppercase w-full text-[0.7rem] sm:text-[0.75rem] md:text-[0.77rem] lg:text-sm md:tracking-normal">
      <tr>
        <th scope="col" className="py-[0.5rem] text-center sm:pt-[1rem]">
          ID
        </th>
        <th
          scope="col"
          className="px-[2.5rem] py-[0.5rem] text-center sm:pt-[1rem]"
        >
          Image
        </th>
        <th
          scope="col"
          className="px-[2.5rem] py-[0.5rem] text-center sm:pt-[1rem]"
        >
          Name
        </th>
        <th
          scope="col"
          className="px-[2.5rem] py-[0.5rem] text-center sm:pt-[1rem]"
        >
          Shop Name
        </th>
        <th
          scope="col"
          className="px-[2.5rem] py-[0.5rem] text-center sm:pt-[1rem]"
        >
          Payment Status
        </th>
        <th
          scope="col"
          className="px-[2.5rem] py-[0.5rem] text-center sm:pt-[1rem]"
        >
          Email
        </th>
        <th
          scope="col"
          className="px-[2.5rem] py-[0.5rem] text-center sm:pt-[1rem]"
        >
          Division
        </th>
        <th
          scope="col"
          className="px-[2.5rem] py-[0.5rem] text-center sm:pt-[1rem]"
        >
          District
        </th>
        <th scope="col" className="py-[0.5rem] text-center sm:pt-[1rem]">
          Action
        </th>
      </tr>
    </thead>
  );
}

function SellerTableHeader() {
  return (
    <div className="flex items-center justify-between p-[1rem] shadow-md bg-[#338ffb] lg:px-[2rem]">
      <Input
        inputClassName="w-[170px] sm:w-1/3 lg:w-1/4 xl:w-1/5 py-1 sm:py-2 px-3 outline-none rounded-full placeholder:text-xs placeholder:sm:text-[0.85rem] lg:placeholder:text-[1rem]"
        placeholder="Search Sellers..."
        id={"search-seller"}
        name={"search-seller"}
        type={"search"}
      />
    </div>
  );
}
