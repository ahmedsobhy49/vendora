import api from "../../api/api";

export async function getOrdersBySellerId(sellerId) {
  return await api.get(`/orders/seller/${sellerId}`);
}
