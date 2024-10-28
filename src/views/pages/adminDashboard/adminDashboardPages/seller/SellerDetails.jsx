import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardContainer from "../../../../../common/DashboardContainer";
import { FaUserTie } from "react-icons/fa6";
import { FaShopLock } from "react-icons/fa6";
import Select from "react-select";
import { useFormik } from "formik";
import { FaCheck } from "react-icons/fa";
import * as Yup from "yup";
import api from "../../../../../api/api";
export default function SellerDetails() {
  const seller = useLocation().state;
  console.log(seller);
  function createStatusClasses(state) {
    switch (state?.toLowerCase()) {
      case "pending":
        return "bg-[#FEF2E5] text-[#CD6200]";
      case "canceled ":
        return "bg-[#FBE7E8] text-[#A30D11]";
      case "Delivered":
        return "bg-[#EBF9F1] text-[#1F9254]";
      default:
        return "";
    }
  }

  return (
    <DashboardContainer>
      <div className="custom-hight lg:flex lg:justify-center lg:items-center">
        <div>
          <div className="grid gird-cols-1 xl:grid-cols-7 gap-4 sm:w-2/3 mx-auto md:w-full">
            <div className="col-span-1">
              <SellerImage image={seller?.image} />
            </div>
            <div className="xl:col-span-3">
              <SellerInfoCard
                name={seller?.firstName + " " + seller?.lastName}
                email={seller?.email}
                role={seller?.role}
                status={seller?.status}
                phone={seller?.phone}
                createStatusClasses={createStatusClasses}
              />
            </div>
            <div className="xl:col-span-3 r">
              <ShopInfoCard
                shopName={seller?.businessInfo?.companyName}
                street={seller?.address?.street}
                city={seller?.address?.city}
                state={seller?.address?.state}
                country={seller?.address?.country}
                registrationNumber={seller?.businessInfo?.registrationNumber}
                taxId={seller?.businessInfo?.taxId}
              />
            </div>
          </div>
          <SellerStatusAction seller={seller} />
        </div>
      </div>
    </DashboardContainer>
  );
}

function SellerImage({ image }) {
  return (
    <div className="w-40 mx-auto xl:w-auto">
      <img
        src={`http://localhost:8000${image}`}
        alt="seller-image"
        className="h-full w-full aspect-square rounded-full"
      />
    </div>
  );
}

function SellerInfoCard({
  name,
  email,
  role,
  status,
  paymentStatus,
  phone,
  createStatusClasses,
}) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex items-center gap-4">
        <p>
          <FaUserTie size={15} color="#949494" />
        </p>
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Seller Info
        </h3>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 flex items-center justify-between px-4 py-4 lg:py-5 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-6">
            <dt className="text-sm sm:text-[1rem] font-medium text-gray-500">
              Name
            </dt>
            <dd className="capitalize text-sm sm:text-[1rem] text-gray-900 sm:col-span-2">
              {name}
            </dd>
          </div>
          <div className="flex items-center justify-between px-4 py-4 lg:py-5 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-6">
            <dt className="text-sm sm:text-[1rem] font-medium text-gray-500">
              Email adress
            </dt>
            <dd className="capitalize text-sm sm:text-[1rem] text-gray-900 sm:col-span-2">
              {email}
            </dd>
          </div>
          <div className="bg-gray-50 flex items-center justify-between px-4 py-4 lg:py-5 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-6">
            <dt className="text-sm sm:text-[1rem] font-medium text-gray-500">
              Role
            </dt>
            <dd className="capitalize text-sm sm:text-[1rem] text-gray-900 sm:col-span-2">
              {role}
            </dd>
          </div>
          <div className="flex items-center justify-between px-4 py-4 lg:py-5 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-6">
            <dt className="text-sm sm:text-[1rem] font-medium text-gray-500">
              Status
            </dt>
            <dd
              className={`capitalize text-sm sm:text-[1rem] text-gray-900 sm:col-span-2 `}
            >
              <span
                className={`py-1 px-3 rounded-3xl capitalize ${createStatusClasses(
                  status
                )}`}
              >
                {status}
              </span>
            </dd>
          </div>
          <div className="bg-gray-50 flex items-center justify-between px-4 py-4 lg:py-5 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-6">
            <dt className="text-sm sm:text-[1rem] font-medium text-gray-500">
              Phone No.
            </dt>
            <dd className="capitalize text-sm sm:text-[1rem] text-gray-900 sm:col-span-2">
              {phone}
            </dd>
          </div>
          <div className=" flex items-center justify-between px-4 py-4 lg:py-5 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-6">
            <dt className="text-sm sm:text-[1rem] font-medium text-gray-500">
              Payment status
            </dt>
            <dd className="capitalize text-sm sm:text-[1rem] text-gray-900 sm:col-span-2">
              {paymentStatus}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

function ShopInfoCard({
  shopName,
  city,
  state,
  country,
  registrationNumber,
  taxId,
}) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg min-h-full">
      <div className="px-4 py-5 sm:px-6 flex items-center gap-4">
        <p>
          <FaShopLock size={15} color="#949494" />
        </p>
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Business Info
        </h3>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 flex items-center justify-between px-4 py-4 lg:py-5 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-6">
            <dt className="text-sm sm:text-[1rem] font-medium text-gray-500">
              Shop name
            </dt>
            <dd className="capitalize text-sm sm:text-[1rem] text-gray-900 sm:col-span-2">
              {shopName}
            </dd>
          </div>
          <div className="flex items-center justify-between px-4 py-4 lg:py-5 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-6">
            <dt className="text-sm sm:text-[1rem] font-medium text-gray-500">
              Registration Number
            </dt>
            <dd className="capitalize text-sm sm:text-[1rem] text-gray-900 sm:col-span-2">
              {registrationNumber}
            </dd>
          </div>
          <div className="bg-gray-50 flex items-center justify-between px-4 py-4 lg:py-5 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-6">
            <dt className="text-sm sm:text-[1rem] font-medium text-gray-500">
              Tax Id
            </dt>
            <dd className="capitalize text-sm sm:text-[1rem] text-gray-900 sm:col-span-2">
              {taxId}
            </dd>
          </div>
          <div className="flex items-center justify-between px-4 py-4 lg:py-5 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-6">
            <dt className="text-sm sm:text-[1rem] font-medium text-gray-500">
              Country
            </dt>
            <dd className="capitalize text-sm sm:text-[1rem] text-gray-900 sm:col-span-2">
              {country}
            </dd>
          </div>
          <div className="bg-gray-50  flex items-center justify-between px-4 py-4 lg:py-5 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-6">
            <dt className="text-sm sm:text-[1rem] font-medium text-gray-500">
              State
            </dt>
            <dd className="capitalize text-sm sm:text-[1rem] text-gray-900 sm:col-span-2">
              {state}
            </dd>
          </div>
          <div className=" flex items-center justify-between px-4 py-4 lg:py-5 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-6">
            <dt className="text-sm sm:text-[1rem] font-medium text-gray-500">
              City
            </dt>
            <dd className="capitalize text-sm sm:text-[1rem] text-gray-900 sm:col-span-2">
              {city}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

function SellerStatusAction({ seller }) {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      status: "",
    },
    validationSchema: Yup.object({
      status: Yup.string().required("Seller status must be selected"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await api.patch(
          `/sellers/${seller?._id}/status`,
          {
            status: values.status,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        formik.resetForm();
        if (values.status === "active") {
          navigate("/admin/dashboard/sellers");
        } else if (values.status === "inactive") {
          navigate("/admin/dashboard/deactive-seller");
        }
      } catch (error) {
        console.error(
          "Error updating seller status:",
          error.response ? error.response.data : error.message
        );
      }
    },
  });

  const statusOptions = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ];

  return (
    <form
      onSubmit={formik.handleSubmit} // Attach formik.handleSubmit to onSubmit
      className="flex items-end justify-end w-full sm:w-2/3 md:w-full xl:w-1/3 xl:ml-auto xl:mx-0 mt-6 mx-auto gap-1"
    >
      <div className="w-full">
        <label
          className="block tracking-wide text-gray-700 text-sm font-bold mb-2"
          htmlFor="status"
        >
          Change Seller Status to
        </label>
        <Select
          id="status"
          name="status"
          options={statusOptions}
          className="basic-single-select capitalize"
          classNamePrefix="select"
          placeholder="Select a status"
          value={statusOptions.find(
            (option) => option.value === formik.values.status
          )}
          onChange={(selectedOption) =>
            formik.setFieldValue("status", selectedOption.value)
          }
          onBlur={formik.handleBlur}
        />
        {formik.touched.status && formik.errors.status ? (
          <p className="text-red-500 text-xs italic mt-1">
            {formik.errors.status}
          </p>
        ) : null}
      </div>
      <button
        type="submit"
        className="flex justify-end text-white p-3 bg-green-400"
      >
        <FaCheck />
      </button>
    </form>
  );
}
