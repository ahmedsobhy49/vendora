import api from "../../api/api";
import getSellerAddressById from "./getSellerAdressById";

export default async function getActiveSeller() {
  try {
    const res = await api.get("/sellers/active");
    console.log(res);
    const sellers = res.data.sellers;

    // Map over each seller and fetch the address
    const sellersWithAddresses = await Promise.all(
      sellers.map(async (seller) => {
        try {
          const address = await getSellerAddressById(seller._id);
          return {
            ...seller, // Spread seller details
            address: address || {}, // Add address to seller object (empty object if null)
          };
        } catch (error) {
          console.error(
            `Error fetching address for seller ${seller._id}`,
            error
          );
          return seller; // Return seller data without address if there's an error
        }
      })
    );

    // Update state with sellers and their addresses
    return sellersWithAddresses;
  } catch (error) {
    console.error("Error fetching seller requests:", error);
  }
}
