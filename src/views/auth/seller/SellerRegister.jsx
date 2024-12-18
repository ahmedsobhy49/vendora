import React, { useEffect, useState } from "react";
import AppLogo from "../../../common/AppLogo";
import AppContainer from "../../../common/AppContainer";
import {
  FaRegUserCircle,
  FaRegUser,
  FaRegBuilding,
  FaCheck,
} from "react-icons/fa";
import { MdOutlineBusinessCenter } from "react-icons/md";
import { Stepper, Step, Button } from "@material-tailwind/react";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import api from "../../../api/api";
import { RotatingLines } from "react-loader-spinner";
import { BsPatchCheck } from "react-icons/bs";

const initialSellerInfo = {
  first_name: "",
  last_name: "",
  email: "",
  image: null,
  phone_number: "",
  password: "",
  confirm_password: "",
};

const initialAddressInfo = {
  building: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  country: "",
};

const initialBusinessInfo = {
  company_name: "",
  registration_number: "",
  tax_id: "",
};

// Validation Schemas
const sellerInfoSchema = Yup.object({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone_number: Yup.string().required("Phone number is required"),
  password: Yup.string().required("Password is required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm your password"),
  image: Yup.mixed()
    .required("Click to upload your image")
    .test("fileSize", "File size is too large, must be 2MB or less", (value) =>
      value ? value.size <= 2 * 1024 * 1024 : true
    )
    .test("fileType", "Unsupported file format", (value) =>
      value
        ? ["image/jpeg", "image/png", "image/gif"].includes(value.type)
        : true
    ),
});

const addressInfoSchema = Yup.object({
  building: Yup.string().required("Building number is required"),
  street: Yup.string().required("Street name is required"),
  city: Yup.string().required("City name is required"),
  state: Yup.string().required("State is required"),
  zip: Yup.string().required("Zip code is required"),
  country: Yup.string().required("Country name is required"),
});

const businessInfoSchema = Yup.object({
  company_name: Yup.string().required("Company name is required"),
  registration_number: Yup.string().required("Registration number is required"),
  tax_id: Yup.string().required("Tax ID is required"),
});

const formSteps = [
  { initialValues: initialSellerInfo, validationSchema: sellerInfoSchema },
  { initialValues: initialAddressInfo, validationSchema: addressInfoSchema },
  { initialValues: initialBusinessInfo, validationSchema: businessInfoSchema },
];

export default function SellerRegister() {
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  return (
    <AppContainer>
      <div className="w-full p-10 rounded-md  ">
        <div className="flex flex-col justify-center items-center gap-4 ">
          <div>
            <AppLogo width="100%" />
          </div>
          {!registrationSuccess && (
            <h4 className="text-gray-800 font-semibold text-xl">
              Start Your Selling Journey, Register Now!
            </h4>
          )}
        </div>
        <FormikStepper
          registrationSuccess={registrationSuccess}
          setRegistrationSuccess={setRegistrationSuccess}
        />
      </div>
    </AppContainer>
  );
}

function UiStepper({
  activeStep,
  handleUiStepClick,
  registrationSuccess,
  validateForm,
}) {
  const defaultIcons = [FaRegUser, FaRegBuilding, MdOutlineBusinessCenter];
  const successIcons = [FaCheck, FaCheck, FaCheck];
  const iconsToDisplay = registrationSuccess ? successIcons : defaultIcons;
  return (
    <div className={`w-full py-4 my-6 px-8 bg-white rounded-full `}>
      <Stepper activeStep={activeStep}>
        {iconsToDisplay.map((Icon, idx) => (
          <Step key={idx} onClick={() => handleUiStepClick(idx, validateForm)}>
            <Icon className={`h-5 w-5`} />
          </Step>
        ))}
      </Stepper>
    </div>
  );
}

function FormikStepper({ registrationSuccess, setRegistrationSuccess }) {
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const handleUiStepClick = async (step, validateForm) => {};

  const handleNext = async (validateForm, setErrors) => {
    const errors = await validateForm();
    console.log("errors", errors);
    console.log(activeStep);
    if (Object.keys(errors).length === 0 && !isLastStep) {
      setActiveStep((cur) => cur + 1);
      setIsLastStep(activeStep + 1 === formSteps.length - 1);
    } else {
      setErrors(errors);
    }
  };

  const handlePrev = () => {
    if (activeStep > 0) {
      setActiveStep((cur) => cur - 1);
      setIsLastStep(false);
    }
  };
  const { initialValues, validationSchema } = formSteps[activeStep];
  const [loading, setLoading] = useState(false);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        console.log("onSubmit");
        if (isLastStep) {
          const formData = new FormData();
          formData.append("firstName", values.first_name);
          formData.append("lastName", values.last_name);
          formData.append("email", values.email);
          formData.append("phone", values.phone_number);
          formData.append("password", values.password);
          formData.append("image", values.image);
          formData.append("address[buildingNumber]", values.building);
          formData.append("address[street]", values.street);
          formData.append("address[city]", values.city);
          formData.append("address[state]", values.state);
          formData.append("address[zip]", values.zip);
          formData.append("address[country]", values.country);
          formData.append("businessInfo[companyName]", values.company_name);
          formData.append(
            "businessInfo[registrationNumber]",
            values.registration_number
          );
          formData.append("businessInfo[taxId]", values.tax_id);

          setLoading(true);
          try {
            const res = await api.post("sellers/register", formData);
            setRegistrationSuccess(true);
            resetForm();
          } catch (error) {
            console.error("Error during registration:", error);
          } finally {
            setLoading(false);
          }
        }
      }}
    >
      {({ validateForm, setErrors }) => (
        <Form className="">
          <UiStepper
            activeStep={activeStep}
            handleUiStepClick={handleUiStepClick}
            registrationSuccess={registrationSuccess}
            validateForm={validateForm} // Pass validateForm as a prop
          />
          {!registrationSuccess && (
            <>
              {activeStep === 0 && <SellerInfo />}
              {activeStep === 1 && <AddressInfo />}
              {activeStep === 2 && <BusinessInfo />}

              <div className="mt-8 flex justify-between">
                <Button
                  onClick={handlePrev}
                  disabled={activeStep === 0}
                  className="bg-yellow-700 py-2 px-4 text-white font-bold  rounded-md hover:bg-yellow-600 text-lg capitalize "
                >
                  Prev
                </Button>
                <Button
                  className="bg-yellow-700 py-2 px-4 text-white font-bold  rounded-md hover:bg-yellow-600 text-lg capitalize"
                  type="submit"
                  onClick={() => handleNext(validateForm, setErrors)}
                  // type={isLastStep ? "submit" : "button"}
                  disabled={loading}
                >
                  {loading ? (
                    <RotatingLines strokeColor="white" width="14px" />
                  ) : isLastStep ? (
                    "Sign up"
                  ) : (
                    "Next"
                  )}
                </Button>
              </div>
            </>
          )}
          {registrationSuccess && <SuccessMessage />}
        </Form>
      )}
    </Formik>
  );
}

function SellerInfo() {
  const { setFieldValue } = useFormikContext(); // Access Formik context here
  const [imagePreview, setImagePreview] = useState(null); // State to hold the image preview

  const handleImageChange = (event) => {
    const file = event.currentTarget.files[0]; // Get the selected file
    if (file) {
      setFieldValue("image", file); // Update Formik state with the file
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set preview
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    } else {
      setFieldValue("image", null); // Clear the image field if no file is selected
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-3 mb-6 sm:gap-5 cursor-pointer">
        <div className="flex flex-col items-center gap-2">
          <div
            className="p-2 border-2 border-white rounded-full border-dashed relative"
            onClick={() => document.getElementById("fileInput").click()}
          >
            {imagePreview ? ( // Show image preview if available
              <img
                src={imagePreview}
                alt="Profile Preview"
                className="w-40 aspect-square rounded-full object-cover"
              />
            ) : (
              <FaRegUserCircle size={120} color="white" />
            )}
            <input
              type="file"
              id="fileInput"
              className="hidden"
              name="image"
              accept="image/*" // Only allow image files
              onChange={handleImageChange} // Handle file input change
            />
          </div>
          <ErrorMessage
            name={"image"}
            component="div"
            className="text-red-500 text-sm"
          />
        </div>
      </div>
      {/* Form fields for other information */}
      <div className="grid grid-cols-2 gap-6">
        {[
          "first_name",
          "last_name",
          "email",
          "phone_number",
          "password",
          "confirm_password",
        ].map((field, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            <label htmlFor={field} className="text-gray-800 text-sm  block">
              {field.replace("_", " ").replace(/^\w/, (c) => c.toUpperCase())}
            </label>
            <Field
              name={field}
              type={field.includes("password") ? "password" : "text"}
              className="bg-white w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all "
              placeholder={`Enter ${field.replace("_", " ")}`}
            />
            <ErrorMessage
              name={field}
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function AddressInfo() {
  return (
    <div className="grid grid-cols-2 gap-6">
      {["building", "street", "city", "state", "zip", "country"].map(
        (field, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            <label htmlFor={field} className="text-gray-800 text-sm mb-2 block">
              {field.replace("_", " ").replace(/^\w/, (c) => c.toUpperCase())}
            </label>
            <Field
              name={field}
              type="text"
              className="bg-white w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
              placeholder={`Enter ${field.replace("_", " ")}`}
            />
            <ErrorMessage
              name={field}
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
        )
      )}
    </div>
  );
}

function BusinessInfo() {
  return (
    <div className="flex flex-col gap-6">
      {["company_name", "registration_number", "tax_id"].map((field, idx) => (
        <div key={idx} className="flex flex-col gap-2">
          <label htmlFor={field} className="text-gray-800 text-sm mb-2 block">
            {field.replace("_", " ").replace(/^\w/, (c) => c.toUpperCase())}
          </label>
          <Field
            name={field}
            type="text"
            className="bg-white w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
            placeholder={`Enter ${field.replace("_", " ")}`}
          />
          <ErrorMessage
            name={field}
            component="div"
            className="text-red-500 text-sm"
          />
        </div>
      ))}
    </div>
  );
}

function SuccessMessage() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className=" w-full lg:w-8/12 bg-white rounded-lg shadow-lg p-12 flex flex-col items-center gap-4">
        <BsPatchCheck size={150} color="#43a047" />
        <h1 className="text-2xl font-bold text-center text-green-600 ">
          Success
        </h1>
        <p className="text-gray-600 text-lg font-semibold">
          Thank you for registering as a seller on our platform! Your account is
          currently under review, and you will receive an email notification
          once it is approved.
        </p>
      </div>
    </div>
  );
}
