import React from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DashboardContainer from "../../../../../common/DashboardContainer";
import { LuUploadCloud } from "react-icons/lu";

const initialValues = {
  productName: "",
  brandName: "",
  categoryId: "",
  productStock: "",
  price: "",
  discount: { amount: "", startDate: "", endDate: "" },
  description: "",
  productImages: [],
  sku: "",
  shipping: {
    freeShipping: false,
    shippingCost: "",
    handlingTime: "",
  },
};

const validationSchema = Yup.object().shape({
  productName: Yup.string()
    .min(3, "Product name must be at least 3 characters")
    .required("Product name is required"),
  brandName: Yup.string()
    .min(2, "Brand name must be at least 2 characters")
    .required("Brand name is required"),
  categoryId: Yup.string().required("Category is required"),
  productStock: Yup.number()
    .min(1, "Stock must be at least 1")
    .required("Product stock is required")
    .positive("Stock must be a positive number")
    .integer("Stock must be an integer"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be a positive number"),
  discount: Yup.object().shape({
    amount: Yup.number()
      .min(0, "Discount cannot be negative")
      .max(100, "Discount cannot exceed 100%")
      .required("Discount amount is required"),
    startDate: Yup.date().nullable(),
    endDate: Yup.date().nullable(),
  }),
  description: Yup.string()
    .min(10, "Description must be at least 10 characters")
    .required("Product description is required"),
  productImages: Yup.array()
    .min(1, "At least one product image is required")
    .of(
      Yup.object().shape({
        url: Yup.string().required("Image URL is required"),
        altText: Yup.string().required("Alt text is required"),
      })
    ),
  shipping: Yup.object().shape({
    freeShipping: Yup.boolean(),
    shippingCost: Yup.number().required("Shipping cost is required").positive(),
    handlingTime: Yup.number()
      .required("Handling time is required")
      .positive()
      .integer(),
  }),
});

export default function AddProducts() {
  return (
    <DashboardContainer>
      <div className="w-full mx-auto bg-white shadow-md rounded-lg p-6">
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
    console.log("Submitted values:", values);
    // Here you would typically make an API call to save the product
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <form className="space-y-4">
          {/* Product Name and Category */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="block text-gray-700">Product Name</label>
              <Field
                name="productName"
                type="text"
                placeholder="Product name"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
              <ErrorMessage
                name="productName"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="block text-gray-700">Category</label>
              <Field
                as="select"
                name="categoryId"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              >
                <option value="">Select category</option>
                <option value="categoryId1">Category 1</option>
                <option value="categoryId2">Category 2</option>
              </Field>
              <ErrorMessage
                name="categoryId"
                component="div"
                className="text-red-600"
              />
            </div>
          </div>

          {/* Brand and Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="block text-gray-700">Brand Name</label>
              <Field
                name="brandName"
                type="text"
                placeholder="Product brand"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
              <ErrorMessage
                name="brandName"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="block text-gray-700">Product Stock</label>
              <Field
                name="productStock"
                type="number"
                placeholder="20"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
              <ErrorMessage
                name="productStock"
                component="div"
                className="text-red-600"
              />
            </div>
          </div>

          {/* Price and Discount */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="block text-gray-700">Price</label>
              <Field
                name="price"
                type="number"
                placeholder="299"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="block text-gray-700">Discount Amount</label>
              <Field
                name="discount.amount"
                type="number"
                placeholder="10"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
              <ErrorMessage
                name="discount.amount"
                component="div"
                className="text-red-600"
              />
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <label className="block text-gray-700">Description</label>
            <Field
              as="textarea"
              name="description"
              placeholder="Write product description here"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 resize-none"
              rows="7"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-red-600"
            />
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
              <input
                type="file"
                multiple
                className="hidden"
                onChange={(event) => {
                  const files = event.currentTarget.files;
                  const imagesArray = Array.from(files).map((file) => ({
                    url: URL.createObjectURL(file), // Create a URL for the file
                    altText: file.name, // Use the file name as alt text
                  }));
                  setFieldValue("productImages", imagesArray);
                }}
              />
            </div>
            <ErrorMessage
              name="productImages"
              component="div"
              className="text-red-600"
            />
          </div>

          {/* Shipping Details */}
          <div className="flex flex-col gap-1">
            <label className="block text-gray-700">Shipping Cost</label>
            <Field
              name="shipping.shippingCost"
              type="number"
              placeholder="Shipping cost"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            <ErrorMessage
              name="shipping.shippingCost"
              component="div"
              className="text-red-600"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="block text-gray-700">Handling Time (days)</label>
            <Field
              name="shipping.handlingTime"
              type="number"
              placeholder="Handling time"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            <ErrorMessage
              name="shipping.handlingTime"
              component="div"
              className="text-red-600"
            />
          </div>

          {/* Free Shipping */}
          <div className="flex items-center">
            <Field
              type="checkbox"
              name="shipping.freeShipping"
              className="mr-2"
            />
            <label className="text-gray-700">Free Shipping</label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
          >
            Add Product
          </button>
        </form>
      )}
    </Formik>
  );
}
