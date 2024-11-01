import React, { useEffect, useState } from "react";
import GeneralForm, { generalFormValidationSchema } from "./GeneralForm";
import Mobiles, { mobilesValidationSchema } from "./variationForms/Mobiles";
import Fashions, { fashionsValidationSchema } from "./variationForms/Fashions";
import { Field, Form, Formik } from "formik";
import api from "../../../../../api/api";
import { toast } from "react-toastify";
import { useQuery } from "react-query";
import { authService } from "../../../../../services/auth/auth";

export default function AddProductMainForm() {
  const token = localStorage.getItem("token");
  const { data } = useQuery(["user", token], authService.fetchUserInfo, {
    enabled: !!token, // Only run the query if the token exists
  });
  const [step, setStep] = useState(0);
  const [category, setCategory] = useState("");
  const [categoryName, setCategoryName] = useState("");

  async function getCateoryById(catId) {
    console.log(catId);
    const res = await api.get(`/category/${catId}`);
    console.log(res.data);
    setCategoryName(res.data.category.name);
  }

  useEffect(() => {
    category && getCateoryById(category);
  }, [category]);

  const generalFormInitialValues = {
    name: "",
    brandId: "",
    mainCategoryId: "",
    subCategoryId: "",
    subSubCategoryId: "",
    price: "",
    discount: { amount: "", startDate: null, endDate: null },
    description: "",
    tags: [],
    productImages: [],
    shipping: {
      freeShipping: false,
      shippingCost: "",
      handlingTime: "",
    },
  };

  const categoryConfig = {
    "smart phones": {
      initialValues: {
        specificFields: {
          screenSize: "",
          variations: [
            { storage: "", ram: "", colors: [{ color: "", stock: "" }] },
          ],
        },
      },
      validationSchema: mobilesValidationSchema,
      Component: Mobiles,
    },

    tablets: {
      initialValues: {
        specificFields: {
          screenSize: "",
          variations: [
            { storage: "", ram: "", colors: [{ color: "", stock: "" }] },
          ],
        },
      },
      validationSchema: mobilesValidationSchema,
      Component: Mobiles,
    },
    ipads: {
      initialValues: {
        specificFields: {
          screenSize: "",
          variations: [
            { storage: "", ram: "", colors: [{ color: "", stock: "" }] },
          ],
        },
      },
      validationSchema: mobilesValidationSchema,
      Component: Mobiles,
    },

    tops: {
      initialValues: {
        variations: [
          {
            size: "",
            colors: [{ color: "", stock: "" }], // Update structure
          },
        ],
      },
      validationSchema: fashionsValidationSchema,
      Component: Fashions,
    },
    bottoms: {
      initialValues: {
        variations: [
          {
            size: "",
            colors: [{ color: "", stock: "" }], // Update structure
          },
        ],
      },
      validationSchema: fashionsValidationSchema,
      Component: Fashions,
    },
    dresses: {
      initialValues: {
        variations: [
          {
            size: "",
            colors: [{ color: "", stock: "" }], // Update structure
          },
        ],
      },
      validationSchema: fashionsValidationSchema,
      Component: Fashions,
    },
    // Add more categories here...
  };

  const validationSchema = [
    generalFormValidationSchema,
    category ? categoryConfig[categoryName]?.validationSchema : null,
  ];

  function getInitialValues() {
    if (step === 0) {
      return generalFormInitialValues;
    }
    // Include category-specific fields only if on the second step
    return {
      ...generalFormInitialValues,
      ...(category ? categoryConfig[categoryName]?.initialValues : {}),
    };
  }

  const handleNext = async (validateForm, values) => {
    const errors = await validateForm();
    if (Object.keys(errors).length === 0) {
      if (step === 0) {
        setCategory(values.subCategoryId); // Ensure you're using the correct field
      }
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => setStep((prev) => prev - 1);

  const CurrentFormStep = category
    ? categoryConfig[categoryName]?.Component
    : null;

  const handleSubmit = async (values, { resetForm }) => {
    console.log("values", values); // Log entire values for debugging
    const sellerId = data.user._id; // Get the actual user ID

    // Prepare formatted values for submission
    const formattedValues = {
      name: values.name,
      description: values.description,
      price: values.price,
      brandId: values.brandId,
      brandName: values.brandName,
      sellerId: sellerId,
      category: values.mainCategoryId,
      subCategory: values.subCategoryId,
      subSubCategory: values.subSubCategoryId,
      tags: values.tags,
      categorySpecificFields: values.specificFields || {}, // Ensure default value
      shipping: values.shipping,
      // Do not include SKU here as it is generated in the backend
    };

    console.log("Formatted values for submission:", formattedValues);

    try {
      const res = await api.post("/product", formattedValues); // Send the actual formattedValues
      console.log("API response:", res);
      toast.success("Product added successfully!");

      // Reset the form fields and step
      resetForm();
      setStep(0);
      setCategory("");
      setCategoryName("");
    } catch (error) {
      console.error(
        "Error submitting form:",
        error.response ? error.response.data : error
      );
      toast.error("Failed to add product. Please try again.");
    }
  };

  return (
    <Formik
      initialValues={getInitialValues()}
      validationSchema={validationSchema[step]}
      onSubmit={handleSubmit}
      validateOnBlur={true}
      validateOnChange={false}
    >
      {({ values, validateForm, setFieldValue }) => (
        <Form>
          {step === 0 && (
            <GeneralForm
              handleNext={() => handleNext(validateForm, values)}
              setFieldValue={setFieldValue}
              values={values}
            />
          )}
          {step === 1 && CurrentFormStep && (
            <CurrentFormStep
              handleBack={handleBack}
              setFieldValue={setFieldValue}
              values={values}
            />
          )}
        </Form>
      )}
    </Formik>
  );
}
