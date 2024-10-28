import api from "../../api/api";

export default async function sellerLogin(body) {
  return await api.post("/seller/login", body);
}
