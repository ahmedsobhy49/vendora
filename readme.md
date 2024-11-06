const handleSubmit = async (values, { resetForm }) => {
console.log("values", values); // Log entire values for debugging
const seller = {
\_id: data.user.\_id,
name: formatName(data.user.firstName, data.user.lastName),
};

    const productImages = await Promise.all(
      values.productImages.map(async (image) => {
        const response = await fetch(image.url);
        const blob = await response.blob();
        return new File([blob], image.altText, { type: blob.type });
      })
    );
    // Prepare formatted values for submission
    const formattedValues = {
      name: values.name,
      description: values.description,
      price: values.price,
      brand: values.brand,
      productImages,
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
    console.log("Submitting product images:", formattedValues.productImages);

    try {
      const res = await api.post("/product", formattedValues);
      // Send the actual formattedValues
      console.log("API response:", res);
      toast.success("Product added successfully!");

      // Reset the form fields and step
      // resetForm();
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
