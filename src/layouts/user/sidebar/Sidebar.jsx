// import React, { useState } from "react";
// import getSubCategoriesByParentId from "../../../services/category/getSubCategoriesByParentId";
// import { useQuery } from "react-query";
// import SidebarLink from "./components/SidebarLink";
// import SidebarHeader from "./components/SidebarHeader";
// import { SlArrowRight } from "react-icons/sl";

// import { IoMdPaper } from "react-icons/io";
import { FcElectronics } from "react-icons/fc";
import { MdLocalGroceryStore } from "react-icons/md";
import { BiHealth } from "react-icons/bi";
import { RiHomeSmileFill } from "react-icons/ri";
import { MdOutlineSportsBasketball } from "react-icons/md";
import { BiSolidBabyCarriage } from "react-icons/bi";
import { MdLocalMovies } from "react-icons/md";
import { GiClothes } from "react-icons/gi";
import { GiClothesline } from "react-icons/gi";
import { GiBabyfootPlayers } from "react-icons/gi";

// import { IoChevronBackOutline } from "react-icons/io5";

// function getCategoryIcon(categoryName, size = 24) {
//   // Default size is 24
//   switch (categoryName) {
//     case "electronics":
//       return <FcElectronics size={size} />;
//     case "grocery":
//       return <MdLocalGroceryStore size={size} />;
//     case "beauty-and-health":
//       return <BiHealth size={size} />;
//     case "home-graden-and-tools":
//       return <RiHomeSmileFill size={size} />;
//     case "sports-and-outdoors":
//       return <MdOutlineSportsBasketball size={size} />;
//     case "baby-and-kids-products":
//       return <BiSolidBabyCarriage size={size} />;
//     case "movies-music-and-books":
//       return <MdLocalMovies size={size} />;
//     case "mens-fashion":
//       return <GiClothes size={size} />;
//     case "womens-fashion":
//       return <GiClothesline size={size} />;
//     case "kids-fashion":
//       return <GiBabyfootPlayers size={size} />;
//     default:
//       return null; // Default icon with size
//   }
// }

// export default function Sidebar({
//   isSidebarOpen,
//   parentCategoriesState,
//   subCategoriesState,
//   setSubCategoriesState,
//   selectedParentId,
//   setSelectedParentId,
// }) {
//   useQuery(
//     ["subCategories", selectedParentId],
//     () => getSubCategoriesByParentId(selectedParentId),
//     {
//       enabled: !!selectedParentId, // Only run if selectedParentId is valid
//       onSuccess: (fetchedData) => {
//         console.log("fetchedData", fetchedData);
//         setSubCategoriesState(fetchedData.data.categories || []);
//       },
//     }
//   );

//   function handleSidebarLinkCLick(id) {
//     setSelectedParentId(id);
//   }

//   return (
//     <div
//       className={`min-h-screen max-h-screen overflow-y-auto hide-scrollbar shadow-2xl w-3/4 sm:w-2/3 md:w-1/2 py-10 px-4 bg-gray-100 transition-all duration-200 ease-in  absolute top-0 z-10 lg:hidden ${
//         isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//       }`}
//     >
//       <ul
//         className={`flex flex-col gap-10

//            `}
//       >
//         {selectedParentId && (
//           <div
//             className="flex items-center gap-2 text-gray-700"
//             onClick={() => setSelectedParentId(null)}
//           >
//             <IoChevronBackOutline size={20} />
//             <span className="text-xl">Back</span>
//           </div>
//         )}
//         <SidebarHeader />
//         {!selectedParentId ? (
//           <ul className=" flex flex-col divide-y-2">
//             {parentCategoriesState.map((parentCategory) => {
//               return (
//                 <SidebarLink
//                   key={parentCategory._id}
//                   onClick={() => handleSidebarLinkCLick(parentCategory._id)}
//                 >
//                   <div className="flex items-center gap-4">
//                     {getCategoryIcon(parentCategory.slug)}
//                     <p>{parentCategory.name}</p>
//                   </div>
//                   <SlArrowRight />
//                 </SidebarLink>
//               );
//             })}
//           </ul>
//         ) : (
//           <ul className=" flex flex-col divide-y-2">
//             {subCategoriesState.map((subCateogry) => {
//               return (
//                 <SidebarLink key={subCateogry._id}>
//                   <p>{subCateogry.name}</p>

//                   {subCateogry?.subcategories?.length ? <SlArrowRight /> : null}
//                 </SidebarLink>
//               );
//             })}
//           </ul>
//         )}
//       </ul>
//     </div>
//   );
// }

import React, { useState } from "react";
import getSubCategoriesByParentId from "../../../services/category/getSubCategoriesByParentId";
import { useQuery } from "react-query";
import SidebarLink from "./components/SidebarLink";
import SidebarHeader from "./components/SidebarHeader";
import { SlArrowRight } from "react-icons/sl";
import { IoChevronBackOutline } from "react-icons/io5";

function getCategoryIcon(categoryName, size = 24) {
  switch (categoryName) {
    case "electronics":
      return <FcElectronics size={size} />;
    case "grocery":
      return <MdLocalGroceryStore size={size} />;
    case "beauty-and-health":
      return <BiHealth size={size} />;
    case "home-graden-and-tools":
      return <RiHomeSmileFill size={size} />;
    case "sports-and-outdoors":
      return <MdOutlineSportsBasketball size={size} />;
    case "baby-and-kids-products":
      return <BiSolidBabyCarriage size={size} />;
    case "movies-music-and-books":
      return <MdLocalMovies size={size} />;
    case "mens-fashion":
      return <GiClothes size={size} />;
    case "womens-fashion":
      return <GiClothesline size={size} />;
    case "kids-fashion":
      return <GiBabyfootPlayers size={size} />;
    default:
      return null;
  }
}

export default function Sidebar({
  isSidebarOpen,
  parentCategoriesState,
  subCategoriesState,
  setSubCategoriesState,
  selectedParentId,
  setSelectedParentId,
}) {
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  // Fetch subcategories for the selected parent category
  useQuery(
    ["subCategories", selectedParentId],
    () => getSubCategoriesByParentId(selectedParentId),
    {
      enabled: !!selectedParentId,
      onSuccess: (fetchedData) => {
        setSubCategoriesState(fetchedData.data.categories || []);
      },
    }
  );

  // Handle clicking a parent category to show its subcategories
  function handleSidebarLinkClick(id) {
    setSelectedParentId(id);
    setSelectedSubCategory(null); // Reset selected subcategory
  }

  // Handle clicking a subcategory to show its sub-subcategories
  function handleSubCategoryClick(subCategory) {
    setSelectedSubCategory(subCategory);
  }

  return (
    <div
      className={`min-h-screen max-h-screen overflow-y-auto hide-scrollbar shadow-2xl w-3/4 sm:w-2/3 md:w-1/2 py-10 px-4 bg-gray-100 transition-all duration-200 ease-in absolute top-0 z-10 lg:hidden ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <ul className="flex flex-col gap-10">
        {/* Back button */}
        {(selectedParentId || selectedSubCategory) && (
          <div
            className="flex items-center gap-2 text-gray-700 cursor-pointer"
            onClick={() => {
              if (selectedSubCategory) {
                setSelectedSubCategory(null); // Go back to subcategories
              } else {
                setSelectedParentId(null); // Go back to main categories
              }
            }}
          >
            <IoChevronBackOutline size={20} />
            <span className="text-xl">Back</span>
          </div>
        )}
        <SidebarHeader />

        {/* Main categories */}
        {!selectedParentId ? (
          <ul className="flex flex-col divide-y-2">
            {parentCategoriesState.map((parentCategory) => (
              <SidebarLink
                key={parentCategory._id}
                onClick={() => handleSidebarLinkClick(parentCategory._id)}
              >
                <div className="flex items-center gap-4">
                  {getCategoryIcon(parentCategory.slug)}
                  <p>{parentCategory.name}</p>
                </div>
                <SlArrowRight />
              </SidebarLink>
            ))}
          </ul>
        ) : selectedSubCategory ? (
          // Display sub-subcategories
          <ul className="flex flex-col divide-y-2">
            {selectedSubCategory.subcategories.map((subSubCategory) => (
              <SidebarLink key={subSubCategory._id}>
                <p>{subSubCategory.name}</p>
              </SidebarLink>
            ))}
          </ul>
        ) : (
          // Display subcategories
          <ul className="flex flex-col divide-y-2">
            {subCategoriesState.map((subCategory) => (
              <SidebarLink
                key={subCategory._id}
                onClick={() => handleSubCategoryClick(subCategory)}
              >
                <div className="flex justify-between items-center w-full">
                  <p>{subCategory.name}</p>
                  {subCategory.subcategories?.length ? <SlArrowRight /> : null}
                </div>
              </SidebarLink>
            ))}
          </ul>
        )}
      </ul>
    </div>
  );
}
