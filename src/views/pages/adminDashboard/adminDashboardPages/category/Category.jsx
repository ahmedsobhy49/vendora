import React from "react";
import DashboardContainer from "../../../../../common/DashboardContainer";
import TableContainer from "../../gen/TableContainer";
import TableBodyContainer from "../../gen/TableBodyContainer";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdEditSquare } from "react-icons/md";
import TableHeaderContainer from "../../gen/TableHeaderContainer";
import SearchInput from "../../gen/SearchInput";
import TableHeadContainer from "../../gen/TableHeadContainer";
import { LuUploadCloud } from "react-icons/lu";

const categoryData = [
  {
    catId: "1223",
    catImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Sport_balls.svg/1024px-Sport_balls.svg.png",
    catName: "Sports",
  },
  {
    catId: "1224",
    catImage:
      "https://assets.teenvogue.com/photos/63a301b5866c4e693a451a23/master/w_1600%2Cc_limit/EOY_Style_Trendsof2022_Balletcore.png",
    catName: "Fashion",
  },
];

export default function Category() {
  return (
    <DashboardContainer>
      <div className="h-auto">
        <div className="w-full h-full">
          <div className="flex flex-col gap-5 xl:flex-row ">
            <div className="h-full xl:w-3/5 ">
              <CategoryTableHeader />
              <CategoryTable />
            </div>
            <CategoryForm />
          </div>
        </div>
      </div>
    </DashboardContainer>
  );
}

function CategoryForm() {
  return (
    <div className="bg-white shadow-md xl:w-2/5 ">
      <form className="w-full h-full bg-white shadow-md p-6">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-full px-3 mb-6">
            <label
              className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
              htmlFor="category_name"
            >
              Category Name
            </label>
            <input
              className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#338ffb]"
              type="text"
              name="name"
              placeholder="Category Name"
              required
            />
          </div>

          <div className="w-full px-3 mb-8">
            <label
              className="mx-auto cursor-pointer flex w-full  flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#338ffb] bg-white p-6 lg:py-36 text-center"
              htmlFor="dropzone-file"
            >
              <LuUploadCloud size={50} color="#338ffb" />

              <h2 className="mt-4 text-xl font-medium text-gray-700 tracking-wide">
                Category image
              </h2>

              <p className="mt-2 text-gray-500 tracking-wide">
                Upload or drag & drop your file SVG, PNG, JPG or GIF.
              </p>

              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                name="category_image"
                accept="image/png, image/jpeg, image/webp"
              />
            </label>
          </div>
          <div className="w-full md:w-full px-3 mb-6">
            <button className="appearance-none block w-full bg-[#338ffb] text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-blue-600 focus:outline-none focus:bg-white focus:border-gray-500">
              Add Category
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function CategoryTableRow({ catId, catImage, catName }) {
  return (
    <tr className="xl:h-16 text-xs text-gray-700 md:text-sm ">
      <td className="py-3 font-bold text-gray-700 whitespace-nowrap xl:w-5 text-center px-2">
        {catId}
      </td>
      <td className="px-[2.5rem] py-[0.75rem] text-center whitespace-nowrap xl:w-5">
        <div className="w-12 mx-auto md:w-16 xl:w-20">
          <img src={catImage} alt="category" className="w-full aspect-square" />
        </div>
      </td>
      <td className="px-[2.5rem] py-[0.75rem] text-center whitespace-nowrap xl:w-5">
        {catName}
      </td>
      <td className="py-3 text-center whitespace-nowrap gap-5 xl:w-5 px-2">
        <button className="mr-[0.75rem]">
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
    <TableHeaderContainer>
      <SearchInput placeholder={"search category"} id={"search-category"} />
    </TableHeaderContainer>
  );
}

function CategoryTableHead() {
  return (
    <TableHeadContainer>
      <tr>
        <th scope="col" className="py-2 text-center">
          ID
        </th>
        <th scope="col" className="px-10 py-2 text-center ">
          Image
        </th>
        <th scope="col" className="px-10 py-2 text-center">
          Name
        </th>
        <th scope="col" className="py-2 text-center">
          Action
        </th>
      </tr>
    </TableHeadContainer>
  );
}

function CategoryTable() {
  return (
    <div className="xl:min-h-[40rem] max-h-[30rem] xl:max-h-[49rem] overflow-auto pt-2 shadow-md bg-white hide-scrollbar">
      <TableContainer>
        <CategoryTableHead />
        <TableBodyContainer>
          {categoryData.map((category) => (
            <CategoryTableRow
              key={category.catId}
              catId={category.catId}
              catImage={category.catImage}
              catName={category.catName}
            />
          ))}
        </TableBodyContainer>
      </TableContainer>
    </div>
  );
}
