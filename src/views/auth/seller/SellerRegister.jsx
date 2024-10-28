import React, { useState } from "react";
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
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../../../api/api";
import { RotatingLines } from "react-loader-spinner";
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
    .required("Image is required") // Ensure an image is uploaded
    .test(
      "fileSize",
      "File size is too large, must be 2MB or less",
      (value) => {
        return value && value.size <= 2 * 1024 * 1024; // 2MB limit
      }
    )
    .test("fileType", "Unsupported file format", (value) => {
      return (
        value && ["image/jpeg", "image/png", "image/gif"].includes(value.type)
      ); // Allow specific file types
    }),
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

const formikSchemas = [sellerInfoSchema, addressInfoSchema, businessInfoSchema];

export default function SellerRegister() {
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(true);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleStepClick = (step, validateForm) => {
    validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
        setActiveStep(step);
        setIsFirstStep(step === 0);
        setIsLastStep(step === formikSchemas.length - 1);
      }
    });
  };

  const handleNext = (validateForm) => {
    validateForm().then((errors) => {
      if (Object.keys(errors).length === 0 && !isLastStep) {
        setActiveStep((cur) => cur + 1);
        setIsFirstStep(false);
        setIsLastStep(activeStep + 1 === formikSchemas.length - 1);
      }
    });
  };

  const handlePrev = () => {
    if (!isFirstStep) {
      setActiveStep((cur) => cur - 1);
      setIsFirstStep(activeStep - 1 === 0);
      setIsLastStep(false);
    }
  };

  return (
    <AppContainer>
      <div className="flex flex-col justify-center items-center gap-4 mb-12">
        <div>
          <AppLogo width="100%" />
        </div>
        <h4 className="text-gray-800 font-semibold text-xl">
          Start Your Selling Journey, Register Now!
        </h4>
      </div>
      <LoginStepper
        registrationSuccess={registrationSuccess}
        activeStep={activeStep}
        onStepClick={(step, validateForm) =>
          handleStepClick(step, validateForm)
        }
      />
      <FormikStepper
        activeStep={activeStep}
        handleNext={handleNext}
        handlePrev={handlePrev}
        isLastStep={isLastStep}
        validationSchema={formikSchemas[activeStep]}
        setRegistrationSuccess={setRegistrationSuccess}
        registrationSuccess={registrationSuccess}
      />
    </AppContainer>
  );
}

function LoginStepper({ activeStep, onStepClick, registrationSuccess }) {
  const defaultIcons = [FaRegUser, FaRegBuilding, MdOutlineBusinessCenter];
  const successIcons = [FaCheck, FaCheck, FaCheck]; // Change these to the desired icons for success

  // Choose icons based on registration success
  const iconsToDisplay = registrationSuccess ? successIcons : defaultIcons;

  return (
    <div className="w-full py-10 px-8">
      <Stepper activeStep={activeStep}>
        {iconsToDisplay.map((Icon, idx) => (
          <Step key={idx} onClick={() => onStepClick(idx)}>
            <Icon className="h-5 w-5" />
          </Step>
        ))}
      </Stepper>
    </div>
  );
}

function FormikStepper({
  activeStep,
  handleNext,
  handlePrev,
  isLastStep,
  validationSchema,
  registrationSuccess,
  setRegistrationSuccess,
}) {
  const [loading, setLoading] = useState(false); // Loading state

  return (
    <Formik
      initialValues={{
        first_name: "",
        last_name: "",
        email: "",
        image: null,
        phone_number: "",
        password: "",
        confirm_password: "",
        building: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        company_name: "",
        registration_number: "",
        tax_id: "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        if (isLastStep) {
          const formData = new FormData();
          formData.append("firstName", values.first_name);
          formData.append("lastName", values.last_name);
          formData.append("email", values.email);
          formData.append("phone", values.phone_number);
          formData.append("password", values.password);

          // Append the image file to FormData
          if (values.image) formData.append("image", values.image);

          // Address and business information
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
            const res = await api.post("sellers/register", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
            console.log(res);
            setRegistrationSuccess(true);
            resetForm();
          } catch (error) {
            console.error("Error during registration:", error);
          } finally {
            setLoading(false);
          }
        }
      }}
      // onSubmit={async (values, { resetForm }) => {
      //   if (isLastStep) {
      //     const formattedValues = {
      //       firstName: values.first_name,
      //       lastName: values.last_name,
      //       image: values.image,
      //       email: values.email,
      //       phone: values.phone_number,
      //       password: values.password,
      //       address: {
      //         buildingNumber: values.building,
      //         street: values.street,
      //         city: values.city,
      //         state: values.state,
      //         zip: values.zip,
      //         country: values.country,
      //       },
      //       businessInfo: {
      //         companyName: values.company_name,
      //         registrationNumber: values.registration_number,
      //         taxId: values.tax_id,
      //       },
      //       bankDetails: {
      //         accountNumber: "",
      //         bankName: "",
      //         routingNumber: "",
      //         accountHolderName: "",
      //         swiftCode: "",
      //       },
      //     };
      //     setLoading(true); // Set loading to true before the API call
      //     try {
      //       const res = await api.post("sellers/register", formattedValues);
      //       console.log(res);
      //       setRegistrationSuccess(true); // Set success state
      //       resetForm();
      //     } catch (error) {
      //       console.error("Error during registration:", error);
      //       if (error.response && error.response.data) {
      //         const errorMessage =
      //           error.response.data.message ||
      //           "Registration failed. Please try again.";
      //         alert(errorMessage);
      //       }
      //     } finally {
      //       setLoading(false); // Reset loading to false after the API call
      //     }
      //   }
      // }}
    >
      {({ validateForm, setFieldValue }) => (
        <Form>
          {registrationSuccess ? (
            <SuccessMessage />
          ) : (
            <>
              {activeStep === 0 && <SellerInfo setFieldValue={setFieldValue} />}
              {activeStep === 1 && (
                <AddressInfo setFieldValue={setFieldValue} />
              )}
              {activeStep === 2 && (
                <BusinessInfo setFieldValue={setFieldValue} />
              )}
              <div className="mt-16 flex justify-between">
                <Button onClick={handlePrev} disabled={activeStep === 0}>
                  Prev
                </Button>
                <Button
                  onClick={() => handleNext(validateForm)}
                  type={isLastStep ? "submit" : "button"}
                  disabled={loading} // Disable the button if loading
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
        </Form>
      )}
    </Formik>
  );
}

function SellerInfo({ setFieldValue }) {
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
        <div
          className="p-8 border-2 rounded-full border-dashed relative"
          onClick={() => document.getElementById("fileInput").click()}
        >
          {imagePreview ? ( // Show image preview if available
            <img
              src={imagePreview}
              alt="Profile Preview"
              className="w-20 aspect-square rounded-full object-cover"
            />
          ) : (
            <FaRegUserCircle size={50} color="#9ca3af" />
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
          <div key={idx}>
            <label htmlFor={field} className="text-gray-800 text-sm mb-2 block">
              {field.replace("_", " ").replace(/^\w/, (c) => c.toUpperCase())}
            </label>
            <Field
              name={field}
              type={field.includes("password") ? "password" : "text"}
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
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
          <div key={idx}>
            <label htmlFor={field} className="text-gray-800 text-sm mb-2 block">
              {field.replace("_", " ").replace(/^\w/, (c) => c.toUpperCase())}
            </label>
            <Field
              name={field}
              type="text"
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
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
        <div key={idx}>
          <label htmlFor={field} className="text-gray-800 text-sm mb-2 block">
            {field.replace("_", " ").replace(/^\w/, (c) => c.toUpperCase())}
          </label>
          <Field
            name={field}
            type="text"
            className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
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
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center text-green-600 mb-4">
          Registration Successful!
        </h1>
        <p className="text-gray-700 text-base mb-4">
          Thank you for registering as a seller on our platform! Your account is
          currently under review, and you will receive an email notification
          once it is approved.
        </p>
      </div>
    </div>
  );
}
