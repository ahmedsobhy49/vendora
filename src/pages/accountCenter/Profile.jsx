import React, { useEffect, useRef, useState } from "react";
import AppContainer from "../../common/AppContainer";
import { MdOutlineEdit } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { FaMale, FaFemale } from "react-icons/fa";
import { authService } from "../../services/auth/auth";
import { useQuery } from "react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../api/api";

export default function Profile() {
  const token = authService.getToken();

  // Fetch user information
  const { data: userInfo, isLoading } = useQuery(
    ["user", token],
    authService.fetchUserInfo,
    {
      enabled: !!token,
    }
  );

  // Yup validation schema
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Hold up, this field is required"),
    lastName: Yup.string().required("Hold up, this field is required"),
    phone: Yup.string().required("Hold up, this field is required"),
    gender: Yup.string(),
  });

  const [activeGender, setActiveGender] = useState("");
  const [isEdit, setIsEdit] = useState({
    firstName: false,
    lastName: false,
    phone: false,
  });
  const [currentlyEditing, setCurrentlyEditing] = useState(null);

  const inputRefs = {
    firstName: useRef(null),
    lastName: useRef(null),
    phone: useRef(null),
  };

  // Formik setup
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      gender: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await api.put("/user/update-user-info", {
          id: userInfo?.user?._id,
          ...values,
        });
        setIsEdit({ firstName: false, lastName: false, phone: false });
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    },
  });

  // Update form values when userInfo is fetched
  useEffect(() => {
    if (userInfo?.user) {
      formik.setValues({
        firstName: userInfo.user.firstName || "",
        lastName: userInfo.user.lastName || "",
        phone: userInfo.user.phone || "",
        gender: userInfo.user.gender || "",
      });
      setActiveGender(userInfo.user.gender || "");
    }
  }, [userInfo]);

  // Automatically focus on the input when editing
  useEffect(() => {
    if (currentlyEditing && inputRefs[currentlyEditing]?.current) {
      inputRefs[currentlyEditing].current.focus();
    }
  }, [currentlyEditing]);

  // Check if there are changes to the form values
  const hasChanges =
    formik.values.firstName !== userInfo?.user?.firstName ||
    formik.values.lastName !== userInfo?.user?.lastName ||
    formik.values.phone !== userInfo?.user?.phone ||
    formik.values.gender !== userInfo?.user?.gender;

  // Handle click for editing
  const handleEditClick = (inputName) => {
    setIsEdit((prevState) => ({ ...prevState, [inputName]: true }));
    setCurrentlyEditing(inputName);
  };

  // Render gender selection (adjusted for responsive design)
  const renderGenderSelection = () => (
    <div className="flex flex-col gap-2 lg:flex-1 mb-8">
      <h2 className="text-lg font-semibold">Gender</h2>
      <div className="flex space-x-4">
        <button
          type="button"
          className={`flex items-center px-4 py-2 border rounded-full ${
            activeGender === "male"
              ? "bg-blue-200 border-blue-600 text-blue-800"
              : "border-gray-300"
          }`}
          onClick={() => {
            setActiveGender("male");
            formik.setFieldValue("gender", "male");
          }}
        >
          <FaMale />
          Male
        </button>
        <button
          type="button"
          className={`flex items-center px-4 py-2 border rounded-full ${
            activeGender === "female"
              ? "bg-pink-200 border-pink-600 text-pink-800"
              : "border-gray-300"
          }`}
          onClick={() => {
            setActiveGender("female");
            formik.setFieldValue("gender", "female");
          }}
        >
          <FaFemale />
          Female
        </button>
      </div>
    </div>
  );

  // Render input field with Edit button
  const renderInputField = (name, label) => (
    <div className="flex flex-col lg:gap-2 lg:flex-1 mb-8">
      <h2 className="text-lg font-semibold">{label}</h2>
      <div className=" flex justify-between items-end lg:gap-2 lg:grid lg:grid-cols-12">
        <div className="lg:col-span-11">
          <input
            ref={inputRefs[name]}
            name={name}
            type="text"
            value={formik.values[name]}
            disabled={!isEdit[name]}
            className={`w-full bg-transparent lg:bg-gray-200 lg:px-4 lg:py-3 lg:border lg:border-gray-400 lg:rounded-lg ${
              isEdit[name] ? "border-gray-600" : "border-transparent"
            } outline-none`}
            onChange={formik.handleChange}
          />
        </div>
        {formik.errors[name] && formik.touched[name] && (
          <p className="text-xs text-red-600">{formik.errors[name]}</p>
        )}
        <div className="lg:col-span-1">
          {userInfo?.user[name] ? (
            <MdOutlineEdit
              size={25}
              color="#ccc"
              className="cursor-pointer"
              onClick={() => handleEditClick(name)}
            />
          ) : (
            <button
              type="button"
              className="text-blue-600 flex items-center gap-2"
              onClick={() => handleEditClick(name)}
            >
              Add <GoPlus />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="rounded-md custom-user-layout-height flex items-center justify-center lg:block lg:mt-4">
      <div className="w-full bg-white shadow-md p-10 ">
        <form className="flex flex-col" onSubmit={formik.handleSubmit}>
          <h1 className="text-2xl font-bold mb-6">Profile Info</h1>
          <div className="mb-8 ">
            <h2 className="text-lg font-semibold">Email</h2>

            <p className="text-gray-700">{userInfo?.user?.email}</p>

            <p className="text-xs text-gray-500 mt-1">
              You can't change your email
            </p>
          </div>

          {/* Editable Fields */}
          <div className="flex flex-col lg:flex-row  lg:gap-8">
            {renderInputField("firstName", "First Name")}
            {renderInputField("lastName", "Last Name")}
          </div>
          <div className="flex flex-col lg:flex-row lg:gap-8 ">
            {renderInputField("phone", "Phone Number")}
            {renderGenderSelection()}
          </div>

          {/* Submit Button */}
          <button
            className="w-full py-3 bg-gray-200 text-gray-500 rounded-md cursor-pointer disabled:cursor-not-allowed"
            type="submit"
            disabled={!hasChanges}
          >
            UPDATE PROFILE
          </button>
        </form>
      </div>
    </div>
  );
}
