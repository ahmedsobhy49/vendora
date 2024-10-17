import api from "../api/api";

export default async function getSubCategoriesByParentId(id) {
  return api.get(`/category/get-by-parent/${id}`);
}
