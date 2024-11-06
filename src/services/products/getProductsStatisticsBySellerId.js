import api from "../../api/api";

export default async function getProductsStatisticsBySellerId(SellerId) {
  return await api.get(`/products/sellers/monthly-stats/${SellerId}`);
}
