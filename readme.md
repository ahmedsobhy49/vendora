import React, { useEffect, useState } from "react";
import { Formik, Field, ErrorMessage, FieldArray } from "formik";
import \* as Yup from "yup";
import DashboardContainer from "../../../../../common/DashboardContainer";
import { LuUploadCloud } from "react-icons/lu";
import getAllParentCategories from "../../../../../services/getAllParentCategories";
import getSubCategoriesByParentId from "../../../../../services/getSubCategoriesByParentId";
import { MenuItem, Select } from "@mui/material";

const initialValues = {
productName: "",
brandName: "",
mainCategoryId: "",
subCategoryId: "",
subSubCategoryId: "",
productStock: "",
price: "",
discount: { amount: "", startDate: "", endDate: "" },
description: "",
productImages: [],
shipping: {
freeShipping: false,
shippingCost: "",
handlingTime: "",
},
variations: [
{
size: "", // Initialize size
colors: [""], // Initialize colors with an empty string for at least one color
stock: "", // Initialize stock
},
],
gender: "",
};

const validationSchema = Yup.object().shape({
productName: Yup.string()
.min(3, "Product name must be at least 3 characters")
.required("Product name is required"),
brandName: Yup.string()
.min(2, "Brand name must be at least 2 characters")
.required("Brand name is required"),
mainCategoryId: Yup.string().required("Main category is required"),
subCategoryId: Yup.string().required("sub category is required"),
subSubCategoryId: Yup.string().required("sub category is required"),

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
shippingCost: Yup.number().test(
"is-valid-cost",
"Shipping cost is required when free shipping is not selected",
function (value) {
const { freeShipping } = this.parent;
if (freeShipping) {
return true; // No need for shipping cost if freeShipping is true
}
return value !== undefined && value > 0; // Check if the cost is provided and positive
}
),
handlingTime: Yup.number()
.required("Handling time is required")
.positive("Handling time must be a positive number")
.integer("Handling time must be an integer"),
}),

variations: Yup.array().of(
Yup.object().shape({
size: Yup.string().required("Size is required"),
colors: Yup.array()
.of(Yup.string().required("Color is required"))
.min(1, "At least one color is required"),
stock: Yup.number()
.required("Stock is required")
.positive("Stock must be a positive number"),
})
),
gender: Yup.string()
.oneOf(["male", "female", "unisex"], "Invalid gender")
.required("Gender is required"),
});

export default function AddProducts() {
const [mainCategories, setMainCategories] = useState([]);
const [subCategories, setSubCategories] = useState([]);
const [subSubCategories, setSubSubCategories] = useState([]);

async function fetchAllParentCategories() {
const res = await getAllParentCategories();
setMainCategories(res.data.categories);
}

async function getSubCategoriesOfSelectedMainCategories(id) {
const res = await getSubCategoriesByParentId(id);
return res;
}

useEffect(() => {
fetchAllParentCategories();
}, []);

return (
<DashboardContainer>

<div className="w-full mx-auto bg-white shadow-md rounded-lg p-6">
<div className="flex justify-between items-center mb-4">
<h2 className="text-lg font-semibold text-gray-900">
Add New Product
</h2>
</div>
<AddProductsForm
setSubSubCategories={setSubSubCategories}
subSubCategories={subSubCategories}
mainCategories={mainCategories}
subCategories={subCategories}
setSubCategories={setSubCategories}
getSubCategoriesOfSelectedMainCategories={
getSubCategoriesOfSelectedMainCategories
}
/>
</div>
</DashboardContainer>
);
}

function AddProductsForm({
setSubSubCategories,
mainCategories,
subCategories,
subSubCategories,
setSubCategories,
getSubCategoriesOfSelectedMainCategories,
}) {
function handleSubmit(values) {
console.log("Submitted values:", values);
}
const [selectedMainCategoryId, setSelectedMainCategoryId] = useState("");
const [selectedSubCategoryId, setSelectedSubCategoryId] = useState("");

return (
<Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
{({ setFieldValue, handleSubmit, isSubmitting, values }) => (

<form className="space-y-4" onSubmit={handleSubmit}>
{/_ Product Name and Category _/}
<div className="grid grid-cols-2 gap-4">
<ProductNameInput />
<MainCategoryInput
setFieldValue={setFieldValue}
setSelectedMainCategoryId={setSelectedMainCategoryId}
getSubCategoriesOfSelectedMainCategories={
getSubCategoriesOfSelectedMainCategories
}
setSubCategories={setSubCategories}
mainCategories={mainCategories}
/>
</div>
{/_ Subcategories - Only show if a main category is selected _/}
{selectedMainCategoryId && subCategories.length > 0 && (
<SubCategoryInput
setFieldValue={setFieldValue}
setSelectedSubCategoryId={setSelectedSubCategoryId}
getSubCategoriesOfSelectedMainCategories={
getSubCategoriesOfSelectedMainCategories
}
setSubCategories={setSubCategories}
subCategories={subCategories}
setSubSubCategories={setSubSubCategories}
/>
)}
{/_ SubSubcategories - Only show if a Sub category is selected _/}
{selectedSubCategoryId && subSubCategories.length > 0 && (
<SubSubCategoryInput
              setFieldValue={setFieldValue}
              subSubCategories={subSubCategories}
            />
)}
{/_ Brand Name Input - Only show if all categories are selected _/}
{selectedMainCategoryId && selectedSubCategoryId && (
<BrandNameInput />
)}
{/_ Remaining inputs _/}
<StockInputs />
{/_ Price and Discount _/}
<div className="grid grid-cols-2 gap-4">
<div className="flex flex-col gap-1">
<label className="block text-gray-700">Price</label>
<Field
                name="price"
                type="number"
                placeholder="299"
                className="w-full px-3 py-2 border rounded-md outline-none hover:border-black focus:border-blue-500"
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
                className="w-full px-3 py-2 border rounded-md outline-none hover:border-black focus:border-blue-500"
              />
<ErrorMessage
                name="discount.amount"
                component="div"
                className="text-red-600"
              />
</div>
</div>
{/_ Description _/}
<div className="flex flex-col gap-1">
<label className="block text-gray-700">Description</label>
<Field
              as="textarea"
              name="description"
              placeholder="Write product description here"
              className="w-full px-3 py-2 border rounded-md outline-none hover:border-black focus:border-blue-500 resize-none"
              rows="7"
            />
<ErrorMessage
              name="description"
              component="div"
              className="text-red-600"
            />
</div>
{/_ Shipping Details _/}
<ShippingDetailsInputs
            setFieldValue={setFieldValue}
            values={values}
          />
<VariationsForm values={values} />
<ProductImagesInput setFieldValue={setFieldValue} values={values} />
{/_ Submit Button _/}
<button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
          >
Add Product
</button>
</form>
)}
</Formik>
);
}

function MainCategoryInput({
setFieldValue,
setSelectedMainCategoryId,
getSubCategoriesOfSelectedMainCategories,
setSubCategories,
mainCategories,
}) {
return (

<div className="flex flex-col gap-1 ">
<label className="block text-gray-700">Main Category</label>
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
name="mainCategoryId"
onChange={async (event) => {
const selectedCategoryId = event.target.value;
setFieldValue("mainCategoryId", selectedCategoryId);
setSelectedMainCategoryId(selectedCategoryId); // Set the selected main category
await getSubCategoriesOfSelectedMainCategories(
selectedCategoryId
).then((subCategories) => {
setSubCategories(subCategories.data.categories); // Update subCategories state
});
}} >
{mainCategories?.map((main) => (
<MenuItem key={main._id} value={main._id}>
{main.name}
</MenuItem>
))}
</Field>
<ErrorMessage
        name="mainCategoryId"
        component="div"
        className="text-red-600"
      />
</div>
);
}

function SubCategoryInput({
setFieldValue,
setSelectedSubCategoryId,
getSubCategoriesOfSelectedMainCategories,
subCategories,
setSubSubCategories,
}) {
return (

<div className="flex flex-col gap-1">
<label className="block text-gray-700">Subcategory</label>
<Field
sx={{
          ".MuiSelect-select": {
            padding: "0.5rem 0.75rem",
            borderRadius: "0.375rem ",
          },
          "&:focus .MuiSelect-select": {
            border: "1px solid #3b82f6",
          },
        }}
as={Select}
name="subCategoryId"
onChange={async (event) => {
const selectedSubCategoryId = event.target.value;
setFieldValue("subCategoryId", selectedSubCategoryId);
setSelectedSubCategoryId(selectedSubCategoryId);

          // Fetch sub-subcategories based on the selected subcategory
          const res = await getSubCategoriesOfSelectedMainCategories(
            selectedSubCategoryId
          );
          setSubSubCategories(res.data.categories); // Update subSubCategories state
        }}
      >
        {subCategories.map((sub) => (
          <MenuItem key={sub._id} value={sub._id}>
            {sub.name}
          </MenuItem>
        ))}
      </Field>
      <ErrorMessage
        name="subCategoryId"
        component="div"
        className="text-red-600"
      />
    </div>

);
}

function SubSubCategoryInput({ setFieldValue, subSubCategories }) {
return (

<div className="flex flex-col gap-1 ">
<label className="block text-gray-700">Sub-Subcategory</label>
<Field
sx={{
          ".MuiSelect-select": {
            padding: "0.5rem 0.75rem",
            borderRadius: "0.375rem ",
          },
          "&:focus .MuiSelect-select": {
            border: "1px solid #3b82f6",
          },
        }}
as={Select}
name="subSubCategoryId"
onChange={(event) => {
const selectedSubSubCategoryId = event.target.value;
setFieldValue("subSubCategoryId", selectedSubSubCategoryId);
}} >
{subSubCategories.map((subSub) => (
<MenuItem key={subSub._id} value={subSub._id}>
{subSub.name}
</MenuItem>
))}
</Field>
<ErrorMessage
        name="subSubCategoryId"
        component="div"
        className="text-red-600"
      />
</div>
);
}

function ProductImagesInput({ setFieldValue, values }) {
const handleFileChange = (event) => {
const files = event.currentTarget.files;
const imagesArray = Array.from(files).map((file) => ({
url: URL.createObjectURL(file),
altText: file.name,
}));
setFieldValue("productImages", [...values.productImages, ...imagesArray]); // Append new images to existing ones
};

return (

<div className="flex flex-col gap-1">
<label className="block text-gray-700">Product Images</label>
<div
className="border-2 border-dashed border-gray-300 rounded-md px-6 py-12 text-center cursor-pointer"
onClick={() => document.getElementById("file-upload").click()} >
{values.productImages.length > 0 ? (
<div className="flex flex-wrap gap-2">
{values.productImages.map((image, index) => (
<div key={index} className="relative">
<img
                  src={image.url}
                  alt={image.altText}
                  className="h-20 w-20 object-cover rounded-md"
                />
<button
type="button"
className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
onClick={() => {
const updatedImages = values.productImages.filter(
(\_, i) => i !== index
);
setFieldValue("productImages", updatedImages);
}} >
x
</button>
</div>
))}
</div>
) : (
<>
<LuUploadCloud size={50} color="#338ffb" className="w-full" />
<p className="text-gray-500">Click to upload or drag and drop</p>
<p className="text-gray-500">
SVG, PNG, JPG or GIF (Max. 800x400px)
</p>
</>
)}
</div>

      <input
        id="file-upload"
        type="file"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />

      <button
        type="button"
        className="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
        onClick={() => document.getElementById("file-upload").click()}
      >
        Upload More Images
      </button>

      <ErrorMessage
        name="productImages"
        component="div"
        className="text-red-600"
      />
    </div>

);
}

function ProductNameInput() {
return (

<div className="flex flex-col gap-1">
<label className="block text-gray-700">Product Name</label>
<Field
        name="productName"
        type="text"
        placeholder="Product name"
        className="w-full px-3 py-2 border rounded-md outline-none hover:border-black focus:border-blue-500"
      />
<ErrorMessage
        name="productName"
        component="div"
        className="text-red-600 "
      />
</div>
);
}

function BrandNameInput() {
return (

<div className="flex flex-col gap-1">
<label className="block text-gray-700">Brand Name</label>
<Field
        name="brandName"
        type="text"
        placeholder="Brand name"
        className="w-full px-3 py-2 border rounded-md outline-none hover:border-black focus:border-blue-500"
      />
<ErrorMessage name="brandName" component="div" className="text-red-600" />
</div>
);
}

function StockInputs() {
return (

<div className="flex flex-col gap-1">
<label className="block text-gray-700">Product Stock</label>
<Field
        name="productStock"
        type="number"
        placeholder="20"
        className="w-full px-3 py-2 border rounded-md outline-none hover:border-black focus:border-blue-500"
      />
<ErrorMessage
        name="productStock"
        component="div"
        className="text-red-600"
      />
</div>
);
}

function ShippingDetailsInputs({ setFieldValue, values }) {
return (

<div className="flex flex-col gap-4">
{/_ Shipping Cost Input _/}
<div className="flex flex-col gap-1">
<label className="block text-gray-700">Shipping Cost</label>
<Field
name="shipping.shippingCost"
type="number"
placeholder="0"
className="w-full px-3 py-2 border rounded-md outline-none hover:border-black focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 "
disabled={values.shipping.freeShipping} // Disable input if free shipping is checked
/>
<ErrorMessage
          name="shipping.shippingCost"
          component="div"
          className="text-red-600"
        />
</div>
{/_ Free Shipping Checkbox _/}
<div className="flex items-center gap-2">
<Field
type="checkbox"
name="shipping.freeShipping"
className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
onChange={(event) => {
const isChecked = event.target.checked;
setFieldValue("shipping.freeShipping", isChecked);
// Set shipping cost to 0 if free shipping is checked
if (isChecked) {
setFieldValue("shipping.shippingCost", 0);
} else {
setFieldValue("shipping.shippingCost", ""); // Allow user to enter a cost
}
}}
/>
<label className="block text-gray-700">Free Shipping</label>
</div>

      {/* Handling Time Input */}
      <div className="flex flex-col gap-1">
        <label className="block text-gray-700">Handling Time (days)</label>
        <Field
          name="shipping.handlingTime"
          type="number"
          placeholder="2"
          className="w-full px-3 py-2 border rounded-md outline-none hover:border-black focus:border-blue-500"
        />
        <ErrorMessage
          name="shipping.handlingTime"
          component="div"
          className="text-red-600"
        />
      </div>
    </div>

);
}
