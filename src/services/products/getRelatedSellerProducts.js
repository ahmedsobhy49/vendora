import api from "../../api/api";

export default async function getRelatedSellerProducts(sellerId) {
  return api.get(`/product?sellerId=${sellerId}`);
}
