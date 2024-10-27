import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardContainer from "../../../../../common/DashboardContainer";
import api from "../../../../../api/api";
import { AddSubcategoryModal } from "./AddSubcategoryModal";

export default function CategoriesInfo() {
  const category = useLocation().state;
  const [parentCategory, setParentCategory] = useState(category);
  const [categoryTree, setCategoryTree] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  async function getCategoriesByParentId(parentId) {
    const res = await api.get(`/categories/parent/${parentId}`);
    const categories = res.data?.categories || [];

    const categoryPromises = categories.map(async (cat) => {
      const subcategories = await getCategoriesByParentId(cat._id);
      return { id: cat._id, label: cat.name, ...cat, subcategories };
    });

    return Promise.all(categoryPromises);
  }

  useEffect(() => {
    async function fetchCategories() {
      const categories = await getCategoriesByParentId(parentCategory._id);
      setCategoryTree(categories)
    }
    fetchCategories();
  }, [parentCategory]);




useEffect(()=> {
  setParentCategory(category)
},[category])



  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  return (
    <DashboardContainer>
      <div className="relative flex gap-4 flex-col lg:flex-row mx-8 md:m-0">
        <div className="flex-1 rounded-lg bg-white ">
          <div className="p-6">
            <h5 className="text-xl text-gray-700 mb-6 font-sans font-semibold leading-snug tracking-normal text-inherit antialiased">
              Categories and Subcategories Overview for {category.name}
            </h5>
            <CategoryList
              categories={categoryTree}
              onCategoryClick={handleCategoryClick}
              parentCategory={parentCategory}
            />
          </div>
        </div>
      </div>
      <AddSubcategoryModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        category={selectedCategory}
        parentId={category._id} // Pass the parent ID to the modal
      />
    </DashboardContainer>
  );
}

const CategoryList = ({ categories, onCategoryClick, parentCategory }) => {
  return (
    <table className="min-w-full border-collapse border border-gray-300 shadow-md rounded-lg overflow-hidden">
      <thead className="bg-gray-200">
        <tr>
          <th className="border border-gray-300 p-4 text-left text-gray-700 font-semibold">
            Parent Category
          </th>
          <th className="border border-gray-300 p-4 text-left text-gray-700 font-semibold">
            Category
          </th>
          <th className="border border-gray-300 p-4 text-left text-gray-700 font-semibold">
            Subcategories
          </th>
        </tr>
      </thead>
      <tbody>
        {/* Always display the parent category */}
        <tr>
          <td
            rowSpan={categories.length > 0 ? categories.length : 1} // Adjust row span based on child categories
            className="border border-gray-300 p-4"
          >
            <button
              onClick={() => onCategoryClick(parentCategory)}
              className="font-medium text-gray-800 hover:text-blue-600 transition duration-200"
            >
              {parentCategory?.name}
            </button>
          </td>
          {/* Display the first category or a placeholder if none exist */}
          {categories.length > 0 ? (
            <>
              <td className="border border-gray-300 p-4">
                <button
                  onClick={() => onCategoryClick(categories[0])}
                  className="font-medium text-gray-800 hover:text-blue-600 transition duration-200"
                >
                  {categories[0].name}
                </button>
              </td>
              <td className="border border-gray-300 p-4">
                {categories[0].subcategories &&
                categories[0].subcategories.length > 0 ? (
                  <ul className="list-disc list-inside space-y-1">
                    {categories[0].subcategories.map((subcategory) => (
                      <li className="text-gray-600" key={subcategory.id}>
                        {subcategory.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-gray-500">No subcategories</span>
                )}
              </td>
            </>
          ) : (
            <>
              <td
                className="border border-gray-300 p-4 text-center"
                colSpan={2}
              >
                <span className="text-gray-500">No categories available</span>
              </td>
            </>
          )}
        </tr>
        {/* Display remaining categories if they exist */}
        {categories.slice(1).map((category) => (
          <tr
            key={category.id}
            className="hover:bg-gray-50 transition duration-200"
          >
            <td className="border border-gray-300 p-4">
              <button
                onClick={() => onCategoryClick(category)}
                className="font-medium text-gray-800 hover:text-blue-600 transition duration-200"
              >
                {category.name}
              </button>
            </td>
            <td className="border border-gray-300 p-4">
              {category.subcategories && category.subcategories.length > 0 ? (
                <ul className="list-disc list-inside space-y-1">
                  {category.subcategories.map((subcategory) => (
                    <li className="text-gray-600" key={subcategory.id}>
                      {subcategory.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="text-gray-500">No subcategories</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
