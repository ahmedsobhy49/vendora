import api from "../../api/api";

// Function to fetch the address of a user by ID
export default async function getAddressByUserId(userId) {
  try {
    const userAddressRes = await api.get(`address/${userId}`);
    console.log("userAddressRes", userAddressRes.data.address);
    return userAddressRes.data.address; // Return the address
  } catch (error) {
    console.error(`Error fetching address for user ${userId}`, error);
    return null; // Return null if there's an error
  }
}
