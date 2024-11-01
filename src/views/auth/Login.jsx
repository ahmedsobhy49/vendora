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
import { useNavigate } from "react-router-dom";

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
        console.log(data);
        setLoginRequestMessage({ type: "success", message: "Login Success" });
        navigate(`/${data}/dashboard`, { replace: true });
      },
    });
  }

  return (
    <div className="w-10/12 sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto bg-slate-50 shadow-lg p-10">
      <AppLogo
        width="30%"
        className="mx-auto mb-8 bg-slate-100 flex items-center justify-center rounded-full py-2"
      />
      <h3 className="text-xl font-bold mb-6 text-center">Sign In</h3>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col justify-center gap-5 w-full mx-auto">
          <div className="flex flex-col items-start gap-1 w-full">
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
          <div className="flex flex-col items-start gap-1 w-full">
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
          <Button type="submit">
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
    </div>
  );
}
