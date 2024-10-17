import api from "../api/api";

async function getAllParentCategories() {
  return await api("/category/all-parent-categories");
}

export default getAllParentCategories;
