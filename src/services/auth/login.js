import api from "../../api/api";

export default async function login(body) {
  return await api.post("auth/login", body);
}
