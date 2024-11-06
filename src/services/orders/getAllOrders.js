import api from "../../api/api";

export default async function getAllOrders() {
  return await api.get("/orders");
}
