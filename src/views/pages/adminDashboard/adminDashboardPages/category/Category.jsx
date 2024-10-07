// import React from "react";
// import Input from "../../../../../common/Input";
// import DashboardContainer from "../../../../../common/DashboardContainer";
// import TableContainer from "../../gen/TableContainer";
// import TableBodyContainer from "../../gen/TableBodyContainer";
// import { RiDeleteBin6Fill } from "react-icons/ri";
// import { MdEditSquare } from "react-icons/md";

// const categoryData = [
//   {
//     catId: "1223",
//     catImage:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Sport_balls.svg/1024px-Sport_balls.svg.png",
//     catName: "Sports",
//   },
//   {
//     catId: "1224",
//     catImage:
//       "https://assets.teenvogue.com/photos/63a301b5866c4e693a451a23/master/w_1600%2Cc_limit/EOY_Style_Trendsof2022_Balletcore.png",
//     catName: "Fashion",
//   },
//   {
//     catId: "1225",
//     catImage: "https://globerec.com/wp-content/uploads/2022/10/consumer.jpeg",
//     catName: "Electronics",
//   },
//   {
//     catId: "1223",
//     catImage:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Sport_balls.svg/1024px-Sport_balls.svg.png",
//     catName: "Sports",
//   },
//   {
//     catId: "1224",
//     catImage:
//       "https://assets.teenvogue.com/photos/63a301b5866c4e693a451a23/master/w_1600%2Cc_limit/EOY_Style_Trendsof2022_Balletcore.png",
//     catName: "Fashion",
//   },
//   {
//     catId: "1225",
//     catImage: "https://globerec.com/wp-content/uploads/2022/10/consumer.jpeg",
//     catName: "Electronics",
//   },
// ];

// export default function Category() {
//   return (
//     <DashboardContainer>
//       <div className="h-auto">
//         <div className="w-full h-full bg-slate-100 xl:mt-8">
//           <div className="flex flex-col gap-5 xl:flex-row">
//             {/* Category Table Section */}
//             <div className="h-full xl:w-3/5">
//               <CategoryTableHeader />
//               <div className="h-[25rem] px-5 mb-6 overflow-auto shadow-md bg-white xl:h-[32rem]">
//                 <TableContainer>
//                   <CategoryTableHead />
//                   <TableBodyContainer>
//                     {categoryData.map((category) => (
//                       <CategoryTableRow
//                         key={category.catId}
//                         catId={category.catId}
//                         catImage={category.catImage}
//                         catName={category.catName}
//                       />
//                     ))}
//                   </TableBodyContainer>
//                 </TableContainer>
//               </div>
//             </div>

//             {/* Add Category Form Section */}
//             <AddCategory />
//           </div>
//         </div>
//       </div>
//     </DashboardContainer>
//   );
// }

// function CategoryTableRow({ catId, catImage, catName }) {
//   return (
//     <tr className="h-20 text-xs text-gray-700 md:text-sm">
//       <td className="py-3 font-bold text-gray-700 whitespace-nowrap xl:w-5">
//         {catId}
//       </td>
//       <td className="px-10 py-3 text-center whitespace-nowrap xl:w-5">
//         <div className="w-12 mx-auto md:w-16 xl:w-20">
//           <img src={catImage} alt="category" className="w-full aspect-square" />
//         </div>
//       </td>
//       <td className="px-10 py-3 text-center whitespace-nowrap xl:w-5">
//         {catName}
//       </td>
//       <td className="py-3 text-center whitespace-nowrap gap-5 xl:w-5">
//         <button className="mr-3">
//           <RiDeleteBin6Fill size={25} color="#f15313" />
//         </button>
//         <button>
//           <MdEditSquare size={25} color="#ffb900" />
//         </button>
//       </td>
//     </tr>
//   );
// }

// function CategoryTableHeader() {
//   return (
//     <div className="flex items-center justify-between p-4 shadow-md bg-[#338ffb] lg:px-8">
//       <Input
//         inputClassName="w-[170px] px-3 py-1 outline-none rounded-full sm:w-1/3 sm:py-2 placeholder:text-[0.85rem] lg:placeholder:text-[1rem]"
//         placeholder="Search Category..."
//         id="search-category"
//         name="search-category"
//         type="search"
//       />
//     </div>
//   );
// }

// function CategoryTableHead() {
//   return (
//     <thead className="tracking-tighter text-gray-700 uppercase w-full text-[0.7rem] sm:text-[0.75rem] md:text-[0.77rem] lg:text-sm md:tracking-normal">
//       <tr>
//         <th scope="col" className="py-2 text-start sm:pt-4">
//           ID
//         </th>
//         <th scope="col" className="px-10 py-2 text-center sm:pt-4">
//           Image
//         </th>
//         <th scope="col" className="px-10 py-2 text-center sm:pt-4">
//           Name
//         </th>
//         <th scope="col" className="py-2 text-center sm:pt-4">
//           Action
//         </th>
//       </tr>
//     </thead>
//   );
// }

// function AddCategory() {
//   return (
//     <div className="bg-white shadow-md xl:w-2/5 xl:h-[584px]">
//       <div className="p-4 mb-5 font-bold text-white shadow-md xl:mb-2 text-sm bg-[#338ffb] md:text-lg xl:p-[1.35rem]">
//         <h3 className="text-center">Add New Category</h3>
//       </div>
//       <div className="p-4 mx-auto lg:w-8/12 xl:w-11/12 2xl:w-10/12">
//         <div className="flex flex-col gap-2 mb-3">
//           <Input
//             label="Category Name"
//             labelClassName="font-semibold text-xs sm:text-[0.85rem]"
//             inputClassName="px-2 py-1 border border-gray-200 rounded-md outline-none lg:py-2 xl:py-3"
//           />
//         </div>
//         <div className="w-64 h-64 mx-auto mb-2 lg:w-8/12 xl:w-full xl:h-80 lg:mt-2 lg:mb-6 xl:mb-4 shadow-inner">
//           <img
//             src="https://cdn.pixabay.com/photo/2017/11/10/05/24/add-2935429_960_720.png"
//             alt="category-preview"
//             className="w-full h-full"
//           />
//         </div>
//         <div className="mt-4 text-center lg:mt-2">
//           <button className="w-full px-2 py-1 font-bold text-white bg-blue-400 lg:py-2 xl:py-3">
//             Add
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";
import Input from "../../../../../common/Input";
import DashboardContainer from "../../../../../common/DashboardContainer";
import TableContainer from "../../gen/TableContainer";
import TableBodyContainer from "../../gen/TableBodyContainer";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdEditSquare } from "react-icons/md";

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
];

export default function Category() {
  return (
    <DashboardContainer>
      <div className="h-auto">
        <div className="w-full h-full  xl:mt-8">
          <div className="flex flex-col gap-5 xl:flex-row">
            {/* Category Table Section */}
            <div className="h-full xl:w-3/5">
              <CategoryTableHeader />
              <div className="h-[25rem] p-[1.25rem] mb-[1.5rem] overflow-auto shadow-md bg-white xl:h-[32rem]">
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
    <tr className="xl:h-20 text-xs text-gray-700 md:text-sm">
      <td className="py-3 font-bold text-gray-700 whitespace-nowrap xl:w-5">
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
      <td className="py-3 text-center whitespace-nowrap gap-5 xl:w-5">
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

function CategoryTableHead() {
  return (
    <thead className="tracking-tighter text-gray-700 uppercase w-full text-[0.7rem] sm:text-[0.75rem] md:text-[0.77rem] lg:text-sm md:tracking-normal">
      <tr>
        <th scope="col" className="py-[0.5rem] text-start sm:pt-[1rem]">
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
        <th scope="col" className="py-[0.5rem] text-center sm:pt-[1rem]">
          Action
        </th>
      </tr>
    </thead>
  );
}

function AddCategory() {
  return (
    <div className="bg-white shadow-md xl:w-2/5 xl:h-[584px]">
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
