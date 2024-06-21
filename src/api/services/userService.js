import apiClient from "api/apiClient";

const getUserProfile = () => apiClient.get("/user/profile");
const createOrUpdateEmployee = (data) =>
  apiClient.post("/api/v1/admin/employees/upsert", data);

export default {
  getUserProfile,
  createOrUpdateEmployee,
};
