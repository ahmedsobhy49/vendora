import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../common/Input";
import Button from "../../common/Button";
import FieldError from "../../common/FieldError";
import { Link } from "react-router-dom";
import AppLogo from "../../common/AppLogo";

export default function Register() {
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .matches(
        /^[a-zA-Z]+$/,
        "This value cannot contain numbers or special characters"
      )
      .min(3, "This value should be at least 3 characters")
      .max(20, "This value should be a maximum of 20 characters"),

    email: Yup.string()
      .email("Invalid email format")
      .required("Email value is required"),
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
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  function handleSubmit(values) {
    console.log(values);
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="w-full">
      <form onSubmit={formik.handleSubmit}>
        <AppLogo
          width="30%"
          className="mx-auto mb-8 bg-slate-100 flex items-center justify-center rounded-full py-1"
        />
        <h3 className="text-xl font-bold mb-6 text-center ">Sign Up</h3>

        <div className="flex flex-col justify-center gap-5 w-full mx-auto">
          <div className="flex flex-col items-start gap-1 w-full">
            <Input
              name={"name"}
              type={"text"}
              label={"Name"}
              id={"r-name"}
              value={formik.values.name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <FieldError
              errorMessage={formik.errors.name}
              touched={formik.touched.name}
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
          <Button type="submit">
            <p>Sign Up</p>
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
