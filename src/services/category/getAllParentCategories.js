import api from "../../api/api";

async function getAllParentCategories() {
  return await api("/categories/parents/");
}

export default getAllParentCategories;
