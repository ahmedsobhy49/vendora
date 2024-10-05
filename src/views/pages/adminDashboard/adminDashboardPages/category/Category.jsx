import React from "react";
import Input from "../../../../../common/Input";
import DashboardContainer from "../../../../../common/DashboardContainer";
import TableContainer from "../../gen/TableContainer";
import TableBodyContainer from "../../gen/TableBodyContainer";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdEditSquare } from "react-icons/md";

export default function Category() {
  return (
    <DashboardContainer>
      <div className="grid gird-cols-1 xl:grid-cols-3 gap-5 overflow-hidden">
        {/* grid  */}
        <div className="bg-white xl:col-span-2">
          <CategoryTableHeader />
          <div className="pt-2 px-4 lg:px-8 overflow-auto ">
            <TableContainer>
              <CategoryTableHead />
              <TableBodyContainer>
                <CtegoryTableRow catId={"1"} catImage={""} catName={"sports"} />
                <CtegoryTableRow catId={"1"} catImage={""} catName={"sports"} />
                <CtegoryTableRow catId={"1"} catImage={""} catName={"sports"} />
                <CtegoryTableRow catId={"1"} catImage={""} catName={"sports"} />
                <CtegoryTableRow catId={"1"} catImage={""} catName={"sports"} />
                <CtegoryTableRow catId={"1"} catImage={""} catName={"sports"} />
                <CtegoryTableRow catId={"1"} catImage={""} catName={"sports"} />
              </TableBodyContainer>
            </TableContainer>
          </div>
        </div>
        {/* grid  */}
        <div className="">
          <AddCategory />
        </div>
        {/* grid  */}
      </div>
    </DashboardContainer>
  );
}

function CtegoryTableRow({ catId, catImage, catName }) {
  return (
    <tr className="text-xs md:text-sm text-gray-700 h-20">
      <td className="py-3 whitespace-nowrap font-bold text-gray-700">
        {catId}
      </td>
      <td className="py-3 px-10 whitespace-nowrap text-center">
        <div
          className="w-12  md:w-16 xl:w-20  mx-auto 
        "
        >
          <img
            src="https://img.freepik.com/premium-photo/stylish-man-flat-vector-profile-picture-ai-generated_606187-310.jpg"
            alt="category-image"
            className="w-full  aspect-square"
          />
        </div>
      </td>
      <td className=" py-3 px-10 whitespace-nowrap text-center">{catName}</td>
      <td className=" py-3 text-center whitespace-nowrap  gap-5 ">
        <button className="mr-3">
          <RiDeleteBin6Fill size={25} color="#f15313" />
        </button>
        <button>
          <MdEditSquare size={25} color="#ffb900" />
        </button>
      </td>
    </tr>
  );
}

function CategoryTableHeader() {
  return (
    <div className="flex items-center justify-between p-4 lg:px-8 bg-blue-400">
      <Input
        inputClassName="w-[170px] sm:w-1/3 py-1 sm:py-2 px-3 outline-none rounded-full  placeholder:text-[0.85rem] lg:placeholder:text-[1rem]"
        placeholder="Search Category..."
        id={"search-category"}
        name={"search-category"}
        type={"search"}
      />
    </div>
  );
}

function CategoryTableHead() {
  return (
    <thead className="w-full text-gray-700 text-[0.7rem] sm:text-[0.75rem] md:text-[0.77rem] lg:text-sm tracking-tighter md:tracking-normal uppercase">
      <tr>
        <th scope="col" className="py-2 sm:pt-4 text-start ">
          ID
        </th>
        <th scope="col" className="py-2 sm:pt-4 px-10 text-center">
          Image
        </th>
        <th scope="col" className="py-2 sm:pt-4 px-10 text-center">
          Name
        </th>
        <th scope="col" className="py-2 sm:pt-4  text-center">
          Action
        </th>
      </tr>
    </thead>
  );
}

function AddCategory() {
  return (
    <div className="bg-white  xl:h-auto">
      <div className="mb-5 text-sm md:text-lg font-bold p-5 lg:p-[1.35rem] bg-blue-400 text-white">
        <h3 className="text-center">Add New Category</h3>
      </div>
      <div className="w-11/12 sm:w-8/12 p-4 xl:w-full mx-auto">
        <div className="mb-5 flex flex-col gap-2 ">
          <Input
            label="Category Name"
            labelClassName="font-semibold text-xs sm:text-[0.85rem] "
          />
        </div>

        <div className="w-full h-72 xl:h-80 xl:w-full 2xl:h-[21rem] mb-2 xl:mb-4">
          <img
            src="https://img.freepik.com/premium-photo/stylish-man-flat-vector-profile-picture-ai-generated_606187-310.jpg"
            alt="category-image-preview"
            className="w-full h-full"
          />
        </div>

        <div className="w-full text-center mt-auto">
          <button className="bg-blue-400 w-full text-white py-1 px-2 font-bold">
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
