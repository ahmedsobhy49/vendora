import api from "../../api/api";

export default async function deleteBrandById(brandId) {
  return await api.delete(`/brands/${brandId}`);
}
