import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import Error from "../../common/Error";
import Input from "../../common/Input";
import Button from "../../common/Button";
import { Link } from "react-router-dom";
import AppLogo from "../../common/AppLogo";

export default function Login() {
  const validationSchema = Yup.object({
    email: Yup.string().required("Email value is required"),
    password: Yup.string().required("Password value is required"),
  });
  const initialValues = {
    email: "",
    password: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  function handleSubmit(values) {
    console.log(values);
  }
  return (
    <div className="w-full">
      <AppLogo
        width="30%"
        className="mx-auto mb-8 bg-slate-100 flex items-center justify-center rounded-full py-1"
      />
      <h3 className="text-xl font-bold mb-6 text-center ">Sign In</h3>

      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col justify-center gap-5 w-full mx-auto">
          <div className="flex flex-col items-start gap-1 w-full">
            <Input
              name={"email"}
              type={"email"}
              id={"l-email"}
              label={"Email"}
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <Error
              errorMessage={formik.errors.email}
              touched={formik.touched.email}
            />
          </div>
          <div className="flex flex-col items-start gap-1 w-full">
            <Input
              name={"password"}
              type={"password"}
              id={"l-password"}
              label={"Password"}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <Error
              errorMessage={formik.errors.password}
              touched={formik.touched.password}
            />
          </div>
          <Button buttonText={"Sign In"} type="submit" />
        </div>
      </form>
      <div className="flex items-center gap-1 mt-3">
        <p>don't have an account?</p>
        <Link to="/register" className="underline cursor-pointer">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
