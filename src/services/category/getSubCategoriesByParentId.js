import api from "../../api/api";

export default async function getSubCategoriesByParentId(id) {
  return api.get(`/categories/parent/${id}`);
}
