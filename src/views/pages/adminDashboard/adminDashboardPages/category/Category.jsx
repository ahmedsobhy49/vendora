import React, { useState } from "react";
import DashboardContainer from "../../../../../common/DashboardContainer";
import { LuUploadCloud } from "react-icons/lu";
import ScrollToTopOnPaginate from "../../../../../common/ScrollToTopOnPaginate";
import Pagination from "../../../../../common/Pagination";
import { Link } from "react-router-dom";
import { GrView } from "react-icons/gr";
import api from "../../../../../api/api";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useQuery, useQueryClient } from "react-query";
import getAllParentCategories from "../../../../../services/category/getAllParentCategories";

export default function Category() {
  const queryClient = useQueryClient();
  const [parentCategoriesState, setParentCategoriesState] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: parentCategories } = useQuery(
    ["parentCategories"],
    getAllParentCategories,
    {
      onSuccess: (fetchedData) => {
        setParentCategoriesState(fetchedData.data.categories);
      },
    }
  );

  function handleSearch(query) {
    setSearchQuery(query);

    if (parentCategories) {
      const filteredData = parentCategories.data.categories.filter((category) =>
        category.name.toLowerCase().includes(query.toLowerCase())
      );
      setParentCategoriesState(filteredData);
    }
  }

  const handleCategoryAdd = async (newCategoryData) => {
    await api.post("/category", newCategoryData);
    queryClient.invalidateQueries("parentCategories"); // Trigger refetch
  };

  return (
    <DashboardContainer>
      <div className="flex flex-col gap-5 xl:flex-row h-full">
        <div className="xl:w-3/5 w-full">
          <CategoriesTable
            parentCategoriesState={parentCategoriesState}
            searchQuery={searchQuery}
            onSearch={handleSearch}
          />
        </div>
        <div className="xl:w-2/5 w-full flex">
          <div className="w-full rounded-lg flex flex-col">
            <CategoryForm handleCategoryAdd={handleCategoryAdd} />
          </div>
        </div>
      </div>
    </DashboardContainer>
  );
}

function CategoriesTable({ parentCategoriesState, searchQuery, onSearch }) {
  const [entriesNum, setEntriesNum] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const allEntriesNum = parentCategoriesState.length;
  const numberOfPages = Math.ceil(allEntriesNum / entriesNum);
  const showingFrom = entriesNum * (currentPage - 1);
  const showingTo =
    entriesNum * currentPage < allEntriesNum
      ? entriesNum * currentPage
      : allEntriesNum;

  return (
    <>
      <ScrollToTopOnPaginate pageState={currentPage} />
      <div>
        <CategoriesTableHeader
          searchQuery={searchQuery}
          onSearch={onSearch}
          setCurrentPage={setCurrentPage}
        />
        <DisktopTable
          showingFrom={showingFrom}
          showingTo={showingTo}
          parentCategoriesState={parentCategoriesState}
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

function CategoriesTableHeader({ searchQuery, onSearch, setCurrentPage }) {
  return (
    <div className="w-full">
      <input
        type="search"
        className="w-full px-4 py-2 rounded-lg mb-2 outline-none md:py-3"
        placeholder="Search category by Name..."
        value={searchQuery}
        onChange={(e) => {
          onSearch(e.target.value);
          setCurrentPage(1); // Reset pagination to page 1
        }}
      />
    </div>
  );
}

function DisktopTable({ showingFrom, showingTo, parentCategoriesState }) {
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
          {parentCategoriesState?.length ? (
            parentCategoriesState
              .slice(showingFrom, showingTo)
              .map((category) => (
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

function CategoryForm({ handleCategoryAdd }) {
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
      console.log(formData);
      try {
        await handleCategoryAdd(formData); // Call the parent function to add category
        formik.resetForm();
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

            {formik.values.image ? (
              <p className="text-green-500 text-sm italic mt-1">
                image uploaded
              </p>
            ) : (
              <p className="mt-2 text-gray-500 tracking-wide">
                Click to upload your image
              </p>
            )}

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
          </label>
        </div>

        <div className="w-full px-3">
          <button
            type="submit"
            className="appearance-none block w-full bg-black text-white font-medium border rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-gray-500"
          >
            Add Category
          </button>
        </div>
      </div>
    </form>
  );
}
