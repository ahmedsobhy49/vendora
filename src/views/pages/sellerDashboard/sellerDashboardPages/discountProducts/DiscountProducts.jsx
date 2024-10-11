import React from "react";
import DashboardContainer from "../../../../../common/DashboardContainer";
import TableHeaderContainer from "../../../adminDashboard/gen/TableHeaderContainer";
import SearchInput from "../../../adminDashboard/gen/SearchInput";
import { Link } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import TableBodyContainer from "../../../adminDashboard/gen/TableBodyContainer";
import TableContainer from "../../../adminDashboard/gen/TableContainer";
import products from "../../../../../data/products.json";
import TableHeadContainer from "../../../adminDashboard/gen/TableHeadContainer";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdEditSquare } from "react-icons/md";

export default function DiscountProducts() {
  return (
    <DashboardContainer>
      <div>
        <DiscountProductTableHeader />
      </div>
      <div className="table-custom-hight overflow-auto bg-white hide-scrollbar">
        <TableContainer>
          <DiscountProductTableHead />
          <TableBodyContainer>
            {products.products?.map((product) => {
              return (
                <DiscountProductTableRow
                  product={product}
                  key={product.id}
                  productId={product.id}
                  image={product.image}
                  name={product.name}
                  category={product.category}
                  brand={product.brand}
                  price={product.price}
                  discount={product.discount}
                  stock={product.stock}
                />
              );
            })}
          </TableBodyContainer>
        </TableContainer>
      </div>
    </DashboardContainer>
  );
}

function DiscountProductTableRow({
  productId,
  image,
  name,
  category,
  brand,
  price,
  discount,
  stock,
  product,
}) {
  return (
    <tr className="h-20 text-xs text-gray-700 md:text-sm ">
      <td className="py-3 font-bold text-gray-700 whitespace-nowrap xl:w-5 px-10">
        {productId}
      </td>
      <td className="px-10 py-3 text-center whitespace-nowrap xl:w-5">
        <div className="w-12 mx-auto md:w-16 xl:w-20">
          <img src={image} alt="category" className="w-full aspect-square" />
        </div>
      </td>
      <td className="px-10 py-3 text-center whitespace-nowrap xl:w-5">
        {name}
      </td>
      <td className="px-10 py-3 text-center whitespace-nowrap xl:w-5">
        {category}
      </td>
      <td className="px-10 py-3 text-center whitespace-nowrap xl:w-5">
        {brand}
      </td>
      <td className="px-10 py-3 text-center whitespace-nowrap xl:w-5">
        {price}
      </td>
      <td className="px-10 py-3 text-center whitespace-nowrap xl:w-5">
        {discount}
      </td>
      <td className="px-10 py-3 text-center whitespace-nowrap xl:w-5">
        {stock}
      </td>
      <td className="py-3 text-center whitespace-nowrap  gap-2 flex  justify-center h-28 ">
        <Link
          to={`/admin/dashboard/sellers/${productId}`}
          state={product}
          className=" flex py-1 justify-center items-center"
        >
          <MdEditSquare size={25} color="#ffb900" className="text-center" />
        </Link>
        <Link
          to={`/admin/dashboard/sellers/${productId}`}
          state={product}
          className=" flex py-1 justify-center items-center"
        >
          <RiDeleteBin6Fill size={25} color="#f15313" className="text-center" />
        </Link>
        <Link
          to={`/admin/dashboard/sellers/${productId}`}
          state={product}
          className=" flex py-1  justify-center items-center"
        >
          <IoEyeOutline size={25} color="#4ade80" className="text-center" />
        </Link>
      </td>
    </tr>
  );
}

function DiscountProductTableHead() {
  return (
    <TableHeadContainer>
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
          Category
        </th>
        <th
          scope="col"
          className="px-[2.5rem] py-[0.5rem] text-center sm:pt-[1rem]"
        >
          Brand
        </th>
        <th
          scope="col"
          className="px-[2.5rem] py-[0.5rem] text-center sm:pt-[1rem]"
        >
          Price
        </th>
        <th
          scope="col"
          className="px-[2.5rem] py-[0.5rem] text-center sm:pt-[1rem]"
        >
          Discount
        </th>
        <th
          scope="col"
          className="px-[2.5rem] py-[0.5rem] text-center sm:pt-[1rem]"
        >
          Stock
        </th>
        <th
          scope="col"
          className="px-[2.5rem] py-[0.5rem] text-center sm:pt-[1rem]"
        >
          Action
        </th>
      </tr>
    </TableHeadContainer>
  );
}

function DiscountProductTableHeader() {
  return (
    <TableHeaderContainer>
      <SearchInput placeholder={"search product"} id={"search-product"} />
    </TableHeaderContainer>
  );
}
