import React from "react";
import { Link } from "react-router-dom";

export default function MegaMenu({ subCategoriesState, topBrands }) {
  return (
    <div className=" flex flex-col justify-between px-10 shadow-sm bg-white">
      <ul className="grid grid-cols-5 xl:grid-cols-6 gap-12  min-h-[30rem] max-h-[30rem] overflow-y-auto  hide-scrollbar py-6">
        {subCategoriesState?.map((subCategory) => {
          return (
            <li key={subCategory._id} className="">
              <h3 className="text-[0.9rem] xl:text-[1rem] font-semibold text-gray-600 capitalize mb-4">
                <Link to={`/sub-category/${subCategory._id}`} className="">
                  {subCategory.name}
                </Link>
              </h3>
              <ul className="flex flex-col gap-4">
                {!subCategory.subcategories.length && (
                  <Link className="text-sm xl:text-[0.9rem]">
                    Shop All {subCategory?.name}
                  </Link>
                )}
                {subCategory?.subcategories?.map((subSubCategory) => (
                  <li key={subSubCategory._id}>
                    <Link
                      to={`/sub-sub-category/${subSubCategory._id}`}
                      className="text-sm xl:text-[0.9rem] capitalize hover:text-blue-600"
                    >
                      {subSubCategory.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
      <div className="py-10">
        <h3 className="text-2xl mb-4">Top Brands</h3>
        <ul className="flex items-start gap-6 overflow-y-auto hide-scrollbar">
          {topBrands?.map((brand) => (
            <li
              key={brand._id}
              className="flex flex-col gap-6 justify-center items-center cursor-pointer"
            >
              <div className="w-28 xl:w-32 aspect-square px-10 bg-gray-100 flex justify-center items-center">
                <img
                  className="w-full h-auto responsive-brand-img-scale"
                  src={`http://localhost:8000${brand?.logo}`}
                  alt={brand?.name}
                />
              </div>
              <Link
                to={`/brand/${brand._id}`}
                className="text-sm capitalize hover:text-blue-600 text-gray-600"
              >
                {brand.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
