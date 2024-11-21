import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import FieldError from "../../common/FieldError";
import Input from "../../common/Input";
import Button from "../../common/Button";
import AppLogo from "../../common/AppLogo";
import { useMutation } from "react-query";
import { authService } from "../../services/auth/auth";
import Message from "../../common/Message";
import Loading from "react-loading";
import { Link, useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const [loginRequestMessage, setLoginRequestMessage] = useState({
    type: "",
    message: "",
  });

  // Validation schema for form fields
  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  // Formik setup for handling form submission and validation
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  // Mutation setup for handling login
  const { mutate, isError, isLoading, isSuccess, data, error } = useMutation(
    authService.login
  );

  // Submit handler
  function handleSubmit(values) {
    mutate(values, {
      onError: (error) => {
        setLoginRequestMessage({
          type: "error",
          message: error.response.data.message,
        });
      },
      onSuccess: (data) => {
        setLoginRequestMessage({ type: "success", message: "Login Success" });
        if (data.role === "user") {
          navigate("/");
          return;
        }
        navigate(`/${data.role}/dashboard/${data.id}`, { replace: true });
      },
    });
  }

  return (
    <div className="w-11/12 sm:w-8/12 md:w-7/12 lg:w-6/12 xl:w-5/12 2xl:w-4/12 mx-auto bg-white shadow-lg p-10 mt-40">
      <AppLogo
        width="30%"
        className="mx-auto mb-8 bg-slate-100 flex items-center justify-center rounded-full py-2 "
      />
      <div className=" xl:w-10/12 mx-auto">
        <h3 className="text-xl font-bold mb-6 text-center">Sign In</h3>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col justify-center gap-5 w-full mx-auto">
            <div className="flex flex-col items-start gap-2 w-full">
              <Input
                name="email"
                type="email"
                id="l-email"
                label="Email"
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <FieldError
                errorMessage={formik.errors.email}
                touched={formik.touched.email}
              />
            </div>
            <div className="flex flex-col items-start gap-2 w-full">
              <Input
                name="password"
                type="password"
                id="l-password"
                label="Password"
                value={formik.values.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <FieldError
                errorMessage={formik.errors.password}
                touched={formik.touched.password}
              />
            </div>
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
                <p>Sign In</p>
              )}
            </Button>
            <Message
              message={loginRequestMessage.message}
              type={loginRequestMessage.type}
            />
          </div>
        </form>
        <p className="text-sm font-light text-gray-500 mt-4 flex items-center gap-1">
          Don’t have an account yet?
          <Link
            to={"/user/register"}
            className="font-medium text-primary-600 underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
