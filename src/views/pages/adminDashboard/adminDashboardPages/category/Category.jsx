import React, { useEffect, useState } from "react";
import DashboardContainer from "../../../../../common/DashboardContainer";
import { LuUploadCloud } from "react-icons/lu";
import ScrollToTopOnPaginate from "../../../../../common/ScrollToTopOnPaginate";
import Pagination from "../../../../../common/Pagination";
import { Link } from "react-router-dom";
import { GrView } from "react-icons/gr";
import api from "../../../../../api/api";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Category() {
  const [parentCategories, setParentCategories] = useState([]);
  const [allParentCategories, setAllParentCategories] = useState([]); // Holds the original data

  async function getAllParentCategories() {
    const res = await api.get("/category/all-parent-categories");
    setParentCategories(res.data.categories);
    setAllParentCategories(res.data.categories); // Store the original data here
  }

  useEffect(() => {
    getAllParentCategories();
  }, []);

  return (
    <DashboardContainer>
      <div className="flex flex-col gap-5 xl:flex-row h-full">
        <div className="xl:w-3/5 w-full">
          <CategoriesTable
            parentCategories={parentCategories}
            setParentCategories={setParentCategories}
            allParentCategories={allParentCategories} // Pass the original data
          />
        </div>
        <div className="xl:w-2/5 w-full flex">
          <div className="w-full rounded-lg flex flex-col">
            <CategoryForm getAllParentCategories={getAllParentCategories} />
          </div>
        </div>
      </div>
    </DashboardContainer>
  );
}
function CategoriesTable({
  parentCategories,
  setParentCategories,
  allParentCategories,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesNum, setEntriesNum] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const allEntriesNum = parentCategories.length;
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
        <CategoriesTableHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          allParentCategories={allParentCategories} // Pass original data here
          setParentCategories={setParentCategories}
          setCurrentPage={setCurrentPage}
        />
        <DisktopTable
          showingFrom={showingFrom}
          showingTo={showingTo}
          searchQuery={searchQuery}
          parentCategories={parentCategories}
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
function CategoryForm({ getAllParentCategories }) {
  const formik = useFormik({
    initialValues: {
      name: "",
      image: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Category name is required"),
      image: Yup.mixed()
        .required("Image is required")
        .test("fileType", "Unsupported File Format", (value) => {
          return (
            value &&
            (value.type === "image/jpeg" ||
              value.type === "image/png" ||
              value.type === "image/webp")
          );
        }),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("image", values.image);

      try {
        const res = await api.post("/category/add/category", formData);
        console.log(res);
        formik.resetForm();
        getAllParentCategories();
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
      <div className="flex flex-wrap -mx-3 mb-6 xl:mb-0 ">
        <div className="w-full md:w-full px-3 mb-6">
          <label
            className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
            htmlFor="category_name"
          >
            Category Name
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
            placeholder="Category Name"
          />
          {formik.touched.name && formik.errors.name ? (
            <p className="text-red-500 text-xs italic mt-1">
              {formik.errors.name}
            </p>
          ) : null}
        </div>

        <div className="w-full px-3 mb-8">
          <label
            className="mx-auto cursor-pointer flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-black bg-white p-6 lg:py-36 text-center"
            htmlFor="dropzone-file"
          >
            <LuUploadCloud size={50} color="#000" />
            <h2 className="mt-4 text-xl font-medium text-gray-700 tracking-wide">
              Category image
            </h2>
            <p className="mt-2 text-gray-500 tracking-wide">
              Upload your file SVG, PNG, JPG or GIF.
            </p>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              name="image"
              accept="image/png, image/jpeg, image/webp"
              onChange={(event) => {
                formik.setFieldValue("image", event.currentTarget.files[0]);
              }}
              onBlur={formik.handleBlur}
            />
            {formik.touched.image && formik.errors.image ? (
              <p className="text-red-500 text-xs italic mt-1">
                {formik.errors.image}
              </p>
            ) : null}
            {formik.values.image ? (
              <p className="text-green-500 text-xs italic mt-1">
                image uploaded
              </p>
            ) : null}
          </label>
        </div>
        <div className="w-full md:w-full px-3 ">
          <button
            type="submit"
            className="block w-full bg-black text-gray-100 font-bold border border-gray-200 rounded-lg p-3 leading-tight hover:bg-slate-800 focus:outline-none"
          >
            Add Category
          </button>
        </div>
      </div>
    </form>
  );
}

function DisktopTable({ showingFrom, showingTo, parentCategories }) {
  return (
    <div className="overflow-auto bg-white rounded-lg">
      <table className="table min-w-full">
        <thead>
          <tr>
            <th className="py-4 px-4">Image</th>
            <th className="py-4 px-4">Name</th>
            <th className="py-4 px-4">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {parentCategories?.length ? (
            parentCategories.slice(showingFrom, showingTo).map((category) => (
              <tr
                key={category._id}
                className="hover:bg-gray-100 first:border-t-4"
              >
                <td className="text-center py-[1.12rem] px-4">
                  <div className="w-12 mx-auto md:w-16 xl:w-20 rounded-full">
                    <img
                      src={`http://localhost:8000${category.image}`}
                      alt="category"
                      className="w-full aspect-square rounded-full border-4 shadow-lg"
                    />
                  </div>
                </td>
                <td className="text-center py-[1.12rem] px-4">
                  <span className="py-2 px-3 rounded-3xl capitalize">
                    {category.name}
                  </span>
                </td>
                <td className="text-center py-[1.12rem] px-4">
                  <Link
                    to={`/admin/dashboard/category/${category._id}`}
                    state={category}
                    className="text-green-500 text-center flex items-center justify-center"
                  >
                    <GrView size={25} />
                  </Link>
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

function CategoriesTableHeader({
  searchQuery,
  setSearchQuery,
  allParentCategories,
  setParentCategories,
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
            const filteredData = allParentCategories.filter((category) => {
              return category.name.toLowerCase().includes(query.toLowerCase());
            });

            setParentCategories(filteredData); // Update the filtered categories
            setCurrentPage(1); // Reset the pagination
          }}
        />
      </div>
    </div>
  );
}
