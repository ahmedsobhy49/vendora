import React from "react";
import { IoEyeOutline } from "react-icons/io5";
import DashboardContainer from "../../../../../common/DashboardContainer";
import TableBodyContainer from "../../gen/TableBodyContainer";
import TableContainer from "../../gen/TableContainer";
import sellers from "../../../../../data/sellers.json";
import Input from "../../../../../common/Input";
import { Link } from "react-router-dom";
import TableHeaderContainer from "../../gen/TableHeaderContainer";
import SearchInput from "../../gen/SearchInput";
import TableHeadContainer from "../../gen/TableHeadContainer";

const isThereSellers = Boolean(sellers.sellers?.length);

export default function DeactiveSellers() {
  return (
    <DashboardContainer>
      <div>
        <DeactiveSellersTableHeader />
      </div>
      <div className="table-custom-hight overflow-auto bg-white hide-scrollbar">
        <TableContainer>
          <DeactiveSellersTableHead />
          <TableBodyContainer>
            {sellers.sellers
              ?.filter((seller) => {
                return seller.status === "deactive";
              })
              .map((seller) => {
                return (
                  <DeactiveSellersTableRow
                    seller={seller}
                    sellerId={seller.id}
                    image={seller.image}
                    name={seller.name}
                    email={seller.email}
                    paymentStatus={seller.paymentStatus}
                    status={seller.status}
                  />
                );
              })}
          </TableBodyContainer>
        </TableContainer>
      </div>
    </DashboardContainer>
  );
}

function DeactiveSellersTableHeader() {
  return (
    <TableHeaderContainer>
      <SearchInput placeholder={"search deactive"} id={"search-deactive"} />
    </TableHeaderContainer>
  );
}

function DeactiveSellersTableHead() {
  return (
    <TableHeadContainer>
      <tr>
        <th scope="col" className="px-10 py-4 text-center sm:pt-[1rem]">
          ID
        </th>
        <th scope="col" className="px-10 py-4 text-center sm:pt-[1rem]">
          Image
        </th>
        <th scope="col" className="px-10 py-4 text-center sm:pt-[1rem]">
          Name
        </th>
        <th scope="col" className="px-10 py-4 text-center sm:pt-[1rem]">
          Email
        </th>
        <th scope="col" className="px-10 py-4 text-center sm:pt-[1rem]">
          Payment Status
        </th>
        <th scope="col" className="px-10 py-4 text-center sm:pt-[1rem]">
          Status
        </th>

        <th scope="col" className="px-10 py-4 text-center sm:pt-[1rem]">
          Action
        </th>
      </tr>
    </TableHeadContainer>
  );
}

function DeactiveSellersTableRow({
  seller,
  sellerId,
  image,
  name,
  paymentStatus,
  email,
  status,
}) {
  return (
    <tr className="h-20 text-xs text-gray-700 md:text-sm even:bg-slate-50">
      <td className="px-2 py-3 font-bold text-gray-700 whitespace-nowrap xl:w-5 text-center">
        {sellerId}
      </td>
      <td className="px-2 py-3 text-center whitespace-nowrap xl:w-5">
        <div className="w-12 mx-auto md:w-16 xl:w-20">
          <img src={image} alt="category" className="w-full aspect-square" />
        </div>
      </td>
      <td className="px-2 py-3 text-center whitespace-nowrap xl:w-5">{name}</td>
      <td className="px-2 py-3 text-center whitespace-nowrap xl:w-5">
        {email}
      </td>
      <td className="px-2 py-3 text-center whitespace-nowrap xl:w-5">
        {paymentStatus}
      </td>

      <td className="px-2 py-3 text-center whitespace-nowrap xl:w-5">
        {status}
      </td>
      {/* <td className="px-2 py-3 text-center whitespace-nowrap gap-5 xl:w-5"> */}
      <td className="py-3 text-center whitespace-nowrap gap-5 xl:w-5 px-10">
        <Link
          to={`/admin/dashboard/sellers/${sellerId}`}
          state={seller}
          className=" flex py-1 justify-center items-center"
        >
          <IoEyeOutline size={30} color="#4ade80" />
        </Link>
      </td>
    </tr>
  );
}
