import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../../common/Input";
import Button from "../../../common/Button";
import FieldError from "../../../common/FieldError";
import { Link, useNavigate } from "react-router-dom";
import AppLogo from "../../../common/AppLogo";
import Loading from "react-loading";
import api from "../../../api/api";

export default function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const validationSchema = Yup.object({
    fName: Yup.string()
      .required("First name is required")
      .matches(
        /^[a-zA-Z]+$/,
        "This value cannot contain numbers or special characters"
      )
      .min(3, "This value should be at least 3 characters")
      .max(20, "This value should be a maximum of 20 characters"),

    lName: Yup.string()
      .required("Last name is required")
      .matches(
        /^[a-zA-Z]+$/,
        "This value cannot contain numbers or special characters"
      )
      .min(3, "This value should be at least 3 characters")
      .max(20, "This value should be a maximum of 20 characters"),

    email: Yup.string()
      .email("Invalid email format")
      .required("Email value is required"),

    phone: Yup.string().required("Phone Number value is required"),
    password: Yup.string()
      .matches(
        /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        "The password should be at least 8 characters, including one uppercase letter, one lowercase letter, and one number or special character."
      )
      .required("Password value is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Please comfirm your password"),
  });

  const initialValues = {
    fName: "",
    lName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };

  async function handleSubmit(values) {
    setIsLoading(true);
    try {
      const formattedValues = {
        firstName: values.fName,
        lastName: values.lName,
        email: values.email,
        phone: values.phone,
        password: values.password,
      };
      const res = await api.post("/user/register", formattedValues);
      formik.resetForm();
      setError("");
      console.log(res);
      navigate("/login");
    } catch (error) {
      console.log(error?.response?.data?.message);
      setError(error?.response?.data?.message);
    }
    setIsLoading(false);
  }
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="w-11/12 sm:w-8/12 md:w-7/12 lg:w-6/12 xl:w-5/12 2xl:w-4/12 mx-auto bg-slate-50 shadow-lg  p-8 mt-20">
      <form onSubmit={formik.handleSubmit} className="w-full">
        <AppLogo
          width="30%"
          className="mx-auto mb-8 bg-slate-100 flex items-center justify-center rounded-full py-1"
        />
        <h3 className="text-xl font-bold mb-6 text-center ">Sign Up</h3>

        <div className="flex flex-col justify-center gap-5 w-full mx-auto">
          <div className="flex flex-col items-start gap-1 w-full">
            <Input
              name={"fName"}
              type={"text"}
              label={"First Name"}
              id={"r-f-name"}
              value={formik.values.fName}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <FieldError
              errorMessage={formik.errors.fName}
              touched={formik.touched.fName}
            />
          </div>
          <div className="flex flex-col items-start gap-1 w-full">
            <Input
              name={"lName"}
              type={"text"}
              label={"Last Name"}
              id={"r-l-name"}
              value={formik.values.lName}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <FieldError
              errorMessage={formik.errors.lName}
              touched={formik.touched.lName}
            />
          </div>
          <div className="flex flex-col items-start gap-1 w-full">
            <Input
              name={"email"}
              type={"email"}
              id={"r-email"}
              label={"Email"}
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <FieldError
              errorMessage={formik.errors.email}
              touched={formik.touched.email}
            />
          </div>

          <div className="flex flex-col items-start gap-1 w-full">
            <Input
              name={"phone"}
              type={"phone"}
              id={"phone"}
              label={"Phone Number"}
              value={formik.values.phone}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <FieldError
              errorMessage={formik.errors.phone}
              touched={formik.touched.phone}
            />
          </div>
          <div className="flex flex-col items-start gap-1 w-full">
            <Input
              name={"password"}
              type={"password"}
              id={"r-password"}
              label={"Password"}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <FieldError
              errorMessage={formik.errors.password}
              touched={formik.touched.password}
            />
          </div>
          <div className="flex flex-col items-start gap-1 w-full">
            <Input
              name={"confirmPassword"}
              type={"password"}
              id={"r-confirm-password"}
              label={"Confirm Password"}
              value={formik.values.confirmPassword}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {!formik.errors.password && (
              <FieldError
                errorMessage={formik.errors.confirmPassword}
                touched={formik.touched.confirmPassword}
              />
            )}
          </div>
          {error && <p className="text-xs text-red-500 font-bold">{error}</p>}
          <Button
            type="submit"
            className="bg-yellow-700 py-2 px-4 text-white font-bold  rounded-md hover:bg-yellow-600 text-lg capitalize w-full"
          >
            {isLoading ? (
              <Loading
                type="spin"
                className="mx-auto"
                width={25}
                height="auto"
              />
            ) : (
              <p>Sign Up</p>
            )}
          </Button>
        </div>
      </form>
      <div className="flex items-center gap-1 mt-3">
        <p>Already have an account?</p>
        <Link to="/login" className="underline cursor-pointer">
          Sign In
        </Link>
      </div>
    </div>
  );
}
