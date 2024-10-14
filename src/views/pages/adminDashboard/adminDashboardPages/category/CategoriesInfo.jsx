// import React, { useState } from "react";
// import { IoChevronDown } from "react-icons/io5";
// import DashboardContainer from "../../../../../common/DashboardContainer";
// import { useLocation } from "react-router-dom";
// import { Formik, Form, Field, FieldArray } from "formik";
// import Box from "@mui/material/Box";
// import { categories as originalCategories } from "../../../../../data/categories.json";
// import { subCategories as originalSubCategories } from "../../../../../data/subCategories.json";
// import { styled, alpha } from "@mui/material/styles";
// import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
// import { TreeItem, treeItemClasses } from "@mui/x-tree-view/TreeItem";

// export default function CategoriesInfo() {
//   const parentCategory = useLocation().state;
//   const categories = originalCategories.filter((category) => {
//     return category.parentcategoryid === parentCategory.id;
//   });

//   function getSubCategories(categoryId) {
//     const categoryToFind = categories.find(
//       (category) => category._id === categoryId
//     )?.subcategoriesid;

//     return categoryToFind
//       ? originalSubCategories.filter((sub) => categoryToFind.includes(sub._id))
//       : [];
//   }

//   const genderOptions = [
//     { value: "men", label: "Men" },
//     { value: "women", label: "Women" },
//     { value: "bisex", label: "Bisexual" },
//   ];

//   return (
//     <DashboardContainer>
//       <div className="bg-white rounded-lg shadow relative m-10 p-6">
//         <h2 className="text-2xl font-bold mb-4">Add Child Categories</h2>
//         <div className="flex items-center gap-10 p-5 border-b rounded-t">
//           <div className="w-1/12">
//             <img
//               src={parentCategory.image}
//               alt=""
//               className="w-full rounded-full aspect-square"
//             />
//           </div>
//           <div>
//             <h3 className="font-extrabold text-2xl">{parentCategory.name}</h3>
//           </div>
//         </div>

//         <div className="p-6 space-y-6">
//           <Formik
//             initialValues={{
//               categoryName: "", // Category Name
//               subCategories: [{ name: "", gender: "" }],
//             }}
//             onSubmit={(values) => {
//               console.log("Form values", values);
//               // Handle form submission logic here
//             }}
//           >
//             {({ values }) => (
//               <Form>
//                 <div className="grid grid-cols-12 grid-rows-1 gap-6 mb-4">
//                   <div className="col-span-6">
//                     <label
//                       htmlFor="category-name"
//                       className="text-sm font-medium text-gray-900 block mb-2"
//                     >
//                       Category Name
//                     </label>
//                     <Field
//                       type="text"
//                       name="categoryName"
//                       id="category-name"
//                       className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
//                       placeholder="men's fashion"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <FieldArray name="subCategories">
//                   {({ insert, remove }) => (
//                     <>
//                       {values.subCategories.length > 0 &&
//                         values.subCategories.map((_, index) => (
//                           <div
//                             key={index}
//                             className="grid grid-cols-12 gap-6 mb-4"
//                           >
//                             <div className="col-span-6">
//                               <label
//                                 htmlFor={`subCategories.${index}.name`}
//                                 className="text-sm font-medium text-gray-900 block mb-2"
//                               >
//                                 Sub Category Name
//                               </label>
//                               <Field
//                                 type="text"
//                                 name={`subCategories.${index}.name`}
//                                 id={`subCategories.${index}.name`}
//                                 className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
//                                 placeholder="Pants"
//                                 required
//                               />
//                             </div>

//                             <div className="col-span-6">
//                               <label
//                                 htmlFor={`subCategories.${index}.gender`}
//                                 className="text-sm font-medium text-gray-900 block mb-2"
//                               >
//                                 Sub Category Gender
//                               </label>
//                               <Field
//                                 name={`subCategories.${index}.gender`}
//                                 options={genderOptions} // Pass options to the custom select
//                                 component={CustomSelect} // Use the custom select component
//                                 placeholder="Select gender" // Provide placeholder for select
//                               />
//                             </div>

//                             <div className="col-span-12 text-end">
//                               {index !== 0 && (
//                                 <button
//                                   type="button"
//                                   className="text-red-600"
//                                   onClick={() => remove(index)}
//                                 >
//                                   Remove
//                                 </button>
//                               )}
//                             </div>
//                           </div>
//                         ))}
//                       <div className="flex justify-end my-4">
//                         <button
//                           type="button"
//                           className="bg-green-600 font-bold text-white px-4 py-2 rounded-lg"
//                           onClick={() =>
//                             insert(values.subCategories.length, {
//                               name: "",
//                               gender: "",
//                             })
//                           }
//                         >
//                           Add More Sub Category
//                         </button>
//                       </div>
//                     </>
//                   )}
//                 </FieldArray>

//                 <div className="pt-6 border-t border-gray-200 rounded-b">
//                   <button
//                     className="text-white bg-black font-medium rounded-lg text-sm px-5 py-2.5 text-center"
//                     type="submit"
//                   >
//                     Save all
//                   </button>
//                 </div>
//               </Form>
//             )}
//           </Formik>
//         </div>

//         <div className="border-t-8">
//           <div className="mt-10">
//             <h2 className="text-xl font-bold mb-4 capitalize">
//               {parentCategory.name} exist child categories and its sub
//               categories
//             </h2>
//             <FirstComponent
//               categories={categories}
//               getSubCategories={getSubCategories}
//             />
//           </div>
//         </div>
//       </div>
//     </DashboardContainer>
//   );
// }

// function CustomSelect({ field, form, options, placeholder }) {
//   const [isOpen, setIsOpen] = useState(false);

//   const handleOptionClick = (value) => {
//     form.setFieldValue(field.name, value); // Set the value in Formik
//     setIsOpen(false);
//   };

//   return (
//     <div className="relative w-full">
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="flex justify-between items-center w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//       >
//         <span
//           className={`text-sm ${
//             field.value ? "text-gray-600" : "text-gray-400"
//           }`}
//         >
//           {field.value || placeholder}
//         </span>
//         <IoChevronDown className="text-gray-500" />
//       </button>

//       {isOpen && (
//         <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
//           {options.map((option, index) => (
//             <li
//               key={index}
//               onClick={() => handleOptionClick(option.value)}
//               className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-blue-100"
//             >
//               {option.label}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// const CustomTreeItem = styled(TreeItem)(({ theme }) => ({
//   color: theme.palette.grey[200],
//   [`& .${treeItemClasses.content}`]: {
//     borderRadius: theme.spacing(0.5),
//     padding: theme.spacing(0.5, 1),
//     margin: theme.spacing(0.2, 0),
//     backgroundColor: "transparent !important", // Ensure no default background color
//     [`&:hover`]: {
//       // Optional: custom hover effect
//       backgroundColor: alpha(theme.palette.primary.main, 0.1), // Change hover color if needed
//     },
//     [`&.${treeItemClasses.selected}`]: {
//       // Ensure active state background is transparent
//       backgroundColor: "transparent !important", // Override active background
//       "&:hover": {
//         backgroundColor: alpha(theme.palette.primary.main, 0.1), // Keep hover effect
//       },
//     },
//     [`& .${treeItemClasses.label}`]: {
//       fontSize: "1rem", // Customize the font size here (default size)
//       fontWeight: 500,
//     },
//   },
//   [`& .${treeItemClasses.iconContainer}`]: {
//     borderRadius: "50%",
//     backgroundColor: theme.palette.primary.dark,
//     padding: theme.spacing(0, 1.2),
//     ...theme.applyStyles("light", {
//       backgroundColor: alpha(theme.palette.primary.main, 0.25),
//     }),
//     ...theme.applyStyles("dark", {
//       color: theme.palette.primary.contrastText,
//     }),
//   },
//   [`& .${treeItemClasses.groupTransition}`]: {
//     marginLeft: 15,
//     paddingLeft: 18,
//     borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
//   },
//   ...theme.applyStyles("light", {
//     color: theme.palette.grey[800],
//   }),
// }));
// function FirstComponent({ categories, getSubCategories }) {
//   const items = [];

//   categories.forEach((category) => {
//     const subCategories = getSubCategories(category._id).map((sub) => ({
//       id: `${category._id}-${sub._id}`,
//       name: `${sub.name} - ${sub.gender}`,
//     }));

//     items.push({
//       id: category._id,
//       name: category.name,
//       children: subCategories,
//     });
//   });

//   return (
//     <Box sx={{ minHeight: 200, minWidth: 250 }}>
//       <RichTreeView
//         slots={{ item: CustomTreeItem }}
//         items={items}
//         getItemLabel={(item) => item.name} // Specify label mapping
//       >
//         {items.map((item) => (
//           <CustomTreeItem
//             key={item.id}
//             itemId={item.id}
//             label={item.name}
//             style={{ fontSize: "20px" }}
//           >
//             {" "}
//             {/* Adjust font size here */}
//             {item.children.map((child) => (
//               <CustomTreeItem
//                 key={child.id}
//                 itemId={child.id}
//                 label={child.name}
//                 style={{ fontSize: "16px" }} // Adjust font size for child items here
//               />
//             ))}
//           </CustomTreeItem>
//         ))}
//       </RichTreeView>
//     </Box>
//   );
// }

import React, { useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import DashboardContainer from "../../../../../common/DashboardContainer";
import { useLocation } from "react-router-dom";
import { Formik, Form, Field, FieldArray } from "formik";
import Box from "@mui/material/Box";
import { categories as originalCategories } from "../../../../../data/categories.json";
import { subCategories as originalSubCategories } from "../../../../../data/subCategories.json";
import { styled, alpha } from "@mui/material/styles";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { TreeItem, treeItemClasses } from "@mui/x-tree-view/TreeItem";

export default function CategoriesInfo() {
  const parentCategory = useLocation().state;
  const categories = originalCategories.filter((category) => {
    return category.parentcategoryid === parentCategory._id;
  });

  function getSubCategories(categoryId) {
    const categoryToFind = categories.find(
      (category) => category._id === categoryId
    )?.subcategoriesid;

    return categoryToFind
      ? originalSubCategories.filter((sub) => categoryToFind.includes(sub._id))
      : [];
  }

  const genderOptions = [
    { value: "men", label: "Men" },
    { value: "women", label: "Women" },
    { value: "bisex", label: "Bisexual" },
  ];

  return (
    <DashboardContainer>
      <div className="relative flex gap-4 flex-col lg:flex-row mx-8 md:m-0">
        <div className="flex-1 rounded-lg bg-white ">
          <div className="">
            <div className="p-6 ">
              <h5 class="text-xl text-gray-700 mb-6 font-sans font-semibold leading-snug tracking-normal text-inherit antialiased">
                Child Categories and Subcategories Overview for{" "}
                {parentCategory.name}
              </h5>
              <FirstComponent
                categories={categories}
                getSubCategories={getSubCategories}
              />
            </div>
          </div>
        </div>

        <div className="flex-1 p-6  rounded-lg bg-white">
          <h5 class="text-xl font-bold text-gray-700">
            Add {parentCategory.name} Child Categories
          </h5>
          <div className="flex items-center gap-10 p-5 border-b rounded-t">
            <div className="w-1/12">
              <img
                src={parentCategory.image}
                alt=""
                className="w-full rounded-full aspect-square"
              />
            </div>
            <div>
              <h3 className="font-extrabold text-2xl">{parentCategory.name}</h3>
            </div>
          </div>

          <div className="mt-4 space-y-6">
            <Formik
              initialValues={{
                categoryName: "", // Category Name
                subCategories: [{ name: "", gender: "" }],
              }}
              onSubmit={(values) => {
                console.log("Form values", values);
                // Handle form submission logic here
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

                              <div className="col-span-6">
                                <label
                                  htmlFor={`subCategories.${index}.gender`}
                                  className="text-sm font-medium text-gray-900 block mb-2"
                                >
                                  Sub Category Gender
                                </label>
                                <Field
                                  name={`subCategories.${index}.gender`}
                                  options={genderOptions} // Pass options to the custom select
                                  component={CustomSelect} // Use the custom select component
                                  placeholder="Select gender" // Provide placeholder for select
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
                                gender: "",
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
    </DashboardContainer>
  );
}

function CustomSelect({ field, form, options, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (value) => {
    form.setFieldValue(field.name, value); // Set the value in Formik
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <span
          className={`text-sm ${
            field.value ? "text-gray-600" : "text-gray-400"
          }`}
        >
          {field.value || placeholder}
        </span>
        <IoChevronDown className="text-gray-500" />
      </button>

      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option.value)}
              className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-blue-100"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const CustomTreeItem = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.grey[200],
  [`& .${treeItemClasses.content}`]: {
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(0.5, 1),
    margin: theme.spacing(0.2, 0),
    backgroundColor: "transparent !important", // Ensure no default background color
    [`&:hover`]: {
      // Optional: custom hover effect
      backgroundColor: alpha(theme.palette.primary.main, 0.1), // Change hover color if needed
    },
    [`&.${treeItemClasses.selected}`]: {
      // Ensure active state background is transparent
      backgroundColor: "transparent !important", // Override active background
      "&:hover": {
        backgroundColor: alpha(theme.palette.primary.main, 0.1), // Keep hover effect
      },
    },
    [`& .${treeItemClasses.label}`]: {
      fontSize: "1rem", // Customize the font size here (default size)
      fontWeight: 500,
    },
  },
  [`& .${treeItemClasses.iconContainer}`]: {
    borderRadius: "50%",
    backgroundColor: theme.palette.primary.dark,
    padding: theme.spacing(0, 1.2),
    ...theme.applyStyles("light", {
      backgroundColor: alpha(theme.palette.primary.main, 0.25),
    }),
    ...theme.applyStyles("dark", {
      color: theme.palette.primary.contrastText,
    }),
  },
  [`& .${treeItemClasses.groupTransition}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
  ...theme.applyStyles("light", {
    color: theme.palette.grey[600],
  }),
  [`& .${treeItemClasses.iconContainer}`]: {
    borderRadius: "50%",
    backgroundColor: "black",
    padding: theme.spacing(0, 1.2),
    ...theme.applyStyles("light", {
      backgroundColor: "black",
    }),
  },
}));

function FirstComponent({ categories, getSubCategories }) {
  const items = [];

  categories.forEach((category) => {
    const subCategories = getSubCategories(category._id).map((sub, index) => {
      const subId = `${category._id}-${sub._id}-${index}`;
      return {
        id: subId,
        name: `${sub.name} - ${sub.gender}`,
      };
    });

    items.push({
      id: `category-${category._id}`, // Prefix with 'category-' to ensure uniqueness
      name: category.name,
      children: subCategories,
    });
  });

  const defaultExpandedIds = items.map((item) => item.id);
  return (
    <Box sx={{ minHeight: 200, minWidth: 250 }}>
      <RichTreeView
        slots={{ item: CustomTreeItem }}
        items={items}
        getItemLabel={(item) => item.name}
        getItemId={(item) => item.id} // Ensure this returns the unique ID
        defaultExpandedItems={defaultExpandedIds}
      >
        {items.map((item) => (
          <CustomTreeItem
            key={item.id}
            itemId={item.id}
            label={item.name}
            style={{ fontSize: "20px" }}
          >
            {item.children.map((child) => (
              <CustomTreeItem
                key={child.id}
                itemId={child.id}
                label={child.name}
                style={{ fontSize: "16px" }}
              />
            ))}
          </CustomTreeItem>
        ))}
      </RichTreeView>
    </Box>
  );
}
