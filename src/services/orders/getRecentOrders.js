import api from "../../api/api";

export default async function getRecentOrders() {
  console.log("response", await api.get("/orders/recent"));
  return await api.get("/orders/recent");
}
