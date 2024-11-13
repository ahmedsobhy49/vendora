import api from "../../api/api";

export default async function getBrandByCategoryId(categoryId) {
  return await api.get(`/brands/category/${categoryId}`);
}
