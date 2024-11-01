import React from "react";
import { Formik, Form, Field } from "formik";
import api from "../../../../../api/api";

export const AddSubcategoryModal = ({ isOpen, onClose, category }) => {
  if (!isOpen) return null;

  const handleSubmit = async (values) => {
    console.log("Adding subcategory to:", category);
    try {
      // Make API call to add the subcategory
      const res = await api.post("/category/", {
        name: values.subcategoryName, // Use the single subcategory name
        parentCategoryId: category._id, // Add under the clicked category
      });
      console.log("Subcategory Created:", res.data);
    } catch (error) {
      console.error("Error while creating subcategory:", error);
    }
    onClose(); // Close the modal after submission
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="bg-white rounded-lg p-6 md:translate-x-1/3">
        <h3 className="text-lg font-bold mb-4">
          Add Subcategory for {category.label || category.name}
        </h3>
        <Formik initialValues={{ subcategoryName: "" }} onSubmit={handleSubmit}>
          {({ values }) => (
            <Form>
              <label className="block mb-2">Subcategory Name</label>
              <Field
                type="text"
                name="subcategoryName"
                className="border border-gray-300 p-2 rounded w-full"
                required // You can make this field required if needed
              />
              <button
                type="submit"
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
              >
                Add Subcategory
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-4 ml-2 bg-red-600 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
