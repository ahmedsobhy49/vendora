import api from "../../api/api";

// Function to fetch the address of a seller by ID
export default async function getSellerAddressById(sellerId) {
  try {
    const sellerAddressRes = await api.get(`address/${sellerId}`);
    return sellerAddressRes.data.address; // Return the address
  } catch (error) {
    console.error(`Error fetching address for seller ${sellerId}`, error);
    return null; // Return null if there's an error
  }
}
