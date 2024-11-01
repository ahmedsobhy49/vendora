// import React, { useEffect } from "react";
// import { Field, ErrorMessage, FieldArray } from "formik";
// import * as Yup from "yup";
// import DashboardContainer from "../../../../../../common/DashboardContainer";
// import { MenuItem, Select } from "@mui/material";

// export const mobilesValidationSchema = Yup.object().shape({
//   mobileSpecificFields: Yup.object().shape({
//     screenSize: Yup.string().required("Screen size is required"),
//     variations: Yup.array()
//       .of(
//         Yup.object().shape({
//           storage: Yup.string().required("Storage is required"), // Assuming storage is a string
//           ram: Yup.string().required("RAM is required"), // Assuming RAM is a string
//           colors: Yup.array()
//             .of(
//               Yup.object().shape({
//                 color: Yup.string().required("Color is required"),
//                 stock: Yup.number()
//                   .required("Stock is required")
//                   .min(0, "Stock cannot be negative"), // Ensure stock is non-negative
//               })
//             )
//             .required("At least one color is required")
//             .min(1, "At least one color is required"),
//         })
//       )
//       .required("At least one variation is required")
//       .min(1, "At least one variation is required"),
//   }),
// });
// export default function Mobiles({ handleBack, values, setFieldValue }) {
//   // show one variation by default when creating a new mobile
//   useEffect(() => {
//     if (
//       !values.mobileSpecificFields.variations ||
//       values.mobileSpecificFields.variations.length === 0
//     ) {
//       setFieldValue("mobileSpecificFields.variations", [
//         {
//           storage: "",
//           ram: "",
//           colors: [{ color: "", stock: "" }],
//         },
//       ]);
//     }
//   }, [values.mobileSpecificFields.variations, setFieldValue]);
//   return (
//     <DashboardContainer>
//       <div>
//         <div className="mb-4">
//           <h2 className="text-xl text-gray-600 font-semibold">
//             Mobile Specifications
//           </h2>
//         </div>
//         <div className="flex flex-col mb-6">
//           <label className="block text-gray-700">Screen Size</label>
//           <Field
//             name="mobileSpecificFields.screenSize"
//             placeholder="Screen Size (inches)"
//             className="w-full px-3 py-2 border rounded-md outline-none hover:border-black focus:border-blue-500"
//           />
//           <ErrorMessage
//             name="mobileSpecificFields.screenSize"
//             component="div"
//             className="text-red-600"
//           />
//         </div>

//         <FieldArray name="mobileSpecificFields.variations">
//           {({ push, remove }) => (
//             <>
//               <div className="grid grid-cols-3 gap-6  justify-around items-stretch ">
//                 {values.variations && values.variations.length > 0 ? (
//                   values.variations.map((variation, index) => {
//                     console.log(values.variations);
//                     return (
//                       <div
//                         key={index}
//                         style={{ marginBottom: "1rem" }}
//                         className="bg-white p-4"
//                       >
//                         <h3 className="text-lg text-gray-600 font-semibold mb-4">
//                           Variation {index + 1}
//                         </h3>

//                         <div className="grid  grid-cols-2 gap-2">
//                           <StorageInput
//                             setFieldValue={setFieldValue}
//                             index={index}
//                           />
//                           <RamInput
//                             setFieldValue={setFieldValue}
//                             index={index}
//                           />
//                         </div>
//                         <FieldArray
//                           name={`mobileSpecificFields.variations[${index}].colors`}
//                         >
//                           {({ push: pushColor, remove: removeColor }) => (
//                             <div className="mt-4">
//                               {variation.colors &&
//                               variation.colors.length > 0 ? (
//                                 variation.colors.map((color, colorIndex) => (
//                                   <div
//                                     key={colorIndex}
//                                     style={{ marginBottom: "1rem" }}
//                                     className={`grid ${
//                                       colorIndex === 0
//                                         ? "grid-cols-2"
//                                         : "grid-cols-5"
//                                     } gap-2`}
//                                   >
//                                     {/* Color input field */}
//                                     <div
//                                       className={`${
//                                         colorIndex === 0
//                                           ? "col-span-1"
//                                           : "col-span-2 "
//                                       }`}
//                                     >
//                                       <Field
//                                         name={`mobileSpecificFields.variations[${index}].colors[${colorIndex}].color`}
//                                         placeholder="Color"
//                                         className="w-full px-3 py-2 border rounded-md outline-none hover:border-black focus:border-blue-500"
//                                       />
//                                       <ErrorMessage
//                                         name={`mobileSpecificFields.variations[${index}].colors[${colorIndex}].color`}
//                                         component="div"
//                                         className="text-red-600"
//                                       />
//                                     </div>

//                                     {/* Stock input field */}
//                                     <div
//                                       className={`${
//                                         colorIndex === 0
//                                           ? "col-span-1"
//                                           : "col-span-2 "
//                                       }`}
//                                     >
//                                       <Field
//                                         name={`mobileSpecificFields.variations[${index}].colors[${colorIndex}].stock`}
//                                         placeholder="Stock Quantity"
//                                         type="number"
//                                         className="w-full px-3 py-2 border rounded-md outline-none hover:border-black focus:border-blue-500"
//                                       />
//                                       <ErrorMessage
//                                         name={`mobileSpecificFields.variations[${index}].colors[${colorIndex}].stock`}
//                                         component="div"
//                                         className="text-red-600"
//                                       />
//                                     </div>

//                                     {/* Remove button, only if it's not the first color */}
//                                     {colorIndex > 0 && (
//                                       <div className="col-span-1 flex items-center">
//                                         <button
//                                           type="button"
//                                           className="bg-red-100 w-full py-2 text-center rounded-md"
//                                           onClick={() =>
//                                             removeColor(colorIndex)
//                                           }
//                                         >
//                                           -
//                                         </button>
//                                       </div>
//                                     )}
//                                   </div>
//                                 ))
//                               ) : (
//                                 <div>No colors available</div>
//                               )}
//                               {/* Add more color button */}
//                               <button
//                                 type="button"
//                                 onClick={() =>
//                                   pushColor({ color: "", stock: "" })
//                                 }
//                                 className="mt-2 py-2 px-4 bg-blue-500 text-white rounded-md"
//                               >
//                                 +
//                               </button>
//                             </div>
//                           )}
//                         </FieldArray>

//                         {/* Remove button, only if it's not the first variation */}
//                         {index > 0 && (
//                           <button
//                             className="bg-red-600 text-white px-4 py-2 rounded-md mt-6"
//                             type="button"
//                             onClick={() => remove(index)}
//                           >
//                             Remove Variation
//                           </button>
//                         )}
//                       </div>
//                     );
//                   })
//                 ) : (
//                   <div>No variations available</div>
//                 )}
//                 {/* Add more variation button */}
//               </div>
//               <button
//                 type="button"
//                 className="bg-green-500 block text-white py-2 px-4 rounded-md"
//                 onClick={
//                   () =>
//                     push({
//                       storage: "",
//                       ram: "",
//                       colors: [{ color: "", stock: "" }],
//                     }) // Updated structure
//                 }
//               >
//                 Add More Variation
//               </button>
//             </>
//           )}
//         </FieldArray>
//         <div className="flex flex-col gap-2 mt-8  text-white ">
//           <button
//             type="button"
//             className="block py-2 px-4 bg-black"
//             onClick={handleBack}
//           >
//             Back
//           </button>
//           <button type="submit" className="block bg-blue-900 py-2 px-4">
//             Submit
//           </button>
//         </div>
//       </div>
//     </DashboardContainer>
//   );
// }

// function StorageInput({ setFieldValue, index }) {
//   const storages = [
//     { label: "64GB", value: "64" },
//     { label: "128GB", value: "128" },
//     { label: "256GB", value: "256" },
//     { label: "512GB", value: "512" },
//     { label: "1TB", value: "1" },
//     { label: "2TB", value: "2" },
//   ];
//   return (
//     <div className="flex flex-col gap-1 ">
//       <label className="block text-gray-700">Storage</label>
//       <Field
//         sx={{
//           ".MuiSelect-select": {
//             padding: "0.5rem 0.75rem",
//             borderRadius: "0.375rem ",
//             outline: "none",
//           },
//           "&:focus .MuiSelect-select": {
//             border: "1px solid #3b82f6",
//           },
//         }}
//         as={Select}
//         name={`mobileSpecificFields.variations[${index}].storage`}
//         onChange={(event) => {
//           console.log(event.target.value);
//           setFieldValue(
//             `mobileSpecificFields.variations[${index}].storage`,
//             event.target.value
//           );
//         }}
//       >
//         {storages?.map((storage) => (
//           <MenuItem key={storage.value} value={storage.value}>
//             {storage.label}
//           </MenuItem>
//         ))}
//       </Field>
//       <ErrorMessage
//         name={`mobileSpecificFields.variations[${index}].storage`}
//         component="div"
//         className="text-red-600"
//       />
//     </div>
//   );
// }

// function RamInput({ setFieldValue, index }) {
//   const rams = [
//     { label: "4GB", value: "4" },
//     { label: "8GB", value: "8" },
//     { label: "16GB", value: "16" },
//     { label: "32GB", value: "32" },
//     { label: "64GB", value: "64" },
//   ];
//   return (
//     <div className="flex flex-col gap-1 ">
//       <label className="block text-gray-700">RAM</label>
//       <Field
//         sx={{
//           ".MuiSelect-select": {
//             padding: "0.5rem 0.75rem",
//             borderRadius: "0.375rem ",
//             outline: "none",
//           },
//           "&:focus .MuiSelect-select": {
//             border: "1px solid #3b82f6",
//           },
//         }}
//         as={Select}
//         name={`mobileSpecificFields.variations[${index}].ram`}
//         onChange={(event) => {
//           console.log(event.target.value);
//           setFieldValue(
//             `mobileSpecificFields.variations[${index}].ram`,
//             event.target.value
//           );
//         }}
//       >
//         {rams?.map((ram) => (
//           <MenuItem key={ram.value} value={ram.value}>
//             {ram.label}
//           </MenuItem>
//         ))}
//       </Field>
//       <ErrorMessage
//         name={`mobileSpecificFields.variations[${index}].ram`}
//         component="div"
//         className="text-red-600"
//       />
//     </div>
//   );
// }

import React, { useEffect } from "react";
import { Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import DashboardContainer from "../../../../../../common/DashboardContainer";
import { MenuItem, Select } from "@mui/material";

export const mobilesValidationSchema = Yup.object().shape({
  specificFields: Yup.object().shape({
    screenSize: Yup.string().required("Screen size is required"),
    variations: Yup.array()
      .of(
        Yup.object().shape({
          storage: Yup.string().required("Storage is required"),
          ram: Yup.string().required("RAM is required"),
          colors: Yup.array()
            .of(
              Yup.object().shape({
                color: Yup.string().required("Color is required"),
                stock: Yup.number()
                  .required("Stock is required")
                  .min(0, "Stock cannot be negative"),
              })
            )
            .required("At least one color is required")
            .min(1, "At least one color is required"),
        })
      )
      .required("At least one variation is required")
      .min(1, "At least one variation is required"),
  }),
});

export default function Mobiles({ handleBack, values, setFieldValue }) {
  // show one variation by default when creating a new mobile
  useEffect(() => {
    if (
      !values.specificFields ||
      !values.specificFields.variations ||
      values.specificFields.variations.length === 0
    ) {
      setFieldValue("specificFields.variations", [
        {
          storage: "",
          ram: "",
          colors: [{ color: "", stock: "" }],
        },
      ]);
    }
  }, [values.specificFields, setFieldValue]);

  return (
    <DashboardContainer>
      <div>
        <div className="mb-4">
          <h2 className="text-xl text-gray-600 font-semibold">
            Mobile Specifications
          </h2>
        </div>
        <div className="flex flex-col mb-6">
          <label className="block text-gray-700">Screen Size</label>
          <Field
            name="specificFields.screenSize"
            placeholder="Screen Size (inches)"
            className="w-full px-3 py-2 border rounded-md outline-none hover:border-black focus:border-blue-500"
          />
          <ErrorMessage
            name="specificFields.screenSize"
            component="div"
            className="text-red-600"
          />
        </div>

        <FieldArray name="specificFields.variations">
          {({ push, remove }) => {
            return (
              <>
                <div className="grid grid-cols-3 gap-6 justify-around items-stretch">
                  {values?.specificFields?.variations &&
                  values?.specificFields?.variations.length > 0 ? (
                    values?.specificFields?.variations.map(
                      (variation, index) => (
                        <div
                          key={index}
                          style={{ marginBottom: "1rem" }}
                          className="bg-white p-4"
                        >
                          <h3 className="text-lg text-gray-600 font-semibold mb-4">
                            Variation {index + 1}
                          </h3>

                          <div className="grid grid-cols-2 gap-2">
                            <StorageInput index={index} />
                            <RamInput index={index} />
                          </div>

                          <FieldArray
                            name={`specificFields.variations[${index}].colors`}
                          >
                            {({ push: pushColor, remove: removeColor }) => (
                              <div className="mt-4">
                                {variation.colors &&
                                variation.colors.length > 0 ? (
                                  variation.colors.map((color, colorIndex) => (
                                    <div
                                      key={colorIndex}
                                      style={{ marginBottom: "1rem" }}
                                      className={`grid ${
                                        colorIndex === 0
                                          ? "grid-cols-2"
                                          : "grid-cols-5"
                                      } gap-2`}
                                    >
                                      <div
                                        className={`${
                                          colorIndex === 0
                                            ? "col-span-1"
                                            : "col-span-2 "
                                        }`}
                                      >
                                        <Field
                                          name={`specificFields.variations[${index}].colors[${colorIndex}].color`}
                                          placeholder="Color"
                                          className="w-full px-3 py-2 border rounded-md outline-none hover:border-black focus:border-blue-500"
                                        />
                                        <ErrorMessage
                                          name={`specificFields.variations[${index}].colors[${colorIndex}].color`}
                                          component="div"
                                          className="text-red-600"
                                        />
                                      </div>

                                      <div
                                        className={`${
                                          colorIndex === 0
                                            ? "col-span-1"
                                            : "col-span-2 "
                                        }`}
                                      >
                                        <Field
                                          name={`specificFields.variations[${index}].colors[${colorIndex}].stock`}
                                          placeholder="Stock Quantity"
                                          type="number"
                                          className="w-full px-3 py-2 border rounded-md outline-none hover:border-black focus:border-blue-500"
                                        />
                                        <ErrorMessage
                                          name={`specificFields.variations[${index}].colors[${colorIndex}].stock`}
                                          component="div"
                                          className="text-red-600"
                                        />
                                      </div>

                                      {colorIndex > 0 && (
                                        <div className="col-span-1 flex items-center">
                                          <button
                                            type="button"
                                            className="bg-red-100 w-full py-2 text-center rounded-md"
                                            onClick={() =>
                                              removeColor(colorIndex)
                                            }
                                          >
                                            -
                                          </button>
                                        </div>
                                      )}
                                    </div>
                                  ))
                                ) : (
                                  <div>No colors available</div>
                                )}
                                <button
                                  type="button"
                                  onClick={() =>
                                    pushColor({ color: "", stock: "" })
                                  }
                                  className="mt-2 py-2 px-4 bg-blue-500 text-white rounded-md"
                                >
                                  +
                                </button>
                              </div>
                            )}
                          </FieldArray>

                          {index > 0 && (
                            <button
                              className="bg-red-600 text-white px-4 py-2 rounded-md mt-6"
                              type="button"
                              onClick={() => remove(index)}
                            >
                              Remove Variation
                            </button>
                          )}
                        </div>
                      )
                    )
                  ) : (
                    <div>No variations available</div>
                  )}
                </div>
                <button
                  type="button"
                  className="bg-green-500 block text-white py-2 px-4 rounded-md"
                  onClick={() =>
                    push({
                      storage: "",
                      ram: "",
                      colors: [{ color: "", stock: "" }],
                    })
                  }
                >
                  Add More Variation
                </button>
              </>
            );
          }}
        </FieldArray>
        <div className="flex flex-col gap-2 mt-8 text-white">
          <button
            type="button"
            className="block py-2 px-4 bg-black"
            onClick={handleBack}
          >
            Back
          </button>
          <button type="submit" className="block bg-blue-900 py-2 px-4">
            Submit
          </button>
        </div>
      </div>
    </DashboardContainer>
  );
}

function StorageInput({ index }) {
  const storages = [
    { label: "64GB", value: "64" },
    { label: "128GB", value: "128" },
    { label: "256GB", value: "256" },
    { label: "512GB", value: "512" },
    { label: "1TB", value: "1" },
    { label: "2TB", value: "2" },
  ];
  return (
    <div className="flex flex-col gap-1">
      <label className="block text-gray-700">Storage</label>
      <Field as={Select} name={`specificFields.variations[${index}].storage`}>
        {storages.map((storage) => (
          <MenuItem key={storage.value} value={storage.value}>
            {storage.label}
          </MenuItem>
        ))}
      </Field>
      <ErrorMessage
        name={`specificFields.variations[${index}].storage`}
        component="div"
        className="text-red-600"
      />
    </div>
  );
}

function RamInput({ index }) {
  const rams = [
    { label: "4GB", value: "4" },
    { label: "8GB", value: "8" },
    { label: "16GB", value: "16" },
    { label: "32GB", value: "32" },
    { label: "64GB", value: "64" },
  ];
  return (
    <div className="flex flex-col gap-1">
      <label className="block text-gray-700">RAM</label>
      <Field as={Select} name={`specificFields.variations[${index}].ram`}>
        {rams.map((ram) => (
          <MenuItem key={ram.value} value={ram.value}>
            {ram.label}
          </MenuItem>
        ))}
      </Field>
      <ErrorMessage
        name={`specificFields.variations[${index}].ram`}
        component="div"
        className="text-red-600"
      />
    </div>
  );
}
