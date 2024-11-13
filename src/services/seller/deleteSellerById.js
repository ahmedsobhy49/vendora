import api from "../../api/api";

export default async function deleteSellerById(sellerId) {
  return await api.delete(`/sellers/${sellerId}`);
}
