import api from "../../api/api";
import getSellerAddressById from "./getSellerAdressById";
export default async function getActiveSeller() {
  try {
    const res = await api.get("/sellers/active");
    const sellers = res?.data?.sellers || [];

    if (!sellers.length) {
      console.log("No active sellers found.");
      return []; // Return an empty array if no sellers are found
    }

    const sellersWithAddresses = await Promise.all(
      sellers.map(async (seller) => {
        try {
          const address = await getSellerAddressById(seller?._id);
          return {
            ...seller,
            address: address || {},
          };
        } catch (error) {
          console.error(
            `Error fetching address for seller ${seller?._id}:`,
            error
          );
          return seller;
        }
      })
    );

    return sellersWithAddresses;
  } catch (error) {
    console.error("Error fetching active sellers:", error);
    return []; // Optionally return an empty array or rethrow the error
  }
}
