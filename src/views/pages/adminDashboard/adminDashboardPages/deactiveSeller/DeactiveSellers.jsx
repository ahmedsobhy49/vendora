import React from "react";
import { IoEyeOutline } from "react-icons/io5";
import DashboardContainer from "../../../../../common/DashboardContainer";
import TableBodyContainer from "../../gen/TableBodyContainer";
import TableContainer from "../../gen/TableContainer";
import sellers from "../../../../../data/sellers.json";
import Input from "../../../../../common/Input";
import { Link } from "react-router-dom";

const isThereSellers = Boolean(sellers.sellers?.length);

export default function DeactiveSellers() {
  return (
    <DashboardContainer>
      <div>
        <DeactiveSellersTableHeader />
      </div>
      <div className="h-[49.4rem] overflow-auto px-10 bg-white">
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
    <div className="flex items-center justify-between p-[1rem] shadow-md bg-[#338ffb] lg:px-[2rem]">
      <Input
        inputClassName="w-[170px] sm:w-1/3 lg:w-1/4 xl:w-1/5 py-1 sm:py-2 px-3 outline-none rounded-full placeholder:text-xs placeholder:sm:text-[0.85rem] lg:placeholder:text-[1rem]"
        placeholder="Search Deactive Sellers..."
        id={"search-deactive"}
        name={"search-deactive"}
        type={"search"}
      />
    </div>
  );
}

function DeactiveSellersTableHead() {
  return (
    <thead className="tracking-tighter text-gray-700 uppercase w-full text-[0.7rem] sm:text-[0.75rem] md:text-[0.77rem] lg:text-sm md:tracking-normal">
      <tr>
        <th scope="col" className="py-4 text-center sm:pt-[1rem]">
          ID
        </th>
        <th scope="col" className="px-[2.5rem] py-4 text-center sm:pt-[1rem]">
          Image
        </th>
        <th scope="col" className="px-[2.5rem] py-4 text-center sm:pt-[1rem]">
          Name
        </th>
        <th scope="col" className="px-[2.5rem] py-4 text-center sm:pt-[1rem]">
          Email
        </th>
        <th scope="col" className="px-[2.5rem] py-4 text-center sm:pt-[1rem]">
          Payment Status
        </th>
        <th scope="col" className="px-[2.5rem] py-4 text-center sm:pt-[1rem]">
          Status
        </th>

        <th scope="col" className="py-4 text-center sm:pt-[1rem]">
          Action
        </th>
      </tr>
    </thead>
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
        {email}
      </td>
      <td className="px-[2.5rem] py-[0.75rem] text-center whitespace-nowrap xl:w-5">
        {paymentStatus}
      </td>

      <td className="px-[2.5rem] py-[0.75rem] text-center whitespace-nowrap xl:w-5">
        {status}
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
