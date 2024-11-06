import api from "../../api/api";

export default async function getAllProducts() {
  return await api.get("/products");
}
