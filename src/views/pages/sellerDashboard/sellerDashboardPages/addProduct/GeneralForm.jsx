import React, { useEffect, useState } from "react";
import { Formik, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import DashboardContainer from "../../../../../common/DashboardContainer";
import { LuAirVent, LuUploadCloud } from "react-icons/lu";
import getAllParentCategories from "../../../../../services/category/getAllParentCategories";
import getSubCategoriesByParentId from "../../../../../services/category/getSubCategoriesByParentId";
import { MenuItem, Select } from "@mui/material";
import api from "../../../../../api/api";
import { DateInput } from "rsuite";
import moment from "moment";
import { TagsInput } from "react-tag-input-component";

export const generalFormValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Product name must be at least 3 characters")
    .required("Product name is required"),
  brand: Yup.mixed(),
  brandName: Yup.string()
    .nullable()
    .test("brandName-required", "Brand name is required ", function (value) {
      const { brand } = this.parent; // Access the parent object to get brandId
      if (brand === "other") {
        return this.createError({
          path: "brandName",
          message: "Brand name is required",
        });
      }
      return true; // Valid if brandId is not null or if brandName has a value
    }),
  mainCategory: Yup.mixed().required("Main category is required"),
  subCategory: Yup.mixed().required("Subcategory is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be a positive number"),
  discount: Yup.object().shape({
    amount: Yup.number()
      .typeError("Discount amount must be a number")
      .min(0, "Discount cannot be negative")
      .max(100, "Discount cannot exceed 100%")
      .test(
        "required-if-end-or-start-date",
        "Discount amount is required if start or end date is provided",
        function (value) {
          const { startDate, endDate } = this.parent;
          return (!startDate && !endDate) || value > 0;
        }
      ),
    startDate: Yup.date()
      .nullable()
      .test("is-future-date", "Invalid start date", function (value) {
        return (
          !value ||
          moment(value, "DD/MM/YYYY").isSameOrAfter(moment().startOf("day"))
        );
      })
      .test(
        "required-if-discount",
        "Start date is required if discount amount is provided",
        function (value) {
          const { amount } = this.parent;
          return !amount || amount <= 0 || !!value;
        }
      ),
    endDate: Yup.date()
      .nullable()
      .test(
        "required-if-discount",
        "End date is required if discount amount is provided",
        function (value) {
          const { amount } = this.parent;
          return !amount || amount <= 0 || !!value;
        }
      )
      .test(
        "is-after-start-date",
        "End date must be after start date",
        function (value) {
          const { startDate } = this.parent;
          return (
            !value ||
            moment(value, "DD/MM/YYYY").isAfter(moment(startDate, "DD/MM/YYYY"))
          );
        }
      ),
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
        return freeShipping || (value !== undefined && value > 0);
      }
    ),
    handlingTime: Yup.number()
      .required("Handling time is required")
      .positive("Handling time must be a positive number")
      .integer("Handling time must be an integer"),
  }),
});

export default function GeneralForm({ handleNext, setFieldValue, values }) {
  const [mainCategories, setMainCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  async function fetchAllParentCategories() {
    const res = await getAllParentCategories();
    setMainCategories(res.data.categories);
  }

  async function getSubCategoriesOfSelectedMainCategories(id) {
    const res = await getSubCategoriesByParentId(id);
    return res;
  }

  async function getBrands(catID) {
    const res = await api.get(`/brands/category/${catID}`);
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
          handleNext={handleNext}
          values={values}
          setFieldValue={setFieldValue}
          setSubSubCategories={setSubSubCategories}
          subSubCategories={subSubCategories}
          mainCategories={mainCategories}
          subCategories={subCategories}
          setSubCategories={setSubCategories}
          getSubCategoriesOfSelectedMainCategories={
            getSubCategoriesOfSelectedMainCategories
          }
          getBrands={getBrands}
          setBrands={setBrands}
          brands={brands}
        />
      </div>
    </DashboardContainer>
  );
}

function AddProductsForm({
  handleNext,
  values,
  setFieldValue,
  setSubSubCategories,
  mainCategories,
  subCategories,
  subSubCategories,
  setSubCategories,
  getSubCategoriesOfSelectedMainCategories,
  getBrands,
  setBrands,
  brands,
}) {
  const [selectedMainCategory, setSelectedMainCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  return (
    <>
      {/* Product Name and Category */}
      <div className="grid grid-cols-2 gap-4 items-start mb-4">
        <ProductNameInput />
        <MainCategoryInput
          setFieldValue={setFieldValue}
          setSelectedMainCategory={setSelectedMainCategory}
          getSubCategoriesOfSelectedMainCategories={
            getSubCategoriesOfSelectedMainCategories
          }
          setSubCategories={setSubCategories}
          mainCategories={mainCategories}
          getBrands={getBrands}
          setBrands={setBrands}
        />
      </div>

      <div className="mb-4">
        {selectedMainCategory && subCategories.length > 0 && (
          <SubCategoryInput
            setFieldValue={setFieldValue}
            setSelectedSubCategory={setSelectedSubCategory}
            getSubCategoriesOfSelectedMainCategories={
              getSubCategoriesOfSelectedMainCategories
            }
            setSubCategories={setSubCategories}
            subCategories={subCategories}
            setSubSubCategories={setSubSubCategories}
          />
        )}
      </div>

      <div className="mb-4">
        {selectedSubCategory && subSubCategories.length > 0 && (
          <SubSubCategoryInput
            setFieldValue={setFieldValue}
            subSubCategories={subSubCategories}
          />
        )}
      </div>
      <div className="mb-4">
        {selectedMainCategory && selectedSubCategory && (
          <BrandNameSelect setFieldValue={setFieldValue} brands={brands} />
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start mb-4">
        <PriceInput />
        <DiscountInputs />
      </div>

      <div className="flex flex-col gap-1 mb-4">
        <label className="block text-gray-700">Description</label>
        <Field
          as="textarea"
          name="description"
          placeholder="Write product description here"
          className="w-full px-3 py-2 border rounded-md outline-none hover:border-black focus:border-blue-500 transition-all resize-none"
          rows="7"
        />
        <ErrorMessage
          name="description"
          component="div"
          className="text-red-600"
        />
      </div>

      <div className="mb-4 w-full">
        <CustomTagsInput />
      </div>

      <div className="mb-4">
        <ShippingDetailsInputs setFieldValue={setFieldValue} values={values} />
      </div>

      <div className="mb-4 ">
        <ProductImagesInput setFieldValue={setFieldValue} values={values} />
      </div>

      <button
        onClick={handleNext}
        className="w-full py-2 text-lg font-semibold bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none mt-2"
      >
        Next
      </button>
    </>
  );
}

function MainCategoryInput({
  setFieldValue,
  setSelectedMainCategory,
  getSubCategoriesOfSelectedMainCategories,
  setSubCategories,
  mainCategories,
  getBrands,
  setBrands,
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="block text-gray-700">Main Category</label>
      <Field name="mainCategory">
        {({ field }) => (
          <>
            <Select
              value={field.value ? JSON.stringify(field.value) : ""} // Stringify the object to handle Select value
              onChange={async (event) => {
                const selectedMainCategory = JSON.parse(event.target.value); // Parse back to object
                setFieldValue("mainCategory", selectedMainCategory); // Store the entire object in Formik
                setSelectedMainCategory(selectedMainCategory); // Update state if needed
                // Fetch subcategories and brands based on the selected category
                const subCategoriesResponse =
                  await getSubCategoriesOfSelectedMainCategories(
                    selectedMainCategory._id
                  );
                setSubCategories(subCategoriesResponse.data.categories);

                const brandsResponse = await getBrands(
                  selectedMainCategory?._id
                );
                setBrands(brandsResponse.data.brands);
              }}
              displayEmpty
              renderValue={(selected) => {
                const selectedCategory = selected
                  ? JSON.parse(selected).name
                  : null;
                return selectedCategory ? (
                  selectedCategory
                ) : (
                  <span style={{ color: "#BDBDBD" }}>
                    Select the main category
                  </span>
                );
              }}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 200,
                    overflowY: "auto",
                  },
                },
              }}
              sx={{
                ".MuiSelect-select": {
                  padding: "0.59rem 0.75rem",
                },
              }}
            >
              {mainCategories?.map((main) => (
                <MenuItem key={main._id} value={JSON.stringify(main)}>
                  {main.name}
                </MenuItem>
              ))}
            </Select>
            <ErrorMessage
              name="mainCategory"
              component="div"
              className="text-red-600"
            />
          </>
        )}
      </Field>
    </div>
  );
}

function SubCategoryInput({
  setFieldValue,
  setSelectedSubCategory,
  getSubCategoriesOfSelectedMainCategories,
  subCategories,
  setSubSubCategories,
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="block text-gray-700">Subcategory</label>
      <Field name="subCategoryId">
        {({ field }) => (
          <>
            <Select
              value={field.value ? JSON.stringify(field.value) : ""} // Stringify the object to handle Select value
              {...field} // Spread Formik's field props for controlled input
              displayEmpty
              renderValue={(selected) => {
                return selected ? (
                  subCategories?.find((sub) => sub === selected)?.name
                ) : (
                  <span style={{ color: "#BDBDBD" }}>
                    Select the subcategory
                  </span> // Placeholder style
                );
              }}
              onChange={async (event) => {
                const selectedSubCategory = event.target.value;

                setFieldValue("subCategory", selectedSubCategory);
                setSelectedSubCategory(selectedSubCategory); // Set the selected subcategory

                // Fetch sub-subcategories based on the selected subcategory
                const res = await getSubCategoriesOfSelectedMainCategories(
                  selectedSubCategory._id
                );
                setSubSubCategories(res.data.categories); // Update subSubCategories state
              }}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 200, // Set max height for dropdown
                    overflowY: "auto", // Enable scrolling
                  },
                },
              }}
              sx={{
                ".MuiSelect-select": {
                  padding: "0.59rem 0.75rem",
                  borderRadius: "0.375rem ",
                },
                "&:focus .MuiSelect-select": {
                  border: "1px solid #2196f3",
                },
              }}
            >
              {subCategories?.map((sub) => (
                <MenuItem key={sub._id} value={sub}>
                  {sub.name}
                </MenuItem>
              ))}
            </Select>
            <ErrorMessage
              name="subCategoryId"
              component="div"
              className="text-red-600"
            />
          </>
        )}
      </Field>
    </div>
  );
}

function SubSubCategoryInput({ setFieldValue, subSubCategories }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="block text-gray-700">Sub-Subcategory</label>
      <Field name="subSubCategoryId">
        {({ field }) => (
          <>
            <Select
              {...field} // Spread Formik's field props for controlled input
              displayEmpty
              renderValue={(selected) => {
                return selected ? (
                  subSubCategories.find((subSub) => subSub === selected)?.name
                ) : (
                  <span style={{ color: "#BDBDBD" }}>
                    Select the sub-subcategory
                  </span> // Placeholder style
                );
              }}
              onChange={(event) => {
                const selectedSubSubCategory = event.target.value;
                setFieldValue("subSubCategory", selectedSubSubCategory);
              }}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 200, // Set max height for dropdown
                    overflowY: "auto", // Enable scrolling
                  },
                },
              }}
              sx={{
                ".MuiSelect-select": {
                  padding: "0.59rem 0.75rem",
                  borderRadius: "0.375rem ",
                },
                "&:focus .MuiSelect-select": {
                  border: "1px solid #2196f3",
                },
              }}
            >
              {subSubCategories?.map((subSub) => (
                <MenuItem key={subSub._id} value={subSub}>
                  {subSub.name}
                </MenuItem>
              ))}
            </Select>
            <ErrorMessage
              name="subSubCategoryId"
              component="div"
              className="text-red-600"
            />
          </>
        )}
      </Field>
    </div>
  );
}

function ProductImagesInput({ setFieldValue, values }) {
  // const handleFileChange = (event) => {
  //   console.log("change", event.target.files[0]);
  //   const files = event.currentTarget.files;
  //   const imagesArray = Array.from(files).map((file) => ({
  //     url: URL.createObjectURL(file),
  //     altText: file.name,
  //   }));
  //   setFieldValue("productImages", [
  //     ...(values.productImages || []),
  //     ...imagesArray,
  //   ]);
  // };
  const handleFileChange = async (event) => {
    const files = event.currentTarget.files;
    const imagesArray = await Promise.all(
      Array.from(files).map((file) => ({
        url: URL.createObjectURL(file), // Use object URL for immediate preview
        altText: file.name,
        file: file, // Store the actual File object
      }))
    );

    setFieldValue("productImages", [
      ...(values.productImages || []),
      ...imagesArray,
    ]);
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="block text-gray-700">Product Images</label>
      <div
        className=" border-2 border-dashed border-gray-300 rounded-md px-6 py-12 text-center cursor-pointer active:bg-gray-100"
        onClick={(e) => {
          if (e.target.dataset.type === "remove") {
            return;
          }
          document.getElementById("product-image-upload").click();
        }}
      >
        {values?.productImages?.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {values.productImages.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image.url}
                  alt={image.altText}
                  className="h-20 w-20 object-cover rounded-md"
                />
                <button
                  data-type="remove"
                  type="button"
                  className="absolute -top-8 -right-2 bg-red-500 text-white rounded-full aspect-square px-2"
                  onClick={() => {
                    const updatedImages = values.productImages.filter(
                      (_, i) => i !== index
                    );
                    setFieldValue("productImages", updatedImages);
                  }}
                >
                  x
                </button>
              </div>
            ))}
          </div>
        ) : (
          <>
            <LuUploadCloud size={50} color="#338ffb" className="w-full" />
            <p className="text-gray-500">Click to upload </p>
            <p className="text-gray-500">
              SVG, PNG, JPG or GIF (Max. 800x400px)
            </p>
          </>
        )}
      </div>

      <input
        id="product-image-upload"
        type="file"
        accept="image/png, image/jpeg, image/webp"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />

      {/* <button
        type="button"
        className="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
        onClick={() => document.getElementById("file-upload").click()}
      >
        Upload More Images
      </button> */}

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
      <Field name="name">
        {({ field }) => (
          <>
            <input
              {...field} // Spread Formik's field props for controlled input
              type="text"
              placeholder="Product name"
              className={`w-full px-3 py-2 border rounded-md outline-none hover:border-black focus:border-blue-500`}
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-600"
            />
          </>
        )}
      </Field>
    </div>
  );
}

function PriceInput() {
  return (
    <div className="flex col-span-1 flex-col gap-1">
      <label className="block text-gray-700">Price</label>
      <Field name="price">
        {({ field }) => (
          <>
            <input
              {...field} // Spread field props from Formik
              type="number"
              placeholder="299"
              className="w-full px-3 py-2 border rounded-md outline-none hover:border-black focus:border-blue-500 transition-all"
            />
            <ErrorMessage
              name="price"
              component="div"
              className="text-red-600"
            />
          </>
        )}
      </Field>
    </div>
  );
}

function BrandNameSelect({ brands, setFieldValue }) {
  const [isOther, setIsOther] = useState(false);
  return (
    <div className="flex flex-col gap-1">
      <label className="block text-gray-700">Brand</label>
      <Field name="brand">
        {({ field }) => (
          <>
            <Select
              value={field.value ? JSON.stringify(field.value) : ""} // Stringify the object to handle Select value
              displayEmpty
              renderValue={(selected) => {
                console.log("selected", selected);
                if (selected === "") {
                  return <span style={{ color: "#BDBDBD" }}>Other</span>; // Display label for "Other"
                }
                return selected ? (
                  brands.find(
                    (brand) => brand.name == JSON.parse(selected).name
                  )?.name
                ) : (
                  <span style={{ color: "#BDBDBD" }}>Select a brand</span> // Placeholder style
                );
              }}
              onChange={async (event) => {
                const selectedValue = event.target.value;
                if (selectedValue === "other") {
                  setIsOther(true);
                  setFieldValue("brand", ""); // Clear brandId for manual entry
                  setFieldValue("brandName", ""); // Initialize brandName
                  return;
                } else {
                  setIsOther(false);
                  try {
                    const parsedSelectedBrand = JSON.parse(selectedValue);
                    console.log(parsedSelectedBrand);
                    setFieldValue("brand", parsedSelectedBrand);
                    setFieldValue("brandName", null); // Clear brandName if a valid brand is selected
                  } catch (error) {
                    console.error("Failed to parse selected brand:", error); // Handle parse errors
                  }
                }
              }}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 200, // Set max height for dropdown
                    overflowY: "auto", // Enable scrolling
                  },
                },
              }}
              sx={{
                ".MuiSelect-select": {
                  padding: "0.5rem 0.75rem",
                  borderRadius: "0.375rem",
                },
                "&:focus .MuiSelect-select": {
                  border: "1px solid #3b82f6",
                },
              }}
            >
              {brands?.map((brand) => (
                <MenuItem
                  className="capitalize"
                  key={brand._id}
                  value={JSON.stringify(brand)}
                >
                  {brand.name}
                </MenuItem>
              ))}
              <MenuItem className="capitalize" key={"other"} value={"other"}>
                other
              </MenuItem>
            </Select>
            {isOther && <BrandNameInput />}
            <ErrorMessage
              name="brand" // Changed to match the field name
              component="div"
              className="text-red-600"
            />
          </>
        )}
      </Field>
    </div>
  );
}

function ShippingDetailsInputs({ setFieldValue, values }) {
  return (
    <div className="flex flex-col gap-4">
      {/* Shipping Cost Input */}
      <div className="flex flex-col gap-1">
        <label className="block text-gray-700">Shipping Cost</label>
        <Field
          name="shipping.shippingCost"
          type="number"
          placeholder="0"
          className="w-full px-3 py-2 border rounded-md outline-none hover:border-black focus:border-blue-500 transition-all disabled:cursor-not-allowed disabled:opacity-50 "
          disabled={values?.shipping?.freeShipping} // Disable input if free shipping is checked
        />
        <ErrorMessage
          name="shipping.shippingCost"
          component="div"
          className="text-red-600"
        />
      </div>
      {/* Free Shipping Checkbox */}
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
          className="w-full px-3 py-2 border rounded-md outline-none hover:border-black focus:border-blue-500 transition-all"
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

function DiscountInputs() {
  return (
    <div className="grid grid-cols-3 col-span-1 gap-2">
      <div className="flex col-span-1 flex-col gap-1">
        <label className="block text-gray-700">Discount Amount</label>
        <Field name="discount.amount" type="number" placeholder="10">
          {({ field, form }) => (
            <input
              className="w-full px-3 py-2 border rounded-md outline-none hover:border-black focus:border-blue-500 transition-all"
              {...field}
              onChange={(e) => {
                const value = e.target.value;
                form.setFieldValue("discount.amount", value);
                form.setFieldTouched("discount.amount", true);

                // Validate start and end dates if discount amount is provided
                if (value && value > 0) {
                  form.validateField("discount.startDate");
                  form.validateField("discount.endDate");
                }
              }}
            />
          )}
        </Field>
        <ErrorMessage
          name="discount.amount"
          component="div"
          className="text-red-600"
        />
      </div>

      <div className="flex col-span-1 flex-col gap-1">
        <label className="block text-gray-700">Start Date</label>
        <Field name="discount.startDate">
          {({ field, form }) => (
            <DateInput
              {...field}
              onChange={(value) => {
                const isValidDate = moment(value).isValid();
                if (isValidDate) {
                  form.setFieldValue("discount.startDate", value);
                } else {
                  form.setFieldValue("discount.startDate", null);
                }
                form.setFieldTouched("discount.startDate", true);
              }}
              format="MM/dd/yyyy"
              className="w-full px-3 py-2 border rounded-md outline-none hover:border-black focus:border-blue-500 transition-all"
            />
          )}
        </Field>
        <ErrorMessage
          name="discount.startDate"
          component="div"
          className="text-red-600"
        />
      </div>

      <div className="flex col-span-1 flex-col gap-1">
        <label className="block text-gray-700">End Date</label>
        <Field name="discount.endDate">
          {({ field, form }) => (
            <DateInput
              {...field}
              onChange={(value) => {
                const isValidDate = moment(value).isValid();
                if (isValidDate) {
                  form.setFieldValue("discount.endDate", value);
                } else {
                  form.setFieldValue("discount.endDate", null);
                }
                form.setFieldTouched("discount.endDate", true);
              }}
              format="MM/dd/yyyy"
              className="w-full px-3 py-2 border rounded-md outline-none hover:border-black focus:border-blue-500 transition-all "
            />
          )}
        </Field>
        <ErrorMessage
          name="discount.endDate"
          component="div"
          className="text-red-600"
        />
      </div>
    </div>
  );
}

function CustomTagsInput() {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="tags">Add Product Tags</label>
      <Field name="tags">
        {({ field, form }) => {
          const handleTagsChange = (tags) => {
            form.setFieldValue(field.name, tags); // Set the tags in Formik's state
          };

          return (
            <TagsInput
              value={field.value} // Use Formik's field value
              onChange={handleTagsChange} // Update Formik on change
              placeHolder="Press enter to add a new tag"
            />
          );
        }}
      </Field>
    </div>
  );
}

function BrandNameInput() {
  return (
    <div className="flex flex-col gap-1 mt-1">
      <label className="block text-gray-700">Provide Brand Name</label>
      <Field name="brandName" type="text" placeholder="Apple">
        {({ field, form }) => (
          <input
            className="w-full px-3 py-2 border rounded-md outline-none hover:border-black focus:border-blue-500 transition-all"
            {...field}
            onChange={(e) => {
              const value = e.target.value;
              form.setFieldValue("brandName", value);
              form.setFieldTouched("brandName", true);
            }}
          />
        )}
      </Field>
      <ErrorMessage name="brandName" component="div" className="text-red-600" />
    </div>
  );
}
