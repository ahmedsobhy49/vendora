import React from "react";
import DashboardContainer from "../../../../../common/DashboardContainer";
import TableContainer from "../../gen/TableContainer";
import TableBodyContainer from "../../gen/TableBodyContainer";
import Input from "../../../../../common/Input";

const sellersData = [
  {
    id: 0,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Sport_balls.svg/1024px-Sport_balls.svg.png",
    name: "mohsen",
    shopName: "eltawhed welnoor",
    paymentStatus: "pending",
    email: "mohsen@gmail.com",
    division: "dhaka",
    district: "ultara",
  },
  {
    id: 0,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Sport_balls.svg/1024px-Sport_balls.svg.png",
    name: "mohsen",
    shopName: "eltawhed welnoor",
    paymentStatus: "pending",
    email: "mohsen@gmail.com",
    division: "dhaka",
    district: "ultara",
  },
  {
    id: 0,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Sport_balls.svg/1024px-Sport_balls.svg.png",
    name: "mohsen",
    shopName: "eltawhed welnoor",
    paymentStatus: "pending",
    email: "mohsen@gmail.com",
    division: "dhaka",
    district: "ultara",
  },
  {
    id: 0,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Sport_balls.svg/1024px-Sport_balls.svg.png",
    name: "mohsen",
    shopName: "eltawhed welnoor",
    paymentStatus: "pending",
    email: "mohsen@gmail.com",
    division: "dhaka",
    district: "ultara",
  },
  {
    id: 0,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Sport_balls.svg/1024px-Sport_balls.svg.png",
    name: "mohsen",
    shopName: "eltawhed welnoor",
    paymentStatus: "pending",
    email: "mohsen@gmail.com",
    division: "dhaka",
    district: "ultara",
  },
  {
    id: 0,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Sport_balls.svg/1024px-Sport_balls.svg.png",
    name: "mohsen",
    shopName: "eltawhed welnoor",
    paymentStatus: "pending",
    email: "mohsen@gmail.com",
    division: "dhaka",
    district: "ultara",
  },
  {
    id: 0,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Sport_balls.svg/1024px-Sport_balls.svg.png",
    name: "mohsen",
    shopName: "eltawhed welnoor",
    paymentStatus: "pending",
    email: "mohsen@gmail.com",
    division: "dhaka",
    district: "ultara",
  },
  {
    id: 0,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Sport_balls.svg/1024px-Sport_balls.svg.png",
    name: "mohsen",
    shopName: "eltawhed welnoor",
    paymentStatus: "pending",
    email: "mohsen@gmail.com",
    division: "dhaka",
    district: "ultara",
  },
];
const isThereSellers = Boolean(sellersData?.length);

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
            {sellersData?.map((seller) => {
              return (
                <SellerTableRow
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
        <button>x</button>
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
        </th>{" "}
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
        inputClassName="w-[10.625rem] px-[0.75rem] py-[0.25rem] outline-none rounded-full sm:w-1/3 sm:py-[0.5rem] placeholder:text-[0.85rem] lg:placeholder:text-[1rem]"
        placeholder="Search Category..."
        id="search-category"
        name="search-category"
        type="search"
      />
    </div>
  );
}
