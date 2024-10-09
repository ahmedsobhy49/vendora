import React from "react";
import Input from "../../../../../common/Input";
import DashboardContainer from "../../../../../common/DashboardContainer";
import TableContainer from "../../gen/TableContainer";
import TableBodyContainer from "../../gen/TableBodyContainer";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdEditSquare } from "react-icons/md";
import TableHeaderContainer from "../../gen/TableHeaderContainer";
import SearchInput from "../../gen/SearchInput";
import TableHeadContainer from "../../gen/TableHeadContainer";

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
  {
    catId: "1225",
    catImage: "https://globerec.com/wp-content/uploads/2022/10/consumer.jpeg",
    catName: "Electronics",
  },
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
  {
    catId: "1225",
    catImage: "https://globerec.com/wp-content/uploads/2022/10/consumer.jpeg",
    catName: "Electronics",
  },
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
  {
    catId: "1225",
    catImage: "https://globerec.com/wp-content/uploads/2022/10/consumer.jpeg",
    catName: "Electronics",
  },
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
  {
    catId: "1225",
    catImage: "https://globerec.com/wp-content/uploads/2022/10/consumer.jpeg",
    catName: "Electronics",
  },
];

export default function Category() {
  return (
    <DashboardContainer>
      <div className="h-auto">
        <div className="w-full h-full  ">
          <div className="flex flex-col gap-5 xl:flex-row ">
            {/* Category Table Section */}
            <div className="h-full xl:w-3/5 ">
              <CategoryTableHeader />
              <div className="table-custom-hight overflow-auto pt-2 shadow-md bg-white hide-scrollbar">
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
            </div>

            {/* Add Category Form Section */}
            <AddCategory />
          </div>
        </div>
      </div>
    </DashboardContainer>
  );
}

function CategoryTableRow({ catId, catImage, catName }) {
  return (
    <tr className="xl:h-16 text-xs text-gray-700 md:text-sm even:bg-slate-100">
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
        <th scope="col" className="py-2 text-center ">
          Action
        </th>
      </tr>
    </TableHeadContainer>
  );
}

function AddCategory() {
  return (
    <div className="bg-white shadow-md xl:w-2/5 ">
      <div className="p-[1rem] mb-[1.25rem] font-bold text-white shadow-md xl:mb-[0.5rem] text-sm bg-[#338ffb] md:text-lg xl:p-[1.35rem]">
        <h3 className="text-center">Add New Category</h3>
      </div>
      <div className="p-[1rem] mx-auto lg:w-8/12 xl:w-11/12 2xl:w-10/12">
        <div className="flex flex-col gap-[0.5rem] mb-[0.75rem]">
          <Input
            label="Category Name"
            labelClassName="font-semibold text-xs sm:text-[0.85rem]"
            inputClassName="px-[0.5rem] py-[0.25rem] border border-gray-200 rounded-md outline-none lg:py-[0.5rem] xl:py-[0.75rem]"
          />
        </div>
        <div className="w-64 h-64 mx-auto mb-[0.5rem] lg:w-8/12 xl:w-full xl:h-80 lg:mt-[0.5rem] lg:mb-[1.5rem] xl:mb-[1rem] shadow-inner">
          <img
            src="https://cdn.pixabay.com/photo/2017/11/10/05/24/add-2935429_960_720.png"
            alt="category-preview"
            className="w-full h-full"
          />
        </div>
        <div className="mt-[1rem] text-center lg:mt-[0.5rem]">
          <button className="w-full px-[0.5rem] py-[0.25rem] font-bold text-white bg-blue-400 lg:py-[0.5rem] xl:py-[0.75rem]">
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
