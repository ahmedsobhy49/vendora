import api from "../../api/api";

export default async function getSellerById(sellerId) {
  try {
    const response = await api.get(`/sellers/${sellerId}`);
    console.log("Single seller response:", response.data); // Ensure this logs data
    return response.data.seller; // Adjust if the data structure is different
  } catch (error) {
    console.error("Error fetching single seller:", error);
    throw error;
  }
}
