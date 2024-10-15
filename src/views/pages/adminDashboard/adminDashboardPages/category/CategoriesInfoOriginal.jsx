import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Formik, Form, Field, FieldArray } from "formik";
import DashboardContainer from "../../../../../common/DashboardContainer";
import api from "../../../../../api/api";
import { AddSubcategoryModal } from "./AddSubcategoryModal";

export default function CategoriesInfo() {
  const category = useLocation().state;
  console.log(category);
  const [categoryTree, setCategoryTree] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch categories by parent ID and populate the tree structure
  async function getCategoriesByParentId(parentId) {
    const res = await api.get(`/category/get-by-parent/${parentId}`);
    const categories = res.data?.categories || [];

    const categoryPromises = categories.map(async (cat) => {
      const subcategories = await getCategoriesByParentId(cat._id); // Recursive call
      return { id: cat._id, label: cat.name, ...cat, subcategories }; // Add `label` here
    });

    return Promise.all(categoryPromises);
  }

  useEffect(() => {
    async function fetchCategories() {
      const categories = await getCategoriesByParentId(category._id);
      setCategoryTree(categories);
    }
    fetchCategories();
  }, [category]);

  async function handleSubmit(values) {
    console.log(values);

    try {
      // Create the parent category
      const firstRes = await api.post("/category/add/category", {
        name: values.categoryName,
        parentCategoryId: category._id,
      });

      const newID = firstRes.data.category._id; // Assuming this is the created category's ID
      console.log("Parent Category Created:", firstRes.data);

      // Loop over subcategories and create each one
      for (let i = 0; i < values.subCategories.length; i++) {
        const subCategoryName = values.subCategories[i].name; // Extract the subcategory name
        const secondRes = await api.post("/category/add/category", {
          name: subCategoryName,
          parentCategoryId: newID, // The newly created parent category ID
        });

        console.log("Sub Category Created:", secondRes.data);
      }
    } catch (error) {
      console.error("Error while creating categories:", error);
    }
  }
  // Function to handle category click
  const handleCategoryClick = (category) => {
    setSelectedCategory(category); // Set the selected category
    setIsModalOpen(true); // Open the modal
  };

  // Function to close the modal
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedCategory(null); // Reset selected category when closing the modal
  };

  return (
    // <DashboardContainer>
    //   <div className="relative flex gap-4 flex-col lg:flex-row mx-8 md:m-0">
    //     <div className="flex-1 rounded-lg bg-white ">
    //       <div className="">
    //         <div className="p-6 ">
    //           <h5 className="text-xl text-gray-700 mb-6 font-sans font-semibold leading-snug tracking-normal text-inherit antialiased">
    //             Child Categories and Subcategories Overview for {category.name}
    //           </h5>
    //           <CategoryList
    //             categories={categoryTree}
    //             onCategoryClick={handleCategoryClick}
    //           />
    //         </div>
    //       </div>
    //     </div>

    //     <div className="flex-1 p-6 rounded-lg bg-white">
    //       <h5 className="text-xl font-bold text-gray-700">
    //         Add {category.name} Child Categories
    //       </h5>
    //       <div className="flex items-center gap-10 p-5 border-b rounded-t">
    //         <div className="w-1/12">
    //           <img
    //             src={`http://localhost:8000${category.image}`}
    //             alt=""
    //             className="w-full rounded-full aspect-square"
    //           />
    //         </div>
    //         <div>
    //           <h3 className="font-extrabold text-2xl">{category.name}</h3>
    //         </div>
    //       </div>

    //       <div className="mt-4 space-y-6">
    //         <Formik
    //           initialValues={{
    //             categoryName: "",
    //             subCategories: [{ name: "" }],
    //           }}
    //           onSubmit={(values) => {
    //             handleSubmit(values);
    //           }}
    //         >
    //           {({ values }) => (
    //             <Form>
    //               <div className="grid grid-cols-12 grid-rows-1 gap-6 mb-4">
    //                 <div className="col-span-6">
    //                   <label
    //                     htmlFor="category-name"
    //                     className="text-sm font-medium text-gray-900 block mb-2"
    //                   >
    //                     Category Name
    //                   </label>
    //                   <Field
    //                     type="text"
    //                     name="categoryName"
    //                     id="category-name"
    //                     className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
    //                     placeholder="men's fashion"
    //                   />
    //                 </div>
    //               </div>

    //               <FieldArray name="subCategories">
    //                 {({ insert, remove }) => (
    //                   <>
    //                     {values.subCategories.length > 0 &&
    //                       values.subCategories.map((_, index) => (
    //                         <div
    //                           key={index}
    //                           className="grid grid-cols-12 gap-6 mb-4 items-center"
    //                         >
    //                           <div className="col-span-6">
    //                             <label
    //                               htmlFor={`subCategories.${index}.name`}
    //                               className="text-sm font-medium text-gray-900 block mb-2"
    //                             >
    //                               Sub Category Name
    //                             </label>
    //                             <Field
    //                               type="text"
    //                               name={`subCategories.${index}.name`}
    //                               id={`subCategories.${index}.name`}
    //                               className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
    //                               placeholder="Pants"
    //                             />
    //                           </div>

    //                           <div className="col-span-12 text-end">
    //                             {index !== 0 && (
    //                               <button
    //                                 type="button"
    //                                 className="text-red-600"
    //                                 onClick={() => remove(index)}
    //                               >
    //                                 Remove
    //                               </button>
    //                             )}
    //                           </div>
    //                         </div>
    //                       ))}
    //                     <div className="flex justify-end my-4">
    //                       <button
    //                         type="button"
    //                         className="bg-green-600 font-bold text-white px-4 py-2 rounded-lg"
    //                         onClick={() =>
    //                           insert(values.subCategories.length, {
    //                             name: "",
    //                           })
    //                         }
    //                       >
    //                         Add More Sub Category
    //                       </button>
    //                     </div>
    //                   </>
    //                 )}
    //               </FieldArray>

    //               <div className="pt-6 border-t border-gray-200 rounded-b">
    //                 <button
    //                   className="text-white bg-black font-medium rounded-lg text-sm px-5 py-2.5 text-center"
    //                   type="submit"
    //                 >
    //                   Save all
    //                 </button>
    //               </div>
    //             </Form>
    //           )}
    //         </Formik>
    //       </div>
    //     </div>
    //   </div>
    //   <AddSubcategoryModal
    //     isOpen={isModalOpen}
    //     onClose={handleModalClose}
    //     category={selectedCategory} // Pass the selected category to the modal
    //   />
    // </DashboardContainer>
    <DashboardContainer>
      <div className="relative flex gap-4 flex-col lg:flex-row mx-8 md:m-0">
        <div className="flex-1 rounded-lg bg-white ">
          <div className="p-6">
            <h5 className="text-xl text-gray-700 mb-6 font-sans font-semibold leading-snug tracking-normal text-inherit antialiased">
              Child Categories and Subcategories Overview for {category.name}
            </h5>
            <CategoryList
              categories={categoryTree}
              onCategoryClick={handleCategoryClick}
              parentCategory={category}
            />
          </div>
        </div>

        <div className="flex-1 p-6 rounded-lg bg-white">
          <h5 className="text-xl font-bold text-gray-700">
            Add {category.name} Child Categories
          </h5>
          <div className="flex items-center gap-10 p-5 border-b rounded-t">
            <div className="w-1/12">
              <img
                src={`http://localhost:8000${category.image}`}
                alt=""
                className="w-full rounded-full aspect-square"
              />
            </div>
            <div>
              <h3 className="font-extrabold text-2xl">{category.name}</h3>
            </div>
          </div>

          <div className="mt-4 space-y-6">
            <Formik
              initialValues={{
                categoryName: "",
                subCategories: [{ name: "" }],
              }}
              onSubmit={(values) => {
                handleSubmit(values);
              }}
            >
              {({ values }) => (
                <Form>
                  <div className="grid grid-cols-12 grid-rows-1 gap-6 mb-4">
                    <div className="col-span-6">
                      <label
                        htmlFor="category-name"
                        className="text-sm font-medium text-gray-900 block mb-2"
                      >
                        Category Name
                      </label>
                      <Field
                        type="text"
                        name="categoryName"
                        id="category-name"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        placeholder="men's fashion"
                      />
                    </div>
                  </div>

                  <FieldArray name="subCategories">
                    {({ insert, remove }) => (
                      <>
                        {values.subCategories.length > 0 &&
                          values.subCategories.map((_, index) => (
                            <div
                              key={index}
                              className="grid grid-cols-12 gap-6 mb-4 items-center"
                            >
                              <div className="col-span-6">
                                <label
                                  htmlFor={`subCategories.${index}.name`}
                                  className="text-sm font-medium text-gray-900 block mb-2"
                                >
                                  Sub Category Name
                                </label>
                                <Field
                                  type="text"
                                  name={`subCategories.${index}.name`}
                                  id={`subCategories.${index}.name`}
                                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                  placeholder="Pants"
                                />
                              </div>

                              <div className="col-span-12 text-end">
                                {index !== 0 && (
                                  <button
                                    type="button"
                                    className="text-red-600"
                                    onClick={() => remove(index)}
                                  >
                                    Remove
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        <div className="flex justify-end my-4">
                          <button
                            type="button"
                            className="bg-green-600 font-bold text-white px-4 py-2 rounded-lg"
                            onClick={() =>
                              insert(values.subCategories.length, {
                                name: "",
                              })
                            }
                          >
                            Add More Sub Category
                          </button>
                        </div>
                      </>
                    )}
                  </FieldArray>

                  <div className="pt-6 border-t border-gray-200 rounded-b">
                    <button
                      className="text-white bg-black font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      type="submit"
                    >
                      Save all
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <AddSubcategoryModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        category={selectedCategory} // Pass the selected category to the modal
      />
    </DashboardContainer>
  );
}

// const CategoryList = ({ categories, onCategoryClick, parentCategory }) => {
//   return (
//     <table className="min-w-full border-collapse border border-gray-200">
//       <thead>
//         <tr>
//           <th className="border border-gray-300 p-2 text-left">Category</th>
//           <th className="border border-gray-300 p-2 text-left">
//             Subcategories
//           </th>
//           <th className="border border-gray-300 p-2 text-left">
//             Parent Category
//           </th>

//         </tr>
//       </thead>
//       <tbody>
//         {categories.map((category) => (
//           <React.Fragment key={category.id}>
//             <tr className="hover:bg-gray-100 transition-colors duration-200">
//               <td className="border border-gray-300 p-2">
//                 <button
//                   onClick={() => onCategoryClick(category)} // Trigger the click handler
//                   className="font-medium text-gray-800 hover:underline"
//                 >
//                   {category.label}
//                 </button>
//               </td>
//               <td className="border border-gray-300 p-2">
//                 {category.subcategories && category.subcategories.length > 0 ? (
//                   <ul className="list-disc ml-4">
//                     {category.subcategories.map((sub) => (
//                       <li key={sub.id}>
//                         <button
//                           onClick={() => onCategoryClick(sub)} // Optional: Click to handle subcategories as well
//                           className="font-medium text-gray-700 hover:underline"
//                         >
//                           {sub.label}
//                         </button>
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <span className="text-gray-500">No subcategories</span>
//                 )}
//               </td>
//               <td className="border border-gray-300 p-2">
//                 {parentCategory ? (
//                   <span className="font-medium text-gray-800">
//                     {parentCategory.name}
//                   </span>
//                 ) : (
//                   <span className="text-gray-500">No Parent Category</span>
//                 )}
//               </td>
//             </tr>
//           </React.Fragment>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// const CategoryList = ({ categories, onCategoryClick }) => {
//   return (
//     <table className="min-w-full border-collapse border border-gray-200">
//       <thead>
//         <tr>
//           <th className="border border-gray-300 p-2 text-left">Category</th>
//           <th className="border border-gray-300 p-2 text-left">
//             Subcategories
//           </th>
//         </tr>
//       </thead>
//       <tbody>
//         {categories.map((category) => (
//           <React.Fragment key={category.id}>
//             <tr className="hover:bg-gray-100 transition-colors duration-200">
//               <td className="border border-gray-300 p-2">
//                 <button
//                   onClick={() => onCategoryClick(category)} // Trigger the click handler
//                   className="font-medium text-gray-800 hover:underline"
//                 >
//                   {category.label}
//                 </button>
//               </td>
//               <td className="border border-gray-300 p-2">
//                 {category.subcategories && category.subcategories.length > 0 ? (
//                   <ul className="list-disc ml-4">
//                     {category.subcategories.map((sub) => (
//                       <li key={sub.id}>
//                         <button
//                           onClick={() => onCategoryClick(sub)} // Optional: Click to handle subcategories as well
//                           className="font-medium text-gray-700 hover:underline"
//                         >
//                           {sub.label}
//                         </button>
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <span className="text-gray-500">No subcategories</span>
//                 )}
//               </td>
//             </tr>
//           </React.Fragment>
//         ))}
//       </tbody>
//     </table>
//   );
// };

const CategoryList = ({ categories, onCategoryClick }) => {
  return (
    <table className="min-w-full border-collapse border border-gray-200">
      <thead>
        <tr>
          <th className="border border-gray-300 p-2 text-left">Category</th>
          <th className="border border-gray-300 p-2 text-left">
            Subcategories
          </th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => (
          <tr
            key={category.id}
            className="hover:bg-gray-100 transition-colors duration-200"
          >
            <td className="border border-gray-300 p-2">
              <button
                onClick={() => onCategoryClick(category)} // Trigger the click handler
                className="font-medium text-gray-800 hover:underline"
              >
                {category.label}
              </button>
            </td>
            <td className="border border-gray-300 p-2">
              {category.subcategories && category.subcategories.length > 0 ? (
                <CategoryList
                  categories={category.subcategories}
                  onCategoryClick={onCategoryClick} // Pass the handler to subcategories
                />
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
