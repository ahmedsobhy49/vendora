import api from "../../api/api";

export default async function getRelatedSellerProducts(sellerId) {
  console.log(await api.get(`/products/${sellerId}`));
  return await api.get(`/products/${sellerId}`);
}
