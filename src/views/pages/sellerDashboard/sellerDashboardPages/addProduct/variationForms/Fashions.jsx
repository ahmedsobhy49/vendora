import React, { useEffect } from "react";
import { Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import DashboardContainer from "../../../../../../common/DashboardContainer";
import { MenuItem, Select } from "@mui/material";

export const fashionsValidationSchema = Yup.object().shape({
  variations: Yup.array()
    .of(
      Yup.object().shape({
        size: Yup.string().required("Size is required"),
        colors: Yup.array()
          .of(
            Yup.object().shape({
              color: Yup.string().required("Color is required"),
              stock: Yup.number().required("Stock is required"),
            })
          )
          .required("At least one color is required")
          .min(1, "At least one color is required"),
      })
    )
    .required("At least one variation is required")
    .min(1, "At least one variation is required")
    .test(
      "unique-size",
      "Sizes must be unique across variations",
      function (variations) {
        const sizes = variations.map((variation) => variation.size);
        const uniqueSizes = new Set(sizes);
        return uniqueSizes.size === sizes.length;
      }
    ),
});

export default function Fahsion({ handleBack, values, setFieldValue }) {
  // show one variation by default when creating a new fashion
  useEffect(() => {
    if (!values.variations || values.variations.length === 0) {
      setFieldValue("variations", [
        {
          size: "",
          colors: [{ color: "", stock: "" }],
        },
      ]);
    }
  }, [values.variations, setFieldValue]);

  return (
    <DashboardContainer>
      <div>
        <div className="mb-4">
          <h2 className="text-xl text-gray-600 font-semibold">
            Fashions Specifications
          </h2>
        </div>

        <FieldArray name="variations">
          {({ push, remove, form }) => (
            <>
              {form.errors.variations &&
                typeof form.errors.variations === "string" && (
                  <div className="text-red-600 mb-2">
                    {form.errors.variations}
                  </div>
                )}
              <div className="grid grid-cols-3 gap-6  justify-around items-stretch ">
                {values.variations && values.variations.length > 0 ? (
                  values.variations.map((variation, index) => {
                    return (
                      <div
                        key={index}
                        style={{ marginBottom: "1rem" }}
                        className="bg-white p-4"
                      >
                        <h3 className="text-lg text-gray-600 font-semibold mb-4">
                          Variation {index + 1}
                        </h3>

                        <div className="grid  grid-cols-2 gap-2">
                          <SizeInput
                            setFieldValue={setFieldValue}
                            index={index}
                          />
                        </div>
                        <FieldArray name={`variations[${index}].colors`}>
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
                                    {/* Color input field */}
                                    <div
                                      className={`${
                                        colorIndex === 0
                                          ? "col-span-1"
                                          : "col-span-2 "
                                      }`}
                                    >
                                      <Field
                                        name={`variations[${index}].colors[${colorIndex}].color`}
                                        placeholder="Color"
                                        className="w-full px-3 py-2 border rounded-md outline-none hover:border-black focus:border-blue-500"
                                      />
                                      <ErrorMessage
                                        name={`variations[${index}].colors[${colorIndex}].color`}
                                        component="div"
                                        className="text-red-600"
                                      />
                                    </div>

                                    {/* Stock input field */}
                                    <div
                                      className={`${
                                        colorIndex === 0
                                          ? "col-span-1"
                                          : "col-span-2 "
                                      }`}
                                    >
                                      <Field
                                        name={`variations[${index}].colors[${colorIndex}].stock`}
                                        placeholder="Stock Quantity"
                                        type="number"
                                        className="w-full px-3 py-2 border rounded-md outline-none hover:border-black focus:border-blue-500"
                                      />
                                      <ErrorMessage
                                        name={`variations[${index}].colors[${colorIndex}].stock`}
                                        component="div"
                                        className="text-red-600"
                                      />
                                    </div>

                                    {/* Remove button, only if it's not the first color */}
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
                              {/* Add more color button */}
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

                        {/* Remove button, only if it's not the first variation */}
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
                    );
                  })
                ) : (
                  <div>No variations available</div>
                )}
                {/* Add more variation button */}
              </div>
              <button
                type="button"
                className="bg-green-500 block text-white py-2 px-4 rounded-md"
                onClick={() =>
                  push({
                    size: "",
                    colors: [{ color: "", stock: "" }],
                  })
                }
              >
                Add More Variation
              </button>
            </>
          )}
        </FieldArray>
        <div className="flex flex-col gap-2 mt-8  text-white ">
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

function SizeInput({ setFieldValue, index }) {
  const sizes = [
    { label: "XS", value: "XS" },
    { label: "S", value: "S" },
    { label: "M", value: "M" },
    { label: "L", value: "L" },
    { label: "XL", value: "XL" },
    { label: "XXL", value: "XXL" },
  ];
  return (
    <div className="flex flex-col gap-1 ">
      <label className="block text-gray-700">Size </label>
      <Field
        sx={{
          ".MuiSelect-select": {
            padding: "0.5rem 0.75rem",
            borderRadius: "0.375rem ",
            outline: "none",
          },
          "&:focus .MuiSelect-select": {
            border: "1px solid #3b82f6",
          },
        }}
        as={Select}
        name={`variations[${index}].size`}
        onChange={(event) => {
          console.log(event.target.value);
          setFieldValue(`variations[${index}].size`, event.target.value);
        }}
      >
        {sizes?.map((size) => (
          <MenuItem key={size.value} value={size.value}>
            {size.label}
          </MenuItem>
        ))}
      </Field>
      <ErrorMessage
        name={`variations[${index}].size`}
        component="div"
        className="text-red-600"
      />
    </div>
  );
}
