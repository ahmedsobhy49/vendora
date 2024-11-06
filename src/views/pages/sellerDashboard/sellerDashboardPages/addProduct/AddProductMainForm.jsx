import React, { useEffect, useState } from "react";
import GeneralForm, { generalFormValidationSchema } from "./GeneralForm";
import Mobiles, { mobilesValidationSchema } from "./variationForms/Mobiles";
import Fashions, { fashionsValidationSchema } from "./variationForms/Fashions";
import { Field, Form, Formik } from "formik";
import api from "../../../../../api/api";
import { toast } from "react-toastify";
import { useQuery } from "react-query";
import { authService } from "../../../../../services/auth/auth";
import formatName from "../../../../../utils/formatName";
import { useNavigate } from "react-router-dom";

export default function AddProductMainForm() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { data } = useQuery(["user", token], authService.fetchUserInfo, {
    enabled: !!token, // Only run the query if the token exists
  });
  const [step, setStep] = useState(0);
  const [category, setCategory] = useState("");
  const [categoryName, setCategoryName] = useState("");
  async function getCateoryById(catId) {
    const res = await api.get(`/category/${catId}`);
    setCategoryName(res.data.category.name);
  }

  useEffect(() => {
    category && getCateoryById(category._id);
  }, [category]);

  const generalFormInitialValues = {
    name: "",
    brand: "",
    mainCategory: "",
    subCategory: "",
    subSubCategory: "",
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
        setCategory(values.subCategory); // Ensure you're using the correct field
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
    const seller = {
      _id: data.user._id,
      name: formatName(data.user.firstName, data.user.lastName),
    };

    const formData = new FormData();
    values.productImages.forEach((image) => {
      formData.append("productImages", image.file); // Use `image.file` to get the File object
    });

    try {
      // Upload images first
      const uploadResponse = await api.post("/product/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Upload response:", uploadResponse.data); // Log the
      const uploadedImages = uploadResponse.data.images; // Extract the image URLs from the response

      // Prepare formatted values for submission
      const formattedValues = {
        name: values.name,
        description: values.description,
        price: values.price,
        brand: values.brand,
        productImages: uploadedImages, // Use the uploaded images' URLs
        discount: values.discount,
        brandName: values.brandName,
        seller: seller,
        category: values.mainCategory,
        subCategory: values.subCategory,
        subSubCategory: values.subSubCategory,
        tags: values.tags,
        categorySpecificFields: values.specificFields || {}, // Ensure default value
        shipping: values.shipping,
      };

      console.log("Formatted values for submission:", formattedValues);

      // Now create the product with the uploaded image URLs
      const res = await api.post("/product", formattedValues);
      console.log("API response:", res);
      toast.success("Product added successfully!");
      navigate("/seller/dashboard/all-products");
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
