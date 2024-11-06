import api from "../../api/api";

export default async function getSellersStatistics() {
  return await api.get("/sellers/stats/yearly");
}
