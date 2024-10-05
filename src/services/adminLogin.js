import api from "../api/api";

export default async function adminLogin(body) {
  return await api.post("/admin/login", body);
}
