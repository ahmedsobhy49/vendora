import React from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";

const VariationsForm = () => {
  const initialValues = {
    variations: [
      {
        size: "",
        colors: [""],
        stock: "",
      },
    ],
  };

  const validationSchema = Yup.object().shape({
    variations: Yup.array().of(
      Yup.object().shape({
        size: Yup.string().required("Size is required"),
        colors: Yup.array()
          .of(Yup.string().required("Color is required"))
          .required("At least one color is required"),
        stock: Yup.number()
          .required("Stock is required")
          .positive("Stock must be a positive number")
          .integer("Stock must be an integer"),
      })
    ),
  });

  const handleSubmit = (values) => {
    console.log("Form Values:", values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form>
          <FieldArray name="variations">
            {({ insert, remove, push }) => (
              <div>
                <h2 className="text-lg font-semibold mb-4">
                  Product Variations
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {values.variations.length > 0 &&
                    values.variations.map((variation, index) => (
                      <div
                        key={index}
                        className="p-4 border border-gray-300 rounded-lg shadow"
                      >
                        <h3 className="font-bold mb-2">
                          Variation {index + 1}
                        </h3>
                        <div className="mb-2">
                          <label className="block">Size</label>
                          <Field
                            name={`variations.${index}.size`}
                            placeholder="Size"
                            className="w-full border border-gray-300 p-2 rounded"
                          />
                          <ErrorMessage
                            name={`variations.${index}.size`}
                            component="div"
                            className="text-red-500"
                          />
                        </div>

                        <div className="mb-2">
                          <label className="block">Colors</label>
                          <FieldArray name={`variations.${index}.colors`}>
                            {({ push, remove }) => (
                              <div>
                                {variation.colors &&
                                  variation.colors.length > 0 &&
                                  variation.colors.map((color, colorIndex) => (
                                    <div
                                      key={colorIndex}
                                      className="flex items-center mb-2"
                                    >
                                      <Field
                                        name={`variations.${index}.colors.${colorIndex}`}
                                        placeholder="Color"
                                        className="w-full border border-gray-300 p-2 rounded"
                                      />
                                      <button
                                        type="button"
                                        className="ml-2 text-red-500"
                                        onClick={() => remove(colorIndex)}
                                      >
                                        Remove Color
                                      </button>
                                    </div>
                                  ))}
                                <button
                                  type="button"
                                  className="mt-2 text-blue-500"
                                  onClick={() => push("")} // Push an empty string for a new color
                                >
                                  Add Color
                                </button>
                              </div>
                            )}
                          </FieldArray>
                        </div>

                        <div className="mb-2">
                          <label className="block">Stock</label>
                          <Field
                            name={`variations.${index}.stock`}
                            placeholder="Stock"
                            type="number"
                            className="w-full border border-gray-300 p-2 rounded"
                          />
                          <ErrorMessage
                            name={`variations.${index}.stock`}
                            component="div"
                            className="text-red-500"
                          />
                        </div>

                        {index > 0 && (
                          <button
                            type="button"
                            className="mt-2 text-red-500"
                            onClick={() => remove(index)}
                          >
                            Remove Variation
                          </button>
                        )}
                      </div>
                    ))}
                </div>
                <button
                  type="button"
                  className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                  onClick={() => push({ size: "", colors: [""], stock: "" })} // Correctly add a new variation
                >
                  Add Variation
                </button>
              </div>
            )}
          </FieldArray>

          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white rounded-md p-2"
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default VariationsForm;
