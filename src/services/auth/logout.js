import api from "../../api/api";

export default async function Logout() {
  await api.post("/auth/logout");
  localStorage.removeItem("token");
}
