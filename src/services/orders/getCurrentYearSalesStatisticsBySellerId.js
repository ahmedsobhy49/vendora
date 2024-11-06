import api from "../../api/api";

export default async function getCurrentYearSalesStatisticsBySellerId(
  sellerId
) {
  return await api.get(`/orders/seller/current-year-statistics/${sellerId}`);
}
