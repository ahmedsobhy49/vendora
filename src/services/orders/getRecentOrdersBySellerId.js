import api from "../../api/api";

export async function getRecentOrdersBySellerId(sellerId) {
  return await api.get(`/orders/recent/seller/${sellerId}`);
}
