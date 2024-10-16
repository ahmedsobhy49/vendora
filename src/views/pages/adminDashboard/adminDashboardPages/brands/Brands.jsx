import React, { useEffect, useState } from "react";
import DashboardContainer from "../../../../../common/DashboardContainer";
import { LuUploadCloud } from "react-icons/lu";
import ScrollToTopOnPaginate from "../../../../../common/ScrollToTopOnPaginate";
import Pagination from "../../../../../common/Pagination";
import api from "../../../../../api/api";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  async function getAllBrands() {
    const res = await api.get("/brand/all-brands");
    setBrands(res.data.brands);
  }

  async function getAllCategoris() {
    const res = await api.get("/category/first-two-levels-categories");
    setCategories(res.data.categories);
  }

  useEffect(() => {
    getAllBrands();
    getAllCategoris();
  }, []);
  return (
    <DashboardContainer>
      <div className="flex flex-col gap-5 xl:flex-row h-full">
        <div className="xl:w-3/5 w-full">
          <BrandsTable brands={brands} setBrands={setBrands} />
        </div>
        <div className="xl:w-2/5 w-full flex">
          <div className="w-full rounded-lg flex flex-col">
            <BrandsForm getAllBrands={getAllBrands} categories={categories} />
          </div>
        </div>
      </div>
    </DashboardContainer>
  );
}
function BrandsTable({ brands, setBrands }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesNum, setEntriesNum] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const allEntriesNum = brands.length;
  const numberOfPages = Math.ceil(allEntriesNum / entriesNum);
  const showingFrom = entriesNum * (currentPage - 1);
  const showingTo =
    entriesNum * (currentPage - 1) + entriesNum < allEntriesNum
      ? entriesNum * (currentPage - 1) + entriesNum
      : allEntriesNum;

  return (
    <>
      <ScrollToTopOnPaginate pageState={currentPage} />
      <div>
        <BrandsTableHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setCurrentPage={setCurrentPage}
          brands={brands}
          setBrands={setBrands}
        />
        <DisktopTable
          showingFrom={showingFrom}
          showingTo={showingTo}
          searchQuery={searchQuery}
          brands={brands}
        />
        <Pagination
          numberOfPages={numberOfPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          showingFrom={showingFrom}
          showingTo={showingTo}
          totalEntries={allEntriesNum}
        />
      </div>
    </>
  );
}

function BrandsForm({ getAllBrands, categories }) {
  const categoryOptions = categories.flatMap((category) => [
    { label: category.name, value: category._id }, // Main category
    ...category.subcategories.map((subcategory) => ({
      label: subcategory.name, // Displaying hierarchy
      value: subcategory._id,
    })),
  ]);

  const formik = useFormik({
    initialValues: {
      name: "",
      logo: null,
      categoryIds: [], // Add categoryIds field to formik
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Brand name is required"),
      logo: Yup.mixed()
        .required("Logo is required")
        .test("fileType", "Unsupported File Format", (value) => {
          return (
            value &&
            (value.type === "image/jpeg" ||
              value.type === "image/png" ||
              value.type === "image/webp")
          );
        }),
      categoryIds: Yup.array().min(1, "At least one category must be selected"),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("logo", values.logo);
      formData.append("categoryIds", values.categoryIds.join(",")); // Send category IDs as a comma-separated string

      try {
        const res = await api.post("/brand/add-brand", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(res);
        formik.resetForm();
        formik.setFieldValue("categoryIds", []);
        getAllBrands();
      } catch (error) {
        console.error(
          "Error uploading image:",
          error.response ? error.response.data : error.message
        );
      }
    },
  });

  return (
    <form
      className="w-full bg-white shadow-md p-4 rounded-lg flex-grow"
      onSubmit={formik.handleSubmit}
    >
      <div className="flex flex-wrap -mx-3 mb-6 xl:mb-0">
        <div className="w-full md:w-full px-3 mb-6">
          <label
            className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
            htmlFor="category_name"
          >
            Brand Name
          </label>
          <input
            className={`appearance-none block w-full bg-white text-gray-900 font-medium border rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-black ${
              formik.touched.name && formik.errors.name
                ? "border-red-500"
                : "border-gray-400"
            }`}
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Brand Name"
          />
          {formik.touched.name && formik.errors.name ? (
            <p className="text-red-500 text-xs italic mt-1">
              {formik.errors.name}
            </p>
          ) : null}
        </div>

        <div className="w-full md:w-full px-3 mb-6">
          <Select
            isMulti
            name="categories"
            options={categoryOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Select categories"
            value={categoryOptions.filter((option) =>
              formik.values.categoryIds.includes(option.value)
            )}
            onChange={(selectedOptions) => {
              formik.setFieldValue(
                "categoryIds",
                selectedOptions ? selectedOptions.map((opt) => opt.value) : []
              );
            }}
            onBlur={formik.handleBlur}
          />
          {formik.touched.categoryIds && formik.errors.categoryIds ? (
            <p className="text-red-500 text-xs italic mt-1">
              {formik.errors.categoryIds}
            </p>
          ) : null}
        </div>
        <div className="w-full px-3 mb-8">
          <label
            className="mx-auto cursor-pointer flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-black bg-white p-6 lg:py-36 text-center"
            htmlFor="brand-logo"
          >
            <LuUploadCloud size={50} color="#000" />
            <h2 className="mt-4 text-xl font-medium text-gray-700 tracking-wide">
              Brand Logo
            </h2>
            <p className="mt-2 text-gray-500 tracking-wide">
              Upload your file SVG, PNG, JPG or GIF.
            </p>
            <input
              id="brand-logo"
              type="file"
              className="hidden"
              name="logo"
              accept="image/png, image/jpeg, image/webp"
              onChange={(event) => {
                formik.setFieldValue("logo", event.currentTarget.files[0]);
              }}
              onBlur={formik.handleBlur}
            />
            {formik.touched.logo && formik.errors.logo ? (
              <p className="text-red-500 text-xs italic mt-1">
                {formik.errors.logo}
              </p>
            ) : null}
            {formik.values.logo ? (
              <p className="text-green-500 text-xs italic mt-1">
                Logo uploaded
              </p>
            ) : null}
          </label>
        </div>

        <div className="w-full md:w-full px-3">
          <button
            type="submit"
            className="block w-full bg-black text-gray-100 font-bold border border-gray-200 rounded-lg p-3 leading-tight hover:bg-slate-800 focus:outline-none"
          >
            Add Brand
          </button>
        </div>
      </div>
    </form>
  );
}

function DisktopTable({ showingFrom, showingTo, brands }) {
  return (
    <div className="overflow-auto bg-white rounded-lg">
      <table className="table min-w-full">
        <thead>
          <tr>
            <th className="py-4 px-4">Logo</th>
            <th className="py-4 px-4">Name</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {brands?.length ? (
            brands.slice(showingFrom, showingTo).map((brand) => (
              <tr
                key={brand._id}
                className="hover:bg-gray-100 first:border-t-4"
              >
                <td className="text-center py-[1.12rem] px-4">
                  <div className="w-12 mx-auto md:w-16 xl:w-20 rounded-full">
                    <img
                      src={`http://localhost:8000${brand.logo}`}
                      alt="category"
                      className="w-full aspect-square rounded-full border-4 shadow-lg"
                    />
                  </div>
                </td>
                <td className="text-center py-[1.12rem] px-4">
                  <span className="py-2 px-3 rounded-3xl capitalize">
                    {brand.name}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr className="border-t-4">
              <td colSpan={4}>
                <div className="flex justify-center">
                  <p className="text-center p-12 text-gray-500 text-lg">
                    No Result
                  </p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function BrandsTableHeader({
  searchQuery,
  setSearchQuery,
  brands,
  setBrands,
  setCurrentPage,
}) {
  return (
    <div>
      <div className="w-full">
        <input
          type="search"
          className="w-full px-4 py-2 rounded-lg mb-2 outline-none  md:py-3"
          placeholder="Search category by Name..."
          value={searchQuery}
          onChange={(e) => {
            const query = e.target.value;
            setSearchQuery(query);

            // Filter using allParentCategories (original data)
            const filteredData = brands.filter((brand) => {
              return brand.name.toLowerCase().includes(query.toLowerCase());
            });

            setBrands(filteredData); // Update the filtered categories
            setCurrentPage(1); // Reset the pagination
          }}
        />
      </div>
    </div>
  );
}
