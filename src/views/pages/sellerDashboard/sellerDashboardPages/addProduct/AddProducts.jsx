import React from "react";
import { Formik, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import DashboardContainer from "../../../../../common/DashboardContainer";
import { LuUploadCloud } from "react-icons/lu";

const initialValues = {
  productName: "",
  brandName: "",
  category: "",
  productStock: "",
  price: "",
  discount: "",
  description: "",
  productImages: [],
};

const validationSchema = Yup.object().shape({
  productName: Yup.string()
    .min(3, "Product name must be at least 3 characters")
    .required("Product name is required"),
  brandName: Yup.string()
    .min(2, "Brand name must be at least 2 characters")
    .required("Brand name is required"),
  category: Yup.string().required("Category is required"),
  productStock: Yup.number()
    .min(1, "Stock must be at least 1")
    .required("Product stock is required")
    .positive("Stock must be a positive number")
    .integer("Stock must be an integer"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be a positive number"),
  discount: Yup.number()
    .min(0, "Discount cannot be negative")
    .max(100, "Discount cannot exceed 100%"),
  description: Yup.string()
    .min(10, "Description must be at least 10 characters")
    .required("Product description is required"),
  productImages: Yup.array()
    .min(1, "At least one product image is required")
    .of(
      Yup.mixed()
        .required("A file is required")
        .test(
          "fileSize",
          "File size is too large (max: 2MB)",
          (value) => value && value.size <= 2000000
        )
        .test(
          "fileType",
          "Unsupported file format (only .jpg, .jpeg, .png)",
          (value) =>
            value &&
            ["image/jpg", "image/jpeg", "image/png"].includes(value.type)
        )
    ),
});

export default function AddProducts() {
  return (
    <DashboardContainer>
      <div className="w-full custom-hight mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Add Product</h2>
        </div>
        <AddProductsForm />
      </div>
    </DashboardContainer>
  );
}

function AddProductsForm() {
  function handleSubmit(values) {
    console.log(values);
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <form className="space-y-4">
        {/* Product Name and Category */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="block text-gray-700">Product Name</label>
            <input
              type="text"
              placeholder="Product name"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="block text-gray-700">Category</label>
            <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500">
              <option>Select category</option>
              <option>Category 1</option>
              <option>Category 2</option>
            </select>
          </div>
        </div>

        {/* Brand and Stock */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="block text-gray-700">Brand Name</label>
            <input
              type="text"
              placeholder="Product brand"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="block text-gray-700">Product Stock</label>
            <input
              type="text"
              placeholder="20"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Price and Discount */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="block text-gray-700">Price</label>
            <input
              type="text"
              placeholder="299$"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="block text-gray-700">Discount</label>
            <input
              type="text"
              placeholder="10%"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label className="block text-gray-700">Description</label>
          <textarea
            placeholder="Write product description here"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 resize-none"
            rows={"7"}
          ></textarea>
        </div>

        {/* Product Images */}
        <div className="flex flex-col gap-1">
          <label className="block text-gray-700">Product Images</label>
          <div className="border-2 border-dashed border-gray-300 rounded-md px-6 py-12 text-center">
            <LuUploadCloud size={50} color="#338ffb" className="w-full" />
            <p className="text-gray-500">Click to upload or drag and drop</p>
            <p className="text-gray-500">
              SVG, PNG, JPG or GIF (Max. 800x400px)
            </p>
            <input type="file" className="hidden" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between space-x-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Add Product
          </button>
        </div>
      </form>
    </Formik>
  );
}
