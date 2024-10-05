import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import FieldError from "../../common/FieldError";
import Input from "../../common/Input";
import Button from "../../common/Button";
import AppLogo from "../../common/AppLogo";
import { useMutation } from "react-query";
import adminLogin from "../../services/adminLogin";
import Message from "../../common/Message";
import Loading from "react-loading";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [loginRequestMessage, setLoginRequestMessage] = useState({
    type: "",
    message: "",
  });
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

  const { mutate, isError, isLoading, isSuccess } = useMutation(adminLogin);

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
        navigate("/admin/dashboard");
        localStorage.setItem("accessToken", data.data.token);
      },
    });
  }

  return (
    <div className="w-full">
      <AppLogo
        width="30%"
        className="mx-auto mb-8 bg-slate-100 flex items-center justify-center rounded-full py-2 "
      />
      <h3 className="text-xl font-bold mb-6 text-center ">Sign In</h3>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col justify-center gap-5 w-full mx-auto">
          <div className="flex flex-col items-start gap-1 w-full">
            <Input
              name={"email"}
              type={"email"}
              id={"a-l-email"}
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
              id={"a-l-password"}
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
          <Button type="submit">
            {isLoading ? (
              <Loading
                type="spin"
                className="mx-auto"
                width={25}
                height={"auto"}
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
