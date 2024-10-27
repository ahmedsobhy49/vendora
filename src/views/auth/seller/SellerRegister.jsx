import React from "react";
import AppLogo from "../../../common/AppLogo";
import AppContainer from "../../../common/AppContainer";
import { FaRegUserCircle, FaRegUser, FaRegBuilding } from "react-icons/fa";
import { MdOutlineBusinessCenter } from "react-icons/md";
import { Stepper, Step, Button } from "@material-tailwind/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../../../api/api";

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
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(true);

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
      />
    </AppContainer>
  );
}

function LoginStepper({ activeStep, onStepClick }) {
  return (
    <div className="w-full py-10 px-8">
      <Stepper activeStep={activeStep}>
        {[FaRegUser, FaRegBuilding, MdOutlineBusinessCenter].map(
          (Icon, idx) => (
            <Step key={idx} onClick={() => onStepClick(idx)}>
              <Icon className="h-5 w-5" />
            </Step>
          )
        )}
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
}) {
  return (
    <Formik
      initialValues={{
        first_name: "",
        last_name: "",
        email: "",
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
      onSubmit={async (values) => {
        if (isLastStep) {
          const formattedValues = {
            firstName: values.first_name,
            lastName: values.last_name,
            image: "",
            email: values.email,
            phone: values.phone_number,
            password: values.password,
            address: {
              buildingNumber: values.building,
              street: values.street,
              city: values.city,
              state: values.state,
              zip: values.zip,
              country: values.country,
            },
            businessInfo: {
              companyName: values.company_name,
              registrationNumber: values.registration_number,
              taxId: values.tax_id,
            },
            bankDetails: {
              accountNumber: "",
              bankName: "",
              routingNumber: "",
              accountHolderName: "",
              swiftCode: "",
            },
          };
          const res = await api.post("sellers/register", formattedValues);
          console.log(res);
        }
      }}
    >
      {({ validateForm }) => (
        <Form>
          {activeStep === 0 && <SellerInfo />}
          {activeStep === 1 && <AddressInfo />}
          {activeStep === 2 && <BusinessInfo />}
          <div className="mt-16 flex justify-between">
            <Button onClick={handlePrev} disabled={activeStep === 0}>
              Prev
            </Button>
            <Button
              onClick={() => handleNext(validateForm)}
              type={isLastStep ? "submit" : "button"}
            >
              {isLastStep ? "Sign up" : "Next"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

function SellerInfo() {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-3 mb-6 sm:gap-5 cursor-pointer">
        <div
          className="p-8 border-2 rounded-full border-dashed relative"
          onClick={() => document.getElementById("fileInput").click()}
        >
          <FaRegUserCircle size={50} color="#9ca3af" />
          <img src="" alt="" />

          <input type="file" id="fileInput" className="hidden" name="image" />
        </div>
      </div>
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
