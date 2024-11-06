import api from "../../api/api";

export default async function getCurrentYearSalesStatistics() {
  return await api.get("/orders/current-year-statistics");
}
