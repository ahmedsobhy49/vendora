import { useFormik } from "formik";
import React, { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useQuery } from "react-query";
import * as Yup from "yup";
import { authService } from "../../services/auth/auth";
import api from "../../api/api";

export default function Addresses() {
  const [isOpenAdressModal, setIsOpenAdressModal] = useState(false);

  const token = authService.getToken();

  const { data: userInfo } = useQuery(
    ["user", token],
    authService.fetchUserInfo,
    {
      enabled: !!token, // This will evaluate to false if token is null, undefined, or an empty string
    }
  );

  const { data: userAdresses } = useQuery(
    ["adresses", token],
    () => api.get(`/address/${userInfo?.user?._id}`), // Assuming userId is stored in the userInfo object from the user's API response. Replace with actual userId if necessary.
    {
      enabled: !!userInfo, // This will evaluate to false if token is null, undefined, or an empty string
    }
  );

  function handleCancelAddNewAddress() {
    setIsOpenAdressModal(false);
  }

  async function handleSaveAddNewAddress(values) {
    try {
      const res = await api.post("/address", {
        userId: userInfo?.user._id, // Assuming userId is stored in the userInfo object from the user's API response. Replace with actual userId if necessary.
        ...values,
      });
      console.log(res);
      setIsOpenAdressModal(false);
    } catch (error) {
      console.log(error);
    }
  }
  console.log(userAdresses);

  return (
    <div className="rounded-md flex items-center justify-center  lg:block hide-scrollbar  overflow-y-auto custom-user-layout-height custom-user-max-layout-height">
      {!isOpenAdressModal && (
        <div className="w-full   p-10 ">
          <button
            onClick={() => setIsOpenAdressModal(true)}
            className="text-blue-500 font-semibold mb-4 flex items-center  ms-auto text-xl gap-2"
          >
            <span className="">Add New Address </span>
            <IoMdAddCircleOutline size={22} />
          </button>
          <div
            className={`grid grid-cols-1 ${
              userAdresses?.data?.address?.length > 1
                ? "2xl:grid-cols-2 "
                : "2xl:grid-cols-1"
            } lg:grid-cols-1 gap-4 `}
          >
            {userAdresses?.data?.address?.map((address) => {
              return (
                <div
                  className="w-full mx-auto bg-white border border-gray-200 shadow-sm rounded-lg p-6 hover:shadow-lg transition"
                  key={address?._id}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        Home Address
                      </h3>
                      <p className="text-sm text-gray-500">Primary Address</p>
                    </div>
                    <span className="px-3 py-1 text-sm text-blue-700 bg-blue-100 rounded-full">
                      Default
                    </span>
                  </div>

                  <div className="my-4 border-t border-gray-200"></div>

                  <div className="space-y-2">
                    <p className=" flex justify-between capitalize">
                      <span className=" text-gray-500 font-semibold">
                        Building Number:
                      </span>
                      <span> {address?.buildingNumber} </span>
                    </p>
                    <p className=" flex justify-between capitalize">
                      <span className=" text-gray-500 font-semibold">
                        Street:
                      </span>
                      <span> {address?.street}</span>
                    </p>
                    <p className=" flex justify-between capitalize">
                      <span className="text-gray-500 font-semibold">City:</span>
                      <span> {address?.city} </span>
                    </p>
                    <p className=" flex justify-between capitalize">
                      <span className=" text-gray-500 font-semibold">
                        State:
                      </span>
                      <span className="uppercase"> {address?.state} </span>
                    </p>
                    <p className=" flex justify-between capitalize">
                      <span className=" text-gray-500 font-semibold">Zip:</span>
                      <span> {address?.zip} </span>
                    </p>
                    <p className=" flex justify-between capitalize">
                      <span className=" text-gray-500 font-semibold">
                        Country:
                      </span>
                      <span className="uppercase"> {address?.country} </span>
                    </p>
                  </div>
                  {/* <div className="space-y-2">
                    <p className="text-gray-800">
                      {address?.buildingNumber} {address?.street}
                    </p>
                    <p className="text-gray-800">
                      {address?.city}, {address?.state} {address?.zip}
                    </p>
                    <p className="text-gray-800">{address?.country}</p>
                  </div> */}

                  <div className="my-4 border-t border-gray-200"></div>

                  <div className="flex justify-end gap-4">
                    <button className="py-2 px-4 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition">
                      Edit
                    </button>
                    <button className="py-2 px-4 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition">
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {isOpenAdressModal && (
        <AddNewAddress
          handleCancelAddNewAddress={handleCancelAddNewAddress}
          handleSaveAddNewAddress={handleSaveAddNewAddress}
        />
      )}
    </div>
  );
}

function AddNewAddress({ handleCancelAddNewAddress, handleSaveAddNewAddress }) {
  const initialValues = {
    buildingNumber: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zip: "",
  };

  const validationSchema = Yup.object({
    buildingNumber: Yup.string().required("Building Number is required"),
    street: Yup.string().required("Street is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    country: Yup.string().required("Country is required"),
    zip: Yup.string().required("Zip is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSaveAddNewAddress,
  });

  return (
    <div className="w-full bg-white shadow-md p-10 flex lg:mt-10 items-center justify-center lg:block">
      <div className="w-full">
        <div className="flex items-center mb-6">
          <div className="w-6 h-6 rounded-full border-4 border-blue-500 flex items-center justify-center mr-2 ">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          </div>
          <h2 className="text-xl font-semibold text-gray-800">
            Add New Address
          </h2>
        </div>
        <form className="flex flex-col gap-2" onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-1">
            <label className="block text-gray-500 mb-1">Building No.</label>
            <input
              placeholder="12"
              name="buildingNumber"
              onChange={formik.handleChange}
              type="text"
              value={formik.values.buildingNumber}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.errors.buildingNumber && formik.touched.buildingNumber && (
              <p className="text-xs text-red-500">
                {formik.errors.buildingNumber}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="block text-gray-500 mb-1">Street</label>
            <input
              name="street"
              placeholder="Main Street"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.street}
              type="text"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.errors.street && formik.touched.street && (
              <p className="text-xs text-red-500">{formik.errors.street}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="block text-gray-500 mb-1">City</label>
            <input
              placeholder="Brooklyn"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.errors.city && formik.touched.city && (
              <p className="text-xs text-red-500">{formik.errors.city}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="block text-gray-500 mb-1">State</label>
            <input
              name="state"
              placeholder="NYC"
              type="text"
              value={formik.values.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.errors.state && formik.touched.state && (
              <p className="text-xs text-red-500">{formik.errors.state}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="block text-gray-500 mb-1">Country</label>
            <input
              placeholder="USA"
              name="country"
              type="text"
              value={formik.values.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.errors.country && formik.touched.country && (
              <p className="text-xs text-red-500">{formik.errors.country}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="block text-gray-500 ">Zip</label>
            <input
              type="text"
              name="zip"
              placeholder="123"
              value={formik.values.zip}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.errors.zip && formik.touched.zip && (
              <p className="text-xs text-red-500">{formik.errors.zip}</p>
            )}
          </div>
          <div className="flex justify-between mt-10 ">
            <button
              onClick={handleCancelAddNewAddress}
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save This Address
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
